/**
 * Apify → GatGrid sailings pipeline.
 *
 * Pulls Disney Cruise Line sailings from an Apify dataset, transforms each
 * record into the site's `Sailing` shape, and writes
 * `src/data/sailings.json`. The site reads from that JSON as the single
 * source of truth — re-run this script whenever a fresher Apify run lands.
 *
 * Usage:
 *   APIFY_DATASET_ID=<id> npx tsx scripts/fetch-apify-data.ts
 *   APIFY_TOKEN=<token>   APIFY_DATASET_ID=<id> npx tsx scripts/fetch-apify-data.ts
 *   FROM_FILE=/tmp/apify.json npx tsx scripts/fetch-apify-data.ts   # offline / dry test
 *
 * Env vars:
 *   APIFY_TOKEN       — required for live fetches
 *   APIFY_DATASET_ID  — Apify dataset id (defaults to a previously captured run)
 *   FROM_FILE         — path to a local JSON dump; bypasses the network call
 *   OUTPUT_PATH       — override output file (defaults to src/data/sailings.json)
 *
 * Note on pricing units: the site's `Sailing` shape stores total-for-2 prices
 * (matches every existing record). Apify reports per-person rack rates, so we
 * multiply by 2 here in one place.
 */

import * as fs from 'fs'
import * as path from 'path'

import type { ItineraryDay, Sailing } from '../src/types/database'

// ─── Config ──────────────────────────────────────────────────────

const APIFY_TOKEN = process.env.APIFY_TOKEN
const DATASET_ID = process.env.APIFY_DATASET_ID || 'm64FPMoCl1covPssa'
const FROM_FILE = process.env.FROM_FILE
const OUTPUT_PATH =
  process.env.OUTPUT_PATH ||
  path.join(process.cwd(), 'src', 'data', 'sailings.json')

// ─── Apify record shape (subset of fields we use) ────────────────

interface ApifyPortRef {
  name: string
  code: string
}

interface ApifyPortOfCall {
  name: string
  day: string
}

interface ApifyRecord {
  cruiseId: string
  itineraryId: string
  title: string
  description: string
  shipName: string
  shipId: string
  departurePort: ApifyPortRef
  arrivalPort: ApifyPortRef
  departureDate: string
  arrivalDate: string
  duration: string
  price: { amount: string; currency: string }
  portsOfCall: ApifyPortOfCall[]
  destinationNames: string[]
  destinationIds: string[]
  source_url: string
  itineraryImage: string
  itineraryImageAlt?: string
  price_USD_I?: string
  price_USD_O?: string
  price_USD_B?: string
  price_USD_SU?: string
}

// ─── Lookup tables (kept colocated so the transform stays readable) ──

/** Apify shipName → site `ship.id`. Covers the entire DCL fleet. */
const SHIP_NAME_TO_ID: Record<string, string> = {
  'Disney Magic': 'ship-0001',
  'Disney Wonder': 'ship-0002',
  'Disney Dream': 'ship-0003',
  'Disney Fantasy': 'ship-0004',
  'Disney Wish': 'ship-0005',
  'Disney Treasure': 'ship-0006',
  'Disney Destiny': 'ship-0007',
  'Disney Adventure': 'ship-0008',
}

/**
 * Apify `departurePort.name` → site `port.id`. Apify sometimes appends
 * marketing suffixes ("Port Canaveral with 2 Stops at Castaway Cay"); we
 * strip those before lookup so they all collapse to the canonical port.
 */
const PORT_NAME_TO_ID: Record<string, string> = {
  'Port Canaveral': 'port-0001',
  'Miami': 'port-0002',
  'Galveston': 'port-0003',
  'New York (Bayonne)': 'port-0004',
  'Vancouver': 'port-0005',
  'Southampton': 'port-0006',
  'Barcelona': 'port-0007',
  'Sydney': 'port-0008',
  'Tokyo (Urayasu)': 'port-0009',
  'Singapore': 'port-0010',
  'Fort Lauderdale': 'port-0011',
  'Tampa': 'port-0012',
  'Seattle': 'port-0013',
  'San Juan': 'port-0014',
  'Civitavecchia (Rome)': 'port-0015',
  'Los Angeles (San Pedro)': 'port-0016',
  'Jacksonville': 'port-0017',
  'San Diego': 'port-0018',
}

/** Apify destinationNames[0] → site region key. */
const REGION_FROM_DESTINATION: Record<string, Sailing['region']> = {
  ALASKA: 'alaska',
  BAHAMAS: 'bahamas',
  CARIBBEAN: 'caribbean',
  'CALIFORNIA COAST': 'pacific',
  'MEXICAN RIVIERA': 'pacific',
  EUROPE: 'europe',
  'TRANS ATLANTIC': 'transatlantic',
  'TRANS PANAMA CANAL': 'other',
  SINGAPORE: 'other',
}

// ─── Helpers ─────────────────────────────────────────────────────

function normalizeDeparturePortName(raw: string): string {
  // "Port Canaveral with 2 Stops at Castaway Cay" → "Port Canaveral"
  // "Fort Lauderdale with 2 stops at Castaway Cay" → "Fort Lauderdale"
  return raw.split(/\s+with\s+/i)[0].trim()
}

function detectTheme(itineraryImage: string, title: string): Sailing['theme'] {
  const haystack = `${itineraryImage} ${title}`.toLowerCase()
  if (haystack.includes('halloween')) return 'halloween'
  if (haystack.includes('merrytime') || haystack.includes('very-merrytime')) return 'merrytime'
  if (haystack.includes('star-wars') || haystack.includes('star wars')) return 'starwars'
  if (haystack.includes('marvel')) return 'marvel'
  return undefined
}

/**
 * Build a best-effort itinerary list. Apify gives us a per-port-stop ordinal
 * (`day`) but no at-sea-day data, so we book-end the stops with embark/
 * disembark entries and let the UI render whatever it has.
 */
function buildItinerary(record: ApifyRecord, lengthNights: number): ItineraryDay[] {
  const days: ItineraryDay[] = []
  days.push({
    day: 1,
    port: record.departurePort.name,
    description: 'Embarkation',
  })
  for (const stop of record.portsOfCall) {
    const dayNum = parseInt(stop.day, 10)
    days.push({
      day: Number.isFinite(dayNum) ? dayNum + 1 : days.length + 1,
      port: stop.name,
      description: stop.name === 'At Sea' ? 'Day at sea' : 'Port of call',
    })
  }
  days.push({
    day: lengthNights + 1,
    port: record.arrivalPort.name,
    description: 'Disembarkation',
  })
  return days
}

/** Per-person → total-for-2, rounded. Returns null if input is missing. */
function pricePerCabin(perPerson: string | undefined): number | null {
  if (!perPerson) return null
  const n = parseFloat(perPerson)
  if (!Number.isFinite(n) || n <= 0) return null
  return Math.round(n * 2)
}

/**
 * Lightweight sailing score (0–100). Without price history we lean on
 * per-night-per-person value, so a $200/pp/night cruise scores higher than
 * a $600/pp/night one. The real scorer in `lib/deal-score.ts` takes over
 * once price snapshots accumulate.
 */
function computeSailingScore(perPersonLowest: number, lengthNights: number): number {
  if (!perPersonLowest || !lengthNights) return 70
  const perNight = perPersonLowest / lengthNights
  // ~$150/night → 95, $300/night → 80, $600/night → 60, $1000+ → ~45
  const score = 100 - Math.min(55, Math.max(0, (perNight - 150) / 17))
  return Math.round(score)
}

// ─── Fetch ───────────────────────────────────────────────────────

async function fetchRecords(): Promise<ApifyRecord[]> {
  if (FROM_FILE) {
    console.log(`[apify] Reading records from local file: ${FROM_FILE}`)
    const buf = fs.readFileSync(FROM_FILE, 'utf-8')
    return JSON.parse(buf)
  }
  if (!APIFY_TOKEN) {
    throw new Error(
      'APIFY_TOKEN env var is required (or set FROM_FILE to read a local dump).'
    )
  }
  const url = `https://api.apify.com/v2/datasets/${DATASET_ID}/items?token=${APIFY_TOKEN}&format=json`
  console.log(`[apify] Fetching dataset ${DATASET_ID}…`)
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`Apify fetch failed: ${res.status} ${res.statusText}`)
  }
  return (await res.json()) as ApifyRecord[]
}

// ─── Transform ───────────────────────────────────────────────────

interface TransformStats {
  total: number
  written: number
  skippedUnknownShip: Map<string, number>
  skippedUnknownPort: Map<string, number>
  skippedNoPrice: number
  themes: Map<string, number>
  regions: Map<string, number>
}

function transform(records: ApifyRecord[]): { sailings: Sailing[]; stats: TransformStats } {
  const stats: TransformStats = {
    total: records.length,
    written: 0,
    skippedUnknownShip: new Map(),
    skippedUnknownPort: new Map(),
    skippedNoPrice: 0,
    themes: new Map(),
    regions: new Map(),
  }

  const sailings: Sailing[] = []

  for (const r of records) {
    const ship_id = SHIP_NAME_TO_ID[r.shipName]
    if (!ship_id) {
      stats.skippedUnknownShip.set(r.shipName, (stats.skippedUnknownShip.get(r.shipName) ?? 0) + 1)
      continue
    }

    const portKey = normalizeDeparturePortName(r.departurePort.name)
    const departure_port_id = PORT_NAME_TO_ID[portKey]
    if (!departure_port_id) {
      stats.skippedUnknownPort.set(portKey, (stats.skippedUnknownPort.get(portKey) ?? 0) + 1)
      continue
    }

    const lengthNights = parseInt(r.duration, 10)
    const perPersonLowest = parseFloat(r.price.amount)
    if (!Number.isFinite(perPersonLowest) || perPersonLowest <= 0 || !Number.isFinite(lengthNights)) {
      stats.skippedNoPrice++
      continue
    }

    const region = REGION_FROM_DESTINATION[r.destinationNames[0]] ?? 'other'
    if (region) stats.regions.set(region, (stats.regions.get(region) ?? 0) + 1)

    const theme = detectTheme(r.itineraryImage, r.title)
    if (theme) stats.themes.set(theme, (stats.themes.get(theme) ?? 0) + 1)

    const sailing: Sailing = {
      id: `sailing-${r.cruiseId}`,
      ship_id,
      departure_port_id,
      itinerary_name: r.title,
      itinerary_details: buildItinerary(r, lengthNights),
      sail_date: r.departureDate,
      length_nights: lengthNights,
      current_lowest_price: Math.round(perPersonLowest * 2),
      current_inside_price: pricePerCabin(r.price_USD_I),
      current_oceanview_price: pricePerCabin(r.price_USD_O),
      current_verandah_price: pricePerCabin(r.price_USD_B),
      current_concierge_price: pricePerCabin(r.price_USD_SU),
      sailing_score: computeSailingScore(perPersonLowest, lengthNights),
      is_featured: false, // assigned below
      notes: `Sourced from Disney Cruise Line via Apify dataset ${DATASET_ID}`,
      disney_booking_url: r.source_url,
      created_at: '2026-05-04T00:00:00Z',
      updated_at: new Date().toISOString(),
      region,
      theme,
    }

    sailings.push(sailing)
  }

  // Sort by departure date for stable output, then mark the top 12 by score
  // (departing within the next 12 months) as featured.
  sailings.sort((a, b) => a.sail_date.localeCompare(b.sail_date))

  const now = Date.now()
  const oneYearFromNow = now + 365 * 24 * 60 * 60 * 1000
  const featured = sailings
    .filter(s => {
      const t = new Date(s.sail_date).getTime()
      return t >= now && t <= oneYearFromNow
    })
    .slice()
    .sort((a, b) => (b.sailing_score ?? 0) - (a.sailing_score ?? 0))
    .slice(0, 12)
  const featuredIds = new Set(featured.map(s => s.id))
  for (const s of sailings) {
    if (featuredIds.has(s.id)) s.is_featured = true
  }

  stats.written = sailings.length
  return { sailings, stats }
}

// ─── Main ────────────────────────────────────────────────────────

async function main() {
  const records = await fetchRecords()
  console.log(`[apify] Loaded ${records.length} records`)

  const { sailings, stats } = transform(records)

  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true })
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(sailings, null, 2))

  console.log(`[apify] Wrote ${stats.written}/${stats.total} sailings → ${OUTPUT_PATH}`)
  if (stats.skippedNoPrice) {
    console.log(`[apify]   skipped (no price/duration): ${stats.skippedNoPrice}`)
  }
  if (stats.skippedUnknownShip.size) {
    console.log(`[apify]   skipped (unknown ship): ${JSON.stringify(Object.fromEntries(stats.skippedUnknownShip))}`)
  }
  if (stats.skippedUnknownPort.size) {
    console.log(`[apify]   skipped (unknown departure port): ${JSON.stringify(Object.fromEntries(stats.skippedUnknownPort))}`)
  }
  console.log(`[apify]   regions: ${JSON.stringify(Object.fromEntries(stats.regions))}`)
  console.log(`[apify]   themes: ${JSON.stringify(Object.fromEntries(stats.themes))}`)
}

main().catch(err => {
  console.error('[apify] FAILED:', err)
  process.exit(1)
})

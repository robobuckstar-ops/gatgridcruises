/**
 * Disney Cruise Price Scraper
 *
 * Infrastructure for fetching and storing Disney cruise pricing data.
 * Run on a schedule (e.g., daily via cron or Vercel Cron Jobs).
 *
 * Usage:
 *   npx tsx scripts/scrape-prices.ts
 *   npx tsx scripts/scrape-prices.ts --ship=disney-wish
 *   npx tsx scripts/scrape-prices.ts --dry-run
 */

import * as fs from 'fs'
import * as path from 'path'

// ─── Configuration ────────────────────────────────────────────

const CONFIG = {
  /** Base URL for Disney Cruise Line search */
  baseUrl: 'https://disneycruise.disney.go.com',

  /** Path to store price snapshot history */
  outputDir: path.join(process.cwd(), 'data', 'price-history'),

  /** Snapshot index file (latest prices, one entry per sailing) */
  snapshotFile: path.join(process.cwd(), 'data', 'price-history', 'latest.json'),

  /** Historical log (append-only, one JSON line per fetch) */
  historyFile: path.join(process.cwd(), 'data', 'price-history', 'history.ndjson'),

  /** User-agent to identify our scraper honestly */
  userAgent: 'GatGridCruises-PriceBot/1.0 (+https://gatgridcruises.com/about)',

  /** Milliseconds between requests to be polite to Disney's servers */
  requestDelay: 2000,

  /** Timeout per request in milliseconds */
  requestTimeout: 15000,
}

// ─── Types ────────────────────────────────────────────────────

interface PriceSnapshot {
  sailingId: string
  ship: string
  departureDate: string
  lengthNights: number
  itineraryName: string
  departurePort: string
  lowestPrice: number
  currency: 'USD'
  cabinCategory: 'interior' | 'oceanview' | 'verandah' | 'concierge'
  fetchedAt: string  // ISO 8601 timestamp
  sourceUrl: string
  httpStatus: number
  /** ETag or Last-Modified value for conditional requests */
  etag?: string
  lastModified?: string
}

interface SnapshotIndex {
  updatedAt: string
  count: number
  snapshots: PriceSnapshot[]
}

// ─── HTTP helpers ─────────────────────────────────────────────

interface FetchOptions {
  /** ETag from a previous response — sends If-None-Match */
  etag?: string
  /** Last-Modified value from a previous response — sends If-Modified-Since */
  lastModified?: string
}

interface FetchResult {
  status: number
  body: string | null
  etag?: string
  lastModified?: string
  /** True when the server returned 304 Not Modified */
  notModified: boolean
}

async function fetchWithConditional(url: string, options: FetchOptions = {}): Promise<FetchResult> {
  const headers: Record<string, string> = {
    'User-Agent': CONFIG.userAgent,
    'Accept': 'application/json, text/html',
  }

  // Conditional request headers (saves bandwidth if content hasn't changed)
  if (options.etag) {
    headers['If-None-Match'] = options.etag
  }
  if (options.lastModified) {
    headers['If-Modified-Since'] = options.lastModified
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), CONFIG.requestTimeout)

  try {
    const response = await fetch(url, {
      headers,
      signal: controller.signal,
    })

    clearTimeout(timeout)

    if (response.status === 304) {
      return {
        status: 304,
        body: null,
        notModified: true,
        etag: options.etag,
        lastModified: options.lastModified,
      }
    }

    const body = await response.text()

    return {
      status: response.status,
      body,
      notModified: false,
      etag: response.headers.get('etag') ?? undefined,
      lastModified: response.headers.get('last-modified') ?? undefined,
    }
  } catch (err) {
    clearTimeout(timeout)
    throw err
  }
}

// ─── Storage helpers ──────────────────────────────────────────

function ensureOutputDir(): void {
  if (!fs.existsSync(CONFIG.outputDir)) {
    fs.mkdirSync(CONFIG.outputDir, { recursive: true })
    console.log(`Created output directory: ${CONFIG.outputDir}`)
  }
}

function loadExistingSnapshots(): SnapshotIndex {
  if (!fs.existsSync(CONFIG.snapshotFile)) {
    return { updatedAt: new Date().toISOString(), count: 0, snapshots: [] }
  }
  return JSON.parse(fs.readFileSync(CONFIG.snapshotFile, 'utf-8')) as SnapshotIndex
}

function saveSnapshots(index: SnapshotIndex): void {
  index.updatedAt = new Date().toISOString()
  index.count = index.snapshots.length
  fs.writeFileSync(CONFIG.snapshotFile, JSON.stringify(index, null, 2), 'utf-8')
}

function appendHistory(snapshot: PriceSnapshot): void {
  fs.appendFileSync(CONFIG.historyFile, JSON.stringify(snapshot) + '\n', 'utf-8')
}

function upsertSnapshot(index: SnapshotIndex, snapshot: PriceSnapshot): void {
  const idx = index.snapshots.findIndex(
    (s) => s.sailingId === snapshot.sailingId && s.cabinCategory === snapshot.cabinCategory
  )
  if (idx >= 0) {
    index.snapshots[idx] = snapshot
  } else {
    index.snapshots.push(snapshot)
  }
}

// ─── Scraping logic ───────────────────────────────────────────

/**
 * TODO: Implement actual price extraction from Disney's website.
 *
 * Disney Cruise Line doesn't publish a public API, so you have two options:
 *
 * Option A — Scrape the search results page
 *   URL pattern: https://disneycruise.disney.go.com/cruises-and-packages/results/
 *   The page renders client-side, so you'll need a headless browser (Playwright/Puppeteer)
 *   to get the rendered HTML. Then parse the price elements.
 *
 * Option B — Reverse-engineer the internal API
 *   The DCL website calls internal JSON endpoints when searching. Use your browser's
 *   DevTools > Network tab while searching to find these XHR requests.
 *   They may look like: /api/pricing/v2/sailings?departureDate=...
 *
 * Option C — Third-party data provider
 *   Services like Cruiseline.com or CruiseCritic publish price data that may be
 *   accessible for affiliate partners.
 *
 * For now, this function returns a mock result to validate the storage pipeline.
 */
async function scrapeSailingPrice(
  sailingId: string,
  _previousSnapshot?: PriceSnapshot
): Promise<PriceSnapshot | null> {
  // TODO: Replace this mock with real scraping logic
  const mockPrices: Record<string, number> = {
    'disney-wish-2024-01-06': 2849,
    'disney-fantasy-2024-01-13': 2199,
    'disney-dream-2024-01-20': 1899,
    'disney-magic-2024-02-03': 3100,
  }

  const price = mockPrices[sailingId]
  if (!price) {
    console.warn(`  No mock data for sailing ${sailingId} — skipping`)
    return null
  }

  // Simulate a request delay
  await new Promise((resolve) => setTimeout(resolve, CONFIG.requestDelay))

  return {
    sailingId,
    ship: sailingId.split('-').slice(0, 2).join(' '),
    departureDate: sailingId.split('-').slice(2).join('-'),
    lengthNights: 4,
    itineraryName: 'Bahamian',
    departurePort: 'Port Canaveral',
    lowestPrice: price,
    currency: 'USD',
    cabinCategory: 'interior',
    fetchedAt: new Date().toISOString(),
    sourceUrl: `${CONFIG.baseUrl}/cruises-and-packages/results/`,
    httpStatus: 200,
  }
}

// ─── Entry point ───────────────────────────────────────────────

async function main() {
  const isDryRun = process.argv.includes('--dry-run')
  const shipFilter = process.argv.find((a) => a.startsWith('--ship='))?.split('=')[1]

  console.log('='.repeat(60))
  console.log('GatGridCruises Price Scraper')
  console.log(`Started: ${new Date().toISOString()}`)
  if (isDryRun) console.log('DRY RUN — no files will be written')
  if (shipFilter) console.log(`Filtering to ship: ${shipFilter}`)
  console.log('='.repeat(60))

  ensureOutputDir()

  const index = loadExistingSnapshots()
  console.log(`Loaded ${index.count} existing snapshots\n`)

  // TODO: Replace with real sailing IDs from your database or a discovery step
  const sailingIds = [
    'disney-wish-2024-01-06',
    'disney-fantasy-2024-01-13',
    'disney-dream-2024-01-20',
    'disney-magic-2024-02-03',
  ].filter((id) => !shipFilter || id.includes(shipFilter))

  let updated = 0
  let skipped = 0
  let errors = 0

  for (const sailingId of sailingIds) {
    console.log(`Fetching: ${sailingId}`)

    const previousSnapshot = index.snapshots.find((s) => s.sailingId === sailingId)

    try {
      const snapshot = await scrapeSailingPrice(sailingId, previousSnapshot)

      if (!snapshot) {
        skipped++
        continue
      }

      if (previousSnapshot && previousSnapshot.lowestPrice === snapshot.lowestPrice) {
        console.log(`  Price unchanged: $${snapshot.lowestPrice} — skipping history write`)
        skipped++
        continue
      }

      if (previousSnapshot) {
        const delta = snapshot.lowestPrice - previousSnapshot.lowestPrice
        const direction = delta > 0 ? '↑' : '↓'
        console.log(
          `  Price changed: $${previousSnapshot.lowestPrice} → $${snapshot.lowestPrice} (${direction}$${Math.abs(delta)})`
        )
      } else {
        console.log(`  New sailing: $${snapshot.lowestPrice}`)
      }

      if (!isDryRun) {
        upsertSnapshot(index, snapshot)
        appendHistory(snapshot)
      }

      updated++
    } catch (err) {
      console.error(`  ERROR: ${err instanceof Error ? err.message : String(err)}`)
      errors++
    }
  }

  if (!isDryRun) {
    saveSnapshots(index)
  }

  console.log('\n' + '='.repeat(60))
  console.log(`Done: ${updated} updated, ${skipped} skipped, ${errors} errors`)
  console.log(`Finished: ${new Date().toISOString()}`)
  console.log('='.repeat(60))

  if (errors > 0) {
    process.exit(1)
  }
}

main().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})

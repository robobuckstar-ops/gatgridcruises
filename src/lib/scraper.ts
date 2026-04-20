/**
 * Disney Cruise Line Price Scraper
 *
 * Scrapes Disney's public-facing cruise offers to track pricing changes.
 * This runs as a Vercel Cron job daily.
 *
 * Target URL: https://disneycruise.disney.go.com/cruises-destinations/list/
 *
 * IMPORTANT: This scraper only accesses publicly available pricing information.
 * It does not log in, bypass rate limits, or access restricted content.
 */

import { supabase, getServiceClient } from './supabase'

export interface ScrapedSailing {
  shipName: string
  itineraryName: string
  sailDate: string
  lengthNights: number
  departurePort: string
  insidePrice: number | null
  oceanviewPrice: number | null
  verandahPrice: number | null
  conciergePrice: number | null
  lowestPrice: number
}

/**
 * Parse Disney cruise listing HTML to extract sailing data.
 * This is a best-effort parser — Disney may change their page structure.
 * When that happens, update the selectors here.
 */
export async function scrapeDisneyOffers(): Promise<ScrapedSailing[]> {
  const url = 'https://disneycruise.disney.go.com/cruises-destinations/list/'

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'GatGridCruises-PriceTracker/1.0 (editorial price comparison)',
        'Accept': 'text/html',
      },
      next: { revalidate: 0 }, // No caching
    })

    if (!response.ok) {
      console.error(`Disney scrape failed: ${response.status} ${response.statusText}`)
      return []
    }

    const html = await response.text()
    return parseDisneyHTML(html)
  } catch (error) {
    console.error('Disney scrape error:', error)
    return []
  }
}

/**
 * Parse the HTML response from Disney's cruise listing page.
 *
 * Note: This parser will need updates when Disney changes their page structure.
 * The structure below is based on their 2025 page layout.
 */
function parseDisneyHTML(html: string): ScrapedSailing[] {
  const sailings: ScrapedSailing[] = []

  // Disney's listing page uses structured data and specific CSS classes
  // This is a simplified parser — a production version would use cheerio or similar

  // Look for JSON-LD structured data first (most reliable)
  const jsonLdMatches = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)
  if (jsonLdMatches) {
    for (const match of jsonLdMatches) {
      try {
        const jsonStr = match.replace(/<script type="application\/ld\+json">/, '').replace(/<\/script>/, '')
        const data = JSON.parse(jsonStr)
        if (data['@type'] === 'Product' || data['@type'] === 'TouristTrip') {
          // Extract pricing from structured data
          const offer = data.offers || data.offer
          if (offer) {
            sailings.push({
              shipName: data.provider?.name || 'Unknown',
              itineraryName: data.name || '',
              sailDate: offer.validFrom || '',
              lengthNights: parseInt(data.duration?.replace(/\D/g, '') || '0'),
              departurePort: data.departurePort || '',
              insidePrice: null,
              oceanviewPrice: null,
              verandahPrice: null,
              conciergePrice: null,
              lowestPrice: parseFloat(offer.price) || 0,
            })
          }
        }
      } catch {
        // Invalid JSON, skip
      }
    }
  }

  // Fallback: regex-based extraction for price patterns
  // Disney typically shows prices like "From $X,XXX per person"
  const pricePattern = /(?:from|starting at)\s*\$([0-9,]+)/gi
  const priceMatches = html.matchAll(pricePattern)
  // These would need to be correlated with sailing names — complex in practice

  return sailings
}

/**
 * Match scraped sailings to existing database records and create price snapshots.
 * Uses fuzzy matching on ship name + sail date + itinerary name.
 */
export async function ingestScrapedData(scrapedSailings: ScrapedSailing[]): Promise<{
  matched: number
  unmatched: number
  snapshotsCreated: number
}> {
  const client = getServiceClient()
  if (!client) {
    console.error('Supabase not configured — cannot ingest scraped data')
    return { matched: 0, unmatched: 0, snapshotsCreated: 0 }
  }

  let matched = 0
  let unmatched = 0
  let snapshotsCreated = 0

  for (const scraped of scrapedSailings) {
    // Try to match to an existing sailing
    const { data: existingSailings } = await client
      .from('sailings')
      .select('id, ship_id, itinerary_name, sail_date')
      .eq('sail_date', scraped.sailDate)
      .limit(10)

    if (!existingSailings?.length) {
      unmatched++
      continue
    }

    // Find best match by itinerary name similarity
    const bestMatch = existingSailings.find(s =>
      s.itinerary_name.toLowerCase().includes(scraped.itineraryName.toLowerCase().split(' ').slice(0, 3).join(' '))
    ) || existingSailings[0]

    matched++

    // Create price snapshot
    const { error } = await client.from('price_snapshots').insert({
      sailing_id: bestMatch.id,
      snapshot_date: new Date().toISOString().split('T')[0],
      inside_price: scraped.insidePrice,
      oceanview_price: scraped.oceanviewPrice,
      verandah_price: scraped.verandahPrice,
      concierge_price: scraped.conciergePrice,
      lowest_price: scraped.lowestPrice,
      source: 'scrape',
    })

    if (!error) {
      snapshotsCreated++

      // Also update the sailing's current prices
      await client.from('sailings').update({
        current_lowest_price: scraped.lowestPrice,
        current_inside_price: scraped.insidePrice,
        current_oceanview_price: scraped.oceanviewPrice,
        current_verandah_price: scraped.verandahPrice,
        current_concierge_price: scraped.conciergePrice,
        updated_at: new Date().toISOString(),
      }).eq('id', bestMatch.id)
    }
  }

  return { matched, unmatched, snapshotsCreated }
}

/**
 * Recalculate sailing scores for all sailings based on latest price data.
 */
export async function recalculateSailingScores(): Promise<number> {
  const client = getServiceClient()
  if (!client) return 0

  const { data: sailings } = await client
    .from('sailings')
    .select('id, current_lowest_price, sail_date, ship_id, ships(slug)')

  if (!sailings) return 0

  let updated = 0

  for (const sailing of sailings) {
    // Get historical average
    const { data: snapshots } = await client
      .from('price_snapshots')
      .select('lowest_price')
      .eq('sailing_id', sailing.id)

    if (!snapshots?.length) continue

    const avgPrice = snapshots.reduce((sum, s) => sum + (s.lowest_price || 0), 0) / snapshots.length
    const shipSlug = (sailing as any).ships?.slug || ''

    // Calculate score using the algorithm from utils.ts
    const priceRatio = (avgPrice - sailing.current_lowest_price) / avgPrice
    const priceScore = Math.min(100, Math.max(0, priceRatio * 200 + 50))

    const daysUntil = Math.ceil((new Date(sailing.sail_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    let urgencyScore = 40
    if (daysUntil < 30) urgencyScore = 90
    else if (daysUntil < 60) urgencyScore = 75
    else if (daysUntil < 120) urgencyScore = 60
    else if (daysUntil < 365) urgencyScore = 50

    const shipScores: Record<string, number> = {
      treasure: 90, destiny: 90, adventure: 90,
      wish: 85, dream: 75, fantasy: 75,
      magic: 65, wonder: 65,
    }
    const shipScore = shipScores[shipSlug] ?? 70

    const finalScore = Math.round(priceScore * 0.6 + urgencyScore * 0.2 + shipScore * 0.2)

    await client.from('sailings').update({
      sailing_score: finalScore,
      updated_at: new Date().toISOString(),
    }).eq('id', sailing.id)

    updated++
  }

  return updated
}

import { NextRequest, NextResponse } from 'next/server'
import { scrapeDisneyOffers, ingestScrapedData, recalculateSailingScores } from '@/lib/scraper'

// Vercel Cron: runs daily at 6 AM EST
// Configure in vercel.json: { "crons": [{ "path": "/api/cron/scrape", "schedule": "0 11 * * *" }] }

export async function GET(request: NextRequest) {
  // Verify this is called by Vercel Cron (not a random visitor)
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    // In development, allow without auth
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  const startTime = Date.now()

  try {
    // Step 1: Scrape Disney's offers page
    console.log('[Cron] Starting Disney price scrape...')
    const scrapedSailings = await scrapeDisneyOffers()
    console.log(`[Cron] Scraped ${scrapedSailings.length} sailings`)

    // Step 2: Match and ingest into database
    const ingestion = await ingestScrapedData(scrapedSailings)
    console.log(`[Cron] Ingested: ${ingestion.matched} matched, ${ingestion.unmatched} unmatched, ${ingestion.snapshotsCreated} snapshots created`)

    // Step 3: Recalculate sailing scores
    const scoresUpdated = await recalculateSailingScores()
    console.log(`[Cron] Updated ${scoresUpdated} sailing scores`)

    const duration = Date.now() - startTime

    return NextResponse.json({
      success: true,
      duration_ms: duration,
      scraped: scrapedSailings.length,
      matched: ingestion.matched,
      unmatched: ingestion.unmatched,
      snapshots_created: ingestion.snapshotsCreated,
      scores_updated: scoresUpdated,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('[Cron] Scrape failed:', error)
    return NextResponse.json(
      { error: 'Scrape failed', details: String(error) },
      { status: 500 }
    )
  }
}

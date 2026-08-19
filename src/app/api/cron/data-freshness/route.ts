// Twice-weekly cruise-data freshness check.
//
// Runs Monday and Thursday via the Vercel cron entry in vercel.json. It sends
// nothing and writes nothing — it reads the committed sailing catalog, counts
// how much of it has gone stale, and reports. The point is that expired rows
// can't pile up unnoticed: `lib/data.ts` hides them from the public site
// silently, so without this the only symptom of a stale snapshot is deal pages
// slowly emptying out.
//
// Run it by hand any time:
//   curl "https://gatgridcruises.com/api/cron/data-freshness?secret=$CRON_SECRET"
//
// When `needs_refresh` is true, regenerate the catalog and commit the result:
//   APIFY_TOKEN=… APIFY_DATASET_ID=… npx tsx scripts/fetch-apify-data.ts

import { NextRequest, NextResponse } from 'next/server'
import { isAuthorizedCronRequest } from '@/lib/cron-auth'
import { buildFreshnessReport } from '@/lib/data-freshness'

export const runtime = 'nodejs'
// The report is a function of today's date, so it must never be cached.
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  if (!isAuthorizedCronRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const report = buildFreshnessReport()

  // Cron output is only ever read in the Vercel logs, so say it plainly there.
  if (report.needsRefresh) {
    console.warn('[data-freshness] catalog needs a refresh:')
    for (const reason of report.reasons) console.warn(`[data-freshness]  - ${reason}`)
  } else {
    console.log(
      `[data-freshness] ok — ${report.bookable}/${report.total} bookable, ` +
      `${report.nearTerm} inside 90 days, snapshot ${report.snapshotAgeDays}d old`,
    )
  }

  // Always 200, including when a refresh is needed: a stale catalog is a
  // content problem for a human to act on, not a failed cron invocation for
  // Vercel to retry.
  return NextResponse.json({
    ok: true,
    needs_refresh: report.needsRefresh,
    reasons: report.reasons,
    checked_at: new Date().toISOString(),
    report,
  })
}

// Abandoned quote-request report.
//
// Finds quote requests still sitting unworked in the CRM ~48 hours after they
// came in, and returns a drafted reply for each. It IDENTIFIES AND PREPARES.
// It does not send.
//
// That boundary is deliberate and there is no send path in this file or in
// lib/abandoned-quotes.ts to turn on. Mail to someone who asked for a price is
// the start of a sales conversation; it goes out when a person has read the
// draft and decided to send it, not when a cron fires. The drafts here are
// text to copy, edit, and send from the real inbox.
//
// Guards:
//   CRON_SECRET                — required, same as every other cron route.
//   ABANDONED_QUOTES_MARK_CRM  — optional, default off. When set to "true" the
//                                route additionally stamps each flagged lead's
//                                Next Follow-Up field with today's date so the
//                                CRM view surfaces it. Still no email.
//
// Runs daily via vercel.json. Manual check:
//   curl "https://gatgridcruises.com/api/cron/abandoned-quotes?secret=$CRON_SECRET"

import { NextRequest, NextResponse } from 'next/server'
import { isAuthorizedCronRequest } from '@/lib/cron-auth'
import {
  ABANDONED_AFTER_HOURS,
  STALE_AFTER_DAYS,
  findAbandonedQuotes,
} from '@/lib/abandoned-quotes'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/** Opt-in CRM stamping. Anything other than an explicit "true" leaves it off. */
function markingEnabled(): boolean {
  return process.env.ABANDONED_QUOTES_MARK_CRM?.trim().toLowerCase() === 'true'
}

export async function GET(request: NextRequest) {
  if (!isAuthorizedCronRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const markInCrm = markingEnabled()

  let report
  try {
    report = await findAbandonedQuotes({ markInCrm })
  } catch (err) {
    console.error('[abandoned-quotes] CRM read failed:', err)
    return NextResponse.json(
      { ok: false, error: 'Airtable read failed', details: String(err) },
      { status: 502 },
    )
  }

  if (!report.configured) {
    console.error('[abandoned-quotes] AIRTABLE_API_KEY not set — nothing scanned')
    return NextResponse.json(
      { ok: false, error: 'AIRTABLE_API_KEY not configured' },
      { status: 500 },
    )
  }

  // The Vercel log is where this actually gets noticed, so name the people.
  if (report.abandoned.length > 0) {
    console.warn(
      `[abandoned-quotes] ${report.abandoned.length} quote request(s) unanswered ` +
      `after ${ABANDONED_AFTER_HOURS}h:`,
    )
    for (const q of report.abandoned) {
      console.warn(
        `[abandoned-quotes]  - ${q.email} (${q.source}) waiting ${q.hoursWaiting}h`,
      )
    }
  } else {
    console.log(`[abandoned-quotes] none — scanned ${report.scanned} leads`)
  }

  return NextResponse.json({
    ok: true,
    // Stated in the payload as well as the comments so it is obvious to anyone
    // reading the response that nothing was mailed.
    emails_sent: 0,
    sending_enabled: false,
    marked_in_crm: markInCrm,
    threshold_hours: ABANDONED_AFTER_HOURS,
    ignored_after_days: STALE_AFTER_DAYS,
    scanned: report.scanned,
    abandoned_count: report.abandoned.length,
    abandoned: report.abandoned,
    marked: report.marked,
    errors: report.errors,
    checked_at: new Date().toISOString(),
  })
}

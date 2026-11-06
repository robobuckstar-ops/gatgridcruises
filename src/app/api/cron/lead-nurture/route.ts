import { NextRequest, NextResponse } from 'next/server'
import { getAirtableKey, listRecords, updateRecord } from '@/lib/airtable-client'
import { LEAD_FIELDS, LEADS_TABLE, STATUS_DATE_FIELDS, STATUS_FIELD } from '@/lib/airtable-leads'
import { isAuthorizedCronRequest } from '@/lib/cron-auth'
import { dateFromText, isTestLead } from '@/lib/lead-tracking'
import { leadUnsubscribeUrl } from '@/lib/lead-unsubscribe'
import { POSSIBLE_BOT_SOURCE } from '@/lib/possible-bot'
import { nextNurtureStep, NURTURE_STEPS, nurtureEmailHtml } from '@/lib/nurture-emails'
import { emailTransportConfigured, sendLifecycleEmail } from '@/lib/send-email'
import { findSubscriberByEmail, STATUS_UNSUBSCRIBED } from '@/lib/subscriber-store'

export const runtime = 'nodejs'
export const maxDuration = 60

// Nurture emails on days 3, 5, 8 and 12 after a lead comes in. Progress lives in
// the Drip Sequence column, so each email goes out once even if a run is missed.
// Also stamps the date column for each Status the first time a lead reaches it.

const EXCLUDED_STAGES = ['Converted', 'Lost', 'Unsubscribed', 'Ready to Book']
const ACTIVE_STATUSES = ['', 'New', 'Replied']
/** Older leads never started this sequence, so don't start it for them now. */
const MAX_AGE_TO_START_DAYS = NURTURE_STEPS[NURTURE_STEPS.length - 1].day + 4

function text(fields: Record<string, unknown>, name: string): string {
  const raw = fields[name]
  return raw === null || raw === undefined ? '' : String(raw).trim()
}

function daysSince(date: string): number {
  return Math.floor((Date.now() - new Date(date).getTime()) / 86_400_000)
}

export async function GET(request: NextRequest) {
  if (!isAuthorizedCronRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const apiKey = getAirtableKey()
  if (!apiKey) return NextResponse.json({ error: 'AIRTABLE_API_KEY not configured' }, { status: 500 })
  if (!emailTransportConfigured()) {
    return NextResponse.json({ error: 'no email transport configured' }, { status: 500 })
  }

  const preview = new URL(request.url).searchParams.get('preview') === '1'
  const sent: string[] = []
  const errors: string[] = []
  const stamped: string[] = []
  const today = new Date().toISOString().slice(0, 10)

  const records = await listRecords(
    LEADS_TABLE,
    { filterByFormula: 'AND({Email}!="",{Drip Sequence}!="Completed",{Drip Sequence}!="Opted Out")' },
    apiKey,
  )

  for (const record of records) {
    const f = record.fields
    const status = text(f, STATUS_FIELD)

    const dateField = STATUS_DATE_FIELDS[status]
    if (dateField && !text(f, dateField) && !preview) {
      try {
        await updateRecord(LEADS_TABLE, record.id, { [dateField]: today }, apiKey, 'leads.statusDate')
        stamped.push(record.id)
      } catch (err) {
        errors.push(`${record.id}: ${err}`)
      }
    }

    const name = text(f, 'Lead Name')
    const email = text(f, 'Email')
    const firstContact = text(f, 'First Contact Date')
    if (!email || !firstContact || isTestLead(name)) continue
    if (text(f, 'Lead Source') === POSSIBLE_BOT_SOURCE) continue
    if (!ACTIVE_STATUSES.includes(status) || EXCLUDED_STAGES.includes(text(f, 'Pipeline Stage'))) continue

    const current = text(f, 'Drip Sequence')
    const elapsed = daysSince(firstContact)
    if ((current === '' || current === 'Not Started') && elapsed > MAX_AGE_TO_START_DAYS) continue
    const step = nextNurtureStep(current, elapsed)
    if (!step) continue

    const unsubscribeUrl = leadUnsubscribeUrl(email)
    if (!unsubscribeUrl) {
      errors.push('no unsubscribe secret: set LEAD_UNSUBSCRIBE_SECRET or CRON_SECRET')
      break
    }

    try {
      const subscriber = await findSubscriberByEmail(email).catch(() => null)
      if (subscriber?.status === STATUS_UNSUBSCRIBED) continue
      if (preview) {
        sent.push(`${step.label}:${record.id}`)
        continue
      }
      const interest = text(f, 'Interested In')
      await sendLifecycleEmail({
        to: email,
        name,
        subject: step.subject,
        html: nurtureEmailHtml(
          step,
          { name, interest, windowStart: dateFromText(interest) ?? undefined },
          unsubscribeUrl,
        ),
        fromName: 'Grayson Starbuck - GatGrid Cruises',
      })
      const isLast = step === NURTURE_STEPS[NURTURE_STEPS.length - 1]
      await updateRecord(
        LEADS_TABLE,
        record.id,
        {
          [LEAD_FIELDS.dripSequence]: isLast ? 'Completed' : step.label,
          [LEAD_FIELDS.lastContactDate]: today,
        },
        apiKey,
        'leads.nurture',
      )
      sent.push(`${step.label}:${record.id}`)
    } catch (err) {
      errors.push(`${record.id}: ${err}`)
    }
  }

  return NextResponse.json({
    preview,
    scanned: records.length,
    processed: sent.length,
    sent,
    stamped: stamped.length,
    errors,
    timestamp: new Date().toISOString(),
  })
}

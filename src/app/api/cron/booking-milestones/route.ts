// Daily post-booking milestone cron. Scans every active booking and fires any
// lifecycle touchpoint that's due today: welcome, tier-based check-in reminder,
// final-payment reminder, bon voyage, post-cruise follow-up (client, via Brevo),
// and the commission-submission reminder (agent, via Pushover). Each touchpoint
// is gated by a per-booking "sent" checkbox so nothing double-fires, and every
// send is logged to the Touchpoints table.
//
// Add ?dryRun=1 to preview exactly what WOULD fire for each booking without
// sending, setting flags, or logging. That's the fast-forward mock.

import { NextRequest, NextResponse } from 'next/server'
import { isAuthorizedCronRequest } from '@/lib/cron-auth'
import { fetchClientName } from '@/lib/portal-airtable'
import { sendPushover } from '@/lib/pushover'
import {
  BK,
  BOOKINGS_TABLE,
  TOUCHPOINTS_TABLE,
  TP,
  dueMilestones,
  todayIsoEastern,
} from '@/lib/booking-milestones'

export const runtime = 'nodejs'
export const maxDuration = 60

const AIRTABLE_BASE = 'applSFcQkOus2fFsx'

async function airtableFetch(url: string, apiKey: string, options?: RequestInit) {
  const res = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    cache: 'no-store',
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Airtable ${res.status}: ${text}`)
  }
  return res.json()
}

async function sendBrevoEmail(
  apiKey: string,
  to: { email: string; name: string },
  subject: string,
  htmlContent: string,
) {
  const res = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: { accept: 'application/json', 'api-key': apiKey, 'content-type': 'application/json' },
    body: JSON.stringify({
      sender: { name: 'Grayson Starbuck - GatGrid Cruises', email: 'bookings@gatgridcruises.com' },
      to: [to],
      replyTo: { email: 'bookings@gatgridcruises.com', name: 'GatGrid Cruises' },
      subject,
      htmlContent,
    }),
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Brevo ${res.status}: ${text}`)
  }
  return res.json()
}

async function logTouchpoint(
  apiKey: string,
  bookingId: string,
  name: string,
  triggerLabel: string,
  preview: string,
) {
  try {
    await airtableFetch(`https://api.airtable.com/v0/${AIRTABLE_BASE}/${TOUCHPOINTS_TABLE}`, apiKey, {
      method: 'POST',
      body: JSON.stringify({
        typecast: true,
        fields: {
          [TP.name]: name,
          [TP.booking]: [bookingId],
          [TP.triggerDay]: triggerLabel,
          [TP.sentAt]: new Date().toISOString(),
          [TP.contentPreview]: preview.slice(0, 500),
        },
      }),
    })
  } catch (err) {
    console.error('[booking-milestones] touchpoint log failed (non-fatal):', err)
  }
}

export async function GET(request: NextRequest) {
  if (!isAuthorizedCronRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const dryRun = ['1', 'true', 'yes'].includes(
    (new URL(request.url).searchParams.get('dryRun') ?? '').toLowerCase(),
  )

  const airtableKey = process.env.AIRTABLE_API_KEY
  const brevoKey = process.env.BREVO_API_KEY
  if (!airtableKey) {
    return NextResponse.json({ error: 'AIRTABLE_API_KEY not configured' }, { status: 500 })
  }

  const today = todayIsoEastern()
  const fired: Array<Record<string, unknown>> = []
  const errors: string[] = []

  try {
    const fieldParams = Object.values(BK).map(id => `fields[]=${id}`).join('&')
    const formula = encodeURIComponent('AND({Phase}!="CANCELLED",{Sailing Date}!="")')
    const url =
      `https://api.airtable.com/v0/${AIRTABLE_BASE}/${BOOKINGS_TABLE}` +
      `?filterByFormula=${formula}&${fieldParams}&pageSize=100&returnFieldsByFieldId=true`

    const data = await airtableFetch(url, airtableKey)
    const records: Array<{ id: string; fields: Record<string, unknown> }> = data.records ?? []

    for (const rec of records) {
      const fields = rec.fields

      // Resolve the client's first name for a warm greeting.
      let firstName = ''
      const clientIds = fields[BK.client] as string[] | undefined
      if (clientIds?.length) {
        const full = await fetchClientName(clientIds[0], airtableKey).catch(() => '')
        firstName = full.trim().split(/\s+/)[0] || ''
      }

      const due = dueMilestones(fields, firstName, today)
      if (!due.length) continue

      for (const m of due) {
        if (dryRun) {
          fired.push({
            booking: fields[BK.bookingName],
            milestone: m.key,
            audience: m.audience,
            trigger: m.triggerLabel,
            wouldSendTo: m.audience === 'client' ? fields[BK.clientEmail] : 'Grayson (Pushover)',
          })
          continue
        }

        try {
          if (m.audience === 'client') {
            if (!brevoKey) {
              errors.push(`${m.key}:${rec.id}: BREVO_API_KEY not configured`)
              continue
            }
            const email = String(fields[BK.clientEmail] ?? '')
            await sendBrevoEmail(brevoKey, { email, name: firstName || 'there' }, m.subject!, m.html!)
            await logTouchpoint(airtableKey, rec.id, m.touchpointName, m.triggerLabel, m.subject!)
          } else {
            await sendPushover({ title: m.pushTitle!, message: m.pushMessage! })
            await logTouchpoint(airtableKey, rec.id, m.touchpointName, m.triggerLabel, m.pushMessage!)
          }

          // Flip the sent flag so it never fires again.
          await airtableFetch(
            `https://api.airtable.com/v0/${AIRTABLE_BASE}/${BOOKINGS_TABLE}/${rec.id}`,
            airtableKey,
            { method: 'PATCH', body: JSON.stringify({ fields: { [m.flagField]: true } }) },
          )

          fired.push({ booking: fields[BK.bookingName], milestone: m.key, trigger: m.triggerLabel })
        } catch (err) {
          errors.push(`${m.key}:${rec.id}: ${err}`)
        }
      }
    }
  } catch (err) {
    return NextResponse.json({ error: 'Failed to process bookings', detail: String(err) }, { status: 500 })
  }

  return NextResponse.json({
    dryRun,
    today,
    count: fired.length,
    fired,
    errors,
    timestamp: new Date().toISOString(),
  })
}

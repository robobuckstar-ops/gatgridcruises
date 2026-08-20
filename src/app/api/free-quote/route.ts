import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { checkRateLimit } from '@/lib/rate-limit'
import { saveLeadSafely } from '@/lib/airtable-leads'
import { AGENT_REPLY_TO, agentNotifyRecipients } from '@/lib/agent-inbox'

// Quote requests from the /free-quote paid-ad landing page.
//
// Same delivery contract as /api/transfer: the lead is written to the Airtable
// CRM and emailed to the agent inbox, and the request only fails if BOTH paths
// fail. Kept as its own route rather than folded into /api/concierge so the
// Source column reads "free-quote" — ad spend is only worth measuring if the
// leads it buys are distinguishable in the CRM.

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const AGENT_INBOX = AGENT_REPLY_TO

function sanitize(value: unknown, maxLen: number): string {
  return String(value ?? '').replace(/[<>]/g, '').trim().slice(0, maxLen)
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function agentNotificationHtml(p: {
  name: string
  email: string
  phone: string
  timeframe: string
  party_size: string
  sailing_interest: string
  notes: string
  referral_code?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
}): string {
  const blank = '<em style="color:#94A3B8;">not provided</em>'
  const rows: [string, string][] = [
    ['Name', escapeHtml(p.name)],
    ['Email', `<a href="mailto:${escapeHtml(p.email)}">${escapeHtml(p.email)}</a>`],
    ['Phone', p.phone ? escapeHtml(p.phone) : blank],
    ['Sail timeframe', escapeHtml(p.timeframe)],
    ['Party size', escapeHtml(p.party_size)],
    ['Ship / itinerary', p.sailing_interest ? escapeHtml(p.sailing_interest) : blank],
  ]
  if (p.referral_code) rows.push(['Referral code', escapeHtml(p.referral_code)])
  if (p.utm_source) rows.push(['UTM source', escapeHtml(p.utm_source)])
  if (p.utm_medium) rows.push(['UTM medium', escapeHtml(p.utm_medium)])
  if (p.utm_campaign) rows.push(['UTM campaign', escapeHtml(p.utm_campaign)])

  const rowsHtml = rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 10px;font-size:13px;color:#64748B;width:38%;">${k}</td><td style="padding:6px 10px;font-size:13px;color:#0F172A;font-weight:600;">${v}</td></tr>`,
    )
    .join('')

  const notesBlock = p.notes
    ? `<div style="margin-top:18px;background:#F8FAFC;border-left:4px solid #1E3A5F;padding:12px 14px;font-size:13px;color:#334155;line-height:1.5;"><strong>Notes:</strong><br>${escapeHtml(p.notes).replace(/\n/g, '<br>')}</div>`
    : ''

  return `<!DOCTYPE html>
<html><body style="margin:0;background:#F1F5F9;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F1F5F9;padding:24px 12px;"><tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#FFFFFF;border-radius:10px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);">
<tr><td style="background:#1E3A5F;padding:18px 24px;color:#D4AF37;font-family:Georgia,serif;font-size:18px;font-weight:bold;">Free quote request (paid ad)</td></tr>
<tr><td style="padding:22px 24px;">
<div style="margin-bottom:16px;background:#FEF3C7;border-left:4px solid #D4AF37;padding:10px 14px;font-size:13px;color:#78350F;line-height:1.5;">
<strong>Paid traffic.</strong> This lead cost money to acquire — reply today while the ad click is still fresh.
</div>
<table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border:1px solid #E2E8F0;border-radius:6px;overflow:hidden;">${rowsHtml}</table>
${notesBlock}
<p style="margin:24px 0 0;font-size:11px;color:#94A3B8;">Submitted via gatgridcruises.com /free-quote — reply directly to respond to ${escapeHtml(p.name)}.</p>
</td></tr></table>
</td></tr></table></body></html>`
}

function confirmationHtml(name: string): string {
  return `<!DOCTYPE html>
<html><body style="margin:0;background:#F1F5F9;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F1F5F9;padding:24px 12px;"><tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#FFFFFF;border-radius:10px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);">
<tr><td style="background:#1E3A5F;padding:20px 24px;color:#D4AF37;font-family:Georgia,serif;font-size:20px;font-weight:bold;">Your Disney cruise quote is on its way</td></tr>
<tr><td style="padding:24px;font-size:15px;color:#334155;line-height:1.6;">
<p style="margin:0 0 14px;">Hi ${escapeHtml(name)},</p>
<p style="margin:0 0 14px;">Thanks for reaching out. I'll put together options that fit your dates and your party, and email them back to you — usually within a few hours, always the same business day.</p>
<p style="margin:0 0 14px;">Your quote will show Disney's current fare along with the onboard credit your booking would earn through us. Disney sets the fare either way, so booking with us costs you nothing extra — the credit comes out of the standard travel-agent commission Disney pays the agency, not out of your pocket.</p>
<p style="margin:0 0 14px;">There's no obligation. If you'd rather book elsewhere after seeing the numbers, that's completely fine.</p>
<p style="margin:0 0 4px;">— Dr. Grayson Starbuck, DPT</p>
<p style="margin:0;font-size:13px;color:#64748B;">GatGrid Cruises · bookings@gatgridcruises.com</p>
</td></tr></table>
</td></tr></table></body></html>`
}

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    '127.0.0.1'

  // 3 quote requests per hour per IP, matching /api/transfer and /api/concierge.
  const { allowed, retryAfter } = checkRateLimit(ip, 'free-quote', 3, 60 * 60 * 1000)
  if (!allowed) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429, headers: { 'Retry-After': String(retryAfter) } },
    )
  }

  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  // Honeypot — bots fill it, humans never see it. Silently 200 to avoid hinting.
  if (body._honeypot) {
    return NextResponse.json({ success: true })
  }

  const name = sanitize(body.name, 200)
  const email = sanitize(body.email, 200).toLowerCase()
  const timeframe = sanitize(body.timeframe, 80)
  const party_size = sanitize(body.party_size, 80)

  if (!name || !email || !EMAIL_REGEX.test(email) || !timeframe || !party_size) {
    return NextResponse.json({ error: 'Required fields missing or invalid' }, { status: 400 })
  }

  const phone = sanitize(body.phone, 50)
  const sailing_interest = sanitize(body.sailing_interest, 300)
  const notes = sanitize(body.notes, 2000)
  const referral_code = body.referral_code ? sanitize(body.referral_code, 60) : undefined
  const utm_source = body.utm_source ? sanitize(body.utm_source, 80) : undefined
  const utm_medium = body.utm_medium ? sanitize(body.utm_medium, 80) : undefined
  const utm_campaign = body.utm_campaign ? sanitize(body.utm_campaign, 80) : undefined

  // Everything the agent needs is folded into Notes as well as its own column,
  // so the record is still actionable if the base lacks the detail columns.
  const crmNotes = [
    'Free quote request (ad landing page).',
    `Sail timeframe: ${timeframe}`,
    `Party size: ${party_size}`,
    sailing_interest ? `Ship / itinerary interest: ${sailing_interest}` : null,
    notes ? `\n${notes}` : null,
  ]
    .filter(Boolean)
    .join('\n')

  const leadWrite = saveLeadSafely({
    name,
    email,
    phone,
    notes: crmNotes,
    source: 'free-quote',
    sailingInterest: sailing_interest || timeframe,
    guests: party_size,
    referralCode: referral_code,
    utmSource: utm_source,
    utmMedium: utm_medium,
    utmCampaign: utm_campaign,
    // A quote is only answerable with the dates and party size attached, so a
    // repeat submission refreshes them rather than just bumping the date.
    refreshDetailsOnUpdate: true,
  })

  const resendKey = process.env.RESEND_API_KEY
  const resend = resendKey ? new Resend(resendKey) : null
  let notifyOk = false

  if (resend) {
    try {
      await resend.emails.send({
        from: '"GatGrid Quotes" <bookings@gatgridcruises.com>',
        // Internal alert — the inbox Grayson actually watches. Not customer-visible.
        to: agentNotifyRecipients(),
        replyTo: email,
        subject: `Free quote request — ${name} (${timeframe}, ${party_size})`,
        html: agentNotificationHtml({
          name,
          email,
          phone,
          timeframe,
          party_size,
          sailing_interest,
          notes,
          referral_code,
          utm_source,
          utm_medium,
          utm_campaign,
        }),
      })
      notifyOk = true
    } catch (err) {
      console.error('[free-quote] agent notification email failed:', err)
    }
  } else {
    console.warn('[free-quote] RESEND_API_KEY not set; agent notification email not sent')
  }

  // Awaited here because a serverless invocation is frozen once it responds.
  const crmOk = (await leadWrite) !== null

  if (!crmOk && !notifyOk) {
    console.error('[free-quote] all delivery paths failed — request lost', { email, name })
    return NextResponse.json({ error: 'Submission failed' }, { status: 502 })
  }

  // Best-effort acknowledgment — a delivery path already succeeded, so this
  // never fails the request.
  if (resend) {
    try {
      await resend.emails.send({
        from: '"Dr. Grayson Starbuck, DPT" <bookings@gatgridcruises.com>',
        replyTo: AGENT_INBOX,
        to: email,
        subject: 'Your free Disney cruise quote — working on it now',
        html: confirmationHtml(name),
      })
    } catch (err) {
      console.error('[free-quote] auto-ack email failed:', err)
    }
  }

  return NextResponse.json({ success: true })
}

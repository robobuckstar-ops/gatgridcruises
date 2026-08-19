import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { checkRateLimit } from '@/lib/rate-limit'
import { saveLeadSafely } from '@/lib/airtable-leads'

// Price-drop watch opt-ins from /price-watch. Same delivery contract as
// /api/transfer: the lead is written to the Airtable CRM and emailed to the
// agent inbox, and the request only fails if BOTH paths fail.
//
// A watch is only actionable with the reservation details attached, so a
// repeat submission refreshes the detail columns rather than only bumping the
// last-contact date.

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const AGENT_INBOX = 'bookings@gatgridcruises.com'

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
  reservation_number: string
  sail_date: string
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
    ['Reservation #', p.reservation_number ? escapeHtml(p.reservation_number) : blank],
    ['Sail date', p.sail_date ? escapeHtml(p.sail_date) : blank],
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
<tr><td style="background:#1E3A5F;padding:18px 24px;color:#D4AF37;font-family:Georgia,serif;font-size:18px;font-weight:bold;">Price watch request</td></tr>
<tr><td style="padding:22px 24px;">
<div style="margin-bottom:16px;background:#FEF3C7;border-left:4px solid #D4AF37;padding:10px 14px;font-size:13px;color:#78350F;line-height:1.5;">
<strong>Check the final payment date first.</strong> Adjustments are generally only possible before final payment, on the same stateroom category and rate, subject to current promotions and availability.
</div>
<table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border:1px solid #E2E8F0;border-radius:6px;overflow:hidden;">${rowsHtml}</table>
${notesBlock}
<p style="margin:24px 0 0;font-size:11px;color:#94A3B8;">Submitted via gatgridcruises.com /price-watch — reply directly to respond to ${escapeHtml(p.name)}.</p>
</td></tr></table>
</td></tr></table></body></html>`
}

function confirmationHtml(name: string): string {
  return `<!DOCTYPE html>
<html><body style="margin:0;background:#F1F5F9;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F1F5F9;padding:24px 12px;"><tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#FFFFFF;border-radius:10px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);">
<tr><td style="background:#1E3A5F;padding:20px 24px;color:#D4AF37;font-family:Georgia,serif;font-size:20px;font-weight:bold;">Your fare is on our watch list</td></tr>
<tr><td style="padding:24px;font-size:15px;color:#334155;line-height:1.6;">
<p style="margin:0 0 14px;">Hi ${escapeHtml(name)},</p>
<p style="margin:0 0 14px;">Thanks — we've added your sailing to our price watch. From here we monitor Disney's published pricing for your itinerary and stateroom category, and when we see a drop we request an adjustment on your booking if Disney Cruise Line's rules permit it at that moment.</p>
<p style="margin:0 0 14px;">Being straight with you about how this works: price adjustments are generally only possible <strong>before final payment</strong>, must be for the same stateroom category and rate, and are subject to Disney's current promotions and availability. Some fares — restricted and non-refundable rates in particular — aren't adjustable at all. After final payment, Disney does not make adjustments. We do the watching and the asking; Disney makes the call.</p>
<p style="margin:0 0 14px;">You don't need to do anything else. If a drop shows up and it's actionable, you'll hear from us.</p>
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

  // 3 opt-ins per hour per IP, matching /api/transfer.
  const { allowed, retryAfter } = checkRateLimit(ip, 'price-watch', 3, 60 * 60 * 1000)
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

  if (!name || !email || !EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: 'Required fields missing or invalid' }, { status: 400 })
  }

  const reservation_number = sanitize(body.reservation_number, 40)
  const sail_date = sanitize(body.sail_date, 40)
  const notes = sanitize(body.notes, 2000)
  const referral_code = body.referral_code ? sanitize(body.referral_code, 60) : undefined
  const utm_source = body.utm_source ? sanitize(body.utm_source, 80) : undefined
  const utm_medium = body.utm_medium ? sanitize(body.utm_medium, 80) : undefined
  const utm_campaign = body.utm_campaign ? sanitize(body.utm_campaign, 80) : undefined

  // Folded into Notes as well as their own columns, so the record stays
  // actionable even if the base lacks the detail columns.
  const crmNotes = [
    'Price watch opt-in.',
    reservation_number ? `Reservation #: ${reservation_number}` : 'Reservation #: not provided',
    sail_date ? `Sail date: ${sail_date}` : null,
    notes ? `\n${notes}` : null,
  ]
    .filter(Boolean)
    .join('\n')

  const leadWrite = saveLeadSafely({
    name,
    email,
    notes: crmNotes,
    source: 'price-watch',
    sailingInterest: sail_date || undefined,
    reservationNumber: reservation_number || undefined,
    referralCode: referral_code,
    utmSource: utm_source,
    utmMedium: utm_medium,
    utmCampaign: utm_campaign,
    // The reservation details are the whole point of a watch request — a
    // returning visitor's second submission must not silently drop them.
    refreshDetailsOnUpdate: true,
  })

  const resendKey = process.env.RESEND_API_KEY
  const resend = resendKey ? new Resend(resendKey) : null
  let notifyOk = false

  if (resend) {
    try {
      await resend.emails.send({
        from: '"GatGrid Price Watch" <bookings@gatgridcruises.com>',
        to: AGENT_INBOX,
        replyTo: email,
        subject: `Price watch — ${name}${sail_date ? ` (sails ${sail_date})` : ''}`,
        html: agentNotificationHtml({
          name,
          email,
          reservation_number,
          sail_date,
          notes,
          referral_code,
          utm_source,
          utm_medium,
          utm_campaign,
        }),
      })
      notifyOk = true
    } catch (err) {
      console.error('[price-watch] agent notification email failed:', err)
    }
  } else {
    console.warn('[price-watch] RESEND_API_KEY not set; agent notification email not sent')
  }

  // Awaited here because a serverless invocation is frozen once it responds.
  const crmOk = (await leadWrite) !== null

  if (!crmOk && !notifyOk) {
    console.error('[price-watch] all delivery paths failed — request lost', { email, name })
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
        subject: 'Your Disney cruise fare is on our watch list',
        html: confirmationHtml(name),
      })
    } catch (err) {
      console.error('[price-watch] auto-ack email failed:', err)
    }
  }

  return NextResponse.json({ success: true })
}

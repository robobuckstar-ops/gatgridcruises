import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { checkRateLimit } from '@/lib/rate-limit'
import { saveLeadSafely } from '@/lib/airtable-leads'
import { AGENT_REPLY_TO, agentNotifyRecipients } from '@/lib/agent-inbox'

// Booking-transfer requests from visitors who already booked direct with
// Disney. Same delivery contract as /api/concierge: the lead is written to the
// Airtable CRM and emailed to the agent inbox, and the request only fails if
// BOTH paths fail. There is no Make.com webhook on this form — it was built
// after that scenario was paused, so the direct paths are the only ones.

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
  reservation_number: string
  sail_date: string
  booking_date: string
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
    ['Reservation #', p.reservation_number ? escapeHtml(p.reservation_number) : blank],
    ['Sail date', escapeHtml(p.sail_date)],
    ['Booked direct on', p.booking_date ? escapeHtml(p.booking_date) : blank],
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
<tr><td style="background:#1E3A5F;padding:18px 24px;color:#D4AF37;font-family:Georgia,serif;font-size:18px;font-weight:bold;">Booking transfer request</td></tr>
<tr><td style="padding:22px 24px;">
<div style="margin-bottom:16px;background:#FEF3C7;border-left:4px solid #D4AF37;padding:10px 14px;font-size:13px;color:#78350F;line-height:1.5;">
<strong>Time-sensitive.</strong> Disney allows a transfer only within ~30 days of the original booking and before final payment. Check eligibility and reply today.
</div>
<table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border:1px solid #E2E8F0;border-radius:6px;overflow:hidden;">${rowsHtml}</table>
${notesBlock}
<p style="margin:24px 0 0;font-size:11px;color:#94A3B8;">Submitted via gatgridcruises.com /transfer — reply directly to respond to ${escapeHtml(p.name)}.</p>
</td></tr></table>
</td></tr></table></body></html>`
}

function confirmationHtml(name: string): string {
  return `<!DOCTYPE html>
<html><body style="margin:0;background:#F1F5F9;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F1F5F9;padding:24px 12px;"><tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#FFFFFF;border-radius:10px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);">
<tr><td style="background:#1E3A5F;padding:20px 24px;color:#D4AF37;font-family:Georgia,serif;font-size:20px;font-weight:bold;">We got your transfer request</td></tr>
<tr><td style="padding:24px;font-size:15px;color:#334155;line-height:1.6;">
<p style="margin:0 0 14px;">Hi ${escapeHtml(name)},</p>
<p style="margin:0 0 14px;">Thanks for sending this over. I'll check your reservation against Disney Cruise Line's current transfer rules and email you back — usually within the hour, always the same business day.</p>
<p style="margin:0 0 14px;">If your booking is eligible, I'll send you Disney's one-page transfer form to sign. Nothing about your cruise changes: same ship, same sail date, same stateroom, same fare. Once the transfer completes you'll have onboard credit and our concierge service on the booking, at no additional cost to you.</p>
<p style="margin:0 0 14px;">If it turns out it isn't eligible, I'll tell you straight — and you're still welcome to use the concierge side for free.</p>
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

  // 3 transfer requests per hour per IP, matching /api/concierge.
  const { allowed, retryAfter } = checkRateLimit(ip, 'transfer', 3, 60 * 60 * 1000)
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
  const sail_date = sanitize(body.sail_date, 40)

  if (!name || !email || !EMAIL_REGEX.test(email) || !sail_date) {
    return NextResponse.json({ error: 'Required fields missing or invalid' }, { status: 400 })
  }

  const phone = sanitize(body.phone, 50)
  const reservation_number = sanitize(body.reservation_number, 40)
  const booking_date = sanitize(body.booking_date, 40)
  const notes = sanitize(body.notes, 2000)
  const referral_code = body.referral_code ? sanitize(body.referral_code, 60) : undefined
  const utm_source = body.utm_source ? sanitize(body.utm_source, 80) : undefined
  const utm_medium = body.utm_medium ? sanitize(body.utm_medium, 80) : undefined
  const utm_campaign = body.utm_campaign ? sanitize(body.utm_campaign, 80) : undefined

  // Everything the agent needs is folded into Notes as well as its own column,
  // so the record is still actionable if the base lacks the detail columns.
  const crmNotes = [
    `Booking transfer request.`,
    `Sail date: ${sail_date}`,
    reservation_number ? `Reservation #: ${reservation_number}` : 'Reservation #: not provided',
    booking_date ? `Booked direct on: ${booking_date}` : null,
    notes ? `\n${notes}` : null,
  ]
    .filter(Boolean)
    .join('\n')

  const leadWrite = saveLeadSafely({
    name,
    email,
    phone,
    notes: crmNotes,
    source: 'transfer',
    sailingInterest: sail_date,
    reservationNumber: reservation_number || undefined,
    referralCode: referral_code,
    utmSource: utm_source,
    utmMedium: utm_medium,
    utmCampaign: utm_campaign,
    // A transfer request is only useful with its reservation details attached,
    // so a repeat submission refreshes them rather than just bumping the date.
    refreshDetailsOnUpdate: true,
  })

  const resendKey = process.env.RESEND_API_KEY
  const resend = resendKey ? new Resend(resendKey) : null
  let notifyOk = false

  if (resend) {
    try {
      await resend.emails.send({
        from: '"GatGrid Transfers" <bookings@gatgridcruises.com>',
        // Internal alert — goes to the inbox Grayson actually watches, not just
        // the public bookings@ address. Never customer-visible.
        to: agentNotifyRecipients(),
        replyTo: email,
        subject: `Transfer request — ${name} (sails ${sail_date})`,
        html: agentNotificationHtml({
          name,
          email,
          phone,
          reservation_number,
          sail_date,
          booking_date,
          notes,
          referral_code,
          utm_source,
          utm_medium,
          utm_campaign,
        }),
      })
      notifyOk = true
    } catch (err) {
      console.error('[transfer] agent notification email failed:', err)
    }
  } else {
    console.warn('[transfer] RESEND_API_KEY not set; agent notification email not sent')
  }

  // Awaited here because a serverless invocation is frozen once it responds.
  const crmOk = (await leadWrite) !== null

  if (!crmOk && !notifyOk) {
    console.error('[transfer] all delivery paths failed — request lost', { email, name })
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
        subject: "We got your transfer request — I'll confirm eligibility today",
        html: confirmationHtml(name),
      })
    } catch (err) {
      console.error('[transfer] auto-ack email failed:', err)
    }
  }

  return NextResponse.json({ success: true })
}

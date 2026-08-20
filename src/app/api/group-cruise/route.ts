import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { checkRateLimit } from '@/lib/rate-limit'
import { saveLeadSafely } from '@/lib/airtable-leads'
import { AGENT_REPLY_TO, agentNotifyRecipients } from '@/lib/agent-inbox'

// Interest capture for the hosted GatGrid group sailing (/group-cruise).
// Same delivery contract as /api/transfer and /api/price-watch: the lead is
// written to the Airtable CRM and emailed to the agent inbox, and the request
// only fails if BOTH paths fail.

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
  timeframe: string
  party_size: string
  notes: string
  referral_code?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
}): string {
  const rows: [string, string][] = [
    ['Name', escapeHtml(p.name)],
    ['Email', `<a href="mailto:${escapeHtml(p.email)}">${escapeHtml(p.email)}</a>`],
    ['Preferred timeframe', escapeHtml(p.timeframe)],
    ['Party size', escapeHtml(p.party_size)],
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
<tr><td style="background:#1E3A5F;padding:18px 24px;color:#D4AF37;font-family:Georgia,serif;font-size:18px;font-weight:bold;">Group sailing interest</td></tr>
<tr><td style="padding:22px 24px;">
<table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border:1px solid #E2E8F0;border-radius:6px;overflow:hidden;">${rowsHtml}</table>
${notesBlock}
<p style="margin:24px 0 0;font-size:11px;color:#94A3B8;">Submitted via gatgridcruises.com /group-cruise — reply directly to respond to ${escapeHtml(p.name)}.</p>
</td></tr></table>
</td></tr></table></body></html>`
}

function confirmationHtml(name: string): string {
  return `<!DOCTYPE html>
<html><body style="margin:0;background:#F1F5F9;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F1F5F9;padding:24px 12px;"><tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#FFFFFF;border-radius:10px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);">
<tr><td style="background:#1E3A5F;padding:20px 24px;color:#D4AF37;font-family:Georgia,serif;font-size:20px;font-weight:bold;">You're on the group sailing list</td></tr>
<tr><td style="padding:24px;font-size:15px;color:#334155;line-height:1.6;">
<p style="margin:0 0 14px;">Hi ${escapeHtml(name)},</p>
<p style="margin:0 0 14px;">Thanks for raising your hand. We're gathering interest by timeframe so we can pick a sailing that works for the most people, then hold space and open it up to the group.</p>
<p style="margin:0 0 14px;">What happens next: once we have enough interest for a date, we'll email you the ship, itinerary, and pricing before anything is committed. You're under no obligation — this is an interest list, not a booking.</p>
<p style="margin:0 0 14px;">One honest note on perks: any group amenities depend on Disney Cruise Line's group policies and on hitting their minimum cabin count, and they're subject to availability. If we hit the minimum, we'll tell you exactly what that unlocks. If we don't, you'll still have us on your booking — we just won't have promised you something Disney didn't grant.</p>
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

  // 3 submissions per hour per IP, matching the other lead forms.
  const { allowed, retryAfter } = checkRateLimit(ip, 'group-cruise', 3, 60 * 60 * 1000)
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
  const timeframe = sanitize(body.timeframe, 120)
  const party_size = sanitize(body.party_size, 40)

  if (!name || !email || !EMAIL_REGEX.test(email) || !timeframe || !party_size) {
    return NextResponse.json({ error: 'Required fields missing or invalid' }, { status: 400 })
  }

  const notes = sanitize(body.notes, 2000)
  const referral_code = body.referral_code ? sanitize(body.referral_code, 60) : undefined
  const utm_source = body.utm_source ? sanitize(body.utm_source, 80) : undefined
  const utm_medium = body.utm_medium ? sanitize(body.utm_medium, 80) : undefined
  const utm_campaign = body.utm_campaign ? sanitize(body.utm_campaign, 80) : undefined

  const crmNotes = [
    'Group sailing interest.',
    `Preferred timeframe: ${timeframe}`,
    `Party size: ${party_size}`,
    notes ? `\n${notes}` : null,
  ]
    .filter(Boolean)
    .join('\n')

  const leadWrite = saveLeadSafely({
    name,
    email,
    notes: crmNotes,
    source: 'group-cruise',
    sailingInterest: timeframe,
    guests: party_size,
    referralCode: referral_code,
    utmSource: utm_source,
    utmMedium: utm_medium,
    utmCampaign: utm_campaign,
    // Timeframe and party size are what decide which sailing we hold, so a
    // repeat submission should overwrite the earlier answer.
    refreshDetailsOnUpdate: true,
  })

  const resendKey = process.env.RESEND_API_KEY
  const resend = resendKey ? new Resend(resendKey) : null
  let notifyOk = false

  if (resend) {
    try {
      await resend.emails.send({
        from: '"GatGrid Group Sailings" <bookings@gatgridcruises.com>',
        // Internal alert — the inbox Grayson actually watches. Not customer-visible.
        to: agentNotifyRecipients(),
        replyTo: email,
        subject: `Group sailing interest — ${name} (${timeframe}, ${party_size})`,
        html: agentNotificationHtml({
          name,
          email,
          timeframe,
          party_size,
          notes,
          referral_code,
          utm_source,
          utm_medium,
          utm_campaign,
        }),
      })
      notifyOk = true
    } catch (err) {
      console.error('[group-cruise] agent notification email failed:', err)
    }
  } else {
    console.warn('[group-cruise] RESEND_API_KEY not set; agent notification email not sent')
  }

  // Awaited here because a serverless invocation is frozen once it responds.
  const crmOk = (await leadWrite) !== null

  if (!crmOk && !notifyOk) {
    console.error('[group-cruise] all delivery paths failed — request lost', { email, name })
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
        subject: "You're on the list for the GatGrid group sailing",
        html: confirmationHtml(name),
      })
    } catch (err) {
      console.error('[group-cruise] auto-ack email failed:', err)
    }
  }

  return NextResponse.json({ success: true })
}

import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { checkRateLimit, getClientIp } from '@/lib/rate-limit'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const INBOX = 'bookings@gatgridcruises.com'

function sanitize(value: unknown, maxLen: number): string {
  return String(value ?? '')
    .replace(/[<>]/g, '')
    .trim()
    .slice(0, maxLen)
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

interface SailingContext {
  sailingId?: string
  itineraryName?: string
  shipName?: string
  sailDate?: string
  lengthNights?: number
  cabinCategory?: string
  startingPrice?: number
}

function buildSailingSummary(ctx: SailingContext | null): string {
  if (!ctx) return 'General Disney cruise inquiry (no specific sailing)'
  const parts: string[] = []
  if (ctx.itineraryName) parts.push(ctx.itineraryName)
  if (ctx.shipName) parts.push(ctx.shipName)
  if (ctx.sailDate) parts.push(`Sails ${ctx.sailDate}`)
  if (typeof ctx.lengthNights === 'number') parts.push(`${ctx.lengthNights} nights`)
  if (ctx.cabinCategory) parts.push(`Cabin: ${ctx.cabinCategory}`)
  if (typeof ctx.startingPrice === 'number') parts.push(`Listed from $${ctx.startingPrice.toLocaleString()}`)
  return parts.length ? parts.join(' · ') : 'General Disney cruise inquiry'
}

function notificationHtml(opts: {
  name: string
  email: string
  phone: string
  guests: string
  notes: string
  sailing: SailingContext | null
  sailingId?: string
  referralCode?: string
}): string {
  const sailingSummary = escapeHtml(buildSailingSummary(opts.sailing))
  const sailingLink = opts.sailing?.sailingId
    ? `<p style="margin:6px 0 0;color:#475569;font-size:12px;">Sailing detail: <a href="https://gatgridcruises.com/sailing/${encodeURIComponent(opts.sailing.sailingId)}">/sailing/${escapeHtml(opts.sailing.sailingId)}</a></p>`
    : ''
  const rows: [string, string][] = [
    ['Name', escapeHtml(opts.name)],
    ['Email', `<a href="mailto:${escapeHtml(opts.email)}">${escapeHtml(opts.email)}</a>`],
    ['Phone', opts.phone ? escapeHtml(opts.phone) : '<em style="color:#94A3B8;">Not provided</em>'],
    ['Guests', escapeHtml(opts.guests)],
  ]
  if (opts.referralCode) rows.push(['Referral Code', escapeHtml(opts.referralCode)])
  const rowsHtml = rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 10px;font-size:13px;color:#64748B;width:35%;">${k}</td><td style="padding:6px 10px;font-size:13px;color:#0F172A;font-weight:600;">${v}</td></tr>`,
    )
    .join('')
  const notesBlock = opts.notes
    ? `<div style="margin-top:18px;background:#F8FAFC;border-left:4px solid #1E3A5F;padding:12px 14px;font-size:13px;color:#334155;line-height:1.5;"><strong>Notes:</strong><br>${escapeHtml(opts.notes).replace(/\n/g, '<br>')}</div>`
    : ''
  return `<!DOCTYPE html>
<html><body style="margin:0;background:#F1F5F9;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F1F5F9;padding:24px 12px;"><tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#FFFFFF;border-radius:10px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);">
<tr><td style="background:#1E3A5F;padding:18px 24px;color:#D4AF37;font-family:Georgia,serif;font-size:18px;font-weight:bold;">New "Request This Sailing" inquiry</td></tr>
<tr><td style="padding:22px 24px;">
<p style="margin:0 0 6px;font-size:13px;color:#64748B;text-transform:uppercase;letter-spacing:0.06em;font-weight:600;">Sailing</p>
<p style="margin:0 0 4px;font-size:15px;color:#0F172A;font-weight:600;">${sailingSummary}</p>
${sailingLink}
<table width="100%" cellpadding="0" cellspacing="0" style="margin-top:18px;border-collapse:collapse;border:1px solid #E2E8F0;border-radius:6px;overflow:hidden;">${rowsHtml}</table>
${notesBlock}
<p style="margin:24px 0 0;font-size:11px;color:#94A3B8;">Submitted via gatgridcruises.com · Reply directly to respond to ${escapeHtml(opts.name)}.</p>
</td></tr></table>
</td></tr></table></body></html>`
}

function ackHtml(name: string, sailingSummary: string): string {
  const firstName = name.split(/\s+/)[0] || 'there'
  return `<!DOCTYPE html>
<html><body style="margin:0;background:#F1F5F9;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F1F5F9;padding:32px 16px;"><tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#FFFFFF;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">
<tr><td style="background:#1E3A5F;padding:20px 28px;color:#D4AF37;font-family:Georgia,serif;font-size:20px;font-weight:bold;">GatGrid Cruises</td></tr>
<tr><td style="padding:28px;">
<h2 style="margin:0 0 12px;color:#1E3A5F;font-family:Georgia,serif;font-size:20px;">Hi ${escapeHtml(firstName)} —</h2>
<p style="margin:0 0 14px;color:#334155;font-size:15px;line-height:1.6;">Thanks for the inquiry! I got the request about <strong>${escapeHtml(sailingSummary)}</strong> and I'll personally follow up <strong>within the hour</strong>.</p>
<p style="margin:0 0 14px;color:#334155;font-size:15px;line-height:1.6;">As a reminder, your quote will be at the same Disney public rate, plus any onboard credit and perks I can layer on through Boardwalk Travel Agency. There's no extra cost — Disney pays the agency commission, not you.</p>
<div style="background:#F0F7FF;border-left:4px solid #1E3A5F;border-radius:6px;padding:16px 18px;margin:20px 0;">
  <p style="margin:0 0 8px;color:#1E3A5F;font-size:14px;font-weight:600;">While you wait:</p>
  <ul style="margin:0;padding-left:20px;color:#1E3A5F;font-size:14px;line-height:1.7;">
    <li><a href="https://gatgridcruises.com/guides/cruise-countdown" style="color:#1E3A5F;">Disney Cruise Countdown Checklist</a></li>
    <li><a href="https://gatgridcruises.com/tools/cost-calculator" style="color:#1E3A5F;">Total Trip Cost Calculator</a></li>
    <li><a href="https://gatgridcruises.com/deals" style="color:#1E3A5F;">Browse current deals</a></li>
  </ul>
</div>
<p style="margin:18px 0 0;color:#64748B;font-size:13px;line-height:1.5;"><strong style="color:#1E3A5F;">Dr. Grayson Starbuck, DPT</strong><br>GatGrid Cruises · Boardwalk Travel Agency<br><a href="mailto:bookings@gatgridcruises.com" style="color:#1E3A5F;">bookings@gatgridcruises.com</a></p>
</td></tr></table>
</td></tr></table></body></html>`
}

export async function POST(request: NextRequest) {
  const ip = getClientIp({ headers: request.headers })

  // 5 inquiries per hour per IP — looser than the heavier concierge form
  // because this is the primary CTA across the site.
  const { allowed, retryAfter } = checkRateLimit(ip, 'inquiry', 5, 60 * 60 * 1000)
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

  // Honeypot — silently 200 so bots don't probe.
  if (body._honeypot) return NextResponse.json({ success: true })

  // Time-based bot check (server-side mirror of the client check). Humans
  // can't realistically fill the form in under 2 seconds; bots usually
  // submit instantly. Silently 200 to avoid signaling rejection.
  const elapsedMs = typeof body.elapsed_ms === 'number' ? body.elapsed_ms : 0
  if (elapsedMs > 0 && elapsedMs < 2000) {
    return NextResponse.json({ success: true })
  }

  const name = sanitize(body.name, 200)
  const email = sanitize(body.email, 200).toLowerCase()
  const phone = sanitize(body.phone, 50)
  const guests = sanitize(body.guests, 10)
  const notes = sanitize(body.notes, 2000)
  const referralCode = sanitize(body.referral_code, 60)

  if (!name || !email || !EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 })
  }

  const rawSailing = (body.sailing && typeof body.sailing === 'object' ? body.sailing : null) as Record<string, unknown> | null
  const sailing: SailingContext | null = rawSailing
    ? {
        sailingId: sanitize(rawSailing.sailingId, 100) || undefined,
        itineraryName: sanitize(rawSailing.itineraryName, 200) || undefined,
        shipName: sanitize(rawSailing.shipName, 100) || undefined,
        sailDate: sanitize(rawSailing.sailDate, 50) || undefined,
        lengthNights: typeof rawSailing.lengthNights === 'number' ? rawSailing.lengthNights : undefined,
        cabinCategory: sanitize(rawSailing.cabinCategory, 60) || undefined,
        startingPrice: typeof rawSailing.startingPrice === 'number' ? rawSailing.startingPrice : undefined,
      }
    : null

  const sailingSummary = buildSailingSummary(sailing)

  // Resend is the primary path. If unconfigured, fall back to the existing
  // concierge webhook so this endpoint still works in environments that
  // already have Make.com wired up — same destination inbox either way.
  const resendKey = process.env.RESEND_API_KEY
  const webhookUrl = process.env.CONCIERGE_WEBHOOK_URL

  if (resendKey) {
    try {
      const resend = new Resend(resendKey)
      // Notify the agent
      await resend.emails.send({
        from: '"GatGrid Inquiries" <bookings@gatgridcruises.com>',
        to: INBOX,
        replyTo: email,
        subject: sailing?.itineraryName
          ? `Sailing inquiry: ${sailing.itineraryName} — ${name}`
          : `Disney cruise inquiry — ${name}`,
        html: notificationHtml({ name, email, phone, guests, notes, sailing, referralCode }),
      })
      // Auto-ack to the user (best effort)
      try {
        await resend.emails.send({
          from: '"Dr. Grayson Starbuck, DPT" <bookings@gatgridcruises.com>',
          to: email,
          replyTo: INBOX,
          subject: "Got your inquiry — I'll be in touch within the hour",
          html: ackHtml(name, sailingSummary),
        })
      } catch (ackErr) {
        console.error('[inquiry] auto-ack email failed:', ackErr)
      }
      return NextResponse.json({ success: true })
    } catch (err) {
      console.error('[inquiry] resend send failed:', err)
      // fall through to webhook fallback
    }
  }

  if (webhookUrl) {
    try {
      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'request-this-sailing',
          name,
          email,
          phone,
          guests,
          notes,
          sailing,
          referral_code: referralCode || undefined,
        }),
      })
      if (!res.ok) {
        console.error('[inquiry] webhook returned non-2xx:', res.status)
        return NextResponse.json({ error: 'Submission failed' }, { status: 502 })
      }
      return NextResponse.json({ success: true })
    } catch (err) {
      console.error('[inquiry] webhook error:', err)
      return NextResponse.json({ error: 'Submission failed' }, { status: 502 })
    }
  }

  console.error('[inquiry] no email transport configured (set RESEND_API_KEY or CONCIERGE_WEBHOOK_URL)')
  return NextResponse.json({ error: 'Service unavailable' }, { status: 503 })
}

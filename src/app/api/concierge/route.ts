import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { checkRateLimit } from '@/lib/rate-limit'
import { CONCIERGE_RECEIVED } from '@/lib/email-templates'

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
  phone: string
  timezone: string
  family_members: string
  how_found_us: string
  notes: string
  sailing_interest?: string
  referral_code?: string
}): string {
  const rows: [string, string][] = [
    ['Name', escapeHtml(p.name)],
    ['Email', `<a href="mailto:${escapeHtml(p.email)}">${escapeHtml(p.email)}</a>`],
    ['Phone', escapeHtml(p.phone)],
    ['Timezone', p.timezone ? escapeHtml(p.timezone) : '<em style="color:#94A3B8;">—</em>'],
    ['Who\'s sailing', escapeHtml(p.family_members)],
    ['Source', escapeHtml(p.how_found_us)],
  ]
  if (p.sailing_interest) rows.push(['Sailing interest', escapeHtml(p.sailing_interest)])
  if (p.referral_code) rows.push(['Referral code', escapeHtml(p.referral_code)])
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
<tr><td style="background:#1E3A5F;padding:18px 24px;color:#D4AF37;font-family:Georgia,serif;font-size:18px;font-weight:bold;">New concierge inquiry</td></tr>
<tr><td style="padding:22px 24px;">
<table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border:1px solid #E2E8F0;border-radius:6px;overflow:hidden;">${rowsHtml}</table>
${notesBlock}
<p style="margin:24px 0 0;font-size:11px;color:#94A3B8;">Submitted via gatgridcruises.com /concierge — reply directly to respond to ${escapeHtml(p.name)}.</p>
</td></tr></table>
</td></tr></table></body></html>`
}

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    '127.0.0.1'

  // 3 inquiries per hour per IP
  const { allowed, retryAfter } = checkRateLimit(ip, 'concierge', 3, 60 * 60 * 1000)
  if (!allowed) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429, headers: { 'Retry-After': String(retryAfter) } }
    )
  }

  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  // Honeypot field — bots fill it, humans never see it. Silently 200 to avoid hinting.
  if (body._honeypot) {
    return NextResponse.json({ success: true })
  }

  const name = sanitize(body.name, 200)
  const email = sanitize(body.email, 200).toLowerCase()
  const phone = sanitize(body.phone, 50)
  const family_members = sanitize(body.family_members, 500)
  const how_found_us = sanitize(body.how_found_us, 100)

  if (!name || !email || !EMAIL_REGEX.test(email) || !phone || !family_members || !how_found_us) {
    return NextResponse.json({ error: 'Required fields missing or invalid' }, { status: 400 })
  }

  const timezone = sanitize(body.timezone, 20)
  const notes = sanitize(body.notes, 2000)
  const sailing_interest = body.sailing_interest ? sanitize(body.sailing_interest, 200) : undefined
  const referral_code = body.referral_code ? sanitize(body.referral_code, 60) : undefined

  const payload = {
    name,
    email,
    phone,
    timezone,
    family_members,
    how_found_us,
    notes,
    ...(sailing_interest ? { sailing_interest } : {}),
    ...(referral_code ? { referral_code } : {}),
  }

  const webhookUrl = process.env.CONCIERGE_WEBHOOK_URL?.trim()
  const resendKey = process.env.RESEND_API_KEY

  // Two parallel delivery paths so leads are never silently lost:
  //   1. Make.com webhook → Airtable (primary CRM funnel)
  //   2. Direct email notification to the agent inbox (backup so the lead
  //      lands even when the Make scenario is paused, the webhook URL is
  //      wrong, or Airtable rate-limits the upsert)
  // Success requires AT LEAST ONE path to succeed.
  let webhookOk = false
  let notifyOk = false

  if (webhookUrl) {
    // 8s cap — Make.com queueing is usually instant, but we never want a
    // hung scenario to block the response or eat the serverless budget.
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 8000)
    try {
      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      })
      if (res.ok) {
        webhookOk = true
        console.log('[concierge] webhook delivered', { status: res.status, email })
      } else {
        const responseText = await res.text().catch(() => '')
        console.error('[concierge] webhook returned non-2xx:', res.status, responseText.slice(0, 500))
      }
    } catch (err) {
      console.error('[concierge] webhook error:', err)
    } finally {
      clearTimeout(timeout)
    }
  } else {
    console.error('[concierge] CONCIERGE_WEBHOOK_URL not configured')
  }

  const resend = resendKey ? new Resend(resendKey) : null

  if (resend) {
    try {
      await resend.emails.send({
        from: '"GatGrid Concierge" <bookings@gatgridcruises.com>',
        to: AGENT_INBOX,
        replyTo: email,
        subject: sailing_interest
          ? `Concierge inquiry: ${sailing_interest} — ${name}`
          : `Concierge inquiry — ${name}`,
        html: agentNotificationHtml({
          name,
          email,
          phone,
          timezone,
          family_members,
          how_found_us,
          notes,
          sailing_interest,
          referral_code,
        }),
      })
      notifyOk = true
    } catch (err) {
      console.error('[concierge] agent notification email failed:', err)
    }
  } else {
    console.warn('[concierge] RESEND_API_KEY not set; agent notification email not sent')
  }

  if (!webhookOk && !notifyOk) {
    console.error('[concierge] both delivery paths failed — lead lost', { email, name })
    return NextResponse.json({ error: 'Submission failed' }, { status: 502 })
  }

  if (!webhookOk) {
    console.warn('[concierge] webhook path failed but agent notification succeeded — Make.com scenario may be paused or misconfigured')
  }

  // Auto-acknowledgment email to the user. Best-effort — at least one delivery
  // path already succeeded, so we never fail the request on this.
  if (resend) {
    try {
      await resend.emails.send({
        from: '"Dr. Grayson Starbuck, DPT" <bookings@gatgridcruises.com>',
        replyTo: AGENT_INBOX,
        to: email,
        subject: 'Thanks for reaching out — I\'ll be in touch within the hour',
        html: CONCIERGE_RECEIVED({
          name,
          sailingInterest: sailing_interest,
        }),
      })
    } catch (emailErr) {
      console.error('[concierge] auto-ack email failed:', emailErr)
    }
  }

  return NextResponse.json({ success: true })
}

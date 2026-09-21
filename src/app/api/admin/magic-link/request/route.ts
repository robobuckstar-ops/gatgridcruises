// Email an allow-listed admin a one-time login link for /admin/messages.
// Always responds { success: true } so it never reveals which emails are admins.

import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createMagicToken, getMessagesSecret, isAdminEmail } from '@/lib/messages-auth'
import { checkRateLimit, getClientIp } from '@/lib/rate-limit'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const FROM = '"GatGrid Cruises" <bookings@gatgridcruises.com>'

function baseUrl(request: NextRequest): string {
  const env = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  return env ? env.replace(/\/+$/, '') : request.nextUrl.origin
}

export async function POST(request: NextRequest) {
  // Tighter than the passphrase form — a link request also sends an email.
  const { allowed, retryAfter } = checkRateLimit(getClientIp(request), 'magic-link', 5, 15 * 60_000)
  if (!allowed) {
    return NextResponse.json(
      { error: 'Too many attempts. Try again in a few minutes.' },
      { status: 429, headers: { 'Retry-After': String(retryAfter ?? 900) } },
    )
  }

  if (!getMessagesSecret()) {
    return NextResponse.json(
      { error: 'Login is not configured yet (MESSAGES_ADMIN_SECRET).', code: 'NO_SECRET' },
      { status: 503 },
    )
  }

  let payload: { email?: unknown }
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: 'Expected a JSON body' }, { status: 400 })
  }
  const email = typeof payload.email === 'string' ? payload.email.trim() : ''

  // Uniform success response regardless of whether the email is an admin.
  const ok = NextResponse.json({ success: true })

  if (!email || !isAdminEmail(email)) return ok

  const token = createMagicToken(email)
  if (!token) return ok

  const link = `${baseUrl(request)}/api/admin/magic-link/verify?token=${encodeURIComponent(token)}`

  const apiKey = process.env.RESEND_API_KEY?.trim()
  if (!apiKey) {
    console.error('[magic-link] RESEND_API_KEY not set — cannot email login link')
    return ok
  }

  try {
    const resend = new Resend(apiKey)
    await resend.emails.send({
      from: FROM,
      to: [email],
      subject: 'Your GatGrid Messages login link',
      html: `<div style="font-family:system-ui,-apple-system,sans-serif;max-width:480px;margin:0 auto;padding:24px;color:#0f172a;">
        <h1 style="font-size:18px;margin:0 0 12px;">Sign in to GatGrid Messages</h1>
        <p style="margin:0 0 20px;font-size:15px;line-height:1.5;">Click below to open the client Messages inbox. This link works once and expires in 15 minutes.</p>
        <p style="margin:0 0 20px;"><a href="${link}" style="display:inline-block;padding:12px 22px;background:#0f2c52;color:#fff;text-decoration:none;border-radius:8px;font-weight:600;">Open the inbox</a></p>
        <p style="margin:0;font-size:12px;color:#64748b;">If you didn't request this, you can safely ignore it.</p>
      </div>`,
    })
  } catch (err) {
    console.error('[magic-link] send failed:', err)
  }

  return ok
}

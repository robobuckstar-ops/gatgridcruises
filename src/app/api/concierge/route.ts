import { NextRequest, NextResponse } from 'next/server'
import { checkRateLimit } from '@/lib/rate-limit'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function sanitize(value: unknown, maxLen: number): string {
  return String(value ?? '').replace(/[<>]/g, '').trim().slice(0, maxLen)
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

  const payload = {
    name,
    email,
    phone,
    timezone: sanitize(body.timezone, 20),
    family_members,
    how_found_us,
    notes: sanitize(body.notes, 2000),
    ...(body.sailing_interest ? { sailing_interest: sanitize(body.sailing_interest, 200) } : {}),
  }

  const webhookUrl = process.env.CONCIERGE_WEBHOOK_URL
  if (!webhookUrl) {
    console.error('[concierge] CONCIERGE_WEBHOOK_URL not configured')
    return NextResponse.json({ error: 'Service unavailable' }, { status: 503 })
  }

  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!res.ok) {
      console.error('[concierge] webhook returned non-2xx:', res.status)
      return NextResponse.json({ error: 'Submission failed' }, { status: 502 })
    }
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[concierge] webhook error:', err)
    return NextResponse.json({ error: 'Submission failed' }, { status: 502 })
  }
}

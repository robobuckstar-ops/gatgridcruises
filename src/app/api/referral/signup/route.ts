import { NextRequest, NextResponse } from 'next/server'
import { checkRateLimit } from '@/lib/rate-limit'
import { generateReferralCode, buildReferralUrl } from '@/lib/referral'
import { createReferralPartner } from '@/lib/airtable-referrals'

export const runtime = 'nodejs'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function clean(s: unknown, max = 500): string {
  if (typeof s !== 'string') return ''
  return s.replace(/[<>]/g, '').trim().slice(0, max)
}

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    '127.0.0.1'

  // 5 applications per IP per hour — generous, but blocks scripted spam
  const { allowed, retryAfter } = checkRateLimit(ip, 'referral-signup', 5, 60 * 60 * 1000)
  if (!allowed) {
    return NextResponse.json(
      { error: 'Too many submissions. Please try again later.' },
      { status: 429, headers: { 'Retry-After': String(retryAfter ?? 60) } },
    )
  }

  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  // Honeypot — bots fill the website_url field
  if (body.website_url) {
    return NextResponse.json({ ok: true, code: 'BOT', referral_url: '' })
  }

  const name = clean(body.name, 120)
  const email = clean(body.email, 200).toLowerCase()
  const primary_platform = clean(body.primary_platform, 80)
  const audience_size = clean(body.audience_size, 40)
  const niche = clean(body.niche, 240)
  const why_partner = clean(body.why_partner, 1500)

  if (!name || !email || !EMAIL_REGEX.test(email) || !primary_platform || !audience_size || !niche || !why_partner) {
    return NextResponse.json({ error: 'Missing or invalid fields' }, { status: 400 })
  }

  const code = generateReferralCode(name)
  const referral_url = buildReferralUrl(code)

  const partner = {
    name,
    email,
    instagram: clean(body.instagram, 120),
    tiktok: clean(body.tiktok, 120),
    youtube: clean(body.youtube, 240),
    other_handle: clean(body.other_handle, 240),
    primary_platform,
    audience_size,
    niche,
    why_partner,
    referral_code: code,
    referral_url,
  }

  // Write to Airtable when configured. Falls back to a no-op so the form
  // still works in local dev / preview without secrets.
  const apiKey = process.env.AIRTABLE_API_KEY
  if (apiKey) {
    const result = await createReferralPartner(partner, apiKey)
    if (!result) {
      return NextResponse.json(
        { error: 'Could not save application. Please email grayson@gatgridcruises.com.' },
        { status: 502 },
      )
    }
  }

  // Optional Make.com mirror — same payload Grayson already wires elsewhere.
  // The webhook URL is configured via env so it can stay out of the repo.
  const makeUrl = process.env.MAKE_REFERRAL_WEBHOOK_URL
  if (makeUrl) {
    try {
      await fetch(makeUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(partner),
      })
    } catch (err) {
      console.error('[referral/signup] Make webhook failed:', err)
      // Don't fail the request — Airtable is the source of truth
    }
  }

  return NextResponse.json({ ok: true, code, referral_url })
}

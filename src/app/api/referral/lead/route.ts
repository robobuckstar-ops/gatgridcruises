import { NextRequest, NextResponse } from 'next/server'
import { checkRateLimit } from '@/lib/rate-limit'
import { logReferralLead } from '@/lib/airtable-referrals'

export const runtime = 'nodejs'

const CODE_REGEX = /^[A-Z0-9]{6,10}$/

function clean(s: unknown, max = 500): string {
  if (typeof s !== 'string') return ''
  return s.replace(/[<>]/g, '').trim().slice(0, max)
}

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    '127.0.0.1'

  const { allowed } = checkRateLimit(ip, 'referral-lead', 30, 60_000)
  if (!allowed) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }

  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const code = clean(body.referral_code, 12).toUpperCase()
  if (!CODE_REGEX.test(code)) {
    return NextResponse.json({ error: 'Invalid referral code' }, { status: 400 })
  }

  const apiKey = process.env.AIRTABLE_API_KEY
  if (!apiKey) {
    // Without Airtable creds we can't persist — return ok so the client
    // doesn't surface an error to the visitor. Make.com is still primary.
    return NextResponse.json({ ok: true, persisted: false })
  }

  const result = await logReferralLead(
    {
      referral_code: code,
      lead_name: clean(body.lead_name, 120),
      lead_email: clean(body.lead_email, 200).toLowerCase(),
      lead_source: clean(body.lead_source, 80) || 'Site',
      notes: clean(body.notes, 500),
    },
    apiKey,
  )

  return NextResponse.json({ ok: true, persisted: Boolean(result) })
}

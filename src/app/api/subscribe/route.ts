import { NextRequest, NextResponse } from 'next/server'
import { checkRateLimit } from '@/lib/rate-limit'

// For MVP without Supabase, store in memory (lost on restart)
const subscribers: { email: string; preferences: any; confirmed: boolean; created_at: string }[] = []

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function sanitizeString(str: string): string {
  return str.replace(/[<>"'&]/g, '').trim().slice(0, 500)
}

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      '127.0.0.1'

    // Rate limit: 3 signups per IP per hour
    const { allowed, retryAfter } = checkRateLimit(ip, 'subscribe', 3, 60 * 60 * 1000)
    if (!allowed) {
      return NextResponse.json(
        { error: 'Please try again later' },
        { status: 429, headers: { 'Retry-After': String(retryAfter) } }
      )
    }

    const body = await request.json()
    const { email, preferences, _honeypot } = body

    // Honeypot check — bots fill this field, real users never see it
    if (_honeypot) {
      return NextResponse.json({ success: true, message: 'Subscribed successfully' })
    }

    const sanitizedEmail = sanitizeString(email || '')
    if (!sanitizedEmail || !EMAIL_REGEX.test(sanitizedEmail)) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
    }

    if (subscribers.some(s => s.email === sanitizedEmail)) {
      return NextResponse.json({ error: 'Already subscribed' }, { status: 409 })
    }

    const sanitizedPreferences: Record<string, any> = {}
    if (preferences && typeof preferences === 'object') {
      for (const [k, v] of Object.entries(preferences)) {
        sanitizedPreferences[sanitizeString(String(k))] =
          typeof v === 'string' ? sanitizeString(v) : v
      }
    }

    subscribers.push({
      email: sanitizedEmail,
      preferences: sanitizedPreferences,
      confirmed: false,
      created_at: new Date().toISOString(),
    })

    return NextResponse.json({ success: true, message: 'Subscribed successfully' })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET() {
  // Admin endpoint — in production, protect with auth
  return NextResponse.json({ count: subscribers.length, subscribers })
}

import { NextRequest, NextResponse } from 'next/server'
import { checkRateLimit } from '@/lib/rate-limit'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const ALLOWED_DESTINATIONS = new Set(['MCO', 'MIA', 'FLL', 'TPA', 'JAX'])

function sanitizeString(str: string, max = 200): string {
  return str.replace(/[<>"'&]/g, '').trim().slice(0, max)
}

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      '127.0.0.1'

    const { allowed, retryAfter } = checkRateLimit(ip, 'flight-deals', 3, 60 * 60 * 1000)
    if (!allowed) {
      return NextResponse.json(
        { error: 'Please try again later' },
        { status: 429, headers: { 'Retry-After': String(retryAfter) } },
      )
    }

    const body = await request.json()
    const { email, departureCity, cruiseMonth, destination, _honeypot } = body

    if (_honeypot) {
      return NextResponse.json({ success: true, message: 'Subscribed successfully' })
    }

    const sanitizedEmail = sanitizeString(email || '', 200)
    if (!sanitizedEmail || !EMAIL_REGEX.test(sanitizedEmail)) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
    }

    const sanitizedDeparture = sanitizeString(departureCity || '', 80)
    if (!sanitizedDeparture) {
      return NextResponse.json({ error: 'Departure city required' }, { status: 400 })
    }

    const sanitizedMonth = sanitizeString(cruiseMonth || '', 60)
    if (!sanitizedMonth) {
      return NextResponse.json({ error: 'Cruise month or dates required' }, { status: 400 })
    }

    const destCode = sanitizeString(destination || '', 5).toUpperCase()
    if (!ALLOWED_DESTINATIONS.has(destCode)) {
      return NextResponse.json({ error: 'Invalid destination airport' }, { status: 400 })
    }

    if (!process.env.BREVO_API_KEY) {
      console.error('BREVO_API_KEY not configured — flight deal signup not persisted', {
        email: sanitizedEmail,
      })
      return NextResponse.json({ success: true, message: 'Signup received' })
    }

    const brevoBody: Record<string, unknown> = {
      email: sanitizedEmail,
      updateEnabled: true,
      attributes: {
        SOURCE: 'flight_deals_page',
        FLIGHT_DEPARTURE: sanitizedDeparture,
        FLIGHT_DESTINATION: destCode,
        CRUISE_MONTH: sanitizedMonth,
      },
    }

    const listId = process.env.BREVO_FLIGHT_DEALS_LIST_ID || process.env.BREVO_LIST_ID
    if (listId) {
      const parsed = parseInt(listId, 10)
      if (!isNaN(parsed)) brevoBody.listIds = [parsed]
    }

    const brevoRes = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'api-key': process.env.BREVO_API_KEY,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(brevoBody),
    })

    if (brevoRes.status === 400) {
      const errBody = await brevoRes.text()
      if (errBody.includes('duplicate_parameter') || errBody.toLowerCase().includes('already exist')) {
        return NextResponse.json({ error: 'Already subscribed' }, { status: 409 })
      }
      console.error('Brevo flight-deals signup failed:', brevoRes.status, errBody)
      return NextResponse.json({ error: 'Signup failed. Please try again.' }, { status: 500 })
    }

    if (!brevoRes.ok && brevoRes.status !== 204) {
      const errBody = await brevoRes.text()
      console.error('Brevo flight-deals signup failed:', brevoRes.status, errBody)
      return NextResponse.json({ error: 'Signup failed. Please try again.' }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: 'Subscribed to flight deal alerts' })
  } catch (err) {
    console.error('Flight deals signup error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

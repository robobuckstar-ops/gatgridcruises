import { NextRequest, NextResponse } from 'next/server'
import { createSessionToken, COOKIE_NAME } from '@/lib/portal-auth'
import { checkRateLimit, getClientIp } from '@/lib/rate-limit'
import {
  BOOKING_FIELDS,
  fetchBookingByName,
  fetchClientName,
} from '@/lib/portal-airtable'

// Required: Node.js runtime for crypto module — edge runtime does not support Node's crypto
export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  // 5 attempts per 15 min per IP — slow brute force without breaking real retries
  const ip = getClientIp(request)
  const { allowed, retryAfter } = checkRateLimit(ip, 'portal-login', 5, 15 * 60 * 1000)
  if (!allowed) {
    return NextResponse.json(
      { error: 'Too many login attempts. Please try again later.' },
      { status: 429, headers: { 'Retry-After': String(retryAfter) } }
    )
  }

  try {
    const apiKey = process.env.AIRTABLE_API_KEY
    if (!apiKey) {
      // Vercel env diagnostic: log which portal/airtable vars are present
      const presentVars = Object.keys(process.env).filter(
        k => k.includes('AIRTABLE') || k.includes('PORTAL') || k.includes('BREVO')
      )
      console.error('[portal/login] AIRTABLE_API_KEY missing. Present env vars:', presentVars)
      return NextResponse.json({ error: 'Service unavailable', code: 'NO_AIRTABLE_KEY' }, { status: 503 })
    }
    if (!process.env.PORTAL_JWT_SECRET) {
      console.error('[portal/login] PORTAL_JWT_SECRET missing')
      return NextResponse.json({ error: 'Service unavailable', code: 'NO_JWT_SECRET' }, { status: 503 })
    }

    const body = await request.json()
    const { bookingNumber, lastName, email } = body

    if (!bookingNumber || !lastName || !email) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    const normalizedNumber = bookingNumber.trim().replace(/^#*/, '#')
    const normalizedEmail = email.trim().toLowerCase()
    const normalizedLastName = lastName.trim().toLowerCase()

    const booking = await fetchBookingByName(normalizedNumber, apiKey)
    if (!booking) {
      return NextResponse.json({ error: 'Booking not found. Please check your booking number.' }, { status: 401 })
    }

    const fields = booking.fields
    const bookingEmail = String(fields[BOOKING_FIELDS.clientEmail] ?? '').toLowerCase()
    if (!bookingEmail || bookingEmail !== normalizedEmail) {
      return NextResponse.json({ error: 'The details you entered do not match our records.' }, { status: 401 })
    }

    const clientIds = fields[BOOKING_FIELDS.client] as string[] | undefined
    const clientName = clientIds?.length ? await fetchClientName(clientIds[0], apiKey) : ''

    if (clientName) {
      const words = clientName.trim().split(/\s+/)
      const lastWord = words[words.length - 1].toLowerCase()
      if (lastWord !== normalizedLastName) {
        return NextResponse.json({ error: 'The details you entered do not match our records.' }, { status: 401 })
      }
    }

    const token = createSessionToken({
      bookingId: booking.id,
      bookingName: normalizedNumber,
      email: normalizedEmail,
      clientName: clientName || normalizedEmail.split('@')[0],
    })

    const response = NextResponse.json({ success: true })
    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    })

    return response
  } catch (err) {
    console.error('Portal login error:', err)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}

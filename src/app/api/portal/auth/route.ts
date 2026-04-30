import { NextRequest, NextResponse } from 'next/server'
import {
  COOKIE_NAME,
  createSessionToken,
  verifyMagicLinkToken,
} from '@/lib/portal-auth'
import { fetchBookingById } from '@/lib/portal-airtable'

export const runtime = 'nodejs'

function redirectWithError(req: NextRequest, error: string): NextResponse {
  const url = new URL('/my-trip', req.url)
  url.searchParams.set('error', error)
  return NextResponse.redirect(url)
}

export async function GET(request: NextRequest) {
  try {
    const token = request.nextUrl.searchParams.get('token')
    if (!token) return redirectWithError(request, 'missing_token')

    if (!process.env.PORTAL_JWT_SECRET) {
      console.error('[portal/auth] PORTAL_JWT_SECRET missing')
      return redirectWithError(request, 'service_unavailable')
    }
    const apiKey = process.env.AIRTABLE_API_KEY
    if (!apiKey) {
      console.error('[portal/auth] AIRTABLE_API_KEY missing')
      return redirectWithError(request, 'service_unavailable')
    }

    const payload = verifyMagicLinkToken(token)
    if (!payload) return redirectWithError(request, 'expired')

    // Re-verify the booking still exists and the email on file still matches
    // the one in the token. Protects against bookings being deleted/reassigned
    // while a magic link is in flight.
    const result = await fetchBookingById(payload.bookingId, apiKey)
    if (!result) return redirectWithError(request, 'booking_not_found')

    const currentEmail = result.client.email.toLowerCase()
    if (!currentEmail || currentEmail !== payload.email.toLowerCase()) {
      return redirectWithError(request, 'expired')
    }

    const sessionToken = createSessionToken({
      bookingId: result.booking.id,
      bookingName: result.booking.number,
      email: currentEmail,
      clientName: result.client.fullName || result.client.firstName,
    })

    const response = NextResponse.redirect(new URL('/my-trip/dashboard', request.url))
    response.cookies.set(COOKIE_NAME, sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    })
    return response
  } catch (err) {
    console.error('[portal/auth] error:', err)
    return redirectWithError(request, 'server_error')
  }
}

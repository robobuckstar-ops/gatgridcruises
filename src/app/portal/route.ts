import { NextRequest, NextResponse } from 'next/server'
import {
  COOKIE_NAME,
  createSessionToken,
  verifySimpleMagicLinkToken,
} from '@/lib/portal-auth'

// Required: Node.js runtime for crypto module — edge runtime does not support Node's crypto
export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token')
  const dashboardUrl = new URL('/my-trip/dashboard', request.url)
  const loginUrl = new URL('/my-trip', request.url)

  if (!token) {
    loginUrl.searchParams.set('error', 'missing_token')
    return NextResponse.redirect(loginUrl)
  }

  if (!process.env.PORTAL_JWT_SECRET) {
    console.error('[portal] PORTAL_JWT_SECRET missing')
    loginUrl.searchParams.set('error', 'server_misconfigured')
    return NextResponse.redirect(loginUrl)
  }

  const payload = verifySimpleMagicLinkToken(token)
  if (!payload) {
    loginUrl.searchParams.set('error', 'invalid_or_expired_link')
    return NextResponse.redirect(loginUrl)
  }

  // Bridge magic-link payload into the existing portal session shape.
  // bookingId/bookingName are unknown for magic-link flows — leave blank.
  const session = createSessionToken({
    bookingId: '',
    bookingName: '',
    email: payload.email.toLowerCase(),
    clientName: payload.name,
  })

  const response = NextResponse.redirect(dashboardUrl)
  response.cookies.set(COOKIE_NAME, session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  })
  return response
}

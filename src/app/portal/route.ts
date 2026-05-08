import { NextRequest, NextResponse } from 'next/server'
import { COOKIE_NAME, createSessionToken, verifyMagicLinkToken } from '@/lib/portal-auth'

// crypto module requires the Node.js runtime
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
      console.error('[portal] PORTAL_JWT_SECRET missing')
      return redirectWithError(request, 'service_unavailable')
    }

    const payload = verifyMagicLinkToken(token)
    if (!payload) return redirectWithError(request, 'expired')

    const sessionToken = createSessionToken({
      bookingId: payload.bookingId ?? '',
      bookingName: '',
      email: payload.email,
      clientName: payload.name || payload.email.split('@')[0],
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
    console.error('[portal] error:', err)
    return redirectWithError(request, 'server_error')
  }
}

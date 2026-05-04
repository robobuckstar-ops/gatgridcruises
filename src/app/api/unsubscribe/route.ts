import { NextRequest, NextResponse } from 'next/server'
import { checkRateLimit, getClientIp } from '@/lib/rate-limit'
import { subscribers } from '@/app/api/subscribe/route'

export async function POST(request: NextRequest) {
  // 10 unsubscribe attempts per hour per IP
  const ip = getClientIp(request)
  const { allowed, retryAfter } = checkRateLimit(ip, 'unsubscribe', 10, 60 * 60 * 1000)
  if (!allowed) {
    return NextResponse.json(
      { error: 'Too many requests' },
      { status: 429, headers: { 'Retry-After': String(retryAfter) } }
    )
  }

  try {
    const body = await request.json()
    const { token, email } = body

    if (!token && !email) {
      return NextResponse.json({ error: 'Token or email required' }, { status: 400 })
    }

    const idx = subscribers.findIndex(
      s => (token && s.unsubscribe_token === token) || (email && s.email === email)
    )

    if (idx === -1) {
      // Return success anyway to avoid email enumeration
      return NextResponse.json({ success: true })
    }

    subscribers.splice(idx, 1)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// Handle GET unsubscribe links from emails (?token=xxx)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get('token')

  if (!token) {
    return NextResponse.redirect(new URL('/?unsubscribed=missing', request.url))
  }

  const idx = subscribers.findIndex(s => s.unsubscribe_token === token)
  if (idx !== -1) {
    subscribers.splice(idx, 1)
  }

  return NextResponse.redirect(new URL('/?unsubscribed=true', request.url))
}

import { NextRequest, NextResponse } from 'next/server'
import { checkRateLimit, getClientIp } from '@/lib/rate-limit'
import { isSubscriberStoreConfigured, unsubscribeSubscriber } from '@/lib/subscriber-store'

export const runtime = 'nodejs'

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

    if (!isSubscriberStoreConfigured()) {
      console.error('[unsubscribe] AIRTABLE_API_KEY not set — cannot process opt-out')
      return NextResponse.json({ error: 'Service unavailable' }, { status: 503 })
    }

    // The result is deliberately not reflected in the response: reporting
    // "no such subscriber" would let anyone probe the list for an address.
    await unsubscribeSubscriber({
      token: typeof token === 'string' ? token : undefined,
      email: typeof email === 'string' ? email : undefined,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[unsubscribe] failed:', err)
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

  if (isSubscriberStoreConfigured()) {
    try {
      await unsubscribeSubscriber({ token })
    } catch (err) {
      // A one-click unsubscribe must never show the reader an error page —
      // log it and let the confirmation render; the address stays flagged in
      // the logs for a manual removal.
      console.error('[unsubscribe] token opt-out failed:', err)
    }
  } else {
    console.error('[unsubscribe] AIRTABLE_API_KEY not set — token opt-out dropped')
  }

  return NextResponse.redirect(new URL('/?unsubscribed=true', request.url))
}

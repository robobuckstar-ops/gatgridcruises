// Exchange the shared Messages passphrase for a signed session cookie.

import { NextRequest, NextResponse } from 'next/server'
import {
  MESSAGES_COOKIE,
  createMessagesSession,
  getMessagesSecret,
  isCorrectSecret,
} from '@/lib/messages-auth'
import { checkRateLimit, getClientIp } from '@/lib/rate-limit'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  // 8 tries per 15 minutes per IP — a shared passphrase deserves a brake.
  const { allowed, retryAfter } = checkRateLimit(getClientIp(request), 'messages-login', 8, 15 * 60_000)
  if (!allowed) {
    return NextResponse.json(
      { error: 'Too many attempts. Try again in a few minutes.' },
      { status: 429, headers: { 'Retry-After': String(retryAfter ?? 900) } },
    )
  }

  if (!getMessagesSecret()) {
    console.error('[sms/auth] MESSAGES_ADMIN_SECRET is not set')
    return NextResponse.json(
      { error: 'The inbox passphrase has not been set up yet (MESSAGES_ADMIN_SECRET).', code: 'NO_SECRET' },
      { status: 503 },
    )
  }

  let payload: { secret?: unknown }
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: 'Expected a JSON body' }, { status: 400 })
  }

  const candidate = typeof payload.secret === 'string' ? payload.secret : ''
  if (!candidate || !isCorrectSecret(candidate)) {
    return NextResponse.json({ error: 'That passphrase is not right.' }, { status: 401 })
  }

  const session = createMessagesSession()
  const response = NextResponse.json({ success: true })
  response.cookies.set(MESSAGES_COOKIE, session.value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: session.maxAge,
  })
  return response
}

export async function DELETE() {
  const response = NextResponse.json({ success: true })
  response.cookies.set(MESSAGES_COOKIE, '', { httpOnly: true, path: '/', maxAge: 0 })
  return response
}

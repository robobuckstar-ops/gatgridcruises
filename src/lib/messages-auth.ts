// Gate for the shared Messages inbox.
//
// There is no admin login in this app — /admin/* pages are unauthenticated and
// the portal's session is per-booking, so neither one fits. This is a single
// shared passphrase (MESSAGES_ADMIN_SECRET) exchanged for a signed, httpOnly
// cookie, which is enough for one operator and keeps client conversations off
// the open internet. Swap it for real admin auth if /admin ever grows one.

import { createHmac, timingSafeEqual } from 'crypto'
import type { NextRequest } from 'next/server'

export const MESSAGES_COOKIE = 'gg_messages_session'
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 30 // 30 days — a desktop he keeps open

export function getMessagesSecret(): string | null {
  const secret = process.env.MESSAGES_ADMIN_SECRET?.trim()
  return secret ? secret : null
}

function sign(data: string, secret: string): string {
  return createHmac('sha256', secret).update(data).digest('base64url')
}

function safeEqual(a: string, b: string): boolean {
  const left = Buffer.from(a)
  const right = Buffer.from(b)
  if (left.length !== right.length) return false
  return timingSafeEqual(left, right)
}

/** Constant-time passphrase check, so the login can't be timed character by character. */
export function isCorrectSecret(candidate: string): boolean {
  const secret = getMessagesSecret()
  if (!secret) return false
  return safeEqual(candidate.trim(), secret)
}

export function createMessagesSession(): { value: string; maxAge: number } {
  const secret = getMessagesSecret()
  if (!secret) throw new Error('MESSAGES_ADMIN_SECRET not configured')

  const exp = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS
  return { value: `${exp}.${sign(String(exp), secret)}`, maxAge: SESSION_TTL_SECONDS }
}

export function isValidSessionCookie(value: string | undefined): boolean {
  const secret = getMessagesSecret()
  if (!secret || !value) return false

  const [exp, sig] = value.split('.')
  if (!exp || !sig) return false
  if (!/^\d+$/.test(exp) || Number(exp) < Math.floor(Date.now() / 1000)) return false

  return safeEqual(sig, sign(exp, secret))
}

/**
 * Accept the session cookie or the raw passphrase in a header — the header form
 * keeps the routes curl-testable without a browser session.
 */
export function isAuthorizedMessagesRequest(request: NextRequest): boolean {
  if (!getMessagesSecret()) {
    // Unconfigured: usable locally so the inbox can be developed, never in
    // production where it would expose client conversations to anyone.
    return process.env.NODE_ENV !== 'production'
  }

  if (isValidSessionCookie(request.cookies.get(MESSAGES_COOKIE)?.value)) return true

  const header = request.headers.get('x-messages-secret')
  if (header && isCorrectSecret(header)) return true

  const auth = request.headers.get('authorization')
  if (auth?.startsWith('Bearer ') && isCorrectSecret(auth.slice(7))) return true

  return false
}

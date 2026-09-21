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

// ---- Magic-link login -------------------------------------------------------
// Lets an allow-listed admin sign in by clicking a one-time link emailed to
// them, instead of typing MESSAGES_ADMIN_SECRET. The link's token is signed
// with that same secret, so the operator never needs to know the passphrase —
// the server holds it. A successful link mints the normal session cookie above.

const MAGIC_TTL_SECONDS = 15 * 60 // links expire in 15 minutes

/** Emails allowed to request a login link (ADMIN_MAGIC_EMAILS, comma-separated). */
export function getAdminEmails(): string[] {
  const raw = process.env.ADMIN_MAGIC_EMAILS?.trim()
  return (raw && raw.length ? raw : 'robobuckstar@gmail.com')
    .split(',')
    .map(e => e.trim().toLowerCase())
    .filter(e => e.includes('@'))
}

export function isAdminEmail(email: string): boolean {
  return getAdminEmails().includes(email.trim().toLowerCase())
}

/**
 * A signed, expiring token bound to an email. Format: `email~exp~sig`, where
 * the email is percent-encoded (so it never contains the `~` separator) and
 * `sig` is base64url (also `~`-free). Returns null if no secret is configured.
 */
export function createMagicToken(email: string): string | null {
  const secret = getMessagesSecret()
  if (!secret) return null
  const exp = Math.floor(Date.now() / 1000) + MAGIC_TTL_SECONDS
  const data = `${encodeURIComponent(email.trim().toLowerCase())}~${exp}`
  return `${data}~${sign(data, secret)}`
}

/** Returns the email if the token is valid, unexpired, and an admin; else null. */
export function verifyMagicToken(token: string | undefined): string | null {
  const secret = getMessagesSecret()
  if (!secret || !token) return null

  const [emailEnc, exp, sig] = token.split('~')
  if (!emailEnc || !exp || !sig) return null
  if (!/^\d+$/.test(exp) || Number(exp) < Math.floor(Date.now() / 1000)) return null
  if (!safeEqual(sig, sign(`${emailEnc}~${exp}`, secret))) return null

  let email: string
  try {
    email = decodeURIComponent(emailEnc)
  } catch {
    return null
  }
  return isAdminEmail(email) ? email : null
}

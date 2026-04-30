import { createHmac, timingSafeEqual } from 'crypto'
import type { NextRequest } from 'next/server'

export const COOKIE_NAME = 'gg_portal_session'
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7 // 7 days
const MAGIC_LINK_TTL_SECONDS = 60 * 60 * 24 * 30 // 30 days

export interface PortalSession {
  bookingId: string
  bookingName: string
  email: string
  clientName: string
  exp: number
}

export interface MagicLinkPayload {
  bookingId: string
  email: string
  exp: number
  type: 'magic-link'
}

function b64urlEncode(str: string): string {
  return Buffer.from(str).toString('base64url')
}

function b64urlDecode(str: string): string {
  return Buffer.from(str, 'base64url').toString('utf8')
}

function hmacSign(data: string, secret: string): string {
  return createHmac('sha256', secret).update(data).digest('base64url')
}

export function createSessionToken(payload: Omit<PortalSession, 'exp'>): string {
  const secret = process.env.PORTAL_JWT_SECRET
  if (!secret) throw new Error('PORTAL_JWT_SECRET not configured')

  const header = b64urlEncode(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
  const body = b64urlEncode(
    JSON.stringify({ ...payload, exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS })
  )
  const sig = hmacSign(`${header}.${body}`, secret)
  return `${header}.${body}.${sig}`
}

export function verifySessionToken(token: string): PortalSession | null {
  try {
    const secret = process.env.PORTAL_JWT_SECRET
    if (!secret) return null

    const parts = token.split('.')
    if (parts.length !== 3) return null

    const [header, body, sig] = parts
    const expectedSig = hmacSign(`${header}.${body}`, secret)

    const sigBuf = Buffer.from(sig, 'base64url')
    const expectedBuf = Buffer.from(expectedSig, 'base64url')
    if (sigBuf.length !== expectedBuf.length) return null
    if (!timingSafeEqual(sigBuf, expectedBuf)) return null

    const session: PortalSession = JSON.parse(b64urlDecode(body))
    if (session.exp < Math.floor(Date.now() / 1000)) return null

    return session
  } catch {
    return null
  }
}

export function getSessionFromRequest(req: NextRequest): PortalSession | null {
  const token = req.cookies.get(COOKIE_NAME)?.value
  if (!token) return null
  return verifySessionToken(token)
}

// ─── Magic-link tokens ─────────────────────────────────────────────────────
// Same JWT format as session tokens (HS256, shared PORTAL_JWT_SECRET) but the
// payload carries `type: 'magic-link'` so the two token kinds can't be confused.

export function createMagicLinkToken(payload: { bookingId: string; email: string }): string {
  const secret = process.env.PORTAL_JWT_SECRET
  if (!secret) throw new Error('PORTAL_JWT_SECRET not configured')

  const header = b64urlEncode(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
  const body = b64urlEncode(
    JSON.stringify({
      bookingId: payload.bookingId,
      email: payload.email,
      type: 'magic-link',
      exp: Math.floor(Date.now() / 1000) + MAGIC_LINK_TTL_SECONDS,
    })
  )
  const sig = hmacSign(`${header}.${body}`, secret)
  return `${header}.${body}.${sig}`
}

export function verifyMagicLinkToken(token: string): MagicLinkPayload | null {
  try {
    const secret = process.env.PORTAL_JWT_SECRET
    if (!secret) return null

    const parts = token.split('.')
    if (parts.length !== 3) return null

    const [header, body, sig] = parts
    const expectedSig = hmacSign(`${header}.${body}`, secret)

    const sigBuf = Buffer.from(sig, 'base64url')
    const expectedBuf = Buffer.from(expectedSig, 'base64url')
    if (sigBuf.length !== expectedBuf.length) return null
    if (!timingSafeEqual(sigBuf, expectedBuf)) return null

    const parsed = JSON.parse(b64urlDecode(body)) as Partial<MagicLinkPayload>
    if (parsed.type !== 'magic-link') return null
    if (typeof parsed.exp !== 'number' || parsed.exp < Math.floor(Date.now() / 1000)) return null
    if (typeof parsed.bookingId !== 'string' || typeof parsed.email !== 'string') return null

    return parsed as MagicLinkPayload
  } catch {
    return null
  }
}

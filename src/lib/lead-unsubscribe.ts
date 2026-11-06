// Signed one-click unsubscribe links for lead nurture emails. A lead has no
// subscriber token, so the link carries the address plus an HMAC of it.

import { createHmac, timingSafeEqual } from 'crypto'

function secret(): string {
  return process.env.LEAD_UNSUBSCRIBE_SECRET?.trim() || process.env.CRON_SECRET?.trim() || ''
}

function sign(email: string, key: string): string {
  return createHmac('sha256', key).update(email.trim().toLowerCase()).digest('hex')
}

export function leadUnsubscribeUrl(email: string): string | null {
  const key = secret()
  if (!key) return null
  const params = new URLSearchParams({ email: email.trim().toLowerCase(), sig: sign(email, key) })
  return `https://gatgridcruises.com/api/unsubscribe/lead?${params.toString()}`
}

export function verifyLeadUnsubscribe(email: string, sig: string): boolean {
  const key = secret()
  if (!key || !email || !sig) return false
  const expected = Buffer.from(sign(email, key))
  const given = Buffer.from(sig)
  return expected.length === given.length && timingSafeEqual(expected, given)
}

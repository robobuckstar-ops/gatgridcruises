// Shared auth for cron-triggered routes.
//
// Vercel Cron sends `Authorization: Bearer $CRON_SECRET`. The existing routes
// were split between that header and a bespoke `x-cron-secret` one, so this
// accepts either (plus `?secret=` for manual curl checks) and applies the same
// rule everywhere: if CRON_SECRET is set, it is required — including in
// development, so a local run can never blast the real list by accident.

import type { NextRequest } from 'next/server'

export function isAuthorizedCronRequest(request: NextRequest): boolean {
  const secret = process.env.CRON_SECRET?.trim()

  if (!secret) {
    // Nothing to check against: allow in dev so the routes stay testable,
    // never in production.
    return process.env.NODE_ENV !== 'production'
  }

  const authHeader = request.headers.get('authorization')
  if (authHeader === `Bearer ${secret}`) return true
  if (request.headers.get('x-cron-secret') === secret) return true

  try {
    return new URL(request.url).searchParams.get('secret') === secret
  } catch {
    return false
  }
}

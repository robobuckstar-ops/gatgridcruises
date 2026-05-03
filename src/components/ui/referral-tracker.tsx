'use client'

import { useEffect } from 'react'

const COOKIE_NAME = 'gg_ref'
const MAX_AGE_SECONDS = 60 * 60 * 24 * 30 // 30 days

// Captures the ?ref=CODE query param into a 30-day cookie so the referral
// source survives client-side navigation and follows the visitor through
// the funnel (concierge form, deal alerts, etc.).
//
// Mounted in the root layout. Renders nothing.
export function ReferralTracker() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)
    const ref = params.get('ref')
    if (!ref) return
    // Match the same code shape the partner generator produces so we
    // don't store arbitrary user-supplied junk.
    if (!/^[A-Z0-9]{6,10}$/.test(ref)) return

    document.cookie = [
      `${COOKIE_NAME}=${encodeURIComponent(ref)}`,
      `Max-Age=${MAX_AGE_SECONDS}`,
      'Path=/',
      'SameSite=Lax',
      window.location.protocol === 'https:' ? 'Secure' : '',
    ]
      .filter(Boolean)
      .join('; ')

    // Fire-and-forget click tracking so Grayson can see referral activity
    // even before a lead converts.
    fetch('/api/referral/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: ref }),
      keepalive: true,
    }).catch(() => {})
  }, [])

  return null
}

export function readReferralCookie(): string | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(/(?:^|;\s*)gg_ref=([^;]+)/)
  return match ? decodeURIComponent(match[1]) : null
}

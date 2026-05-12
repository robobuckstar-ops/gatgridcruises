'use client'

import { useEffect } from 'react'

const REF_COOKIE = 'gg_ref'
const MAX_AGE_SECONDS = 60 * 60 * 24 * 30 // 30 days

// utm_source/medium/campaign let partners segment their links per platform
// (TikTok bio vs YouTube card vs Instagram story) so Grayson can see which
// surface is actually driving inquiries — not just which partner.
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const
type UtmKey = (typeof UTM_KEYS)[number]
const UTM_COOKIES: Record<UtmKey, string> = {
  utm_source: 'gg_utm_source',
  utm_medium: 'gg_utm_medium',
  utm_campaign: 'gg_utm_campaign',
  utm_content: 'gg_utm_content',
  utm_term: 'gg_utm_term',
}

// Allow letters, numbers, dots, dashes, underscores, spaces — covers typical
// platform names ("tiktok", "ig_story", "youtube-shorts") while still
// stripping anything weird users could shove in the URL.
const UTM_SAFE = /^[A-Za-z0-9._\- ]{1,80}$/

function writeCookie(name: string, value: string) {
  document.cookie = [
    `${name}=${encodeURIComponent(value)}`,
    `Max-Age=${MAX_AGE_SECONDS}`,
    'Path=/',
    'SameSite=Lax',
    window.location.protocol === 'https:' ? 'Secure' : '',
  ]
    .filter(Boolean)
    .join('; ')
}

function readCookie(name: string): string | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`))
  return match ? decodeURIComponent(match[1]) : null
}

// Captures ?ref=CODE and ?utm_* query params into 30-day cookies so the
// referral source survives client-side navigation and follows the visitor
// through the funnel (concierge form, deal alerts, etc.).
//
// Mounted in the root layout. Renders nothing.
export function ReferralTracker() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)

    const ref = params.get('ref')
    if (ref && /^[A-Z0-9]{6,10}$/.test(ref)) {
      writeCookie(REF_COOKIE, ref)
      // Fire-and-forget click tracking so Grayson can see referral activity
      // even before a lead converts.
      fetch('/api/referral/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: ref }),
        keepalive: true,
      }).catch(() => {})
    }

    for (const key of UTM_KEYS) {
      const value = params.get(key)
      if (value && UTM_SAFE.test(value)) {
        writeCookie(UTM_COOKIES[key], value)
      }
    }
  }, [])

  return null
}

export function readReferralCookie(): string | null {
  return readCookie(REF_COOKIE)
}

export type UtmParams = Partial<Record<UtmKey, string>>

export function readUtmCookies(): UtmParams {
  const out: UtmParams = {}
  for (const key of UTM_KEYS) {
    const v = readCookie(UTM_COOKIES[key])
    if (v) out[key] = v
  }
  return out
}

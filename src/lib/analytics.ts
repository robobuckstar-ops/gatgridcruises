/**
 * Conversion tracking for the lead forms (/book, /concierge, /transfer,
 * /price-watch, /group-cruise, /free-quote, and the "Request This Sailing"
 * modal).
 *
 * Three tags coexist on the site and each wants its own signal for the same
 * event, so they are fired together from one place rather than duplicated at
 * every call site:
 *   - GA4 (G-434T744BN1) — configured in the root layout, untouched here.
 *   - Meta Pixel — `fbq('track', 'Lead')`.
 *   - Google Ads (AW-18395230133) — `gtag('event', 'conversion', { send_to })`.
 *
 * GA4 and Google Ads share the single gtag.js loader in the root layout; the
 * `send_to` parameter is what routes the conversion to the Ads account rather
 * than to GA4.
 *
 * Every call is best-effort: if a tag is blocked, still loading, or the code
 * runs during SSR, the helper returns quietly. Analytics must never be the
 * reason a visitor's inquiry appears to fail.
 */

export const META_PIXEL_ID =
  process.env.NEXT_PUBLIC_META_PIXEL_ID || '1781062076400794'

export const GOOGLE_ADS_ID =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || 'AW-18395230133'

export const GOOGLE_ADS_LEAD_CONVERSION_LABEL =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL || 'TceUCNHUnOMcELXfw8NE'

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
    gtag?: (...args: unknown[]) => void
  }
}

/** Which form produced the lead — passed along for reporting, not required. */
export type LeadSource =
  | 'book'
  | 'concierge'
  | 'request-sailing'
  | 'transfer'
  | 'price-watch'
  | 'group-cruise'
  | 'free-guide'
  | 'free-quote'

/**
 * Report a submitted lead to Meta and Google Ads.
 *
 * Call this only after the API responded OK — a lead that failed to reach us
 * is not a conversion.
 */
export function trackLead(source: LeadSource): void {
  if (typeof window === 'undefined') return

  try {
    window.fbq?.('track', 'Lead', { content_name: source })
  } catch {
    // A blocked or half-initialized pixel must not break the success state.
  }

  try {
    window.gtag?.('event', 'conversion', {
      send_to: `${GOOGLE_ADS_ID}/${GOOGLE_ADS_LEAD_CONVERSION_LABEL}`,
    })
  } catch {
    // Same: never let a tag failure surface to the visitor.
  }
}

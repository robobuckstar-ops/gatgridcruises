// Editable constants for the /giving-back page.
//
// ─────────────────────────────────────────────────────────────────────────────
// UPDATING THE TRACKER
// After each quarterly donation to CURE, bump CURE_BUSINESS_DONATED_TOTAL to
// the new cumulative amount and set CURE_DONATIONS_LAST_UPDATED to the date of
// that donation. Those are the only two values that need to change.
// ─────────────────────────────────────────────────────────────────────────────

/** Share of GatGrid's booking commission donated to CURE, as a percentage. */
export const CURE_PLEDGE_PERCENT: number = 5

/**
 * Cumulative dollars GatGrid Cruises (the business) has actually donated to
 * CURE. Seeded at 0 because the commission pledge starts now — this counts
 * donations we have made, not commissions we expect to earn.
 *
 * Deliberately a hand-maintained constant rather than a sum over Airtable's
 * "estimated commission" field: commission is only estimated until a sailing
 * completes and pays out, and we donate quarterly. Computing from estimates
 * would advertise money we haven't actually given yet.
 */
export const CURE_BUSINESS_DONATED_TOTAL: number = 0

/** Date of the most recent donation reflected in the total above. */
export const CURE_DONATIONS_LAST_UPDATED = 'August 21, 2026'

/**
 * Grayson's PERSONAL giving to CURE — his own money, separate from the
 * business pledge. Figure confirmed by CURE International donor relations
 * (Kristina Thorne). Never roll this into the business tracker.
 */
export const FOUNDER_PERSONAL_GIVING_TOTAL = 3768
export const FOUNDER_PERSONAL_GIVING_SINCE = 2020

export const CURE_URL = 'https://cure.org'
export const CURE_DONATE_URL = 'https://cure.org/donate'

/** Whole-dollar currency, e.g. 3768 -> "$3,768". */
export function formatGivingAmount(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

/**
 * Onboard credit is a flat share of the total cruise fare — no tiers, no cap.
 *
 * This module is the single source of truth for every OBC figure the site
 * quotes. Nothing else should compute an OBC amount or hardcode one in copy;
 * import `getOBC` (or `OBC_EXAMPLE_FARES` for illustrative tables) instead.
 *
 * Public copy shows DOLLAR amounts only. The rate itself is not advertised.
 */

/** Share of total cruise fare returned as OBC. Edit here to change the offer. */
export const OBC_RATE = 0.03

/** Quoted OBC is rounded up to this increment so figures stay clean. */
export const OBC_ROUNDING = 10

/** No qualifying booking is quoted less than this. */
export const OBC_MINIMUM = 10

/**
 * A fare is valid if it is a finite number greater than zero. Negative and
 * non-numeric fares are not "zero credit" — they are invalid input.
 */
export function isValidFare(totalFare: number): boolean {
  return Number.isFinite(totalFare) && totalFare > 0
}

/**
 * OBC for a total cruise fare (all guests, before taxes and port fees).
 *
 * Rounds up to the nearest $10 and never quotes below OBC_MINIMUM, so a small
 * fare still earns something rather than rounding away to $0.
 */
export function getOBC(totalFare: number): number {
  if (!isValidFare(totalFare)) return 0
  const raw = totalFare * OBC_RATE
  return Math.max(OBC_MINIMUM, Math.ceil(raw / OBC_ROUNDING) * OBC_ROUNDING)
}

/** Formatted with a thousands separator, for display: 1500 -> "$1,500". */
export function formatUSD(amount: number): string {
  return `$${Math.round(amount).toLocaleString('en-US')}`
}

/**
 * Representative fares for the "what would I earn" tables on the calculator,
 * /onboard-credit, and /book. These illustrate real amounts without stating a
 * rate — the credit column is always derived from getOBC, never hardcoded.
 */
export const OBC_EXAMPLE_FARES = [2000, 3000, 5000, 7500, 10000] as const

export interface OBCTier {
  minFare: number
  maxFare: number | null
  obc: number
  label: string
}

/** Ascending by minFare — getOBCTier relies on this ordering. */
export const OBC_TIERS: OBCTier[] = [
  { minFare: 0,     maxFare: 1499, obc: 25,  label: 'Under $1,500' },
  { minFare: 1500,  maxFare: 2999, obc: 75,  label: '$1,500 – $2,999' },
  { minFare: 3000,  maxFare: 4999, obc: 150, label: '$3,000 – $4,999' },
  { minFare: 5000,  maxFare: 9999, obc: 300, label: '$5,000 – $9,999' },
  { minFare: 10000, maxFare: null, obc: 400, label: '$10,000+' },
]

/** The highest OBC any tier pays. Use this instead of hardcoding "$400" in copy. */
export const MAX_OBC = OBC_TIERS.reduce((max, t) => Math.max(max, t.obc), 0)

/**
 * A fare is valid if it is a finite number greater than zero. Negative and
 * non-numeric fares are not "tier zero" — they are invalid input.
 */
export function isValidFare(totalFare: number): boolean {
  return Number.isFinite(totalFare) && totalFare > 0
}

/**
 * Resolve a fare to its tier by taking the highest tier the fare reaches.
 *
 * The tier labels advertise whole-dollar bands ($1,500–$2,999), but fares are
 * not whole dollars. Matching on `fare <= maxFare` left every fractional fare
 * between one tier's maxFare and the next tier's minFare (2999.99, 4999.99,
 * 9999.99) unmatched, which surfaced as $0 OBC. Bands are contiguous, so the
 * lower bound alone is enough to place any fare.
 */
export function getOBCTier(totalFare: number): OBCTier | null {
  if (!isValidFare(totalFare)) return null

  let match: OBCTier | null = null
  for (const tier of OBC_TIERS) {
    if (totalFare >= tier.minFare) match = tier
    else break
  }
  return match
}

export function getOBC(totalFare: number): number {
  return getOBCTier(totalFare)?.obc ?? 0
}

/** Index into OBC_TIERS for highlighting the active row, or -1. */
export function getOBCTierIndex(totalFare: number): number {
  const tier = getOBCTier(totalFare)
  return tier ? OBC_TIERS.indexOf(tier) : -1
}

/**
 * Stateroom category price ordering.
 *
 * Disney sells four rungs and they only ever go one way:
 *
 *   Inside < Oceanview < Verandah < Concierge
 *
 * The Apify feed occasionally hands back rows where the Oceanview and Verandah
 * fares are swapped (`price_USD_O` above `price_USD_B`), which surfaced on the
 * sailing detail page as an Oceanview stateroom priced above a Verandah — an
 * obvious data error to anyone who has booked a Disney cruise.
 *
 * Rather than trusting the upstream label, we trust the *prices*: take whatever
 * fares a sailing actually has and reassign them to the rungs in ascending
 * order. Real price points are preserved; only the category they hang on moves.
 * Categories the feed reported as unavailable (`null`) stay unavailable — a
 * missing rung means "not offered / sold out", not "cheapest".
 */

export const STATEROOM_CATEGORY_ORDER = [
  'current_inside_price',
  'current_oceanview_price',
  'current_verandah_price',
  'current_concierge_price',
] as const

type CategoryPrices = {
  current_inside_price: number | null
  current_oceanview_price: number | null
  current_verandah_price: number | null
  current_concierge_price: number | null
}

function usablePrice(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value) && value > 0
}

/**
 * Returns a copy of `sailing` whose four category fares are in ascending
 * order. A sailing already in order comes back with identical values.
 */
export function normalizeStateroomPrices<T extends Partial<CategoryPrices>>(sailing: T): T {
  const present = STATEROOM_CATEGORY_ORDER.filter(key => usablePrice(sailing[key]))
  if (present.length < 2) return sailing

  const ascending = present.map(key => sailing[key] as number).sort((a, b) => a - b)
  if (present.every((key, i) => sailing[key] === ascending[i])) return sailing

  const fixed = { ...sailing }
  present.forEach((key, i) => {
    ;(fixed as CategoryPrices)[key] = ascending[i]
  })
  return fixed
}

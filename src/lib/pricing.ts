import type { Sailing, OutTheDoorPrice } from '@/types/database'

/**
 * Port fee estimates by region (per person)
 */
const PORT_FEES_BY_REGION: Record<string, number> = {
  caribbean: 125,
  bahamas: 125,
  alaska: 175,
  pacific: 140,
  europe: 150,
  other: 130,
}

/**
 * Gratuity rates (per person per night) — Disney Cruise Line current rates
 */
export const GRATUITY_RATES = {
  standard: 16.00,
  concierge: 18.50,
}

/**
 * Get port fees for a sailing
 */
function getPortFees(region: string | undefined, nights: number, guests: number): number {
  const feePerPerson = PORT_FEES_BY_REGION[region || 'other']
  return feePerPerson * guests
}

/**
 * Get gratuity rate for a cabin category
 */
function getGratuityRate(category: string): number {
  return category === 'concierge' ? GRATUITY_RATES.concierge : GRATUITY_RATES.standard
}

/**
 * Calculate out-the-door price for a specific stateroom category
 */
export function calculateOutTheDoorPrice(
  sailing: Sailing,
  category: 'inside' | 'oceanview' | 'verandah' | 'concierge',
  guests: number
): OutTheDoorPrice {
  // Get base fare based on category
  let baseFare = 0
  switch (category) {
    case 'inside':
      baseFare = sailing.current_inside_price || sailing.current_lowest_price
      break
    case 'oceanview':
      baseFare = sailing.current_oceanview_price || sailing.current_lowest_price
      break
    case 'verandah':
      baseFare = sailing.current_verandah_price || sailing.current_lowest_price
      break
    case 'concierge':
      baseFare = sailing.current_concierge_price || sailing.current_lowest_price
      break
  }

  const nights = sailing.length_nights
  const region = sailing.region || 'other'

  // Calculate fees
  const portFees = getPortFees(region, nights, guests)
  const gratuityRate = getGratuityRate(category)
  const gratuities = gratuityRate * guests * nights

  // Calculate totals
  const total = baseFare + portFees + gratuities
  const perNight = total / nights
  const perPerson = total / guests

  return {
    baseFare,
    portFees,
    gratuities,
    total,
    perNight: Math.round(perNight),
    perPerson: Math.round(perPerson),
    guests,
  }
}

/**
 * Quick calculation for displaying out-the-door total on cards
 * Uses lowest price and estimates for 2 guests
 */
export function getOutTheDoorTotal(
  price: number,
  nights: number,
  guests: number = 2,
  region: string = 'other'
): { total: number; perPerson: number } {
  const portFees = getPortFees(region, nights, guests)
  const gratuities = GRATUITY_RATES.standard * guests * nights

  const total = price + portFees + gratuities
  const perPerson = Math.round(total / guests)

  return { total, perPerson }
}

/**
 * Format out-the-door price breakdown for display
 */
export function formatOutTheDoorBreakdown(
  pricing: OutTheDoorPrice,
  priceFormatter: (n: number) => string
): string[] {
  return [
    `Base Fare: ${priceFormatter(pricing.baseFare)}`,
    `Port Fees & Taxes: ${priceFormatter(pricing.portFees)}`,
    `Gratuities: ${priceFormatter(pricing.gratuities)}`,
    `Total: ${priceFormatter(pricing.total)}`,
  ]
}

/**
 * Calculate price per night for a sailing
 */
export function getPricePerNight(price: number, nights: number): number {
  return Math.round(price / nights)
}

/**
 * Get port fees estimate for display
 */
export function getPortFeesEstimate(region: string | undefined): string {
  const fees = PORT_FEES_BY_REGION[region || 'other']
  return `~$${fees} per person`
}

/**
 * Adjust a 2-guest base price for a different guest count.
 * DCL pricing: first 2 guests pay the base fare, 3rd/4th pay ~60% of the per-person rate.
 * Single supplement: 1 guest pays ~1.75× per-person rate.
 * Children under 3 are free for cruise fare but still count for stateroom occupancy.
 */
export function getPriceForGuests(
  basePrice: number,
  guestCount: number,
  infantsUnder3: number = 0
): number {
  const payingGuests = Math.max(0, guestCount - infantsUnder3)
  const perPersonRate = basePrice / 2
  switch (payingGuests) {
    case 0:
      return 0
    case 1:
      return Math.round(perPersonRate * 1.75)
    case 2:
      return basePrice
    case 3:
      return Math.round(basePrice + perPersonRate * 0.6)
    default: // 4+
      return Math.round(basePrice + perPersonRate * 0.6 * 2)
  }
}

/**
 * Calculate out-the-door total adjusted for guest count.
 * Infants under 3 are free for fare; per DCL policy gratuities and port fees still apply.
 */
export function getOutTheDoorTotalForGuests(
  basePrice: number,
  nights: number,
  guestCount: number,
  region: string = 'other',
  infantsUnder3: number = 0
): {
  total: number
  perPerson: number
  perPersonPerNight: number
  adjustedBase: number
  portFees: number
  gratuities: number
  guests: number
  payingGuests: number
} {
  const guests = Math.min(guestCount, 4)
  const adjustedBase = getPriceForGuests(basePrice, guests, infantsUnder3)
  const payingGuests = Math.max(0, guests - infantsUnder3)
  const portFees = getPortFees(region, nights, guests)
  const gratuities = GRATUITY_RATES.standard * guests * nights

  const total = adjustedBase + portFees + gratuities
  const divisor = guests > 0 ? guests : 1
  const perPerson = Math.round(total / divisor)
  const perPersonPerNight = Math.round(perPerson / nights)

  return { total, perPerson, perPersonPerNight, adjustedBase, portFees, gratuities, guests, payingGuests }
}

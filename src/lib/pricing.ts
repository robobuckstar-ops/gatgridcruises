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
 * Gratuity rates (per person per night)
 */
const GRATUITY_RATES = {
  standard: 14.50,
  concierge: 16.50,
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
 * Single supplement rule: 1 guest pays ~1.75× per-person rate.
 * 3rd/4th guest: each additional guest adds ~60% of per-person rate.
 */
export function getPriceForGuests(basePrice: number, guestCount: number): number {
  const perPersonRate = basePrice / 2
  switch (guestCount) {
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
 * Calculate out-the-door total adjusted for guest count
 */
export function getOutTheDoorTotalForGuests(
  basePrice: number,
  nights: number,
  guestCount: number,
  region: string = 'other'
): { total: number; perPerson: number; perPersonPerNight: number; adjustedBase: number; portFees: number; gratuities: number; guests: number } {
  const adjustedBase = getPriceForGuests(basePrice, guestCount)
  const guests = Math.min(guestCount, 4)
  const portFees = getPortFees(region, nights, guests)
  const gratuities = GRATUITY_RATES.standard * guests * nights

  const total = adjustedBase + portFees + gratuities
  const perPerson = Math.round(total / guests)
  const perPersonPerNight = Math.round(perPerson / nights)

  return { total, perPerson, perPersonPerNight, adjustedBase, portFees, gratuities, guests }
}

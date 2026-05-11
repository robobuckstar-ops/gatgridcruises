import type { Sailing, PriceSnapshot, DealScoreBreakdown } from '@/types/database'
import { daysUntil } from './utils'

export interface DealScoreResult {
  score: number
  breakdown: DealScoreBreakdown
  recommendation: 'strong-buy' | 'buy' | 'fair' | 'wait' | 'overpriced'
  label: string
}

/**
 * Calculate historical average price from snapshots
 */
function getHistoricalAverage(snapshots: PriceSnapshot[] | undefined, priceField: keyof PriceSnapshot): number {
  if (!snapshots || snapshots.length === 0) return 0

  const validPrices = snapshots
    .map(s => s[priceField] as number)
    .filter(p => p && p > 0)

  if (validPrices.length === 0) return 0
  return validPrices.reduce((a, b) => a + b, 0) / validPrices.length
}

/**
 * Calculate price score (40% weight)
 * Compares current price to historical average
 * 100 = 40%+ below average, 50 = at average, 0 = 40%+ above
 */
function calculatePriceScore(
  currentPrice: number,
  snapshots: PriceSnapshot[] | undefined
): number {
  if (!currentPrice) return 50

  const avgPrice = getHistoricalAverage(snapshots, 'lowest_price')
  if (avgPrice === 0) return 60 // neutral if no history

  const percentDiff = (currentPrice - avgPrice) / avgPrice

  // -40% below → 100, 0% → 50, +40% above → 0
  const score = 50 - (percentDiff * 125)
  return Math.max(0, Math.min(100, Math.round(score)))
}

/**
 * Calculate urgency score (20% weight)
 * Last-minute deals get higher scores
 */
function calculateUrgencyScore(sailDate: string): number {
  const days = daysUntil(sailDate)

  if (days < 7) return 100      // Last-minute: excellent
  if (days < 14) return 95
  if (days < 21) return 90
  if (days < 30) return 85
  if (days < 45) return 75
  if (days < 60) return 65
  if (days < 90) return 55
  if (days < 180) return 45
  return 35                      // Over 6 months: lowest
}

/**
 * Calculate ship score (15% weight)
 * Rates ships by newness and popularity
 */
function calculateShipScore(shipYearLaunched: number | undefined): number {
  if (!shipYearLaunched) return 70

  const currentYear = new Date().getFullYear()
  const age = currentYear - shipYearLaunched

  // Newer ships score higher (bonus), older still decent
  if (age <= 2) return 95
  if (age <= 5) return 90
  if (age <= 8) return 85
  if (age <= 12) return 75
  if (age <= 15) return 65
  return 55
}

/**
 * Calculate itinerary score (10% weight)
 * Caribbean in winter = best, Alaska/Europe seasonal bonuses
 */
function calculateItineraryScore(
  sailDate: string,
  region: string | undefined,
  itineraryName: string
): number {
  const month = new Date(sailDate).getMonth() + 1

  let regionScore = 50

  // Region bonuses
  if (region === 'caribbean' && (month >= 11 || month <= 4)) {
    // Caribbean in winter = peak season but desirable
    regionScore = 85
  } else if (region === 'caribbean') {
    regionScore = 75 // Caribbean off-season
  } else if (region === 'bahamas') {
    regionScore = 80 // Bahamas consistently desirable
  } else if (region === 'alaska' && (month >= 5 && month <= 9)) {
    regionScore = 90 // Alaska peak season
  } else if (region === 'alaska') {
    regionScore = 40 // Alaska off-season
  } else if (region === 'europe' && (month >= 5 && month <= 9)) {
    regionScore = 85 // Europe summer
  } else if (region === 'pacific') {
    regionScore = 75
  }

  // Boost for family-friendly itineraries
  const familyKeywords = ['family', 'kids', 'adventure', 'treasure']
  if (familyKeywords.some(k => itineraryName.toLowerCase().includes(k))) {
    regionScore = Math.min(100, regionScore + 5)
  }

  return regionScore
}

/**
 * Calculate availability score (10% weight)
 * Lower availability (expensive categories left) = lower score
 */
function calculateAvailabilityScore(sailing: Sailing): number {
  // Count how many cabin categories are still available
  const available = [
    sailing.current_inside_price,
    sailing.current_oceanview_price,
    sailing.current_verandah_price,
    sailing.current_concierge_price,
  ].filter(p => p && p > 0).length

  // If all categories available, full score
  if (available === 4) return 100
  if (available === 3) return 85
  if (available === 2) return 70
  if (available === 1) return 50
  return 20 // No categories available = poor availability
}

/**
 * Calculate seasonal score (5% weight)
 * Off-peak sailing = better value
 */
function calculateSeasonalScore(sailDate: string, region: string | undefined): number {
  const month = new Date(sailDate).getMonth() + 1

  // Off-peak months (worse weather, lower demand)
  const offPeakScore = 85
  const peakScore = 50
  const shoulderScore = 70

  if (region === 'caribbean') {
    // Peak: Dec-Apr. Off-peak: May-Nov (hurricane season concerns)
    if (month >= 12 || month <= 4) return peakScore
    if (month >= 5 && month <= 8) return offPeakScore // True off-peak
    return shoulderScore
  }

  if (region === 'alaska') {
    // Peak: Jun-Aug. Off-peak: Sep-May
    if (month >= 6 && month <= 8) return peakScore
    return offPeakScore
  }

  if (region === 'bahamas') {
    // Peak: Dec-Apr. Off-peak: Aug-Oct
    if (month >= 12 || month <= 4) return peakScore
    if (month >= 8 && month <= 10) return offPeakScore
    return shoulderScore
  }

  // Default: shoulder season for unknown regions
  return shoulderScore
}

/**
 * Main function to calculate deal score
 */
export function calculateDealScore(
  sailing: Sailing,
  snapshots?: PriceSnapshot[]
): DealScoreResult {
  const priceScore = calculatePriceScore(sailing.current_lowest_price, snapshots)
  const urgencyScore = calculateUrgencyScore(sailing.sail_date)
  const shipScore = calculateShipScore(sailing.ship?.year_launched)
  const itineraryScore = calculateItineraryScore(
    sailing.sail_date,
    sailing.region,
    sailing.itinerary_name
  )
  const availabilityScore = calculateAvailabilityScore(sailing)
  const seasonalScore = calculateSeasonalScore(sailing.sail_date, sailing.region)

  // Weighted final score
  const finalScore = Math.round(
    priceScore * 0.40 +
    urgencyScore * 0.20 +
    shipScore * 0.15 +
    itineraryScore * 0.10 +
    availabilityScore * 0.10 +
    seasonalScore * 0.05
  )

  // Determine recommendation and label
  let recommendation: DealScoreResult['recommendation']
  let label: string

  if (finalScore >= 85) {
    recommendation = 'strong-buy'
    label = 'Exceptional Deal'
  } else if (finalScore >= 70) {
    recommendation = 'buy'
    label = 'Great Value'
  } else if (finalScore >= 55) {
    recommendation = 'fair'
    label = 'Fair Price'
  } else if (finalScore >= 40) {
    recommendation = 'wait'
    label = 'Consider Waiting'
  } else {
    recommendation = 'overpriced'
    label = 'Overpriced'
  }

  const breakdown: DealScoreBreakdown = {
    price_score: priceScore,
    urgency_score: Math.round(urgencyScore),
    ship_score: shipScore,
    itinerary_score: itineraryScore,
    availability_score: availabilityScore,
    seasonal_score: seasonalScore,
    final_score: finalScore,
  }

  return {
    score: finalScore,
    breakdown,
    recommendation,
    label,
  }
}

/**
 * Get color for deal score (similar to gauge colors)
 */
export function getDealScoreColor(score: number): string {
  if (score >= 80) return 'text-emerald-600' // green
  if (score >= 60) return 'text-[#1E3A5F]'    // blue
  if (score >= 40) return 'text-amber-500'   // amber
  return 'text-red-600'                       // red
}

/**
 * Get background color for deal score badges
 */
export function getDealScoreBgColor(score: number): string {
  if (score >= 80) return 'bg-emerald-50 border-emerald-200'
  if (score >= 60) return 'bg-blue-50 border-blue-200'
  if (score >= 40) return 'bg-amber-50 border-amber-200'
  return 'bg-red-50 border-red-200'
}

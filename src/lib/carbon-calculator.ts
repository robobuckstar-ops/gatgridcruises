/**
 * Carbon Footprint Calculator for Cruise Ships
 * Estimates CO2 emissions per passenger based on ship characteristics and cruise details
 */

export interface CarbonEstimate {
  totalKgCO2: number
  perDayKgCO2: number
  equivalentFlightMiles: number // how many miles of flying this equals
  equivalentDrivingMiles: number
  treesNeededToOffset: number
  offsetCostUSD: number // at ~$15/ton
  rating: 'low' | 'moderate' | 'high' // relative to other cruise options
  tips: string[]
}

/**
 * Calculate carbon footprint for a cruise
 * @param shipTonnage - Ship displacement in tons
 * @param shipCapacity - Total passenger capacity
 * @param shipYearLaunched - Year the ship was launched
 * @param nightsAtSea - Number of nights sailing (higher emissions)
 * @param nightsInPort - Number of nights in port (lower emissions)
 * @returns CarbonEstimate with detailed breakdown
 */
export function calculateCarbonFootprint(
  shipTonnage: number,
  shipCapacity: number,
  shipYearLaunched: number,
  nightsAtSea: number,
  nightsInPort: number
): CarbonEstimate {
  // Base emissions: Average cruise ship emits ~250kg CO2 per passenger per day
  const baseEmissionsPerPassengerPerDay = 250

  // Efficiency factor based on ship age and technology
  // Newer ships (2020+) are ~15-20% more efficient (LNG propulsion, etc)
  // Older ships (pre-2010) are ~10-15% less efficient
  let efficiencyFactor = 1
  if (shipYearLaunched >= 2022) {
    efficiencyFactor = 0.82 // Modern LNG ships like Wish/Treasure/Destiny
  } else if (shipYearLaunched >= 2020) {
    efficiencyFactor = 0.85
  } else if (shipYearLaunched >= 2015) {
    efficiencyFactor = 0.92
  } else if (shipYearLaunched >= 2010) {
    efficiencyFactor = 0.98
  } else if (shipYearLaunched < 2000) {
    efficiencyFactor = 1.12 // Older ships less efficient
  }

  // Tonnage-to-capacity efficiency ratio
  // Higher tonnage per passenger = more efficient (more amenities per pax)
  // Lower tonnage per capacity = less efficient
  const tonnesPerPassenger = shipTonnage / shipCapacity
  // Average modern ship is ~32-36 tonnes per passenger
  const capacityEfficiencyFactor = Math.min(1.15, Math.max(0.85, 36 / tonnesPerPassenger))

  // Base daily emission with efficiency adjustments
  let dailyEmissionPerPassenger = baseEmissionsPerPassengerPerDay * efficiencyFactor * capacityEfficiencyFactor

  // At-sea days have full emissions, port days are ~60% of at-sea emissions
  const atSeaEmissions = nightsAtSea * dailyEmissionPerPassenger
  const inPortEmissions = nightsInPort * dailyEmissionPerPassenger * 0.6

  // Shore excursions add ~15-20% to the footprint (estimated averages)
  const shoreExcursionEmissions = (atSeaEmissions + inPortEmissions) * 0.15

  // Total CO2 per passenger
  const totalKgCO2 = atSeaEmissions + inPortEmissions + shoreExcursionEmissions
  const totalDays = nightsAtSea + nightsInPort
  const perDayKgCO2 = totalKgCO2 / totalDays

  // Equivalencies
  // Flight: ~0.11 kg CO2 per mile per passenger (economy)
  const equivalentFlightMiles = Math.round(totalKgCO2 / 0.11)

  // Driving: ~0.41 kg CO2 per mile per passenger (average car, 1 passenger)
  const equivalentDrivingMiles = Math.round(totalKgCO2 / 0.41)

  // Trees needed to offset: 1 tree absorbs ~21 kg CO2/year
  const treesNeededToOffset = Math.ceil(totalKgCO2 / 21)

  // Offset cost: ~$15 per metric ton (~$0.015 per kg)
  const offsetCostUSD = Math.round((totalKgCO2 / 1000) * 15)

  // Rating determination
  // Low: < 2000 kg per passenger (very efficient small ships, short cruises)
  // Moderate: 2000-4500 kg per passenger
  // High: > 4500 kg per passenger
  let rating: 'low' | 'moderate' | 'high' = 'moderate'
  if (totalKgCO2 < 2000) {
    rating = 'low'
  } else if (totalKgCO2 > 4500) {
    rating = 'high'
  }

  // Generate actionable tips
  const tips = generateTips(shipYearLaunched, nightsAtSea, nightsInPort, rating)

  return {
    totalKgCO2: Math.round(totalKgCO2),
    perDayKgCO2: Math.round(perDayKgCO2),
    equivalentFlightMiles,
    equivalentDrivingMiles,
    treesNeededToOffset,
    offsetCostUSD,
    rating,
    tips,
  }
}

/**
 * Generate actionable tips to reduce cruise carbon footprint
 */
function generateTips(shipYear: number, seaDays: number, portDays: number, rating: 'low' | 'moderate' | 'high'): string[] {
  const tips: string[] = []

  // Tip 1: Choose newer ships
  if (shipYear < 2015) {
    tips.push(
      'Consider sailing on newer Disney ships (Wish, Treasure, Destiny). Modern LNG propulsion can reduce emissions by 15-20%.',
    )
  } else {
    tips.push('Great choice! Modern Disney ships use cutting-edge efficiency technology to minimize environmental impact.')
  }

  // Tip 2: Longer cruises have better per-day emissions
  if (seaDays <= 2) {
    tips.push(
      'Longer cruises distribute emissions across more days. Consider a 7+ night cruise for better per-night impact.',
    )
  } else {
    tips.push(
      'Multi-day voyages spread your emissions across more days, making longer cruises more efficient per night.',
    )
  }

  // Tip 3: Port time
  if (portDays > seaDays) {
    tips.push('Excellent! Your itinerary has more port time. These lower-emission days help reduce your overall footprint.')
  } else if (portDays < seaDays / 2) {
    tips.push('Cruises with more port days and less open ocean time produce lower total emissions.')
  }

  // Tip 4: Offset options
  tips.push('Offset your emissions affordably through verified carbon programs like Carbonfund.org or Gold Standard projects.')

  // Tip 5: Travel to embarkation
  tips.push('Drive to your home port instead of flying if possible. Driving emits 4x less CO2 per mile than flying.')

  // Tip 6: Shore excursions
  tips.push(
    'Choose low-impact shore excursions like walking tours or kayaking over motorized options like jet skis or ATV tours.',
  )

  return tips
}

/**
 * Format large numbers with commas for display
 */
export function formatNumber(num: number): string {
  return num.toLocaleString()
}

/**
 * Get color classification for a carbon rating
 */
export function getRatingColor(rating: 'low' | 'moderate' | 'high'): {
  bgColor: string
  textColor: string
  borderColor: string
} {
  switch (rating) {
    case 'low':
      return {
        bgColor: 'bg-green-50',
        textColor: 'text-green-700',
        borderColor: 'border-green-200',
      }
    case 'moderate':
      return {
        bgColor: 'bg-yellow-50',
        textColor: 'text-yellow-700',
        borderColor: 'border-yellow-200',
      }
    case 'high':
      return {
        bgColor: 'bg-red-50',
        textColor: 'text-red-700',
        borderColor: 'border-red-200',
      }
  }
}

/**
 * Get icon emoji for a carbon rating
 */
export function getRatingIcon(rating: 'low' | 'moderate' | 'high'): string {
  switch (rating) {
    case 'low':
      return '🌱'
    case 'moderate':
      return '⚠️'
    case 'high':
      return '⚠️'
  }
}

import type { Sailing } from '@/types/database'

export interface SearchIntent {
  region?: string[]
  maxBudget?: number
  minBudget?: number
  nights?: { min: number; max: number }
  month?: number[]
  ship?: string[]
  port?: string[]
  travelers?: 'family' | 'couple' | 'solo' | 'group'
  keywords: string[]
}

const MONTH_MAP: Record<string, number> = {
  january: 1,
  february: 2,
  march: 3,
  april: 4,
  may: 5,
  june: 6,
  july: 7,
  august: 8,
  september: 9,
  october: 10,
  november: 11,
  december: 12,
  jan: 1,
  feb: 2,
  mar: 3,
  apr: 4,
  may: 5,
  jun: 6,
  jul: 7,
  aug: 8,
  sep: 9,
  sept: 9,
  oct: 10,
  nov: 11,
  dec: 12,
}

const SEASON_MAP: Record<string, number[]> = {
  winter: [12, 1, 2],
  spring: [3, 4, 5],
  summer: [6, 7, 8],
  fall: [9, 10, 11],
  autumn: [9, 10, 11],
}

const REGION_MAP: Record<string, string> = {
  caribbean: 'caribbean',
  bahamas: 'caribbean',
  bahamas: 'caribbean',
  western: 'caribbean',
  eastern: 'caribbean',
  alaska: 'alaska',
  baja: 'mexico',
  mexico: 'mexico',
  pacific: 'pacific',
  hawaii: 'hawaii',
}

const SHIP_MAP: Record<string, string> = {
  magic: 'ship-0001',
  wonder: 'ship-0002',
  dream: 'ship-0003',
  fantasy: 'ship-0004',
  wish: 'ship-0005',
  treasure: 'ship-0006',
  destiny: 'ship-0007',
}

const PORT_MAP: Record<string, string> = {
  canaveral: 'port-0001',
  'port canaveral': 'port-0001',
  miami: 'port-0002',
  galveston: 'port-0003',
}

export function parseSearchQuery(query: string): SearchIntent {
  const lowercaseQuery = query.toLowerCase()
  const intent: SearchIntent = {
    keywords: [],
  }

  // Budget parsing
  const budgetMatch = lowercaseQuery.match(/under\s+\$?([\d,]+)|up\s+to\s+\$?([\d,]+)/)
  if (budgetMatch) {
    const amount = parseInt((budgetMatch[1] || budgetMatch[2]).replace(/,/g, ''))
    intent.maxBudget = amount
  }

  const budgetFromMatch = lowercaseQuery.match(/from\s+\$?([\d,]+)/)
  if (budgetFromMatch) {
    intent.minBudget = parseInt(budgetFromMatch[1].replace(/,/g, ''))
  }

  // Nights parsing
  const nightsMatch = lowercaseQuery.match(/(\d+)[\s-]?(?:night|nite)s?/)
  if (nightsMatch) {
    const nights = parseInt(nightsMatch[1])
    intent.nights = { min: nights, max: nights }
  }

  // Range parsing (e.g., "3-4 nights", "3 to 4 nights")
  const rangeMatch = lowercaseQuery.match(/(\d+)[\s-]?(?:to|-)[\s-]?(\d+)\s+(?:night|nite)s?/)
  if (rangeMatch) {
    intent.nights = { min: parseInt(rangeMatch[1]), max: parseInt(rangeMatch[2]) }
  }

  // Short cruise keywords
  if (
    lowercaseQuery.includes('weekend') ||
    lowercaseQuery.includes('short') ||
    lowercaseQuery.includes('quick')
  ) {
    if (!intent.nights) {
      intent.nights = { min: 3, max: 4 }
    }
  }

  // Month parsing
  const months: number[] = []
  for (const [monthName, monthNum] of Object.entries(MONTH_MAP)) {
    if (lowercaseQuery.includes(monthName)) {
      months.push(monthNum)
    }
  }

  // Season parsing
  for (const [seasonName, seasonMonths] of Object.entries(SEASON_MAP)) {
    if (lowercaseQuery.includes(seasonName)) {
      months.push(...seasonMonths)
    }
  }

  if (months.length > 0) {
    intent.month = Array.from(new Set(months))
  }

  // Region parsing
  const regions: string[] = []
  for (const [regionKeyword, regionValue] of Object.entries(REGION_MAP)) {
    if (lowercaseQuery.includes(regionKeyword)) {
      if (!regions.includes(regionValue)) {
        regions.push(regionValue)
      }
    }
  }
  if (regions.length > 0) {
    intent.region = regions
  }

  // Ship parsing
  const ships: string[] = []
  for (const [shipName, shipId] of Object.entries(SHIP_MAP)) {
    if (lowercaseQuery.includes(shipName)) {
      ships.push(shipId)
    }
  }
  if (ships.length > 0) {
    intent.ship = ships
  }

  // Port parsing
  const ports: string[] = []
  for (const [portName, portId] of Object.entries(PORT_MAP)) {
    if (lowercaseQuery.includes(portName)) {
      ports.push(portId)
    }
  }
  if (ports.length > 0) {
    intent.port = ports
  }

  // Traveler type parsing
  if (lowercaseQuery.includes('family') || lowercaseQuery.includes('kids') || lowercaseQuery.includes('children')) {
    intent.travelers = 'family'
  } else if (lowercaseQuery.includes('couple') || lowercaseQuery.includes('honeymoon') || lowercaseQuery.includes('romantic')) {
    intent.travelers = 'couple'
  } else if (lowercaseQuery.includes('solo') || lowercaseQuery.includes('single')) {
    intent.travelers = 'solo'
  } else if (lowercaseQuery.includes('group') || lowercaseQuery.includes('friends')) {
    intent.travelers = 'group'
  }

  // Extract keywords (words that aren't part of parsed intent)
  const words = lowercaseQuery.split(/\s+/)
  const stopWords = new Set([
    'the',
    'a',
    'an',
    'and',
    'or',
    'in',
    'on',
    'at',
    'to',
    'for',
    'of',
    'with',
    'by',
    'from',
    'up',
    'under',
    'night',
    'nite',
    'nights',
    'nites',
  ])

  for (const word of words) {
    if (word.length > 2 && !stopWords.has(word) && !word.match(/\$/)) {
      intent.keywords.push(word)
    }
  }

  return intent
}

export function searchSailings(query: string, sailings: Sailing[]): Sailing[] {
  if (!query.trim()) {
    return sailings
  }

  const intent = parseSearchQuery(query)
  let results = sailings

  // Filter by budget
  if (intent.maxBudget !== undefined) {
    results = results.filter(s => s.current_lowest_price <= intent.maxBudget!)
  }
  if (intent.minBudget !== undefined) {
    results = results.filter(s => s.current_lowest_price >= intent.minBudget!)
  }

  // Filter by nights
  if (intent.nights) {
    results = results.filter(
      s => s.length_nights >= intent.nights!.min && s.length_nights <= intent.nights!.max
    )
  }

  // Filter by month
  if (intent.month && intent.month.length > 0) {
    results = results.filter(s => {
      const sailMonth = new Date(s.sail_date).getMonth() + 1
      return intent.month!.includes(sailMonth)
    })
  }

  // Filter by ship
  if (intent.ship && intent.ship.length > 0) {
    results = results.filter(s => intent.ship!.includes(s.ship_id))
  }

  // Filter by port
  if (intent.port && intent.port.length > 0) {
    results = results.filter(s => intent.port!.includes(s.departure_port_id))
  }

  // Filter by region (based on itinerary name)
  if (intent.region && intent.region.length > 0) {
    results = results.filter(s => {
      const itineraryLower = (s.itinerary_name || '').toLowerCase()
      return intent.region!.some(region => {
        switch (region) {
          case 'caribbean':
            return itineraryLower.includes('caribbean') || itineraryLower.includes('bahamian')
          case 'alaska':
            return itineraryLower.includes('alaska')
          case 'mexico':
            return itineraryLower.includes('baja') || itineraryLower.includes('mexico')
          case 'pacific':
            return itineraryLower.includes('pacific')
          case 'hawaii':
            return itineraryLower.includes('hawaii')
          default:
            return false
        }
      })
    })
  }

  // Filter by keywords (match against itinerary name, ship name, port name)
  if (intent.keywords.length > 0) {
    const keywordPatterns = intent.keywords.join('|')
    results = results.filter(s => {
      const searchText = [
        s.itinerary_name || '',
        s.ship?.name || '',
        s.departure_port?.name || '',
      ]
        .join(' ')
        .toLowerCase()

      return intent.keywords!.some(keyword => searchText.includes(keyword))
    })
  }

  // Sorting logic
  const hasBudgetQuery = intent.maxBudget !== undefined || intent.minBudget !== undefined
  const hasValue = query.toLowerCase().includes('cheap') || query.toLowerCase().includes('budget')
  const hasBestDeal = query.toLowerCase().includes('best deal')

  if (hasBestDeal) {
    // Sort by sailing score (deal score)
    results.sort((a, b) => (b.sailing_score || 0) - (a.sailing_score || 0))
  } else if (hasValue || hasBudgetQuery) {
    // Sort by price
    results.sort((a, b) => a.current_lowest_price - b.current_lowest_price)
  } else {
    // Default: sort by sail date (nearest first)
    results.sort((a, b) => new Date(a.sail_date).getTime() - new Date(b.sail_date).getTime())
  }

  return results
}

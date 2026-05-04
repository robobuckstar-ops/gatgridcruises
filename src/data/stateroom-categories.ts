/**
 * Stateroom category profiles for Disney Cruise Line.
 *
 * Category-level data (Inside / Oceanview / Verandah / Concierge) — describes
 * what each *type* of stateroom is, what's included, who it suits, and rough
 * price bands. Distinct from src/data/staterooms.ts, which holds individual
 * cabin records (room numbers, decks, noise ratings) that are per-ship.
 *
 * GatGrid is info/discovery — these descriptions are editorial, not pricing
 * we sell. Price ranges are estimates, not quotes.
 */

export type StateroomCategoryId = 'inside' | 'oceanview' | 'verandah' | 'concierge'

export interface StateroomCategoryRating {
  value: number
  luxury: number
  family: number
  couple: number
}

export interface StateroomCategory {
  id: StateroomCategoryId
  name: string
  emoji: string
  tagline: string
  priceRange: string
  typicalTotal: string
  perPersonNightEstimate: string
  sqft: string
  sleeps: string
  window: string
  features: string[]
  pros: string[]
  cons: string[]
  bestFor: string[]
  worstFor: string[]
  rating: StateroomCategoryRating
  /** UI accent color for cards/pills */
  color: 'slate' | 'blue' | 'emerald' | 'purple'
}

export interface StateroomComparisonFeature {
  feature: string
  inside: boolean
  oceanview: boolean
  verandah: boolean
  concierge: boolean
}

export const stateroomCategories: StateroomCategory[] = [
  {
    id: 'inside',
    name: 'Inside Stateroom',
    emoji: '🚢',
    tagline: 'Maximum value, minimal space',
    priceRange: '$150–$350/person/night',
    typicalTotal: '$900–$4,900 (7-night, 2 guests)',
    perPersonNightEstimate: '$165–240',
    sqft: '169–214 sq ft',
    sleeps: 'Up to 4 guests',
    window: 'None',
    features: [
      'Two twin beds (convert to queen)',
      'Sofa or pullman bunk for additional guests',
      'Full bathroom with split bath design',
      'Flat-screen TV',
      'Mini-fridge',
      'In-room safe',
      'Stateroom host service (twice daily)',
    ],
    pros: [
      'Cheapest stateroom available — save thousands',
      'Same ship access — pools, shows, dining, kids clubs',
      'Blackout-dark — best sleep on the ship',
      "You won't miss the balcony if you're rarely in the room",
      'Savings can fund excursions, specialty dining, or a future cruise',
    ],
    cons: [
      'No window — zero natural light',
      'Can feel claustrophobic, especially for longer sailings',
      'No outdoor private space',
      "Hard to tell if it's day or night without checking your phone",
    ],
    bestFor: [
      'Budget-focused families',
      'Guests who spend most time at the pool or on port days',
      'Short sailings (3–4 nights)',
      'Experienced cruisers who know they sleep through port mornings',
    ],
    worstFor: [
      'Anyone prone to seasickness (no horizon reference)',
      'Families with young kids needing nap time in natural light',
      'Longer sailings (7+ nights) where at-sea days mean more room time',
    ],
    rating: { value: 4, luxury: 2, family: 3, couple: 3 },
    color: 'slate',
  },
  {
    id: 'oceanview',
    name: 'Oceanview Stateroom',
    emoji: '🌊',
    tagline: 'Natural light without the balcony price',
    priceRange: '$220–$450/person/night',
    typicalTotal: '$1,500–$7,000 (7-night, 2 guests)',
    perPersonNightEstimate: '$210–300',
    sqft: '214–268 sq ft',
    sleeps: 'Up to 4 guests',
    window: 'Porthole or picture window (does not open)',
    features: [
      'Porthole or larger picture window',
      'Two twin beds (convert to queen)',
      'Sofa or pullman bunk for additional guests',
      'Full bathroom with split bath design',
      'Flat-screen TV',
      'Mini-fridge',
      'In-room safe',
    ],
    pros: [
      'Natural light — can tell time by the sun',
      'More spacious than inside cabins',
      'Wake up to ocean views',
      'Comfortable middle-ground price',
      'Great on sea days for watching waves',
    ],
    cons: [
      'Window does not open — no fresh air',
      'No private outdoor space',
      'Significantly more expensive than inside',
      'Portholes are quite small on some ships',
    ],
    bestFor: [
      'Couples who want a romantic view without splurging on a balcony',
      'Moderate budgets wanting natural light',
      'Night-owl travelers who want to see the ocean in the morning',
    ],
    worstFor: [
      'Families who want outdoor private space',
      'Those expecting a "sea view balcony" experience',
    ],
    rating: { value: 3, luxury: 3, family: 3, couple: 4 },
    color: 'blue',
  },
  {
    id: 'verandah',
    name: 'Verandah Stateroom',
    emoji: '🏝️',
    tagline: 'The sweet spot — private balcony for everyone',
    priceRange: '$320–$650/person/night',
    typicalTotal: '$2,500–$11,000 (7-night, 2 guests)',
    perPersonNightEstimate: '$280–400',
    sqft: '268–304 sq ft',
    sleeps: 'Up to 5 guests',
    window: 'Private balcony with sliding glass door',
    features: [
      'Private balcony with chairs and table',
      'Sliding glass door to balcony',
      'Two twin beds (convert to queen)',
      'Sofa or pullman bunk for additional guests',
      'Full bathroom with split bath design (on most ships)',
      'Flat-screen TV',
      'Mini-fridge',
      'In-room safe',
    ],
    pros: [
      'Private outdoor space — have coffee while watching the ocean at sunrise',
      'Fresh air any time',
      'Natural light + panoramic views',
      'Most popular category for a reason',
      'At-sea days feel luxurious with a private balcony',
      'Wake up on a port day to your destination approaching',
    ],
    cons: [
      'Significantly more expensive than inside or oceanview',
      'Balcony size varies — some are quite small',
      'Aft-facing balconies get ship exhaust on some vessels',
      "Not worth it if you're only doing 3-night sailings",
    ],
    bestFor: [
      'Families on 5+ night sailings',
      'Couples celebrating anniversaries or honeymoons',
      'Guests who want to experience the ocean fully',
      'Anyone with sea days — verandah makes them magical',
    ],
    worstFor: [
      'Very budget-conscious travelers (inside saves thousands)',
      "Short 3-night sailings where you're rarely in the room",
    ],
    rating: { value: 3, luxury: 4, family: 5, couple: 5 },
    color: 'emerald',
  },
  {
    id: 'concierge',
    name: 'Concierge Stateroom',
    emoji: '👑',
    tagline: 'White-glove service and the largest rooms on the ship',
    priceRange: '$600–$1,500+/person/night',
    typicalTotal: '$8,000–$30,000+ (7-night, 2 guests)',
    perPersonNightEstimate: '$490–710',
    sqft: '304–1,781 sq ft (suites)',
    sleeps: 'Up to 7 guests (in suites)',
    window: 'Large verandah + some suites have wrap-around balconies',
    features: [
      'Dedicated Concierge host team',
      'Private concierge lounge with complimentary drinks & snacks',
      'Priority embarkation (board before anyone else)',
      'Priority reservations for Palo, spa, and excursions',
      'Welcome amenities (fruit basket, sparkling wine)',
      'Premium bedding and additional bathroom amenities',
      'Some suites have whirlpool tubs, dining areas, and multiple bedrooms',
      'Exclusive Concierge Sun Deck on some ships',
    ],
    pros: [
      'Best service on the ship — truly white-glove',
      'Priority access eliminates every frustration',
      'Concierge lounge is genuinely wonderful for relaxing',
      'Suites have room for large families with space to breathe',
      'Worth it as a once-in-a-lifetime splurge',
      "Concierge guests often say it's the only way they'll cruise now",
    ],
    cons: [
      'Extremely expensive — often 3–4x the cost of a verandah',
      'Most of the "benefits" are already included for everyone',
      'ROI is hard to justify vs. spending that money on a second cruise',
      "The Concierge lounge perk diminishes if you're off the ship all day",
    ],
    bestFor: [
      'Luxury travelers for whom price is not a concern',
      'Large families who need multiple bedrooms (suites)',
      'Anniversary trips or honeymoons wanting the best possible experience',
      'Guests who want zero friction on reservations and boarding',
    ],
    worstFor: [
      'Budget-conscious travelers (obvious)',
      'Families who spend all day at ports or the beach',
      "First-time Disney cruisers who don't know what they're comparing against",
    ],
    rating: { value: 2, luxury: 5, family: 4, couple: 5 },
    color: 'purple',
  },
]

/**
 * Quick comparison of features across all four categories. Used by the
 * comparison guide table; defined here so other pages can reuse it.
 */
export const stateroomComparisonFeatures: StateroomComparisonFeature[] = [
  { feature: 'Private outdoor space', inside: false, oceanview: false, verandah: true, concierge: true },
  { feature: 'Natural light / windows', inside: false, oceanview: true, verandah: true, concierge: true },
  { feature: 'Dedicated concierge', inside: false, oceanview: false, verandah: false, concierge: true },
  { feature: 'Private lounge access', inside: false, oceanview: false, verandah: false, concierge: true },
  { feature: 'Priority boarding', inside: false, oceanview: false, verandah: false, concierge: true },
  { feature: 'Room service available', inside: true, oceanview: true, verandah: true, concierge: true },
  { feature: 'Split bathroom (tub + shower)', inside: true, oceanview: true, verandah: true, concierge: true },
  { feature: 'Sofa converts to bed', inside: true, oceanview: true, verandah: true, concierge: true },
  { feature: 'In-cabin entertainment', inside: true, oceanview: true, verandah: true, concierge: true },
]

export interface StateroomDecisionRule {
  /** Trip-style condition that matches a guest's situation */
  cond: string
  /** Recommended category or pairing */
  rec: string
  /** Why this category fits the condition */
  why: string
}

export const stateroomDecisionGuide: StateroomDecisionRule[] = [
  {
    cond: 'Budget is your primary concern',
    rec: 'Inside Stateroom',
    why: 'Same ship experience at the lowest cost. All dining, entertainment, and pools are identical.',
  },
  {
    cond: 'First-time cruiser wanting a solid experience',
    rec: 'Oceanview or Verandah',
    why: "Natural light makes the cruise feel less hotel-like; verandah adds the private outdoor touch.",
  },
  {
    cond: 'Alaska, Norway, or scenic itinerary',
    rec: 'Verandah strongly recommended',
    why: "Wildlife, glaciers, and fjords are viewed best from your private balcony — you'd regret an inside cabin here.",
  },
  {
    cond: 'Celebrating a milestone (wedding, honeymoon, anniversary)',
    rec: 'Verandah or Concierge',
    why: 'Private space and priority service make special occasions feel extraordinary.',
  },
  {
    cond: 'You have 4+ people in one cabin',
    rec: 'Verandah or Concierge suite',
    why: 'More square footage prevents cabin fever; suites sleep 5–7 guests comfortably.',
  },
  {
    cond: 'Maximum luxury and hassle-free experience',
    rec: 'Concierge Class',
    why: 'Concierge team handles everything; private lounge is a genuine retreat on sea days.',
  },
]

/**
 * Credit card configuration database
 *
 * NOTE: Referral URLs are now centralized in affiliate-config.ts
 * Update your links there — they flow here automatically.
 */

import { getCardReferralLink } from './affiliate-config'

export interface CreditCard {
  id: string
  name: string
  issuer: 'chase' | 'amex' | 'capital-one' | 'citi' | 'bank-of-america' | 'other'
  slug: string
  annualFee: number
  signupBonus: string // e.g., "60,000 points"
  signupBonusValue: number // estimated dollar value
  signupBonusRequirement: string // e.g., "Spend $4,000 in first 3 months"
  pointsPerDollarTravel: number // earning rate on travel
  pointsPerDollarDining: number
  pointsPerDollarOther: number
  tripCancellation: boolean
  tripDelay: boolean
  baggageDelay: boolean
  travelAccident: boolean
  loungeAccess: string | null // e.g., "Priority Pass", "Centurion Lounges", null
  bestFor: string // e.g., "All-around travel rewards"
  highlights: string[] // 3-5 key benefits
  referralUrl: string // Grayson's referral link — easy to update
  imageColor: string // CSS color for card visual (e.g., "#1a1f71" for Chase Sapphire)
  editorial_take: string // 2-3 sentence honest review
}

export const creditCards: CreditCard[] = [
  {
    id: 'chase-sapphire-preferred',
    name: 'Chase Sapphire Preferred',
    issuer: 'chase',
    slug: 'chase-sapphire-preferred',
    annualFee: 95,
    signupBonus: '60,000 points',
    signupBonusValue: 750,
    signupBonusRequirement: 'Spend $4,000 in first 3 months',
    pointsPerDollarTravel: 2,
    pointsPerDollarDining: 3,
    pointsPerDollarOther: 1,
    tripCancellation: true,
    tripDelay: true,
    baggageDelay: true,
    travelAccident: true,
    loungeAccess: 'Priority Pass (1 pass included)',
    bestFor: 'Best overall travel rewards starter card',
    highlights: [
      '2x points on flights, hotels, car rentals, and cruises',
      '3x points on dining and food delivery',
      'Trip cancellation and delay protection',
      'Priority Pass lounge access',
    ],
    referralUrl: getCardReferralLink('chase-sapphire-preferred') || '',
    imageColor: '#1a1f71',
    editorial_take:
      "The Sapphire Preferred is the gold standard for cruise-focused travelers. The 2x points on cruises alone make it valuable, and the $750 signup bonus pays for itself in the first year.",
  },
  {
    id: 'chase-sapphire-reserve',
    name: 'Chase Sapphire Reserve',
    issuer: 'chase',
    slug: 'chase-sapphire-reserve',
    annualFee: 550,
    signupBonus: '60,000 points',
    signupBonusValue: 900,
    signupBonusRequirement: 'Spend $4,000 in first 3 months',
    pointsPerDollarTravel: 3,
    pointsPerDollarDining: 3,
    pointsPerDollarOther: 1,
    tripCancellation: true,
    tripDelay: true,
    baggageDelay: true,
    travelAccident: true,
    loungeAccess: 'Priority Pass (10 visits/year) + Chase Sapphire Reserve Lounges',
    bestFor: 'Premium all-around travel rewards with top-tier benefits',
    highlights: [
      '3x points on all travel (flights, hotels, car rentals, cruises)',
      '3x points on dining and food delivery',
      '$300 annual travel credit (makes net fee only $250)',
      'Unlimited Priority Pass + exclusive lounge access',
    ],
    referralUrl: getCardReferralLink('chase-sapphire-reserve') || '',
    imageColor: '#1a1f71',
    editorial_take:
      "If you cruise annually or more, the Reserve pays for itself through lounge access and the travel credit alone. The 3x points on cruises is unmatched.",
  },
  {
    id: 'amex-business-platinum',
    name: 'American Express Business Platinum',
    issuer: 'amex',
    slug: 'amex-business-platinum',
    annualFee: 695,
    signupBonus: '150,000 points',
    signupBonusValue: 1500,
    signupBonusRequirement: 'Spend $15,000 in first 3 months',
    pointsPerDollarTravel: 5,
    pointsPerDollarDining: 1,
    pointsPerDollarOther: 1,
    tripCancellation: true,
    tripDelay: true,
    baggageDelay: true,
    travelAccident: true,
    loungeAccess: 'Centurion Lounges + Priority Pass',
    bestFor: 'Business owners and frequent luxury travelers',
    highlights: [
      '5x points on flights and hotels booked directly',
      '150,000 point welcome bonus ($1,500+ value)',
      'Centurion Lounge access (industry best)',
      'Up to $500 annual air credit',
    ],
    referralUrl: getCardReferralLink('amex-business-platinum') || '',
    imageColor: '#111111',
    editorial_take:
      "The industry's most luxurious business card with the best lounge access. Ideal if you cruise frequently and want premium perks, though the high annual fee requires substantial spend.",
  },
  {
    id: 'amex-gold',
    name: 'American Express Gold Card',
    issuer: 'amex',
    slug: 'amex-gold',
    annualFee: 250,
    signupBonus: '60,000 points',
    signupBonusValue: 720,
    signupBonusRequirement: 'Spend $6,000 in first 6 months',
    pointsPerDollarTravel: 3,
    pointsPerDollarDining: 4,
    pointsPerDollarOther: 1,
    tripCancellation: true,
    tripDelay: true,
    baggageDelay: true,
    travelAccident: true,
    loungeAccess: 'Complimentary Amex Lounge access',
    bestFor: 'Foodies and frequent travelers who love dining',
    highlights: [
      '4x points on dining (a chef\'s dream for cruise ports)',
      '3x points on flights and hotels',
      'American Express dining protections',
      'Amex Lounge access in select airports',
    ],
    referralUrl: getCardReferralLink('amex-gold') || '',
    imageColor: '#FFD700',
    editorial_take:
      "Perfect for cruisers who care about dining experiences. The 4x points on dining adds up fast across ports, and the travel protections are excellent.",
  },
  {
    id: 'capital-one-venture-x',
    name: 'Capital One Venture X',
    issuer: 'capital-one',
    slug: 'capital-one-venture-x',
    annualFee: 395,
    signupBonus: '75,000 miles',
    signupBonusValue: 750,
    signupBonusRequirement: 'Spend $5,000 in first 3 months',
    pointsPerDollarTravel: 2,
    pointsPerDollarDining: 2,
    pointsPerDollarOther: 1,
    tripCancellation: true,
    tripDelay: true,
    baggageDelay: true,
    travelAccident: true,
    loungeAccess: 'Priority Pass + Capital One Lounges',
    bestFor: 'Great all-around flexibility with no category restrictions',
    highlights: [
      '2 miles per $1 spent on all purchases (simplicity)',
      '75,000 mile welcome bonus',
      'Priority Pass lounge access included',
      'Trip insurance and purchase protections',
    ],
    referralUrl: getCardReferralLink('capital-one-venture-x') || '',
    imageColor: '#FF5000',
    editorial_take:
      "Capital One's premium offering has improved dramatically. The flat 2x miles on everything is easy to manage, and lounge access helps justify the fee.",
  },
  {
    id: 'citi-premier',
    name: 'Citi Premier Card',
    issuer: 'citi',
    slug: 'citi-premier',
    annualFee: 95,
    signupBonus: '60,000 points',
    signupBonusValue: 600,
    signupBonusRequirement: 'Spend $4,000 in first 3 months',
    pointsPerDollarTravel: 3,
    pointsPerDollarDining: 3,
    pointsPerDollarOther: 1,
    tripCancellation: true,
    tripDelay: true,
    baggageDelay: true,
    travelAccident: true,
    loungeAccess: null,
    bestFor: 'Budget-conscious cruisers who want premium benefits',
    highlights: [
      '3x points on flights, hotels, cruise tickets, and dining',
      '$95 annual fee with immediate travel credits',
      'Excellent travel insurance coverage',
      'No category complexity — simple earning',
    ],
    referralUrl: getCardReferralLink('citi-premier') || '',
    imageColor: '#0066B2',
    editorial_take:
      "The Citi Premier is underrated. At $95 with 3x on cruises, it's a fantastic value play if you don't need lounge access.",
  },
  {
    id: 'chase-ink-business-preferred',
    name: 'Chase Ink Business Preferred',
    issuer: 'chase',
    slug: 'chase-ink-business-preferred',
    annualFee: 95,
    signupBonus: '90,000 points',
    signupBonusValue: 1125,
    signupBonusRequirement: 'Spend $5,000 in first 3 months',
    pointsPerDollarTravel: 3,
    pointsPerDollarDining: 3,
    pointsPerDollarOther: 1,
    tripCancellation: true,
    tripDelay: true,
    baggageDelay: true,
    travelAccident: true,
    loungeAccess: null,
    bestFor: 'Business owners and sole proprietors who cruise',
    highlights: [
      '3x points on travel (including cruises), internet, and more',
      '90,000 point welcome bonus ($1,125+ value)',
      'Excellent for mixing business and leisure travel',
      'No employee cards — simpler than corporate cards',
    ],
    referralUrl: getCardReferralLink('chase-ink-business-preferred') || '',
    imageColor: '#0066B2',
    editorial_take:
      "The highest signup bonus at a reasonable fee. Great for solo entrepreneurs who cruise for work or pleasure.",
  },
  {
    id: 'capital-one-venture',
    name: 'Capital One Venture Card',
    issuer: 'capital-one',
    slug: 'capital-one-venture',
    annualFee: 95,
    signupBonus: '75,000 miles',
    signupBonusValue: 750,
    signupBonusRequirement: 'Spend $3,000 in first 3 months',
    pointsPerDollarTravel: 1.5,
    pointsPerDollarDining: 1.5,
    pointsPerDollarOther: 1.5,
    tripCancellation: true,
    tripDelay: true,
    baggageDelay: false,
    travelAccident: true,
    loungeAccess: null,
    bestFor: 'Simple flat-rate rewards without premium frills',
    highlights: [
      '1.5 miles per $1 on all purchases (flat rate)',
      '75,000 mile welcome bonus ($750 value)',
      'Low $95 annual fee with good earning',
      'Straightforward redemption for any travel',
    ],
    referralUrl: getCardReferralLink('capital-one-venture') || '',
    imageColor: '#FF5000',
    editorial_take:
      "If you want simplicity and strong rewards without overthinking categories, the standard Venture is hard to beat. Perfect entry-level for cruise rewards.",
  },
]

/**
 * Get a single credit card by slug
 */
export function getCardBySlug(slug: string): CreditCard | undefined {
  return creditCards.find((card) => card.slug === slug)
}

/**
 * Get all cards from a specific issuer
 */
export function getCardsByIssuer(issuer: string): CreditCard[] {
  return creditCards.filter((card) => card.issuer === issuer)
}

/**
 * Get best cards for a specific use case
 */
export function getBestCardsFor(
  category: 'signup-bonus' | 'travel-insurance' | 'lounge-access' | 'cruise-purchases' | 'flights'
): CreditCard[] {
  switch (category) {
    case 'signup-bonus':
      // Sort by signup bonus value, take top 3
      return [...creditCards].sort((a, b) => b.signupBonusValue - a.signupBonusValue).slice(0, 3)

    case 'travel-insurance':
      // All cards have comprehensive travel insurance
      return creditCards

    case 'lounge-access':
      // Filter to cards with lounge access
      return creditCards.filter((card) => card.loungeAccess !== null)

    case 'cruise-purchases':
      // Best earning on cruise purchases
      return [...creditCards]
        .sort(
          (a, b) =>
            (b.pointsPerDollarTravel * (1000 / b.annualFee)) -
            (a.pointsPerDollarTravel * (1000 / a.annualFee))
        )
        .slice(0, 3)

    case 'flights':
      // Best for flights (3x+ or with lounge)
      return creditCards
        .filter((card) => card.pointsPerDollarTravel >= 3 || card.loungeAccess !== null)
        .slice(0, 4)

    default:
      return []
  }
}

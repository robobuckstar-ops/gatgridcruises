/**
 * ============================================================
 * AFFILIATE & REFERRAL CONFIGURATION
 * ============================================================
 *
 * Hey Grayson! This is your ONE-STOP config for ALL affiliate
 * and referral links across GatGridCruises. When you get a new
 * referral link, just update it here and it'll flow everywhere.
 *
 * HOW TO UPDATE:
 * 1. Find the section below (Amazon, Credit Cards, Travel, etc.)
 * 2. Replace the URL string with your new link
 * 3. Push to GitHub — Vercel auto-deploys in ~60 seconds
 *
 * ============================================================
 */

// ─── AMAZON ASSOCIATES ───────────────────────────────────────
export const AMAZON_CONFIG = {
  tag: 'thm1230b0300-20',

  /** Base URL for Amazon product links (don't change this) */
  baseUrl: 'https://www.amazon.com',
}

/**
 * Append your Amazon Associates tag to any Amazon URL.
 * Usage: amazonLink('https://www.amazon.com/dp/B09V3KXJPB')
 *   → 'https://www.amazon.com/dp/B09V3KXJPB?tag=thm1230b0300-20'
 */
export function amazonLink(url: string): string {
  const separator = url.includes('?') ? '&' : '?'
  return `${url}${separator}tag=${AMAZON_CONFIG.tag}`
}

export function amazonProductLink(asin: string): string {
  return `${AMAZON_CONFIG.baseUrl}/dp/${asin}?tag=${AMAZON_CONFIG.tag}`
}

export function amazonSearchLink(query: string): string {
  return `${AMAZON_CONFIG.baseUrl}/s?k=${encodeURIComponent(query)}&tag=${AMAZON_CONFIG.tag}`
}


// ─── CREDIT CARD REFERRAL LINKS ──────────────────────────────
//
// Add your referral links as you get them. Set to null if you
// don't have one yet — the site will still show the card info
// but won't include a referral link (just editorial content).
//
// TIP: Most issuers let you generate referral links from your
// online account under "Refer a Friend" or similar.
//
export const CARD_REFERRAL_LINKS: Record<string, string | null> = {
  'chase-ink-business-preferred': 'https://www.referyourchasecard.com/226m/6ZT33F9TOQ',
  'chase-ink-business-unlimited': 'https://www.referyourchasecard.com/226m/6ZT33F9TOQ',
  'chase-sapphire-preferred':     '/concierge', // TODO: Add Chase Sapphire referral link
  'chase-sapphire-reserve':       '/concierge', // TODO: Add Chase Sapphire Reserve referral link
  'amex-business-platinum':       'https://americanexpress.com/en-us/referral/business-platinum-charge-card?ref=CRYSTSGCNM&XL=MIMNS',
  'amex-gold':                    '/concierge', // TODO: Add Amex Gold referral link
  'capital-one-spark-cash-plus':  'https://i.capitalone.com/JKlfRwN3f',
  'capital-one-spark-cash-select':'https://i.capitalone.com/JKlfRwN3f',
  'capital-one-venture-x':        '/concierge', // TODO: Add Capital One Venture X referral link
  'capital-one-venture':          '/concierge', // TODO: Add Capital One Venture referral link
  'citi-premier':                 '/concierge', // TODO: Add Citi Premier referral link
}

/**
 * Get the referral link for a card. Falls back to the Chase
 * general link for Chase cards if no specific link exists,
 * or returns null if no link is available.
 */
export function getCardReferralLink(cardSlug: string): string | null {
  // Check for exact match first
  if (CARD_REFERRAL_LINKS[cardSlug]) {
    return CARD_REFERRAL_LINKS[cardSlug]
  }

  // For Chase cards without a specific link, use the Ink Business Preferred referral
  if (cardSlug.startsWith('chase-') && CARD_REFERRAL_LINKS['chase-ink-business-preferred']) {
    return CARD_REFERRAL_LINKS['chase-ink-business-preferred']
  }

  // For Capital One cards without a specific link, use the Spark Cash Plus referral
  if (cardSlug.startsWith('capital-one-') && CARD_REFERRAL_LINKS['capital-one-spark-cash-plus']) {
    return CARD_REFERRAL_LINKS['capital-one-spark-cash-plus']
  }

  return null
}


// ─── TRAVEL AFFILIATE LINKS ─────────────────────────────────
//
// Add affiliate IDs for travel booking partners as you get them.
// These are used by the /go/[provider] redirect route.
//
export const TRAVEL_AFFILIATES: Record<string, {
  baseUrl: string
  affiliateParam?: string  // query param name for the affiliate ID
  affiliateId?: string     // your affiliate ID
}> = {
  skyscanner: {
    baseUrl: 'https://www.skyscanner.com/transport/flights',
    // TODO: Replace with real Skyscanner affiliate ID
    // affiliateParam: 'associateId',
    // affiliateId: 'YOUR_SKYSCANNER_ID',
  },
  booking: {
    baseUrl: 'https://www.booking.com/hotel',
    // TODO: Replace with real Booking.com affiliate ID
    // affiliateParam: 'aid',
    // affiliateId: 'YOUR_BOOKING_ID',
  },
  expedia: {
    baseUrl: 'https://www.expedia.com/Hotel-Search',
    // TODO: Replace with real Expedia affiliate ID
    // affiliateParam: 'AFFLID',
    // affiliateId: 'YOUR_EXPEDIA_ID',
  },
}


// ─── TRAVEL INSURANCE AFFILIATES ────────────────────────────
//
// Notes on availability (as of 2026 — re-verify before applying):
//   • Allianz: direct affiliate program via partnerize.com — strong cruise
//     coverage and the brand most cruise lines white-label.
//   • TravelGuard (AIG): affiliate available through CJ Affiliate (Commission
//     Junction). Solid medical evacuation limits.
//   • InsureMyTrip: aggregator marketplace; CJ + ShareASale programs.
//     Best when a visitor wants to compare quotes across many carriers.
//   • SquareMouth: aggregator; CJ + Impact programs.
//   • World Nomads (nomadinsurance.com): primarily for adventure/long-term
//     travelers — not the best fit for family cruises but listed for completeness.
//
// Set the URL to null to suppress a card on the comparison page.
//
export interface InsurancePartner {
  slug: string
  name: string
  tagline: string
  bestFor: string
  highlights: string[]
  affiliateUrl: string | null
  // Public marketing URL we can fall back to if there's no affiliate link yet.
  fallbackUrl: string
}

export const INSURANCE_PARTNERS: InsurancePartner[] = [
  {
    slug: 'allianz',
    name: 'Allianz Travel',
    tagline: 'The cruise-line standard for trip protection',
    bestFor: 'Most Disney cruise families',
    highlights: [
      'Disney Cruise Line uses Allianz for its own protection plan',
      'Strong trip cancellation and interruption coverage',
      'Pre-existing condition waiver available within 14 days of deposit',
      '24/7 multilingual emergency assistance',
    ],
    // TODO: Replace with real Partnerize / Allianz affiliate link
    affiliateUrl: null,
    fallbackUrl: 'https://www.allianztravelinsurance.com/',
  },
  {
    slug: 'travelguard',
    name: 'Travel Guard (AIG)',
    tagline: 'Higher medical & evacuation limits',
    bestFor: 'International itineraries & older travelers',
    highlights: [
      'Up to $1M emergency medical evacuation',
      'Cancel For Any Reason (CFAR) upgrade available',
      'Strong pre-existing condition waiver if purchased within 15 days',
      'Family-rate plans cover dependents at no extra cost',
    ],
    // TODO: Replace with real CJ Affiliate Travel Guard link
    affiliateUrl: null,
    fallbackUrl: 'https://www.travelguard.com/',
  },
  {
    slug: 'insuremytrip',
    name: 'InsureMyTrip',
    tagline: 'Compare quotes from 20+ carriers',
    bestFor: 'Comparison shoppers',
    highlights: [
      'Side-by-side quotes across major travel insurers',
      'Anytime Advocates™ help you file claims if denied',
      'Filter by CFAR, pre-existing waiver, medical limits',
      'Money-back review period on most policies',
    ],
    // TODO: Replace with real CJ Affiliate / ShareASale link
    affiliateUrl: null,
    fallbackUrl: 'https://www.insuremytrip.com/',
  },
]

export function getInsurancePartnerLink(partner: InsurancePartner): string {
  return partner.affiliateUrl ?? partner.fallbackUrl
}

export function isInsurancePartnerAffiliated(partner: InsurancePartner): boolean {
  return Boolean(partner.affiliateUrl)
}


// ─── AD NETWORK CONFIG ───────────────────────────────────────
//
// When you're ready to add display ads (Google AdSense, Mediavine,
// Raptive, etc.), put the config here.
//
export const AD_CONFIG = {
  /** Set to true when you have an ad network approved */
  enabled: false,

  /** Your ad network publisher ID */
  // publisherId: 'pub-XXXXXXXXXXXXXXXX',

  /** Ad network name */
  // network: 'adsense' as 'adsense' | 'mediavine' | 'raptive',
}


// ─── SOCIAL & PROMO LINKS ───────────────────────────────────
//
// Your social media and promotional links for cross-promotion.
//
export const SOCIAL_LINKS = {
  // Add these as you create them:
  // twitter: 'https://twitter.com/gatgridcruises',
  // instagram: 'https://instagram.com/gatgridcruises',
  // youtube: 'https://youtube.com/@gatgridcruises',
  // tiktok: 'https://tiktok.com/@gatgridcruises',
  // facebook: 'https://facebook.com/gatgridcruises',
  // pinterest: 'https://pinterest.com/gatgridcruises',
}

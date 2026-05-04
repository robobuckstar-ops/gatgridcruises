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
// We have three live affiliate referral links — Chase Ink Business,
// Capital One Spark Business, and Amex Business Platinum. Other
// cards in the comparison content fall back to the closest issuer
// referral, or to /concierge if no relationship exists yet.
//
// TIP: Most issuers let you generate referral links from your
// online account under "Refer a Friend" or similar.
//
export const CARD_REFERRAL_LINKS: Record<string, string | null> = {
  // Chase — Ink Business referral covers all Chase cards
  'chase-ink-business-preferred': 'https://www.referyourchasecard.com/226m/6ZT33F9TOQ',
  'chase-ink-business-unlimited': 'https://www.referyourchasecard.com/226m/6ZT33F9TOQ',
  'chase-sapphire-preferred':     'https://www.referyourchasecard.com/226m/6ZT33F9TOQ',
  'chase-sapphire-reserve':       'https://www.referyourchasecard.com/226m/6ZT33F9TOQ',

  // American Express — Business Platinum referral
  'amex-business-platinum':       'https://americanexpress.com/en-us/referral/business-platinum-charge-card?ref=CRYSTSGCNM&XL=MIMNS',
  'amex-gold':                    'https://americanexpress.com/en-us/referral/business-platinum-charge-card?ref=CRYSTSGCNM&XL=MIMNS',

  // Capital One — Spark Business referral covers all Capital One cards
  'capital-one-spark-cash-plus':  'https://i.capitalone.com/JKlfRwN3f',
  'capital-one-spark-cash-select':'https://i.capitalone.com/JKlfRwN3f',
  'capital-one-spark-miles':      'https://i.capitalone.com/JKlfRwN3f',
  'capital-one-venture-x':        'https://i.capitalone.com/JKlfRwN3f',
  'capital-one-venture':          'https://i.capitalone.com/JKlfRwN3f',
}

/**
 * Get the referral link for a card. Falls back by issuer family
 * (Chase → Ink referral, Amex → Biz Platinum referral, Capital One →
 * Spark referral), or returns null if we have no relationship.
 */
export function getCardReferralLink(cardSlug: string): string | null {
  if (CARD_REFERRAL_LINKS[cardSlug]) {
    return CARD_REFERRAL_LINKS[cardSlug]
  }

  if (cardSlug.startsWith('chase-')) {
    return CARD_REFERRAL_LINKS['chase-ink-business-preferred'] ?? null
  }

  if (cardSlug.startsWith('amex-')) {
    return CARD_REFERRAL_LINKS['amex-business-platinum'] ?? null
  }

  if (cardSlug.startsWith('capital-one-')) {
    return CARD_REFERRAL_LINKS['capital-one-spark-cash-plus'] ?? null
  }

  return null
}

/**
 * True when the URL points to an external affiliate destination
 * (not an internal /concierge fallback). Used to decide whether to
 * apply nofollow/sponsored attributes and target=_blank.
 */
export function isExternalReferralLink(url: string | null | undefined): boolean {
  if (!url) return false
  return /^https?:\/\//i.test(url)
}

/**
 * Standard `<a>` props for an outbound affiliate referral link.
 * Adds rel="nofollow sponsored noopener noreferrer" and opens in a
 * new tab. Returns null if the URL is not an external referral.
 */
export function affiliateLinkAttrs(url: string | null | undefined) {
  if (!isExternalReferralLink(url)) return null
  return {
    href: url as string,
    target: '_blank' as const,
    rel: 'nofollow sponsored noopener noreferrer',
  }
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
  tiktok: 'https://tiktok.com/@gatgridcruises',
  instagram: 'https://instagram.com/gatgridcruises',
  youtube: 'https://youtube.com/@gatgridcruises',
  // Add these as you create them:
  // twitter: 'https://twitter.com/gatgridcruises',
  // facebook: 'https://facebook.com/gatgridcruises',
  // pinterest: 'https://pinterest.com/gatgridcruises',
}

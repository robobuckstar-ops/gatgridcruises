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
  /** TODO: Replace with real Amazon Associates tag (e.g., 'gatgridcruis00-20') */
  tag: '',

  /** Base URL for Amazon product links (don't change this) */
  baseUrl: 'https://www.amazon.com',
}

/**
 * Append your Amazon Associates tag to any Amazon URL.
 * Usage: amazonLink('https://www.amazon.com/dp/B09V3KXJPB')
 *   → 'https://www.amazon.com/dp/B09V3KXJPB?tag=thm1230b0300-20'
 */
export function amazonLink(_url: string): string {
  // TODO: Replace with real affiliate URL once Amazon Associates tag is set
  return '/concierge'
}

export function amazonProductLink(_asin: string): string {
  // TODO: Replace with real affiliate URL once Amazon Associates tag is set
  return '/concierge'
}

export function amazonSearchLink(_query: string): string {
  // TODO: Replace with real affiliate URL once Amazon Associates tag is set
  return '/concierge'
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
  // TODO: Replace each '/concierge' with a real referral URL from your card issuer's "Refer a Friend" program
  'chase-ink-business-preferred': '/concierge', // TODO: Replace with real Chase referral URL
  'chase-ink-business-unlimited': '/concierge', // TODO: Replace with real Chase referral URL
  'chase-sapphire-preferred':     '/concierge', // TODO: Replace with real Chase referral URL
  'chase-sapphire-reserve':       '/concierge', // TODO: Replace with real Chase referral URL
  'amex-business-platinum':       '/concierge', // TODO: Replace with real Amex referral URL
  'amex-gold':                    '/concierge', // TODO: Replace with real Amex referral URL
  'capital-one-spark-cash-plus':  '/concierge', // TODO: Replace with real Capital One referral URL
  'capital-one-spark-cash-select':'/concierge', // TODO: Replace with real Capital One referral URL
  'capital-one-venture-x':        '/concierge', // TODO: Replace with real Capital One referral URL
  'capital-one-venture':          '/concierge', // TODO: Replace with real Capital One referral URL
  'citi-premier':                 '/concierge', // TODO: Replace with real Citi referral URL
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

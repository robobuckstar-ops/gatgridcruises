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
  /** Amazon Associates tag (not active) */
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
  return '/concierge'
}

export function amazonProductLink(_asin: string): string {
  return '/concierge'
}

export function amazonSearchLink(_query: string): string {
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
  // ── Chase ──────────────────────────────────────────────────
  /** Chase Ink Business Preferred referral */
  'chase-ink-business-preferred': null,

  /** Chase Ink Business Unlimited — uses Ink Business Preferred link */
  'chase-ink-business-unlimited': null,

  /** Chase Sapphire Preferred — add your link when you have it */
  'chase-sapphire-preferred':  null,

  /** Chase Sapphire Reserve — add your link when you have it */
  'chase-sapphire-reserve':    null,

  // ── American Express ───────────────────────────────────────
  /** Amex Business Platinum referral */
  'amex-business-platinum':    null,

  /** Amex Gold — add your link when you have it */
  'amex-gold':                 null,

  // ── Capital One ────────────────────────────────────────────
  /** Capital One Spark Cash Plus referral */
  'capital-one-spark-cash-plus':   null,

  /** Capital One Spark Cash Select — uses Spark Cash Plus link */
  'capital-one-spark-cash-select': null,

  /** Capital One Venture X — uses Spark Cash Plus link as fallback */
  'capital-one-venture-x':     null,

  /** Capital One Venture — uses Spark Cash Plus link as fallback */
  'capital-one-venture':       null,

  // ── Citi ───────────────────────────────────────────────────
  /** Citi Premier — add your link when you have it */
  'citi-premier':              null,
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
    // affiliateParam: 'associateId',
    // affiliateId: 'YOUR_SKYSCANNER_ID',
  },
  booking: {
    baseUrl: 'https://www.booking.com/hotel',
    // affiliateParam: 'aid',
    // affiliateId: 'YOUR_BOOKING_ID',
  },
  expedia: {
    baseUrl: 'https://www.expedia.com/Hotel-Search',
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

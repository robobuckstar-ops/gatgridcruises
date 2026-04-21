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
  /** Your Amazon Associates Store ID / Tracking ID */
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

/**
 * Build an Amazon product link from just an ASIN.
 * Usage: amazonProductLink('B09V3KXJPB')
 *   → 'https://www.amazon.com/dp/B09V3KXJPB?tag=thm1230b0300-20'
 */
export function amazonProductLink(asin: string): string {
  return `${AMAZON_CONFIG.baseUrl}/dp/${asin}?tag=${AMAZON_CONFIG.tag}`
}

/**
 * Build an Amazon search link with your affiliate tag.
 * Usage: amazonSearchLink('cruise packing cubes')
 *   → 'https://www.amazon.com/s?k=cruise+packing+cubes&tag=thm1230b0300-20'
 */
export function amazonSearchLink(query: string): string {
  const encoded = encodeURIComponent(query).replace(/%20/g, '+')
  return `${AMAZON_CONFIG.baseUrl}/s?k=${encoded}&tag=${AMAZON_CONFIG.tag}`
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
  /** Chase Southwest / Ink referral (your current link) */
  'chase-southwest-ink':       'https://www.referyourchasecard.com/226m/6ZT33F9TOQ',

  /** Chase Sapphire Preferred — add your link when you have it */
  'chase-sapphire-preferred':  null,

  /** Chase Sapphire Reserve — add your link when you have it */
  'chase-sapphire-reserve':    null,

  /** Chase Ink Business Preferred — add your link when you have it */
  'chase-ink-business-preferred': null,

  // ── American Express ───────────────────────────────────────
  /** Amex Business Platinum — add your link when you have it */
  'amex-business-platinum':    null,

  /** Amex Gold — add your link when you have it */
  'amex-gold':                 null,

  // ── Capital One ────────────────────────────────────────────
  /** Capital One Spark Business referral (your current link) */
  'capital-one-spark-business': 'https://i.capitalone.com/JKlfRwN3f',

  /** Capital One Venture X — uses Spark Business link as fallback */
  'capital-one-venture-x':     null,

  /** Capital One Venture — uses Spark Business link as fallback */
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

  // For Chase cards without a specific link, use the general Chase referral
  if (cardSlug.startsWith('chase-') && CARD_REFERRAL_LINKS['chase-southwest-ink']) {
    return CARD_REFERRAL_LINKS['chase-southwest-ink']
  }

  // For Capital One cards without a specific link, use the Spark Business referral
  if (cardSlug.startsWith('capital-one-') && CARD_REFERRAL_LINKS['capital-one-spark-business']) {
    return CARD_REFERRAL_LINKS['capital-one-spark-business']
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

export const PRICES_LAST_UPDATED = 'August 20, 2026'

/**
 * Minimum days out a sailing must be to show as a bookable deal. Cruises that
 * leave sooner than this can't realistically be booked (flights, PTO, Disney's
 * payment window), so they're hidden everywhere — which also clears out any
 * already-departed dates. Tune this single number to widen/narrow the window.
 */
export const MIN_BOOKING_LEAD_DAYS = 10

export const PRICES_DISCLAIMER =
  'Prices are approximate and may vary. All fares shown are per-cabin (2 guests) base fare. ' +
  'Port fees, taxes, and gratuities are estimated. Verify current pricing directly with the cruise line before booking.'

/** The GatGrid business line, formatted the way customers see it. */
export const BUSINESS_PHONE_DISPLAY = '(405) 526-4956'

/**
 * The deliverability nudge on every lead form's success screen. A lead who
 * knows to look in Promotions is a lead who actually reads the quote, so the
 * same sentence is shared across the forms rather than reworded per page.
 */
export const LEAD_CONFIRMATION_HEADS_UP =
  `Heads up: check your spam/promotions folder for our email and a text from ${BUSINESS_PHONE_DISPLAY}, ` +
  "and add us to your contacts so you don't miss the quote."

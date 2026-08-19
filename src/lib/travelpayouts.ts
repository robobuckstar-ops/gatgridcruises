/**
 * Travelpayouts affiliate links (flights, hotels, airport transfers, insurance).
 *
 * Attribution works whenever `marker=766218` is present in the destination
 * URL — that parameter is what sets Travelpayouts' tracking cookie. Building
 * the links here rather than hardcoding them at each call site means the
 * marker is stated exactly once.
 *
 * The Travelpayouts "Drive" verification script is already live in the root
 * layout <head>, so these links track without any further setup.
 *
 * CONFIDENCE NOTE: Aviasales and Hotellook read `marker=` natively — those are
 * solid. Kiwitaxi, GetTransfer, and EKTA are documented by Travelpayouts as
 * sometimes requiring a builder/API-minted link instead of a raw `marker=`
 * append. They are wired up here because a tagged link is strictly better than
 * an untagged one, but swap in official builder links once the dashboard is
 * unlocked. See docs/travelpayouts.md.
 */

/** Partner ID that tags every booking to GatGrid. */
export const TRAVELPAYOUTS_MARKER = '766218'

/** Append the affiliate marker to any Travelpayouts partner URL. */
export function tpLink(url: string): string {
  const separator = url.includes('?') ? '&' : '?'
  return `${url}${separator}marker=${TRAVELPAYOUTS_MARKER}`
}

/** Standard `<a>` props for an outbound Travelpayouts link. */
export const TP_LINK_ATTRS = {
  target: '_blank' as const,
  rel: 'nofollow sponsored noopener noreferrer',
}

// ─── FLIGHTS (Aviasales) ─────────────────────────────────────

/** Flights into a specific airport, e.g. flightsTo('MCO'). */
export function flightsTo(airportCode: string): string {
  return tpLink(`https://www.aviasales.com/flights_to_${airportCode}`)
}

/** Open-ended flight search — used where we have no specific port. */
export const FLIGHTS_HOME = tpLink('https://www.aviasales.com/')

// ─── HOTELS (Hotellook) ──────────────────────────────────────

/** Hotels in a destination, e.g. hotelsIn('Cocoa Beach'). */
export function hotelsIn(destination: string): string {
  return tpLink(`https://search.hotellook.com/?destination=${encodeURIComponent(destination)}`)
}

/** Open-ended hotel search. */
export const HOTELS_HOME = tpLink('https://search.hotellook.com/')

// ─── AIRPORT TRANSFERS ───────────────────────────────────────

export const TRANSFER_PARTNERS = [
  {
    name: 'Kiwitaxi',
    url: tpLink('https://kiwitaxi.com/'),
    description:
      'Pre-booked private car or van with a meet-and-greet at baggage claim. Fixed price quoted up front, driver waits if your flight is late.',
    bestFor: 'Families with luggage who want a guaranteed ride waiting',
  },
  {
    name: 'GetTransfer',
    url: tpLink('https://gettransfer.com/'),
    description:
      'You post the route and licensed local drivers bid on it, so you can compare offers and vehicle classes before committing.',
    bestFor: 'Comparing prices across several local operators',
  },
] as const

// ─── TRAVEL INSURANCE ────────────────────────────────────────

export const INSURANCE_EKTA_URL = tpLink('https://ektatraveling.com/')

// ─── PORT → FLIGHT/HOTEL PAIRINGS ────────────────────────────

/**
 * The three Florida ports Disney sails from most, each with the airport code
 * and hotel search that actually matches it. Only ports with a documented,
 * verified deep link are listed — anything else falls back to the homepage
 * searches above rather than guessing at a URL.
 */
export const PORT_TRAVEL_LINKS = [
  {
    port: 'Port Canaveral',
    airportCode: 'MCO',
    airportLabel: 'Orlando (MCO)',
    hotelDestination: 'Cocoa Beach',
    hotelLabel: 'Cocoa Beach & Cape Canaveral',
  },
  {
    port: 'Port Everglades',
    airportCode: 'FLL',
    airportLabel: 'Fort Lauderdale (FLL)',
    hotelDestination: 'Fort Lauderdale',
    hotelLabel: 'Fort Lauderdale',
  },
  {
    port: 'PortMiami',
    airportCode: 'MIA',
    airportLabel: 'Miami (MIA)',
    hotelDestination: 'Miami',
    hotelLabel: 'Miami',
  },
] as const

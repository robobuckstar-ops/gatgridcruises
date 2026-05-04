// Airtable schema constants and fetch helpers for the client portal.
// Field IDs are stable across renames in Airtable, so we reference by ID.

export const AIRTABLE_BASE = 'applSFcQkOus2fFsx'
export const BOOKINGS_TABLE = 'tblOrV5YCbhg0Lbcw'
export const CLIENTS_TABLE = 'tbldsgnJfdvwq0UHB'

export const BOOKING_FIELDS = {
  bookingName: 'fldudzWVLJKexg3EX',
  ship: 'fld5f1KYgrbiiTFjo',
  sailingDate: 'fldOqulAXwFKhz4o5',
  returnDate: 'fldKpg3IiPV6dVURb',
  nights: 'fldHEImBfezP4v9DT',
  itinerary: 'fldr3Gm7U8qGYkZ9L',
  stateroomCategory: 'fldHCyzsnnC8gtmhT',
  stateroomNumber: 'fldX6YrRpiebssAbc',
  bookingPrice: 'fldEcNlprggM5r8rS',
  commissionEstimated: 'fldc055RT4xllonhl',
  obcAmount: 'fldvKZ0tpzhDygEfS',
  phase: 'fldv7osctT7kB1QAI',
  clientEmail: 'fldo5NBN0Vra8wgYj',
  client: 'fld6tu0nat2TiEgCZ',
} as const

export const CLIENT_FIELDS = {
  name: 'fldKgygvHS6sTCMQG',
} as const

export interface BookingDetails {
  id: string
  number: string
  ship: string
  sailingDate: string
  returnDate: string
  nights: number | null
  itinerary: string
  stateroomNumber: string
  stateroomCategory: string
  obcAmount: number | null
  bookingPrice: number | null
  phase: string
}

export interface ClientDetails {
  fullName: string
  firstName: string
  email: string
}

export class AirtableError extends Error {
  constructor(public status: number, message: string) {
    super(message)
    this.name = 'AirtableError'
  }
}

async function airtableGet(url: string, apiKey: string): Promise<Record<string, unknown>> {
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${apiKey}` },
    next: { revalidate: 0 },
  })
  if (!res.ok) {
    const text = await res.text()
    throw new AirtableError(res.status, `Airtable ${res.status}: ${text}`)
  }
  return res.json()
}

function toNumberOrNull(value: unknown): number | null {
  return typeof value === 'number' && Number.isFinite(value) ? value : null
}

function bookingUrl(table: string, idOrParams: string): string {
  return `https://api.airtable.com/v0/${AIRTABLE_BASE}/${table}/${idOrParams}`
}

export async function fetchBookingByName(
  bookingName: string,
  apiKey: string,
): Promise<{ id: string; fields: Record<string, unknown> } | null> {
  const formula = encodeURIComponent(`FIND("${bookingName}", {Booking Name}) > 0`)
  const fieldParams = Object.values(BOOKING_FIELDS).map(id => `fields[]=${id}`).join('&')
  const url = `https://api.airtable.com/v0/${AIRTABLE_BASE}/${BOOKINGS_TABLE}?filterByFormula=${formula}&${fieldParams}`
  const data = await airtableGet(url, apiKey)
  const records = (data.records as Array<{ id: string; fields: Record<string, unknown> }>) ?? []
  return records[0] ?? null
}

export async function fetchBookingByEmail(
  email: string,
  apiKey: string,
): Promise<{ id: string; fields: Record<string, unknown> } | null> {
  const normalized = email.trim().toLowerCase().replace(/"/g, '\\"')
  const formula = encodeURIComponent(`LOWER({Client Email})="${normalized}"`)
  const fieldParams = Object.values(BOOKING_FIELDS).map(id => `fields[]=${id}`).join('&')
  const url = `https://api.airtable.com/v0/${AIRTABLE_BASE}/${BOOKINGS_TABLE}?filterByFormula=${formula}&${fieldParams}`
  const data = await airtableGet(url, apiKey)
  const records = (data.records as Array<{ id: string; fields: Record<string, unknown> }>) ?? []
  return records[0] ?? null
}

export async function fetchClientName(clientId: string, apiKey: string): Promise<string> {
  const url = bookingUrl(CLIENTS_TABLE, `${clientId}?fields[]=${CLIENT_FIELDS.name}`)
  try {
    const record = await airtableGet(url, apiKey)
    const fields = record.fields as Record<string, unknown> | undefined
    return String(fields?.[CLIENT_FIELDS.name] ?? '')
  } catch {
    return ''
  }
}

function shapeBooking(id: string, fields: Record<string, unknown>): BookingDetails {
  return {
    id,
    number: String(fields[BOOKING_FIELDS.bookingName] ?? ''),
    ship: String(fields[BOOKING_FIELDS.ship] ?? ''),
    sailingDate: String(fields[BOOKING_FIELDS.sailingDate] ?? ''),
    returnDate: String(fields[BOOKING_FIELDS.returnDate] ?? ''),
    nights: toNumberOrNull(fields[BOOKING_FIELDS.nights]),
    itinerary: String(fields[BOOKING_FIELDS.itinerary] ?? ''),
    stateroomNumber: String(fields[BOOKING_FIELDS.stateroomNumber] ?? ''),
    stateroomCategory: String(fields[BOOKING_FIELDS.stateroomCategory] ?? ''),
    obcAmount: toNumberOrNull(fields[BOOKING_FIELDS.obcAmount]),
    bookingPrice: toNumberOrNull(fields[BOOKING_FIELDS.bookingPrice]),
    phase: String(fields[BOOKING_FIELDS.phase] ?? ''),
  }
}

export async function fetchBookingById(
  bookingId: string,
  apiKey: string,
): Promise<{ booking: BookingDetails; client: ClientDetails } | null> {
  const fieldParams = Object.values(BOOKING_FIELDS).map(id => `fields[]=${id}`).join('&')
  const url = bookingUrl(BOOKINGS_TABLE, `${bookingId}?${fieldParams}`)

  let record: Record<string, unknown>
  try {
    record = await airtableGet(url, apiKey)
  } catch (err) {
    if (err instanceof AirtableError && err.status === 404) return null
    throw err
  }

  const fields = record.fields as Record<string, unknown> | undefined
  if (!fields) return null

  const booking = shapeBooking(String(record.id), fields)
  const email = String(fields[BOOKING_FIELDS.clientEmail] ?? '')
  const clientIds = fields[BOOKING_FIELDS.client] as string[] | undefined

  const fullName = clientIds?.length ? await fetchClientName(clientIds[0], apiKey) : ''
  const firstName = fullName.trim().split(/\s+/)[0] || email.split('@')[0] || 'there'

  return {
    booking,
    client: { fullName, firstName, email },
  }
}

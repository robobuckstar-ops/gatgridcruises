// Shared low-level Airtable REST helpers.
//
// The portal (portal-airtable.ts) and referral (airtable-referrals.ts) modules
// each grew their own fetch wrapper. Anything that *writes* durable records —
// newsletter subscribers, CRM leads — goes through this module instead, because
// writes need three things those wrappers don't have:
//
//   1. Retry on Airtable's 429 / 5xx (a dropped signup is a lost subscriber).
//   2. Pagination when reading the full list back out for a send.
//   3. Tolerance for a field that doesn't exist yet in the base. Airtable
//      rejects the whole record with 422 UNKNOWN_FIELD_NAME if one key is
//      unrecognized, so we strip the offending field and retry rather than
//      losing the record entirely. That keeps a signup persisting even if the
//      table was created with a slightly different column set.

import { AIRTABLE_BASE } from './portal-airtable'

// Re-exported so callers can name the base in their diagnostics without
// reaching into the portal module for it.
export { AIRTABLE_BASE }

const API_ROOT = 'https://api.airtable.com/v0'

/** Airtable's documented ceiling is 5 requests/second/base. */
const RETRY_DELAYS_MS = [400, 1200]

/** Guard against an unbounded paging loop if a filter matches everything. */
const MAX_PAGES = 20
const PAGE_SIZE = 100

export interface AirtableRecord {
  id: string
  fields: Record<string, unknown>
  createdTime?: string
}

export class AirtableRequestError extends Error {
  constructor(
    public status: number,
    public body: string,
  ) {
    super(`Airtable ${status}: ${body.slice(0, 300)}`)
    this.name = 'AirtableRequestError'
  }
}

export function getAirtableKey(): string | null {
  const key = process.env.AIRTABLE_API_KEY?.trim()
  return key ? key : null
}

function tableUrl(table: string, suffix = ''): string {
  return `${API_ROOT}/${AIRTABLE_BASE}/${encodeURIComponent(table)}${suffix}`
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/** Escape a value for safe interpolation into a filterByFormula string. */
export function escapeFormulaValue(value: string): string {
  return value.replace(/\\/g, '\\\\').replace(/"/g, '\\"')
}

async function request(url: string, apiKey: string, init?: RequestInit): Promise<Response> {
  let lastError: unknown = null

  for (let attempt = 0; attempt <= RETRY_DELAYS_MS.length; attempt++) {
    if (attempt > 0) await sleep(RETRY_DELAYS_MS[attempt - 1])

    try {
      const res = await fetch(url, {
        ...init,
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          ...init?.headers,
        },
        cache: 'no-store',
      })
      // Only transient failures are worth retrying; 4xx other than 429 will
      // fail identically on the next attempt.
      if (res.status === 429 || res.status >= 500) {
        lastError = new AirtableRequestError(res.status, await res.text().catch(() => ''))
        continue
      }
      return res
    } catch (err) {
      lastError = err
    }
  }

  throw lastError instanceof Error ? lastError : new Error(String(lastError))
}

/**
 * Pull the field name out of a 422 UNKNOWN_FIELD_NAME body so the caller can
 * drop it and retry. Airtable phrases this as: Unknown field name: "Source"
 */
function parseUnknownFieldName(body: string): string | null {
  // Read the message out of the JSON envelope when possible; the raw body has
  // the quotes around the field name backslash-escaped.
  let message = body
  try {
    const parsed = JSON.parse(body) as { error?: { message?: unknown } }
    if (typeof parsed?.error?.message === 'string') message = parsed.error.message
  } catch {
    // Not JSON — fall through and scan the raw text.
  }

  const match =
    message.match(/unknown field names?:\s*\\?"([^"\\]+)\\?"/i) ??
    message.match(/field\s+\\?"([^"\\]+)\\?"\s+(?:does not exist|cannot be found)/i)
  return match ? match[1] : null
}

async function writeWithFieldFallback(
  url: string,
  method: 'POST' | 'PATCH',
  fields: Record<string, unknown>,
  apiKey: string,
  context: string,
  protectedFields: readonly string[] = [],
): Promise<AirtableRecord> {
  const payload: Record<string, unknown> = { ...fields }
  const dropped: string[] = []

  // Bounded: each iteration removes exactly one key, so this cannot outlive
  // the field count.
  for (let i = 0; i <= Object.keys(fields).length; i++) {
    const res = await request(url, apiKey, {
      method,
      body: JSON.stringify({ fields: payload, typecast: true }),
    })

    if (res.ok) {
      if (dropped.length) {
        console.warn(
          `[airtable] ${context}: wrote record without missing field(s) ${dropped.join(', ')} — add them to the table to capture this data`,
        )
      }
      return (await res.json()) as AirtableRecord
    }

    const body = await res.text().catch(() => '')
    const unknownField = res.status === 422 ? parseUnknownFieldName(body) : null

    if (unknownField && unknownField in payload) {
      // Shedding an optional detail column keeps the record; shedding an
      // identity column would write an unusable husk — a CRM row with no name
      // or email is indistinguishable from a lost lead, and worse, it looks
      // like a success. Fail loudly instead so the caller reports it.
      if (protectedFields.includes(unknownField)) {
        throw new AirtableRequestError(
          422,
          `${context}: required field "${unknownField}" does not exist in this table — refusing to write a record without it. Original response: ${body.slice(0, 200)}`,
        )
      }
      delete payload[unknownField]
      dropped.push(unknownField)
      continue
    }

    throw new AirtableRequestError(res.status, body)
  }

  throw new AirtableRequestError(422, `${context}: no writable fields remained`)
}

export async function createRecord(
  table: string,
  fields: Record<string, unknown>,
  apiKey: string,
  context = table,
  /** Keys that must survive; a missing one fails the write instead of shedding. */
  protectedFields: readonly string[] = [],
): Promise<AirtableRecord> {
  return writeWithFieldFallback(tableUrl(table), 'POST', fields, apiKey, context, protectedFields)
}

export async function updateRecord(
  table: string,
  recordId: string,
  fields: Record<string, unknown>,
  apiKey: string,
  context = table,
  protectedFields: readonly string[] = [],
): Promise<AirtableRecord> {
  return writeWithFieldFallback(
    tableUrl(table, `/${recordId}`),
    'PATCH',
    fields,
    apiKey,
    context,
    protectedFields,
  )
}

export interface ListOptions {
  filterByFormula?: string
  maxRecords?: number
  sort?: { field: string; direction?: 'asc' | 'desc' }[]
}

/** Read every matching record, following Airtable's `offset` cursor. */
export async function listRecords(
  table: string,
  options: ListOptions,
  apiKey: string,
): Promise<AirtableRecord[]> {
  const records: AirtableRecord[] = []
  let offset: string | undefined

  for (let page = 0; page < MAX_PAGES; page++) {
    const params = new URLSearchParams({ pageSize: String(PAGE_SIZE) })
    if (options.filterByFormula) params.set('filterByFormula', options.filterByFormula)
    if (options.maxRecords) params.set('maxRecords', String(options.maxRecords))
    options.sort?.forEach((s, i) => {
      params.set(`sort[${i}][field]`, s.field)
      if (s.direction) params.set(`sort[${i}][direction]`, s.direction)
    })
    if (offset) params.set('offset', offset)

    const res = await request(tableUrl(table, `?${params.toString()}`), apiKey)
    if (!res.ok) {
      throw new AirtableRequestError(res.status, await res.text().catch(() => ''))
    }

    const data = (await res.json()) as { records?: AirtableRecord[]; offset?: string }
    records.push(...(data.records ?? []))

    if (!data.offset) return records
    if (options.maxRecords && records.length >= options.maxRecords) return records
    offset = data.offset
  }

  console.warn(`[airtable] ${table}: hit the ${MAX_PAGES}-page read cap`)
  return records
}

export async function findFirstRecord(
  table: string,
  filterByFormula: string,
  apiKey: string,
): Promise<AirtableRecord | null> {
  const records = await listRecords(table, { filterByFormula, maxRecords: 1 }, apiKey)
  return records[0] ?? null
}

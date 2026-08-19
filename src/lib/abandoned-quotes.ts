/**
 * Abandoned quote-request detection.
 *
 * A visitor fills in a quote form, the lead lands in the Airtable CRM, and the
 * automated nurture drip starts. What nothing currently notices is a quote that
 * *nobody worked* — still sitting in the new-lead stage days later, with a real
 * person on the other end waiting for a price.
 *
 * This module finds those and drafts what a reply could say. It deliberately
 * does not send anything and contains no send path at all — see
 * `src/app/api/cron/abandoned-quotes/route.ts` for why that boundary is where
 * it is. The drafts are text for a human to read, edit, and send themselves.
 */

import { escapeFormulaValue, getAirtableKey, listRecords, updateRecord } from './airtable-client'
import type { AirtableRecord } from './airtable-client'
import { LEAD_FIELDS, LEADS_TABLE } from './airtable-leads'

/**
 * Hours a quote request may sit unworked before it counts as abandoned.
 * Two days is the brief: long enough that a busy weekend isn't flagged,
 * short enough that the visitor hasn't booked elsewhere yet.
 */
export const ABANDONED_AFTER_HOURS = 48

/**
 * Stop reporting a lead this old. Past a month it isn't an abandoned quote
 * any more, it's a cold lead, and the drip already owns that case — without
 * this the report would grow forever and stop being read.
 */
export const STALE_AFTER_DAYS = 30

/**
 * `Source` values written by the quote-shaped forms (see the `source:` argument
 * to `saveLeadSafely` in the API routes). Matched as a prefix so decorated
 * values like `concierge · Instagram` still count.
 */
const QUOTE_SOURCE_PREFIXES = [
  'free-quote',
  'request-this-sailing',
  'group-cruise',
  'concierge',
  'transfer',
]

/**
 * Pipeline stages that mean "nobody has picked this up". Anything else —
 * Contacted, Quoted, Ready to Book, Converted, Lost — is somebody's active
 * work and is none of this report's business.
 */
const UNWORKED_STAGES = new Set(['', 'new lead', 'new', 'quote requested'])

/** Human-readable column names, used when Airtable returns fields by name. */
const FIELD_NAMES = {
  leadName: 'Lead Name',
  email: 'Email',
  pipelineStage: 'Pipeline Stage',
  firstContactDate: 'First Contact Date',
  lastContactDate: 'Last Contact Date',
  nextFollowUp: 'Next Follow-Up',
  dripSequence: 'Drip Sequence',
  source: 'Source',
  sailingInterest: 'Sailing Interest',
  guests: 'Guests',
  notes: 'Notes',
} as const

export interface AbandonedQuote {
  recordId: string
  name: string
  email: string
  source: string
  sailingInterest: string
  guests: string
  pipelineStage: string
  /** Where the automated drip has got to — context, not a reason to skip. */
  dripSequence: string
  firstContactDate: string
  lastContactDate: string
  hoursWaiting: number
  /** Draft subject line for a human to send. Nothing sends this. */
  draftSubject: string
  /** Draft plain-text body for a human to edit and send. Nothing sends this. */
  draftBody: string
}

export interface AbandonedQuoteReport {
  /** False when AIRTABLE_API_KEY is missing — nothing was read. */
  configured: boolean
  /** Leads scanned before filtering. */
  scanned: number
  /** Quotes needing a human reply, oldest wait first. */
  abandoned: AbandonedQuote[]
  /** Record IDs whose Next Follow-Up was set. Empty unless the flag is on. */
  marked: string[]
  /** Non-fatal problems (e.g. a CRM write that failed). */
  errors: string[]
}

/**
 * Airtable keys its response by field name unless asked otherwise, and the
 * writer half of this codebase addresses the same columns by field ID. Read
 * both so this works either way rather than silently returning blanks.
 */
function pick(fields: Record<string, unknown>, id: string, name: string): string {
  const raw = fields[id] ?? fields[name]
  if (raw === null || raw === undefined) return ''
  return String(raw).trim()
}

function isQuoteSource(source: string): boolean {
  const s = source.toLowerCase()
  return QUOTE_SOURCE_PREFIXES.some(prefix => s.startsWith(prefix))
}

/**
 * Airtable date fields come back as `YYYY-MM-DD` (date-only) or a full ISO
 * timestamp. A date-only value is read as midnight UTC, which can overstate the
 * wait by a few hours — acceptable for a 48-hour threshold, and it errs toward
 * flagging rather than missing someone.
 */
function hoursSince(value: string, now: number): number | null {
  if (!value) return null
  const iso = /^\d{4}-\d{2}-\d{2}$/.test(value) ? `${value}T00:00:00Z` : value
  const parsed = Date.parse(iso)
  if (!Number.isFinite(parsed)) return null
  return Math.floor((now - parsed) / 3_600_000)
}

function firstName(fullName: string): string {
  return fullName.split(/\s+/)[0] || 'there'
}

function buildDraft(quote: Omit<AbandonedQuote, 'draftSubject' | 'draftBody'>): {
  subject: string
  body: string
} {
  const subject = quote.sailingInterest
    ? `Following up on your ${quote.sailingInterest} quote`
    : 'Following up on your Disney cruise quote'

  // Written as an apology-free, specific note rather than a template blast:
  // this goes out one at a time from a person who is genuinely late replying.
  const lines = [
    `Hi ${firstName(quote.name)},`,
    '',
    'You asked us for a Disney cruise quote and I owe you a reply — thanks for '
      + 'your patience.',
  ]

  if (quote.sailingInterest) {
    lines.push('', `You were looking at: ${quote.sailingInterest}.`)
  }
  if (quote.guests) {
    lines.push(`Party size on the request: ${quote.guests}.`)
  }

  lines.push(
    '',
    'Before I put numbers together, two quick questions: are your dates still '
      + 'the ones you sent over, and is there a stateroom category you have in '
      + 'mind? Reply here and I will get you real pricing.',
    '',
    'Talk soon,',
    'Dr. Grayson Starbuck, DPT',
    'GatGrid Cruises · bookings@gatgridcruises.com',
  )

  return { subject, body: lines.join('\n') }
}

/**
 * Decide whether one CRM record is an abandoned quote, and draft the reply if
 * it is. Pure and exported so the rules can be exercised without a live base.
 */
export function classifyLeadRecord(record: AirtableRecord, now: number): AbandonedQuote | null {
  const fields = (record.fields ?? {}) as Record<string, unknown>
  const F = LEAD_FIELDS

  const email = pick(fields, F.email, FIELD_NAMES.email)
  if (!email) return null

  const source = pick(fields, 'Source', FIELD_NAMES.source)
  if (!isQuoteSource(source)) return null

  const pipelineStage = pick(fields, F.pipelineStage, FIELD_NAMES.pipelineStage)
  if (!UNWORKED_STAGES.has(pipelineStage.toLowerCase())) return null

  const firstContactDate = pick(fields, F.firstContactDate, FIELD_NAMES.firstContactDate)
  const hoursWaiting = hoursSince(firstContactDate, now)
  // No first-contact date means we cannot say how long they have waited, and
  // guessing would either spam a fresh lead or bury an old one.
  if (hoursWaiting === null) return null
  if (hoursWaiting < ABANDONED_AFTER_HOURS) return null
  if (hoursWaiting > STALE_AFTER_DAYS * 24) return null

  const partial = {
    recordId: record.id,
    name: pick(fields, F.leadName, FIELD_NAMES.leadName),
    email,
    source,
    sailingInterest: pick(fields, 'Sailing Interest', FIELD_NAMES.sailingInterest),
    guests: pick(fields, 'Guests', FIELD_NAMES.guests),
    pipelineStage,
    dripSequence: pick(fields, F.dripSequence, FIELD_NAMES.dripSequence),
    firstContactDate,
    lastContactDate: pick(fields, F.lastContactDate, FIELD_NAMES.lastContactDate),
    hoursWaiting,
  }

  const draft = buildDraft(partial)
  return { ...partial, draftSubject: draft.subject, draftBody: draft.body }
}

export interface FindAbandonedOptions {
  /**
   * Write today's date into each flagged lead's `Next Follow-Up` so the CRM
   * view surfaces it. Off unless ABANDONED_QUOTES_MARK_CRM=true — the default
   * behaviour is a pure read.
   */
  markInCrm?: boolean
  /** Cap the number of leads read. Useful for a manual spot check. */
  maxRecords?: number
}

/**
 * Read the CRM and return quote requests nobody has replied to.
 *
 * Read-only unless `markInCrm` is set, and never sends mail under any option.
 */
export async function findAbandonedQuotes(
  options: FindAbandonedOptions = {},
): Promise<AbandonedQuoteReport> {
  const apiKey = getAirtableKey()
  if (!apiKey) {
    return { configured: false, scanned: 0, abandoned: [], marked: [], errors: [] }
  }

  // Only the Email filter is pushed to Airtable. The rest is done in JS on
  // purpose: Source / Sailing Interest are optional columns that may not exist
  // in the base, and naming a missing field in filterByFormula 422s the whole
  // read instead of just skipping it.
  const records = await listRecords(
    LEADS_TABLE,
    { filterByFormula: '{Email}!=""', maxRecords: options.maxRecords },
    apiKey,
  )

  const now = Date.now()
  const abandoned = records
    .map(record => classifyLeadRecord(record, now))
    .filter((q): q is AbandonedQuote => q !== null)
    .sort((a, b) => b.hoursWaiting - a.hoursWaiting)

  const marked: string[] = []
  const errors: string[] = []

  if (options.markInCrm) {
    const today = new Date().toISOString().slice(0, 10)
    for (const quote of abandoned) {
      try {
        await updateRecord(
          LEADS_TABLE,
          quote.recordId,
          { [LEAD_FIELDS.nextFollowUp]: today },
          apiKey,
          'abandoned-quotes.mark',
        )
        marked.push(quote.recordId)
      } catch (err) {
        errors.push(`${escapeFormulaValue(quote.email)}: ${String(err)}`)
      }
    }
  }

  return { configured: true, scanned: records.length, abandoned, marked, errors }
}

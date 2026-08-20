// Direct writes into the GatGrid Leads CRM table.
//
// Site forms used to reach this table only via the Make.com webhook
// (CONCIERGE_WEBHOOK_URL). With that scenario paused, leads still emailed
// Grayson through Resend but stopped landing in Airtable — which is where
// /api/cron/lead-nurture reads from, so the nurture drip had no new leads to
// work. These helpers write the record from the app directly, so the CRM stays
// current regardless of Make.com's state. The webhook stays wired up where it
// exists; a lead simply no longer depends on it.

import {
  AIRTABLE_BASE,
  AirtableRequestError,
  createRecord,
  escapeFormulaValue,
  findFirstRecord,
  getAirtableKey,
  updateRecord,
} from './airtable-client'

export const LEADS_TABLE = 'tblc8JHpcgEOnmCoj'

/**
 * The email column's field NAME — used only to build the dedupe formula.
 *
 * Airtable resolves a `{...}` reference inside filterByFormula by field *name*.
 * A field ID there is not recognized: the API rejects the whole read with a 422
 * INVALID_FILTER_BY_FORMULA. This module originally passed LEAD_FIELDS.email
 * (an ID) into the formula, which meant the dedupe lookup threw on every single
 * submission — before either the create or the update branch could run — and
 * saveLeadSafely swallowed it. Leads emailed fine and never reached the CRM.
 *
 * Field IDs remain correct everywhere else: writing `fields` keyed by ID and
 * selecting with `fields[]=` are both ID-addressable, which is why the
 * lead-nurture cron (names in the formula, IDs in the field list) kept working.
 */
const EMAIL_FIELD_NAME = process.env.AIRTABLE_LEAD_EMAIL_FIELD?.trim() || 'Email'

/** Field IDs from the GatGrid Leads table — stable across Airtable renames. */
export const LEAD_FIELDS = {
  leadName: 'fldGvA1skW1RV2sji',
  email: 'fldagqzAWVT2rbvYT',
  pipelineStage: 'fld4tGfjFmJnYw0uV',
  firstContactDate: 'fldMdxtmz7wmzRuUj',
  lastContactDate: 'fldsrvDbLelP46dnw',
  nextFollowUp: 'fldPUqtPvTJKMDqgV',
  dripSequence: 'fldeDE4WvAVi7ZyGs',
} as const

/**
 * Stage applied to a brand-new lead. Overridable because the select's option
 * names live in Airtable; `typecast` will create the option if it's missing,
 * and /api/cron/lead-nurture picks up anything not in its excluded set.
 */
const NEW_LEAD_STAGE = process.env.AIRTABLE_LEAD_NEW_STAGE?.trim() || 'New Lead'

/**
 * Optional detail columns, addressed by name. Any that don't exist in the base
 * are dropped by the Airtable client with a warning rather than failing the
 * write, so the core lead record always lands.
 */
const OPTIONAL_FIELDS = {
  phone: 'Phone',
  notes: 'Notes',
  source: 'Source',
  sailingInterest: 'Sailing Interest',
  guests: 'Guests',
  reservationNumber: 'Reservation Number',
  referralCode: 'Referral Code',
  utmSource: 'UTM Source',
  utmMedium: 'UTM Medium',
  utmCampaign: 'UTM Campaign',
} as const

export interface LeadInput {
  name: string
  email: string
  phone?: string
  notes?: string
  /** Which form produced the lead, e.g. "request-this-sailing". */
  source: string
  sailingInterest?: string
  guests?: string
  /** Disney confirmation number, when the form collected one. */
  reservationNumber?: string
  referralCode?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  /**
   * Write the detail columns again when the lead already exists.
   *
   * Off by default: a repeat inquiry from a known contact shouldn't clobber
   * whatever Grayson has since written in the CRM. The transfer form turns it
   * on because its details — reservation number, sail date — are the whole
   * point of the submission, and silently dropping them on a returning
   * visitor's second request would lose the thing he needs to act on.
   */
  refreshDetailsOnUpdate?: boolean
}

export type LeadOutcome = 'created' | 'updated'

function today(): string {
  return new Date().toISOString().split('T')[0]
}

function daysFromNow(days: number): string {
  return new Date(Date.now() + days * 86_400_000).toISOString().split('T')[0]
}

export function isLeadStoreConfigured(): boolean {
  return getAirtableKey() !== null
}

/**
 * Turn a thrown Airtable error into something actionable in the Vercel log.
 *
 * A bare `console.error(err)` on an AirtableRequestError prints the class name
 * and little else, which is how a 401 (bad/expired token), a 403 (token lacks
 * data.records:write, or the base isn't in its scope) and a 404 (wrong base or
 * table id) all looked identical — and identical to "nothing happened".
 */
function describeAirtableError(err: unknown): Record<string, unknown> {
  if (err instanceof AirtableRequestError) {
    const hint =
      err.status === 401
        ? 'AIRTABLE_API_KEY is missing, malformed, or revoked.'
        : err.status === 403
          ? `Token lacks scope for this base. It needs data.records:read + data.records:write on base ${AIRTABLE_BASE}.`
          : err.status === 404
            ? `Base ${AIRTABLE_BASE} or table ${LEADS_TABLE} not found — or the token cannot see that base.`
            : err.status === 422
              ? 'Airtable rejected the payload (unknown field name, or a bad filterByFormula).'
              : 'Unexpected Airtable failure.'
    return { status: err.status, body: err.body.slice(0, 500), base: AIRTABLE_BASE, table: LEADS_TABLE, hint }
  }
  return {
    error: err instanceof Error ? `${err.name}: ${err.message}` : String(err),
    base: AIRTABLE_BASE,
    table: LEADS_TABLE,
  }
}

/**
 * Upsert by email so a repeat inquiry doesn't create a duplicate CRM row or
 * restart the nurture drip. An existing lead only gets its contact dates
 * refreshed — pipeline stage and drip progress are Grayson's to manage.
 */
export async function saveLead(
  input: LeadInput,
): Promise<{ id: string; outcome: LeadOutcome } | null> {
  // saveLeadSafely logs the actionable version of this; don't double-report.
  const apiKey = getAirtableKey()
  if (!apiKey) return null

  const email = input.email.trim().toLowerCase()
  if (!email) return null

  // A failed dedupe lookup must not sink the write. The worst case if this
  // read is wrong is a duplicate CRM row, which Grayson can merge; the worst
  // case if we propagate the error is a lead that exists only in an email.
  // So: look up, and on failure fall through to create.
  let existing = null
  try {
    existing = await findFirstRecord(
      LEADS_TABLE,
      `LOWER({${EMAIL_FIELD_NAME}})="${escapeFormulaValue(email)}"`,
      apiKey,
    )
  } catch (err) {
    console.error(
      `[leads] dedupe lookup failed on {${EMAIL_FIELD_NAME}} in ${LEADS_TABLE} — creating a new record instead (a duplicate row is possible). ` +
        `If this repeats, the email column is named something other than "${EMAIL_FIELD_NAME}"; set AIRTABLE_LEAD_EMAIL_FIELD to its real name.`,
      describeAirtableError(err),
    )
  }

  if (existing) {
    const touch: Record<string, unknown> = { [LEAD_FIELDS.lastContactDate]: today() }

    if (input.refreshDetailsOnUpdate) {
      touch[OPTIONAL_FIELDS.source] = input.source
      if (input.notes) touch[OPTIONAL_FIELDS.notes] = input.notes
      if (input.phone) touch[OPTIONAL_FIELDS.phone] = input.phone
      if (input.sailingInterest) touch[OPTIONAL_FIELDS.sailingInterest] = input.sailingInterest
      if (input.reservationNumber) {
        touch[OPTIONAL_FIELDS.reservationNumber] = input.reservationNumber
      }
    }

    await updateRecord(LEADS_TABLE, existing.id, touch, apiKey, 'leads.touch')
    return { id: existing.id, outcome: 'updated' }
  }

  const fields: Record<string, unknown> = {
    [LEAD_FIELDS.leadName]: input.name,
    [LEAD_FIELDS.email]: email,
    [LEAD_FIELDS.pipelineStage]: NEW_LEAD_STAGE,
    [LEAD_FIELDS.firstContactDate]: today(),
    [LEAD_FIELDS.lastContactDate]: today(),
    [LEAD_FIELDS.nextFollowUp]: daysFromNow(1),
    [LEAD_FIELDS.dripSequence]: 'Not Started',
    [OPTIONAL_FIELDS.source]: input.source,
  }

  if (input.phone) fields[OPTIONAL_FIELDS.phone] = input.phone
  if (input.notes) fields[OPTIONAL_FIELDS.notes] = input.notes
  if (input.sailingInterest) fields[OPTIONAL_FIELDS.sailingInterest] = input.sailingInterest
  if (input.guests) fields[OPTIONAL_FIELDS.guests] = input.guests
  if (input.reservationNumber) {
    fields[OPTIONAL_FIELDS.reservationNumber] = input.reservationNumber
  }
  if (input.referralCode) fields[OPTIONAL_FIELDS.referralCode] = input.referralCode
  if (input.utmSource) fields[OPTIONAL_FIELDS.utmSource] = input.utmSource
  if (input.utmMedium) fields[OPTIONAL_FIELDS.utmMedium] = input.utmMedium
  if (input.utmCampaign) fields[OPTIONAL_FIELDS.utmCampaign] = input.utmCampaign

  // Name and email are what make the row a lead at all. Everything else may be
  // shed by the field-fallback if the base lacks the column ("Source" and
  // "Reservation Number" are known to be absent); these two may not.
  const record = await createRecord(LEADS_TABLE, fields, apiKey, 'leads.create', [
    LEAD_FIELDS.leadName,
    LEAD_FIELDS.email,
  ])
  return { id: record.id, outcome: 'created' }
}

/**
 * Never let a CRM write break a form submission — the email path is the SLA.
 *
 * Swallowing the error is deliberate, but it must be *loud*: this returning
 * null is the difference between a lead in the CRM and a lead that exists only
 * as an email, so the log line has to carry enough to diagnose without a repro.
 */
export async function saveLeadSafely(
  input: LeadInput,
): Promise<{ id: string; outcome: LeadOutcome } | null> {
  try {
    const result = await saveLead(input)
    if (!result) {
      console.error(
        `[leads] LEAD NOT PERSISTED (source=${input.source}, email=${input.email}) — the lead store is not configured. ` +
          'Set AIRTABLE_API_KEY in the Vercel project env.',
      )
    }
    return result
  } catch (err) {
    console.error(
      `[leads] LEAD NOT PERSISTED (source=${input.source}, email=${input.email}) — Airtable write failed.`,
      describeAirtableError(err),
    )
    return null
  }
}

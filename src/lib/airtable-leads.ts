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
  createRecord,
  escapeFormulaValue,
  findFirstRecord,
  getAirtableKey,
  updateRecord,
} from './airtable-client'

export const LEADS_TABLE = 'tblc8JHpcgEOnmCoj'

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
 * Upsert by email so a repeat inquiry doesn't create a duplicate CRM row or
 * restart the nurture drip. An existing lead only gets its contact dates
 * refreshed — pipeline stage and drip progress are Grayson's to manage.
 */
export async function saveLead(
  input: LeadInput,
): Promise<{ id: string; outcome: LeadOutcome } | null> {
  const apiKey = getAirtableKey()
  if (!apiKey) {
    console.error('[leads] AIRTABLE_API_KEY not set — lead not written to the CRM')
    return null
  }

  const email = input.email.trim().toLowerCase()
  if (!email) return null

  const existing = await findFirstRecord(
    LEADS_TABLE,
    `LOWER({${LEAD_FIELDS.email}})="${escapeFormulaValue(email)}"`,
    apiKey,
  )

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

  const record = await createRecord(LEADS_TABLE, fields, apiKey, 'leads.create')
  return { id: record.id, outcome: 'created' }
}

/** Never let a CRM write break a form submission — the email path is the SLA. */
export async function saveLeadSafely(
  input: LeadInput,
): Promise<{ id: string; outcome: LeadOutcome } | null> {
  try {
    return await saveLead(input)
  } catch (err) {
    console.error('[leads] failed to write lead to Airtable:', err)
    return null
  }
}

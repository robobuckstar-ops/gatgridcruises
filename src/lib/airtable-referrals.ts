// Airtable helpers for the Referrals table in the House Intelligence Hub base.
// The base is the same one used by the client portal (applSFcQkOus2fFsx).
// We reference the table by name so a new "Referrals" table can be created
// in Airtable without needing field-ID reconciliation up front.

import { AIRTABLE_BASE } from './portal-airtable'

const REFERRALS_TABLE = 'Referrals'

export interface ReferralPartnerInput {
  name: string
  email: string
  instagram?: string
  tiktok?: string
  youtube?: string
  other_handle?: string
  primary_platform: string
  audience_size: string
  niche: string
  why_partner: string
  referral_code: string
  referral_url: string
}

export interface ReferralLeadInput {
  referral_code: string
  lead_name?: string
  lead_email?: string
  lead_source?: string
  // free-form notes about the conversion (e.g. "Concierge form submission")
  notes?: string
}

function airtableUrl(table: string): string {
  return `https://api.airtable.com/v0/${AIRTABLE_BASE}/${encodeURIComponent(table)}`
}

async function airtablePost(
  table: string,
  fields: Record<string, unknown>,
  apiKey: string,
): Promise<{ id: string } | null> {
  const res = await fetch(airtableUrl(table), {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fields, typecast: true }),
  })
  if (!res.ok) {
    const text = await res.text()
    console.error(`[airtable-referrals] ${table} ${res.status}: ${text}`)
    return null
  }
  const data = (await res.json()) as { id?: string }
  return data.id ? { id: data.id } : null
}

export async function createReferralPartner(
  input: ReferralPartnerInput,
  apiKey: string,
): Promise<{ id: string } | null> {
  return airtablePost(
    REFERRALS_TABLE,
    {
      Name: input.name,
      Email: input.email,
      Instagram: input.instagram ?? '',
      TikTok: input.tiktok ?? '',
      YouTube: input.youtube ?? '',
      'Other Handle': input.other_handle ?? '',
      'Primary Platform': input.primary_platform,
      'Audience Size': input.audience_size,
      Niche: input.niche,
      'Why Partner': input.why_partner,
      'Referral Code': input.referral_code,
      'Referral URL': input.referral_url,
      Status: 'Pending Review',
      'Submitted At': new Date().toISOString(),
    },
    apiKey,
  )
}

export async function logReferralLead(
  input: ReferralLeadInput,
  apiKey: string,
): Promise<{ id: string } | null> {
  // Logged into a separate "Referral Leads" table so partner records stay clean.
  return airtablePost(
    'Referral Leads',
    {
      'Referral Code': input.referral_code,
      'Lead Name': input.lead_name ?? '',
      'Lead Email': input.lead_email ?? '',
      Source: input.lead_source ?? '',
      Notes: input.notes ?? '',
      'Captured At': new Date().toISOString(),
    },
    apiKey,
  )
}

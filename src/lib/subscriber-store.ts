// Durable newsletter / deal-alert subscriber store, backed by Airtable.
//
// This replaces the in-memory array that used to live in
// src/app/api/subscribe/route.ts. That array was wiped on every redeploy and
// on every serverless cold start, so the list the digest and drip crons read
// was effectively always empty.
//
// Airtable (rather than Supabase) because it's the store this codebase already
// runs on in production: the client portal, the leads CRM and the referral
// program all read and write the same base with AIRTABLE_API_KEY. Grayson also
// works the list by hand there.
//
// Required table — name it "Subscribers" (or set AIRTABLE_SUBSCRIBERS_TABLE):
//
//   Email               single line text   (the dedupe key)
//   Name                single line text
//   Source              single line text    e.g. "newsletter-signup-inline"
//   Status              single select       "Active" | "Unsubscribed"
//   Subscribed At       date (with time) or single line text (ISO 8601)
//   Unsubscribe Token   single line text   (opaque token used in email footers)
//   Preferences         long text          (JSON blob of the signup payload)
//   Drip Stage          single select      "" | "Welcome Sent" | "Day 3 Sent" | "Completed"
//   Last Email Sent     date (with time) or single line text
//   Last Digest Sent    date (with time) or single line text
//   Last Alert Sailing  single line text   (dedupes repeat deal alerts)
//   Unsubscribed At     date (with time) or single line text
//
// Only Email is strictly required: writes use typecast, and a field the base
// doesn't have yet is dropped with a warning rather than failing the signup
// (see airtable-client.ts).

import {
  createRecord,
  escapeFormulaValue,
  findFirstRecord,
  getAirtableKey,
  listRecords,
  updateRecord,
  type AirtableRecord,
} from './airtable-client'

export const SUBSCRIBERS_TABLE = process.env.AIRTABLE_SUBSCRIBERS_TABLE?.trim() || 'Subscribers'

export const SUBSCRIBER_FIELDS = {
  email: 'Email',
  name: 'Name',
  source: 'Source',
  status: 'Status',
  subscribedAt: 'Subscribed At',
  unsubscribeToken: 'Unsubscribe Token',
  preferences: 'Preferences',
  dripStage: 'Drip Stage',
  lastEmailSent: 'Last Email Sent',
  lastDigestSent: 'Last Digest Sent',
  lastAlertSailing: 'Last Alert Sailing',
  unsubscribedAt: 'Unsubscribed At',
} as const

export const STATUS_ACTIVE = 'Active'
export const STATUS_UNSUBSCRIBED = 'Unsubscribed'

export type DripStage = '' | 'Welcome Sent' | 'Day 3 Sent' | 'Completed'

export interface Subscriber {
  id: string
  email: string
  name: string
  source: string
  status: string
  /** Kept for compatibility with the email templates' `confirmed` semantics. */
  confirmed: boolean
  unsubscribeToken: string
  createdAt: string
  dripStage: DripStage
  lastDigestSent: string
  lastAlertSailing: string
  preferences: Record<string, unknown>
}

export interface SubscriberInput {
  email: string
  name?: string
  source?: string
  preferences?: Record<string, unknown>
}

export type UpsertOutcome = 'created' | 'reactivated' | 'existing'

export class SubscriberStoreNotConfiguredError extends Error {
  constructor() {
    super('AIRTABLE_API_KEY is not set — subscribers cannot be persisted')
    this.name = 'SubscriberStoreNotConfiguredError'
  }
}

export function isSubscriberStoreConfigured(): boolean {
  return getAirtableKey() !== null
}

function requireKey(): string {
  const key = getAirtableKey()
  if (!key) throw new SubscriberStoreNotConfiguredError()
  return key
}

function str(value: unknown): string {
  if (value === null || value === undefined) return ''
  return String(value)
}

function parsePreferences(value: unknown): Record<string, unknown> {
  if (value && typeof value === 'object') return value as Record<string, unknown>
  if (typeof value !== 'string' || !value.trim()) return {}
  try {
    const parsed = JSON.parse(value)
    return parsed && typeof parsed === 'object' ? (parsed as Record<string, unknown>) : {}
  } catch {
    return {}
  }
}

function shape(record: AirtableRecord): Subscriber {
  const f = record.fields
  const status = str(f[SUBSCRIBER_FIELDS.status]) || STATUS_ACTIVE
  return {
    id: record.id,
    email: str(f[SUBSCRIBER_FIELDS.email]).trim().toLowerCase(),
    name: str(f[SUBSCRIBER_FIELDS.name]),
    source: str(f[SUBSCRIBER_FIELDS.source]),
    status,
    confirmed: status === STATUS_ACTIVE,
    unsubscribeToken: str(f[SUBSCRIBER_FIELDS.unsubscribeToken]),
    createdAt: str(f[SUBSCRIBER_FIELDS.subscribedAt]) || str(record.createdTime),
    dripStage: (str(f[SUBSCRIBER_FIELDS.dripStage]) || '') as DripStage,
    lastDigestSent: str(f[SUBSCRIBER_FIELDS.lastDigestSent]),
    lastAlertSailing: str(f[SUBSCRIBER_FIELDS.lastAlertSailing]),
    preferences: parsePreferences(f[SUBSCRIBER_FIELDS.preferences]),
  }
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase()
}

export async function findSubscriberByEmail(email: string): Promise<Subscriber | null> {
  const key = requireKey()
  const formula = `LOWER({${SUBSCRIBER_FIELDS.email}})="${escapeFormulaValue(normalizeEmail(email))}"`
  const record = await findFirstRecord(SUBSCRIBERS_TABLE, formula, key)
  return record ? shape(record) : null
}

export async function findSubscriberByToken(token: string): Promise<Subscriber | null> {
  const key = requireKey()
  const formula = `{${SUBSCRIBER_FIELDS.unsubscribeToken}}="${escapeFormulaValue(token)}"`
  const record = await findFirstRecord(SUBSCRIBERS_TABLE, formula, key)
  return record ? shape(record) : null
}

/**
 * Every subscriber eligible to receive mail, de-duplicated by email address.
 *
 * Airtable has no unique constraint, so two signups landing in the same second
 * can both create a row. De-duplicating on read guarantees nobody gets the same
 * digest twice even if that happens.
 */
export async function listActiveSubscribers(): Promise<Subscriber[]> {
  const key = requireKey()
  const formula = `AND({${SUBSCRIBER_FIELDS.email}}!="",{${SUBSCRIBER_FIELDS.status}}!="${STATUS_UNSUBSCRIBED}")`
  const records = await listRecords(SUBSCRIBERS_TABLE, { filterByFormula: formula }, key)

  const byEmail = new Map<string, Subscriber>()
  for (const record of records) {
    const subscriber = shape(record)
    if (!subscriber.email) continue
    if (!byEmail.has(subscriber.email)) byEmail.set(subscriber.email, subscriber)
  }
  return [...byEmail.values()]
}

/**
 * Idempotent signup. An address already on the list is never duplicated:
 *  - active already      → 'existing', nothing written
 *  - previously opted out → 'reactivated', status flipped back to Active
 *  - unknown             → 'created'
 */
export async function upsertSubscriber(
  input: SubscriberInput,
): Promise<{ subscriber: Subscriber; outcome: UpsertOutcome }> {
  const key = requireKey()
  const email = normalizeEmail(input.email)
  const now = new Date().toISOString()

  const existing = await findSubscriberByEmail(email)

  if (existing && existing.status !== STATUS_UNSUBSCRIBED) {
    return { subscriber: existing, outcome: 'existing' }
  }

  if (existing) {
    // Re-signup after an unsubscribe is fresh consent — reopen the record
    // rather than creating a second row for the same address.
    const token = existing.unsubscribeToken || crypto.randomUUID()
    const updated = await updateRecord(
      SUBSCRIBERS_TABLE,
      existing.id,
      {
        [SUBSCRIBER_FIELDS.status]: STATUS_ACTIVE,
        [SUBSCRIBER_FIELDS.subscribedAt]: now,
        [SUBSCRIBER_FIELDS.unsubscribeToken]: token,
        [SUBSCRIBER_FIELDS.dripStage]: '',
        [SUBSCRIBER_FIELDS.unsubscribedAt]: '',
        ...(input.name ? { [SUBSCRIBER_FIELDS.name]: input.name } : {}),
        ...(input.source ? { [SUBSCRIBER_FIELDS.source]: input.source } : {}),
      },
      key,
      'subscribers.reactivate',
    )
    return { subscriber: shape(updated), outcome: 'reactivated' }
  }

  const created = await createRecord(
    SUBSCRIBERS_TABLE,
    {
      [SUBSCRIBER_FIELDS.email]: email,
      [SUBSCRIBER_FIELDS.name]: input.name ?? '',
      [SUBSCRIBER_FIELDS.source]: input.source ?? '',
      [SUBSCRIBER_FIELDS.status]: STATUS_ACTIVE,
      [SUBSCRIBER_FIELDS.subscribedAt]: now,
      [SUBSCRIBER_FIELDS.unsubscribeToken]: crypto.randomUUID(),
      [SUBSCRIBER_FIELDS.preferences]: JSON.stringify(input.preferences ?? {}),
      [SUBSCRIBER_FIELDS.dripStage]: '',
    },
    key,
    'subscribers.create',
  )
  return { subscriber: shape(created), outcome: 'created' }
}

export async function markSubscriberEmailed(
  id: string,
  updates: {
    dripStage?: DripStage
    digestSentAt?: string
    alertSailingId?: string
  },
): Promise<void> {
  const key = requireKey()
  const now = new Date().toISOString()
  const fields: Record<string, unknown> = { [SUBSCRIBER_FIELDS.lastEmailSent]: now }

  if (updates.dripStage !== undefined) fields[SUBSCRIBER_FIELDS.dripStage] = updates.dripStage
  if (updates.digestSentAt !== undefined) {
    fields[SUBSCRIBER_FIELDS.lastDigestSent] = updates.digestSentAt
  }
  if (updates.alertSailingId !== undefined) {
    fields[SUBSCRIBER_FIELDS.lastAlertSailing] = updates.alertSailingId
  }

  await updateRecord(SUBSCRIBERS_TABLE, id, fields, key, 'subscribers.mark-sent')
}

/** Opt out by unsubscribe token or by email. Returns true if a record changed. */
export async function unsubscribeSubscriber(params: {
  token?: string
  email?: string
}): Promise<boolean> {
  const key = requireKey()

  const subscriber = params.token
    ? await findSubscriberByToken(params.token)
    : params.email
      ? await findSubscriberByEmail(params.email)
      : null

  if (!subscriber) return false
  if (subscriber.status === STATUS_UNSUBSCRIBED) return true

  await updateRecord(
    SUBSCRIBERS_TABLE,
    subscriber.id,
    {
      [SUBSCRIBER_FIELDS.status]: STATUS_UNSUBSCRIBED,
      [SUBSCRIBER_FIELDS.unsubscribedAt]: new Date().toISOString(),
    },
    key,
    'subscribers.unsubscribe',
  )
  return true
}

export function daysSince(isoDate: string): number {
  const ts = new Date(isoDate).getTime()
  if (!Number.isFinite(ts)) return 0
  return Math.floor((Date.now() - ts) / 86_400_000)
}

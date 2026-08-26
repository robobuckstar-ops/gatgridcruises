// The SMS conversation store: one Airtable row per text, threaded by contact.
//
// Fields are addressed by NAME rather than field ID because this table is
// created by hand in the GatGrid base (see docs/SMS_INBOX_SETUP.md) — there are
// no stable IDs to hard-code yet. The shared Airtable client drops any column
// the base doesn't have and keeps the write, so a partially-built table still
// captures the message body instead of losing the text entirely.

import {
  createRecord,
  escapeFormulaValue,
  getAirtableKey,
  listRecords,
  updateRecord,
  type AirtableRecord,
} from './airtable-client'
import { CLIENTS_TABLE, CLIENT_FIELDS } from './portal-airtable'
import { LEADS_TABLE, LEAD_FIELDS } from './airtable-leads'
import { normalizePhone, phoneDigits, formatPhoneDisplay } from './twilio'

/** Table name in base applSFcQkOus2fFsx. Override once it has a stable ID. */
export const MESSAGES_TABLE = process.env.AIRTABLE_MESSAGES_TABLE?.trim() || 'Messages'

export const MESSAGE_FIELDS = {
  from: 'From',
  to: 'To',
  body: 'Body',
  direction: 'Direction',
  timestamp: 'Timestamp',
  contactName: 'ContactName',
  conversationId: 'ConversationId',
  status: 'Status',
  readyToBook: 'ReadyToBook',
  // Which channel the touch came in on. Optional column: if the base doesn't
  // have it yet, the shared client drops it and still writes the row, so a text
  // and a call land in the same thread even before the column is added.
  channel: 'Channel',
} as const

export type Direction = 'inbound' | 'outbound'

/** The channel a message came in on. Texts default to SMS when unset. */
export type Channel = 'SMS' | 'Voice' | 'Email'

/** Inbound rows carry read state; outbound rows carry delivery state. */
export type MessageStatus = 'Unread' | 'Read' | 'Sent' | 'Failed'

export interface StoredMessage {
  id: string
  conversationId: string
  from: string
  to: string
  body: string
  direction: Direction
  timestamp: string
  contactName: string
  status: MessageStatus
  readyToBook: boolean
}

export interface SaveMessageInput {
  from: string
  to: string
  body: string
  direction: Direction
  contactName?: string
  status?: MessageStatus
  /** Defaults to now; Twilio doesn't send a usable send-time in the webhook. */
  timestamp?: string
  /** SMS when unset. Voice and Email land in the same per-contact thread. */
  channel?: Channel
}

export function isMessageStoreConfigured(): boolean {
  return getAirtableKey() !== null
}

/**
 * Phrases that mean "I'm ready to give you money". Deliberately anchored with
 * word boundaries — a bare "book" substring would flag "Facebook", and "pay"
 * would flag "paying attention". False positives here cost Grayson a wasted
 * look at a highlighted thread, so the list stays tight rather than clever.
 */
const BOOKING_INTENT_PATTERNS: RegExp[] = [
  /\bbook(ing|ed)?\b/i,
  /\bdeposit\b/i,
  /\bready\b/i,
  /\blet'?s do it\b/i,
  /\bhow (do|can) i pay\b/i,
  /\bhow do we pay\b/i,
  /\bsend (me )?(the )?(invoice|payment|link)\b/i,
  /\b(pay|paying) (the )?(deposit|now|today|in full)\b/i,
  /\bsign (me|us) up\b/i,
  /\b(reserve|hold) (it|the|our|my|that)\b/i,
  /\block (it|this|that) in\b/i,
  /\bi'?m in\b/i,
]

/** True when an inbound text reads like booking intent worth surfacing. */
export function hasBookingIntent(body: string): boolean {
  const text = (body ?? '').trim()
  if (!text) return false
  return BOOKING_INTENT_PATTERNS.some(pattern => pattern.test(text))
}

/** The thread key: the contact's number in E.164, never the business line. */
export function conversationIdFor(direction: Direction, from: string, to: string): string {
  return normalizePhone(direction === 'inbound' ? from : to)
}

function toStoredMessage(record: AirtableRecord): StoredMessage {
  const f = record.fields as Record<string, unknown>
  const str = (key: string): string => {
    const value = f[key]
    return typeof value === 'string' ? value : value == null ? '' : String(value)
  }

  const direction: Direction = str(MESSAGE_FIELDS.direction).toLowerCase() === 'outbound'
    ? 'outbound'
    : 'inbound'
  const body = str(MESSAGE_FIELDS.body)
  const from = str(MESSAGE_FIELDS.from)
  const to = str(MESSAGE_FIELDS.to)

  return {
    id: record.id,
    // Fall back to deriving the thread key so rows written before the column
    // existed (dropped by the field-fallback path) still group correctly.
    conversationId:
      normalizePhone(str(MESSAGE_FIELDS.conversationId)) || conversationIdFor(direction, from, to),
    from,
    to,
    body,
    direction,
    timestamp: str(MESSAGE_FIELDS.timestamp) || record.createdTime || '',
    contactName: str(MESSAGE_FIELDS.contactName),
    status: (str(MESSAGE_FIELDS.status) as MessageStatus) || (direction === 'inbound' ? 'Unread' : 'Sent'),
    // Recomputed from the body when the column is absent, so the inbox can
    // still highlight the thread before the field is added to the base.
    readyToBook:
      f[MESSAGE_FIELDS.readyToBook] === true ||
      (f[MESSAGE_FIELDS.readyToBook] === undefined && direction === 'inbound' && hasBookingIntent(body)),
  }
}

export async function saveMessage(input: SaveMessageInput): Promise<StoredMessage | null> {
  const apiKey = getAirtableKey()
  if (!apiKey) {
    console.error('[messages] AIRTABLE_API_KEY not set — text not written to the Messages table')
    return null
  }

  const from = normalizePhone(input.from)
  const to = normalizePhone(input.to)
  const conversationId = conversationIdFor(input.direction, from, to)
  const readyToBook = input.direction === 'inbound' && hasBookingIntent(input.body)

  const fields: Record<string, unknown> = {
    [MESSAGE_FIELDS.from]: from,
    [MESSAGE_FIELDS.to]: to,
    [MESSAGE_FIELDS.body]: input.body,
    [MESSAGE_FIELDS.direction]: input.direction,
    [MESSAGE_FIELDS.timestamp]: input.timestamp || new Date().toISOString(),
    [MESSAGE_FIELDS.conversationId]: conversationId,
    [MESSAGE_FIELDS.status]: input.status || (input.direction === 'inbound' ? 'Unread' : 'Sent'),
    [MESSAGE_FIELDS.readyToBook]: readyToBook,
    [MESSAGE_FIELDS.channel]: input.channel || 'SMS',
  }
  if (input.contactName) fields[MESSAGE_FIELDS.contactName] = input.contactName

  const record = await createRecord(MESSAGES_TABLE, fields, apiKey, 'messages.create')
  return toStoredMessage(record)
}

/** Never let the message log break the send or the webhook response. */
export async function saveMessageSafely(input: SaveMessageInput): Promise<StoredMessage | null> {
  try {
    return await saveMessage(input)
  } catch (err) {
    console.error('[messages] failed to write message to Airtable:', err)
    return null
  }
}

/**
 * Most recent messages across every thread, newest first. One read serves the
 * whole inbox — SMS volume here is low enough that paging per-thread would cost
 * more Airtable calls than it saves.
 */
export async function listRecentMessages(limit = 500): Promise<StoredMessage[]> {
  const apiKey = getAirtableKey()
  if (!apiKey) return []

  let records: AirtableRecord[]
  try {
    records = await listRecords(
      MESSAGES_TABLE,
      { maxRecords: limit, sort: [{ field: MESSAGE_FIELDS.timestamp, direction: 'desc' }] },
      apiKey,
    )
  } catch (err) {
    // A base without the Timestamp column rejects the sort with a 422. Read
    // unsorted and order in memory rather than showing an empty inbox.
    console.warn('[messages] sorted read failed, falling back to unsorted:', err)
    records = await listRecords(MESSAGES_TABLE, { maxRecords: limit }, apiKey)
  }

  return records
    .map(toStoredMessage)
    .sort((a, b) => (b.timestamp || '').localeCompare(a.timestamp || ''))
}

export interface Conversation {
  conversationId: string
  phone: string
  displayPhone: string
  contactName: string
  messages: StoredMessage[]
  lastMessage: string
  lastTimestamp: string
  lastDirection: Direction
  unreadCount: number
  readyToBook: boolean
}

/** Group a flat message list into threads, newest thread first. */
export function buildConversations(messages: StoredMessage[]): Conversation[] {
  const threads = new Map<string, StoredMessage[]>()

  for (const message of messages) {
    const key = message.conversationId
    if (!key) continue
    const existing = threads.get(key)
    if (existing) existing.push(message)
    else threads.set(key, [message])
  }

  const conversations: Conversation[] = []

  for (const [conversationId, thread] of threads) {
    // Oldest first inside a thread so the chat pane reads top to bottom.
    const ordered = [...thread].sort((a, b) => (a.timestamp || '').localeCompare(b.timestamp || ''))
    const latest = ordered[ordered.length - 1]
    // The newest name wins: a contact matched to the CRM after their first
    // text shouldn't leave the thread stuck on the bare phone number.
    const named = [...ordered].reverse().find(m => m.contactName)

    conversations.push({
      conversationId,
      phone: conversationId,
      displayPhone: formatPhoneDisplay(conversationId),
      contactName: named?.contactName || '',
      messages: ordered,
      lastMessage: latest?.body || '',
      lastTimestamp: latest?.timestamp || '',
      lastDirection: latest?.direction || 'inbound',
      unreadCount: ordered.filter(m => m.direction === 'inbound' && m.status === 'Unread').length,
      readyToBook: ordered.some(m => m.direction === 'inbound' && m.readyToBook),
    })
  }

  return conversations.sort((a, b) => (b.lastTimestamp || '').localeCompare(a.lastTimestamp || ''))
}

/** Clear the unread badge for one thread. Returns how many rows were touched. */
export async function markThreadRead(conversationId: string): Promise<number> {
  const apiKey = getAirtableKey()
  if (!apiKey) return 0

  const phone = normalizePhone(conversationId)
  if (!phone) return 0

  const filter = `AND({${MESSAGE_FIELDS.conversationId}}="${escapeFormulaValue(phone)}", {${MESSAGE_FIELDS.status}}="Unread")`
  const unread = await listRecords(MESSAGES_TABLE, { filterByFormula: filter, maxRecords: 100 }, apiKey)

  let updated = 0
  for (const record of unread) {
    try {
      await updateRecord(MESSAGES_TABLE, record.id, { [MESSAGE_FIELDS.status]: 'Read' }, apiKey, 'messages.read')
      updated++
    } catch (err) {
      console.error('[messages] could not mark message read:', err)
    }
  }
  return updated
}

/**
 * Best-effort name for an unknown number: check the CRM leads table, then the
 * portal clients table. Phones are stored free-form ("(405) 526-4956",
 * "405.526.4956"), so match on the last ten digits of a stripped copy of the
 * column rather than on an exact string.
 */
export async function lookupContactName(phone: string): Promise<string> {
  const apiKey = getAirtableKey()
  const digits = phoneDigits(phone)
  if (!apiKey || digits.length !== 10) return ''

  const stripped = (field: string) =>
    `SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE({${field}},"-","")," ",""),"(",""),")",""),".",""),"+","")`

  const sources: { table: string; phoneField: string; nameKeys: string[]; label: string }[] = [
    {
      table: LEADS_TABLE,
      phoneField: 'Phone',
      // Airtable keys read responses by column name, but the rest of this
      // codebase addresses these tables by field ID — accept either, plus the
      // obvious human names, so a rename in the base can't silently drop the
      // contact name from the inbox.
      nameKeys: [LEAD_FIELDS.leadName, 'Lead Name', 'Name', 'Full Name'],
      label: 'leads',
    },
    {
      table: CLIENTS_TABLE,
      phoneField: 'Phone',
      nameKeys: [CLIENT_FIELDS.name, 'Name', 'Client Name', 'Full Name'],
      label: 'clients',
    },
  ]

  for (const source of sources) {
    try {
      const records = await listRecords(
        source.table,
        {
          filterByFormula: `FIND("${escapeFormulaValue(digits)}", ${stripped(source.phoneField)}) > 0`,
          maxRecords: 1,
        },
        apiKey,
      )
      const fields = records[0]?.fields ?? {}
      for (const key of source.nameKeys) {
        const name = fields[key]
        if (typeof name === 'string' && name.trim()) return name.trim()
      }
    } catch (err) {
      // A base without a Phone column on that table throws 422 — that's a
      // missing-match, not an error worth failing the inbound message over.
      console.warn(`[messages] contact lookup against ${source.label} failed:`, err)
    }
  }

  return ''
}

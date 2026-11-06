// The automatic "your cruise details" email a lead gets right after submitting
// the inquiry, quote or transfer form. It is AI-prepared and says so; Grayson
// reviews the request and follows up personally.
//
// Hard rules: no fares, no guarantees, no Disney branding or affiliation claims.
// OBC comes only from getOBC, and is always labeled an estimate.

import { getSailingById, getSailings } from './data'
import { formatUSD, getOBC } from './obc'
import { sendLifecycleEmail } from './send-email'
import { leadFirstName } from './lead-autotext'
import type { Sailing } from '@/types/database'

export const LEAD_DETAILS_SUBJECT = 'Your Disney cruise details from GatGrid Cruises'
export const LEAD_DETAILS_DISCLOSURE =
  'This email was prepared by our AI assistant. Grayson will personally review your request midday on a weekday and follow up.'
const REPLY_TO = 'bookings@gatgridcruises.com'
const MAX_MATCHES = 3
const US_COUNTRY = 'USA'

export interface LeadDetailsInput {
  name: string
  /** A sailing the lead picked on the site. */
  sailingId?: string
  /** Fallback details for a picked sailing that is not in the catalog. */
  shipName?: string
  sailDate?: string
  itineraryName?: string
  lengthNights?: number
  listedFare?: number
  /** Free text such as "Disney Wish, Bahamas". */
  interest?: string
  /** /book "Preferred Ship" value, e.g. "wish", or "any". */
  ship?: string
  /** /book "Preferred Destination" value, e.g. "caribbean-east", or "any". */
  destination?: string
  /** Inclusive YYYY-MM-DD travel window. */
  windowStart?: string
  windowEnd?: string
  /** Transfers earn the reduced OBC rate, per the OBC policy in obc.ts. */
  transfer?: boolean
}

export interface LeadSailingCard {
  ship: string
  dates: string
  nights?: number
  itinerary: string
  ports: string[]
  obcEstimate: number | null
}

export interface LeadSailingSelection {
  /** True when these are the sailing(s) the lead named, not suggestions. */
  requested: boolean
  cards: LeadSailingCard[]
}

const DESTINATION_REGIONS: Record<string, string[]> = {
  bahamas: ['bahamas'],
  'caribbean-east': ['caribbean'],
  'caribbean-west': ['caribbean'],
  alaska: ['alaska'],
  europe: ['europe', 'mediterranean'],
  hawaii: ['pacific'],
  mexico: ['pacific'],
  transatlantic: ['transatlantic'],
}

function formatDay(iso: string): string {
  return new Date(`${iso.slice(0, 10)}T12:00:00Z`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

function addDays(iso: string, days: number): string {
  const d = new Date(`${iso.slice(0, 10)}T12:00:00Z`)
  d.setUTCDate(d.getUTCDate() + days)
  return d.toISOString().slice(0, 10)
}

function toCard(s: Sailing, transfer: boolean): LeadSailingCard {
  const ports = (s.itinerary_details ?? [])
    .map((d) => d.port)
    .filter((p) => p && !/at sea/i.test(p))
  return {
    ship: s.ship?.name ?? 'Disney cruise',
    dates: `${formatDay(s.sail_date)} to ${formatDay(addDays(s.sail_date, s.length_nights))}`,
    nights: s.length_nights,
    itinerary: s.itinerary_name,
    ports: [...new Set(ports)],
    obcEstimate: s.current_lowest_price > 0 ? getOBC(s.current_lowest_price, { placeholder: transfer }) : null,
  }
}

function mentionsShip(text: string, s: Sailing): boolean {
  const full = s.ship?.name?.toLowerCase()
  if (!full) return false
  return text.includes(full) || text.includes(full.replace(/^disney\s+/, ''))
}

/** Whole-window sort key: the closest sailings to the date asked for come first. */
function byDistanceFrom(iso: string) {
  const target = Date.parse(`${iso}T12:00:00Z`)
  return (a: Sailing, b: Sailing) =>
    Math.abs(Date.parse(`${a.sail_date.slice(0, 10)}T12:00:00Z`) - target) -
    Math.abs(Date.parse(`${b.sail_date.slice(0, 10)}T12:00:00Z`) - target)
}

/** Vary the ships so three suggestions are not three runs of one itinerary. */
function pickVaried(list: Sailing[]): Sailing[] {
  const picked: Sailing[] = []
  const seen = new Set<string>()
  for (const s of list) {
    if (picked.length === MAX_MATCHES) return picked
    if (!seen.has(s.ship_id)) {
      seen.add(s.ship_id)
      picked.push(s)
    }
  }
  for (const s of list) {
    if (picked.length === MAX_MATCHES) break
    if (!picked.includes(s)) picked.push(s)
  }
  return picked
}

/** What the lead asked about, or else 2–3 upcoming sailings that fit. */
export function selectLeadSailings(input: LeadDetailsInput): LeadSailingSelection {
  const transfer = Boolean(input.transfer)
  const picked = input.sailingId ? getSailingById(input.sailingId) : undefined
  if (picked) return { requested: true, cards: [toCard(picked, transfer)] }

  if (input.shipName && input.sailDate) {
    return {
      requested: true,
      cards: [
        {
          ship: input.shipName,
          dates: input.sailDate,
          nights: input.lengthNights,
          itinerary: input.itineraryName ?? 'Sailing you asked about',
          ports: [],
          obcEstimate: input.listedFare ? getOBC(input.listedFare, { placeholder: transfer }) : null,
        },
      ],
    }
  }

  const all = [...getSailings()].sort((a, b) => a.sail_date.localeCompare(b.sail_date))
  const interest = (input.interest ?? '').toLowerCase()
  const shipWord = input.ship && input.ship !== 'any' ? input.ship.toLowerCase() : ''
  const regions = input.destination ? DESTINATION_REGIONS[input.destination] : undefined

  const inWindow = all.filter((s) => {
    const d = s.sail_date.slice(0, 10)
    return (!input.windowStart || d >= input.windowStart) && (!input.windowEnd || d <= input.windowEnd)
  })

  // Narrow one preference at a time, and stop narrowing the moment a filter
  // would leave nothing: a loose match beats an email with no sailings in it.
  let pool = inWindow.length ? inWindow : all
  const narrow = (test: (s: Sailing) => boolean) => {
    const next = pool.filter(test)
    if (next.length) pool = next
    return next.length > 0
  }
  let namedShip = false
  if (shipWord) namedShip = narrow((s) => mentionsShip(shipWord, s) || (s.ship?.slug ?? '').endsWith(shipWord))
  if (interest) namedShip = narrow((s) => mentionsShip(interest, s)) || namedShip
  if (regions) narrow((s) => Boolean(s.region && regions.includes(s.region)))
  if (interest && !namedShip) {
    narrow((s) => {
      const name = s.itinerary_name.toLowerCase()
      return interest.split(/[^a-z]+/).some((w) => w.length > 4 && name.includes(w))
    })
  }

  // Nothing narrowed it by date: skip sailings too soon to plan, and overseas
  // short runs, so a default suggestion is one most leads could actually take.
  if (!input.windowStart && !input.windowEnd && !namedShip && !regions) {
    const soonest = addDays(new Date().toISOString().slice(0, 10), 45)
    narrow((s) => s.sail_date.slice(0, 10) >= soonest && s.departure_port?.country === US_COUNTRY)
  }

  if (input.windowStart && input.windowStart === input.windowEnd) {
    pool = [...pool].sort(byDistanceFrom(input.windowStart))
  }
  const chosen = namedShip ? pool.slice(0, MAX_MATCHES) : pickVaried(pool)
  return { requested: false, cards: chosen.map((s) => toCard(s, transfer)) }
}

/** Turn the /free-quote timeframe option into a travel window. */
export function windowFromTimeframe(
  timeframe: string,
  today: string = new Date().toISOString().slice(0, 10),
): { windowStart?: string; windowEnd?: string } {
  const t = timeframe.toLowerCase()
  if (t.startsWith('next 3')) return { windowStart: today, windowEnd: addDays(today, 92) }
  if (t.startsWith('3')) return { windowStart: addDays(today, 92), windowEnd: addDays(today, 183) }
  if (t.startsWith('6')) return { windowStart: addDays(today, 183), windowEnd: addDays(today, 366) }
  if (t.startsWith('more')) return { windowStart: addDays(today, 366) }
  return {}
}

function esc(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

const TIPS: { text: string; href: string; label: string }[] = [
  {
    text: 'Meals, soft drinks, kids’ clubs and entertainment are in the fare. Specialty dining, spa, alcohol, internet and Port Adventures are not.',
    href: 'https://gatgridcruises.com/guides/first-time-disney-cruise-tips',
    label: 'First-time tips',
  },
  {
    text: 'Put your final payment date on the calendar the day you book. Deposits that are refundable one week may not be the next.',
    href: 'https://gatgridcruises.com/guides/best-time-to-book-disney-cruise',
    label: 'When to book',
  },
  {
    text: 'Fares move. A price drop before final payment can often be rebooked, so it pays to keep watching after you book.',
    href: 'https://gatgridcruises.com/guides/disney-cruise-cost-guide',
    label: 'Cost guide',
  },
]

function cardHtml(c: LeadSailingCard): string {
  const nights = c.nights ? ` (${c.nights} nights)` : ''
  const ports = c.ports.length
    ? `<p style="margin:0 0 4px;font-size:14px;color:#334155;"><strong>Ports:</strong> ${esc(c.ports.join(', '))}</p>`
    : ''
  const obc =
    c.obcEstimate !== null
      ? `<p style="margin:6px 0 0;font-size:14px;color:#1E3A5F;"><strong>Estimated onboard credit (estimate):</strong> about ${formatUSD(c.obcEstimate)}</p>`
      : ''
  return `<div style="border:1px solid #E2E8F0;border-radius:8px;padding:14px 16px;margin:0 0 12px;">
<p style="margin:0 0 4px;font-size:16px;font-weight:bold;color:#1E3A5F;">${esc(c.ship)}</p>
<p style="margin:0 0 4px;font-size:14px;color:#334155;"><strong>Dates:</strong> ${esc(c.dates)}${nights}</p>
<p style="margin:0 0 4px;font-size:14px;color:#334155;"><strong>Itinerary:</strong> ${esc(c.itinerary)}</p>
${ports}${obc}
</div>`
}

export function buildLeadDetailsEmail(input: LeadDetailsInput): string {
  const { requested, cards } = selectLeadSailings(input)
  const intro = requested
    ? 'Thanks for reaching out to GatGrid Cruises. Here are the details on the sailing you asked about.'
    : input.transfer
      ? 'Thanks for reaching out to GatGrid Cruises. Here are a few sailings around your date. Grayson will confirm your exact booking.'
      : 'Thanks for reaching out to GatGrid Cruises. Here are a few upcoming sailings that may fit what you told us.'
  const tips = TIPS.map(
    (t) =>
      `<li style="margin:0 0 8px;">${esc(t.text)} <a href="${t.href}" style="color:#1E3A5F;">${esc(t.label)}</a></li>`,
  ).join('')
  return `<!DOCTYPE html>
<html><body style="margin:0;background:#F1F5F9;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F1F5F9;padding:24px 12px;"><tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#FFFFFF;border-radius:10px;overflow:hidden;">
<tr><td style="background:#1E3A5F;padding:18px 24px;color:#D4AF37;font-family:Georgia,serif;font-size:20px;font-weight:bold;">GatGrid Cruises</td></tr>
<tr><td style="padding:24px;font-size:15px;color:#334155;line-height:1.6;">
<p style="margin:0 0 14px;">Hi ${esc(leadFirstName(input.name))},</p>
<p style="margin:0 0 16px;">${esc(intro)}</p>
${cards.map(cardHtml).join('\n')}
<p style="margin:0 0 18px;font-size:12px;color:#64748B;">Onboard credit figures are estimates based on current listed fares, not a guarantee. Any actual amount is confirmed in writing at booking. Availability changes often.</p>
<p style="margin:0 0 8px;font-weight:bold;color:#1E3A5F;">A few quick tips</p>
<ul style="margin:0 0 18px;padding-left:20px;font-size:14px;">${tips}</ul>
<p style="margin:0 0 18px;"><strong>Already have a quote? Reply with it</strong> and we&#39;ll take a look.</p>
<p style="margin:0;padding-top:14px;border-top:1px solid #E2E8F0;font-size:13px;color:#64748B;">${esc(LEAD_DETAILS_DISCLOSURE)}</p>
</td></tr></table>
</td></tr></table></body></html>`
}

/** Best effort: a failure here logs and never fails the lead's submission. */
export async function sendLeadDetailsEmail(to: string, input: LeadDetailsInput): Promise<boolean> {
  try {
    await sendLifecycleEmail({
      to,
      subject: LEAD_DETAILS_SUBJECT,
      html: buildLeadDetailsEmail(input),
      fromName: 'GatGrid Cruises',
      replyTo: REPLY_TO,
    })
    return true
  } catch (err) {
    console.error('[lead-details-email] send failed:', err)
    return false
  }
}

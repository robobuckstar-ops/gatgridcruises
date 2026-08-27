// Post-booking milestone engine. One place that decides, for a given booking on
// a given day, which lifecycle touchpoints are due (welcome, check-in reminder,
// final-payment reminder, bon voyage, post-cruise follow-up, and the agent-only
// commission-submission reminder). The cron at /api/cron/booking-milestones
// runs this daily. Timing is tier-aware and every touchpoint is gated by a
// per-booking "sent" checkbox so nothing ever double-fires.

export const BOOKINGS_TABLE = 'tblOrV5YCbhg0Lbcw'
export const TOUCHPOINTS_TABLE = 'tbl264gZ3Pq5FxjUS'

export const BK = {
  bookingName: 'fldudzWVLJKexg3EX',
  client: 'fld6tu0nat2TiEgCZ',
  ship: 'fld5f1KYgrbiiTFjo',
  sailingDate: 'fldOqulAXwFKhz4o5',
  returnDate: 'fldKpg3IiPV6dVURb',
  itinerary: 'fldr3Gm7U8qGYkZ9L',
  phase: 'fldv7osctT7kB1QAI',
  penaltyDeadline: 'fldcVGjCoH5K7dEOe',
  commissionEstimated: 'fldc055RT4xllonhl',
  clientEmail: 'fldo5NBN0Vra8wgYj',
  castawayTier: 'fldaSGLS4BS7alE66',
  // Milestone "sent" flags
  welcomeSent: 'fldVwQzgzrv8mCywc',
  checkinSent: 'fld8c4r8GjX3MN8Ux',
  finalPaymentSent: 'fld8QcxEOrQuaUxPQ',
  bonVoyageSent: 'fld1Ua8DP6Db6SuCH',
  postCruiseSent: 'fldfMr8ahHz0VhBBc',
  commissionSent: 'fldQW82c6TnsjOJX6',
} as const

// Touchpoints table (audit log of every automated send).
export const TP = {
  name: 'fld19npnYFGUPAwiB',
  booking: 'fldRx4u6FeWfQh4Tv',
  triggerDay: 'fldhULBgoJKFO0j7k',
  sentAt: 'fldKeIy1Pej2r0sfu',
  contentPreview: 'fld0vS8vPerfo2DSH',
} as const

// 2026 Disney online check-in windows (days before sailing) by Castaway tier.
const CHECKIN_DAYS: Record<string, number> = {
  concierge: 40,
  pearl: 40,
  platinum: 38,
  gold: 35,
  silver: 33,
  'first-time': 30,
}
export function checkInDays(tier: string): number {
  return CHECKIN_DAYS[(tier || '').trim().toLowerCase()] ?? 30
}

// ─── Date helpers (all date-only, UTC-noon anchored to dodge TZ off-by-one) ───

export function todayIsoEastern(): string {
  // The business runs on Eastern; anchor "today" there so a milestone fires on
  // the intended calendar day regardless of server region.
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/New_York',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date())
}

function atNoon(iso: string): number {
  return new Date(`${iso}T12:00:00Z`).getTime()
}

/** Whole days from `fromIso` to `toIso` (positive = toIso is later). */
export function daysBetween(fromIso: string, toIso: string): number {
  return Math.round((atNoon(toIso) - atNoon(fromIso)) / 86_400_000)
}

export function addDaysIso(iso: string, days: number): string {
  const d = new Date(`${iso}T12:00:00Z`)
  d.setUTCDate(d.getUTCDate() + days)
  return d.toISOString().slice(0, 10)
}

function prettyDate(iso: string): string {
  if (!iso) return ''
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })
}

// ─── Email shell + templates ──────────────────────────────────────────────────

function shell(inner: string): string {
  return `<div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #0a1628; color: #ffffff; padding: 40px; border-radius: 12px;">
<div style="text-align:center; border-bottom: 2px solid #D4AF37; padding-bottom: 16px; margin-bottom: 20px;">
<h1 style="color:#D4AF37; margin:0;">GatGrid Cruises</h1>
<p style="color:#94a3b8; margin:5px 0 0;">Your Personal Disney Cruise Concierge</p>
</div>
${inner}
<p style="margin-top:28px; color:#94a3b8;">Talk soon,<br><strong style="color:#D4AF37;">Grayson Starbuck</strong><br>GatGrid Cruises<br><a href="https://gatgridcruises.com" style="color:#D4AF37;">gatgridcruises.com</a></p>
</div>`
}

const PORTAL = 'https://gatgridcruises.com/my-trip'

function welcomeHtml(first: string, ship: string): string {
  return shell(`<p>Hi ${first},</p>
<p>Your ${ship || 'Disney'} cruise is officially booked, and I could not be more excited to be your concierge for it. From here on, I'm keeping an eye on everything so you don't have to.</p>
<p>Your private trip dashboard is the best place to watch your countdown, add your passport and flight details, and see exactly when each booking window opens: <a href="${PORTAL}" style="color:#D4AF37;">${PORTAL}</a></p>
<p>If anything at all comes up between now and sail day, just reply or text me. That's what I'm here for.</p>`)
}

function checkinHtml(first: string, opensIso: string): string {
  return shell(`<p>Hi ${first},</p>
<p><strong style="color:#D4AF37;">Your online check-in opens ${prettyDate(opensIso)}.</strong> This is the one to jump on the moment it opens, right at midnight Eastern, because your boarding time and the best Castaway Cay and dining reservations go fast.</p>
<p>Log in through the Disney Cruise Line Navigator app or DisneyCruise.com, and have everyone's passport or travel-doc details handy. If you'd like, add them to your dashboard first and I'll double-check them: <a href="${PORTAL}" style="color:#D4AF37;">${PORTAL}</a></p>
<p>Want me to walk you through check-in when it opens? Just say the word.</p>`)
}

function finalPaymentHtml(first: string, dueIso: string): string {
  return shell(`<p>Hi ${first},</p>
<p>A friendly heads-up: your cruise's <strong style="color:#D4AF37;">final payment is due ${prettyDate(dueIso)}.</strong> After that date, standard cancellation penalties begin, so I want to make sure it never sneaks up on you.</p>
<p>If you're all set, no action needed. If you'd like to review the balance or talk through anything before then, just reply and we'll sort it out together.</p>`)
}

function bonVoyageHtml(first: string, ship: string): string {
  return shell(`<p>Hi ${first},</p>
<p><strong style="color:#D4AF37;">Tomorrow's the day!</strong> Your ${ship || 'Disney'} adventure begins, and I hope it's everything you've been counting down to.</p>
<p>Quick last checks: passports and check-in documents in your carry-on, arrival window confirmed, and luggage tags on. Then relax, you've earned it.</p>
<p>Have the most magical time. I'll be here when you're back.</p>`)
}

function postCruiseHtml(first: string): string {
  return shell(`<p>Hi ${first},</p>
<p>Welcome home! I hope your cruise was everything you dreamed and then some. I'd love to hear how it went.</p>
<p>Two small things, only if you're up for them. If we made your trip easier, a quick review means the world to a small business like mine. And if you know a family who'd love this, I'd be honored to take great care of them too, referrals are the best compliment I can get.</p>
<p>And whenever you're ready to start dreaming about the next one, you know where to find me.</p>`)
}

// ─── Milestone resolution ─────────────────────────────────────────────────────

export type Audience = 'client' | 'agent'

export interface DueMilestone {
  key: string
  audience: Audience
  flagField: string
  touchpointName: string
  triggerLabel: string
  // client email
  subject?: string
  html?: string
  // agent push
  pushTitle?: string
  pushMessage?: string
}

type Fields = Record<string, unknown>

function str(f: Fields, id: string): string {
  const v = f[id]
  return typeof v === 'string' ? v : ''
}
function flag(f: Fields, id: string): boolean {
  return f[id] === true
}

/**
 * Given a booking's raw Airtable fields, the client's first name, and today's
 * date (Eastern, ISO), return every milestone that is due AND not yet sent.
 * The caller sends each, sets its flag, and logs a Touchpoint.
 */
export function dueMilestones(fields: Fields, firstName: string, today: string): DueMilestone[] {
  const out: DueMilestone[] = []

  const phase = str(fields, BK.phase).toUpperCase()
  if (phase === 'CANCELLED') return out

  const sail = str(fields, BK.sailingDate)
  const ret = str(fields, BK.returnDate)
  const ship = str(fields, BK.ship)
  const email = str(fields, BK.clientEmail)
  const tier = str(fields, BK.castawayTier)

  const daysToSail = sail ? daysBetween(today, sail) : NaN
  const daysSinceReturn = ret ? daysBetween(ret, today) : NaN
  const first = firstName || 'there'

  // 1. Welcome — as soon as a booking exists and is still upcoming.
  if (email && sail && !flag(fields, BK.welcomeSent) && daysToSail >= 0) {
    out.push({
      key: 'welcome',
      audience: 'client',
      flagField: BK.welcomeSent,
      touchpointName: 'Welcome Email',
      triggerLabel: 'On booking',
      subject: 'Your Disney cruise is booked — here\'s what happens next',
      html: welcomeHtml(first, ship),
    })
  }

  // 2. Check-in reminder — the day the tier-based window opens.
  if (email && sail && !flag(fields, BK.checkinSent) && daysToSail >= 0 && daysToSail <= checkInDays(tier)) {
    const opensIso = addDaysIso(sail, -checkInDays(tier))
    out.push({
      key: 'checkin',
      audience: 'client',
      flagField: BK.checkinSent,
      touchpointName: 'Check-In Reminder',
      triggerLabel: `Sailing -${checkInDays(tier)} (${tier || 'first-time'})`,
      subject: 'Your online check-in window is open',
      html: checkinHtml(first, opensIso),
    })
  }

  // 3. Final payment reminder — within a week before the deadline.
  if (email && sail && !flag(fields, BK.finalPaymentSent) && daysToSail >= 0) {
    const finalIso = str(fields, BK.penaltyDeadline) || addDaysIso(sail, -75)
    const daysToFinal = daysBetween(today, finalIso)
    if (daysToFinal >= 0 && daysToFinal <= 7) {
      out.push({
        key: 'finalpayment',
        audience: 'client',
        flagField: BK.finalPaymentSent,
        touchpointName: 'Final Payment Reminder',
        triggerLabel: 'Final payment -7',
        subject: 'Heads-up: your cruise final payment is coming due',
        html: finalPaymentHtml(first, finalIso),
      })
    }
  }

  // 4. Bon voyage — the day before sailing.
  if (email && sail && !flag(fields, BK.bonVoyageSent) && daysToSail >= 0 && daysToSail <= 1) {
    out.push({
      key: 'bonvoyage',
      audience: 'client',
      flagField: BK.bonVoyageSent,
      touchpointName: 'Bon Voyage',
      triggerLabel: 'Sailing -1',
      subject: 'Tomorrow\'s the day — bon voyage!',
      html: bonVoyageHtml(first, ship),
    })
  }

  // 5. Post-cruise follow-up + review/referral — a couple days after return.
  if (email && ret && !flag(fields, BK.postCruiseSent) && daysSinceReturn >= 2 && daysSinceReturn <= 60) {
    out.push({
      key: 'postcruise',
      audience: 'client',
      flagField: BK.postCruiseSent,
      touchpointName: 'Post-Cruise Follow-Up',
      triggerLabel: 'Return +2',
      subject: 'Welcome home — how was your cruise?',
      html: postCruiseHtml(first),
    })
  }

  // 6. Commission reminder — agent-only, day after return, within the window.
  if (ret && !flag(fields, BK.commissionSent) && daysSinceReturn >= 1 && daysSinceReturn <= 60) {
    const bookingName = str(fields, BK.bookingName) || 'a booking'
    const est = fields[BK.commissionEstimated]
    const estStr = typeof est === 'number' ? ` (est. gross $${est.toFixed(2)})` : ''
    out.push({
      key: 'commission',
      audience: 'agent',
      flagField: BK.commissionSent,
      touchpointName: 'Commission Reminder',
      triggerLabel: 'Return +1',
      pushTitle: 'Submit commission on Boardwalk',
      pushMessage: `${bookingName} has sailed${estStr}. Submit it on Boardwalk now — within 60 days, each reservation separately.`,
    })
  }

  return out
}

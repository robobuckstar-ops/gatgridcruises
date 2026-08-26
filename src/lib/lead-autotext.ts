// The first text a new lead gets, written to sound like Grayson typed it on his
// phone thirty seconds after the form came in.
//
// The whole point is to ask only for what the form did not already collect: a
// lead who just told us "August 2026, 4 people" should not be asked when they
// want to sail. Every high-intent form builds its message from here so they
// never drift into asking different questions.
//
// Rules baked in on purpose: no fares, no promises about price, one message
// only, and the STOP footer every automated first text needs.

import { sendSms } from './twilio'

/** One SMS segment is 160 chars. Two segments is the ceiling for a first text. */
const MAX_LENGTH = 300

/** Every form that fires a welcome text. Each one names itself in the opener. */
export type LeadSource =
  | 'free-quote'
  | 'inquiry'
  | 'transfer'
  | 'referral'
  | 'group-cruise'
  | 'contact'

export interface LeadAutoTextInput {
  /** Full name off the form; only the first word is used. */
  name: string
  /** Which form they came through, so the opener names the right thing. */
  source: LeadSource
  /** Non-empty when they already told us when they want to sail. */
  knownTimeframe?: string
  /** Non-empty when they already told us how many are coming. */
  knownPartySize?: string
  /** Non-empty when the sailing they picked already implies a departure port. */
  knownDeparturePort?: string
}

export function leadFirstName(name: string): string {
  const first = name.trim().split(/\s+/)[0] ?? ''
  return first ? first.slice(0, 20) : 'there'
}

function has(value: string | undefined): boolean {
  return Boolean(value && value.trim())
}

/**
 * The getting-acquainted questions, in the order they matter for quoting, minus
 * anything the form already answered. Capped at three so the text stays short.
 */
export function missingLeadDetails(input: LeadAutoTextInput): string[] {
  const questions: string[] = []

  if (!has(input.knownTimeframe)) {
    questions.push('when you are hoping to sail')
  }

  if (!has(input.knownPartySize)) {
    questions.push("how many of you are coming and the kids' ages")
  } else {
    // Party size is on both forms but ages never are, and ages drive the
    // stateroom options more than the headcount does.
    questions.push('the ages of any kids coming along')
  }

  if (!has(input.knownDeparturePort)) {
    questions.push("which port or city you'd sail from")
  }

  return questions.slice(0, 3)
}

interface SourceCopy {
  /** Names what just came in, dropped into "Got ___, thank you!". */
  got: string
  /** Optional one-liner between the thank you and the permission ask. */
  aside?: string
  /** Why the questions are worth answering, dropped after "quick questions". */
  why: string
}

// One entry per form. The shape of the message is identical everywhere; only
// the thing being acknowledged changes, so a lead who fills out two forms
// hears the same voice both times.
const SOURCE_COPY: Record<LeadSource, SourceCopy> = {
  'free-quote': {
    got: 'your quote request',
    why: 'so I can put the right options together',
  },
  inquiry: {
    got: 'your request on that sailing',
    why: 'so I can put the right options together',
  },
  transfer: {
    got: 'your transfer request',
    // The credit is the whole point of moving an already-booked cruise, so it
    // belongs in the first text rather than three replies later.
    aside: 'I can move your Disney booking over and lock in your onboard credit.',
    why: 'to get it started',
  },
  referral: {
    got: 'your request',
    aside: 'Glad a friend sent you my way.',
    why: 'so I can put the right options together',
  },
  'group-cruise': {
    got: 'your group cruise request',
    why: 'so I can put the right options together',
  },
  contact: {
    got: 'your message',
    aside: 'Happy to help.',
    why: 'so I can point you the right way',
  },
}

/** Build the one-and-only welcome text. Always under {@link MAX_LENGTH}. */
export function buildLeadAutoText(input: LeadAutoTextInput): string {
  const firstName = leadFirstName(input.name)
  const copy = SOURCE_COPY[input.source]
  // The first touch asks permission before firing questions, and names the
  // email so a text that lands in spam still has a paper trail. The actual
  // getting-acquainted questions (missingLeadDetails) go out once they say yes.
  const compose = (who: string, withAside: boolean): string => {
    const aside = withAside && copy.aside ? ` ${copy.aside}` : ''
    return `Hi ${who}, this is Grayson with GatGrid Cruises. Got ${copy.got}, thank you!${aside} Mind if I text you a couple quick questions ${copy.why}? I also just emailed you in case this lands in spam. Reply STOP to opt out.`
  }

  let message = compose(firstName, true)
  if (message.length > MAX_LENGTH) {
    // An unusually long first name is the usual cause; trim it first.
    message = compose(firstName.slice(0, 12), true)
  }
  if (message.length > MAX_LENGTH) {
    // Still over, so the copy itself grew. The aside is the only optional
    // sentence, so it goes before anything load-bearing does. The ask, the
    // email mention, and the opt-out line are never trimmed.
    message = compose(firstName.slice(0, 12), false)
  }

  return message
}

/**
 * Send it. Best effort in every direction: a missing Twilio credential, a
 * blank phone number, or a Twilio outage logs and returns false. It must never
 * throw, because the caller has already accepted the lead.
 */
export async function sendLeadAutoText(
  phone: string,
  input: LeadAutoTextInput,
): Promise<boolean> {
  if (!phone.trim()) return false

  try {
    const result = await sendSms(phone, buildLeadAutoText(input))
    if (!result.ok) {
      console.warn(`[lead-autotext] ${input.source} welcome text not sent:`, result.error)
      return false
    }
    return true
  } catch (err) {
    console.error('[lead-autotext] welcome text threw:', err)
    return false
  }
}

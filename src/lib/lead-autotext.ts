// The first text a new lead gets, written to sound like Grayson typed it on his
// phone thirty seconds after the form came in.
//
// The whole point is to ask only for what the form did not already collect: a
// lead who just told us "August 2026, 4 people" should not be asked when they
// want to sail. Both /api/free-quote and /api/inquiry build the message from
// here so the two forms never drift into asking different questions.
//
// Rules baked in on purpose: no fares, no promises about price, one message
// only, and the STOP footer every automated first text needs.

import { sendSms } from './twilio'

/** One SMS segment is 160 chars. Two segments is the ceiling for a first text. */
const MAX_LENGTH = 300

export interface LeadAutoTextInput {
  /** Full name off the form; only the first word is used. */
  name: string
  /** Which form they came through, so the opener names the right thing. */
  source: 'free-quote' | 'inquiry'
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

/** Build the one-and-only welcome text. Always under {@link MAX_LENGTH}. */
export function buildLeadAutoText(input: LeadAutoTextInput): string {
  const firstName = leadFirstName(input.name)
  const what = input.source === 'free-quote' ? 'your quote request' : 'your request on that sailing'
  // The first touch asks permission before firing questions, and names the
  // email so a text that lands in spam still has a paper trail. The actual
  // getting-acquainted questions (missingLeadDetails) go out once they say yes.
  const compose = (who: string): string =>
    `Hi ${who}, this is Grayson with GatGrid Cruises. Got ${what}, thank you! Mind if I text you a couple quick questions so I can put the right options together? I also just emailed you in case this lands in spam. Reply STOP to opt out.`

  let message = compose(firstName)
  if (message.length > MAX_LENGTH) {
    // Only an unusually long first name can exceed the cap; trim it, never the
    // opt-out line.
    message = compose(firstName.slice(0, 12))
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

// Pushover alert for a brand new lead, so Grayson's phone buzzes the moment a
// form comes in rather than whenever he next opens email.
//
// Same contract as every other lead side effect: credentials live in env
// (PUSHOVER_TOKEN / PUSHOVER_USER), an unconfigured deploy logs a warning and
// no-ops, and nothing in here is ever allowed to throw into a form submission.

/** Pushover's high-priority level: bypasses quiet hours, no ack required. */
export const PRIORITY_HIGH = 1

const ENDPOINT = 'https://api.pushover.net/1/messages.json'

export interface PushoverInput {
  title: string
  message: string
  /** -2 through 2. Defaults to high, which is what a new lead warrants. */
  priority?: number
}

/** Fire one push. Returns false instead of throwing on any failure. */
export async function sendPushover(input: PushoverInput): Promise<boolean> {
  const token = process.env.PUSHOVER_TOKEN?.trim()
  const user = process.env.PUSHOVER_USER?.trim()

  if (!token || !user) {
    const missing = [!token && 'PUSHOVER_TOKEN', !user && 'PUSHOVER_USER'].filter(Boolean).join(' and ')
    console.warn(`[pushover] ${missing} not set; push alert not sent: ${input.title}`)
    return false
  }

  const priority = typeof input.priority === 'number' ? input.priority : PRIORITY_HIGH

  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        token,
        user,
        title: input.title.slice(0, 250),
        message: input.message.slice(0, 1024),
        priority: String(priority),
      }).toString(),
      cache: 'no-store',
    })

    if (!res.ok) {
      const detail = await res.text().catch(() => '')
      console.error('[pushover] push rejected:', res.status, detail.slice(0, 300))
      return false
    }

    return true
  } catch (err) {
    console.error('[pushover] push request threw:', err)
    return false
  }
}

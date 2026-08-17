// Throttled bulk sending for the newsletter crons (digest, drip, deal alerts).
//
// Two constraints shape this:
//   - Resend's default rate limit is 2 requests/second. Blasting a list
//     straight through a for-loop starts returning 429s partway down.
//   - A Vercel serverless invocation has a wall clock. A run that overruns is
//     killed mid-list, so we stop cleanly at a budget and report what's left;
//     each recipient's progress is recorded in Airtable as it's sent, so the
//     next invocation resumes rather than re-sending.

/** ~1.8 requests/second, just under Resend's 2/s default. */
const SEND_INTERVAL_MS = 550

/** Leave headroom under the route's maxDuration for the final Airtable writes. */
const DEFAULT_TIME_BUDGET_MS = 45_000

export interface BulkSendResult {
  sent: number
  skipped: number
  failed: number
  errors: string[]
  /** True when the time budget stopped the run before the list was exhausted. */
  truncated: boolean
  remaining: number
}

export type SendOutcome = 'sent' | 'skipped'

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Walk `items` in order, calling `send` for each with a fixed pacing gap.
 * `send` returns 'skipped' to consume an item without an API call (no pause
 * needed), or throws to record a failure and continue with the rest.
 */
export async function bulkSend<T>(
  items: T[],
  label: (item: T) => string,
  send: (item: T) => Promise<SendOutcome>,
  options: { timeBudgetMs?: number; maxSends?: number } = {},
): Promise<BulkSendResult> {
  const timeBudgetMs = options.timeBudgetMs ?? DEFAULT_TIME_BUDGET_MS
  const maxSends = options.maxSends ?? Infinity
  const startedAt = Date.now()

  const result: BulkSendResult = {
    sent: 0,
    skipped: 0,
    failed: 0,
    errors: [],
    truncated: false,
    remaining: 0,
  }

  for (let i = 0; i < items.length; i++) {
    if (result.sent >= maxSends || Date.now() - startedAt > timeBudgetMs) {
      result.truncated = true
      result.remaining = items.length - i
      break
    }

    try {
      const outcome = await send(items[i])
      if (outcome === 'sent') {
        result.sent++
        // Pace only after a real send — skipped recipients cost no API quota,
        // so a mostly-already-sent list still walks the whole way in one run.
        await sleep(SEND_INTERVAL_MS)
      } else {
        result.skipped++
      }
    } catch (err) {
      result.failed++
      // Cap the error payload so one broken list doesn't produce a giant
      // cron response body.
      if (result.errors.length < 25) {
        result.errors.push(`${label(items[i])}: ${err instanceof Error ? err.message : String(err)}`)
      }
    }
  }

  return result
}

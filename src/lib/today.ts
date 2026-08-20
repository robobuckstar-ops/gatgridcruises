/**
 * The booking clock.
 *
 * Every "has this sailed yet?" decision on the site resolves against the same
 * calendar day in America/Chicago — the clock the agency books against — so a
 * sailing can never be filtered out of one surface while still counting down on
 * another.
 *
 * This module deliberately has no data imports: it is safe to pull into client
 * components (`lib/data` would drag the whole sailings catalog into the browser
 * bundle). `lib/data` re-exports `getTodayInChicago` so server callers can keep
 * importing it from there.
 */

/** A date-only key, `YYYY-MM-DD`, which sorts lexicographically. */
export type DateKey = string

const CHICAGO = 'America/Chicago'

/**
 * Today's date as `YYYY-MM-DD` in America/Chicago.
 *
 * Deliberately computed on every call rather than cached in a module constant:
 * a constant would freeze at build time and the "past sailing" cutoff would
 * stop moving until the next deploy. Pages that list sailings opt out of static
 * rendering (`export const dynamic = 'force-dynamic'`) so this really is
 * evaluated per request.
 */
export function getTodayInChicago(now: Date = new Date()): DateKey {
  // en-CA formats as YYYY-MM-DD, which sorts correctly against `sail_date`.
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: CHICAGO,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now)
}

/** The current hour (0–23) in America/Chicago. */
function getHourInChicago(now: Date): number {
  const hour = new Intl.DateTimeFormat('en-US', {
    timeZone: CHICAGO,
    hour: '2-digit',
    hour12: false,
  }).format(now)
  // hourCycle 'h23' renders midnight as "24" in some ICU versions.
  return Number(hour) % 24
}

/**
 * Whole calendar days from today (Chicago) to `dateKey`.
 *
 * Both sides are date-only, so they're parsed as UTC midnight and differenced —
 * exact, and immune to the DST gaps that break naive local-time subtraction.
 * Negative means the date has passed, `0` means today.
 *
 * Returns `null` for anything that isn't a parseable `YYYY-MM-DD`.
 */
export function daysUntilInChicago(dateKey: string, now: Date = new Date()): number | null {
  if (typeof dateKey !== 'string') return null
  const target = Date.parse(`${dateKey.slice(0, 10)}T00:00:00Z`)
  if (Number.isNaN(target)) return null
  const today = Date.parse(`${getTodayInChicago(now)}T00:00:00Z`)
  return Math.round((target - today) / 86_400_000)
}

export type TimeUntilDeparture =
  /** Already sailed — nothing left to sell. */
  | { status: 'departed' }
  /** Sails today. Disney sells right up to the sail date, so this is bookable. */
  | { status: 'today' }
  /** Still ahead: `days` whole days plus `hours` to the next Chicago midnight. */
  | { status: 'upcoming'; days: number; hours: number }

/**
 * How long until a sailing leaves, on the booking clock.
 *
 * Same-day departures report `'today'` rather than `'departed'`: they are still
 * bookable (`isBookableSailing` keeps them), and labelling a sailing you can
 * still buy as "Departed" is what made past-looking rows show up on the
 * last-minute grid.
 *
 * `hours` counts down to midnight in Chicago, so `days + hours` is the real
 * remaining time rather than a UTC-midnight approximation of it.
 */
export function timeUntilDeparture(sailDate: string, now: Date = new Date()): TimeUntilDeparture {
  const days = daysUntilInChicago(sailDate, now)
  if (days === null || days < 0) return { status: 'departed' }
  if (days === 0) return { status: 'today' }
  const hoursLeftToday = 24 - getHourInChicago(now)
  return { status: 'upcoming', days: days - 1, hours: hoursLeftToday }
}

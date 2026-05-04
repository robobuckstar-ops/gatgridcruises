'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Ship,
  CheckCircle2,
  Circle,
  Clock,
  FileText,
  Bell,
  MessageCircle,
  Info,
  MapPin,
  Globe,
  AlertTriangle,
  LogOut,
  Star,
  ChevronDown,
  Loader2,
} from 'lucide-react'
import { OBCDisclaimer } from '@/components/ui/obc-disclaimer'

// ─── Timezone Options ─────────────────────────────────────────────────────────

const TZ_OPTIONS = [
  { label: 'Eastern (ET)', value: 'America/New_York', abbr: 'ET' },
  { label: 'Central (CT)', value: 'America/Chicago', abbr: 'CT' },
  { label: 'Mountain (MT)', value: 'America/Denver', abbr: 'MT' },
  { label: 'Pacific (PT)', value: 'America/Los_Angeles', abbr: 'PT' },
  { label: 'Alaska (AKT)', value: 'America/Anchorage', abbr: 'AKT' },
  { label: 'Hawaii (HT)', value: 'Pacific/Honolulu', abbr: 'HT' },
  { label: 'UK (GMT/BST)', value: 'Europe/London', abbr: 'BST' },
  { label: 'Central Europe (CET)', value: 'Europe/Paris', abbr: 'CET' },
  { label: 'Australia East (AEST)', value: 'Australia/Sydney', abbr: 'AEST' },
]

// Disney booking windows open at midnight EDT (UTC-4) for April–June 2026 dates.
// Midnight EDT = 04:00 UTC. This converts that moment to the user's local timezone.
function getMidnightETLocal(isoDate: string, localTz: string) {
  const utc = new Date(`${isoDate}T04:00:00Z`)

  const time = new Intl.DateTimeFormat('en-US', {
    timeZone: localTz,
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(utc)

  const date = new Intl.DateTimeFormat('en-US', {
    timeZone: localTz,
    month: 'short',
    day: 'numeric',
  }).format(utc)

  const tzParts = new Intl.DateTimeFormat('en-US', {
    timeZone: localTz,
    timeZoneName: 'short',
  }).formatToParts(utc)

  const tzAbbr = tzParts.find((p) => p.type === 'timeZoneName')?.value ?? ''

  return { time, date, tzAbbr }
}

// ─── Date helpers ─────────────────────────────────────────────────────────────

function parseSailingDate(iso: string): Date | null {
  if (!iso) return null
  // Airtable date-only fields come back as "YYYY-MM-DD". Default to 4:30 PM
  // local-time so the countdown lines up with a typical cruise departure.
  const date = iso.includes('T') ? new Date(iso) : new Date(`${iso}T16:30:00`)
  return Number.isNaN(date.getTime()) ? null : date
}

function formatSailingDateRange(startIso: string, endIso: string): string {
  const start = parseSailingDate(startIso)
  const end = parseSailingDate(endIso)
  if (!start) return ''

  const monthDay = (d: Date) =>
    new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric' }).format(d)
  const monthShort = (d: Date) =>
    new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(d)
  const year = (d: Date) => d.getFullYear()

  if (!end) return `${monthDay(start)}, ${year(start)}`

  if (year(start) !== year(end)) {
    return `${monthShort(start)}, ${year(start)} – ${monthShort(end)}, ${year(end)}`
  }
  if (start.getMonth() !== end.getMonth()) {
    return `${monthShort(start)} – ${monthShort(end)}, ${year(end)}`
  }
  return `${monthDay(start)}–${end.getDate()}, ${year(end)}`
}

function addDaysIso(date: Date, days: number): string {
  const d = new Date(date)
  d.setDate(d.getDate() + days)
  return d.toISOString().slice(0, 10)
}

function shortDateLabel(iso: string): string {
  const d = parseSailingDate(iso)
  if (!d) return ''
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(d)
}

function formatCurrency(value: number | null | undefined): string {
  if (value == null) return ''
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}

// Pulls port names from a freeform itinerary string like
// "7-Night Eastern Caribbean: St. Thomas, St. Maarten & Castaway Cay".
// Splits the segment after the colon on commas, ampersands, and "and".
function extractPorts(itinerary: string): string[] {
  if (!itinerary) return []
  const afterColon = itinerary.includes(':')
    ? itinerary.split(':').slice(1).join(':')
    : itinerary
  const parts = afterColon
    .split(/,| & | and /i)
    .map((p) => p.trim())
    .filter(Boolean)
  return parts.length > 1 ? parts : []
}

interface ItineraryDay {
  date: Date
  dayNum: number
  isFirst: boolean
  isLast: boolean
}

// Build a day-by-day list from sailing date through return date inclusive.
// Falls back to nights count when no return date is on file.
function buildItineraryDays(
  startIso: string,
  returnIso: string,
  nights: number | null,
): ItineraryDay[] {
  const start = parseSailingDate(startIso)
  if (!start) return []

  let end = parseSailingDate(returnIso)
  if (!end && nights && nights > 0) {
    end = new Date(start)
    end.setDate(end.getDate() + nights)
  }
  if (!end) return []

  const days: ItineraryDay[] = []
  const cur = new Date(start)
  cur.setHours(12, 0, 0, 0)
  const stop = new Date(end)
  stop.setHours(12, 0, 0, 0)

  let dayNum = 1
  // Cap at 30 days as a safety rail against bad data.
  while (cur.getTime() <= stop.getTime() && dayNum <= 30) {
    days.push({
      date: new Date(cur),
      dayNum,
      isFirst: dayNum === 1,
      isLast: cur.getTime() === stop.getTime(),
    })
    cur.setDate(cur.getDate() + 1)
    dayNum++
  }
  // Mark the final entry as the last day in case the loop's safety rail trimmed it.
  if (days.length > 0) days[days.length - 1].isLast = true
  return days
}

function formatItineraryDate(d: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  }).format(d)
}

// ─── API types ────────────────────────────────────────────────────────────────

interface PortalApiResponse {
  booking: {
    id: string
    number: string
    ship: string
    sailingDate: string
    returnDate: string
    nights: number | null
    itinerary: string
    stateroomNumber: string
    stateroomCategory: string
    obcAmount: number | null
    bookingPrice: number | null
    phase: string
  }
  client: {
    fullName: string
    firstName: string
    email: string
  }
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function Toggle({ on, onChange, label }: { on: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      onClick={() => onChange(!on)}
      className={`relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-navy ${
        on ? 'bg-navy' : 'bg-slate-200'
      }`}
      role="switch"
      aria-checked={on}
      aria-label={label}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
          on ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  )
}

function CountdownUnit({ value, label, mounted }: { value: number; label: string; mounted: boolean }) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-4 md:px-6 py-3 md:py-4 text-center min-w-[64px] md:min-w-[80px]">
      <div className="text-3xl md:text-5xl font-bold font-display tabular-nums leading-none">
        {mounted ? String(value).padStart(2, '0') : '--'}
      </div>
      <div className="text-blue-200 text-xs mt-1.5 uppercase tracking-widest font-medium">{label}</div>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function DashboardPage() {
  const router = useRouter()
  const [data, setData] = useState<PortalApiResponse | null>(null)
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const [mounted, setMounted] = useState(false)
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [timezone, setTimezone] = useState('America/New_York')
  const [checklistDone, setChecklistDone] = useState<Record<string, boolean>>({})
  const [prefs, setPrefs] = useState({ email: true, sms: true, frequency: 'milestone' })
  const [showTzInfo, setShowTzInfo] = useState(false)
  const [signingOut, setSigningOut] = useState(false)

  useEffect(() => {
    setMounted(true)
    const detected = Intl.DateTimeFormat().resolvedOptions().timeZone
    if (TZ_OPTIONS.some((o) => o.value === detected)) {
      setTimezone(detected)
    }
  }, [])

  const loadBooking = useCallback(async () => {
    setStatus('loading')
    setErrorMessage('')
    try {
      const res = await fetch('/api/portal/me', { cache: 'no-store' })
      if (res.status === 401) {
        router.replace('/my-trip')
        return
      }
      const json = await res.json().catch(() => ({}))
      if (!res.ok) {
        setErrorMessage(json?.error ?? 'We couldn’t load your booking. Please try again.')
        setStatus('error')
        return
      }
      setData(json as PortalApiResponse)
      setStatus('ready')
    } catch {
      setErrorMessage('Network error. Please check your connection and try again.')
      setStatus('error')
    }
  }, [router])

  useEffect(() => {
    loadBooking()
  }, [loadBooking])

  const sailingDate = useMemo(
    () => (data ? parseSailingDate(data.booking.sailingDate) : null),
    [data],
  )

  useEffect(() => {
    if (!sailingDate) return
    const tick = () => {
      const diff = sailingDate.getTime() - Date.now()
      if (diff <= 0) return setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      setCountdown({
        days: Math.floor(diff / 86_400_000),
        hours: Math.floor((diff % 86_400_000) / 3_600_000),
        minutes: Math.floor((diff % 3_600_000) / 60_000),
        seconds: Math.floor((diff % 60_000) / 1_000),
      })
    }
    tick()
    const id = setInterval(tick, 1_000)
    return () => clearInterval(id)
  }, [sailingDate])

  async function handleSignOut() {
    setSigningOut(true)
    try {
      await fetch('/api/portal/logout', { method: 'POST' })
    } catch {
      // proceed regardless — cookie clears client-side via redirect
    }
    router.push('/my-trip')
  }

  // ── Loading / Error states ──
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="flex flex-col items-center gap-3 text-slate-500">
          <Loader2 className="w-6 h-6 animate-spin text-navy" />
          <p className="text-sm">Loading your trip…</p>
        </div>
      </div>
    )
  }

  if (status === 'error' || !data) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-slate-100 p-6 text-center">
          <AlertTriangle className="w-10 h-10 text-amber-500 mx-auto mb-3" />
          <h1 className="font-display text-xl font-bold text-navy mb-1.5">We couldn’t load your trip</h1>
          <p className="text-sm text-slate-600 mb-5">{errorMessage || 'Something went wrong.'}</p>
          <div className="flex gap-2 justify-center">
            <button
              onClick={loadBooking}
              className="px-4 py-2 bg-navy text-white rounded-xl text-sm font-semibold hover:bg-[#15304f] transition-colors"
            >
              Try again
            </button>
            <Link
              href="/my-trip"
              className="px-4 py-2 border border-slate-200 text-slate-700 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-colors"
            >
              Back to sign in
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // ── Loaded ──
  const { booking, client } = data
  const isDisney = booking.ship.toLowerCase().includes('disney')

  const sailingDisplay = formatSailingDateRange(booking.sailingDate, booking.returnDate)
  const durationLabel = booking.nights ? `${booking.nights}-Night` : ''
  const stateroomLabel =
    booking.stateroomNumber && booking.stateroomCategory
      ? `#${booking.stateroomNumber} · Category ${booking.stateroomCategory}`
      : booking.stateroomNumber
        ? `#${booking.stateroomNumber}`
        : booking.stateroomCategory
          ? `Category ${booking.stateroomCategory}`
          : 'Assignment pending'

  const tripFacts: Array<{ label: string; value: string }> = [
    { label: 'Ship', value: booking.ship || '—' },
    sailingDisplay && { label: 'Sailing dates', value: sailingDisplay },
    durationLabel && booking.itinerary && { label: 'Itinerary', value: `${durationLabel} ${booking.itinerary}` },
    durationLabel && !booking.itinerary && { label: 'Duration', value: durationLabel },
    !durationLabel && booking.itinerary && { label: 'Itinerary', value: booking.itinerary },
    { label: 'Stateroom', value: stateroomLabel },
    { label: 'Confirmation #', value: booking.number || '—' },
    booking.obcAmount && booking.obcAmount > 0 && {
      label: 'Onboard credit',
      value: `${formatCurrency(booking.obcAmount)} OBC`,
    },
    booking.bookingPrice && booking.bookingPrice > 0 && {
      label: 'Total',
      value: formatCurrency(booking.bookingPrice),
    },
  ].filter(Boolean) as Array<{ label: string; value: string }>

  // ── Checklist (state stored client-side; not yet persisted to Airtable) ──
  type ChecklistItem = {
    id: string
    label: string
    detail: string
    urgent?: boolean
    tzDate?: string
  }

  const checklistItems: ChecklistItem[] = sailingDate
    ? (() => {
        const checkInIso = addDaysIso(sailingDate, -30)
        const finalPrepIso = addDaysIso(sailingDate, -7)
        const daysToSail = Math.ceil((sailingDate.getTime() - Date.now()) / 86_400_000)
        return [
          {
            id: 'confirmed',
            label: 'Booking confirmed',
            detail: booking.number ? `Confirmation ${booking.number}` : 'Confirmed',
          },
          {
            id: 'insurance',
            label: 'Travel insurance',
            detail: 'Protect your trip — ask Grayson for a quote if you haven’t locked it in.',
          },
          {
            id: 'flights',
            label: 'Flights booked',
            detail: 'Aim to arrive a day early when possible.',
          },
          {
            id: 'excursions',
            label: 'Excursions booked',
            detail: isDisney
              ? 'Castaway Cay & Port Adventures sell out fast — book the moment your window opens.'
              : 'Reserve excursions through the cruise line or trusted independents.',
          },
          {
            id: 'dining',
            label: 'Specialty dining reserved',
            detail: isDisney
              ? 'Remy, Palo, and Enchanted Garden book up early — set a reminder for your window.'
              : 'Reserve specialty dining when your window opens.',
          },
          {
            id: 'checkin',
            label: 'Online check-in complete',
            urgent: daysToSail <= 35,
            tzDate: checkInIso,
            detail: `Opens around ${shortDateLabel(checkInIso)} — complete it ASAP for the best boarding group.`,
          },
          {
            id: 'passports',
            label: 'Passports confirmed valid',
            detail: 'Must be valid 6+ months beyond your return date.',
          },
          {
            id: 'packing',
            label: 'Packing list started',
            tzDate: finalPrepIso,
            detail: `Final review around ${shortDateLabel(finalPrepIso)}.`,
          },
        ]
      })()
    : [
        { id: 'confirmed', label: 'Booking confirmed', detail: booking.number ? `Confirmation ${booking.number}` : 'Confirmed' },
        { id: 'insurance', label: 'Travel insurance', detail: 'Protect your trip.' },
        { id: 'flights', label: 'Flights booked', detail: 'Aim to arrive a day early.' },
        { id: 'excursions', label: 'Excursions booked', detail: 'Reserve when your window opens.' },
        { id: 'dining', label: 'Specialty dining reserved', detail: 'Reserve when your window opens.' },
        { id: 'checkin', label: 'Online check-in complete', detail: 'Complete ASAP once your window opens.' },
        { id: 'passports', label: 'Passports confirmed valid', detail: 'Must be valid 6+ months beyond return.' },
        { id: 'packing', label: 'Packing list started', detail: 'Use our cruise packing guide.' },
      ]

  // First item ("Booking confirmed") starts pre-checked — booking exists in Airtable.
  const isItemDone = (id: string) => checklistDone[id] ?? id === 'confirmed'
  const completedCount = checklistItems.filter((item) => isItemDone(item.id)).length
  const progressPct = Math.round((completedCount / checklistItems.length) * 100)
  function toggleCheck(id: string) {
    setChecklistDone((prev) => ({ ...prev, [id]: !isItemDone(id) }))
  }

  // ── Reminders ──
  type Reminder = {
    isoDate: string
    label: string
    isMidnightET: boolean
    priority: 'high' | 'medium'
  }

  const reminders: Reminder[] = sailingDate
    ? [
        {
          isoDate: addDaysIso(sailingDate, -30),
          label: 'Online check-in opens',
          isMidnightET: isDisney,
          priority: 'high',
        },
        {
          isoDate: addDaysIso(sailingDate, -7),
          label: 'Final documents & packing check',
          isMidnightET: false,
          priority: 'medium',
        },
      ]
    : []

  const selectedTz = TZ_OPTIONS.find((o) => o.value === timezone) ?? TZ_OPTIONS[0]
  const isEastern = timezone === 'America/New_York'

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Welcome strip */}
      <div className="bg-navy border-b border-navy/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-white">
            <span>Welcome back,</span>
            <span className="font-bold">{client.firstName}!</span>
            {booking.ship && (
              <>
                <span className="text-blue-300 hidden sm:inline">·</span>
                <span className="text-gold font-medium hidden sm:inline">{booking.ship}</span>
              </>
            )}
          </div>
          <button
            onClick={handleSignOut}
            disabled={signingOut}
            className="flex items-center gap-1.5 text-blue-200 hover:text-white text-xs transition-colors disabled:opacity-60"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{signingOut ? 'Signing out…' : 'Sign out'}</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">

        {/* ── Countdown Hero ── */}
        <section className="rounded-2xl bg-gradient-to-br from-[#0a1628] to-[#1E3A5F] text-white p-6 md:p-10 relative overflow-hidden">
          <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-white/[0.03] pointer-events-none" />
          <div className="absolute -left-12 -bottom-12 w-72 h-72 rounded-full bg-gold/[0.05] pointer-events-none" />
          <div className="absolute right-10 bottom-6 text-[120px] opacity-[0.04] pointer-events-none select-none">🛳️</div>

          <div className="relative z-10">
            {(durationLabel || booking.itinerary) && (
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-gold border border-gold/40 rounded-full px-3 py-1">
                  <Ship className="w-3 h-3" />
                  {[durationLabel, booking.itinerary].filter(Boolean).join(' · ')}
                </span>
              </div>
            )}

            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-1.5 leading-tight">
              {sailingDate
                ? mounted
                  ? `${countdown.days} days until your cruise!`
                  : '—'
                : 'Your trip details'}
            </h1>
            <p className="text-blue-200 text-sm md:text-base mb-7">
              {[booking.ship, sailingDisplay].filter(Boolean).join(' · ') || 'Welcome aboard'}
            </p>

            {sailingDate && (
              <div className="flex flex-wrap gap-3 mb-7">
                <CountdownUnit value={countdown.days} label="Days" mounted={mounted} />
                <CountdownUnit value={countdown.hours} label="Hrs" mounted={mounted} />
                <CountdownUnit value={countdown.minutes} label="Min" mounted={mounted} />
                <CountdownUnit value={countdown.seconds} label="Sec" mounted={mounted} />
              </div>
            )}

            {booking.itinerary && (
              <div className="flex items-center gap-2 text-blue-200 text-sm">
                <MapPin className="w-4 h-4 text-gold flex-shrink-0" />
                <span>{booking.itinerary}</span>
              </div>
            )}
          </div>
        </section>

        {/* ── Itinerary Timeline ── */}
        {(() => {
          const itineraryDays = buildItineraryDays(booking.sailingDate, booking.returnDate, booking.nights)
          if (itineraryDays.length === 0) return null
          const ports = extractPorts(booking.itinerary)
          const headline = booking.itinerary.includes(':')
            ? booking.itinerary.split(':')[0].trim()
            : booking.itinerary

          return (
            <section className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2.5">
                <MapPin className="w-5 h-5 text-navy" />
                <h2 className="font-display font-bold text-navy text-lg">Itinerary</h2>
                {headline && (
                  <span className="ml-auto text-xs font-semibold uppercase tracking-wide text-slate-400">
                    {headline}
                  </span>
                )}
              </div>

              <div className="px-6 py-5">
                {ports.length > 0 && (
                  <div className="mb-5 flex flex-wrap items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Ports of call:
                    </span>
                    {ports.map((port) => (
                      <span
                        key={port}
                        className="inline-flex items-center gap-1 text-xs font-semibold bg-gold/10 text-navy border border-gold/30 rounded-full px-2.5 py-1"
                      >
                        <MapPin className="w-3 h-3" />
                        {port}
                      </span>
                    ))}
                  </div>
                )}

                <ol className="relative ml-2 border-l-2 border-slate-100 space-y-4">
                  {itineraryDays.map((day) => {
                    const accent = day.isFirst || day.isLast
                    return (
                      <li key={day.dayNum} className="relative pl-5">
                        <span
                          className={`absolute -left-[7px] top-1 w-3 h-3 rounded-full ring-2 ring-white ${
                            accent ? 'bg-[#D4AF37]' : 'bg-slate-300'
                          }`}
                        />
                        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                          <span className="text-xs font-bold uppercase tracking-wide text-slate-400 w-12 shrink-0">
                            Day {day.dayNum}
                          </span>
                          <span className="text-sm font-semibold text-slate-800">
                            {formatItineraryDate(day.date)}
                          </span>
                          {day.isFirst && (
                            <span className="text-[10px] font-bold uppercase tracking-wide bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full px-2 py-0.5">
                              Embark
                            </span>
                          )}
                          {day.isLast && (
                            <span className="text-[10px] font-bold uppercase tracking-wide bg-amber-50 text-amber-700 border border-amber-100 rounded-full px-2 py-0.5">
                              Return
                            </span>
                          )}
                        </div>
                      </li>
                    )
                  })}
                </ol>

                {ports.length > 0 && (
                  <p className="mt-5 text-xs text-slate-400 leading-relaxed">
                    Day-by-day port assignments depend on the cruise line&apos;s final schedule.
                    Your concierge will confirm exact arrival and departure times closer to sail date.
                  </p>
                )}
              </div>
            </section>
          )
        })()}

        {/* ── Trip Details + Checklist ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Trip Details */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2.5">
              <Ship className="w-5 h-5 text-navy" />
              <h2 className="font-display font-bold text-navy text-lg">Trip Details</h2>
            </div>
            <div className="px-6 py-5 space-y-3.5">
              {tripFacts.map(({ label, value }) => (
                <div key={label} className="flex items-start justify-between gap-4 text-sm">
                  <span className="text-slate-400 shrink-0 w-28 pt-0.5">{label}</span>
                  <span className="text-slate-800 font-medium text-right">{value}</span>
                </div>
              ))}
              {booking.phase && (
                <div className="pt-3 border-t border-slate-100 flex items-center gap-2 text-xs">
                  <span className="font-semibold uppercase tracking-wide text-slate-400">Status</span>
                  <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full px-2.5 py-0.5 font-semibold">
                    {booking.phase}
                  </span>
                </div>
              )}
            </div>
          </section>

          {/* Prep Checklist */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-slate-100">
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-navy" />
                  <h2 className="font-display font-bold text-navy text-lg">Prep Checklist</h2>
                </div>
                <span className="text-sm font-semibold text-slate-500">
                  {completedCount}/{checklistItems.length}
                </span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-400 to-[#D4AF37] rounded-full transition-all duration-700"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <p className="text-xs text-slate-400 mt-1.5">{progressPct}% complete</p>
            </div>

            <div className="px-4 py-3 divide-y divide-slate-50 overflow-y-auto flex-1" style={{ maxHeight: 440 }}>
              {checklistItems.map((item) => {
                const isDone = isItemDone(item.id)
                const tzInfo = item.tzDate && isDisney ? getMidnightETLocal(item.tzDate, timezone) : null
                const showTzTime = tzInfo && !isEastern && !isDone

                return (
                  <div key={item.id} className="py-1.5">
                    <button
                      onClick={() => toggleCheck(item.id)}
                      className="flex items-start gap-3 w-full text-left px-2 py-1.5 rounded-xl hover:bg-slate-50 transition-colors group"
                    >
                      {isDone ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      ) : (
                        <Circle
                          className={`w-5 h-5 mt-0.5 flex-shrink-0 transition-colors group-hover:text-slate-400 ${
                            item.urgent ? 'text-amber-400' : 'text-slate-300'
                          }`}
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`text-sm font-medium ${
                              isDone
                                ? 'line-through text-slate-400'
                                : item.urgent
                                  ? 'text-amber-700'
                                  : 'text-slate-700'
                            }`}
                          >
                            {item.label}
                          </span>
                          {item.urgent && !isDone && (
                            <span className="text-[10px] font-bold uppercase tracking-wide bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                              Coming up!
                            </span>
                          )}
                        </div>
                        {!isDone && (
                          <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{item.detail}</p>
                        )}
                        {showTzTime && (
                          <p className="text-xs font-semibold text-blue-600 mt-1">
                            ⏰ That&apos;s {tzInfo.date} at {tzInfo.time} {tzInfo.tzAbbr} your time
                          </p>
                        )}
                      </div>
                    </button>
                  </div>
                )
              })}
            </div>
          </section>
        </div>

        {/* ── Concierge + Reminders ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* Concierge */}
          <section className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2.5">
              <Star className="w-5 h-5 text-[#D4AF37]" fill="currentColor" />
              <h2 className="font-display font-bold text-navy text-lg">Your Concierge</h2>
            </div>

            <div className="px-6 py-5">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-navy to-[#2a4f8a] flex items-center justify-center text-white text-xl font-bold flex-shrink-0 shadow-md">
                  GS
                </div>
                <div>
                  <p className="font-bold text-slate-800 text-base">Grayson Starbuck</p>
                  <p className="text-sm text-[#D4AF37] font-semibold">Cruise Concierge</p>
                  <p className="text-xs text-slate-400 mt-0.5">GatGrid Cruises</p>
                </div>
              </div>

              <div className="relative bg-slate-50 rounded-2xl rounded-tl-sm p-4 border border-slate-100 mb-4">
                <p className="text-sm text-slate-600 leading-relaxed">
                  &ldquo;Hi {client.firstName}! Everything is set for your{' '}
                  {booking.ship || 'upcoming'} cruise. I’ll send reminders before each booking
                  window opens — just reply if you need anything in the meantime.
                  {isDisney && ' Castaway Cay activities sell out in minutes, so we’ll be ready right at midnight ET! 🏖️'}
                  &rdquo;
                </p>
              </div>

              {(() => {
                const subject = `Question about my ${booking.ship || 'cruise'}${
                  booking.number ? ` — ${booking.number}` : ''
                }`
                const body = `Hi Grayson,\n\n`
                const mailto = `mailto:bookings@gatgridcruises.com?subject=${encodeURIComponent(
                  subject,
                )}&body=${encodeURIComponent(body)}`
                return (
                  <a
                    href={mailto}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-navy text-white rounded-xl text-sm font-semibold hover:bg-[#15304f] transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Message Grayson
                  </a>
                )
              })()}
              <p className="text-xs text-slate-400 text-center mt-3">
                Or email{' '}
                <a
                  href="mailto:bookings@gatgridcruises.com"
                  className="text-navy font-semibold hover:underline"
                >
                  bookings@gatgridcruises.com
                </a>
              </p>
            </div>
          </section>

          {/* Upcoming Reminders */}
          <section className="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <Clock className="w-5 h-5 text-navy" />
                  <h2 className="font-display font-bold text-navy text-lg">Upcoming Reminders</h2>
                </div>

                {isDisney && (
                  <div className="flex items-center gap-2 self-start">
                    <Globe className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    <div className="relative">
                      <select
                        value={timezone}
                        onChange={(e) => setTimezone(e.target.value)}
                        className="text-xs border border-slate-200 rounded-lg pl-2.5 pr-7 py-2 text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-navy/30 focus:border-navy appearance-none cursor-pointer"
                      >
                        {TZ_OPTIONS.map((tz) => (
                          <option key={tz.value} value={tz.value}>
                            {tz.label}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400 pointer-events-none" />
                    </div>
                    <button
                      onClick={() => setShowTzInfo(!showTzInfo)}
                      className="text-slate-400 hover:text-navy transition-colors"
                      aria-label="Timezone info"
                    >
                      <Info className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {isDisney && (showTzInfo || !isEastern) && (
                <div className="mt-3 bg-amber-50 border border-amber-200 rounded-xl p-3.5 flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-amber-800">Disney booking windows open at midnight Eastern</p>
                    <p className="text-xs text-amber-700 mt-1 leading-relaxed">
                      Every booking window — excursions, dining, and check-in — opens at{' '}
                      <strong>12:00 AM Eastern Time (ET)</strong>, no matter where you live.
                      {!isEastern && (
                        <>
                          {' '}For you in <strong>{selectedTz.abbr}</strong>, that&apos;s{' '}
                          <strong>not midnight</strong> — see your local times below.{' '}
                        </>
                      )}
                      Popular spots like Castaway Cay water slides and character breakfasts{' '}
                      <strong>sell out in minutes</strong>. Set an alarm!
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="px-6 py-5 space-y-3">
              {reminders.length === 0 && (
                <p className="text-sm text-slate-400 text-center py-4">
                  Your concierge will add reminders as your sail date approaches.
                </p>
              )}
              {reminders.map((reminder) => {
                const tzInfo = reminder.isMidnightET ? getMidnightETLocal(reminder.isoDate, timezone) : null
                const isHigh = reminder.priority === 'high'
                const dateLabel = shortDateLabel(reminder.isoDate)
                const [month, day] = dateLabel.split(' ')

                return (
                  <div
                    key={reminder.isoDate + reminder.label}
                    className={`flex items-start gap-4 p-4 rounded-xl border transition-colors ${
                      isHigh ? 'border-amber-200 bg-amber-50' : 'border-slate-100 bg-slate-50'
                    }`}
                  >
                    <div className={`text-center rounded-xl px-3 py-2 flex-shrink-0 ${isHigh ? 'bg-amber-100' : 'bg-white border border-slate-100'}`}>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{month}</div>
                      <div className={`text-xl font-bold font-display leading-none mt-0.5 ${isHigh ? 'text-amber-700' : 'text-navy'}`}>{day}</div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-semibold ${isHigh ? 'text-amber-800' : 'text-slate-700'}`}>
                        {reminder.label}
                      </p>

                      {tzInfo && (
                        <div className="mt-1.5">
                          {isEastern ? (
                            <p className="text-xs font-semibold text-navy">12:00 AM Eastern (midnight ET)</p>
                          ) : (
                            <p className="text-xs text-slate-700">
                              <span className="font-bold text-navy">
                                {tzInfo.date} at {tzInfo.time} {tzInfo.tzAbbr}
                              </span>
                              <span className="text-slate-400"> · midnight Eastern</span>
                            </p>
                          )}
                        </div>
                      )}

                      {!tzInfo && (
                        <p className="text-xs text-slate-400 mt-1">Add to your calendar</p>
                      )}
                    </div>

                    {isHigh && (
                      <span className="text-[10px] font-bold uppercase tracking-wide bg-amber-200 text-amber-800 px-2 py-1 rounded-full flex-shrink-0 self-start">
                        Soon!
                      </span>
                    )}
                  </div>
                )
              })}
            </div>
          </section>
        </div>

        {/* ── Documents ── */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2.5">
            <FileText className="w-5 h-5 text-navy" />
            <h2 className="font-display font-bold text-navy text-lg">Your Documents</h2>
          </div>
          <div className="px-6 py-8 text-center">
            <div className="text-4xl mb-2">📄</div>
            <p className="text-sm text-slate-600 font-medium">No documents uploaded yet</p>
            <p className="text-xs text-slate-400 mt-1">
              Confirmations, e-tickets, and travel insurance forwarded by your concierge will appear here.
            </p>
          </div>
        </section>

        {/* ── Notification Preferences ── */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2.5">
            <Bell className="w-5 h-5 text-navy" />
            <h2 className="font-display font-bold text-navy text-lg">Notification Preferences</h2>
          </div>
          <div className="px-6 py-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-semibold text-slate-700 text-sm">Email reminders</p>
                  <p className="text-xs text-slate-400 mt-0.5 truncate">{client.email}</p>
                </div>
                <Toggle on={prefs.email} onChange={(v) => setPrefs((p) => ({ ...p, email: v }))} label="Email reminders" />
              </div>

              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-semibold text-slate-700 text-sm">Text reminders</p>
                  <p className="text-xs text-slate-400 mt-0.5">SMS to your phone on file</p>
                </div>
                <Toggle on={prefs.sms} onChange={(v) => setPrefs((p) => ({ ...p, sms: v }))} label="Text reminders" />
              </div>

              <div>
                <p className="font-semibold text-slate-700 text-sm mb-2">Reminder frequency</p>
                <div className="relative">
                  <select
                    value={prefs.frequency}
                    onChange={(e) => setPrefs((p) => ({ ...p, frequency: e.target.value }))}
                    className="w-full text-sm border border-slate-200 rounded-xl px-3 py-2.5 text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-navy/30 focus:border-navy appearance-none pr-8"
                  >
                    <option value="milestone">Every milestone (recommended)</option>
                    <option value="important">Important only</option>
                    <option value="minimal">Booking windows only</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="mt-5 p-3.5 bg-[#1E3A5F]/10 border border-blue-100 rounded-xl flex items-start gap-2.5">
              <Info className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-blue-700 leading-relaxed">
                Regardless of your settings, Grayson will personally reach out before every major booking window — especially excursions and dining. You won&apos;t miss a thing.
              </p>
            </div>
          </div>
        </section>

        {booking.obcAmount && booking.obcAmount > 0 ? (
          <section className="border-t border-slate-200 pt-6">
            <OBCDisclaimer />
          </section>
        ) : null}

      </div>
    </div>
  )
}

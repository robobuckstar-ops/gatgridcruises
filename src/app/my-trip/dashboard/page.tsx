'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
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
  Users,
  Globe,
  AlertTriangle,
  LogOut,
  Star,
  Download,
  ChevronDown,
} from 'lucide-react'

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

// All demo booking windows open at midnight EDT (UTC-4), valid for April–June 2026.
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

// ─── Demo Data ────────────────────────────────────────────────────────────────

// June 5, 2026 departure at 4:30 PM — live countdown target
const SAILING_DATE = new Date('2026-06-05T16:30:00')

const TRIP = {
  clientName: 'Sarah',
  clientEmail: 'sarah.johnson@email.com',
  ship: 'Disney Fantasy',
  sailingDisplay: 'June 5–12, 2026',
  duration: '7-Night',
  itinerary: 'Eastern Caribbean',
  ports: 'Nassau · Castaway Cay · Grand Cayman',
  departurePort: 'Port Canaveral, FL',
  stateroomNumber: '7526',
  stateroomType: 'Deluxe Ocean View with Verandah',
  stateroomCategory: '4A',
  confirmationNumber: 'DCL-2026-84729',
  guests: 3,
  guestNames: ['Sarah Johnson', 'Mark Johnson', 'Emma Johnson (age 8)'],
  totalPaid: '$5,847',
  onboardCredit: '$300',
}

type ChecklistItem = {
  id: number
  label: string
  done: boolean
  urgent?: boolean
  tzDate?: string
  detail: string
}

const CHECKLIST: ChecklistItem[] = [
  { id: 1, label: 'Booking confirmed', done: true, detail: 'Confirmation #DCL-2026-84729' },
  { id: 2, label: 'Travel insurance purchased', done: true, detail: 'Allianz Gold Plan — all 3 guests covered' },
  { id: 3, label: 'Flights booked', done: true, detail: 'Southwest WN1234 · MCO→DFW · June 12 at 3:15 PM' },
  {
    id: 4,
    label: 'Excursions booked',
    done: false,
    urgent: true,
    tzDate: '2026-04-28',
    detail: 'Booking window opens Apr 28 at midnight Eastern',
  },
  {
    id: 5,
    label: 'Specialty dining reservations',
    done: false,
    tzDate: '2026-05-05',
    detail: 'Remy, Palo, Enchanted Garden — window opens May 5 at midnight Eastern',
  },
  {
    id: 6,
    label: 'Online check-in complete',
    done: false,
    tzDate: '2026-05-20',
    detail: 'Opens May 20 — complete ASAP for best boarding group',
  },
  { id: 7, label: 'Port Adventures selected', done: false, detail: 'Review options at disneycruise.com' },
  { id: 8, label: 'Passports confirmed valid', done: false, detail: 'Must be valid 6+ months beyond June 12, 2026' },
  { id: 9, label: 'Packing list started', done: false, detail: 'GatGrid packing guide sent to your email' },
]

type Reminder = {
  isoDate: string
  dateLabel: string
  label: string
  isMidnightET: boolean
  priority: 'high' | 'medium'
}

const REMINDERS: Reminder[] = [
  { isoDate: '2026-04-28', dateLabel: 'Apr 28', label: 'Excursion booking window opens', isMidnightET: true, priority: 'high' },
  { isoDate: '2026-05-05', dateLabel: 'May 5', label: 'Specialty dining reservations open', isMidnightET: true, priority: 'high' },
  { isoDate: '2026-05-20', dateLabel: 'May 20', label: 'Online check-in opens', isMidnightET: true, priority: 'medium' },
  { isoDate: '2026-06-01', dateLabel: 'Jun 1', label: 'Final documents & packing check', isMidnightET: false, priority: 'medium' },
]

const DOCUMENTS = [
  { name: 'Booking Confirmation', size: 'PDF · 142 KB', date: 'Mar 15, 2026', emoji: '🛳️' },
  { name: 'Travel Insurance Certificate', size: 'PDF · 89 KB', date: 'Mar 17, 2026', emoji: '🛡️' },
  { name: 'Southwest WN1234 E-ticket', size: 'PDF · 67 KB', date: 'Mar 20, 2026', emoji: '✈️' },
  { name: 'Port Canaveral Parking', size: 'PDF · 34 KB', date: 'Mar 21, 2026', emoji: '🚗' },
]

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
  const [mounted, setMounted] = useState(false)
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [timezone, setTimezone] = useState('America/New_York')
  const [checklistState, setChecklistState] = useState<Record<number, boolean>>(
    Object.fromEntries(CHECKLIST.map((item) => [item.id, item.done]))
  )
  const [prefs, setPrefs] = useState({ email: true, sms: true, frequency: 'milestone' })
  const [messageSent, setMessageSent] = useState(false)
  const [showTzInfo, setShowTzInfo] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Auto-detect browser timezone
    const detected = Intl.DateTimeFormat().resolvedOptions().timeZone
    if (TZ_OPTIONS.some((o) => o.value === detected)) {
      setTimezone(detected)
    }
  }, [])

  useEffect(() => {
    const tick = () => {
      const diff = SAILING_DATE.getTime() - Date.now()
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
  }, [])

  const selectedTz = TZ_OPTIONS.find((o) => o.value === timezone) ?? TZ_OPTIONS[0]
  const isEastern = timezone === 'America/New_York'
  const completedCount = Object.values(checklistState).filter(Boolean).length
  const progressPct = Math.round((completedCount / CHECKLIST.length) * 100)

  function toggleCheck(id: number) {
    setChecklistState((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Welcome strip */}
      <div className="bg-navy border-b border-navy/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-white">
            <span>Welcome back,</span>
            <span className="font-bold">{TRIP.clientName}!</span>
            <span className="text-blue-300 hidden sm:inline">·</span>
            <span className="text-gold font-medium hidden sm:inline">{TRIP.ship}</span>
          </div>
          <Link
            href="/my-trip"
            className="flex items-center gap-1.5 text-blue-200 hover:text-white text-xs transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign out</span>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">

        {/* ── Countdown Hero ── */}
        <section className="rounded-2xl bg-gradient-to-br from-[#0a1628] to-[#1E3A5F] text-white p-6 md:p-10 relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-white/[0.03] pointer-events-none" />
          <div className="absolute -left-12 -bottom-12 w-72 h-72 rounded-full bg-gold/[0.05] pointer-events-none" />
          <div className="absolute right-10 bottom-6 text-[120px] opacity-[0.04] pointer-events-none select-none">🛳️</div>

          <div className="relative z-10">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-gold border border-gold/40 rounded-full px-3 py-1">
                <Ship className="w-3 h-3" />
                {TRIP.duration} · {TRIP.itinerary}
              </span>
            </div>

            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-1.5 leading-tight">
              {mounted ? `${countdown.days} days` : '—'} until your cruise!
            </h1>
            <p className="text-blue-200 text-sm md:text-base mb-7">
              {TRIP.ship} · {TRIP.sailingDisplay} · departs {TRIP.departurePort}
            </p>

            {/* Countdown tiles */}
            <div className="flex flex-wrap gap-3 mb-7">
              <CountdownUnit value={countdown.days} label="Days" mounted={mounted} />
              <CountdownUnit value={countdown.hours} label="Hrs" mounted={mounted} />
              <CountdownUnit value={countdown.minutes} label="Min" mounted={mounted} />
              <CountdownUnit value={countdown.seconds} label="Sec" mounted={mounted} />
            </div>

            {/* Ports */}
            <div className="flex items-center gap-2 text-blue-200 text-sm">
              <MapPin className="w-4 h-4 text-gold flex-shrink-0" />
              <span>{TRIP.ports}</span>
            </div>
          </div>
        </section>

        {/* ── Trip Details + Checklist ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Trip Details */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2.5">
              <Ship className="w-5 h-5 text-navy" />
              <h2 className="font-display font-bold text-navy text-lg">Trip Details</h2>
            </div>
            <div className="px-6 py-5 space-y-3.5">
              {[
                { label: 'Ship', value: TRIP.ship },
                { label: 'Sailing dates', value: TRIP.sailingDisplay },
                { label: 'Departs from', value: TRIP.departurePort },
                { label: 'Itinerary', value: `${TRIP.duration} ${TRIP.itinerary}` },
                { label: 'Stateroom', value: `#${TRIP.stateroomNumber} · ${TRIP.stateroomType}` },
                { label: 'Category', value: TRIP.stateroomCategory },
                { label: 'Confirmation #', value: TRIP.confirmationNumber },
                { label: 'Onboard credit', value: `${TRIP.onboardCredit} OBC` },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-start justify-between gap-4 text-sm">
                  <span className="text-slate-400 shrink-0 w-28 pt-0.5">{label}</span>
                  <span className="text-slate-800 font-medium text-right">{value}</span>
                </div>
              ))}
              <div className="pt-3 border-t border-slate-100">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
                  <Users className="w-3.5 h-3.5 inline mr-1" />
                  {TRIP.guests} Guests
                </p>
                <div className="space-y-1">
                  {TRIP.guestNames.map((name) => (
                    <p key={name} className="text-sm text-slate-700">{name}</p>
                  ))}
                </div>
              </div>
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
                  {completedCount}/{CHECKLIST.length}
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
              {CHECKLIST.map((item) => {
                const isDone = checklistState[item.id]
                const tzInfo = item.tzDate ? getMidnightETLocal(item.tzDate, timezone) : null
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
              {/* Avatar + name */}
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

              {/* Message bubble */}
              <div className="relative bg-slate-50 rounded-2xl rounded-tl-sm p-4 border border-slate-100 mb-4">
                <p className="text-sm text-slate-600 leading-relaxed">
                  &ldquo;Hi Sarah! Everything is set for your Disney Fantasy cruise. Your excursion window opens{' '}
                  <strong className="text-navy">April 28</strong> — I&apos;ll send reminders before each window. Castaway Cay activities sell out in <em>minutes</em>, so we&apos;ll be ready right at midnight ET! 🏖️&rdquo;
                </p>
              </div>

              {!messageSent ? (
                <button
                  onClick={() => setMessageSent(true)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-navy text-white rounded-xl text-sm font-semibold hover:bg-[#15304f] transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  Message Grayson
                </button>
              ) : (
                <div className="flex items-center justify-center gap-2 text-sm text-green-600 font-semibold py-2.5">
                  <CheckCircle2 className="w-4 h-4" />
                  Message sent! Grayson will reply within 24 hrs.
                </div>
              )}
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

                {/* Timezone selector */}
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
              </div>

              {/* Timezone explainer — always visible for non-ET, expandable otherwise */}
              {(showTzInfo || !isEastern) && (
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
              {REMINDERS.map((reminder) => {
                const tzInfo = reminder.isMidnightET ? getMidnightETLocal(reminder.isoDate, timezone) : null
                const isHigh = reminder.priority === 'high'
                const [month, day] = reminder.dateLabel.split(' ')

                return (
                  <div
                    key={reminder.isoDate}
                    className={`flex items-start gap-4 p-4 rounded-xl border transition-colors ${
                      isHigh
                        ? 'border-amber-200 bg-amber-50'
                        : 'border-slate-100 bg-slate-50'
                    }`}
                  >
                    {/* Date badge */}
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
                            <p className="text-xs font-semibold text-navy">
                              12:00 AM Eastern (midnight ET)
                            </p>
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
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <FileText className="w-5 h-5 text-navy" />
              <h2 className="font-display font-bold text-navy text-lg">Your Documents</h2>
            </div>
            <span className="text-xs text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full font-medium">
              {DOCUMENTS.length} files
            </span>
          </div>
          <div className="px-6 py-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {DOCUMENTS.map((doc) => (
                <button
                  key={doc.name}
                  className="group flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 hover:border-navy hover:bg-[#1E3A5F]/10/50 transition-all text-left"
                >
                  <span className="text-2xl leading-none mt-0.5">{doc.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-700 group-hover:text-navy leading-tight">{doc.name}</p>
                    <p className="text-xs text-slate-400 mt-1">{doc.size}</p>
                    <p className="text-xs text-slate-400">{doc.date}</p>
                  </div>
                  <Download className="w-3.5 h-3.5 text-slate-300 group-hover:text-navy flex-shrink-0 mt-0.5 transition-colors" />
                </button>
              ))}
            </div>
            <p className="text-xs text-slate-400 mt-4 text-center">
              Documents forwarded by your concierge appear here. More will be added as your trip approaches.
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
                  <p className="text-xs text-slate-400 mt-0.5 truncate">{TRIP.clientEmail}</p>
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

      </div>
    </div>
  )
}

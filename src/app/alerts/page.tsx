'use client'

import { useState } from 'react'
import { Bell, Check, AlertCircle, Ship, Anchor, MapPin, Calendar } from 'lucide-react'

const SHIPS = [
  'Disney Dream',
  'Disney Fantasy',
  'Disney Wish',
  'Disney Wonder',
  'Disney Magic',
  'Disney Treasure',
]

const CABIN_TYPES = [
  { id: 'interior', label: 'Interior', description: 'Best value, no window' },
  { id: 'oceanview', label: 'Oceanview', description: 'Porthole or window' },
  { id: 'verandah', label: 'Verandah', description: 'Private balcony' },
  { id: 'concierge', label: 'Concierge', description: 'Top-tier service' },
]

const DESTINATIONS = [
  'Bahamas',
  'Caribbean (Eastern)',
  'Caribbean (Western)',
  'Caribbean (Southern)',
  'Alaska',
  'Mexico',
  'Mediterranean',
  'Europe',
  'Pacific Coast',
  'Transatlantic',
]

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

interface AlertPrefs {
  ships: string[]
  cabinTypes: string[]
  destinations: string[]
  earliestMonth: string
  latestMonth: string
  email: string
}

export default function AlertsPage() {
  const [prefs, setPrefs] = useState<AlertPrefs>({
    ships: [],
    cabinTypes: [],
    destinations: [],
    earliestMonth: '',
    latestMonth: '',
    email: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  const toggleShip = (ship: string) => {
    setPrefs(p => ({
      ...p,
      ships: p.ships.includes(ship) ? p.ships.filter(s => s !== ship) : [...p.ships, ship],
    }))
  }

  const toggleCabin = (cabin: string) => {
    setPrefs(p => ({
      ...p,
      cabinTypes: p.cabinTypes.includes(cabin)
        ? p.cabinTypes.filter(c => c !== cabin)
        : [...p.cabinTypes, cabin],
    }))
  }

  const toggleDestination = (dest: string) => {
    setPrefs(p => ({
      ...p,
      destinations: p.destinations.includes(dest)
        ? p.destinations.filter(d => d !== dest)
        : [...p.destinations, dest],
    }))
  }

  const validate = (): boolean => {
    const errors: Record<string, string> = {}
    if (!prefs.email || !prefs.email.includes('@')) errors.email = 'Please enter a valid email address'
    if (prefs.ships.length === 0) errors.ships = 'Select at least one ship (or skip to watch all ships)'
    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!validate()) return

    setLoading(true)

    try {
      // Store in localStorage
      const existing = JSON.parse(localStorage.getItem('deal_alerts') || '[]')
      const signup = {
        ...prefs,
        signedUpAt: new Date().toISOString(),
        id: Date.now().toString(),
      }
      existing.push(signup)
      localStorage.setItem('deal_alerts', JSON.stringify(existing))

      // Also subscribe to newsletter
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: prefs.email,
          preferences: {
            source: 'deal_alerts',
            ships: prefs.ships,
            cabinTypes: prefs.cabinTypes,
            destinations: prefs.destinations,
          },
        }),
      }).catch(() => {}) // don't block on this

      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center px-4">
        <div className="max-w-lg w-full text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 rounded-full mb-6">
            <Check className="w-10 h-10 text-emerald-600" />
          </div>
          <h1 className="font-display text-3xl font-bold text-slate-900 mb-3">Alert Set!</h1>
          <p className="text-slate-600 mb-6 leading-relaxed">
            We'll watch for deals matching your preferences and notify you at{' '}
            <strong className="text-slate-900">{prefs.email}</strong>.
            The best Disney cruise deals sell fast — you'll be first to know.
          </p>

          <div className="bg-white border border-slate-200 rounded-xl p-6 text-left mb-6 space-y-3">
            {prefs.ships.length > 0 && (
              <div className="flex gap-3">
                <Ship className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Ships</p>
                  <p className="text-sm text-slate-700">{prefs.ships.join(', ')}</p>
                </div>
              </div>
            )}
            {prefs.cabinTypes.length > 0 && (
              <div className="flex gap-3">
                <Anchor className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Cabin Types</p>
                  <p className="text-sm text-slate-700">{prefs.cabinTypes.map(c => CABIN_TYPES.find(t => t.id === c)?.label).join(', ')}</p>
                </div>
              </div>
            )}
            {prefs.destinations.length > 0 && (
              <div className="flex gap-3">
                <MapPin className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Destinations</p>
                  <p className="text-sm text-slate-700">{prefs.destinations.join(', ')}</p>
                </div>
              </div>
            )}
            {(prefs.earliestMonth || prefs.latestMonth) && (
              <div className="flex gap-3">
                <Calendar className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Travel Window</p>
                  <p className="text-sm text-slate-700">
                    {prefs.earliestMonth && prefs.latestMonth
                      ? `${prefs.earliestMonth} – ${prefs.latestMonth}`
                      : prefs.earliestMonth || prefs.latestMonth}
                  </p>
                </div>
              </div>
            )}
          </div>

          <a
            href="/deals"
            className="inline-flex items-center justify-center px-8 py-3 bg-[#1E3A5F] text-white font-semibold rounded-lg hover:bg-[#162d4a] transition-colors"
          >
            Browse Current Deals
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <div className="bg-[#1E3A5F] py-14 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-[#D4AF37]/20 rounded-full mb-4">
            <Bell className="w-7 h-7 text-[#D4AF37]" />
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Deal Alerts
          </h1>
          <p className="text-blue-200 text-lg max-w-xl mx-auto leading-relaxed">
            Tell us what you're looking for. We'll watch thousands of Disney cruise sailings and email you the moment a deal appears.
          </p>
          <div className="flex flex-wrap justify-center gap-6 mt-6 text-sm text-blue-300">
            <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-[#D4AF37]" /> Prices watched daily</span>
            <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-[#D4AF37]" /> Instant email alerts</span>
            <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-[#D4AF37]" /> Unsubscribe anytime</span>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <form onSubmit={handleSubmit} className="space-y-8" noValidate>

          {/* Ships */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-center justify-center w-9 h-9 bg-blue-50 rounded-lg">
                <Ship className="w-5 h-5 text-blue-600" aria-hidden="true" />
              </div>
              <div>
                <h2 className="font-display text-lg font-bold text-slate-900">Which ships?</h2>
                <p className="text-xs text-slate-500">Leave blank to watch all ships</p>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {SHIPS.map(ship => (
                <button
                  key={ship}
                  type="button"
                  onClick={() => toggleShip(ship)}
                  className={`px-4 py-3 rounded-xl border-2 text-sm font-medium text-left transition-all ${
                    prefs.ships.includes(ship)
                      ? 'border-[#1E3A5F] bg-[#1E3A5F] text-white'
                      : 'border-slate-200 text-slate-700 hover:border-slate-300 bg-white'
                  }`}
                  aria-pressed={prefs.ships.includes(ship)}
                >
                  {ship}
                </button>
              ))}
            </div>
            {fieldErrors.ships && (
              <p className="mt-2 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" />
                {fieldErrors.ships}
              </p>
            )}
          </section>

          {/* Cabin Type */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-center justify-center w-9 h-9 bg-blue-50 rounded-lg">
                <Anchor className="w-5 h-5 text-blue-600" aria-hidden="true" />
              </div>
              <div>
                <h2 className="font-display text-lg font-bold text-slate-900">Cabin type</h2>
                <p className="text-xs text-slate-500">Select all that apply</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {CABIN_TYPES.map(cabin => (
                <button
                  key={cabin.id}
                  type="button"
                  onClick={() => toggleCabin(cabin.id)}
                  className={`px-4 py-3 rounded-xl border-2 text-left transition-all ${
                    prefs.cabinTypes.includes(cabin.id)
                      ? 'border-[#1E3A5F] bg-[#1E3A5F] text-white'
                      : 'border-slate-200 text-slate-700 hover:border-slate-300 bg-white'
                  }`}
                  aria-pressed={prefs.cabinTypes.includes(cabin.id)}
                >
                  <p className="font-semibold text-sm">{cabin.label}</p>
                  <p className={`text-xs mt-0.5 ${prefs.cabinTypes.includes(cabin.id) ? 'text-blue-200' : 'text-slate-500'}`}>
                    {cabin.description}
                  </p>
                </button>
              ))}
            </div>
          </section>

          {/* Destinations */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-center justify-center w-9 h-9 bg-blue-50 rounded-lg">
                <MapPin className="w-5 h-5 text-blue-600" aria-hidden="true" />
              </div>
              <div>
                <h2 className="font-display text-lg font-bold text-slate-900">Destinations</h2>
                <p className="text-xs text-slate-500">Leave blank to watch all destinations</p>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {DESTINATIONS.map(dest => (
                <button
                  key={dest}
                  type="button"
                  onClick={() => toggleDestination(dest)}
                  className={`px-4 py-2.5 rounded-xl border-2 text-sm font-medium text-left transition-all ${
                    prefs.destinations.includes(dest)
                      ? 'border-[#1E3A5F] bg-[#1E3A5F] text-white'
                      : 'border-slate-200 text-slate-700 hover:border-slate-300 bg-white'
                  }`}
                  aria-pressed={prefs.destinations.includes(dest)}
                >
                  {dest}
                </button>
              ))}
            </div>
          </section>

          {/* Travel Window */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-center justify-center w-9 h-9 bg-blue-50 rounded-lg">
                <Calendar className="w-5 h-5 text-blue-600" aria-hidden="true" />
              </div>
              <div>
                <h2 className="font-display text-lg font-bold text-slate-900">Travel window</h2>
                <p className="text-xs text-slate-500">Optional — leave blank to watch all dates</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="earliest-month" className="block text-sm font-semibold text-slate-700 mb-2">
                  Earliest month
                </label>
                <select
                  id="earliest-month"
                  value={prefs.earliestMonth}
                  onChange={e => setPrefs(p => ({ ...p, earliestMonth: e.target.value }))}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Any month</option>
                  {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="latest-month" className="block text-sm font-semibold text-slate-700 mb-2">
                  Latest month
                </label>
                <select
                  id="latest-month"
                  value={prefs.latestMonth}
                  onChange={e => setPrefs(p => ({ ...p, latestMonth: e.target.value }))}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Any month</option>
                  {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
            </div>
          </section>

          {/* Email */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h2 className="font-display text-lg font-bold text-slate-900 mb-5">Where should we send alerts?</h2>
            <div>
              <label htmlFor="alerts-email" className="block text-sm font-semibold text-slate-700 mb-2">
                Email address <span className="text-red-500">*</span>
              </label>
              <input
                id="alerts-email"
                type="email"
                value={prefs.email}
                onChange={e => setPrefs(p => ({ ...p, email: e.target.value }))}
                placeholder="your@email.com"
                required
                disabled={loading}
                className={`w-full px-4 py-3 border rounded-xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 ${
                  fieldErrors.email ? 'border-red-400' : 'border-slate-300'
                }`}
                aria-invalid={!!fieldErrors.email}
                aria-describedby={fieldErrors.email ? 'email-error' : undefined}
              />
              {fieldErrors.email && (
                <p id="email-error" className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" />
                  {fieldErrors.email}
                </p>
              )}
              <p className="mt-2 text-xs text-slate-500">
                We'll only email you when deals matching your criteria appear. Unsubscribe anytime.
              </p>
            </div>
          </section>

          {/* Error */}
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3" role="alert">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" aria-hidden="true" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-[#D4AF37] text-[#1E3A5F] font-bold text-lg rounded-2xl hover:bg-yellow-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            {loading ? 'Setting up your alerts…' : '🔔 Set My Deal Alerts'}
          </button>

          <p className="text-center text-xs text-slate-400">
            Free forever. No credit card required.
          </p>
        </form>
      </div>
    </div>
  )
}

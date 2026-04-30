'use client'

import { useState } from 'react'
import { Plane, Check, AlertCircle, ArrowRight } from 'lucide-react'

const DESTINATION_AIRPORTS = [
  { code: 'MCO', label: 'MCO — Orlando (Port Canaveral)' },
  { code: 'MIA', label: 'MIA — Miami (PortMiami)' },
  { code: 'FLL', label: 'FLL — Fort Lauderdale (Port Everglades)' },
  { code: 'TPA', label: 'TPA — Tampa (Port Tampa Bay)' },
  { code: 'JAX', label: 'JAX — Jacksonville' },
]

export function FlightDealsForm({ dark = false }: { dark?: boolean }) {
  const [email, setEmail] = useState('')
  const [departureCity, setDepartureCity] = useState('')
  const [cruiseMonth, setCruiseMonth] = useState('')
  const [destination, setDestination] = useState('MCO')
  const [honeypot, setHoneypot] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/flight-deals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          departureCity,
          cruiseMonth,
          destination,
          _honeypot: honeypot,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(
          response.status === 409
            ? "You're already on the list — we'll email you when matching deals appear."
            : data.error || 'Something went wrong. Please try again.',
        )
        setLoading(false)
        return
      }

      setSubmitted(true)
      setLoading(false)
    } catch {
      setError('An error occurred. Please try again.')
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-3 py-6">
        <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center">
          <Check className="w-7 h-7 text-emerald-600" aria-hidden="true" />
        </div>
        <h3 className={`font-semibold text-lg ${dark ? 'text-white' : 'text-slate-900'}`}>
          You&apos;re on the flight watch list!
        </h3>
        <p className={`text-sm text-center max-w-sm ${dark ? 'text-blue-200' : 'text-slate-600'}`}>
          We&apos;ll email you the moment Southwest releases dates or runs a promo matching your cruise window.
        </p>
      </div>
    )
  }

  const labelClass = dark ? 'text-blue-100' : 'text-slate-700'
  const inputClass = dark
    ? 'w-full px-4 py-3 bg-white/10 border border-white/25 rounded-lg text-white placeholder:text-blue-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37]'
    : 'w-full px-4 py-3 border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A5F] focus:border-[#1E3A5F] bg-white shadow-sm'

  return (
    <div className={`rounded-2xl p-6 md:p-8 ${dark ? 'bg-white/5 border border-white/10' : 'bg-white border border-slate-200 shadow-sm'}`}>
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2" role="alert">
          <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4" aria-label="Flight deal alert signup">
        <div style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0 }} aria-hidden="true">
          <input
            type="text"
            name="website"
            value={honeypot}
            onChange={e => setHoneypot(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div>
          <label htmlFor="flight-email" className={`block text-sm font-medium mb-1.5 ${labelClass}`}>
            Email address
          </label>
          <input
            id="flight-email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            disabled={loading}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="flight-departure" className={`block text-sm font-medium mb-1.5 ${labelClass}`}>
            Departure city or airport
          </label>
          <input
            id="flight-departure"
            type="text"
            value={departureCity}
            onChange={e => setDepartureCity(e.target.value)}
            placeholder="e.g. Chicago, ORD, or Midway"
            required
            disabled={loading}
            className={inputClass}
            maxLength={80}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="flight-month" className={`block text-sm font-medium mb-1.5 ${labelClass}`}>
              Cruise month / dates
            </label>
            <input
              id="flight-month"
              type="text"
              value={cruiseMonth}
              onChange={e => setCruiseMonth(e.target.value)}
              placeholder="e.g. June 2026 or 6/14/26"
              required
              disabled={loading}
              className={inputClass}
              maxLength={60}
            />
          </div>

          <div>
            <label htmlFor="flight-destination" className={`block text-sm font-medium mb-1.5 ${labelClass}`}>
              Destination airport
            </label>
            <select
              id="flight-destination"
              value={destination}
              onChange={e => setDestination(e.target.value)}
              required
              disabled={loading}
              className={inputClass}
            >
              {DESTINATION_AIRPORTS.map(a => (
                <option key={a.code} value={a.code} className="text-slate-900">
                  {a.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex w-full items-center justify-center gap-2 px-6 py-3.5 bg-[#D4AF37] text-[#0a1628] font-bold text-sm rounded-lg hover:bg-yellow-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            'Adding you to the list…'
          ) : (
            <>
              <Plane className="w-4 h-4" aria-hidden="true" />
              Alert Me When Flights Drop
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </>
          )}
        </button>

        <p className={`text-xs text-center ${dark ? 'text-blue-300' : 'text-slate-500'}`}>
          Free. No credit card. Unsubscribe anytime.
        </p>
      </form>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { Check, AlertCircle, Info } from 'lucide-react'

type RateType = 'florida' | 'socal' | 'canada' | 'ap'

interface ResidentRateAlertProps {
  rateType: RateType
}

const CONFIG: Record<
  RateType,
  { title: string; description: string; icon: string; source: string; category: string }
> = {
  florida: {
    title: 'Florida Resident Rates',
    description:
      'Disney offers special discounts for Florida residents. These rates appear and disappear quickly based on inventory — sometimes 10–20% off standard pricing.',
    icon: '🌴',
    source: 'florida-resident-alert',
    category: 'resident',
  },
  socal: {
    title: 'SoCal Resident Rates',
    description:
      'Southern California residents (ZIP codes 90000–93599) can access special DCL pricing when available. These rates are limited and sell fast.',
    icon: '🌊',
    source: 'socal-resident-alert',
    category: 'resident',
  },
  canada: {
    title: 'Canadian Resident Rates',
    description:
      'Canadian residents can qualify for special pricing on select Disney cruises. Rates vary by sailing and availability.',
    icon: '🍁',
    source: 'canada-resident-alert',
    category: 'resident',
  },
  ap: {
    title: 'Annual Passholder Rates',
    description:
      'Disney Annual Passholders get exclusive pricing on select sailings. AP rates have limited inventory and can disappear within hours.',
    icon: '🎟️',
    source: 'ap-rate-alert',
    category: 'ap_rates',
  },
}

export function ResidentRateAlert({ rateType }: ResidentRateAlertProps) {
  const config = CONFIG[rateType]
  const [email, setEmail] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          preferences: { alert_categories: [config.category], source: config.source },
          _honeypot: honeypot,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(
          response.status === 409 ? 'Already subscribed!' : data.error || 'Failed. Please try again.'
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

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
      <div className="flex items-start gap-3">
        <span className="text-2xl flex-shrink-0 mt-0.5" aria-hidden="true">
          {config.icon}
        </span>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-slate-800 text-sm mb-1">{config.title}</h4>
          <div className="flex items-start gap-1.5 mb-3">
            <Info className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
            <p className="text-xs text-slate-600">
              {config.description} Get an email alert the moment they appear.
            </p>
          </div>
          {submitted ? (
            <div className="flex items-center gap-2 text-emerald-700 text-sm">
              <Check className="h-4 w-4 flex-shrink-0" />
              <span>Alert set! We&apos;ll email you when rates drop.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-2">
              <div
                style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0 }}
                aria-hidden="true"
              >
                <input
                  type="text"
                  name="website"
                  value={honeypot}
                  onChange={e => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                disabled={loading}
                className="flex-1 px-3 py-2 text-sm border border-amber-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-amber-400 min-w-0 disabled:opacity-50"
                aria-label={`Email for ${config.title} alerts`}
              />
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-[#1E3A5F] text-white text-xs font-semibold rounded-lg hover:bg-[#162d4a] transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
              >
                {loading ? '...' : 'Alert Me'}
              </button>
            </form>
          )}
          {error && <p className="text-xs text-red-600 mt-1.5">{error}</p>}
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { ArrowRight, Check, AlertCircle, Bell } from 'lucide-react'

const CATEGORIES = [
  { id: 'military', label: '🎖️ Military Rates', description: 'Service member exclusive pricing' },
  { id: 'resident', label: '🏠 Resident Rates', description: 'FL, SoCal & Canadian discounts' },
  { id: 'family', label: '👨‍👩‍👧‍👦 Family Promos', description: 'Kids-sail-free & family offers' },
  { id: 'last_minute', label: '⚡ Last-Minute Deals', description: 'Flash pricing on upcoming sailings' },
  { id: 'ap_rates', label: '🎟️ AP Rates', description: 'Annual Passholder exclusive pricing' },
] as const

type CategoryId = (typeof CATEGORIES)[number]['id']

interface SegmentedEmailSignupProps {
  title?: string
  description?: string
  dark?: boolean
}

export function SegmentedEmailSignup({
  title = 'Get Alerts for What Matters to You',
  description = "Choose the deal types you care about. We'll email you the moment they drop.",
  dark = false,
}: SegmentedEmailSignupProps) {
  const [email, setEmail] = useState('')
  const [selected, setSelected] = useState<CategoryId[]>([])
  const [honeypot, setHoneypot] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const toggle = (id: CategoryId) => {
    setSelected(prev => (prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (!email) {
      setError('Please enter an email address')
      setLoading(false)
      return
    }

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          preferences: {
            alert_categories: selected.length > 0 ? selected : CATEGORIES.map(c => c.id),
            source: 'segmented-signup',
          },
          _honeypot: honeypot,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(
          response.status === 409
            ? 'This email is already subscribed'
            : data.error || 'Failed to subscribe. Please try again.'
        )
        setLoading(false)
        return
      }

      setSubmitted(true)
      setLoading(false)
    } catch {
      setError('An error occurred. Please try again later.')
      setLoading(false)
    }
  }

  const cardBg = dark ? 'bg-[#0a1628] border-white/10' : 'bg-slate-50 border-slate-200'
  const headingColor = dark ? 'text-white' : 'text-slate-900'
  const subColor = dark ? 'text-blue-200' : 'text-slate-500'
  const inputClass = dark
    ? 'bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:outline-blue-400'
    : 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-blue-600'

  if (submitted) {
    return (
      <div className={`border rounded-xl p-8 text-center ${cardBg}`}>
        <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-500/20 rounded-full mb-3">
          <Check className="h-6 w-6 text-emerald-400" />
        </div>
        <h3 className={`font-display text-lg font-semibold ${headingColor} mb-1`}>Alerts Set!</h3>
        <p className={`text-sm ${subColor}`}>
          {selected.length === 0
            ? "You're subscribed to all deal categories."
            : `Subscribed to: ${selected.map(id => CATEGORIES.find(c => c.id === id)?.label).join(', ')}.`}
        </p>
      </div>
    )
  }

  return (
    <div className={`border rounded-xl p-6 sm:p-8 ${cardBg}`}>
      <div className="flex items-center gap-3 mb-2">
        <div
          className={`inline-flex items-center justify-center w-10 h-10 rounded-full ${
            dark ? 'bg-[#D4AF37]/20' : 'bg-[#1E3A5F]/10'
          }`}
        >
          <Bell className={`h-5 w-5 ${dark ? 'text-[#D4AF37]' : 'text-[#1E3A5F]'}`} />
        </div>
        <h3 className={`font-display text-lg sm:text-xl font-semibold ${headingColor}`}>{title}</h3>
      </div>
      <p className={`${subColor} text-sm mb-5`}>{description}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            type="button"
            onClick={() => toggle(cat.id)}
            className={`text-left px-4 py-3 rounded-lg border text-sm transition-colors ${
              selected.includes(cat.id)
                ? 'bg-[#1E3A5F] text-white border-[#1E3A5F]'
                : dark
                  ? 'bg-white/5 text-blue-100 border-white/20 hover:border-[#D4AF37]/50'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-[#1E3A5F]/40'
            }`}
          >
            <div className="font-semibold">{cat.label}</div>
            <div
              className={`text-xs mt-0.5 ${selected.includes(cat.id) ? 'text-blue-200' : subColor}`}
            >
              {cat.description}
            </div>
          </button>
        ))}
      </div>

      <p className={`text-xs ${subColor} mb-5`}>
        {selected.length === 0
          ? 'No selection = alerts for all categories'
          : `${selected.length} of 5 selected`}
      </p>

      {error && (
        <div
          className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2"
          role="alert"
        >
          <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
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
        <label htmlFor="segmented-email-input" className="sr-only">
          Email address
        </label>
        <input
          id="segmented-email-input"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          disabled={loading}
          className={`w-full sm:flex-1 px-4 py-3 border rounded-lg text-sm focus:outline-2 focus:outline-offset-2 disabled:opacity-50 ${inputClass}`}
        />
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-3 bg-[#D4AF37] text-[#1E3A5F] font-semibold text-sm rounded-lg hover:bg-yellow-300 transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Setting up...' : 'Get Alerts'}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </form>
    </div>
  )
}

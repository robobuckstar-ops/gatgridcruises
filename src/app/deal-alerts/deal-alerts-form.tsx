'use client'

import { useState } from 'react'
import { Bell, Check, AlertCircle, ArrowRight } from 'lucide-react'

interface DealAlertsFormProps {
  dark?: boolean
}

export function DealAlertsForm({ dark = false }: DealAlertsFormProps) {
  const [email, setEmail] = useState('')
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
        body: JSON.stringify({ email, preferences: { source: 'deal_alerts_page' } }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(response.status === 409 ? "You're already subscribed!" : (data.error || 'Something went wrong. Please try again.'))
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
          You're subscribed!
        </h3>
        <p className={`text-sm text-center ${dark ? 'text-blue-200' : 'text-slate-600'}`}>
          Check your inbox for a welcome email from Grayson. Deal alerts start immediately.
        </p>
      </div>
    )
  }

  const inputClass = dark
    ? 'flex-1 px-4 py-3 bg-white/10 border border-white/25 rounded-lg text-white placeholder:text-blue-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37]'
    : 'flex-1 px-4 py-3 border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A5F] focus:border-[#1E3A5F] bg-white shadow-sm'

  return (
    <div>
      {error && (
        <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2" role="alert">
          <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex gap-2" aria-label="Deal alerts signup">
        <label htmlFor="deal-alerts-email" className="sr-only">Email address</label>
        <div className="flex-1 flex items-center gap-2 relative">
          <Bell className={`absolute left-3 w-4 h-4 ${dark ? 'text-blue-300' : 'text-slate-400'}`} aria-hidden="true" />
          <input
            id="deal-alerts-email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            disabled={loading}
            className={inputClass + ' pl-9'}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#D4AF37] text-[#1E3A5F] font-bold text-sm rounded-lg hover:bg-yellow-300 transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Subscribing…' : 'Get Alerts'}
          {!loading && <ArrowRight className="w-4 h-4" aria-hidden="true" />}
        </button>
      </form>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { Bell, Check, AlertCircle } from 'lucide-react'

export function HeroEmailCapture() {
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
        body: JSON.stringify({ email, preferences: { source: 'hero' }, _honeypot: honeypot }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(response.status === 409 ? "Already subscribed!" : (data.error || 'Failed to subscribe.'))
        setLoading(false)
        return
      }

      setSubmitted(true)
      setLoading(false)
      if (typeof window !== 'undefined') {
        localStorage.setItem('newsletter_subscribed', '1')
      }
    } catch {
      setError('Something went wrong. Try again.')
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="flex items-center gap-2 px-5 py-2.5 bg-emerald-50 border border-emerald-200 rounded-full text-sm text-emerald-700 font-medium">
        <Check className="w-4 h-4 text-emerald-600" aria-hidden="true" />
        You're subscribed! Check your inbox Sunday.
      </div>
    )
  }

  return (
    <div className="w-full max-w-lg">
      <div className="flex items-center justify-center gap-2 mb-2">
        <Bell className="w-4 h-4 text-slate-500" aria-hidden="true" />
        <p className="text-sm text-slate-500 font-medium">Get free deal alerts — no spam, ever</p>
      </div>
      {error && (
        <div className="flex items-center gap-1.5 justify-center mb-2" role="alert">
          <AlertCircle className="w-3.5 h-3.5 text-red-500" aria-hidden="true" />
          <p className="text-xs text-red-600">{error}</p>
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="flex gap-2"
        role="region"
        aria-label="Quick newsletter signup"
      >
        <div style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0 }} aria-hidden="true">
          <input type="text" name="website" value={honeypot} onChange={e => setHoneypot(e.target.value)} tabIndex={-1} autoComplete="off" />
        </div>
        <label htmlFor="hero-email-input" className="sr-only">Email address</label>
        <input
          id="hero-email-input"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          disabled={loading}
          className="flex-1 px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 text-sm bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-5 py-2.5 bg-[#1E3A5F] text-white font-semibold text-sm rounded-lg hover:bg-[#162d4a] transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
        >
          {loading ? 'Subscribing…' : 'Get Alerts'}
        </button>
      </form>
    </div>
  )
}

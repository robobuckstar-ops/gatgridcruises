'use client'

import { useState } from 'react'
import { ArrowRight, Check, AlertCircle } from 'lucide-react'

export function NewsletterSignupForm({ source }: { source: string }) {
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
        body: JSON.stringify({ email, preferences: { source }, _honeypot: honeypot }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(response.status === 409 ? "You're already subscribed!" : (data.error || 'Something went wrong.'))
        setLoading(false)
        return
      }

      setSubmitted(true)
      setLoading(false)
      if (typeof window !== 'undefined') {
        localStorage.setItem('newsletter_subscribed', '1')
      }
    } catch {
      setError('An error occurred. Please try again.')
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="inline-flex items-center gap-3 px-6 py-4 bg-emerald-500/20 border border-emerald-400/30 rounded-2xl">
        <div className="flex-shrink-0 w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center">
          <Check className="w-5 h-5 text-emerald-400" />
        </div>
        <div className="text-left">
          <p className="font-bold text-white text-sm">You're subscribed!</p>
          <p className="text-blue-200 text-xs">Watch for your first issue soon.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {error && (
        <div className="mb-3 p-3 bg-red-900/30 border border-red-500/30 rounded-xl flex items-center gap-2" role="alert">
          <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" aria-hidden="true" />
          <p className="text-sm text-red-300">{error}</p>
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="flex gap-2"
        role="region"
        aria-label="Newsletter signup"
      >
        <div style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0 }} aria-hidden="true">
          <input type="text" name="website" value={honeypot} onChange={e => setHoneypot(e.target.value)} tabIndex={-1} autoComplete="off" />
        </div>
        <label htmlFor={`newsletter-email-${source}`} className="sr-only">Email address</label>
        <input
          id={`newsletter-email-${source}`}
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          disabled={loading}
          className="flex-1 px-5 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-blue-300 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-5 py-3.5 bg-[#D4AF37] text-[#1E3A5F] font-bold rounded-xl hover:bg-yellow-300 transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {loading ? 'Joining…' : (
            <>Subscribe <ArrowRight className="w-4 h-4" aria-hidden="true" /></>
          )}
        </button>
      </form>
      <p className="mt-3 text-xs text-blue-300 text-center">Free. No credit card. Unsubscribe anytime.</p>
    </div>
  )
}

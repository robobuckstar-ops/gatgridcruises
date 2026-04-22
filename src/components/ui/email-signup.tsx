'use client'

import { useState } from 'react'
import { Mail, ArrowRight, Check, AlertCircle } from 'lucide-react'

export function EmailSignup() {
  const [email, setEmail] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

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
        body: JSON.stringify({ email, preferences: {}, _honeypot: honeypot }),
      })

      const data = await response.json()

      if (!response.ok) {
        if (response.status === 409) {
          setError('This email is already subscribed')
        } else {
          setError(data.error || 'Failed to subscribe. Please try again.')
        }
        setLoading(false)
        return
      }

      setSubmitted(true)
      setLoading(false)
    } catch (err) {
      setError('An error occurred. Please try again later.')
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-full mb-3">
          <Check className="h-6 w-6 text-emerald-600" />
        </div>
        <h3 className="font-display text-lg font-semibold text-emerald-800 mb-1">You&apos;re In!</h3>
        <p className="text-sm text-emerald-600">
          Watch your inbox for the best Disney cruise deals every Sunday.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-blue-600 rounded-xl p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-3">
        <div className="inline-flex items-center justify-center w-10 h-10 bg-white/20 rounded-full">
          <Mail className="h-5 w-5 text-white" />
        </div>
        <h3 className="font-display text-lg sm:text-xl font-semibold text-white">
          Weekly Deal Digest
        </h3>
      </div>
      <p className="text-blue-100 text-sm mb-4">
        Get the best Disney cruise deals delivered to your inbox every Sunday. Free, no spam, unsubscribe anytime.
      </p>
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2" role="alert">
          <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
          <p id="email-error" className="text-sm text-red-700">{error}</p>
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex gap-2" role="region" aria-label="Email subscription form">
        <div style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0 }} aria-hidden="true">
          <input type="text" name="website" value={honeypot} onChange={e => setHoneypot(e.target.value)} tabIndex={-1} autoComplete="off" />
        </div>
        <label htmlFor="email-input" className="sr-only">
          Email address
        </label>
        <input
          id="email-input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          disabled={loading}
          className="flex-1 px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-slate-400 text-sm focus:outline-2 focus:outline-offset-2 focus:outline-blue-400 disabled:opacity-50"
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? 'email-error' : undefined}
        />
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#D4AF37] text-[#1E3A5F] font-semibold text-sm rounded-lg hover:bg-yellow-300 transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed focus:outline-2 focus:outline-offset-2 focus:outline-blue-400"
        >
          {loading ? 'Subscribing...' : 'Subscribe'}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </form>
    </div>
  )
}

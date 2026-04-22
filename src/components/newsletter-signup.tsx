'use client'

import { useState } from 'react'

interface NewsletterSignupProps {
  variant?: 'banner' | 'compact'
}

export function NewsletterSignup({ variant = 'banner' }: NewsletterSignupProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')

    const trimmed = email.trim().toLowerCase()
    if (!trimmed || !trimmed.includes('@')) {
      setErrorMsg('Please enter a valid email address.')
      return
    }

    try {
      const existing: string[] = JSON.parse(localStorage.getItem('ggc_newsletter_emails') || '[]')
      if (existing.includes(trimmed)) {
        setStatus('success')
        return
      }
      localStorage.setItem('ggc_newsletter_emails', JSON.stringify([...existing, trimmed]))
      setStatus('success')
    } catch {
      setErrorMsg('Something went wrong. Please try again.')
    }
  }

  if (status === 'success') {
    if (variant === 'compact') {
      return (
        <div className="flex items-center gap-2 text-emerald-700 text-sm font-medium">
          <span className="text-emerald-500 text-lg">✓</span>
          You&apos;re on the list! Watch your inbox for Disney cruise deals.
        </div>
      )
    }
    return (
      <div className="bg-emerald-900 rounded-2xl p-8 text-center">
        <div className="text-4xl mb-3">⚓</div>
        <h3 className="font-display text-xl font-bold text-white mb-2">You&apos;re on the list!</h3>
        <p className="text-emerald-200 text-sm">
          Watch your inbox every Sunday for the best Disney cruise deal alerts. We&apos;ll never spam you.
        </p>
      </div>
    )
  }

  if (variant === 'compact') {
    return (
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="flex-1 px-3 py-2 rounded-lg border border-slate-300 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors whitespace-nowrap"
        >
          Get Alerts
        </button>
      </form>
    )
  }

  return (
    <div className="bg-gradient-to-br from-blue-950 to-navy rounded-2xl p-8 sm:p-10">
      <div className="max-w-xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/10 text-3xl mb-4">
          ⚓
        </div>
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">
          Get Weekly Deal Alerts
        </h2>
        <p className="text-blue-200 text-sm mb-1">
          Join 1,000+ Disney cruise deal hunters.
        </p>
        <p className="text-blue-300 text-sm mb-6">
          Free weekly alerts when prices drop — plus packing tips, itinerary guides, and port intel.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setErrorMsg('') }}
            placeholder="your@email.com"
            className="flex-1 px-4 py-3 rounded-xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-slate-400"
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-[#D4AF37] hover:bg-yellow-300 text-slate-900 font-bold text-sm transition-colors whitespace-nowrap"
          >
            Get Weekly Deal Alerts
          </button>
        </form>

        {errorMsg && (
          <p className="mt-3 text-red-300 text-xs">{errorMsg}</p>
        )}

        <p className="mt-4 text-blue-400 text-xs">
          No spam. No booking pressure. Unsubscribe anytime.
        </p>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { Bell, CheckCircle } from 'lucide-react'

interface NewsletterSignupProps {
  variant?: 'inline' | 'card' | 'banner'
  className?: string
}

export function NewsletterSignup({ variant = 'card', className = '' }: NewsletterSignupProps) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    await new Promise((r) => setTimeout(r, 600))
    setSubmitted(true)
    setLoading(false)
  }

  if (variant === 'inline') {
    return (
      <div className={`flex flex-col sm:flex-row gap-3 ${className}`}>
        {submitted ? (
          <div className="flex items-center gap-2 text-emerald-600 font-medium text-sm">
            <CheckCircle className="h-5 w-5" />
            You're in! Deal alerts coming your way.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 w-full">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 px-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 bg-[#1E3A5F] text-white font-semibold rounded-lg hover:bg-[#162d4a] transition text-sm disabled:opacity-60 whitespace-nowrap"
            >
              {loading ? 'Signing up…' : 'Get Alerts'}
            </button>
          </form>
        )}
      </div>
    )
  }

  if (variant === 'banner') {
    return (
      <div className={`bg-[#1E3A5F] text-white py-4 px-6 ${className}`}>
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-4">
          <div className="flex items-center gap-2 flex-1">
            <Bell className="h-5 w-5 text-yellow-300 flex-shrink-0" />
            <p className="text-sm font-medium">
              Get weekly Disney cruise deal alerts — free.
            </p>
          </div>
          {submitted ? (
            <div className="flex items-center gap-2 text-yellow-300 text-sm font-medium">
              <CheckCircle className="h-4 w-4" />
              You're subscribed!
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="px-3 py-1.5 rounded text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 w-44"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-1.5 bg-yellow-400 text-slate-900 font-bold rounded text-sm hover:bg-yellow-300 transition disabled:opacity-60"
              >
                {loading ? '…' : 'Subscribe'}
              </button>
            </form>
          )}
        </div>
      </div>
    )
  }

  // default: card
  return (
    <div className={`bg-gradient-to-b from-[#0a1628] to-[#1E3A5F] rounded-xl p-8 border border-blue-100 ${className}`}>
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 bg-[#1E3A5F] rounded-full flex items-center justify-center flex-shrink-0">
          <Bell className="h-5 w-5 text-white" />
        </div>
        <div>
          <h3 className="font-fraunces font-bold text-slate-900 text-lg">Get Weekly Deal Alerts</h3>
          <p className="text-slate-500 text-xs">Price drops, promotions, and sailing tips</p>
        </div>
      </div>

      <p className="text-slate-600 text-sm mb-5">
        Disney Cruise Line deals go fast. Get notified the moment prices drop on your preferred
        sailing dates, ship, or itinerary — no spam, unsubscribe any time.
      </p>

      {submitted ? (
        <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-3">
          <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0" />
          <div>
            <p className="font-semibold text-emerald-800 text-sm">You're on the list!</p>
            <p className="text-emerald-600 text-xs">Look for your first deal alert within the week.</p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="flex-1 px-4 py-3 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-[#1E3A5F] text-white font-semibold rounded-lg hover:bg-[#162d4a] transition text-sm disabled:opacity-60 whitespace-nowrap"
          >
            {loading ? 'Signing up…' : 'Send Me Deals'}
          </button>
        </form>
      )}

      <p className="text-xs text-slate-400 mt-3">
        No spam. Unsubscribe any time. We only send real deals.
      </p>
    </div>
  )
}

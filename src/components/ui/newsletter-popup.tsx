'use client'

import { useState, useEffect } from 'react'
import { X, Star, Check, AlertCircle } from 'lucide-react'

export function NewsletterPopup() {
  const [visible, setVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const dismissedAt = localStorage.getItem('newsletter_popup_dismissed_at')
    if (dismissedAt) {
      const daysSince = (Date.now() - parseInt(dismissedAt)) / (1000 * 60 * 60 * 24)
      if (daysSince < 7) return
    }
    if (localStorage.getItem('newsletter_subscribed')) return

    const handleScroll = () => {
      const scrollPercent =
        window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)
      if (scrollPercent > 0.4) {
        setVisible(true)
        window.removeEventListener('scroll', handleScroll)
      }
    }

    const timer = setTimeout(() => setVisible(true), 25000)
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(timer)
    }
  }, [])

  const dismiss = () => {
    setVisible(false)
    localStorage.setItem('newsletter_popup_dismissed_at', Date.now().toString())
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, preferences: { source: 'popup' } }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(response.status === 409 ? "You're already subscribed!" : (data.error || 'Something went wrong.'))
        setLoading(false)
        return
      }

      setSubmitted(true)
      localStorage.setItem('newsletter_subscribed', '1')
      setLoading(false)
      setTimeout(() => setVisible(false), 3000)
    } catch {
      setError('An error occurred. Please try again.')
      setLoading(false)
    }
  }

  if (!visible) return null

  return (
    <div
      className="fixed bottom-6 right-6 z-50 w-full max-w-sm animate-in slide-in-from-bottom-4 duration-300"
      role="dialog"
      aria-modal="true"
      aria-label="Newsletter signup"
    >
      <div className="bg-[#1E3A5F] rounded-2xl shadow-2xl border border-[#D4AF37]/30 overflow-hidden">
        <button
          onClick={dismiss}
          className="absolute top-3 right-3 p-1.5 text-blue-300 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-6">
          {submitted ? (
            <div className="text-center py-3">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-emerald-500/20 rounded-full mb-3">
                <Check className="w-7 h-7 text-emerald-400" />
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-1">You're in!</h3>
              <p className="text-blue-200 text-sm">Watch your inbox for the best Disney cruise deals every Sunday.</p>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 mb-3">
                <Star className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" aria-hidden="true" />
                <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest">Free Weekly Newsletter</span>
              </div>

              <h3 className="font-display text-xl font-bold text-white mb-2 pr-6">
                Never Miss a Disney Cruise Deal
              </h3>
              <p className="text-blue-200 text-sm mb-4 leading-relaxed">
                Join 3,000+ cruisers getting weekly price drops, insider tips, and credit card hacks — free, no spam.
              </p>

              {error && (
                <div className="mb-3 p-2.5 bg-red-900/30 border border-red-500/30 rounded-lg flex items-center gap-2" role="alert">
                  <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" aria-hidden="true" />
                  <p className="text-xs text-red-300">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-2.5">
                <label htmlFor="popup-email-input" className="sr-only">Email address</label>
                <input
                  id="popup-email-input"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  disabled={loading}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-blue-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37] disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-[#D4AF37] text-[#1E3A5F] font-bold text-sm rounded-xl hover:bg-yellow-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Subscribing…' : 'Get Weekly Deals →'}
                </button>
              </form>

              <button
                onClick={dismiss}
                className="w-full mt-3 text-xs text-blue-400 hover:text-blue-200 transition-colors py-1"
              >
                No thanks, I'll pay full price
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

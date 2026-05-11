'use client'

import { useState } from 'react'
import { ArrowRight, AlertCircle, Download, Check } from 'lucide-react'

const GUIDE_URL = '/disney-cruise-planning-guide.html'

export function GuideDownloadForm({ source }: { source: string }) {
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
          preferences: { source, lead_magnet: 'disney_cruise_planning_guide' },
          _honeypot: honeypot,
        }),
      })

      const data = await response.json()

      if (!response.ok && response.status !== 409) {
        setError(data.error || 'Something went wrong. Please try again.')
        setLoading(false)
        return
      }

      setSubmitted(true)
      setLoading(false)

      if (typeof window !== 'undefined') {
        localStorage.setItem('newsletter_subscribed', '1')
        window.open(GUIDE_URL, '_blank', 'noopener,noreferrer')
      }
    } catch {
      setError('An error occurred. Please try again.')
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-emerald-400/30 bg-emerald-500/15 p-6 text-left">
        <div className="flex items-start gap-3 mb-4">
          <div className="flex-shrink-0 w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center">
            <Check className="w-5 h-5 text-emerald-300" aria-hidden="true" />
          </div>
          <div>
            <p className="font-bold text-white">You're in. Check your inbox.</p>
            <p className="text-blue-200 text-sm mt-1">
              The guide should have opened in a new tab. If it didn't, click below.
            </p>
          </div>
        </div>
        <a
          href={GUIDE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-3 bg-[#D4AF37] text-[#0a1628] font-bold rounded-xl hover:bg-yellow-300 transition-colors text-sm"
        >
          <Download className="w-4 h-4" aria-hidden="true" />
          Download the guide
        </a>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md">
      {error && (
        <div
          className="mb-3 p-3 bg-red-900/30 border border-red-500/30 rounded-xl flex items-center gap-2"
          role="alert"
        >
          <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" aria-hidden="true" />
          <p className="text-sm text-red-300">{error}</p>
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-2"
        role="region"
        aria-label="Free Disney cruise planning guide signup"
      >
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
        <label htmlFor={`guide-email-${source}`} className="sr-only">
          Email address
        </label>
        <input
          id={`guide-email-${source}`}
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
          className="px-5 py-3.5 bg-[#D4AF37] text-[#0a1628] font-bold rounded-xl hover:bg-yellow-300 transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            'Sending…'
          ) : (
            <>
              Send the guide <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </>
          )}
        </button>
      </form>
    </div>
  )
}

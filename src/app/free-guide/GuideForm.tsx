'use client'

import { useState } from 'react'
import { CheckCircle, Download, Loader2 } from 'lucide-react'
import { readReferralCookie, readUtmCookies } from '@/components/ui/referral-tracker'
import { trackLead } from '@/lib/analytics'

export const GUIDE_PDF_PATH = '/downloads/disney-cruise-first-timer-guide.pdf'

/**
 * The tag that identifies this lead magnet everywhere downstream — it lands on
 * the Airtable subscriber record via `preferences.source` and on the Brevo
 * contact via its SOURCE attribute, so segmenting first-timers later is a
 * filter rather than a guess.
 */
const GUIDE_TAG = 'first-timer-guide'

const inputClass =
  'w-full bg-white/5 border border-white/15 rounded-lg px-4 py-2.5 text-white placeholder-blue-400/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-1 focus:ring-offset-[#0d1f3c] focus:border-[#D4AF37]/70 transition-colors'
const labelClass = 'block text-xs font-semibold text-blue-300 uppercase tracking-wider mb-1.5'

export function GuideForm() {
  const [form, setForm] = useState({ name: '', email: '', _honeypot: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const referralCode = readReferralCookie()
      const utm = readUtmCookies()
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.email,
          name: form.name,
          _honeypot: form._honeypot,
          preferences: {
            source: GUIDE_TAG,
            tag: GUIDE_TAG,
            lead_magnet: 'Disney Cruise First-Timer’s Guide',
            ...(referralCode ? { referral_code: referralCode } : {}),
            ...utm,
          },
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        // 409 means the address is already on the list. They still asked for
        // the guide, so hand it over rather than making them feel punished for
        // having subscribed before.
        if (res.status === 409) {
          setStatus('success')
          return
        }
        setErrorMsg(data.error || 'Something went wrong. Please try again.')
        setStatus('error')
        return
      }

      // Only counted as a conversion once the signup actually reached us.
      trackLead('free-guide')
      setStatus('success')
    } catch {
      setStatus('error')
      setErrorMsg(
        'Something went wrong. Please email us at bookings@gatgridcruises.com and we’ll send the guide over.',
      )
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/30 flex items-center justify-center mx-auto mb-5">
          <CheckCircle className="w-8 h-8 text-[#D4AF37]" aria-hidden="true" />
        </div>
        <h3 className="font-fraunces text-2xl font-bold text-white mb-3">
          Your guide is ready.
        </h3>
        <p className="font-inter text-blue-200 max-w-md mx-auto leading-relaxed mb-6">
          Download it right here — we&apos;ve also emailed you a copy so it&apos;s waiting in your
          inbox when you start planning in earnest.
        </p>
        <a
          href={GUIDE_PDF_PATH}
          download
          className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#D4AF37] text-[#0a1628] font-bold rounded-xl hover:bg-yellow-300 transition-colors shadow-lg text-base"
        >
          <Download className="w-5 h-5" aria-hidden="true" />
          Download your guide
        </a>
        <p className="font-inter text-xs text-blue-400 mt-5">
          PDF · opens in a new tab if your browser prefers. No spam — unsubscribe any time.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" aria-label="Free guide request form" noValidate>
      {/* Honeypot — bots fill it, real users never see it. Dropped server-side. */}
      <div className="gg-trap" aria-hidden="true">
        <label htmlFor="guide-website">Website (leave blank)</label>
        <input
          id="guide-website"
          type="text"
          name="_honeypot"
          tabIndex={-1}
          autoComplete="off"
          value={form._honeypot}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="guide-name" className={labelClass}>
          First Name <span className="text-[#D4AF37]" aria-hidden="true">*</span>
        </label>
        <input
          id="guide-name"
          type="text"
          name="name"
          required
          autoComplete="given-name"
          value={form.name}
          onChange={handleChange}
          placeholder="Jamie"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="guide-email" className={labelClass}>
          Email <span className="text-[#D4AF37]" aria-hidden="true">*</span>
        </label>
        <input
          id="guide-email"
          type="email"
          name="email"
          required
          autoComplete="email"
          value={form.email}
          onChange={handleChange}
          placeholder="you@example.com"
          className={inputClass}
        />
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#D4AF37] text-[#0a1628] font-bold rounded-xl hover:bg-yellow-300 transition-colors shadow-lg text-base disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
            Sending your guide…
          </>
        ) : (
          <>
            <Download className="w-5 h-5" aria-hidden="true" />
            Send Me the Free Guide
          </>
        )}
      </button>

      {status === 'error' && (
        <p className="text-red-300 text-sm text-center" role="alert">
          {errorMsg}
        </p>
      )}

      <p className="font-inter text-xs text-blue-400 text-center leading-relaxed">
        Free, instant download. We&apos;ll also send occasional Disney cruise deal alerts —
        unsubscribe any time, one click.
      </p>
    </form>
  )
}

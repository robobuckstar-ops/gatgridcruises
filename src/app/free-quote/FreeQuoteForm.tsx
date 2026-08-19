'use client'

import { useState } from 'react'
import { CheckCircle, Loader2, Send } from 'lucide-react'
import { readReferralCookie, readUtmCookies } from '@/components/ui/referral-tracker'
import { trackLead } from '@/lib/analytics'

interface FormData {
  name: string
  email: string
  phone: string
  timeframe: string
  party_size: string
  sailing_interest: string
  _honeypot: string
}

/**
 * Ranges rather than exact dates. This form is the first thing an ad click
 * sees, and most people arriving from an ad have a season in mind, not a sail
 * date — asking for a date picker up front is where they drop off.
 */
const TIMEFRAMES = [
  'Next 3 months',
  '3–6 months out',
  '6–12 months out',
  'More than a year out',
  'Flexible — show me the best deals',
]

const PARTY_SIZES = ['1 traveler', '2 travelers', '3 travelers', '4 travelers', '5+ travelers']

const inputClass =
  'w-full bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-white placeholder-blue-400/50 text-base focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-1 focus:ring-offset-[#0d1f3c] focus:border-[#D4AF37]/70 transition-colors'
const labelClass = 'block text-xs font-semibold text-blue-300 uppercase tracking-wider mb-1.5'

export function FreeQuoteForm() {
  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    timeframe: '',
    party_size: '',
    sailing_interest: '',
    _honeypot: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const referralCode = readReferralCookie()
      const utm = readUtmCookies()
      const payload = {
        ...form,
        ...(referralCode ? { referral_code: referralCode } : {}),
        ...utm,
      }
      const res = await fetch('/api/free-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)

      // Only counted as a conversion once the request actually reached us.
      trackLead('free-quote')
      setStatus('success')
    } catch {
      setStatus('error')
      setErrorMsg(
        'Something went wrong. Please email us directly at bookings@gatgridcruises.com',
      )
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center py-10">
        <div className="w-16 h-16 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/30 flex items-center justify-center mx-auto mb-5">
          <CheckCircle className="w-8 h-8 text-[#D4AF37]" aria-hidden="true" />
        </div>
        <h3 className="font-fraunces text-2xl font-bold text-white mb-3">
          Got it — your quote is being put together.
        </h3>
        <p className="font-inter text-blue-200 max-w-md mx-auto leading-relaxed mb-3">
          Grayson will email you sailing options that fit your dates and party, along with the
          onboard credit each booking would earn. Usually within a few hours, always the same
          business day.
        </p>
        <p className="font-inter text-sm text-blue-300/80 max-w-md mx-auto">
          Check your inbox for a confirmation (and your spam folder if it&apos;s not there in a
          few minutes).
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
      aria-label="Free Disney cruise quote request form"
      noValidate
    >
      {/* Honeypot — bots fill it, real users never see it. Dropped server-side. */}
      <div className="gg-trap" aria-hidden="true">
        <label htmlFor="quote-website">Website (leave blank)</label>
        <input
          id="quote-website"
          type="text"
          name="_honeypot"
          tabIndex={-1}
          autoComplete="off"
          value={form._honeypot}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="quote-name" className={labelClass}>
            Full Name <span className="text-[#D4AF37]" aria-hidden="true">*</span>
            <span className="sr-only">(required)</span>
          </label>
          <input
            id="quote-name"
            type="text"
            name="name"
            required
            aria-required="true"
            autoComplete="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your full name"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="quote-email" className={labelClass}>
            Email <span className="text-[#D4AF37]" aria-hidden="true">*</span>
            <span className="sr-only">(required)</span>
          </label>
          <input
            id="quote-email"
            type="email"
            name="email"
            required
            aria-required="true"
            autoComplete="email"
            inputMode="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="quote-timeframe" className={labelClass}>
            When Do You Want to Sail?{' '}
            <span className="text-[#D4AF37]" aria-hidden="true">*</span>
            <span className="sr-only">(required)</span>
          </label>
          <select
            id="quote-timeframe"
            name="timeframe"
            required
            aria-required="true"
            value={form.timeframe}
            onChange={handleChange}
            className={`${inputClass} appearance-none`}
          >
            <option value="" disabled className="text-slate-500">
              Choose a timeframe
            </option>
            {TIMEFRAMES.map((t) => (
              <option key={t} value={t} className="text-slate-900">
                {t}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="quote-party-size" className={labelClass}>
            Party Size <span className="text-[#D4AF37]" aria-hidden="true">*</span>
            <span className="sr-only">(required)</span>
          </label>
          <select
            id="quote-party-size"
            name="party_size"
            required
            aria-required="true"
            value={form.party_size}
            onChange={handleChange}
            className={`${inputClass} appearance-none`}
          >
            <option value="" disabled className="text-slate-500">
              How many travelers?
            </option>
            {PARTY_SIZES.map((p) => (
              <option key={p} value={p} className="text-slate-900">
                {p}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="quote-phone" className={labelClass}>
            Phone <span className="text-blue-400/70 normal-case tracking-normal">(optional)</span>
          </label>
          <input
            id="quote-phone"
            type="tel"
            name="phone"
            autoComplete="tel"
            inputMode="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="(555) 000-0000"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="quote-interest" className={labelClass}>
            Ship or Itinerary{' '}
            <span className="text-blue-400/70 normal-case tracking-normal">(optional)</span>
          </label>
          <input
            id="quote-interest"
            type="text"
            name="sailing_interest"
            value={form.sailing_interest}
            onChange={handleChange}
            placeholder="Disney Wish, Caribbean, Alaska..."
            className={inputClass}
          />
        </div>
      </div>

      {status === 'error' && (
        <p className="text-red-400 text-sm" role="alert" aria-live="assertive">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        aria-busy={status === 'loading'}
        className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-[#D4AF37] text-[#1E3A5F] font-bold rounded-xl hover:bg-yellow-300 transition-colors shadow-lg text-base disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
            Sending...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" aria-hidden="true" />
            Get My Free Quote
          </>
        )}
      </button>

      <p className="text-center text-xs text-blue-400 leading-relaxed">
        Free and no obligation. We&apos;ll email your options — no pressure to book, and you can
        walk away at any point.
      </p>
    </form>
  )
}

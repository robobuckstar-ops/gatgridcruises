'use client'

import { useState } from 'react'
import { CheckCircle, Loader2, Send } from 'lucide-react'
import { readReferralCookie, readUtmCookies } from '@/components/ui/referral-tracker'
import { trackLead } from '@/lib/analytics'

interface FormData {
  name: string
  email: string
  timeframe: string
  party_size: string
  notes: string
  _honeypot: string
}

/** Broad windows rather than exact dates — we pick the sailing once interest clusters. */
const TIMEFRAMES = [
  'Next 6 months',
  'Late 2026',
  'Early 2027',
  'Mid 2027',
  'Late 2027',
  '2028 or later',
  'Flexible — show me the options',
] as const

const PARTY_SIZES = ['1 guest', '2 guests', '3 guests', '4 guests', '5+ guests'] as const

const inputClass =
  'w-full bg-white/5 border border-white/15 rounded-lg px-4 py-2.5 text-white placeholder-blue-400/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-1 focus:ring-offset-[#0d1f3c] focus:border-[#D4AF37]/70 transition-colors'
const labelClass = 'block text-xs font-semibold text-blue-300 uppercase tracking-wider mb-1.5'

export function GroupCruiseForm() {
  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    timeframe: '',
    party_size: '',
    notes: '',
    _honeypot: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
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
      const res = await fetch('/api/group-cruise', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)

      // Only counted as a conversion once the interest actually reached us.
      trackLead('group-cruise')
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
          You&apos;re on the list.
        </h3>
        <p className="font-inter text-blue-200 max-w-md mx-auto leading-relaxed mb-3">
          We&apos;re gathering interest by timeframe. Once enough people line up on a window,
          we&apos;ll email you the ship, itinerary, and pricing before anything is committed.
          This is an interest list, not a booking.
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
      aria-label="Group sailing interest form"
      noValidate
    >
      {/* Honeypot — bots fill it, real users never see it. Dropped server-side. */}
      <div className="gg-trap" aria-hidden="true">
        <label htmlFor="group-cruise-website">Website (leave blank)</label>
        <input
          id="group-cruise-website"
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
          <label htmlFor="group-cruise-name" className={labelClass}>
            Full Name <span className="text-[#D4AF37]" aria-hidden="true">*</span>
            <span className="sr-only">(required)</span>
          </label>
          <input
            id="group-cruise-name"
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
          <label htmlFor="group-cruise-email" className={labelClass}>
            Email <span className="text-[#D4AF37]" aria-hidden="true">*</span>
            <span className="sr-only">(required)</span>
          </label>
          <input
            id="group-cruise-email"
            type="email"
            name="email"
            required
            aria-required="true"
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="group-cruise-timeframe" className={labelClass}>
            Preferred Sail Timeframe{' '}
            <span className="text-[#D4AF37]" aria-hidden="true">*</span>
            <span className="sr-only">(required)</span>
          </label>
          <select
            id="group-cruise-timeframe"
            name="timeframe"
            required
            aria-required="true"
            value={form.timeframe}
            onChange={handleChange}
            className={`${inputClass} [color-scheme:dark]`}
          >
            <option value="" disabled>
              Select a timeframe
            </option>
            {TIMEFRAMES.map((t) => (
              <option key={t} value={t} className="bg-[#0d1f3c]">
                {t}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="group-cruise-party-size" className={labelClass}>
            Party Size <span className="text-[#D4AF37]" aria-hidden="true">*</span>
            <span className="sr-only">(required)</span>
          </label>
          <select
            id="group-cruise-party-size"
            name="party_size"
            required
            aria-required="true"
            value={form.party_size}
            onChange={handleChange}
            className={`${inputClass} [color-scheme:dark]`}
          >
            <option value="" disabled>
              Select party size
            </option>
            {PARTY_SIZES.map((p) => (
              <option key={p} value={p} className="bg-[#0d1f3c]">
                {p}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="group-cruise-notes" className={labelClass}>
          Anything else we should know? (optional)
        </label>
        <textarea
          id="group-cruise-notes"
          name="notes"
          value={form.notes}
          onChange={handleChange}
          rows={3}
          placeholder="Ship or itinerary you're hoping for, ages in your party, whether you're sailing solo..."
          className={`${inputClass} resize-none`}
        />
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
        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#D4AF37] text-[#1E3A5F] font-bold rounded-xl hover:bg-yellow-300 transition-colors shadow-lg text-base disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
            Sending...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" aria-hidden="true" />
            Add Me to the List
          </>
        )}
      </button>

      <p className="text-center text-xs text-blue-400 leading-relaxed">
        No cost, no obligation, no deposit. Joining the list doesn&apos;t book anything — we&apos;ll
        send details before you decide.
      </p>
    </form>
  )
}

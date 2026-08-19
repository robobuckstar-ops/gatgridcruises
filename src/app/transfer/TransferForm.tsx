'use client'

import { useState } from 'react'
import { CheckCircle, Loader2, Send } from 'lucide-react'
import { readReferralCookie, readUtmCookies } from '@/components/ui/referral-tracker'
import { trackLead } from '@/lib/analytics'

interface FormData {
  name: string
  email: string
  phone: string
  reservation_number: string
  sail_date: string
  booking_date: string
  notes: string
  _honeypot: string
}

const inputClass =
  'w-full bg-white/5 border border-white/15 rounded-lg px-4 py-2.5 text-white placeholder-blue-400/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-1 focus:ring-offset-[#0d1f3c] focus:border-[#D4AF37]/70 transition-colors'
const labelClass = 'block text-xs font-semibold text-blue-300 uppercase tracking-wider mb-1.5'

export function TransferForm() {
  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    reservation_number: '',
    sail_date: '',
    booking_date: '',
    notes: '',
    _honeypot: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
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
      const res = await fetch('/api/transfer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)

      // Only counted as a conversion once the request actually reached us.
      trackLead('transfer')
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
          Got it — we&apos;re checking your booking now.
        </h3>
        <p className="font-inter text-blue-200 max-w-md mx-auto leading-relaxed mb-3">
          Grayson will confirm whether your reservation is eligible to transfer and email you
          back the same business day. If it is, you&apos;ll get Disney&apos;s one-page transfer
          form to sign — nothing about your cruise changes.
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
      aria-label="Booking transfer request form"
      noValidate
    >
      {/* Honeypot — bots fill it, real users never see it. Dropped server-side. */}
      <div className="gg-trap" aria-hidden="true">
        <label htmlFor="transfer-website">Website (leave blank)</label>
        <input
          id="transfer-website"
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
          <label htmlFor="transfer-name" className={labelClass}>
            Full Name <span className="text-[#D4AF37]" aria-hidden="true">*</span>
            <span className="sr-only">(required)</span>
          </label>
          <input
            id="transfer-name"
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
          <label htmlFor="transfer-email" className={labelClass}>
            Email <span className="text-[#D4AF37]" aria-hidden="true">*</span>
            <span className="sr-only">(required)</span>
          </label>
          <input
            id="transfer-email"
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
          <label htmlFor="transfer-phone" className={labelClass}>
            Phone <span className="text-blue-400/70 normal-case tracking-normal">(optional)</span>
          </label>
          <input
            id="transfer-phone"
            type="tel"
            name="phone"
            autoComplete="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="(555) 000-0000"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="transfer-sail-date" className={labelClass}>
            Sail Date <span className="text-[#D4AF37]" aria-hidden="true">*</span>
            <span className="sr-only">(required)</span>
          </label>
          <input
            id="transfer-sail-date"
            type="date"
            name="sail_date"
            required
            aria-required="true"
            value={form.sail_date}
            onChange={handleChange}
            className={`${inputClass} [color-scheme:dark]`}
          />
        </div>
        <div>
          <label htmlFor="transfer-reservation" className={labelClass}>
            Reservation #{' '}
            <span className="text-blue-400/70 normal-case tracking-normal">(optional)</span>
          </label>
          <input
            id="transfer-reservation"
            type="text"
            name="reservation_number"
            value={form.reservation_number}
            onChange={handleChange}
            placeholder="Disney confirmation number"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="transfer-booking-date" className={labelClass}>
            Date You Booked{' '}
            <span className="text-blue-400/70 normal-case tracking-normal">(optional)</span>
          </label>
          <input
            id="transfer-booking-date"
            type="date"
            name="booking_date"
            value={form.booking_date}
            onChange={handleChange}
            className={`${inputClass} [color-scheme:dark]`}
          />
          <p className="mt-1.5 text-[11px] text-blue-400/80 leading-relaxed">
            This is what decides eligibility — if you know it, it saves us a round trip.
          </p>
        </div>
      </div>

      <div>
        <label htmlFor="transfer-notes" className={labelClass}>
          Anything else we should know? (optional)
        </label>
        <textarea
          id="transfer-notes"
          name="notes"
          value={form.notes}
          onChange={handleChange}
          rows={3}
          placeholder="Ship, stateroom, who's sailing, whether you've made final payment..."
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
            Check My Eligibility
          </>
        )}
      </button>

      <p className="text-center text-xs text-blue-400 leading-relaxed">
        No cost, no obligation. We&apos;ll confirm whether Disney allows the transfer before
        anything is signed.
      </p>
    </form>
  )
}

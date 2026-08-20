'use client'

import { useState } from 'react'
import { CheckCircle, Loader2, Plus, Send } from 'lucide-react'
import { readReferralCookie, readUtmCookies } from '@/components/ui/referral-tracker'
import { trackLead } from '@/lib/analytics'

/**
 * The transfer lead form.
 *
 * Deliberately short: name, email, reservation number, ship, sail date. Phone
 * and free-text notes are real fields but live behind a disclosure so the
 * default state is four visible inputs. Ship and the eligibility answers ride
 * along inside `notes`, which is the field /api/transfer already stores and
 * emails to the agent — no endpoint change needed to carry them.
 */

/** What the visitor told the eligibility check, forwarded to the agent. */
export interface TransferQuizContext {
  bookedRecently: boolean
  paidInFull: boolean
  hasAgent: boolean
}

interface FormData {
  name: string
  email: string
  phone: string
  reservation_number: string
  ship: string
  sail_date: string
  notes: string
  _honeypot: string
}

const SHIPS = [
  'Disney Magic',
  'Disney Wonder',
  'Disney Dream',
  'Disney Fantasy',
  'Disney Wish',
  'Disney Treasure',
  'Disney Destiny',
  'Disney Adventure',
]

const inputClass =
  'w-full bg-white/5 border border-white/15 rounded-lg px-4 py-2.5 text-white placeholder-blue-400/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-1 focus:ring-offset-[#0d1f3c] focus:border-[#D4AF37]/70 transition-colors'
const labelClass = 'block text-xs font-semibold text-blue-300 uppercase tracking-wider mb-1.5'

export function TransferForm({ quiz }: { quiz?: TransferQuizContext } = {}) {
  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    reservation_number: '',
    ship: '',
    sail_date: '',
    notes: '',
    _honeypot: '',
  })
  const [showOptional, setShowOptional] = useState(false)
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

      // Everything the agent needs to triage the request in one block, whether
      // or not the visitor typed a note of their own.
      const notes = [
        form.ship ? `Ship: ${form.ship}` : null,
        quiz
          ? `Self-check — booked within ~30 days: ${quiz.bookedRecently ? 'yes' : 'no'}; ` +
            `final payment made: ${quiz.paidInFull ? 'yes' : 'no'}; ` +
            `already with another agency: ${quiz.hasAgent ? 'yes' : 'no'}`
          : null,
        form.notes.trim() || null,
      ]
        .filter(Boolean)
        .join('\n')

      const payload = {
        ...form,
        notes,
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
          <label htmlFor="transfer-reservation" className={labelClass}>
            Booking / Reservation #{' '}
            <span className="text-blue-400/70 normal-case tracking-normal">
              (if it&apos;s handy)
            </span>
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
          <label htmlFor="transfer-ship" className={labelClass}>
            Ship <span className="text-blue-400/70 normal-case tracking-normal">(optional)</span>
          </label>
          <select
            id="transfer-ship"
            name="ship"
            value={form.ship}
            onChange={handleChange}
            className={`${inputClass} [color-scheme:dark]`}
          >
            <option value="">Select your ship</option>
            {SHIPS.map((ship) => (
              <option key={ship} value={ship}>
                {ship}
              </option>
            ))}
          </select>
        </div>
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

      {/* Kept off the default view so the form reads as four fields. */}
      {showOptional ? (
        <div className="space-y-4 rounded-xl border border-white/10 bg-black/10 p-4">
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
            <label htmlFor="transfer-notes" className={labelClass}>
              Anything else we should know?{' '}
              <span className="text-blue-400/70 normal-case tracking-normal">(optional)</span>
            </label>
            <textarea
              id="transfer-notes"
              name="notes"
              value={form.notes}
              onChange={handleChange}
              rows={3}
              placeholder="Stateroom, who's sailing, the date you booked..."
              className={`${inputClass} resize-none`}
            />
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setShowOptional(true)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-300 hover:text-[#D4AF37] transition-colors"
        >
          <Plus className="w-3 h-3" aria-hidden="true" />
          Add a phone number or a note (optional)
        </button>
      )}

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
            Claim My Onboard Credit
          </>
        )}
      </button>

      <p className="text-center text-xs text-blue-400 leading-relaxed">
        No cost, no obligation. We&apos;ll confirm whether Disney allows the transfer before
        anything is signed — and your fare never changes.
      </p>
    </form>
  )
}

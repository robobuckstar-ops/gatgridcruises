'use client'

import { useState, useEffect, useId, useRef } from 'react'
import { CheckCircle, Loader2, Send, X, Anchor, Mail } from 'lucide-react'
import { readReferralCookie, readUtmCookies } from '@/components/ui/referral-tracker'

// Bots typically fill and submit forms in under a second. Real users take
// at least a few seconds to type a name and email. We block submissions
// faster than this threshold (combined with the honeypot field below).
const MIN_FILL_TIME_MS = 2000
// Disable the submit button for the first few seconds after the form
// opens, so a bot can't immediately click submit on a freshly-rendered form.
const SUBMIT_COOLDOWN_MS = 3000
// After a successful or failed submit, briefly debounce another click.
const RESUBMIT_DEBOUNCE_MS = 1500

export interface RequestSailingContext {
  sailingId?: string
  itineraryName?: string
  shipName?: string
  sailDate?: string
  lengthNights?: number
  cabinCategory?: string
  startingPrice?: number
}

interface RequestSailingFormProps {
  open: boolean
  onClose: () => void
  context?: RequestSailingContext
}

interface FormState {
  name: string
  email: string
  phone: string
  guests: string
  notes: string
  _honeypot: string
}

const initialForm: FormState = {
  name: '',
  email: '',
  phone: '',
  guests: '2',
  notes: '',
  _honeypot: '',
}

const inputClass =
  'w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A5F] focus:border-[#1E3A5F] transition-colors'

function buildSummary(ctx?: RequestSailingContext): string {
  if (!ctx) return ''
  const parts: string[] = []
  if (ctx.itineraryName) parts.push(ctx.itineraryName)
  if (ctx.shipName) parts.push(ctx.shipName)
  if (ctx.sailDate) parts.push(`Sails ${ctx.sailDate}`)
  if (ctx.lengthNights) parts.push(`${ctx.lengthNights} nights`)
  if (ctx.cabinCategory) parts.push(`Cabin: ${ctx.cabinCategory}`)
  return parts.join(' · ')
}

function buildMailtoFallback(ctx: RequestSailingContext | undefined, form: FormState): string {
  const subject = ctx?.itineraryName
    ? `Sailing inquiry: ${ctx.itineraryName}`
    : 'Disney cruise inquiry'
  const lines = [
    'Hi Grayson —',
    '',
    "I'd like more info on this sailing:",
    buildSummary(ctx) || '(general Disney cruise inquiry)',
    '',
    `Name: ${form.name}`,
    `Email: ${form.email}`,
    form.phone ? `Phone: ${form.phone}` : '',
    `Guests: ${form.guests}`,
    form.notes ? `Notes: ${form.notes}` : '',
  ].filter(Boolean)
  const body = encodeURIComponent(lines.join('\n'))
  return `mailto:bookings@gatgridcruises.com?subject=${encodeURIComponent(subject)}&body=${body}`
}

export function RequestSailingForm({ open, onClose, context }: RequestSailingFormProps) {
  const headingId = useId()
  const dialogRef = useRef<HTMLDivElement>(null)
  const openedAtRef = useRef<number>(0)
  const lastSubmitAtRef = useRef<number>(0)
  const [form, setForm] = useState<FormState>(initialForm)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [cooldownActive, setCooldownActive] = useState(true)

  useEffect(() => {
    if (!open) return
    openedAtRef.current = Date.now()
    setCooldownActive(true)
    const cooldownTimer = window.setTimeout(() => setCooldownActive(false), SUBMIT_COOLDOWN_MS)
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.clearTimeout(cooldownTimer)
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open, onClose])

  useEffect(() => {
    if (!open) {
      setStatus('idle')
      setErrorMsg('')
      setForm(initialForm)
      lastSubmitAtRef.current = 0
    }
  }, [open])

  if (!open) return null

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const now = Date.now()
    const elapsed = now - openedAtRef.current

    // Debounce rapid resubmits (e.g. double-clicks or scripted spam).
    if (now - lastSubmitAtRef.current < RESUBMIT_DEBOUNCE_MS) return
    lastSubmitAtRef.current = now

    // Time-based bot check — humans take longer than this to fill a form.
    if (elapsed < MIN_FILL_TIME_MS) {
      setStatus('error')
      setErrorMsg('Please take a moment to review your details before submitting.')
      return
    }

    setStatus('loading')
    setErrorMsg('')

    try {
      const referralCode = readReferralCookie()
      const utm = readUtmCookies()
      const payload = {
        ...form,
        sailing: context ?? null,
        elapsed_ms: elapsed,
        ...(referralCode ? { referral_code: referralCode } : {}),
        ...utm,
      }
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setStatus('success')
    } catch {
      setStatus('error')
      setErrorMsg(
        "Something went wrong. You can email us directly at bookings@gatgridcruises.com — your details are still in the form below.",
      )
    }
  }

  const summary = buildSummary(context)

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={headingId}
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4"
    >
      <button
        type="button"
        aria-label="Close inquiry form"
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm"
      />
      <div
        ref={dialogRef}
        className="relative w-full sm:max-w-lg bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 px-5 py-4 flex items-start justify-between gap-4 z-10">
          <div>
            <p className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest mb-0.5">
              Free · No obligation
            </p>
            <h2 id={headingId} className="font-display text-lg font-bold text-slate-900 leading-tight">
              {context?.itineraryName ? 'Request This Sailing' : 'Request a Free Disney Cruise Quote'}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex-shrink-0 w-8 h-8 rounded-full hover:bg-slate-100 text-slate-500 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {status === 'success' ? (
          <div className="px-5 py-8 text-center">
            <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-7 h-7 text-emerald-600" />
            </div>
            <h3 className="font-display text-xl font-bold text-slate-900 mb-2">
              Got it — we&apos;ll be in touch.
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed max-w-sm mx-auto mb-4">
              Grayson personally follows up on every inquiry, usually within the hour. A confirmation
              email is also on its way to <strong>{form.email}</strong>.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1E3A5F] text-white font-semibold text-sm rounded-lg hover:bg-[#162d4a] transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-5 py-5 space-y-4" noValidate>
            {/* Honeypot */}
            <div className="gg-trap" aria-hidden="true">
              <label htmlFor="inquiry-website">Website (leave blank)</label>
              <input
                id="inquiry-website"
                type="text"
                name="_honeypot"
                tabIndex={-1}
                autoComplete="off"
                value={form._honeypot}
                onChange={handleChange}
              />
            </div>

            {summary && (
              <div className="bg-[#1E3A5F]/5 border border-[#1E3A5F]/15 rounded-lg px-3.5 py-3 flex items-start gap-2.5">
                <Anchor className="w-4 h-4 text-[#1E3A5F] flex-shrink-0 mt-0.5" aria-hidden="true" />
                <div className="text-xs text-slate-700 leading-relaxed">
                  <p className="font-semibold text-[#1E3A5F] mb-0.5">You&apos;re asking about:</p>
                  <p>{summary}</p>
                  {context?.startingPrice && (
                    <p className="text-slate-500 mt-0.5">
                      Listed from ${context.startingPrice.toLocaleString()} (Disney public rate)
                    </p>
                  )}
                </div>
              </div>
            )}

            <div>
              <label htmlFor="inquiry-name" className="block text-xs font-semibold text-slate-700 mb-1.5">
                Your name <span className="text-red-500">*</span>
              </label>
              <input
                id="inquiry-name"
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="First and last"
                autoComplete="name"
                className={inputClass}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="inquiry-email" className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="inquiry-email"
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="inquiry-phone" className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Phone <span className="text-slate-400 font-normal">(optional)</span>
                </label>
                <input
                  id="inquiry-phone"
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="(555) 000-0000"
                  autoComplete="tel"
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label htmlFor="inquiry-guests" className="block text-xs font-semibold text-slate-700 mb-1.5">
                Number of guests
              </label>
              <select
                id="inquiry-guests"
                name="guests"
                value={form.guests}
                onChange={handleChange}
                className={`${inputClass} appearance-none bg-white`}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? 'guest' : 'guests'}
                  </option>
                ))}
                <option value="9+">9 or more</option>
              </select>
            </div>

            <div>
              <label htmlFor="inquiry-notes" className="block text-xs font-semibold text-slate-700 mb-1.5">
                Anything else? <span className="text-slate-400 font-normal">(optional)</span>
              </label>
              <textarea
                id="inquiry-notes"
                name="notes"
                value={form.notes}
                onChange={handleChange}
                rows={3}
                placeholder={
                  context?.itineraryName
                    ? 'Cabin preferences, special occasion, questions about this sailing...'
                    : 'Itineraries you’re considering, dates, ages of kids, special occasions...'
                }
                className={`${inputClass} resize-none`}
              />
            </div>

            {status === 'error' && (
              <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-2.5 text-xs text-red-700" role="alert">
                <p className="mb-1">{errorMsg}</p>
                <a
                  href={buildMailtoFallback(context, form)}
                  className="inline-flex items-center gap-1 font-semibold text-red-800 hover:text-red-900 underline"
                >
                  <Mail className="w-3.5 h-3.5" /> Open email instead
                </a>
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'loading' || cooldownActive}
              aria-busy={status === 'loading'}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#D4AF37] text-[#1E3A5F] font-bold text-sm rounded-lg hover:bg-yellow-300 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /> Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" aria-hidden="true" />
                  {context?.itineraryName ? 'Request This Sailing' : 'Get My Free Quote'}
                </>
              )}
            </button>

            <p className="text-[11px] text-slate-500 text-center leading-relaxed">
              We email <strong>bookings@gatgridcruises.com</strong>. No spam, no auto-enrollment in
              anything — Grayson follows up personally. Quotes go through Boardwalk Travel Agency.
            </p>
          </form>
        )}
      </div>
    </div>
  )
}

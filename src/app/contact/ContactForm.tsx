'use client'

import { useState, useRef, useEffect } from 'react'
import { CheckCircle, Loader2, Send } from 'lucide-react'
import { readReferralCookie, readUtmCookies } from '@/components/ui/referral-tracker'
import { trackLead } from '@/lib/analytics'

interface FormData {
  name: string
  email: string
  phone: string
  guests: string
  notes: string
  _honeypot: string
}

const inputClass =
  'w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A5F] focus:border-[#1E3A5F] transition-colors'
const labelClass = 'block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5'

export function ContactForm() {
  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    guests: '',
    notes: '',
    _honeypot: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  // Mirrors the server-side timing check: a form completed in under two
  // seconds is a bot, not a person.
  const mountedAt = useRef<number>(0)
  useEffect(() => {
    mountedAt.current = Date.now()
  }, [])

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const referralCode = readReferralCookie()
      const utm = readUtmCookies()
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          elapsed_ms: mountedAt.current ? Date.now() - mountedAt.current : 0,
          ...(referralCode ? { referral_code: referralCode } : {}),
          ...utm,
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.error || `HTTP ${res.status}`)
      }

      trackLead('contact')
      setStatus('success')
    } catch (err) {
      setStatus('error')
      setErrorMsg(
        err instanceof Error && err.message.startsWith('Too many')
          ? err.message
          : 'Something went wrong sending that. Please email us directly at bookings@gatgridcruises.com and we’ll pick it up from there.'
      )
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center">
        <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto mb-4" />
        <h3 className="font-fraunces text-xl font-bold text-slate-900 mb-2">
          Message sent
        </h3>
        <p className="text-slate-600 text-sm max-w-md mx-auto">
          Thanks {form.name.split(' ')[0] || 'for reaching out'} — it landed in our inbox.
          Grayson replies to every message personally, usually within one business day.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
      aria-label="Contact form"
      noValidate
    >
      {/* Honeypot — bots fill it, real users never see it. Dropped server-side. */}
      <div className="gg-trap" aria-hidden="true">
        <label htmlFor="contact-website">Website (leave blank)</label>
        <input
          id="contact-website"
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
          <label className={labelClass} htmlFor="contact-name">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            value={form.name}
            onChange={handleChange}
            className={inputClass}
            placeholder="Your name"
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="contact-email">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            className={inputClass}
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass} htmlFor="contact-phone">
            Phone <span className="text-slate-400 normal-case">(optional)</span>
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={handleChange}
            className={inputClass}
            placeholder="So we can text you back"
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="contact-guests">
            Party size <span className="text-slate-400 normal-case">(optional)</span>
          </label>
          <input
            id="contact-guests"
            name="guests"
            type="text"
            inputMode="numeric"
            value={form.guests}
            onChange={handleChange}
            className={inputClass}
            placeholder="e.g. 4"
          />
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="contact-notes">
          How can we help?
        </label>
        <textarea
          id="contact-notes"
          name="notes"
          rows={5}
          value={form.notes}
          onChange={handleChange}
          className={inputClass}
          placeholder="Tell us about the sailing you're considering, your dates, or whatever question brought you here."
        />
      </div>

      {status === 'error' && (
        <p className="text-sm text-red-600" role="alert">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#1E3A5F] text-white font-inter font-semibold rounded-lg hover:bg-[#0a1628] disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Send message
          </>
        )}
      </button>

      <p className="text-xs text-slate-500 text-center">
        We use your details only to answer your message. No spam, and we never sell your data.
      </p>
    </form>
  )
}

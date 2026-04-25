'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { CheckCircle, Loader2, Send, Anchor } from 'lucide-react'

const WEBHOOK_URL = 'https://hook.us2.make.com/x0omp8bq5bbyl2jgjcfv7a9kod4e3ame'

const TIMEZONES = [
  { value: '', label: 'Select timezone (optional)' },
  { value: 'ET', label: 'Eastern Time (ET)' },
  { value: 'CT', label: 'Central Time (CT)' },
  { value: 'MT', label: 'Mountain Time (MT)' },
  { value: 'PT', label: 'Pacific Time (PT)' },
  { value: 'AKT', label: 'Alaska Time (AKT)' },
  { value: 'HT', label: 'Hawaii Time (HT)' },
  { value: 'Other', label: 'Other' },
]

const HOW_FOUND_OPTIONS = [
  { value: '', label: 'How did you find GatGrid?' },
  { value: 'Google Search', label: 'Google Search' },
  { value: 'Facebook', label: 'Facebook' },
  { value: 'Instagram', label: 'Instagram' },
  { value: 'Friend / Word of Mouth', label: 'Friend / Word of Mouth' },
  { value: 'Disney Cruise Facebook Group', label: 'Disney Cruise Facebook Group' },
  { value: 'YouTube', label: 'YouTube' },
  { value: 'Blog / Article', label: 'Blog / Article' },
  { value: 'Other', label: 'Other' },
]

interface FormData {
  name: string
  email: string
  phone: string
  timezone: string
  family_members: string
  how_found_us: string
  notes: string
}

const inputClass =
  'w-full bg-white/5 border border-white/15 rounded-lg px-4 py-2.5 text-white placeholder-blue-400/50 text-sm focus:outline-none focus:border-[#D4AF37]/70 transition-colors'
const selectClass =
  'w-full bg-[#0d1f3c] border border-white/15 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#D4AF37]/70 transition-colors appearance-none'
const labelClass = 'block text-xs font-semibold text-blue-300 uppercase tracking-wider mb-1.5'

export function ConciergeForm() {
  const searchParams = useSearchParams()
  const sailingParam = searchParams.get('sailing') ?? ''

  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    timezone: '',
    family_members: '',
    how_found_us: '',
    notes: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const payload = {
        ...form,
        ...(sailingParam ? { sailing_interest: sailingParam } : {}),
      }
      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setStatus('success')
    } catch {
      setStatus('error')
      setErrorMsg(
        'Something went wrong. Please email us directly at bookings@gatgridcruises.com'
      )
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center py-10">
        <div className="w-16 h-16 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/30 flex items-center justify-center mx-auto mb-5">
          <CheckCircle className="w-8 h-8 text-[#D4AF37]" />
        </div>
        <h3 className="font-fraunces text-2xl font-bold text-white mb-3">
          We got your message!
        </h3>
        <p className="font-inter text-blue-200 max-w-md mx-auto leading-relaxed">
          Grayson will be in touch within 1 business day to get your trip set up. Keep an
          eye on your inbox.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {sailingParam && (
        <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-xl px-4 py-3 flex items-center gap-2">
          <Anchor className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
          <p className="text-sm text-[#D4AF37]">
            <span className="font-semibold">Interested in:</span> {sailingParam}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>
            Full Name <span className="text-[#D4AF37]">*</span>
          </label>
          <input
            type="text"
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="Your full name"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>
            Email <span className="text-[#D4AF37]">*</span>
          </label>
          <input
            type="email"
            name="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>
            Phone <span className="text-[#D4AF37]">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            required
            value={form.phone}
            onChange={handleChange}
            placeholder="(555) 000-0000"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Timezone</label>
          <select
            name="timezone"
            value={form.timezone}
            onChange={handleChange}
            className={selectClass}
          >
            {TIMEZONES.map((tz) => (
              <option key={tz.value} value={tz.value}>
                {tz.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass}>
          Who&apos;s sailing? <span className="text-[#D4AF37]">*</span>
        </label>
        <textarea
          name="family_members"
          required
          value={form.family_members}
          onChange={handleChange}
          rows={2}
          placeholder="e.g. Two adults + 2 kids (ages 7 and 10)"
          className={`${inputClass} resize-none`}
        />
      </div>

      <div>
        <label className={labelClass}>
          How did you find GatGrid? <span className="text-[#D4AF37]">*</span>
        </label>
        <select
          name="how_found_us"
          required
          value={form.how_found_us}
          onChange={handleChange}
          className={selectClass}
        >
          {HOW_FOUND_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass}>
          Cruise interests, dates, or questions (optional)
        </label>
        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          rows={3}
          placeholder="Tell us about your dream trip — itineraries, special occasions, anything we should know..."
          className={`${inputClass} resize-none`}
        />
      </div>

      {status === 'error' && (
        <p className="text-red-400 text-sm">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#D4AF37] text-[#1E3A5F] font-bold rounded-xl hover:bg-yellow-300 transition-colors shadow-lg text-base disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Get My Free Concierge
          </>
        )}
      </button>

      <p className="text-center text-xs text-blue-400">
        No cost, no pressure. We follow up within 1 business day.
      </p>
    </form>
  )
}

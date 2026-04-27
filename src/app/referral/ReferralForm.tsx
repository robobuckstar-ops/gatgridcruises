'use client'

import { useState } from 'react'
import { CheckCircle, Loader2, Send, Copy } from 'lucide-react'
import { generateReferralCode, buildReferralUrl } from '@/lib/referral'

const WEBHOOK_URL = 'https://hook.us2.make.com/REFERRAL_PLACEHOLDER'

const PLATFORM_OPTIONS = [
  { value: '', label: 'Select primary platform' },
  { value: 'Instagram', label: 'Instagram' },
  { value: 'TikTok', label: 'TikTok' },
  { value: 'YouTube', label: 'YouTube' },
  { value: 'Facebook', label: 'Facebook / Facebook Group' },
  { value: 'Blog', label: 'Blog / Website' },
  { value: 'Pinterest', label: 'Pinterest' },
  { value: 'Podcast', label: 'Podcast' },
  { value: 'Other', label: 'Other' },
]

const AUDIENCE_SIZE_OPTIONS = [
  { value: '', label: 'Select audience size' },
  { value: 'Under 1K', label: 'Under 1,000' },
  { value: '1K–5K', label: '1,000–5,000' },
  { value: '5K–25K', label: '5,000–25,000' },
  { value: '25K–100K', label: '25,000–100,000' },
  { value: '100K–500K', label: '100,000–500,000' },
  { value: '500K+', label: '500,000+' },
]

interface FormData {
  name: string
  email: string
  instagram: string
  tiktok: string
  youtube: string
  other_handle: string
  primary_platform: string
  audience_size: string
  niche: string
  why_partner: string
  // honeypot
  website_url: string
}

const inputClass =
  'w-full bg-white/5 border border-white/15 rounded-lg px-4 py-2.5 text-white placeholder-blue-400/50 text-sm focus:outline-none focus:border-[#D4AF37]/70 transition-colors'
const selectClass =
  'w-full bg-[#0d1f3c] border border-white/15 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#D4AF37]/70 transition-colors appearance-none'
const labelClass = 'block text-xs font-semibold text-blue-300 uppercase tracking-wider mb-1.5'

export function ReferralForm() {
  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    instagram: '',
    tiktok: '',
    youtube: '',
    other_handle: '',
    primary_platform: '',
    audience_size: '',
    niche: '',
    why_partner: '',
    website_url: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [referralCode, setReferralCode] = useState('')
  const [copied, setCopied] = useState(false)

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // Honeypot check
    if (form.website_url) return

    setStatus('loading')
    setErrorMsg('')

    const code = generateReferralCode(form.name)
    const referralUrl = buildReferralUrl(code)

    try {
      const { website_url: _hp, ...safeForm } = form
      const payload = { ...safeForm, referral_code: code, referral_url: referralUrl }
      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setReferralCode(code)
      setStatus('success')
    } catch {
      setStatus('error')
      setErrorMsg(
        'Something went wrong. Please email us directly at grayson@gatgridcruises.com'
      )
    }
  }

  async function copyCode() {
    await navigator.clipboard.writeText(buildReferralUrl(referralCode))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (status === 'success') {
    return (
      <div className="text-center py-10">
        <div className="w-16 h-16 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/30 flex items-center justify-center mx-auto mb-5">
          <CheckCircle className="w-8 h-8 text-[#D4AF37]" />
        </div>
        <h3 className="font-fraunces text-2xl font-bold text-white mb-3">
          Application Received!
        </h3>
        <p className="font-inter text-blue-200 max-w-md mx-auto leading-relaxed mb-6">
          We&apos;ll review your application and follow up within 2 business days. Here&apos;s
          your unique referral code to get started:
        </p>
        <div className="bg-white/5 border border-[#D4AF37]/40 rounded-xl px-6 py-4 max-w-sm mx-auto mb-4">
          <p className="text-xs text-blue-300 uppercase tracking-wider mb-1">Your Code</p>
          <p className="font-fraunces text-3xl font-bold text-[#D4AF37] tracking-widest mb-3">
            {referralCode}
          </p>
          <p className="text-xs text-blue-300 break-all mb-3">{buildReferralUrl(referralCode)}</p>
          <button
            onClick={copyCode}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] font-semibold rounded-lg hover:bg-[#D4AF37]/30 transition-colors text-sm"
          >
            <Copy className="w-4 h-4" />
            {copied ? 'Copied!' : 'Copy Referral Link'}
          </button>
        </div>
        <p className="text-xs text-blue-400">Save this link — your commissions are tracked through it.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <input
          type="text"
          name="website_url"
          value={form.website_url}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

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
      </div>

      <div>
        <label className={labelClass}>Social Media Handles</label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <input
            type="text"
            name="instagram"
            value={form.instagram}
            onChange={handleChange}
            placeholder="@instagram"
            className={inputClass}
          />
          <input
            type="text"
            name="tiktok"
            value={form.tiktok}
            onChange={handleChange}
            placeholder="@tiktok"
            className={inputClass}
          />
          <input
            type="text"
            name="youtube"
            value={form.youtube}
            onChange={handleChange}
            placeholder="YouTube channel"
            className={inputClass}
          />
        </div>
        <input
          type="text"
          name="other_handle"
          value={form.other_handle}
          onChange={handleChange}
          placeholder="Other platform or blog URL"
          className={`${inputClass} mt-3`}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>
            Primary Platform <span className="text-[#D4AF37]">*</span>
          </label>
          <select
            name="primary_platform"
            required
            value={form.primary_platform}
            onChange={handleChange}
            className={selectClass}
          >
            {PLATFORM_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>
            Audience Size <span className="text-[#D4AF37]">*</span>
          </label>
          <select
            name="audience_size"
            required
            value={form.audience_size}
            onChange={handleChange}
            className={selectClass}
          >
            {AUDIENCE_SIZE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass}>
          Your Niche / Content Focus <span className="text-[#D4AF37]">*</span>
        </label>
        <input
          type="text"
          name="niche"
          required
          value={form.niche}
          onChange={handleChange}
          placeholder="e.g. Disney travel, family vacation planning, cruise reviews"
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>
          Why do you want to partner with GatGrid? <span className="text-[#D4AF37]">*</span>
        </label>
        <textarea
          name="why_partner"
          required
          value={form.why_partner}
          onChange={handleChange}
          rows={3}
          placeholder="Tell us about your audience, how you'd promote us, and why you're a great fit..."
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
            Submitting...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Apply to Partner Program
          </>
        )}
      </button>

      <p className="text-center text-xs text-blue-400">
        We review all applications and respond within 2 business days.
      </p>
    </form>
  )
}

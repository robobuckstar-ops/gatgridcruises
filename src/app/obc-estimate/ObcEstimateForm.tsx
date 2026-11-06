'use client'

import { useMemo, useState } from 'react'
import { Download, Gift, Loader2 } from 'lucide-react'
import { readReferralCookie, readUtmCookies } from '@/components/ui/referral-tracker'
import { SmsConsentCheckbox } from '@/components/ui/sms-consent-checkbox'
import { ships } from '@/data/ships'
import { trackLead } from '@/lib/analytics'
import { BUSINESS_PHONE_DISPLAY, BUSINESS_PHONE_TEL } from '@/lib/constants'
import { formatUSD } from '@/lib/obc'

const GUIDE_PDF = '/downloads/disney-cruise-first-timer-guide.pdf'
const input =
  'w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-base text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]'
const label = 'mb-1 block text-sm font-semibold text-slate-700'

interface Sailing {
  ship: string
  dates: string
  itinerary: string
  obcEstimate: number | null
}

function nextMonths(count: number): { value: string; label: string }[] {
  const out = []
  const now = new Date()
  for (let i = 0; i < count; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() + i, 1)
    out.push({
      value: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`,
      label: d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    })
  }
  return out
}

export function ObcEstimateForm() {
  const months = useMemo(() => nextMonths(18), [])
  const [form, setForm] = useState({
    ship: 'not-sure',
    when: 'not-sure',
    party_size: '2',
    already_booked: 'no',
    name: '',
    email: '',
    phone: '',
    _honeypot: '',
  })
  const [smsConsent, setSmsConsent] = useState(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle')
  const [error, setError] = useState('')
  const [sailings, setSailings] = useState<Sailing[]>([])

  const set = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setStatus('loading')
    try {
      const referralCode = readReferralCookie()
      const res = await fetch('/api/obc-estimate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          sms_consent: smsConsent,
          ...(referralCode ? { referral_code: referralCode } : {}),
          ...readUtmCookies(),
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data?.error || 'Something went wrong.')
      if (data.recorded) trackLead('obc-estimate')
      setSailings(data.sailings ?? [])
      setStatus('done')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      setStatus('idle')
      setError(
        `${err instanceof Error ? err.message : 'Something went wrong.'} You can also email bookings@gatgridcruises.com or call ${BUSINESS_PHONE_DISPLAY}.`,
      )
    }
  }

  if (status === 'done') {
    const values = sailings.map((s) => s.obcEstimate).filter((v): v is number => v !== null)
    const low = values.length ? Math.min(...values) : null
    const high = values.length ? Math.max(...values) : null
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="mb-1 flex items-center gap-2 text-sm font-semibold text-slate-600">
          <Gift className="h-4 w-4 text-[#D4AF37]" aria-hidden="true" />
          Your estimated onboard credit
        </p>
        <p className="mb-4 font-fraunces text-3xl font-bold text-[#1E3A5F]" data-testid="obc-estimate-result">
          {low === null ? 'We will confirm by email' : low === high ? `About ${formatUSD(low)}` : `About ${formatUSD(low)} to ${formatUSD(high ?? low)}`}
        </p>
        <ul className="mb-5 space-y-3">
          {sailings.map((s) => (
            <li key={`${s.ship}-${s.dates}`} className="rounded-lg border border-slate-200 p-3 text-sm text-slate-700">
              <strong className="text-[#1E3A5F]">{s.ship}</strong>: {s.itinerary}
              <br />
              {s.dates}
              {s.obcEstimate !== null && <> &middot; estimate about {formatUSD(s.obcEstimate)}</>}
            </li>
          ))}
        </ul>
        <p className="mb-4 text-sm text-slate-600">
          We also emailed you the details. Grayson will review your request and follow up within 1
          business day. Already have a quote? Reply to that email with it.
        </p>
        <a
          href={GUIDE_PDF}
          download
          className="mb-3 flex items-center justify-center gap-2 rounded-xl bg-[#D4AF37] px-5 py-3 font-bold text-[#1E3A5F]"
        >
          <Download className="h-4 w-4" aria-hidden="true" />
          Download your free first-timer guide
        </a>
        <a href={BUSINESS_PHONE_TEL} className="block text-center text-sm font-semibold text-[#1E3A5F] underline">
          Prefer to talk? Call {BUSINESS_PHONE_DISPLAY}
        </a>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0 }} aria-hidden="true">
        <input type="text" name="_honeypot" value={form._honeypot} onChange={set} tabIndex={-1} autoComplete="off" />
      </div>
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700" role="alert">
          {error}
        </div>
      )}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="obc-ship" className={label}>Ship</label>
          <select id="obc-ship" name="ship" value={form.ship} onChange={set} className={input}>
            <option value="not-sure">Not sure</option>
            {ships.map((s) => (
              <option key={s.id} value={s.slug.replace('disney-', '')}>{s.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="obc-when" className={label}>When</label>
          <select id="obc-when" name="when" value={form.when} onChange={set} className={input}>
            <option value="not-sure">Not sure</option>
            {months.map((m) => (
              <option key={m.value} value={m.value}>{m.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="obc-party" className={label}>Party size</label>
          <select id="obc-party" name="party_size" value={form.party_size} onChange={set} className={input}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="obc-booked" className={label}>Already booked direct?</label>
          <select id="obc-booked" name="already_booked" value={form.already_booked} onChange={set} className={input}>
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="obc-name" className={label}>
          First name <span className="font-normal text-slate-400">(optional)</span>
        </label>
        <input id="obc-name" name="name" type="text" autoComplete="given-name" value={form.name} onChange={set} className={input} />
      </div>
      <div>
        <label htmlFor="obc-email" className={label}>Email</label>
        <input id="obc-email" name="email" type="email" required autoComplete="email" value={form.email} onChange={set} className={input} placeholder="you@example.com" />
      </div>
      <div>
        <label htmlFor="obc-phone" className={label}>
          Phone <span className="font-normal text-slate-400">(optional)</span>
        </label>
        <input id="obc-phone" name="phone" type="tel" autoComplete="tel" value={form.phone} onChange={set} className={input} placeholder="(555) 555-5555" />
      </div>
      <SmsConsentCheckbox id="obc-sms-consent" checked={smsConsent} onChange={setSmsConsent} />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1E3A5F] py-3.5 text-lg font-bold text-white disabled:opacity-60"
      >
        {status === 'loading' && <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />}
        {status === 'loading' ? 'Checking…' : 'See my onboard credit'}
      </button>
    </form>
  )
}

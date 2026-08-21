'use client'

import Link from 'next/link'
import { SMS_CONSENT_TEXT } from '@/lib/sms-consent'

/**
 * A2P 10DLC opt-in checkbox for the lead forms that collect a phone number.
 *
 * The wording comes from @/lib/sms-consent so the page shows exactly what was
 * registered with Twilio. Always optional: consent must never gate the submit
 * button, which is why this renders an unchecked, non-required input and the
 * forms send `sms_consent` as a plain boolean either way.
 */

interface SmsConsentCheckboxProps {
  id: string
  checked: boolean
  onChange: (checked: boolean) => void
  /** Match the dark navy forms (/transfer, /concierge) instead of the light card on /book. */
  dark?: boolean
}

export function SmsConsentCheckbox({ id, checked, onChange, dark = false }: SmsConsentCheckboxProps) {
  const wrapper = dark
    ? 'rounded-lg border border-white/15 bg-white/5 p-3'
    : 'rounded-lg border border-slate-200 bg-slate-50 p-3'
  const textClass = dark ? 'text-xs text-blue-200 leading-relaxed' : 'text-xs text-slate-600 leading-relaxed'
  const fineClass = dark ? 'text-[11px] text-blue-400 mt-1.5' : 'text-[11px] text-slate-400 mt-1.5'
  const linkClass = dark
    ? 'underline hover:text-[#D4AF37] transition-colors'
    : 'underline hover:text-[#1E3A5F] transition-colors'
  const boxClass = dark
    ? 'mt-0.5 h-4 w-4 flex-shrink-0 rounded border-white/30 bg-white/10 text-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-0'
    : 'mt-0.5 h-4 w-4 flex-shrink-0 rounded border-slate-300 text-[#1E3A5F] focus:ring-2 focus:ring-blue-500'

  return (
    <div className={wrapper}>
      <div className="flex items-start gap-2.5">
        <input
          id={id}
          name="sms_consent"
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className={boxClass}
        />
        <label htmlFor={id} className={textClass}>
          {SMS_CONSENT_TEXT}
        </label>
      </div>
      <p className={fineClass}>
        Optional — leaving this unchecked will not affect your request. See our{' '}
        <Link href="/privacy" className={linkClass}>Privacy Policy</Link> and{' '}
        <Link href="/terms" className={linkClass}>Terms</Link>.
      </p>
    </div>
  )
}

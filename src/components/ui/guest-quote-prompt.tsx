'use client'

import { useState } from 'react'
import { Mail, ArrowRight } from 'lucide-react'
import { RequestSailingForm } from './request-sailing-form'

interface GuestQuotePromptProps {
  guestCount: number
  className?: string
}

export function GuestQuotePrompt({ guestCount, className = '' }: GuestQuotePromptProps) {
  const [open, setOpen] = useState(false)

  // Only show the prompt when the configuration goes beyond the default 2-guest pricing model
  if (guestCount <= 2) return null

  return (
    <>
      <div
        className={`flex flex-col sm:flex-row sm:items-center gap-3 rounded-lg border border-[#D4AF37]/40 bg-amber-50 px-4 py-3 ${className}`}
      >
        <div className="flex items-start gap-2 flex-1">
          <Mail className="w-4 h-4 text-amber-700 mt-0.5 flex-shrink-0" aria-hidden="true" />
          <p className="text-sm text-amber-900">
            <span className="font-semibold">Pricing for groups of {guestCount} varies by sailing.</span>{' '}
            For exact pricing with your group, request a free quote.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-2 bg-[#D4AF37] text-[#1E3A5F] font-semibold text-sm rounded-lg hover:bg-yellow-300 transition-colors whitespace-nowrap"
        >
          Request a Free Quote
          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </button>
      </div>
      <RequestSailingForm open={open} onClose={() => setOpen(false)} />
    </>
  )
}

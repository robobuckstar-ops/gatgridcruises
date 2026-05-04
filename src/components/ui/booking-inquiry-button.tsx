'use client'

import { useState } from 'react'
import { ArrowRight, Mail } from 'lucide-react'
import { RequestSailingForm, type RequestSailingContext } from './request-sailing-form'
import { formatDate } from '@/lib/utils'

interface SailingDetails {
  id?: string
  itinerary_name?: string
  sail_date?: string
  length_nights?: number
  current_lowest_price?: number
  ship?: { name?: string }
}

interface BookingInquiryButtonProps {
  sailing?: SailingDetails
  /** Optional: pre-fill the cabin category in the form (e.g. "Verandah") */
  cabinCategory?: string
  variant?: 'inline' | 'sidebar' | 'banner'
  /** Override the button label */
  label?: string
  className?: string
}

function toFormContext(
  sailing: SailingDetails | undefined,
  cabinCategory: string | undefined,
): RequestSailingContext | undefined {
  if (!sailing && !cabinCategory) return undefined
  return {
    sailingId: sailing?.id,
    itineraryName: sailing?.itinerary_name,
    shipName: sailing?.ship?.name,
    sailDate: sailing?.sail_date ? formatDate(sailing.sail_date) : undefined,
    lengthNights: sailing?.length_nights,
    cabinCategory,
    startingPrice: sailing?.current_lowest_price,
  }
}

export function BookingInquiryButton({
  sailing,
  cabinCategory,
  variant = 'inline',
  label,
  className,
}: BookingInquiryButtonProps) {
  const [open, setOpen] = useState(false)
  const ctx = toFormContext(sailing, cabinCategory)
  const hasSailing = Boolean(sailing?.itinerary_name)
  const buttonLabel = label ?? (hasSailing ? 'Request This Sailing' : 'Get a Free Quote')

  return (
    <>
      {variant === 'sidebar' && (
        <div className={`bg-[#1E3A5F] rounded-xl p-5 ${className ?? ''}`}>
          <div className="flex items-center gap-2 mb-2">
            <Mail className="w-4 h-4 text-[#D4AF37]" />
            <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-wider">Free Concierge</p>
          </div>
          <h3 className="font-display text-base font-bold text-white mb-2">
            {hasSailing ? 'Interested in this sailing?' : 'Planning a Disney cruise?'}
          </h3>
          <p className="text-blue-200 text-xs mb-4 leading-relaxed">
            One-click inquiry — pre-filled with your sailing details. Grayson follows up personally,
            no pressure, no obligation.
          </p>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 w-full justify-center px-4 py-2.5 bg-[#D4AF37] text-[#1E3A5F] font-bold text-sm rounded-lg hover:bg-yellow-300 transition-colors"
          >
            {buttonLabel} <ArrowRight className="h-4 w-4" />
          </button>
          <p className="text-blue-300 text-[10px] mt-2.5 text-center">
            Via Boardwalk Travel Agency · Same Disney price
          </p>
        </div>
      )}

      {variant === 'banner' && (
        <div className={`bg-gradient-to-r from-[#1E3A5F] to-[#2a4f7a] rounded-2xl p-6 md:p-8 ${className ?? ''}`}>
          <div className="flex flex-col md:flex-row md:items-center gap-5">
            <div className="flex-1">
              <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-wider mb-1.5">
                Request This Sailing
              </p>
              <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-2">
                {hasSailing ? 'Like this one? Request it in one click.' : 'Tell us your dream sailing.'}
              </h3>
              <p className="text-blue-200 text-sm leading-relaxed">
                Same Disney price plus onboard credit, price-drop monitoring, and a real cruise
                concierge. We answer every inquiry personally.
              </p>
            </div>
            <div className="flex-shrink-0 text-center">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#D4AF37] text-[#1E3A5F] font-bold rounded-xl hover:bg-yellow-300 transition-colors whitespace-nowrap shadow-sm"
              >
                <Mail className="w-4 h-4" />
                {buttonLabel}
              </button>
              <p className="text-blue-300 text-[10px] mt-2">
                Via Boardwalk Travel Agency · Free
              </p>
            </div>
          </div>
        </div>
      )}

      {variant === 'inline' && (
        <div className={`border border-blue-200 bg-[#1E3A5F]/10 rounded-xl p-5 ${className ?? ''}`}>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1">
              <p className="text-blue-700 text-xs font-bold uppercase tracking-wider mb-1">
                One-click inquiry
              </p>
              <p className="text-slate-900 font-semibold text-sm">
                {hasSailing
                  ? 'Like this sailing? Request it in one click.'
                  : 'Get a free quote on any Disney sailing.'}
              </p>
              <p className="text-slate-500 text-xs mt-0.5">
                Same Disney price plus OBC, price-drop monitoring, and concierge — at no extra cost.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-[#1E3A5F] text-white font-semibold text-sm rounded-lg hover:bg-[#162d4a] transition-colors whitespace-nowrap"
            >
              {buttonLabel} <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      <RequestSailingForm open={open} onClose={() => setOpen(false)} context={ctx} />
    </>
  )
}

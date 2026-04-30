import Link from 'next/link'
import { ArrowRight, Mail } from 'lucide-react'

interface SailingDetails {
  id?: string
  itinerary_name?: string
  sail_date?: string
  length_nights?: number
  current_lowest_price?: number
  ship?: { name: string }
}

interface BookingInquiryButtonProps {
  sailing?: SailingDetails
  variant?: 'inline' | 'sidebar' | 'banner'
  className?: string
}

function buildConciergeHref(sailing?: SailingDetails): string {
  if (!sailing?.id) return '/concierge'
  return `/concierge?sailing=${sailing.id}`
}

export function BookingInquiryButton({ sailing, variant = 'inline', className }: BookingInquiryButtonProps) {
  const href = buildConciergeHref(sailing)

  if (variant === 'sidebar') {
    return (
      <div className={`bg-[#1E3A5F] rounded-xl p-5 ${className ?? ''}`}>
        <div className="flex items-center gap-2 mb-2">
          <Mail className="w-4 h-4 text-[#D4AF37]" />
          <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-wider">Free Concierge</p>
        </div>
        <h3 className="font-display text-base font-bold text-white mb-2">
          Interested in this sailing?
        </h3>
        <p className="text-blue-200 text-xs mb-4 leading-relaxed">
          Get a free quote and personal guidance from a Disney cruise specialist at Boardwalk Travel Agency — no pressure, no obligation.
        </p>
        <Link
          href={href}
          className="inline-flex items-center gap-2 w-full justify-center px-4 py-2.5 bg-[#D4AF37] text-[#1E3A5F] font-bold text-sm rounded-lg hover:bg-yellow-300 transition-colors"
        >
          Get a Free Quote <ArrowRight className="h-4 w-4" />
        </Link>
        <p className="text-blue-300 text-[10px] mt-2.5 text-center">
          Via Boardwalk Travel Agency · Free concierge service
        </p>
      </div>
    )
  }

  if (variant === 'banner') {
    return (
      <div className={`bg-gradient-to-r from-[#1E3A5F] to-[#2a4f7a] rounded-2xl p-6 md:p-8 ${className ?? ''}`}>
        <div className="flex flex-col md:flex-row md:items-center gap-5">
          <div className="flex-1">
            <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-wider mb-1.5">
              Free Concierge Service
            </p>
            <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-2">
              Want help planning this sailing?
            </h3>
            <p className="text-blue-200 text-sm leading-relaxed">
              Specialists at Boardwalk Travel Agency can walk you through pricing, current
              promotions, and stateroom options — no extra cost, no pressure.
            </p>
          </div>
          <div className="flex-shrink-0 text-center">
            <Link
              href={href}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#D4AF37] text-[#1E3A5F] font-bold rounded-xl hover:bg-yellow-300 transition-colors whitespace-nowrap shadow-sm"
            >
              <Mail className="w-4 h-4" />
              Get a Free Quote
            </Link>
            <p className="text-blue-300 text-[10px] mt-2">
              Via Boardwalk Travel Agency · Free service
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`border border-blue-200 bg-[#1E3A5F]/10 rounded-xl p-5 ${className ?? ''}`}>
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-1">
          <p className="text-blue-600 text-xs font-bold uppercase tracking-wider mb-1">
            Free Concierge Assistance
          </p>
          <p className="text-slate-800 font-semibold text-sm">
            Interested in this sailing? Get a free quote and concierge guidance.
          </p>
          <p className="text-slate-500 text-xs mt-0.5">
            Our team walks you through pricing and perks — free concierge service via Boardwalk Travel Agency.
          </p>
        </div>
        <Link
          href={href}
          className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-[#1E3A5F] text-white font-semibold text-sm rounded-lg hover:bg-[#162d4a] transition-colors whitespace-nowrap"
        >
          Get a free quote <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}

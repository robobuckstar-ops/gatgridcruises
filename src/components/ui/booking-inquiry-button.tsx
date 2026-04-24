import { ArrowRight, Mail } from 'lucide-react'

interface SailingDetails {
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

function buildMailtoHref(sailing?: SailingDetails): string {
  const email = 'bookings@gatgridcruises.com'

  if (!sailing) {
    return `mailto:${email}?subject=Disney%20Cruise%20Booking%20Inquiry`
  }

  const ship = sailing.ship?.name ? sailing.ship.name.replace('Disney ', '') : ''
  const rawDate = sailing.sail_date
  const date = rawDate
    ? new Date(rawDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : ''
  const itinerary = sailing.itinerary_name || ''
  const nights = sailing.length_nights || ''
  const price = sailing.current_lowest_price ? `$${sailing.current_lowest_price.toLocaleString()}` : ''

  const subject = encodeURIComponent(
    `Booking inquiry: ${itinerary}${ship ? ` on Disney ${ship}` : ''}`
  )
  const body = encodeURIComponent(
    `Hi GatGrid team,\n\nI'm interested in booking the following sailing and would love your help:\n\n` +
      `Itinerary: ${itinerary}\n` +
      (ship ? `Ship: Disney ${ship}\n` : '') +
      (date ? `Sail Date: ${date}\n` : '') +
      (nights ? `Length: ${nights} nights\n` : '') +
      (price ? `Starting from: ${price} per stateroom\n` : '') +
      `\nPlease reach out so we can discuss options!\n\nThanks`
  )

  return `mailto:${email}?subject=${subject}&body=${body}`
}

export function BookingInquiryButton({ sailing, variant = 'inline', className }: BookingInquiryButtonProps) {
  const href = buildMailtoHref(sailing)

  if (variant === 'sidebar') {
    return (
      <div className={`bg-[#1E3A5F] rounded-xl p-5 ${className ?? ''}`}>
        <div className="flex items-center gap-2 mb-2">
          <Mail className="w-4 h-4 text-[#D4AF37]" />
          <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-wider">Free Booking Help</p>
        </div>
        <h3 className="font-display text-base font-bold text-white mb-2">
          Interested in this sailing?
        </h3>
        <p className="text-blue-200 text-xs mb-4 leading-relaxed">
          Talk to a Disney cruise specialist at Boardwalk Travel Agency — free concierge service, no pressure.
        </p>
        <a
          href={href}
          className="inline-flex items-center gap-2 w-full justify-center px-4 py-2.5 bg-[#D4AF37] text-[#1E3A5F] font-bold text-sm rounded-lg hover:bg-yellow-300 transition-colors"
        >
          Get a Free Quote <ArrowRight className="h-4 w-4" />
        </a>
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
              Concierge Booking Help
            </p>
            <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-2">
              Ready to book this sailing?
            </h3>
            <p className="text-blue-200 text-sm leading-relaxed">
              Our specialists at Boardwalk Travel Agency can help you lock in the best price, apply
              promotions, and handle all the details — at no extra cost to you.
            </p>
          </div>
          <div className="flex-shrink-0 text-center">
            <a
              href={href}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#D4AF37] text-[#1E3A5F] font-bold rounded-xl hover:bg-yellow-300 transition-colors whitespace-nowrap shadow-sm"
            >
              <Mail className="w-4 h-4" />
              Let us help you book
            </a>
            <p className="text-blue-300 text-[10px] mt-2">
              Via Boardwalk Travel Agency · Free service
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`border border-blue-200 bg-blue-50 rounded-xl p-5 ${className ?? ''}`}>
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-1">
          <p className="text-blue-600 text-xs font-bold uppercase tracking-wider mb-1">
            Free Booking Assistance
          </p>
          <p className="text-slate-800 font-semibold text-sm">
            Interested in this sailing? Let us help you book it.
          </p>
          <p className="text-slate-500 text-xs mt-0.5">
            Our team finds the best price and perks — free concierge service via Boardwalk Travel Agency.
          </p>
        </div>
        <a
          href={href}
          className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-[#1E3A5F] text-white font-semibold text-sm rounded-lg hover:bg-[#162d4a] transition-colors whitespace-nowrap"
        >
          Get booking help <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  )
}

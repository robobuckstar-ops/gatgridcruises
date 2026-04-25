import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface SpecialistCTAProps {
  variant?: 'default' | 'compact'
}

export function SpecialistCTA({ variant = 'default' }: SpecialistCTAProps) {
  if (variant === 'compact') {
    return (
      <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-xl p-5">
        <div className="flex items-start gap-3">
          <div>
            <h3 className="font-semibold text-slate-900 text-sm mb-1">
              Ready to Book This Cruise?
            </h3>
            <p className="text-xs text-slate-600 mb-3">
              Free concierge service — our specialists find the best deal and handle the details.
            </p>
            <Link
              href="/concierge"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1E3A5F] hover:text-[#0a1628] transition-colors"
            >
              Get booking help <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-r from-[#1E3A5F] to-[#2a4f7a] rounded-2xl p-6 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center gap-6">
        <div className="flex-1">
          <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-wider mb-1.5">
            Concierge Booking Help
          </p>
          <h2 className="font-display text-xl md:text-2xl font-bold text-white mb-2">
            Ready to Book This Cruise?
          </h2>
          <p className="text-blue-200 text-sm md:text-base">
            Our specialists at Boardwalk Travel Agency can help you lock in the best price,
            apply promotions, and handle all the details — at no extra cost to you.
          </p>
        </div>
        <div className="flex-shrink-0">
          <Link
            href="/concierge"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#D4AF37] text-[#1E3A5F] font-bold rounded-xl hover:bg-yellow-300 transition-colors whitespace-nowrap shadow-sm"
          >
            Get a Free Quote <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}

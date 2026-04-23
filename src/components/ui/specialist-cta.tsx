import { PhoneCall } from 'lucide-react'

interface SpecialistCTAProps {
  variant?: 'default' | 'compact'
}

export function SpecialistCTA({ variant = 'default' }: SpecialistCTAProps) {
  if (variant === 'compact') {
    return (
      <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-xl p-5">
        <div className="flex items-start gap-3">
          <PhoneCall className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-slate-900 text-sm mb-1">
              Talk to a Disney Cruise Specialist
            </h3>
            <p className="text-xs text-slate-600 mb-3">
              Free help finding the best deal and perks for your trip.
            </p>
            <a
              href="mailto:robobuckstar@gmail.com"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              Contact a specialist →
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center gap-6">
        <div className="flex items-center justify-center w-14 h-14 bg-blue-600 rounded-2xl flex-shrink-0">
          <PhoneCall className="w-7 h-7 text-white" />
        </div>
        <div className="flex-1">
          <h2 className="font-fraunces text-xl md:text-2xl font-bold text-slate-900 mb-2">
            Planning a Disney Cruise? Talk to a Specialist.
          </h2>
          <p className="text-slate-600 text-sm md:text-base">
            A Disney Cruise Line specialist can help you find the best deal, apply promotions,
            and navigate all the options — at no cost to you.
          </p>
        </div>
        <div className="flex-shrink-0">
          <a
            href="mailto:robobuckstar@gmail.com"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors whitespace-nowrap shadow-sm"
          >
            <PhoneCall className="w-4 h-4" />
            Contact a Specialist
          </a>
        </div>
      </div>
    </div>
  )
}

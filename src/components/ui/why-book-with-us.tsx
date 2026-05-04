import { Coins, TrendingDown, UserRound, BadgeCheck } from 'lucide-react'

interface WhyBookWithUsProps {
  variant?: 'inline' | 'compact'
  className?: string
}

const VALUE_PROPS = [
  {
    icon: Coins,
    title: 'Onboard credit on qualifying sailings',
    description:
      'Up to $250 in onboard credit when you book through our partner agency — applied at no extra cost.',
  },
  {
    icon: TrendingDown,
    title: 'Price drop monitoring, automatic',
    description:
      "If Disney's fare drops before your final-payment date, we'll rebook you at the lower rate.",
  },
  {
    icon: UserRound,
    title: 'Dedicated cruise concierge',
    description:
      'A real Disney specialist (Grayson) walks you through stateroom choice, dining, port days, and more.',
  },
  {
    icon: BadgeCheck,
    title: 'Same Disney price — plus perks',
    description:
      'Our service is free; we earn from the cruise line, not you. You get the public Disney rate plus added perks.',
  },
] as const

export function WhyBookWithUs({ variant = 'inline', className }: WhyBookWithUsProps) {
  if (variant === 'compact') {
    return (
      <div className={`bg-slate-50 border border-slate-200 rounded-xl p-5 ${className ?? ''}`}>
        <h3 className="font-display text-base font-bold text-slate-900 mb-3">
          Why request a quote through GatGrid?
        </h3>
        <ul className="space-y-2.5">
          {VALUE_PROPS.map(({ icon: Icon, title, description }) => (
            <li key={title} className="flex items-start gap-2.5 text-sm">
              <Icon className="w-4 h-4 text-[#1E3A5F] flex-shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="font-semibold text-slate-900 leading-tight">{title}</p>
                <p className="text-slate-600 text-xs mt-0.5 leading-snug">{description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <section className={`bg-white border border-slate-200 rounded-2xl p-6 md:p-8 ${className ?? ''}`}>
      <div className="mb-5">
        <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-wider mb-1.5">
          Why request through GatGrid
        </p>
        <h2 className="font-display text-2xl font-bold text-slate-900">
          Same Disney price. More on top.
        </h2>
        <p className="text-sm text-slate-600 mt-2 max-w-2xl">
          GatGrid is run by a real Disney cruise specialist working through Boardwalk Travel Agency.
          We don&apos;t markup fares — we add perks, watch your price, and handle the planning.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {VALUE_PROPS.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100"
          >
            <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-[#1E3A5F] text-[#D4AF37] flex items-center justify-center">
              <Icon className="w-4.5 h-4.5" aria-hidden="true" />
            </div>
            <div>
              <p className="font-semibold text-slate-900 text-sm leading-tight">{title}</p>
              <p className="text-slate-600 text-xs mt-1 leading-relaxed">{description}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="text-[11px] text-slate-400 mt-5 leading-relaxed">
        OBC and rebooking perks subject to qualifying sailing types and Boardwalk Travel Agency
        terms. We&apos;ll confirm what applies to your specific sailing during your free quote.
      </p>
    </section>
  )
}

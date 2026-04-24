import Link from 'next/link'
import { Ship, Calendar, MapPin, Trophy } from 'lucide-react'
import type { Sailing } from '@/types/database'
import { formatPrice, formatDate } from '@/lib/utils'
import { DealScoreBadge } from './deal-score-badge'
import { calculateDealScore } from '@/lib/deal-score'
import { getOutTheDoorTotal } from '@/lib/pricing'

interface FeaturedDealCardProps {
  sailing: Sailing
}

export function FeaturedDealCard({ sailing }: FeaturedDealCardProps) {
  const dealScore = calculateDealScore(sailing, sailing.price_snapshots)
  const outTheDoor = getOutTheDoorTotal(
    sailing.current_lowest_price,
    sailing.length_nights,
    2,
    sailing.region
  )
  const pricePerPerson = outTheDoor.perPerson

  return (
    <Link
      href={`/sailing/${sailing.id}`}
      className="group block bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 hover:border-blue-400 hover:shadow-lg transition-all duration-200 overflow-hidden"
    >
      {/* Top bar */}
      <div className="h-1.5 bg-gradient-to-r from-[#D4AF37] to-amber-400" />

      <div className="p-5 sm:p-6">
        {/* Label */}
        <div className="flex items-center gap-2 mb-3">
          <Trophy className="w-4 h-4 text-amber-600" aria-hidden="true" />
          <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
            Top Deal This Week
          </span>
        </div>

        {/* Title */}
        <h3 className="font-fraunces text-xl sm:text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-700 transition-colors">
          {sailing.itinerary_name}
        </h3>

        {/* Details + Score — side by side on all sizes, score badge stays in flow */}
        <div className="flex items-start justify-between gap-4">
          {/* Details column */}
          <div className="space-y-1.5 min-w-0">
            {sailing.ship && (
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Ship className="h-4 w-4 text-slate-400 flex-shrink-0" />
                <span className="truncate">{sailing.ship.name}</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Calendar className="h-4 w-4 text-slate-400 flex-shrink-0" />
              <span>{formatDate(sailing.sail_date)} · {sailing.length_nights} nights</span>
            </div>
            {sailing.departure_port && (
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <MapPin className="h-4 w-4 text-slate-400 flex-shrink-0" />
                <span>{sailing.departure_port.name}</span>
              </div>
            )}
          </div>

          {/* Deal score badge — in-flow, never absolutely positioned */}
          <div className="flex-shrink-0 flex flex-col items-center gap-1">
            <DealScoreBadge score={dealScore.score} size="md" />
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide">
              Deal Score
            </span>
          </div>
        </div>

        {/* Price + CTA */}
        <div className="mt-4 pt-4 border-t border-blue-200 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs text-slate-500 mb-0.5">From (all-in, 2 guests)</p>
            <p className="text-2xl font-bold text-slate-900">
              {formatPrice(pricePerPerson)}
              <span className="text-sm font-normal text-slate-500"> /person</span>
            </p>
          </div>
          <span className="flex-shrink-0 inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-blue-600 group-hover:bg-blue-700 text-white font-semibold text-sm transition-colors">
            View Deal
          </span>
        </div>
      </div>
    </Link>
  )
}

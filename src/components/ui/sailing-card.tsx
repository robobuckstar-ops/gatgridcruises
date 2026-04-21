'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Sailing } from '@/types/database'
import { formatPrice, formatDate, cn } from '@/lib/utils'
import { calculateDealScore } from '@/lib/deal-score'
import { getOutTheDoorTotalForGuests } from '@/lib/pricing'
import { DealScoreBadge } from './deal-score-badge'
import { Ship, Calendar, MapPin, ChevronDown } from 'lucide-react'

interface SailingCardProps {
  sailing: Sailing
  guestCount?: number
  percentBelow?: number
}

export function SailingCard({ sailing, guestCount = 2, percentBelow }: SailingCardProps) {
  const [expandedPrice, setExpandedPrice] = useState(false)

  const dealScore = calculateDealScore(sailing, sailing.price_snapshots)

  const pricing = getOutTheDoorTotalForGuests(
    sailing.current_lowest_price,
    sailing.length_nights,
    guestCount,
    sailing.region
  )

  const guestLabel = guestCount === 1 ? '1 guest' : guestCount >= 4 ? '4+ guests' : `${guestCount} guests`

  const recommendationColors = {
    'strong-buy': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    buy: 'bg-blue-50 text-blue-700 border-blue-200',
    fair: 'bg-slate-50 text-slate-700 border-slate-200',
    wait: 'bg-amber-50 text-amber-700 border-amber-200',
    overpriced: 'bg-red-50 text-red-700 border-red-200',
  }

  const recommendationLabels = {
    'strong-buy': 'Strong Buy',
    buy: 'Buy',
    fair: 'Fair',
    wait: 'Wait',
    overpriced: 'Skip',
  }

  return (
    <Link
      href={`/sailing/${sailing.id}`}
      className="group block bg-white rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all duration-200 overflow-hidden"
    >
      <div className="h-1.5 bg-gradient-to-r from-blue-600 to-blue-500 group-hover:from-[#D4AF37] group-hover:to-amber-400 transition-all duration-200" />

      <div className="p-5">
        {/* Score badge + recommendation pill */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <DealScoreBadge
            score={dealScore.score}
            label={dealScore.breakdown.final_score >= 80 ? '★' : undefined}
            size="md"
          />
          <div className="flex-1 flex items-center justify-end gap-2">
            <span
              className={cn(
                'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border',
                recommendationColors[dealScore.recommendation]
              )}
            >
              {recommendationLabels[dealScore.recommendation]}
            </span>
          </div>
        </div>

        {/* Itinerary name */}
        <h3 className="font-display text-lg font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
          {sailing.itinerary_name}
        </h3>

        {/* Details */}
        <div className="space-y-1.5 mb-4">
          {sailing.ship && (
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Ship className="h-4 w-4 text-slate-400 flex-shrink-0" />
              <span>{sailing.ship.name}</span>
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

        {/* Pricing Section */}
        <div className="space-y-3 pt-3 border-t border-slate-100">
          {/* Per-person per-night — most prominent */}
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-2xl font-bold text-slate-900">
                {formatPrice(pricing.perPersonPerNight)}
              </span>
              <span className="text-sm text-slate-500 ml-1">/person/night</span>
            </div>
            <span className="text-xs text-slate-500">{guestLabel}</span>
          </div>

          {/* All-in per person total */}
          <div className="flex items-baseline justify-between">
            <span className="text-sm text-slate-600">All-in per person</span>
            <span className="text-base font-semibold text-slate-800">{formatPrice(pricing.perPerson)}</span>
          </div>

          {/* Expandable breakdown */}
          <button
            onClick={(e) => {
              e.preventDefault()
              setExpandedPrice(!expandedPrice)
            }}
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors text-xs text-slate-600 font-medium"
          >
            <span>View price breakdown</span>
            <ChevronDown
              className={cn(
                'h-4 w-4 transition-transform duration-200',
                expandedPrice && 'rotate-180'
              )}
            />
          </button>

          {expandedPrice && (
            <div className="space-y-1.5 px-3 py-2 bg-slate-50 rounded-lg text-xs text-slate-700">
              <div className="flex justify-between">
                <span>Base Fare (per person)</span>
                <span className="font-semibold">{formatPrice(sailing.current_lowest_price / 2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Port Fees & Taxes (est.)</span>
                <span className="font-semibold text-slate-500">varies</span>
              </div>
              <div className="flex justify-between">
                <span>Gratuities ({sailing.length_nights} nights)</span>
                <span className="font-semibold">{formatPrice(sailing.length_nights * 14.5)}/person</span>
              </div>
              <div className="border-t border-slate-200 pt-1.5 flex justify-between font-semibold text-slate-900">
                <span>Est. Total Per Person</span>
                <span>{formatPrice(pricing.perPerson)}</span>
              </div>
              <p className="text-xs text-slate-400 pt-1">Prices are approximate. Verify at cruise line for final totals.</p>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}

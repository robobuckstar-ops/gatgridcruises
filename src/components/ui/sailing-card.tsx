'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Sailing } from '@/types/database'
import { formatPrice, formatDate, cn } from '@/lib/utils'
import { calculateDealScore } from '@/lib/deal-score'
import { getOutTheDoorTotalForGuests } from '@/lib/pricing'
import { Ship, Calendar, MapPin, ChevronDown, Bot, Gift } from 'lucide-react'
import { getOBC } from '@/lib/obc'

interface SailingCardProps {
  sailing: Sailing
  percentBelow?: number
  guestCount?: number
}

export function SailingCard({ sailing, percentBelow, guestCount = 2 }: SailingCardProps) {
  const [expandedPrice, setExpandedPrice] = useState(false)

  // Calculate deal score
  const dealScore = calculateDealScore(sailing, sailing.price_snapshots)

  // OBC based on base cruise fare (current_lowest_price = total fare for all guests)
  const obcAmount = getOBC(sailing.current_lowest_price)

  const outTheDoor = getOutTheDoorTotalForGuests(
    sailing.current_lowest_price,
    sailing.length_nights,
    guestCount,
    sailing.region
  )

  // Price per person per night (based on all-in per-person total)
  const pricePerNight = sailing.length_nights > 0 ? Math.round(outTheDoor.perPerson / sailing.length_nights) : 0

  // Recommendation color
  const recommendationColors = {
    'strong-buy': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    buy: 'bg-blue-50 text-blue-700 border-blue-200',
    fair: 'bg-slate-50 text-slate-700 border-slate-200',
    wait: 'bg-amber-50 text-amber-700 border-amber-200',
    overpriced: 'bg-red-50 text-red-700 border-red-200',
  }

  const recommendationLabels = {
    'strong-buy': 'Hot Deal',
    buy: 'Great Deal',
    fair: 'Fair',
    wait: 'Wait',
    overpriced: 'Skip',
  }

  const themeBadge = sailing.theme ? {
    halloween: { emoji: '🎃', label: 'Halloween',  className: 'bg-orange-100 text-orange-800 border-orange-300' },
    merrytime:  { emoji: '🎄', label: 'Merrytime',  className: 'bg-red-100 text-red-800 border-red-300' },
    starwars:   { emoji: '⭐', label: 'Star Wars',  className: 'bg-blue-100 text-blue-800 border-blue-300' },
    marvel:     { emoji: '🦸', label: 'Marvel',     className: 'bg-red-100 text-red-900 border-red-400' },
  }[sailing.theme] : null

  return (
    <Link
      href={`/sailing/${sailing.id}`}
      className="group relative block bg-white rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all duration-200 overflow-hidden"
    >
      {/* Ship color bar at top */}
      <div className="h-1.5 bg-gradient-to-r from-blue-600 to-blue-500 group-hover:from-[#D4AF37] group-hover:to-amber-400 transition-all duration-200" />

      <div className="p-5">
        {/* Label pills */}
        <div className="flex items-center gap-1.5 flex-wrap mb-3">
          {themeBadge && (
            <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full border text-[10px] font-semibold whitespace-nowrap ${themeBadge.className}`}>
              {themeBadge.emoji} {themeBadge.label}
            </span>
          )}
          {(dealScore.recommendation === 'strong-buy' || dealScore.recommendation === 'buy') && (
            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-violet-50 border border-violet-200 text-violet-700 text-[10px] font-semibold whitespace-nowrap">
              <Bot className="w-3 h-3" aria-hidden="true" />
              AI Pick
            </span>
          )}
          <span
            className={cn(
              'inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-semibold border whitespace-nowrap',
              recommendationColors[dealScore.recommendation]
            )}
          >
            {recommendationLabels[dealScore.recommendation]}
          </span>
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
              <span>Disney {sailing.ship.name.replace('Disney ', '')}</span>
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
          {/* Out-the-door total - prominent */}
          <div className="space-y-1">
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-slate-600 font-medium">Total Per Person</span>
              <span className="text-xs text-slate-500">(all-in, {outTheDoor.guests === 1 ? '1 guest' : `${outTheDoor.guests} guests`})</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-bold text-slate-900">
                {formatPrice(outTheDoor.perPerson)}
              </span>
              {pricePerNight > 0 && (
                <span className="text-xs text-emerald-600 font-semibold">{formatPrice(pricePerNight)}/night</span>
              )}
            </div>
            {/* Price vs historical average */}
            {sailing.price_snapshots && sailing.price_snapshots.length >= 2 && (() => {
              const prices = sailing.price_snapshots!.map(s => s.lowest_price)
              const avg = prices.reduce((a, b) => a + b, 0) / prices.length
              const pct = Math.round(((sailing.current_lowest_price - avg) / avg) * 100)
              if (Math.abs(pct) < 2) return null
              return (
                <p className={`text-xs font-semibold ${pct < 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                  {pct < 0 ? `↓ ${Math.abs(pct)}% vs avg` : `↑ ${pct}% vs avg`}
                </p>
              )
            })()}
          </div>

          {/* OBC Badge */}
          {obcAmount > 0 && (
            <div className="rounded-lg bg-amber-50 border border-amber-200 px-3 py-2">
              <div className="flex items-center gap-1.5">
                <Gift className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" aria-hidden="true" />
                <span className="text-xs font-semibold text-amber-800">
                  GatGrid clients get ~${obcAmount} in free onboard credit*
                </span>
              </div>
              <p className="text-[10px] text-amber-700/70 mt-0.5 leading-tight">
                *Estimated OBC based on listed fare. Actual amount determined at booking and may vary. Applied after final payment.{' '}
                <span
                  className="underline cursor-pointer"
                  title="Onboard credit (OBC) is provided as a booking incentive through Boardwalk Travel Agency for GatGrid clients. OBC has no cash value; unused credit is forfeited at voyage end. OBC amounts subject to change. See gatgridcruises.com/onboard-credit for full terms."
                >
                  See full terms.
                </span>
              </p>
            </div>
          )}

          {/* Expandable breakdown */}
          <button
            onClick={(e) => {
              e.preventDefault()
              setExpandedPrice(!expandedPrice)
            }}
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors text-xs text-slate-600 font-medium group/btn"
          >
            <span>View price breakdown</span>
            <ChevronDown
              className={cn(
                'h-4 w-4 transition-transform duration-200',
                expandedPrice && 'rotate-180'
              )}
            />
          </button>

          {/* Price breakdown */}
          {expandedPrice && (
            <div className="space-y-1.5 px-3 py-2 bg-slate-50 rounded-lg text-xs text-slate-700">
              <div className="flex justify-between">
                <span>Base Fare (per person)</span>
                <span className="font-semibold">{formatPrice(Math.round(outTheDoor.adjustedBase / outTheDoor.guests))}</span>
              </div>
              <div className="flex justify-between">
                <span>Port Fees & Taxes</span>
                <span className="font-semibold">{formatPrice(outTheDoor.portFees)}</span>
              </div>
              <div className="flex justify-between">
                <span>Gratuities ({sailing.length_nights} nights)</span>
                <span className="font-semibold">{formatPrice(outTheDoor.gratuities)}</span>
              </div>
              <div className="border-t border-slate-200 pt-1.5 flex justify-between font-semibold text-slate-900">
                <span>Total (all {outTheDoor.guests === 1 ? '1 guest' : `${outTheDoor.guests} guests`})</span>
                <span>{formatPrice(outTheDoor.total)}</span>
              </div>
              <div className="flex justify-between font-semibold text-blue-700">
                <span>Per Person</span>
                <span>{formatPrice(outTheDoor.perPerson)}</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </Link>
  )
}

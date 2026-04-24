import Link from 'next/link'
import { Calendar, MapPin, Ship, Clock, Flame } from 'lucide-react'
import { BookingInquiryButton } from './booking-inquiry-button'
import type { FeaturedDealResult } from '@/lib/data'

export function FeaturedDealCard({ sailing, historicalAvgPrice, savingsAmount, savingsPct }: FeaturedDealResult) {
  const score = sailing.sailing_score ?? 0
  const pricePerNight = Math.round(sailing.current_lowest_price / sailing.length_nights / 2)

  const sailDate = new Date(sailing.sail_date + 'T12:00:00')
  const endDate = new Date(sailDate.getTime() + sailing.length_nights * 24 * 60 * 60 * 1000)
  const dateRange = `${sailDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`

  const ports = sailing.itinerary_details
    ?.filter(d => d.port !== 'At Sea' && !d.port.toLowerCase().includes('canaveral') && !d.port.toLowerCase().includes('departure') && !d.port.toLowerCase().includes('arrival'))
    .map(d => d.port.split(',')[0])
    .filter((v, i, a) => a.indexOf(v) === i)
    .slice(0, 4)
    .join(' · ')

  const recommendationLabel =
    score >= 85 ? 'Exceptional Deal' :
    score >= 70 ? 'Great Value' :
    score >= 55 ? 'Fair Price' : 'Good Price'

  const recommendationColor =
    score >= 85 ? 'bg-emerald-100 text-emerald-700' :
    score >= 70 ? 'bg-blue-100 text-blue-700' :
    'bg-amber-100 text-amber-700'

  return (
    <div className="relative">
      {/* Gold gradient border */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-yellow-300 to-[#D4AF37] opacity-90" />

      <div className="relative m-[2px] bg-white rounded-[14px] overflow-hidden shadow-xl">
        {/* Header bar */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" aria-hidden="true" />
            <span className="text-white font-bold text-sm tracking-wider uppercase">Featured Deal</span>
            <span className="hidden sm:inline text-[#D4AF37] text-xs font-medium ml-1">— Best deal score right now</span>
          </div>
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${recommendationColor}`}>
            {recommendationLabel}
          </span>
        </div>

        <div className="p-5 md:p-8">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
            {/* Left: details */}
            <div className="flex-1 min-w-0">
              <div className="mb-5">
                <h2 className="font-fraunces text-xl md:text-2xl lg:text-3xl font-bold text-slate-900 leading-tight">
                  {sailing.itinerary_name}
                </h2>
                <p className="text-slate-500 text-sm mt-1">
                  {sailing.ship?.name ?? 'Disney Cruise Line'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm text-slate-600 mb-5">
                <div className="flex items-center gap-2">
                  <Ship className="w-4 h-4 text-[#1E3A5F] flex-shrink-0" aria-hidden="true" />
                  <span className="font-medium">{sailing.ship?.name ?? 'Disney Cruise Line'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#1E3A5F] flex-shrink-0" aria-hidden="true" />
                  <span>{dateRange}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#1E3A5F] flex-shrink-0" aria-hidden="true" />
                  <span>{sailing.length_nights} nights</span>
                </div>
                {sailing.departure_port && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#1E3A5F] flex-shrink-0" aria-hidden="true" />
                    <span>From {sailing.departure_port.name}</span>
                  </div>
                )}
              </div>

              {ports && (
                <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1">Ports of Call</p>
                  <p className="text-slate-700 text-sm font-medium">{ports}</p>
                </div>
              )}
            </div>

            {/* Right: pricing + CTA */}
            <div className="lg:w-72 flex-shrink-0 flex flex-col gap-4">
              <div className="bg-gradient-to-br from-slate-50 to-blue-50 border border-slate-200 rounded-xl p-5">
                {historicalAvgPrice && savingsAmount && savingsAmount > 0 ? (
                  <>
                    <p className="text-slate-400 text-sm line-through mb-0.5">
                      Was ${historicalAvgPrice.toLocaleString()}
                    </p>
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-3xl font-extrabold text-slate-900">
                        ${sailing.current_lowest_price.toLocaleString()}
                      </span>
                      <span className="text-slate-500 text-sm">for 2</span>
                    </div>
                    <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full mb-3">
                      Save ${savingsAmount.toLocaleString()}
                      {savingsPct && <span>({savingsPct}% off)</span>}
                    </div>
                  </>
                ) : (
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-3xl font-extrabold text-slate-900">
                      ${sailing.current_lowest_price.toLocaleString()}
                    </span>
                    <span className="text-slate-500 text-sm">for 2</span>
                  </div>
                )}
                <p className="text-emerald-600 font-semibold text-sm">
                  ${pricePerNight}/person/night
                </p>
              </div>

              <BookingInquiryButton sailing={sailing} variant="sidebar" />

              <div className="text-center">
                <Link
                  href="/deals"
                  className="text-blue-600 text-xs font-semibold hover:text-blue-800 transition-colors"
                >
                  Browse all deals →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

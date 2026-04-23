import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getSailingById, getShipById, getStateroomsForShip, getHotelsForPort, getTransfersForPort, getSnapshotsForSailing } from '@/lib/data'
import { formatPrice, formatDate, getScoreBg, calculateSailingScore, daysUntil } from '@/lib/utils'
import { generateSailingSchema } from '@/lib/structured-data'
import { calculateOutTheDoorPrice } from '@/lib/pricing'
import { StructuredData } from '@/components/ui/structured-data'
import { PriceChart } from '@/components/ui/price-chart'
import { ScoreBadge } from '@/components/ui/score-badge'
import { BuyWaitBadge } from '@/components/ui/buy-wait-badge'
import { PriceTrend } from '@/components/ui/price-trend'
import { Ship, Calendar, MapPin, Clock, DollarSign, Anchor, BedDouble, Car, Building2, ArrowRight, Check, X as XIcon, Info, TrendingDown, TrendingUp, ShoppingBag } from 'lucide-react'
import { BookingInquiryButton } from '@/components/ui/booking-inquiry-button'

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const sailing = getSailingById(id)
  if (!sailing) return { title: 'Sailing Not Found' }
  return {
    title: `${sailing.itinerary_name} — ${formatDate(sailing.sail_date)}`,
    description: `${sailing.itinerary_name} on Disney ${sailing.ship?.name.replace('Disney ', '')}. Starting from ${formatPrice(sailing.current_lowest_price)}. Sailing Score: ${sailing.sailing_score}/100.`,
  }
}

export default async function SailingDetailPage({ params }: PageProps) {
  const { id } = await params
  const sailing = getSailingById(id)
  if (!sailing) notFound()

  const ship = sailing.ship
  const port = sailing.departure_port
  const snapshots = sailing.price_snapshots || []
  const staterooms = ship ? getStateroomsForShip(ship.id).slice(0, 5) : []
  const hotels = port ? getHotelsForPort(port.id).slice(0, 5) : []
  const transfers = port ? getTransfersForPort(port.id) : []

  // Calculate average price from snapshots
  const avgPrice = snapshots.length > 0
    ? snapshots.reduce((sum, s) => sum + s.lowest_price, 0) / snapshots.length
    : sailing.current_lowest_price
  const percentBelow = Math.max(0, Math.round(((avgPrice - sailing.current_lowest_price) / avgPrice) * 100))

  return (
    <div className="min-h-screen bg-white">
      <StructuredData data={generateSailingSchema(sailing)} />
      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 text-slate-900 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <ScoreBadge score={sailing.sailing_score} size="lg" showTooltip />
                {percentBelow > 0 && (
                  <span className="text-sm text-emerald-600 font-medium">{percentBelow}% below average</span>
                )}
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold mb-3">{sailing.itinerary_name}</h1>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-slate-600">
                {ship && (
                  <span className="flex items-center gap-1.5">
                    <Ship className="h-4 w-4" /> Disney {ship.name.replace('Disney ', '')}
                  </span>
                )}
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" /> {formatDate(sailing.sail_date)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" /> {sailing.length_nights} Nights
                </span>
                {port && (
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" /> {port.name}
                  </span>
                )}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-5 min-w-[240px]">
              <p className="text-xs text-slate-500 mb-1">Starting from</p>
              <div className="flex items-baseline gap-2 mb-1">
                <p className="text-4xl font-bold text-blue-600">{formatPrice(sailing.current_lowest_price)}</p>
                {snapshots.length > 0 && (
                  <span className="text-xs">
                    <PriceTrend snapshots={snapshots} />
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 mb-3">per stateroom</p>
              {/* Price by category */}
              <div className="space-y-1.5 text-sm border-t border-blue-100 pt-3">
                {sailing.current_inside_price && (
                  <div className="flex justify-between"><span className="text-slate-600">Inside</span><span className="font-medium">{formatPrice(sailing.current_inside_price)}</span></div>
                )}
                {sailing.current_oceanview_price && (
                  <div className="flex justify-between"><span className="text-slate-600">Oceanview</span><span className="font-medium">{formatPrice(sailing.current_oceanview_price)}</span></div>
                )}
                {sailing.current_verandah_price && (
                  <div className="flex justify-between"><span className="text-slate-600">Verandah</span><span className="font-medium">{formatPrice(sailing.current_verandah_price)}</span></div>
                )}
                {sailing.current_concierge_price && (
                  <div className="flex justify-between"><span className="text-slate-600">Concierge</span><span className="font-medium">{formatPrice(sailing.current_concierge_price)}</span></div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>



      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content - 2/3 */}
          <div className="lg:col-span-2 space-y-10">

            {/* Booking CTA — top */}
            <BookingInquiryButton sailing={sailing} variant="inline" />

            {/* Travel Hack Tip */}
            <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-amber-400 rounded-r-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <span className="text-xl mt-0.5">💡</span>
                <div className="flex-1">
                  <p className="font-semibold text-sm text-amber-900 mb-1">Travel Hack</p>
                  <p className="text-sm text-amber-800">
                    The Chase Sapphire Preferred signup bonus ($750 value) could cover flights to {port?.name} for this cruise.
                  </p>
                  <a href="/travel-hacks" className="inline-flex items-center gap-1 text-sm font-medium text-amber-700 hover:text-amber-900 mt-2 transition-colors">
                    See all travel hacks →
                  </a>
                </div>
              </div>
            </div>

            {/* Price History Chart and Buy/Wait Badge */}
            <section>
              <h2 className="font-display text-2xl font-bold text-slate-900 mb-4">Price Analysis</h2>
              <div className="space-y-4">
                {/* Price History Chart */}
                <div className="bg-white border border-slate-200 rounded-xl p-5">
                  <PriceChart snapshots={snapshots} currentPrice={sailing.current_lowest_price} />
                </div>

                {/* Buy/Wait Recommendation */}
                {snapshots.length >= 2 && (
                  <div className="bg-white border border-slate-200 rounded-xl p-5">
                    <h3 className="font-display text-lg font-semibold text-slate-900 mb-3">Timing Recommendation</h3>
                    <BuyWaitBadge currentPrice={sailing.current_lowest_price} snapshots={snapshots} sailDate={sailing.sail_date} />
                  </div>
                )}

                {/* Link to price tracker */}
                <div className="flex items-center justify-end">
                  <Link
                    href="/price-tracker"
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 transition-colors"
                  >
                    <TrendingDown className="w-4 h-4" />
                    Compare prices across all sailings →
                  </Link>
                </div>
              </div>
            </section>

            {/* Price Breakdown - Out the Door Pricing */}
            <section>
              <h2 className="font-display text-2xl font-bold text-slate-900 mb-4">Total Cost Breakdown</h2>
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <div className="p-5 border-b border-slate-200">
                  <p className="text-sm text-slate-600 mb-4">
                    The price shown includes the base fare plus estimated port fees and gratuities for 2 guests. Your actual cost may vary based on stateroom category and number of guests.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x md:divide-slate-200">
                  {sailing.current_inside_price && (
                    <div className="p-5">
                      <p className="text-sm font-semibold text-slate-900 mb-3">Inside Stateroom</p>
                      <div className="space-y-2 mb-3 text-sm">
                        <div className="flex justify-between"><span className="text-slate-600">Base fare:</span><span className="font-medium">{formatPrice(sailing.current_inside_price)}</span></div>
                        <div className="flex justify-between"><span className="text-slate-600">Port fees & taxes:</span><span className="font-medium">{formatPrice(calculateOutTheDoorPrice(sailing, 'inside', 2).portFees)}</span></div>
                        <div className="flex justify-between"><span className="text-slate-600">Gratuities (2 guests):</span><span className="font-medium">{formatPrice(calculateOutTheDoorPrice(sailing, 'inside', 2).gratuities)}</span></div>
                      </div>
                      <div className="border-t border-slate-200 pt-3 flex justify-between items-center">
                        <span className="text-slate-900 font-semibold">Total</span>
                        <span className="text-2xl font-bold text-blue-600">{formatPrice(calculateOutTheDoorPrice(sailing, 'inside', 2).total)}</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-2">{formatPrice(calculateOutTheDoorPrice(sailing, 'inside', 2).perPerson)} per person</p>
                    </div>
                  )}
                  {sailing.current_oceanview_price && (
                    <div className="p-5">
                      <p className="text-sm font-semibold text-slate-900 mb-3">Oceanview Stateroom</p>
                      <div className="space-y-2 mb-3 text-sm">
                        <div className="flex justify-between"><span className="text-slate-600">Base fare:</span><span className="font-medium">{formatPrice(sailing.current_oceanview_price)}</span></div>
                        <div className="flex justify-between"><span className="text-slate-600">Port fees & taxes:</span><span className="font-medium">{formatPrice(calculateOutTheDoorPrice(sailing, 'oceanview', 2).portFees)}</span></div>
                        <div className="flex justify-between"><span className="text-slate-600">Gratuities (2 guests):</span><span className="font-medium">{formatPrice(calculateOutTheDoorPrice(sailing, 'oceanview', 2).gratuities)}</span></div>
                      </div>
                      <div className="border-t border-slate-200 pt-3 flex justify-between items-center">
                        <span className="text-slate-900 font-semibold">Total</span>
                        <span className="text-2xl font-bold text-blue-600">{formatPrice(calculateOutTheDoorPrice(sailing, 'oceanview', 2).total)}</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-2">{formatPrice(calculateOutTheDoorPrice(sailing, 'oceanview', 2).perPerson)} per person</p>
                    </div>
                  )}
                </div>
                <div className="p-5 bg-slate-50 border-t border-slate-200">
                  <Link href={`/tools/cost-calculator?sailing=${sailing.id}`} className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium">
                    Calculate custom costs <ArrowRight className="h-4 w-4" />
                  </Link>
                  <p className="text-xs text-slate-500 mt-2">Add flights, hotels, excursions, dining packages, and more to see your true trip cost.</p>
                </div>
              </div>
            </section>

            {/* Booking CTA — middle */}
            <BookingInquiryButton sailing={sailing} variant="inline" />

            {/* Itinerary */}
            <section>
              <h2 className="font-display text-2xl font-bold text-slate-900 mb-4">Itinerary</h2>
              <div className="space-y-3">
                {sailing.itinerary_details.map((day) => (
                  <div key={day.day} className="flex gap-4 p-4 bg-slate-50 rounded-lg">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-sm">
                      Day {day.day}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{day.port}</p>
                      <p className="text-sm text-slate-600">{day.description}</p>
                      {(day.arrival || day.departure) && (
                        <p className="text-xs text-slate-400 mt-1">
                          {day.arrival && `Arrive: ${day.arrival}`}
                          {day.arrival && day.departure && ' · '}
                          {day.departure && `Depart: ${day.departure}`}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* What's Included vs Extra (if ship data exists) */}
            {ship && (
              <section>
                <h2 className="font-display text-2xl font-bold text-slate-900 mb-4">What&apos;s Included vs. Extra</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
                    <h3 className="font-semibold text-emerald-800 flex items-center gap-2 mb-3">
                      <Check className="h-5 w-5" /> Included in Your Fare
                    </h3>
                    <ul className="space-y-2">
                      {ship.whats_included.map((cat) => (
                        <li key={cat.category}>
                          <p className="text-sm font-medium text-emerald-700">{cat.category}</p>
                          <p className="text-xs text-emerald-600">{cat.items.join(', ')}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                    <h3 className="font-semibold text-amber-800 flex items-center gap-2 mb-3">
                      <DollarSign className="h-5 w-5" /> Costs Extra
                    </h3>
                    <ul className="space-y-2">
                      {ship.whats_extra.map((cat) => (
                        <li key={cat.category}>
                          <p className="text-sm font-medium text-amber-700">{cat.category}</p>
                          {cat.items.map(item => (
                            <p key={item.name} className="text-xs text-amber-600">{item.name}: {item.price_range}</p>
                          ))}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
            )}

            {/* Recommended Staterooms */}
            {staterooms.length > 0 && (
              <section>
                <h2 className="font-display text-2xl font-bold text-slate-900 mb-4">Recommended Staterooms</h2>
                <div className="space-y-3">
                  {staterooms.map(room => (
                    <div key={room.id} className="border border-slate-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <span className="font-semibold text-slate-900">Room {room.room_number}</span>
                          <span className="ml-2 text-sm text-slate-500">{room.category} · Deck {room.deck} · {room.position}</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs">
                          <span title="Noise Rating">🔇 {room.noise_rating}/5</span>
                          <span title="View Rating">👁 {room.view_rating}/5</span>
                        </div>
                      </div>
                      <div className="flex gap-4 text-xs">
                        <div className="text-emerald-600">
                          {room.pros.slice(0, 2).map(p => <span key={p} className="block">+ {p}</span>)}
                        </div>
                        <div className="text-red-500">
                          {room.cons.slice(0, 1).map(c => <span key={c} className="block">- {c}</span>)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Link href="/tools/staterooms" className="inline-flex items-center gap-1 mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium">
                  View all staterooms <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </section>
            )}

            {/* Packing guide promo */}
            <section className="border border-slate-200 rounded-xl p-5 bg-slate-50/60">
              <div className="flex items-start gap-3 mb-4">
                <div className="flex-shrink-0 w-9 h-9 bg-blue-50 border border-blue-100 rounded-lg flex items-center justify-center">
                  <ShoppingBag className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-display text-base font-semibold text-slate-900">Prepping for Your Voyage?</h3>
                  <p className="text-sm text-slate-500 mt-0.5">Check out our curated list of Disney cruise must-haves</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {[
                  { name: 'Magnetic Hooks', emoji: '🧲', note: 'Stateroom essential' },
                  { name: 'Cruise Lanyard', emoji: '🏷️', note: 'Key to the World card' },
                  { name: 'Reef-Safe Sunscreen', emoji: '☀️', note: 'Required at Castaway Cay' },
                ].map((item) => (
                  <div key={item.name} className="bg-white border border-slate-200 rounded-lg p-3 text-center">
                    <span className="text-2xl block mb-1">{item.emoji}</span>
                    <p className="text-xs font-medium text-slate-800">{item.name}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{item.note}</p>
                  </div>
                ))}
              </div>
              <Link
                href="/guides/packing-gear"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
              >
                See the full packing list <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </section>

            {/* Booking CTA — end of page */}
            <BookingInquiryButton sailing={sailing} variant="banner" />
          </div>

          {/* Sidebar - 1/3 */}
          <div className="space-y-6">
            {/* Cost Calculator CTA */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
              <h3 className="font-display text-lg font-semibold text-slate-900 mb-2">What Will This Trip Really Cost?</h3>
              <p className="text-sm text-slate-600 mb-4">
                Add flights, hotels, gratuities, excursions, and more to see the true cost.
              </p>
              <Link
                href={`/tools/cost-calculator?sailing=${sailing.id}`}
                className="inline-flex items-center gap-2 w-full justify-center px-4 py-2.5 bg-[#D4AF37] text-slate-900 font-semibold text-sm rounded-lg hover:bg-yellow-300 transition-colors"
              >
                Calculate Total Cost <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Pre-cruise hotels */}
            {hotels.length > 0 && (
              <div className="bg-white border border-slate-200 rounded-xl p-5">
                <h3 className="font-display text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-blue-600" /> Pre-Cruise Hotels
                </h3>
                <div className="space-y-3">
                  {hotels.slice(0, 3).map(hotel => (
                    <div key={hotel.id} className="pb-3 border-b border-slate-100 last:border-0 last:pb-0">
                      <p className="font-medium text-sm text-slate-900">{hotel.name}</p>
                      <p className="text-xs text-slate-500">{hotel.price_range} · {hotel.distance_to_port_miles}mi to port</p>
                      {hotel.shuttle_available && (
                        <p className="text-xs text-emerald-600 mt-0.5">Shuttle available</p>
                      )}
                    </div>
                  ))}
                </div>
                {port && (
                  <Link href={`/hotels/${port.slug}`} className="inline-flex items-center gap-1 mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium">
                    All {port.name} hotels <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                )}
                <p className="text-[10px] text-slate-400 mt-2">This page contains affiliate links. We may earn a commission at no extra cost to you.</p>
              </div>
            )}

            {/* Transfer options */}
            {transfers.length > 0 && (
              <div className="bg-white border border-slate-200 rounded-xl p-5">
                <h3 className="font-display text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
                  <Car className="h-5 w-5 text-blue-600" /> Getting to the Port
                </h3>
                <div className="space-y-2">
                  {transfers.slice(0, 4).map(t => (
                    <div key={t.id} className="flex justify-between items-center text-sm py-1.5">
                      <span className="text-slate-700 capitalize">{t.type.replace(/_/g, ' ')}</span>
                      <span className="font-medium text-slate-900">${t.cost_estimate_min}–${t.cost_estimate_max}</span>
                    </div>
                  ))}
                </div>
                {port && (
                  <Link href={`/tools/transfers/${port.slug}`} className="inline-flex items-center gap-1 mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium">
                    Full transfer guide <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                )}
              </div>
            )}

            {/* Booking inquiry CTA */}
            <BookingInquiryButton sailing={sailing} variant="sidebar" />
          </div>
        </div>
      </div>
    </div>
  )
}

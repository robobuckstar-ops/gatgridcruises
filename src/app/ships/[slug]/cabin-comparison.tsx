'use client'

import { useMemo } from 'react'
import { getStaterooms, getShipBySlug, getSailings } from '@/lib/data'
import { Star, Check, X, Users } from 'lucide-react'
import { formatPrice } from '@/lib/utils'

interface CabinComparisonProps {
  shipSlug: string
}

export function CabinComparison({ shipSlug }: CabinComparisonProps) {
  const ship = getShipBySlug(shipSlug)
  const allStaterooms = getStaterooms()
  const sailings = getSailings()

  const staterooms = useMemo(() => {
    if (!ship) return {}

    const shipRooms = allStaterooms.filter(s => s.ship_id === ship.id)

    return {
      inside: shipRooms.filter(s => s.category === 'Inside'),
      oceanview: shipRooms.filter(s => s.category === 'Oceanview'),
      verandah: shipRooms.filter(s => s.category === 'Verandah'),
      concierge: shipRooms.filter(s => s.category === 'Concierge'),
    }
  }, [ship])

  const startingPrices = useMemo(() => {
    if (!ship) return {}

    const shipSailings = sailings.filter(s => s.ship_id === ship.id)

    if (shipSailings.length === 0) {
      return {
        inside: null,
        oceanview: null,
        verandah: null,
        concierge: null,
      }
    }

    // Find lowest price for each category
    const prices = {
      inside: Math.min(...shipSailings.map(s => s.current_inside_price || Infinity).filter(p => p !== Infinity)),
      oceanview: Math.min(...shipSailings.map(s => s.current_oceanview_price || Infinity).filter(p => p !== Infinity)),
      verandah: Math.min(...shipSailings.map(s => s.current_verandah_price || Infinity).filter(p => p !== Infinity)),
      concierge: Math.min(...shipSailings.map(s => s.current_concierge_price || Infinity).filter(p => p !== Infinity)),
    }

    return {
      inside: prices.inside === Infinity ? null : prices.inside,
      oceanview: prices.oceanview === Infinity ? null : prices.oceanview,
      verandah: prices.verandah === Infinity ? null : prices.verandah,
      concierge: prices.concierge === Infinity ? null : prices.concierge,
    }
  }, [ship])

  if (!ship) return null

  const categories = [
    {
      name: 'Inside',
      key: 'inside' as const,
      bgColor: 'bg-slate-50',
      headerColor: 'bg-slate-100',
      borderColor: 'border-slate-200',
      textColor: 'text-slate-900',
      starOn: 'text-slate-600 fill-current',
      starOff: 'text-slate-300',
      rooms: staterooms.inside,
    },
    {
      name: 'Oceanview',
      key: 'oceanview' as const,
      bgColor: 'bg-navy-50',
      headerColor: 'bg-navy-100',
      borderColor: 'border-navy-200',
      textColor: 'text-navy-900',
      starOn: 'text-navy-700 fill-current',
      starOff: 'text-navy-200',
      rooms: staterooms.oceanview,
    },
    {
      name: 'Verandah',
      key: 'verandah' as const,
      bgColor: 'bg-teal-50',
      headerColor: 'bg-teal-100',
      borderColor: 'border-teal-200',
      textColor: 'text-teal-900',
      starOn: 'text-teal-600 fill-current',
      starOff: 'text-teal-200',
      rooms: staterooms.verandah,
    },
    {
      name: 'Concierge',
      key: 'concierge' as const,
      bgColor: 'bg-amber-50',
      headerColor: 'bg-amber-100',
      borderColor: 'border-amber-200',
      textColor: 'text-amber-900',
      starOn: 'text-amber-600 fill-current',
      starOff: 'text-amber-200',
      rooms: staterooms.concierge,
    },
  ]

  // Desktop table view
  const TableView = () => (
    <div className="hidden lg:block overflow-x-auto border border-slate-300 rounded-xl">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-slate-200 border-b border-slate-300">
            <th className="px-6 py-4 text-left font-fraunces font-bold text-slate-900 w-48">Feature</th>
            {categories.map(cat => (
              <th
                key={cat.key}
                className={`px-6 py-4 text-center font-fraunces font-bold ${cat.headerColor} ${cat.textColor} border-l border-slate-300`}
              >
                {cat.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Starting Price */}
          <tr className="border-b border-slate-200 bg-white">
            <td className="px-6 py-4 font-bold text-slate-900">Starting Price</td>
            {categories.map(cat => (
              <td
                key={cat.key}
                className={`px-6 py-4 text-center border-l border-slate-200 ${cat.bgColor}`}
              >
                {startingPrices[cat.key] != null ? (
                  <div>
                    <p className={`font-fraunces text-xl font-bold ${cat.textColor}`}>
                      {formatPrice(startingPrices[cat.key] as number)}
                    </p>
                    <p className="text-xs text-slate-600 mt-1">Lowest available</p>
                  </div>
                ) : (
                  <p className="text-slate-500">Not available</p>
                )}
              </td>
            ))}
          </tr>

          {/* Square Footage */}
          <tr className="border-b border-slate-200 bg-slate-50">
            <td className="px-6 py-4 font-bold text-slate-900">Square Footage</td>
            {categories.map(cat => {
              const rooms = cat.rooms
              if (!rooms || rooms.length === 0) {
                return (
                  <td key={cat.key} className={`px-6 py-4 text-center border-l border-slate-200 ${cat.bgColor}`}>
                    <p className="text-slate-500">—</p>
                  </td>
                )
              }
              // This would require additional data; for now showing room count
              return (
                <td key={cat.key} className={`px-6 py-4 text-center border-l border-slate-200 ${cat.bgColor}`}>
                  <p className={`font-semibold ${cat.textColor}`}>{rooms.length}+ rooms</p>
                </td>
              )
            })}
          </tr>

          {/* Max Occupancy */}
          <tr className="border-b border-slate-200 bg-white">
            <td className="px-6 py-4 font-bold text-slate-900">Max Occupancy</td>
            {categories.map(cat => {
              const rooms = cat.rooms
              if (!rooms || rooms.length === 0) {
                return (
                  <td key={cat.key} className={`px-6 py-4 text-center border-l border-slate-200 ${cat.bgColor}`}>
                    <p className="text-slate-500">—</p>
                  </td>
                )
              }
              const maxOcc = Math.max(...rooms.map(r => r.max_occupancy))
              return (
                <td key={cat.key} className={`px-6 py-4 text-center border-l border-slate-200 ${cat.bgColor}`}>
                  <div className="flex items-center justify-center gap-2">
                    <Users className="w-4 h-4" />
                    <p className={`font-semibold ${cat.textColor}`}>{maxOcc}</p>
                  </div>
                </td>
              )
            })}
          </tr>

          {/* View Type */}
          <tr className="border-b border-slate-200 bg-slate-50">
            <td className="px-6 py-4 font-bold text-slate-900">View Type</td>
            {categories.map(cat => {
              const viewTypes = {
                inside: 'None (Interior)',
                oceanview: 'Porthole/Window',
                verandah: 'Private Balcony',
                concierge: 'Premium Balcony',
              }
              return (
                <td key={cat.key} className={`px-6 py-4 text-center border-l border-slate-200 ${cat.bgColor}`}>
                  <p className={`font-semibold ${cat.textColor}`}>{viewTypes[cat.key]}</p>
                </td>
              )
            })}
          </tr>

          {/* Balcony */}
          <tr className="border-b border-slate-200 bg-white">
            <td className="px-6 py-4 font-bold text-slate-900">Private Balcony</td>
            {categories.map(cat => (
              <td key={cat.key} className={`px-6 py-4 text-center border-l border-slate-200 ${cat.bgColor}`}>
                {['verandah', 'concierge'].includes(cat.key) ? (
                  <Check className={`w-5 h-5 mx-auto text-emerald-600`} />
                ) : (
                  <X className="w-5 h-5 mx-auto text-slate-400" />
                )}
              </td>
            ))}
          </tr>

          {/* Noise Rating */}
          <tr className="border-b border-slate-200 bg-slate-50">
            <td className="px-6 py-4 font-bold text-slate-900">
              <div className="flex items-center gap-2">
                Noise Rating
                <span className="text-xs font-normal text-slate-600">(1-5 stars)</span>
              </div>
            </td>
            {categories.map(cat => {
              const rooms = cat.rooms
              if (!rooms || rooms.length === 0) {
                return (
                  <td key={cat.key} className={`px-6 py-4 text-center border-l border-slate-200 ${cat.bgColor}`}>
                    <p className="text-slate-500">—</p>
                  </td>
                )
              }
              const avgNoise = Math.round(
                rooms.reduce((sum, r) => sum + r.noise_rating, 0) / rooms.length
              )
              return (
                <td key={cat.key} className={`px-6 py-4 text-center border-l border-slate-200 ${cat.bgColor}`}>
                  <div className="flex items-center justify-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < avgNoise ? cat.starOn : cat.starOff}`}
                      />
                    ))}
                  </div>
                </td>
              )
            })}
          </tr>

          {/* Connecting Rooms */}
          <tr className="border-b border-slate-200 bg-white">
            <td className="px-6 py-4 font-bold text-slate-900">Connecting Rooms</td>
            {categories.map(cat => {
              const rooms = cat.rooms
              const hasConnecting = rooms && rooms.some(r => r.connecting_room)
              return (
                <td key={cat.key} className={`px-6 py-4 text-center border-l border-slate-200 ${cat.bgColor}`}>
                  {hasConnecting ? (
                    <Check className="w-5 h-5 mx-auto text-emerald-600" />
                  ) : (
                    <X className="w-5 h-5 mx-auto text-slate-400" />
                  )}
                </td>
              )
            })}
          </tr>

          {/* Accessibility */}
          <tr className="border-b border-slate-200 bg-slate-50">
            <td className="px-6 py-4 font-bold text-slate-900">Accessibility</td>
            {categories.map(cat => {
              const rooms = cat.rooms
              const hasAccessible = rooms && rooms.some(r => r.accessible)
              return (
                <td key={cat.key} className={`px-6 py-4 text-center border-l border-slate-200 ${cat.bgColor}`}>
                  {hasAccessible ? (
                    <Check className="w-5 h-5 mx-auto text-emerald-600" />
                  ) : (
                    <X className="w-5 h-5 mx-auto text-slate-400" />
                  )}
                </td>
              )
            })}
          </tr>

          {/* Pros */}
          <tr className="border-b border-slate-200 bg-white">
            <td className="px-6 py-4 font-bold text-slate-900">Pros</td>
            {categories.map(cat => {
              const rooms = cat.rooms
              if (!rooms || rooms.length === 0) {
                return (
                  <td key={cat.key} className={`px-6 py-4 border-l border-slate-200 ${cat.bgColor}`}>
                    <p className="text-slate-500">—</p>
                  </td>
                )
              }
              // Collect unique pros
              const proSet = new Set<string>()
              rooms.forEach(r => {
                r.pros.forEach(p => proSet.add(p))
              })
              const topPros = Array.from(proSet).slice(0, 3)
              return (
                <td key={cat.key} className={`px-6 py-4 border-l border-slate-200 ${cat.bgColor}`}>
                  <ul className="text-sm space-y-1">
                    {topPros.map((pro, idx) => (
                      <li key={idx} className={`flex items-start gap-2 ${cat.textColor}`}>
                        <Check className="w-4 h-4 flex-shrink-0 mt-0.5" />
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </td>
              )
            })}
          </tr>

          {/* Cons */}
          <tr className="border-b border-slate-200 bg-slate-50">
            <td className="px-6 py-4 font-bold text-slate-900">Cons</td>
            {categories.map(cat => {
              const rooms = cat.rooms
              if (!rooms || rooms.length === 0) {
                return (
                  <td key={cat.key} className={`px-6 py-4 border-l border-slate-200 ${cat.bgColor}`}>
                    <p className="text-slate-500">—</p>
                  </td>
                )
              }
              // Collect unique cons
              const conSet = new Set<string>()
              rooms.forEach(r => {
                r.cons.forEach(c => conSet.add(c))
              })
              const topCons = Array.from(conSet).slice(0, 3)
              return (
                <td key={cat.key} className={`px-6 py-4 border-l border-slate-200 ${cat.bgColor}`}>
                  <ul className="text-sm space-y-1">
                    {topCons.map((con, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-slate-700">
                        <X className="w-4 h-4 flex-shrink-0 mt-0.5" />
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </td>
              )
            })}
          </tr>

          {/* Best For */}
          <tr className="border-b border-slate-200 bg-white">
            <td className="px-6 py-4 font-bold text-slate-900">Best For</td>
            {categories.map(cat => {
              const bestFor = {
                inside: 'Budget-conscious travelers',
                oceanview: 'Families, light sleepers',
                verandah: 'Couples, privacy seekers',
                concierge: 'Luxury travelers, VIPs',
              }
              return (
                <td key={cat.key} className={`px-6 py-4 text-center border-l border-slate-200 ${cat.bgColor}`}>
                  <p className={`font-semibold text-sm ${cat.textColor}`}>{bestFor[cat.key]}</p>
                </td>
              )
            })}
          </tr>
        </tbody>
      </table>
    </div>
  )

  // Mobile card view
  const CardView = () => (
    <div className="lg:hidden space-y-6">
      {categories.map(cat => {
        const rooms = cat.rooms
        if (!rooms || rooms.length === 0) return null

        const avgNoise = Math.round(
          rooms.reduce((sum, r) => sum + r.noise_rating, 0) / rooms.length
        )
        const hasConnecting = rooms.some(r => r.connecting_room)
        const hasAccessible = rooms.some(r => r.accessible)
        const proSet = new Set<string>()
        const conSet = new Set<string>()
        rooms.forEach(r => {
          r.pros.forEach(p => proSet.add(p))
          r.cons.forEach(c => conSet.add(c))
        })

        const bestFor = {
          inside: 'Budget-conscious travelers',
          oceanview: 'Families, light sleepers',
          verandah: 'Couples, privacy seekers',
          concierge: 'Luxury travelers, VIPs',
        }

        return (
          <div key={cat.key} className={`${cat.bgColor} border-2 ${cat.borderColor} rounded-xl p-6`}>
            <h3 className={`font-fraunces text-2xl font-bold ${cat.textColor} mb-4`}>{cat.name}</h3>

            {startingPrices[cat.key] != null && (
              <div className="mb-6 pb-6 border-b border-slate-200">
                <p className="text-sm text-slate-600 font-semibold mb-1">Starting Price</p>
                <p className={`font-fraunces text-3xl font-bold ${cat.textColor}`}>
                  {formatPrice(startingPrices[cat.key] as number)}
                </p>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <p className="text-xs uppercase font-bold text-slate-600 mb-2">Details</p>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Max Occupancy</span>
                    <span className="font-semibold text-slate-900">
                      {Math.max(...rooms.map(r => r.max_occupancy))} guests
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Rooms Available</span>
                    <span className="font-semibold text-slate-900">{rooms.length}+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Noise Rating</span>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${i < avgNoise ? cat.starOn : cat.starOff}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-xs uppercase font-bold text-slate-600 mb-2">Features</p>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center gap-2">
                    {['verandah', 'concierge'].includes(cat.key) ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <X className="w-4 h-4 text-slate-400" />
                    )}
                    <span>Private Balcony</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {hasConnecting ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <X className="w-4 h-4 text-slate-400" />
                    )}
                    <span>Connecting Rooms</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {hasAccessible ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <X className="w-4 h-4 text-slate-400" />
                    )}
                    <span>Accessibility Options</span>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-xs uppercase font-bold text-slate-600 mb-2">Pros</p>
                <ul className="text-sm space-y-1">
                  {Array.from(proSet)
                    .slice(0, 3)
                    .map((pro, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 flex-shrink-0 mt-0.5 text-emerald-600" />
                        <span>{pro}</span>
                      </li>
                    ))}
                </ul>
              </div>

              <div>
                <p className="text-xs uppercase font-bold text-slate-600 mb-2">Cons</p>
                <ul className="text-sm space-y-1">
                  {Array.from(conSet)
                    .slice(0, 3)
                    .map((con, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <X className="w-4 h-4 flex-shrink-0 mt-0.5 text-slate-400" />
                        <span>{con}</span>
                      </li>
                    ))}
                </ul>
              </div>

              <div className="pt-2 border-t border-slate-200">
                <p className="text-sm font-semibold text-slate-900">Best for:</p>
                <p className="text-sm text-slate-700">{bestFor[cat.key]}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )

  return (
    <section className="py-12">
      <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-8">Cabin Category Comparison</h2>
      <p className="text-lg text-slate-600 mb-8">
        Compare all cabin types on the {ship.name} to find the perfect fit for your cruise.
      </p>
      <TableView />
      <CardView />
    </section>
  )
}

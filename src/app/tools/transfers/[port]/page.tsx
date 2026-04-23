import { Metadata } from 'next'
import { getPortBySlug, getTransfersForPort } from '@/lib/data'
import { TransferRecommender } from './transfer-recommender'
import { AlertCircle, Check, X, MapPin } from 'lucide-react'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{
    port: string
  }>
}

export async function generateMetadata(
  { params }: { params: Promise<{ port: string }> },
): Promise<Metadata> {
  const { port: portSlug } = await params
  const port = getPortBySlug(portSlug)
  if (!port) return { title: 'Port not found' }

  return {
    title: `Transfer Options to ${port.name} — Disney Cruise Port Guide`,
    description: `Compare Disney ground transfer, Uber, rental car, and other transportation options to ${port.name}. Find the cheapest and fastest way to get to your cruise.`,
  }
}

export default async function PortTransfersPage({ params }: PageProps) {
export default async function PortTransfersPage({ params }: { params: Promise<{ port: string }> }) {
  const { port: portSlug } = await params
  const port = getPortBySlug(portSlug)
  if (!port) notFound()

  const transfers = getTransfersForPort(port.id)
  if (transfers.length === 0) notFound()

  // Group transfers by type for better organization
  const transfersByType = transfers.reduce((acc, t) => {
    if (!acc[t.type]) acc[t.type] = []
    acc[t.type].push(t)
    return acc
  }, {} as Record<string, typeof transfers>)

  const typeLabels: Record<string, string> = {
    disney_ground: 'Disney Ground Transfer',
    uber: 'Uber/Lyft',
    rental_car: 'Rental Car',
    personal_car: 'Personal Car',
    hotel_shuttle: 'Hotel Shuttle',
    taxi: 'Taxi',
  }

  const typeDescriptions: Record<string, string> = {
    disney_ground: 'Direct coach service arranged by Disney',
    uber: 'App-based rideshare service',
    rental_car: 'Rent a vehicle for flexibility',
    personal_car: 'Drive your own vehicle',
    hotel_shuttle: 'Included with select hotel stays',
    taxi: 'Traditional taxi service',
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 text-slate-900 py-12 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl sm:text-4xl font-bold mb-2 text-slate-900">{port.name} Transfer Options</h1>
          <p className="text-slate-600 text-lg">How to get from the airport to your Disney cruise — {transfers.length} options compared</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Recommendation Engine */}
        <TransferRecommender transfers={transfers} portName={port.name} />

        {/* Nearest Airports */}
        <div className="bg-slate-50 rounded-xl p-8 mb-12 border border-slate-200">
          <h2 className="font-display text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <MapPin className="h-6 w-6 text-blue-600" />
            Nearest Airports
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {port.nearest_airports.map(airport => (
              <div key={airport.code} className="bg-white rounded-lg p-4 border border-slate-300">
                <p className="font-bold text-slate-900 text-lg">{airport.code}</p>
                <p className="text-slate-600 text-sm mb-2">{airport.name}</p>
                <p className="text-blue-600 font-medium">{airport.distance_miles} miles away</p>
              </div>
            ))}
          </div>
        </div>

        {/* Full Comparison Table */}
        <div className="mb-12">
          <h2 className="font-display text-2xl font-bold text-slate-900 mb-6">Full Comparison Table</h2>
          <div className="overflow-x-auto border border-slate-300 rounded-xl">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-900 border-b border-slate-300">
                  <th className="px-4 py-3 text-left font-bold">Type</th>
                  <th className="px-4 py-3 text-right font-bold">Cost Range</th>
                  <th className="px-4 py-3 text-right font-bold">Travel Time</th>
                  <th className="px-4 py-3 text-left font-bold">Best For</th>
                  <th className="px-4 py-3 text-left font-bold">Our Take</th>
                </tr>
              </thead>
              <tbody>
                {transfers.map((transfer, idx) => (
                  <tr key={transfer.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                    <td className="px-4 py-4 font-bold text-slate-900">{typeLabels[transfer.type] || transfer.type}</td>
                    <td className="px-4 py-4 text-right">
                      <span className="text-blue-600 font-bold">
                        ${transfer.cost_estimate_min}
                        {transfer.cost_estimate_max !== transfer.cost_estimate_min && `–$${transfer.cost_estimate_max}`}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right text-slate-700">{transfer.travel_time_minutes} min</td>
                    <td className="px-4 py-4 text-slate-600 text-sm">{transfer.best_for}</td>
                    <td className="px-4 py-4 text-slate-600 text-sm">{transfer.editorial_take}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detailed Cards */}
        <div className="mb-12">
          <h2 className="font-display text-2xl font-bold text-slate-900 mb-6">Detailed Breakdown</h2>
          <div className="space-y-6">
            {transfers.map(transfer => (
              <div key={transfer.id} className="bg-white border border-slate-300 rounded-xl overflow-hidden">
                <div className="bg-slate-50 px-6 py-4 border-b border-slate-300">
                  <h3 className="font-display text-xl font-bold text-slate-900">{typeLabels[transfer.type] || transfer.type}</h3>
                  <p className="text-sm text-slate-600 mt-1">{typeDescriptions[transfer.type]}</p>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Cost Range</p>
                      <p className="text-2xl font-bold text-blue-600">
                        ${transfer.cost_estimate_min}–${transfer.cost_estimate_max}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Travel Time</p>
                      <p className="text-2xl font-bold text-slate-900">{transfer.travel_time_minutes} min</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Best For</p>
                      <p className="font-medium text-slate-700">{transfer.best_for}</p>
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-lg p-4 mb-6">
                    <p className="text-sm text-slate-700 leading-relaxed italic">{transfer.editorial_take}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                        <Check className="h-5 w-5 text-green-600" />
                        Pros
                      </h4>
                      <ul className="space-y-2">
                        {transfer.pros.map((pro, idx) => (
                          <li key={idx} className="text-sm text-slate-700 flex gap-2">
                            <span className="text-green-600 mt-1">+</span>
                            <span>{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                        <X className="h-5 w-5 text-red-600" />
                        Cons
                      </h4>
                      <ul className="space-y-2">
                        {transfer.cons.map((con, idx) => (
                          <li key={idx} className="text-sm text-slate-700 flex gap-2">
                            <span className="text-red-600 mt-1">−</span>
                            <span>{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimers */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex gap-3">
            <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-900">
              <p className="font-bold mb-2">Important Disclaimers</p>
              <ul className="space-y-1 list-disc list-inside">
                <li>All costs are estimates based on typical pricing as of 2026</li>
                <li>Surge pricing may apply to Uber/Lyft on peak cruise embarkation days</li>
                <li>Hotel shuttle availability varies — always confirm in advance</li>
                <li>Parking fees vary by lot and season</li>
                <li>Book ground transfers directly with Disney to guarantee availability</li>
                <li>Rental car insurance, fuel, and tolls not included in cost estimates</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState, useMemo } from 'react'
import { Leaf, Zap, Wind, TreePine, Award } from 'lucide-react'
import { getShips } from '@/lib/data'
import { calculateCarbonFootprint, getRatingColor } from '@/lib/carbon-calculator'
import Link from 'next/link'

export default function CarbonCalculatorPage() {
  const ships = getShips()

  // Form state
  const [selectedShipId, setSelectedShipId] = useState(ships[0].id)
  const [cruiseLengthNights, setCruiseLengthNights] = useState(7)
  const [portDaysCount, setPortDaysCount] = useState(3)
  const [guestCount, setGuestCount] = useState(1)

  // Get selected ship
  const selectedShip = ships.find((s) => s.id === selectedShipId) || ships[0]

  // Calculate sea days
  const seaDays = cruiseLengthNights - portDaysCount
  const validSeaDays = Math.max(1, seaDays)

  // Calculate carbon footprint
  const estimate = useMemo(
    () =>
      calculateCarbonFootprint(
        selectedShip.tonnage,
        selectedShip.capacity,
        selectedShip.year_launched,
        validSeaDays,
        portDaysCount,
      ),
    [selectedShip, validSeaDays, portDaysCount],
  )

  const colors = getRatingColor(estimate.rating)
  const ratingLabel =
    estimate.rating === 'low'
      ? 'Low Impact'
      : estimate.rating === 'moderate'
        ? 'Moderate Impact'
        : 'High Impact'

  // Calculate gauge percentage (0-100)
  const gaugeFill = estimate.rating === 'low' ? 33 : estimate.rating === 'moderate' ? 66 : 100

  // Comparison cards
  const comparisonCards = [
    {
      icon: Zap,
      label: 'Equivalent Driving',
      value: estimate.equivalentDrivingMiles.toLocaleString(),
      unit: 'miles',
      description: 'How far you could drive',
    },
    {
      icon: Wind,
      label: 'Equivalent Flying',
      value: estimate.equivalentFlightMiles.toLocaleString(),
      unit: 'miles',
      description: 'Roundtrip flight distance',
    },
    {
      icon: TreePine,
      label: 'Trees to Offset',
      value: estimate.treesNeededToOffset.toLocaleString(),
      unit: 'trees',
      description: 'For 1 year of growth',
    },
    {
      icon: Award,
      label: 'Offset Cost',
      value: `$${estimate.offsetCostUSD}`,
      unit: 'USD',
      description: 'Verified carbon programs',
    },
  ]

  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-blue-50 text-slate-900 py-16 md:py-20">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 right-10 w-72 h-72 bg-green-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
        </div>

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-green-600">
              <Leaf className="w-6 h-6 text-white" />
            </div>
          </div>

          <h1 className="font-fraunces text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Cruise Carbon Footprint Calculator
          </h1>

          <p className="font-inter text-lg md:text-xl text-slate-600 mb-0 leading-relaxed max-w-3xl">
            Understand your environmental impact and discover ways to cruise more sustainably. See how your ship and
            itinerary affect your carbon footprint.
          </p>
        </div>
      </section>

      {/* Main Calculator Section */}
      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Input Form */}
            <div>
              <h2 className="font-fraunces text-2xl font-bold text-slate-900 mb-8">Calculate Your Impact</h2>

              {/* Ship Selector */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-slate-700 mb-3">Select Your Ship</label>
                <select
                  value={selectedShipId}
                  onChange={(e) => setSelectedShipId(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 bg-white text-slate-900 font-medium hover:border-blue-600 focus:outline-none focus:border-blue-600 transition-colors"
                >
                  {ships.map((ship) => (
                    <option key={ship.id} value={ship.id}>
                      {ship.name} ({ship.year_launched})
                    </option>
                  ))}
                </select>
                <p className="text-xs text-slate-500 mt-2">
                  Newer ships use more efficient propulsion technology
                </p>
              </div>

              {/* Cruise Length Slider */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Cruise Length: <span className="text-blue-600">{cruiseLengthNights} nights</span>
                </label>
                <input
                  type="range"
                  min="3"
                  max="14"
                  value={cruiseLengthNights}
                  onChange={(e) => {
                    const newLength = parseInt(e.target.value)
                    setCruiseLengthNights(newLength)
                    // Auto-adjust port days if needed
                    if (portDaysCount > newLength - 1) {
                      setPortDaysCount(Math.floor(newLength / 2))
                    }
                  }}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-2">
                  <span>3 nights</span>
                  <span>14 nights</span>
                </div>
              </div>

              {/* Port Days Slider */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Port Days: <span className="text-blue-600">{portDaysCount} days</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max={Math.max(1, cruiseLengthNights - 1)}
                  value={portDaysCount}
                  onChange={(e) => setPortDaysCount(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-2">
                  <span>0 (all at sea)</span>
                  <span>{Math.max(1, cruiseLengthNights - 1)} (max)</span>
                </div>
                <p className="text-xs text-slate-600 mt-2">
                  Port days have ~40% lower emissions than open ocean sailing
                </p>
              </div>

              {/* Guest Count Slider */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Number of Guests: <span className="text-blue-600">{guestCount}</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="4"
                  value={guestCount}
                  onChange={(e) => setGuestCount(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-2">
                  <span>Solo</span>
                  <span>4 guests</span>
                </div>
                <p className="text-xs text-slate-600 mt-2">
                  More guests split shared ship emissions (per person decreases)
                </p>
              </div>

              {/* Ship Stats */}
              <div className="mt-10 p-4 rounded-lg bg-slate-50 border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-3">Ship Specifications</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-slate-500">Launched</div>
                    <div className="font-semibold text-slate-900">{selectedShip.year_launched}</div>
                  </div>
                  <div>
                    <div className="text-slate-500">Capacity</div>
                    <div className="font-semibold text-slate-900">{selectedShip.capacity.toLocaleString()} pax</div>
                  </div>
                  <div>
                    <div className="text-slate-500">Tonnage</div>
                    <div className="font-semibold text-slate-900">{selectedShip.tonnage.toLocaleString()} tons</div>
                  </div>
                  <div>
                    <div className="text-slate-500">Sea Days</div>
                    <div className="font-semibold text-slate-900">{validSeaDays}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Display */}
            <div>
              <h2 className="font-fraunces text-2xl font-bold text-slate-900 mb-8">Your Carbon Impact</h2>

              {/* Big Number with Gauge */}
              <div className={`rounded-xl border-2 p-8 mb-8 ${colors.bgColor} ${colors.borderColor}`}>
                <div className="text-center">
                  <div className="mb-6">
                    <div className="text-5xl md:text-6xl font-bold text-slate-900 font-fraunces">
                      {estimate.totalKgCO2.toLocaleString()}
                    </div>
                    <div className="text-lg text-slate-600 mt-2">kg CO2 per passenger</div>
                  </div>

                  {/* Circular Gauge */}
                  <div className="flex justify-center mb-6">
                    <div className="relative w-32 h-32">
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                        {/* Background circle */}
                        <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" opacity="0.1" />

                        {/* Progress circle */}
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke={
                            estimate.rating === 'low'
                              ? '#22c55e'
                              : estimate.rating === 'moderate'
                                ? '#eab308'
                                : '#ef4444'
                          }
                          strokeWidth="8"
                          strokeDasharray={`${(gaugeFill / 100) * 282.7} 282.7`}
                          strokeDashoffset="0"
                          strokeLinecap="round"
                          transform="rotate(-90 50 50)"
                          className="transition-all duration-300"
                        />

                        {/* Center text */}
                        <text x="50" y="50" textAnchor="middle" dy="0.3em" className="text-sm font-bold">
                          {gaugeFill}%
                        </text>
                      </svg>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${colors.bgColor} ${colors.borderColor} border`}>
                    <Leaf className={`w-4 h-4 ${colors.textColor}`} />
                    <span className={`font-semibold ${colors.textColor}`}>{ratingLabel}</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-200/50 text-sm text-slate-600">
                  <div className="font-semibold text-slate-900 mb-2">Per Day Breakdown:</div>
                  <div>
                    {estimate.perDayKgCO2.toLocaleString()} kg CO2 / night averaged across your cruise
                  </div>
                </div>
              </div>

              {/* Comparison Infographic */}
              <div>
                <h3 className="font-semibold text-slate-900 mb-4">Compare Your Impact</h3>
                <div className="grid grid-cols-2 gap-4">
                  {comparisonCards.map((card, idx) => {
                    const Icon = card.icon
                    return (
                      <div
                        key={idx}
                        className="p-4 rounded-lg border border-slate-200 hover:border-blue-600 hover:shadow-md transition-all bg-white"
                      >
                        <div className="flex items-start gap-3 mb-3">
                          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-100">
                            <Icon className="w-4 h-4 text-blue-600" />
                          </div>
                        </div>
                        <div className="text-xs text-slate-500 mb-1">{card.label}</div>
                        <div className="text-lg font-bold text-slate-900">{card.value}</div>
                        <div className="text-xs text-slate-500 mt-1">{card.unit}</div>
                        <div className="text-xs text-slate-400 mt-2">{card.description}</div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="bg-slate-50 py-12 md:py-16 border-t border-slate-200">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-fraunces text-2xl md:text-3xl font-bold text-slate-900 mb-8 text-center">
            How to Reduce Your Cruise Carbon Footprint
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {estimate.tips.map((tip, idx) => (
              <div key={idx} className="p-5 rounded-lg bg-white border border-slate-200 hover:shadow-md transition-all">
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 flex-shrink-0 mt-0.5">
                    <Leaf className="w-4 h-4 text-green-600" />
                  </div>
                  <p className="text-slate-700 leading-relaxed">{tip}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Offset CTA Section */}
      <section className="bg-gradient-to-br from-green-50 to-blue-50 py-12 md:py-16 border-t border-slate-200">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="font-fraunces text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Offset Your Cruise Carbon
            </h2>
            <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
              Make your cruise more sustainable by offsetting your emissions through verified carbon reduction programs.
              Most offset programs cost $15-30 per metric ton of CO2.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="p-6 rounded-lg bg-white border-2 border-slate-200 hover:border-blue-600 transition-colors">
              <h3 className="font-semibold text-slate-900 mb-3">Recommended Programs</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-0.5">→</span>
                  <span>
                    <a href="https://carbonfund.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      Carbonfund.org
                    </a>
                    — Verified gold standard projects
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-0.5">→</span>
                  <span>
                    <a href="https://www.3degreesinc.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      3Degrees
                    </a>
                    — Corporate carbon solutions
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-0.5">→</span>
                  <span>
                    <a href="https://verra.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      Verra Registry
                    </a>
                    — High-quality offset projects
                  </span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-lg bg-white border-2 border-slate-200 hover:border-blue-600 transition-colors">
              <h3 className="font-semibold text-slate-900 mb-3">Your Offset Summary</h3>
              <div className="space-y-3">
                <div>
                  <div className="text-xs text-slate-500 mb-1">Total CO2 Emissions</div>
                  <div className="text-2xl font-bold text-slate-900">{estimate.totalKgCO2.toLocaleString()} kg</div>
                  <div className="text-sm text-slate-600">
                    ({(estimate.totalKgCO2 / 1000).toFixed(2)} metric tons)
                  </div>
                </div>
                <div className="pt-3 border-t border-slate-200">
                  <div className="text-xs text-slate-500 mb-1">Estimated Offset Cost</div>
                  <div className="text-2xl font-bold text-green-600">${estimate.offsetCostUSD}</div>
                  <div className="text-sm text-slate-600">at $15/metric ton</div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <a
              href="https://carbonfund.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors"
            >
              Offset My Emissions
            </a>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-white py-12 md:py-16 border-t border-slate-200">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-fraunces text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            Ready to Find Your Cruise?
          </h2>
          <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
            Use our other tools to find the best prices, compare sailings, and plan your perfect Disney cruise vacation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/tools/cost-calculator"
              className="inline-flex items-center justify-center px-8 py-3 rounded-lg border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-600 hover:text-white transition-colors"
            >
              Cost Calculator
            </Link>
            <Link
              href="/deals"
              className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-[#D4AF37] text-slate-900 font-semibold hover:bg-yellow-300 transition-colors"
            >
              Browse Deals
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

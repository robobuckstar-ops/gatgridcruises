'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Calculator, Users, Ship, Calendar, ArrowLeft, Info } from 'lucide-react'

type StateroomType = 'inside' | 'oceanview' | 'verandah' | 'concierge'
type CruiseLength = 3 | 4 | 5 | 7 | 10 | 14
type ShipName = 'Disney Magic' | 'Disney Wonder' | 'Disney Dream' | 'Disney Fantasy' | 'Disney Wish' | 'Disney Treasure'

interface PriceMatrix {
  [key: string]: {
    inside: number
    oceanview: number
    verandah: number
    concierge: number
  }
}

const BASE_PRICE_PER_PERSON_PER_NIGHT: PriceMatrix = {
  'Disney Magic': { inside: 165, oceanview: 210, verandah: 280, concierge: 490 },
  'Disney Wonder': { inside: 170, oceanview: 215, verandah: 285, concierge: 500 },
  'Disney Dream': { inside: 195, oceanview: 245, verandah: 330, concierge: 580 },
  'Disney Fantasy': { inside: 200, oceanview: 250, verandah: 340, concierge: 600 },
  'Disney Wish': { inside: 230, oceanview: 290, verandah: 390, concierge: 680 },
  'Disney Treasure': { inside: 240, oceanview: 300, verandah: 400, concierge: 710 },
}

const LENGTH_MULTIPLIER: Record<CruiseLength, number> = {
  3: 1.15,
  4: 1.0,
  5: 0.97,
  7: 0.92,
  10: 0.88,
  14: 0.85,
}

const STATEROOM_LABELS: Record<StateroomType, string> = {
  inside: 'Inside Stateroom',
  oceanview: 'Oceanview Stateroom',
  verandah: 'Verandah (Balcony)',
  concierge: 'Concierge Class',
}

const STATEROOM_DESCRIPTIONS: Record<StateroomType, string> = {
  inside: 'No windows. Most affordable option. ~169–204 sq ft.',
  oceanview: 'Porthole or picture window. ~170–214 sq ft.',
  verandah: 'Private balcony. Best for sea days. ~204–268 sq ft.',
  concierge: 'Dedicated concierge service, priority boarding, exclusive lounge. ~246–622 sq ft.',
}

function formatCurrency(n: number) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
}

function Tooltip({ text }: { text: string }) {
  return (
    <span className="group relative inline-block ml-1">
      <Info className="h-3.5 w-3.5 text-slate-400 inline cursor-help" />
      <span className="hidden group-hover:block absolute bottom-5 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs rounded px-3 py-1.5 w-56 z-10 shadow-lg">
        {text}
      </span>
    </span>
  )
}

export default function CruiseCostCalculatorPage() {
  const [guests, setGuests] = useState(2)
  const [stateroomType, setStateroomType] = useState<StateroomType>('verandah')
  const [cruiseLength, setCruiseLength] = useState<CruiseLength>(7)
  const [ship, setShip] = useState<ShipName>('Disney Wish')
  const [includeGratuities, setIncludeGratuities] = useState(true)
  const [includeExcursions, setIncludeExcursions] = useState(true)
  const [includeDrinks, setIncludeDrinks] = useState(false)
  const [includeSpecialtyDining, setIncludeSpecialtyDining] = useState(false)

  const estimate = useMemo(() => {
    const basePpn = BASE_PRICE_PER_PERSON_PER_NIGHT[ship][stateroomType]
    const multiplier = LENGTH_MULTIPLIER[cruiseLength]
    const cruiseFare = basePpn * multiplier * cruiseLength * guests

    const gratuities = includeGratuities ? 15.5 * guests * cruiseLength : 0
    const excursions = includeExcursions ? 120 * guests : 0
    const drinks = includeDrinks ? 45 * guests * cruiseLength : 0
    const specialtyDining = includeSpecialtyDining ? 60 * guests : 0

    const total = cruiseFare + gratuities + excursions + drinks + specialtyDining
    const perPerson = total / guests
    const perPersonPerNight = perPerson / cruiseLength

    return {
      cruiseFare,
      gratuities,
      excursions,
      drinks,
      specialtyDining,
      total,
      perPerson,
      perPersonPerNight,
    }
  }, [guests, stateroomType, cruiseLength, ship, includeGratuities, includeExcursions, includeDrinks, includeSpecialtyDining])

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-700 to-indigo-800 py-12 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/tools"
            className="inline-flex items-center gap-1 text-blue-300 hover:text-white text-sm mb-6 transition"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Tools
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <Calculator className="h-7 w-7 text-yellow-400" />
            <span className="text-sm font-semibold text-yellow-400 uppercase tracking-wider">
              Planning Tool
            </span>
          </div>
          <h1 className="font-fraunces text-4xl md:text-5xl font-bold mb-3">
            Disney Cruise Cost Calculator
          </h1>
          <p className="text-blue-200 text-lg max-w-2xl">
            Get a realistic estimate for your Disney cruise — including gratuities, excursions, and
            onboard extras that add up fast.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-5 gap-8">

          {/* Controls */}
          <div className="lg:col-span-3 space-y-6">

            {/* Guests */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <div className="flex items-center gap-2 mb-4">
                <Users className="h-5 w-5 text-blue-600" />
                <h2 className="font-fraunces font-bold text-slate-900 text-lg">Guests</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <button
                    key={n}
                    onClick={() => setGuests(n)}
                    className={`w-12 h-12 rounded-lg font-bold text-sm transition border-2 ${
                      guests === n
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300'
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Disney prices children at about 80–90% of adult rate (averaged in these estimates)
              </p>
            </div>

            {/* Ship */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <div className="flex items-center gap-2 mb-4">
                <Ship className="h-5 w-5 text-blue-600" />
                <h2 className="font-fraunces font-bold text-slate-900 text-lg">Ship</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {(Object.keys(BASE_PRICE_PER_PERSON_PER_NIGHT) as ShipName[]).map((s) => (
                  <button
                    key={s}
                    onClick={() => setShip(s)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition border-2 ${
                      ship === s
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300'
                    }`}
                  >
                    {s.replace('Disney ', '')}
                  </button>
                ))}
              </div>
            </div>

            {/* Cruise Length */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="h-5 w-5 text-blue-600" />
                <h2 className="font-fraunces font-bold text-slate-900 text-lg">Cruise Length</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {([3, 4, 5, 7, 10, 14] as CruiseLength[]).map((n) => (
                  <button
                    key={n}
                    onClick={() => setCruiseLength(n)}
                    className={`px-4 py-2 rounded-lg font-bold text-sm transition border-2 ${
                      cruiseLength === n
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300'
                    }`}
                  >
                    {n} nights
                  </button>
                ))}
              </div>
            </div>

            {/* Stateroom */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <h2 className="font-fraunces font-bold text-slate-900 text-lg mb-4">Stateroom Type</h2>
              <div className="space-y-3">
                {(Object.keys(STATEROOM_LABELS) as StateroomType[]).map((type) => (
                  <label
                    key={type}
                    className={`flex items-start gap-3 p-3 rounded-lg border-2 cursor-pointer transition ${
                      stateroomType === type
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-slate-200 hover:border-blue-200'
                    }`}
                  >
                    <input
                      type="radio"
                      name="stateroom"
                      checked={stateroomType === type}
                      onChange={() => setStateroomType(type)}
                      className="mt-0.5 accent-blue-600"
                    />
                    <div>
                      <p className="font-semibold text-slate-900 text-sm">{STATEROOM_LABELS[type]}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{STATEROOM_DESCRIPTIONS[type]}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Extras */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <h2 className="font-fraunces font-bold text-slate-900 text-lg mb-4">Include Extras?</h2>
              <div className="space-y-3">
                {[
                  {
                    id: 'gratuities',
                    label: 'Gratuities',
                    detail: '~$15.50/person/night (auto-charged)',
                    checked: includeGratuities,
                    onChange: setIncludeGratuities,
                  },
                  {
                    id: 'excursions',
                    label: 'Port Excursions',
                    detail: '~$120/person average',
                    checked: includeExcursions,
                    onChange: setIncludeExcursions,
                  },
                  {
                    id: 'drinks',
                    label: 'Alcoholic Beverages Onboard',
                    detail: '~$45/person/day',
                    checked: includeDrinks,
                    onChange: setIncludeDrinks,
                  },
                  {
                    id: 'specialtyDining',
                    label: 'Specialty Dining (Palo/Enchanté)',
                    detail: '~$60/person per meal',
                    checked: includeSpecialtyDining,
                    onChange: setIncludeSpecialtyDining,
                  },
                ].map(({ id, label, detail, checked, onChange }) => (
                  <label
                    key={id}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={(e) => onChange(e.target.checked)}
                      className="w-4 h-4 accent-blue-600 rounded"
                    />
                    <div>
                      <p className="text-sm font-medium text-slate-800">{label}</p>
                      <p className="text-xs text-slate-500">{detail}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Results panel */}
          <div className="lg:col-span-2">
            <div className="sticky top-6 space-y-4">

              {/* Total estimate */}
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl p-6 text-white shadow-lg">
                <p className="text-blue-200 text-sm font-medium mb-1">Estimated Total</p>
                <p className="font-fraunces text-5xl font-bold">
                  {formatCurrency(estimate.total)}
                </p>
                <div className="mt-4 pt-4 border-t border-white/20 space-y-1 text-sm">
                  <div className="flex justify-between text-blue-100">
                    <span>Per person</span>
                    <span className="font-semibold text-white">{formatCurrency(estimate.perPerson)}</span>
                  </div>
                  <div className="flex justify-between text-blue-100">
                    <span>Per person, per night</span>
                    <span className="font-semibold text-white">{formatCurrency(estimate.perPersonPerNight)}</span>
                  </div>
                </div>
              </div>

              {/* Breakdown */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                <h3 className="font-fraunces font-bold text-slate-900 mb-4">Cost Breakdown</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-700">
                      Cruise fare
                      <Tooltip text="Base fare estimate — varies significantly by season, booking window, and promotions." />
                    </span>
                    <span className="font-semibold text-slate-900">{formatCurrency(estimate.cruiseFare)}</span>
                  </div>
                  {estimate.gratuities > 0 && (
                    <div className="flex justify-between items-center text-slate-600">
                      <span>Gratuities</span>
                      <span>{formatCurrency(estimate.gratuities)}</span>
                    </div>
                  )}
                  {estimate.excursions > 0 && (
                    <div className="flex justify-between items-center text-slate-600">
                      <span>Port excursions</span>
                      <span>{formatCurrency(estimate.excursions)}</span>
                    </div>
                  )}
                  {estimate.drinks > 0 && (
                    <div className="flex justify-between items-center text-slate-600">
                      <span>Beverages</span>
                      <span>{formatCurrency(estimate.drinks)}</span>
                    </div>
                  )}
                  {estimate.specialtyDining > 0 && (
                    <div className="flex justify-between items-center text-slate-600">
                      <span>Specialty dining</span>
                      <span>{formatCurrency(estimate.specialtyDining)}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center pt-3 border-t border-slate-200 font-bold text-slate-900">
                    <span>Total estimate</span>
                    <span>{formatCurrency(estimate.total)}</span>
                  </div>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                <p className="text-xs text-slate-600">
                  <strong className="text-slate-800">Estimates only.</strong> Actual Disney Cruise
                  Line pricing varies by sailing date, stateroom category, promotions, and booking
                  window. Check current pricing on Disney Cruise Line's website.
                </p>
              </div>

              {/* CTA */}
              <div className="space-y-3">
                <a
                  href="https://www.disneycruise.disney.go.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center px-5 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition text-sm"
                >
                  Check Price on Disney Cruise Line →
                </a>
                <Link
                  href="/travel-hacks/best-cruise-credit-cards"
                  className="block text-center px-5 py-3 border border-slate-300 text-slate-700 font-semibold rounded-lg hover:border-blue-400 transition text-sm"
                >
                  Reduce cost with a credit card bonus
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Info section */}
        <section className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <h3 className="font-fraunces font-bold text-slate-900 mb-2">What's Included</h3>
            <ul className="text-sm text-slate-600 space-y-1">
              {['All main dining (rotational)', 'Room service (select items)', 'Kids clubs (ages 3–17)', 'Pool & deck activities', 'Broadway-style shows', 'Castaway Cay beach access'].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-0.5">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <h3 className="font-fraunces font-bold text-slate-900 mb-2">What Costs Extra</h3>
            <ul className="text-sm text-slate-600 space-y-1">
              {['Alcoholic beverages', 'Specialty dining (Palo, Enchanté)', 'Spa treatments', 'Shore excursions', 'Onboard shopping', 'Auto-gratuities (~$15.50/person/night)'].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-blue-400 mt-0.5">+</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <h3 className="font-fraunces font-bold text-slate-900 mb-2">Money-Saving Tips</h3>
            <ul className="text-sm text-slate-600 space-y-1">
              {['Book 12+ months out for best pricing', 'Watch for early-bird promotions', 'Use a travel credit card for the fare', 'Book independent excursions for savings', 'Pack reef-safe sunscreen from home', 'Use onboard credits from card bonuses'].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-yellow-500 mt-0.5">★</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}

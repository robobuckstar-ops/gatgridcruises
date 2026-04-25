'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'

const SHIPS = [
  { id: 'magic', name: 'Disney Magic', multiplier: 1.0 },
  { id: 'wonder', name: 'Disney Wonder', multiplier: 1.0 },
  { id: 'dream', name: 'Disney Dream', multiplier: 1.05 },
  { id: 'fantasy', name: 'Disney Fantasy', multiplier: 1.05 },
  { id: 'wish', name: 'Disney Wish', multiplier: 1.15 },
  { id: 'treasure', name: 'Disney Treasure', multiplier: 1.2 },
]

const STATEROOMS = [
  {
    id: 'inside',
    name: 'Inside',
    basePricePerNight: 220,
    sqft: '169–214 sq ft',
    description: 'No window — darkest and most budget-friendly option',
  },
  {
    id: 'oceanview',
    name: 'Oceanview',
    basePricePerNight: 310,
    sqft: '214–268 sq ft',
    description: 'Porthole or window with ocean views',
  },
  {
    id: 'verandah',
    name: 'Verandah',
    basePricePerNight: 430,
    sqft: '268–304 sq ft',
    description: 'Private balcony — the most popular choice for families',
  },
  {
    id: 'concierge',
    name: 'Concierge',
    basePricePerNight: 850,
    sqft: '304–1,781 sq ft',
    description: 'Dedicated host, priority boarding, exclusive lounges',
  },
]

const LENGTHS = [
  { nights: 3, label: '3 nights', multiplier: 1.2 },
  { nights: 4, label: '4 nights', multiplier: 1.1 },
  { nights: 5, label: '5 nights', multiplier: 1.05 },
  { nights: 7, label: '7 nights', multiplier: 1.0 },
  { nights: 10, label: '10+ nights', multiplier: 0.9 },
]

const SAVINGS_TIPS = [
  {
    icon: '📅',
    title: 'Book Early (or Very Last Minute)',
    body: 'Disney opens bookings 18 months out. The best availability — and sometimes best prices — is right when they open. Last-minute deals also appear occasionally for unsold inventory.',
  },
  {
    icon: '💳',
    title: 'Use a Rewards Credit Card',
    body: 'A card with 3x on travel can earn you 15,000+ points on a $5,000 cruise — worth $150–225 in travel. Some cards include free trip insurance too.',
    link: { label: 'Best cards for Disney cruises →', href: '/travel-hacks/best-cruise-credit-cards' },
  },
  {
    icon: '🏠',
    title: 'Consider an Inside Cabin',
    body: 'If you\'re rarely in your stateroom, an inside cabin saves $1,000–3,000 vs a verandah. You still get the same ship, shows, dining, and Castaway Cay.',
  },
  {
    icon: '📦',
    title: 'Book Excursions Independently',
    body: 'Disney excursion prices are 30–50% higher than booking directly through local operators. Save hundreds per port by researching alternatives.',
  },
  {
    icon: '🍕',
    title: 'Skip the Drink Package',
    body: 'At $69/person/day, a drink package rarely pays off unless you\'re very consistent. Calculate your actual daily bar spend first.',
  },
  {
    icon: '🚢',
    title: 'Sail from Closer to Home',
    body: 'Flights are often the biggest hidden cost. A New York sailing might save a family of 4 $1,200+ in flights vs. a Port Canaveral departure.',
  },
]

export function CruiseCostCalculator() {
  const [guests, setGuests] = useState(2)
  const [stateroomId, setStateroomId] = useState('verandah')
  const [nightsId, setNightsId] = useState(7)
  const [shipId, setShipId] = useState('wish')

  const results = useMemo(() => {
    const stateroom = STATEROOMS.find((s) => s.id === stateroomId)!
    const lengthConfig = LENGTHS.find((l) => l.nights === nightsId)!
    const ship = SHIPS.find((s) => s.id === shipId)!

    const basePpn = stateroom.basePricePerNight
    const ppn = basePpn * lengthConfig.multiplier * ship.multiplier
    const totalPerNight = ppn * guests
    const total = totalPerNight * lengthConfig.nights
    const perPerson = total / guests
    const perPersonPerNight = perPerson / lengthConfig.nights

    const low = Math.round(total * 0.85)
    const high = Math.round(total * 1.3)

    return {
      stateroom,
      lengthConfig,
      ship,
      ppn: Math.round(ppn),
      totalPerNight: Math.round(totalPerNight),
      total: Math.round(total),
      perPerson: Math.round(perPerson),
      perPersonPerNight: Math.round(perPersonPerNight),
      low,
      high,
    }
  }, [guests, stateroomId, nightsId, shipId])

  const fmt = (n: number) => n.toLocaleString('en-US')

  return (
    <div className="space-y-6">
      {/* Inputs */}
      <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
        <h2 className="font-display text-xl font-bold text-slate-900 mb-6">Configure Your Cruise</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {/* Guests */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Number of Guests</label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setGuests(Math.max(1, guests - 1))}
                className="w-10 h-10 rounded-lg border border-slate-300 flex items-center justify-center text-slate-700 hover:bg-slate-100 font-bold text-xl transition-colors"
              >
                −
              </button>
              <span className="w-12 text-center font-bold text-2xl text-slate-900">{guests}</span>
              <button
                onClick={() => setGuests(Math.min(8, guests + 1))}
                className="w-10 h-10 rounded-lg border border-slate-300 flex items-center justify-center text-slate-700 hover:bg-slate-100 font-bold text-xl transition-colors"
              >
                +
              </button>
              <span className="text-sm text-slate-500">{guests === 1 ? 'guest' : 'guests'}</span>
            </div>
          </div>

          {/* Cruise Length */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Cruise Length</label>
            <div className="flex flex-wrap gap-2">
              {LENGTHS.map((l) => (
                <button
                  key={l.nights}
                  onClick={() => setNightsId(l.nights)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                    nightsId === l.nights
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'border-slate-300 text-slate-700 hover:border-blue-400'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          {/* Ship */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Ship</label>
            <select
              value={shipId}
              onChange={(e) => setShipId(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {SHIPS.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>

          {/* Stateroom */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Stateroom Type</label>
            <select
              value={stateroomId}
              onChange={(e) => setStateroomId(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {STATEROOMS.map((s) => (
                <option key={s.id} value={s.id}>{s.name} — {s.sqft}</option>
              ))}
            </select>
            {results.stateroom && (
              <p className="text-xs text-slate-500 mt-1">{results.stateroom.description}</p>
            )}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 p-6 text-white">
          <div className="text-sm text-blue-300 mb-1 font-medium">Estimated Cost</div>
          <div className="text-5xl font-bold mb-1">${fmt(results.total)}</div>
          <div className="text-blue-200 text-sm">
            Typical range: ${fmt(results.low)} – ${fmt(results.high)}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 divide-x divide-y sm:divide-y-0 divide-slate-100">
          <div className="p-5 text-center">
            <div className="text-xs text-slate-500 mb-1">Per Person</div>
            <div className="text-2xl font-bold text-slate-900">${fmt(results.perPerson)}</div>
          </div>
          <div className="p-5 text-center">
            <div className="text-xs text-slate-500 mb-1">Per Person / Night</div>
            <div className="text-2xl font-bold text-slate-900">${fmt(results.perPersonPerNight)}</div>
          </div>
          <div className="p-5 text-center col-span-2 sm:col-span-1">
            <div className="text-xs text-slate-500 mb-1">Summary</div>
            <div className="text-sm font-semibold text-slate-700">
              {guests} guest{guests !== 1 ? 's' : ''} · {results.lengthConfig.nights} nights · {results.ship.name}
            </div>
            <div className="text-xs text-slate-500">{results.stateroom.name} stateroom</div>
          </div>
        </div>

        <div className="px-6 py-4 bg-amber-50 border-t border-amber-200">
          <p className="text-xs text-amber-800">
            <strong>Note:</strong> These are estimates based on typical Disney Cruise Line pricing ranges.
            Actual prices vary by itinerary, season, availability, and promotions.
            Always check current prices directly with Disney.
          </p>
        </div>

        <div className="p-6">
          <a
            href="https://disneycruise.disney.go.com"
            
            rel="noopener noreferrer"
            className="block w-full text-center py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors"
          >
            Check Current Prices on Disney Cruise Line →
          </a>
          <p className="text-xs text-slate-400 text-center mt-2">
            Opens disneycruise.disney.go.com — official Disney site, not affiliated.
          </p>
        </div>
      </div>

      {/* Stateroom quick compare */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <h2 className="font-display text-lg font-bold text-slate-900 mb-4">Stateroom Type at a Glance</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {STATEROOMS.map((s) => (
            <button
              key={s.id}
              onClick={() => setStateroomId(s.id)}
              className={`text-left p-4 rounded-xl border-2 transition-colors ${
                stateroomId === s.id
                  ? 'border-blue-500 bg-[#1E3A5F]/10'
                  : 'border-slate-200 hover:border-blue-300'
              }`}
            >
              <div className="font-semibold text-slate-900 text-sm">{s.name}</div>
              <div className="text-xs text-slate-500">{s.sqft}</div>
              <div className="text-xs text-slate-600 mt-1">{s.description}</div>
              <div className="text-sm font-bold text-blue-700 mt-2">
                from ~${fmt(Math.round(s.basePricePerNight))}/person/night
              </div>
            </button>
          ))}
        </div>
        <div className="mt-3 text-center">
          <Link href="/guides/stateroom-comparison" className="text-sm text-blue-600 hover:underline">
            Full stateroom comparison guide →
          </Link>
        </div>
      </div>

      {/* Savings tips */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <h2 className="font-display text-xl font-bold text-slate-900 mb-5">6 Ways to Save on Your Disney Cruise</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {SAVINGS_TIPS.map((tip) => (
            <div key={tip.title} className="p-4 bg-slate-50 rounded-xl">
              <div className="text-xl mb-2">{tip.icon}</div>
              <h3 className="font-semibold text-slate-900 text-sm mb-1">{tip.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{tip.body}</p>
              {tip.link && (
                <Link href={tip.link.href} className="inline-block mt-2 text-xs text-blue-600 hover:underline font-medium">
                  {tip.link.label}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Full calculator link */}
      <div className="bg-[#1E3A5F]/10 border border-blue-200 rounded-xl p-5 text-center">
        <p className="text-sm text-blue-800 mb-3">
          Want to include flights, hotels, onboard extras, and gratuities?
        </p>
        <Link
          href="/tools/cost-calculator"
          className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-colors"
        >
          Try the Full Trip Cost Calculator →
        </Link>
      </div>
    </div>
  )
}

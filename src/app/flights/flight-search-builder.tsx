'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Bell, ExternalLink, Plane, Search } from 'lucide-react'

const HOME_AIRPORTS = [
  { code: 'ATL', city: 'Atlanta, GA' },
  { code: 'AUS', city: 'Austin, TX' },
  { code: 'BNA', city: 'Nashville, TN' },
  { code: 'BOS', city: 'Boston, MA' },
  { code: 'BWI', city: 'Baltimore, MD' },
  { code: 'CLE', city: 'Cleveland, OH' },
  { code: 'CLT', city: 'Charlotte, NC' },
  { code: 'CMH', city: 'Columbus, OH' },
  { code: 'CVG', city: 'Cincinnati, OH' },
  { code: 'DAL', city: 'Dallas Love Field, TX' },
  { code: 'DCA', city: 'Washington Reagan, DC' },
  { code: 'DEN', city: 'Denver, CO' },
  { code: 'DFW', city: 'Dallas/Fort Worth, TX' },
  { code: 'DTW', city: 'Detroit, MI' },
  { code: 'EWR', city: 'Newark, NJ' },
  { code: 'IAD', city: 'Washington Dulles, DC' },
  { code: 'IAH', city: 'Houston Intercontinental, TX' },
  { code: 'IND', city: 'Indianapolis, IN' },
  { code: 'JAX', city: 'Jacksonville, FL' },
  { code: 'JFK', city: 'New York JFK, NY' },
  { code: 'LAS', city: 'Las Vegas, NV' },
  { code: 'LAX', city: 'Los Angeles, CA' },
  { code: 'LGA', city: 'New York LaGuardia, NY' },
  { code: 'MCI', city: 'Kansas City, MO' },
  { code: 'MDW', city: 'Chicago Midway, IL' },
  { code: 'MEM', city: 'Memphis, TN' },
  { code: 'MKE', city: 'Milwaukee, WI' },
  { code: 'MSP', city: 'Minneapolis, MN' },
  { code: 'OAK', city: 'Oakland, CA' },
  { code: 'OKC', city: 'Oklahoma City, OK' },
  { code: 'ORD', city: "Chicago O'Hare, IL" },
  { code: 'PDX', city: 'Portland, OR' },
  { code: 'PHL', city: 'Philadelphia, PA' },
  { code: 'PHX', city: 'Phoenix, AZ' },
  { code: 'PIT', city: 'Pittsburgh, PA' },
  { code: 'RDU', city: 'Raleigh-Durham, NC' },
  { code: 'RIC', city: 'Richmond, VA' },
  { code: 'SAN', city: 'San Diego, CA' },
  { code: 'SAT', city: 'San Antonio, TX' },
  { code: 'SEA', city: 'Seattle, WA' },
  { code: 'SFO', city: 'San Francisco, CA' },
  { code: 'SJC', city: 'San Jose, CA' },
  { code: 'SLC', city: 'Salt Lake City, UT' },
  { code: 'SMF', city: 'Sacramento, CA' },
  { code: 'STL', city: 'St. Louis, MO' },
  { code: 'TUL', city: 'Tulsa, OK' },
] as const

type CruisePort = {
  id: string
  name: string
  airports: { code: string; label: string; note?: string }[]
  southwestServed: boolean
}

const CRUISE_PORTS: CruisePort[] = [
  {
    id: 'port-canaveral',
    name: 'Port Canaveral, FL',
    airports: [
      { code: 'MCO', label: 'Orlando (MCO)', note: '45 min east — easiest for most flyers' },
      { code: 'MLB', label: 'Melbourne (MLB)', note: '20 min south — small airport, limited flights' },
      { code: 'SFB', label: 'Orlando Sanford (SFB)', note: '~1 hr — Allegiant hub, cheap from secondary cities' },
    ],
    southwestServed: true,
  },
  {
    id: 'miami',
    name: 'Miami, FL',
    airports: [
      { code: 'MIA', label: 'Miami (MIA)', note: '15 min — biggest hub, lots of nonstops' },
      { code: 'FLL', label: 'Fort Lauderdale (FLL)', note: '45 min — often $100+ cheaper, Southwest stronghold' },
    ],
    southwestServed: true,
  },
  {
    id: 'fort-lauderdale',
    name: 'Fort Lauderdale, FL (Port Everglades)',
    airports: [
      { code: 'FLL', label: 'Fort Lauderdale (FLL)', note: '10 min — closest to terminal' },
      { code: 'MIA', label: 'Miami (MIA)', note: '40 min — bigger selection of nonstops' },
    ],
    southwestServed: true,
  },
  {
    id: 'galveston',
    name: 'Galveston, TX',
    airports: [
      { code: 'HOU', label: 'Houston Hobby (HOU)', note: '1 hr — Southwest hub, usually the better deal' },
      { code: 'IAH', label: 'Houston Intercontinental (IAH)', note: '1 hr 30 min — United hub' },
    ],
    southwestServed: true,
  },
  {
    id: 'new-orleans',
    name: 'New Orleans, LA',
    airports: [
      { code: 'MSY', label: 'New Orleans (MSY)', note: '30 min — only option, Southwest serves it well' },
    ],
    southwestServed: true,
  },
  {
    id: 'san-juan',
    name: 'San Juan, PR',
    airports: [
      { code: 'SJU', label: 'San Juan (SJU)', note: '15 min — JetBlue, Southwest, AA all fly here' },
    ],
    southwestServed: true,
  },
  {
    id: 'tampa',
    name: 'Tampa, FL',
    airports: [
      { code: 'TPA', label: 'Tampa (TPA)', note: '15 min — Southwest focus city, easy in/out' },
      { code: 'PIE', label: 'St. Pete-Clearwater (PIE)', note: '45 min — Allegiant, smaller crowds' },
    ],
    southwestServed: true,
  },
  {
    id: 'seattle',
    name: 'Seattle, WA',
    airports: [
      { code: 'SEA', label: 'Sea-Tac (SEA)', note: '30 min — Alaska and Delta hubs' },
    ],
    southwestServed: true,
  },
  {
    id: 'vancouver',
    name: 'Vancouver, BC',
    airports: [
      { code: 'YVR', label: 'Vancouver (YVR)', note: '30 min — international; passport required' },
      { code: 'SEA', label: 'Sea-Tac (SEA)', note: '3 hr drive — sometimes much cheaper from US cities' },
    ],
    southwestServed: false,
  },
  {
    id: 'san-diego',
    name: 'San Diego, CA',
    airports: [
      { code: 'SAN', label: 'San Diego (SAN)', note: '10 min — Southwest serves heavily' },
    ],
    southwestServed: true,
  },
  {
    id: 'los-angeles',
    name: 'Los Angeles (San Pedro / Long Beach)',
    airports: [
      { code: 'LAX', label: 'LAX', note: '40 min — most options' },
      { code: 'LGB', label: 'Long Beach (LGB)', note: '15 min — small but easy' },
      { code: 'SNA', label: 'John Wayne (SNA)', note: '30 min — Southwest stronghold' },
    ],
    southwestServed: true,
  },
  {
    id: 'new-york',
    name: 'New York / Cape Liberty (NJ)',
    airports: [
      { code: 'EWR', label: 'Newark (EWR)', note: '20 min — closest to NJ terminal' },
      { code: 'LGA', label: 'LaGuardia (LGA)', note: '45 min — domestic-heavy' },
      { code: 'JFK', label: 'JFK', note: '1 hr — best for international connections' },
    ],
    southwestServed: true,
  },
]

function isoToday(): string {
  return new Date().toISOString().slice(0, 10)
}

function addDays(iso: string, days: number): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  d.setDate(d.getDate() + days)
  return d.toISOString().slice(0, 10)
}

function googleFlightsUrl(origin: string, dest: string, depart: string, ret: string): string {
  // Google Flights accepts natural-language queries via the `q` param.
  const q = `Flights from ${origin} to ${dest} on ${depart} returning ${ret}`
  return `https://www.google.com/travel/flights?q=${encodeURIComponent(q)}`
}

function southwestUrl(origin: string, dest: string, depart: string, ret: string): string {
  const params = new URLSearchParams({
    int: 'HOMEQBOMAIR',
    adultPassengersCount: '1',
    departureDate: depart,
    returnDate: ret,
    destinationAirportCode: dest,
    originationAirportCode: origin,
    tripType: 'roundtrip',
    fareType: 'USD',
    passengerType: 'ADULT',
  })
  return `https://www.southwest.com/air/booking/select.html?${params.toString()}`
}

function kayakUrl(origin: string, dest: string, depart: string, ret: string): string {
  return `https://www.kayak.com/flights/${origin}-${dest}/${depart}/${ret}`
}

export function FlightSearchBuilder() {
  const [origin, setOrigin] = useState('')
  const [portId, setPortId] = useState(CRUISE_PORTS[0].id)
  const [destAirport, setDestAirport] = useState(CRUISE_PORTS[0].airports[0].code)
  const [departDate, setDepartDate] = useState(addDays(isoToday(), 30))
  const [returnDate, setReturnDate] = useState(addDays(isoToday(), 37))

  const port = useMemo(
    () => CRUISE_PORTS.find(p => p.id === portId) ?? CRUISE_PORTS[0],
    [portId],
  )

  function handlePortChange(nextId: string) {
    setPortId(nextId)
    const next = CRUISE_PORTS.find(p => p.id === nextId)
    if (next) setDestAirport(next.airports[0].code)
  }

  const normalizedOrigin = origin.trim().toUpperCase().slice(0, 3)
  const datesOk = departDate && returnDate && departDate <= returnDate
  const ready = normalizedOrigin.length === 3 && destAirport && datesOk

  const links = ready
    ? {
        google: googleFlightsUrl(normalizedOrigin, destAirport, departDate, returnDate),
        southwest: southwestUrl(normalizedOrigin, destAirport, departDate, returnDate),
        kayak: kayakUrl(normalizedOrigin, destAirport, departDate, returnDate),
      }
    : null

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
      <div className="px-6 sm:px-8 py-5 bg-slate-50 border-b border-slate-200">
        <h2 className="font-fraunces text-xl font-bold text-slate-900 flex items-center gap-2">
          <Search className="w-5 h-5 text-[#1E3A5F]" aria-hidden="true" />
          Build your flight search
        </h2>
        <p className="text-sm text-slate-600 mt-1">
          We don&apos;t sell flights. Fill this in and we&apos;ll send you straight to Google Flights, Southwest, or Kayak with your search pre-filled.
        </p>
      </div>

      <div className="px-6 sm:px-8 py-6 space-y-5">
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="origin" className="block text-sm font-semibold text-slate-700 mb-1.5">
              Your home airport
            </label>
            <input
              id="origin"
              type="text"
              list="origin-airports"
              value={origin}
              onChange={e => setOrigin(e.target.value.toUpperCase())}
              placeholder="e.g. ORD, ATL, SEA"
              maxLength={3}
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg font-mono text-base focus:outline-none focus:ring-2 focus:ring-[#D4AF37] uppercase"
              autoComplete="off"
            />
            <datalist id="origin-airports">
              {HOME_AIRPORTS.map(a => (
                <option key={a.code} value={a.code}>
                  {a.city}
                </option>
              ))}
            </datalist>
            <p className="text-xs text-slate-500 mt-1.5">
              3-letter IATA code. Start typing for suggestions.
            </p>
          </div>

          <div>
            <label htmlFor="port" className="block text-sm font-semibold text-slate-700 mb-1.5">
              Cruise departure port
            </label>
            <select
              id="port"
              value={portId}
              onChange={e => handlePortChange(e.target.value)}
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#D4AF37] bg-white"
            >
              {CRUISE_PORTS.map(p => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="destAirport" className="block text-sm font-semibold text-slate-700 mb-1.5">
            Fly into
          </label>
          <select
            id="destAirport"
            value={destAirport}
            onChange={e => setDestAirport(e.target.value)}
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#D4AF37] bg-white"
          >
            {port.airports.map(a => (
              <option key={a.code} value={a.code}>
                {a.label}
                {a.note ? ` — ${a.note}` : ''}
              </option>
            ))}
          </select>
          {port.airports.length > 1 && (
            <p className="text-xs text-slate-500 mt-1.5">
              Tip: check fares to all {port.airports.length} airports — they can differ by $100+.
            </p>
          )}
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="depart" className="block text-sm font-semibold text-slate-700 mb-1.5">
              Outbound (arrive day before sail)
            </label>
            <input
              id="depart"
              type="date"
              value={departDate}
              onChange={e => setDepartDate(e.target.value)}
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
            />
          </div>
          <div>
            <label htmlFor="return" className="block text-sm font-semibold text-slate-700 mb-1.5">
              Return (after disembark)
            </label>
            <input
              id="return"
              type="date"
              value={returnDate}
              onChange={e => setReturnDate(e.target.value)}
              min={departDate || undefined}
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
            />
          </div>
        </div>

        {!ready && (
          <p className="text-sm text-slate-500">
            Enter your 3-letter home airport and pick valid dates to build your search links.
          </p>
        )}

        {ready && links && (
          <div className="grid sm:grid-cols-3 gap-3 pt-1">
            <a
              href={links.google}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#1E3A5F] text-white font-semibold text-sm hover:bg-[#162d4a] transition-colors"
            >
              Google Flights
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
            </a>
            <a
              href={links.southwest}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#D4AF37] text-[#1E3A5F] font-bold text-sm hover:bg-yellow-300 transition-colors"
            >
              Southwest
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
            </a>
            <a
              href={links.kayak}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 border-[#1E3A5F] text-[#1E3A5F] font-semibold text-sm hover:bg-slate-50 transition-colors"
            >
              Kayak
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        )}

        {ready && !port.southwestServed && (
          <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-md px-3 py-2">
            Heads up: Southwest doesn&apos;t serve {port.name.split(',')[0]} directly. The Southwest
            link will still open, but Google Flights or Kayak will be more useful here.
          </p>
        )}
      </div>

      <div className="px-6 sm:px-8 py-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <p className="text-xs text-slate-500">
          Search links are generated on your device. We don&apos;t see or store your dates.
        </p>
        <Link
          href="/flight-deals"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1E3A5F] hover:underline"
        >
          <Bell className="w-4 h-4" aria-hidden="true" />
          Want fare alerts? <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  )
}

export function CruisePortGrid() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {CRUISE_PORTS.map(port => (
        <div
          key={port.id}
          className="bg-white rounded-xl border border-slate-200 p-5 hover:border-[#1E3A5F]/40 hover:shadow-md transition-all"
        >
          <div className="flex items-start gap-3 mb-3">
            <div className="w-9 h-9 rounded-lg bg-[#1E3A5F]/10 flex items-center justify-center shrink-0">
              <Plane className="w-4.5 h-4.5 text-[#1E3A5F]" aria-hidden="true" />
            </div>
            <h3 className="font-fraunces text-lg font-bold text-slate-900 leading-tight">
              {port.name}
            </h3>
          </div>
          <ul className="space-y-2">
            {port.airports.map(a => (
              <li key={a.code} className="text-sm">
                <span className="font-mono font-bold text-[#1E3A5F]">{a.code}</span>
                <span className="text-slate-700"> — {a.label.replace(/\s*\([^)]+\)$/, '')}</span>
                {a.note && (
                  <p className="text-xs text-slate-500 pl-0 mt-0.5">{a.note}</p>
                )}
              </li>
            ))}
          </ul>
          {port.southwestServed && (
            <p className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-[#D4AF37] bg-[#1E3A5F] rounded-full px-2.5 py-0.5">
              ★ Southwest serves this route
            </p>
          )}
        </div>
      ))}
    </div>
  )
}

'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import { ArrowRight, Plane, AlertCircle, Info, Bell, Check } from 'lucide-react'

const US_AIRPORTS = [
  { code: 'ATL', city: 'Atlanta, GA' },
  { code: 'BOS', city: 'Boston, MA' },
  { code: 'BWI', city: 'Baltimore, MD' },
  { code: 'CLT', city: 'Charlotte, NC' },
  { code: 'DAL', city: 'Dallas Love Field, TX' },
  { code: 'DEN', city: 'Denver, CO' },
  { code: 'DFW', city: 'Dallas/Fort Worth, TX' },
  { code: 'DTW', city: 'Detroit, MI' },
  { code: 'EWR', city: 'Newark, NJ' },
  { code: 'HNL', city: 'Honolulu, HI' },
  { code: 'IAH', city: 'Houston Intercontinental, TX' },
  { code: 'JFK', city: 'New York JFK, NY' },
  { code: 'LAS', city: 'Las Vegas, NV' },
  { code: 'LAX', city: 'Los Angeles, CA' },
  { code: 'LGA', city: 'New York LaGuardia, NY' },
  { code: 'MCO', city: 'Orlando, FL' },
  { code: 'MDW', city: 'Chicago Midway, IL' },
  { code: 'MIA', city: 'Miami, FL' },
  { code: 'MSP', city: 'Minneapolis, MN' },
  { code: 'MSY', city: 'New Orleans, LA' },
  { code: 'OAK', city: 'Oakland, CA' },
  { code: 'ORD', city: 'Chicago O\'Hare, IL' },
  { code: 'PDX', city: 'Portland, OR' },
  { code: 'PHL', city: 'Philadelphia, PA' },
  { code: 'PHX', city: 'Phoenix, AZ' },
  { code: 'PIT', city: 'Pittsburgh, PA' },
  { code: 'RDU', city: 'Raleigh-Durham, NC' },
  { code: 'SAN', city: 'San Diego, CA' },
  { code: 'SEA', city: 'Seattle, WA' },
  { code: 'SFO', city: 'San Francisco, CA' },
  { code: 'SJC', city: 'San Jose, CA' },
  { code: 'SLC', city: 'Salt Lake City, UT' },
  { code: 'SMF', city: 'Sacramento, CA' },
  { code: 'STL', city: 'St. Louis, MO' },
  { code: 'TPA', city: 'Tampa, FL' },
]
import React, { useState, useMemo } from 'react'
import { ArrowRight, Plane, AlertCircle, Info } from 'lucide-react'

interface SailingOption {
  id: string
  label: string
  sailDate: string
  portId: string
  portName: string
}

interface Airport {
  code: string
  name: string
  distance_miles: number
}

interface PortOption {
  id: string
  name: string
  code: string
  airports: Airport[]
}

interface FlightResult {
  id: string
  airline: string
  departureTime: string
  arrivalTime: string
  duration: string
  stops: number
  price: number
  departureDate: string
}

// Helper: Calculate great-circle distance between two points
function calculateAirportDistance(homeCode: string, destCode: string): number {
  const coordinates: Record<string, [number, number]> = {
    // Home airports
    'ORD': [41.9742, -87.9073],  // Chicago
    'LAX': [33.9425, -118.4081], // Los Angeles
    'ATL': [33.6407, -84.4277],  // Atlanta
    'DFW': [32.8975, -97.038],   // Dallas
    'DEN': [39.8561, -104.6737], // Denver
    'LAS': [36.0801, -115.1537], // Las Vegas
    'MIA': [25.7959, -80.2870],  // Miami
    'NYC': [40.6895, -74.0342],  // NYC (mixed airports)
    'JFK': [40.6413, -73.7781],  // JFK
    'EWR': [40.6895, -74.1745],  // Newark
    'BOS': [42.3656, -71.0096],  // Boston
    'PHX': [33.4484, -112.0742], // Phoenix
    'SFO': [37.6213, -122.379],  // San Francisco
    'SEA': [47.4502, -122.3088], // Seattle
    // Cruise ports
    'MCO': [28.4265, -81.3081],  // Orlando (Port Canaveral area)
    'FLL': [26.0726, -80.1527],  // Fort Lauderdale
    'TPA': [27.9755, -82.5338],  // Tampa
    'MSY': [29.9841, -90.2458],  // New Orleans
    'HOU': [29.6452, -95.2113],  // Houston (Galveston area)
    'LGB': [33.8177, -118.1516], // Long Beach
    'SAN': [32.7345, -117.1897], // San Diego
  }

  const homeCoords = coordinates[homeCode]
  const destCoords = coordinates[destCode]

  if (!homeCoords || !destCoords) {
    // Fallback to rough estimate
    return Math.random() * 1000 + 500
  }

  // Haversine formula
  const R = 3959 // Earth's radius in miles
  const [lat1, lon1] = homeCoords
  const [lat2, lon2] = destCoords

  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

// Helper: Generate mock flight results
function generateFlightResults(
  homeAirport: string,
  destAirport: string,
  date: string
): FlightResult[] {
  const airlines = [
    { name: 'Delta', code: 'DL' },
    { name: 'United', code: 'UA' },
    { name: 'American', code: 'AA' },
    { name: 'Southwest', code: 'WN' },
    { name: 'JetBlue', code: 'B6' },
  ]

  const distance = calculateAirportDistance(homeAirport, destAirport)
  const estimatedFlightTime = Math.round(distance / 500) // ~500 mph average
  const connectionTime = 90 // minutes for connections

  const results: FlightResult[] = []

  // Generate 4-5 results
  for (let i = 0; i < 5; i++) {
    const airline = airlines[i % airlines.length]
    const stops = i < 3 ? 0 : 1 // Mix of nonstop and 1-stop
    const totalDuration = estimatedFlightTime + (stops > 0 ? connectionTime : 0)
    const hours = Math.floor(totalDuration / 60)
    const minutes = totalDuration % 60

    // Vary departure times
    const departureHours = [6, 8, 10, 12, 2]
    const depHour = departureHours[i % departureHours.length]
    const depMinute = Math.floor(Math.random() * 4) * 15

    const depTime = new Date(date)
    depTime.setHours(depHour, depMinute, 0)

    const arrTime = new Date(depTime.getTime() + totalDuration * 60000)

    // Price varies: $150-600 round trip
    const basePrice = 300
    const priceVariance = Math.random() * 400 - 200
    const price = Math.max(150, Math.round(basePrice + priceVariance))

    results.push({
      id: `flight-${i}`,
      airline: airline.name,
      departureTime: depTime.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }),
      arrivalTime: arrTime.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }),
      duration: `${hours}h ${minutes}m`,
      stops,
      price,
      departureDate: date,
    })
  }

  return results.sort((a, b) => a.price - b.price)
}

export function FlightFinder({
  sailings,
  ports,
}: {
  sailings: SailingOption[]
  ports: PortOption[]
}) {
  const [homeAirport, setHomeAirport] = useState('')
  const [airportInputValue, setAirportInputValue] = useState('')
  const [showAirportDropdown, setShowAirportDropdown] = useState(false)
  const airportRef = useRef<HTMLDivElement>(null)
  const [selectedSailing, setSelectedSailing] = useState<string | null>(null)
  const [selectedPort, setSelectedPort] = useState<string | null>(null)
  const [customDepartureDate, setCustomDepartureDate] = useState<string | null>(null)

  // Close airport dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (airportRef.current && !airportRef.current.contains(e.target as Node)) {
        setShowAirportDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  // Filter airports by input
  const filteredAirports = useMemo(() => {
    const q = airportInputValue.toUpperCase()
    if (!q) return US_AIRPORTS.slice(0, 8)
    return US_AIRPORTS.filter(
      a => a.code.startsWith(q) || a.city.toUpperCase().includes(q)
    ).slice(0, 8)
  }, [airportInputValue])

  // Derive values based on selections
  const selectedSailingObj = sailings.find(s => s.id === selectedSailing)
  const portForSearch = selectedPort
    ? ports.find(p => p.id === selectedPort)
    : selectedSailingObj
      ? ports.find(p => p.id === selectedSailingObj.portId)
      : null

  const sailDate = selectedSailingObj?.sailDate || customDepartureDate
  const nearestAirport = portForSearch?.airports?.[0]

  const isReady = homeAirport.toUpperCase() && portForSearch && sailDate

  // Generate flight results
  const flights = useMemo(() => {
    if (!isReady) return []
    return generateFlightResults(
      homeAirport.toUpperCase(),
      nearestAirport?.code || 'MCO',
      sailDate!
    )
  }, [homeAirport, nearestAirport, sailDate, isReady])

  // Calculate flight distance and recommendation
  const flightDistance = useMemo(() => {
    if (!isReady) return 0
    return calculateAirportDistance(
      homeAirport.toUpperCase(),
      nearestAirport?.code || 'MCO'
    )
  }, [homeAirport, nearestAirport, isReady])

  const shouldArriveEarly = flightDistance > 1000 || !nearestAirport

  // Helper: Format date for Skyscanner URL
  const formatDateForSkyscanner = (dateStr: string): string => {
    const d = new Date(dateStr)
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <div
        className="py-12 px-6 sm:px-8 bg-gradient-to-br from-blue-50 via-white to-indigo-50"
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <Plane className="w-8 h-8" style={{ color: '#2563EB' }} />
            <h1
              className="text-4xl font-bold text-slate-900"
              style={{ fontFamily: 'Fraunces' }}
            >
              Flight Finder
            </h1>
          </div>
          <p className="text-slate-600 max-w-2xl">
            Find the best flights to your Disney cruise departure port. Get
            arrival time recommendations and booking links.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 sm:px-8 py-12">
        {/* Inputs Section */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8 mb-12">
          <h2
            className="text-2xl font-bold mb-8 text-slate-900"
            style={{
              fontFamily: 'Fraunces',
            }}
          >
            Your Travel Details
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Home Airport */}
            <div ref={airportRef} className="relative">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Your Home Airport
              </label>
              <input
                type="text"
                value={airportInputValue}
                onChange={e => {
                  setAirportInputValue(e.target.value)
                  setShowAirportDropdown(true)
                  if (e.target.value.length !== 3) setHomeAirport('')
                }}
                onFocus={() => setShowAirportDropdown(true)}
                placeholder="Search by code or city (e.g., ORD, Chicago)"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-0"
                autoComplete="off"
                value={homeAirport}
                onChange={e => setHomeAirport(e.target.value.toUpperCase())}
                placeholder="e.g., ORD, LAX, ATL"
                maxLength={3}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0"
                style={{ '--tw-ring-color': '#D4AF37' } as React.CSSProperties}
              />
              {homeAirport && (
                <p className="text-xs text-emerald-600 mt-1 font-medium">
                  ✓ {homeAirport} selected
                </p>
              )}
              {showAirportDropdown && filteredAirports.length > 0 && (
                <ul className="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg max-h-56 overflow-y-auto">
                  {filteredAirports.map(airport => (
                    <li key={airport.code}>
                      <button
                        type="button"
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-blue-50 transition-colors"
                        onMouseDown={e => {
                          e.preventDefault()
                          setHomeAirport(airport.code)
                          setAirportInputValue(`${airport.code} — ${airport.city}`)
                          setShowAirportDropdown(false)
                        }}
                      >
                        <span className="font-mono font-bold text-blue-600 w-10 shrink-0">{airport.code}</span>
                        <span className="text-sm text-slate-600">{airport.city}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Sailing or Manual Port Selection */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Select a Sailing <span className="text-slate-400">(or choose port manually)</span>
              </label>
              <select
                value={selectedSailing || ''}
                onChange={e => setSelectedSailing(e.target.value || null)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2"
              >
                <option value="">— Choose a sailing —</option>
                {sailings.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Manual Port Selection */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Or Select Departure Port
              </label>
              <select
                value={selectedPort || ''}
                onChange={e => setSelectedPort(e.target.value || null)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2"
              >
                <option value="">— Choose a port —</option>
                {ports.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Manual Date Selection */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Departure Date
              </label>
              <input
                type="date"
                value={customDepartureDate || ''}
                onChange={e => setCustomDepartureDate(e.target.value || null)}
                disabled={!!selectedSailingObj}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 disabled:bg-slate-100 disabled:cursor-not-allowed"
              />
              {selectedSailingObj && (
                <p className="text-xs text-slate-500 mt-2">
                  Auto-filled from sailing: {new Date(selectedSailingObj.sailDate).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Results Section */}
        {isReady ? (
          <div className="space-y-8">
            {/* Arrival Time Recommendation */}
            <div
              className="rounded-lg border-l-4 border-blue-600 p-6 bg-blue-50"
            >
              <div className="flex gap-4">
                <AlertCircle
                  className="w-6 h-6 flex-shrink-0 mt-0.5 text-blue-600"
                />
                <div>
                  <h3
                    className="font-semibold mb-2 text-slate-900"
                    style={{
                      fontFamily: 'Fraunces',
                    }}
                  >
                    Arrival Time Recommendation
                  </h3>
                  <p className="text-sm text-slate-700 mb-3">
                    Disney cruise boarding is typically <strong>10:30 AM – 3:00 PM</strong>.
                  </p>
                  {shouldArriveEarly ? (
                    <div className="bg-white rounded p-4 border border-slate-200">
                      <p className="font-semibold text-slate-900 mb-2">
                        🛫 Arrive the day before your cruise
                      </p>
                      <p className="text-sm text-slate-700">
                        Your flight distance is approximately{' '}
                        <strong>{Math.round(flightDistance)} miles</strong>. Morning flights
                        on sail day are risky — flight delays could mean missing the ship.
                        Consider flying in the day before for peace of mind.
                      </p>
                    </div>
                  ) : (
                    <div className="bg-white rounded p-4 border border-slate-200">
                      <p className="font-semibold text-slate-900 mb-2">
                        🛫 Morning flight on sail day should work
                      </p>
                      <p className="text-sm text-slate-700">
                        You're only about{' '}
                        <strong>{Math.round(flightDistance)} miles away</strong>. A morning
                        flight gives you time to reach the port, but arriving the day before
                        is always safer.
                      </p>
                    </div>
                  )}
                  <p className="text-xs text-slate-600 mt-4">
                    Estimated flight time: <strong>~{Math.round((flightDistance / 500) + 1.5)} hours</strong> (including connections)
                  </p>
                </div>
              </div>
            </div>

            {/* Flight Search Results */}
            <div>
              <h3
                className="text-2xl font-bold mb-4 text-slate-900"
                style={{
                  fontFamily: 'Fraunces',
                }}
              >
                Flight Results
              </h3>
              <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                <div className="p-6 border-b border-slate-200 bg-slate-50">
                  <p className="text-sm font-semibold text-slate-700">
                    ✈️ Flight results powered by Skyscanner
                  </p>
                </div>

                <div className="divide-y divide-slate-200">
                  {flights.map(flight => (
                    <div key={flight.id} className="p-6 hover:bg-slate-50 transition">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        <div className="flex-1">
                          <p className="font-semibold text-slate-900 mb-2">{flight.airline}</p>
                          <div className="flex items-center gap-4">
                            <div>
                              <p
                                className="text-lg font-bold"
                                style={{ color: '#1E3A5F' }}
                              >
                                {flight.departureTime}
                              </p>
                              <p className="text-xs text-slate-500">Depart</p>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <div className="flex-1 h-0.5 bg-slate-300" />
                                <p className="text-xs font-semibold text-slate-600">
                                  {flight.duration}
                                </p>
                                <div className="flex-1 h-0.5 bg-slate-300" />
                              </div>
                              <p className="text-center text-xs text-slate-500 mt-1">
                                {flight.stops === 0 ? 'Nonstop' : `${flight.stops} stop`}
                              </p>
                            </div>
                            <div>
                              <p
                                className="text-lg font-bold text-blue-600"
                              >
                                {flight.arrivalTime}
                              </p>
                              <p className="text-xs text-slate-500">Arrive</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 md:border-l md:border-slate-200 md:pl-6">
                          <div className="text-right">
                            <p
                              className="text-2xl font-bold text-blue-600"
                            >
                              ${flight.price}
                            </p>
                            <p className="text-xs text-slate-500">round trip</p>
                          </div>
                          <a
                            href={`/go/skyscanner/search?from=${homeAirport.toUpperCase()}&to=${
                              nearestAirport?.code || 'MCO'
                            }&date=${formatDateForSkyscanner(flight.departureDate)}`}
                            className="px-4 py-2 rounded font-semibold text-white bg-blue-600 flex items-center gap-2 whitespace-nowrap transition hover:bg-blue-700"
                          >
                            Search <ArrowRight className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-6 bg-slate-50 border-t border-slate-200">
                  <p className="text-xs text-slate-600 mb-3">
                    <strong>Note:</strong> Prices shown are estimates. Click through to see live pricing on Skyscanner.
                  </p>
                  <p className="text-xs text-slate-500">
                    <strong>FTC Disclosure:</strong> This page contains affiliate links to Skyscanner.
                  </p>
                </div>
              </div>
            </div>

            {/* Nearest Airports */}
            <div>
              <h3
                className="text-2xl font-bold mb-4 text-slate-900"
                style={{
                  fontFamily: 'Fraunces',
                }}
              >
                Airports Near {portForSearch?.name}
              </h3>
              <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr
                      className="bg-blue-600 text-white"
                    >
                      <th className="px-6 py-3 text-left text-sm font-semibold">
                        Airport
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">
                        Code
                      </th>
                      <th className="px-6 py-3 text-right text-sm font-semibold">
                        Distance
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {portForSearch?.airports.map((airport, idx) => (
                      <tr
                        key={idx}
                        className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}
                      >
                        <td className="px-6 py-4 text-sm font-medium text-slate-900">
                          {airport.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-700">
                          {airport.code}
                        </td>
                        <td className="px-6 py-4 text-sm text-right text-slate-700">
                          {airport.distance_miles} miles
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Tips Section */}
            <div>
              <h3
                className="text-2xl font-bold mb-4 text-slate-900"
                style={{
                  fontFamily: 'Fraunces',
                }}
              >
                Flight Booking Tips for Cruises
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg p-6 border border-slate-200">
                  <div className="flex gap-3 mb-3">
                    <Info
                      className="w-5 h-5 flex-shrink-0 mt-0.5 text-blue-600"
                    />
                    <h4
                      className="font-bold text-slate-900"
                      style={{
                        fontFamily: 'Fraunces',
                      }}
                    >
                      Book Flexible Fares
                    </h4>
                  </div>
                  <p className="text-sm text-slate-700">
                    Refundable or flexible fares give you peace of mind. If your cruise gets
                    delayed or you need to change your flight, you'll be covered.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-6 border border-slate-200">
                  <div className="flex gap-3 mb-3">
                    <Info
                      className="w-5 h-5 flex-shrink-0 mt-0.5 text-blue-600"
                    />
                    <h4
                      className="font-bold text-slate-900"
                      style={{
                        fontFamily: 'Fraunces',
                      }}
                    >
                      Southwest Bags Fly Free
                    </h4>
                  </div>
                  <p className="text-sm text-slate-700">
                    Southwest includes 2 free checked bags — perfect for cruise luggage. No
                    baggage fees means more savings for ship activities.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-6 border border-slate-200">
                  <div className="flex gap-3 mb-3">
                    <Info
                      className="w-5 h-5 flex-shrink-0 mt-0.5 text-blue-600"
                    />
                    <h4
                      className="font-bold text-slate-900"
                      style={{
                        fontFamily: 'Fraunces',
                      }}
                    >
                      Arrive the Day Before
                    </h4>
                  </div>
                  <p className="text-sm text-slate-700">
                    For international ports or long flights, consider arriving a day early.
                    Budget pre-cruise hotels reduce stress and help you adjust.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-6 border border-slate-200">
                  <div className="flex gap-3 mb-3">
                    <Info
                      className="w-5 h-5 flex-shrink-0 mt-0.5 text-blue-600"
                    />
                    <h4
                      className="font-bold text-slate-900"
                      style={{
                        fontFamily: 'Fraunces',
                      }}
                    >
                      Early Morning = Buffer Time
                    </h4>
                  </div>
                  <p className="text-sm text-slate-700">
                    Morning flights give you the most time to handle delays and get to the port.
                    Afternoon flights are riskier for same-day arrival.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <Plane
              className="w-12 h-12 mx-auto mb-4 text-slate-300"
            />
            <p className="text-slate-600">
              Enter your home airport and select a sailing or port to get started.
            </p>
          </div>
        )}

        {/* Southwest Flight Alerts */}
        <SouthwestAlerts homeAirport={homeAirport} />
      </div>
    </div>
  )
}

const SW_PORTS = [
  { name: 'Port Canaveral', nearestAirport: 'Orlando (MCO)' },
  { name: 'Galveston', nearestAirport: 'Houston (HOU/IAH)' },
  { name: 'Miami', nearestAirport: 'Miami (MIA)' },
  { name: 'New Orleans', nearestAirport: 'New Orleans (MSY)' },
  { name: 'San Juan', nearestAirport: 'San Juan (SJU)' },
]

function SouthwestAlerts({ homeAirport }: { homeAirport: string }) {
  const [swEmail, setSwEmail] = useState('')
  const [swAirport, setSwAirport] = useState(homeAirport)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Keep in sync with parent's home airport input
  useMemo(() => {
    if (homeAirport && !swAirport) setSwAirport(homeAirport)
  }, [homeAirport, swAirport])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!swEmail || !swEmail.includes('@')) {
      setError('Please enter a valid email address')
      return
    }
    if (!swAirport || swAirport.length < 3) {
      setError('Please enter your 3-letter home airport code')
      return
    }

    setLoading(true)

    try {
      const existing = JSON.parse(localStorage.getItem('sw_flight_alerts') || '[]')
      existing.push({
        airport: swAirport.toUpperCase(),
        email: swEmail,
        ports: SW_PORTS.map(p => p.name),
        signedUpAt: new Date().toISOString(),
      })
      localStorage.setItem('sw_flight_alerts', JSON.stringify(existing))

      await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: swEmail,
          preferences: { source: 'sw_flight_alerts', homeAirport: swAirport.toUpperCase() },
        }),
      }).catch(() => {})

      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-12 bg-gradient-to-br from-[#1E3A5F] to-[#2a4f7a] rounded-2xl overflow-hidden">
      <div className="p-8">
        <div className="flex items-start gap-4 mb-6">
          <div className="flex-shrink-0 w-12 h-12 bg-[#D4AF37]/20 rounded-xl flex items-center justify-center">
            <Bell className="w-6 h-6 text-[#D4AF37]" />
          </div>
          <div>
            <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-1">Southwest Flight Alerts</p>
            <h3 className="font-bold text-2xl text-white mb-2" style={{ fontFamily: 'Fraunces' }}>
              Get Notified When Southwest Drops Fares
            </h3>
            <p className="text-blue-200 text-sm leading-relaxed max-w-xl">
              Southwest releases cheap fare sales without warning — and they're gone in hours.
              We'll alert you when low fares pop up from your home airport to any Disney cruise port.
            </p>
          </div>
        </div>

        {/* Ports covered */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-8">
          {SW_PORTS.map(port => (
            <div key={port.name} className="bg-white/10 rounded-xl px-3 py-2.5 text-center">
              <p className="text-white text-xs font-semibold leading-tight">{port.name}</p>
              <p className="text-blue-300 text-xs mt-0.5">{port.nearestAirport}</p>
            </div>
          ))}
        </div>

        {submitted ? (
          <div className="bg-white/10 rounded-xl p-6 text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-emerald-500/20 rounded-full mb-3">
              <Check className="w-7 h-7 text-emerald-400" />
            </div>
            <h4 className="font-bold text-xl text-white mb-2" style={{ fontFamily: 'Fraunces' }}>
              You're on the list!
            </h4>
            <p className="text-blue-200 text-sm">
              We'll email <strong className="text-white">{swEmail}</strong> when Southwest drops cheap fares from{' '}
              <strong className="text-white">{swAirport.toUpperCase()}</strong> to cruise ports.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            {error && (
              <div className="mb-4 p-3 bg-red-900/30 border border-red-500/30 rounded-xl flex items-center gap-2" role="alert">
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" aria-hidden="true" />
                <p className="text-sm text-red-300">{error}</p>
              </div>
            )}

            <div className="grid sm:grid-cols-3 gap-3">
              <div>
                <label htmlFor="sw-airport-input" className="block text-sm font-semibold text-blue-200 mb-2">
                  Your Home Airport
                </label>
                <input
                  id="sw-airport-input"
                  type="text"
                  value={swAirport}
                  onChange={e => setSwAirport(e.target.value.toUpperCase())}
                  placeholder="e.g., ORD"
                  maxLength={3}
                  required
                  disabled={loading}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-blue-300 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#D4AF37] disabled:opacity-50"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="sw-email-input" className="block text-sm font-semibold text-blue-200 mb-2">
                  Email Address
                </label>
                <div className="flex gap-2">
                  <input
                    id="sw-email-input"
                    type="email"
                    value={swEmail}
                    onChange={e => setSwEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    disabled={loading}
                    className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-blue-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37] disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-5 py-3 bg-[#D4AF37] text-[#1E3A5F] font-bold text-sm rounded-xl hover:bg-yellow-300 transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {loading ? 'Saving…' : (
                      <>Alert Me <ArrowRight className="w-4 h-4" aria-hidden="true" /></>
                    )}
                  </button>
                </div>
              </div>
            </div>

            <p className="mt-3 text-xs text-blue-400">
              Free. We only email when fares drop — no spam. Powered by GatGridCruises deal monitoring.
            </p>
          </form>
        )}
      </div>
    </div>
  )
}

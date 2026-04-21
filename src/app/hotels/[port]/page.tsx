import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPorts, getPortBySlug, getHotelsForPort } from '@/lib/data'
import { MapPin, Check, X as XIcon, Zap, DollarSign, Clock, ArrowRight, Info, Cloud, MapPinCheck, AlertCircle, Compass } from 'lucide-react'

interface PageProps {
  params: Promise<{ port: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { port } = await params
  const portData = getPortBySlug(port)
  if (!portData) return { title: 'Port Not Found' }
  return {
    title: `${portData.name} Port Guide & Pre-Cruise Hotels`,
    description: `Complete guide to ${portData.name}: parking, driving directions, weather, terminal tips, pre-cruise activities, and honest hotel recommendations for Disney cruisers.`,
  }
}

export async function generateStaticParams() {
  const ports = getPorts()
  return ports
    .filter(p => ['port-0001', 'port-0002', 'port-0003', 'port-0004'].includes(p.id))
    .map(p => ({ port: p.slug }))
}

// Port-specific tips
const portTips: Record<string, string[]> = {
  'port-canaveral': [
    'Cocoa Beach hotels are cheaper but farther. If you want walkable restaurants, stay on the port side.',
    'The Hyatt and Radisson offer the best shuttle reliability. Plan to leave by 9:00 AM to avoid cruise terminal rush.',
    'If you\'re arriving by car, ask your hotel about free parking. Some properties charge $15–$25 per night.',
    'Traffic on State Road A1A can be heavy during peak season. Give yourself extra time in the morning.',
  ],
  'miami': [
    'Downtown Miami hotels are closer to the port than South Beach. Skip the beach hotels unless you\'re adding extra days.',
    'The Port of Miami is right on Biscayne Bay. Properties within 2 miles offer easy shuttle access.',
    'Wynwood and Brickell neighborhoods are great for nightlife the evening before. Budget 15–20 minutes for rideshare to the port.',
    'Parking downtown is expensive ($20–$30 per night). Factor this into your budget when comparing hotel prices.',
  ],
  'galveston': [
    'Stay on the Seawall for ocean views. The Strand is walkable and charming but no water views.',
    'Hotel Galvez is Galveston\'s most iconic property—perfect for those wanting historic charm and beachfront appeal.',
    'The cruise terminal is minutes from downtown. Any Seawall hotel puts you close to departure.',
    'Galveston traffic is manageable compared to other ports. Plan 30 minutes from any Seawall hotel to terminal.',
  ],
  'new-york-bayonne': [
    'Jersey City hotels have stunning Manhattan views at half the price of NYC hotels. The PATH train gets you to NYC in 10 minutes.',
    'The Bayonne cruise terminal is in New Jersey, not Manhattan. Jersey City and Secaucus are actually closer than NYC properties.',
    'Free shuttle service is valuable here. Without it, plan $20–$35 for rideshare to the port.',
    'NYC hotels look appealing but are further away and pricier. Unless you\'re spending the whole day in the city, stay in Jersey.',
  ],
}

export default async function PortHotelGuidePage({ params }: PageProps) {
  const { port: portSlug } = await params
  const port = getPortBySlug(portSlug)
  if (!port) notFound()

  const allHotels = getHotelsForPort(port.id)
  if (allHotels.length === 0) notFound()

  // Separate Disney partners from independents
  const disneyHotels = allHotels.filter(h => h.is_disney_partner)
  const independentHotels = allHotels.filter(h => !h.is_disney_partner)

  // Find best value and most convenient
  const allPrices = allHotels.flatMap(h => {
    const match = h.price_range.match(/\$(\d+)–\$(\d+)/)
    return match ? [{ hotel: h, minPrice: parseInt(match[1]) }] : []
  })
  const bestValueHotel = allPrices.reduce((prev, current) =>
    (prev.minPrice < current.minPrice) ? prev : current
  )?.hotel
  const mostConvenientHotel = allHotels.reduce((prev, current) =>
    (prev.distance_to_port_miles < current.distance_to_port_miles) ? prev : current
  )

  const tips = portTips[portSlug] || [
    'Book the night before your departure to ensure a smooth pre-cruise experience.',
    'Check if your hotel offers complimentary breakfast—it saves time on cruise day morning.',
    'Confirm shuttle times with your hotel. Most depart between 4:30 AM and 5:00 AM.',
    'Plan to check out and head to the terminal by 10:00 AM to avoid crowds.',
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 text-slate-900 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <Link href="/hotels" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4 transition-colors">
            <ArrowRight className="w-4 h-4 rotate-180" />
            <span className="text-sm font-medium">Back to all ports</span>
          </Link>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4 leading-tight text-slate-900">
            {port.name} Port Guide
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl">
            {port.overview}
          </p>
        </div>
      </div>

      {/* FTC Disclosure */}
      <div className="bg-amber-50 border-b border-amber-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-start gap-3">
            <Info className="w-4 h-4 text-amber-700 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-amber-900">
              <strong>Disclosure:</strong> This page contains affiliate links. We may earn a commission if you use our links to book on partner sites at no extra cost to you.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Getting There Section */}
        {port.drivingDirections && (
          <section className="mb-12">
            <h2 className="font-display text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <MapPin className="w-8 h-8 text-blue-600" />
              Getting There
            </h2>
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Driving Directions */}
              <div className="border border-slate-300 rounded-lg p-6">
                <h3 className="font-display text-xl font-bold text-slate-900 mb-3">Driving Directions</h3>
                <p className="text-slate-700 leading-relaxed">
                  {port.drivingDirections}
                </p>
              </div>

              {/* Nearest Airports */}
              <div className="border border-slate-300 rounded-lg p-6">
                <h3 className="font-display text-xl font-bold text-slate-900 mb-4">Nearest Airports</h3>
                <div className="space-y-3">
                  {port.nearest_airports.map((airport, idx) => (
                    <div key={idx} className="flex items-start gap-3 pb-3 border-b border-slate-200 last:border-b-0 last:pb-0">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-semibold text-blue-600">{airport.code}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{airport.name}</p>
                        <p className="text-sm text-slate-600">{airport.distance_miles} miles away</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Parking Section */}
        {port.parking && port.parking.length > 0 && (
          <section className="mb-12">
            <h2 className="font-display text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <MapPinCheck className="w-8 h-8 text-blue-600" />
              Parking Options
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {port.parking.map((park, idx) => (
                <div key={idx} className="border border-slate-300 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-display text-lg font-bold text-slate-900">{park.name}</h3>
                    <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap">
                      ${park.dailyRate}/day
                    </div>
                  </div>
                  <p className="text-slate-700 leading-relaxed">
                    {park.tips}
                  </p>
                  {park.reservationUrl && (
                    <a href={park.reservationUrl} className="inline-flex items-center gap-2 text-blue-600 font-semibold mt-4 hover:text-blue-700 transition-colors">
                      Reserve →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Terminal Tips Section */}
        {port.terminalTips && port.terminalTips.length > 0 && (
          <section className="mb-12 bg-slate-50 rounded-lg p-6 sm:p-8 border border-slate-200">
            <h2 className="font-display text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <AlertCircle className="w-8 h-8 text-blue-600" />
              Terminal Tips
            </h2>
            <div className="space-y-4">
              {port.terminalTips.map((tip, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">{idx + 1}</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed pt-1">
                    {tip}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Weather Section */}
        {port.weatherByMonth && port.weatherByMonth.length > 0 && (
          <section className="mb-12">
            <h2 className="font-display text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <Cloud className="w-8 h-8 text-blue-600" />
              Weather by Month
            </h2>
            <div className="overflow-x-auto border border-slate-300 rounded-lg">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-300 bg-slate-100">
                    <th className="text-left py-3 px-4 font-semibold text-slate-900">Month</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-900">High</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-900">Low</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-900">Rainy Days</th>
                  </tr>
                </thead>
                <tbody>
                  {port.weatherByMonth.map((month, idx) => (
                    <tr key={idx} className="border-b border-slate-200 hover:bg-slate-50">
                      <td className="py-3 px-4 font-medium text-slate-900">{month.month}</td>
                      <td className="py-3 px-4 text-slate-700">{month.highF}°F</td>
                      <td className="py-3 px-4 text-slate-700">{month.lowF}°F</td>
                      <td className="py-3 px-4 text-slate-700">{month.rainyDays} days</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Pre-Trip Activities Section */}
        {port.preTripsActivities && port.preTripsActivities.length > 0 && (
          <section className="mb-12">
            <h2 className="font-display text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <Compass className="w-8 h-8 text-blue-600" />
              Things to Do Before Your Cruise
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {port.preTripsActivities.map((activity, idx) => (
                <div key={idx} className="border border-slate-300 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <h3 className="font-display text-lg font-bold text-slate-900 mb-2">
                    {activity.name}
                  </h3>
                  <p className="text-slate-700 mb-3 leading-relaxed">
                    {activity.description}
                  </p>
                  {activity.distance && (
                    <p className="text-sm text-slate-600 flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {activity.distance}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Travel Hack Section */}
        <div className="mb-12 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-lg p-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex-1">
              <p className="font-semibold text-amber-900 mb-1">Flying to {port.name}?</p>
              <p className="text-sm text-amber-800 mb-3">
                See how credit card signup bonuses could cover your flights to the cruise port for free.
              </p>
            </div>
            <a href="/travel-hacks/fly-free-to-cruise-port" className="inline-flex items-center gap-1 text-sm font-semibold text-amber-700 hover:text-amber-900 transition-colors whitespace-nowrap">
              Explore travel hacks →
            </a>
          </div>
        </div>

        {/* Disney Partner Hotels Section */}
        {disneyHotels.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">D</span>
              </div>
              <h2 className="font-display text-3xl font-bold text-slate-900">
                Pre-Cruise Hotels: Disney Partners
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {disneyHotels.map(hotel => (
                <HotelCard key={hotel.id} hotel={hotel} isBestValue={hotel.id === bestValueHotel?.id} isMostConvenient={hotel.id === mostConvenientHotel?.id} />
              ))}
            </div>
          </section>
        )}

        {/* Independent Alternatives Section */}
        {independentHotels.length > 0 && (
          <section className="mb-16">
            <h2 className="font-display text-3xl font-bold text-slate-900 mb-3">
              Independent Alternatives
            </h2>
            <p className="text-slate-700 mb-6 max-w-2xl">
              These aren"t Disney partners, but they're often cheaper, closer, or both.
"            </p>

            <div className="grid lg:grid-cols-2 gap-6">
              {independentHotels.map(hotel => (
                <HotelCard key={hotel.id} hotel={hotel} isBestValue={hotel.id === bestValueHotel?.id} isMostConvenient={hotel.id === mostConvenientHotel?.id} />
              ))}
            </div>
          </section>
        )}

        {/* Comparison Table */}
        <section className="mb-16">
          <h2 className="font-display text-3xl font-bold text-slate-900 mb-6">
            Quick Comparison
          </h2>
          <div className="overflow-x-auto border border-slate-300 rounded-lg">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-300 bg-slate-100">
                  <th className="text-left py-3 px-4 font-semibold text-slate-900">Hotel</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900">Partner?</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900">Price Range</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900">Distance</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900">Shuttle?</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900">Our Pick</th>
                </tr>
              </thead>
              <tbody>
                {allHotels.map(hotel => (
                  <tr key={hotel.id} className="border-b border-slate-200 hover:bg-slate-50">
                    <td className="py-3 px-4 font-medium text-slate-900">{hotel.name}</td>
                    <td className="py-3 px-4">
                      {hotel.is_disney_partner ? (
                        <span className="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-semibold">
                          Yes
                        </span>
                      ) : (
                        <span className="text-slate-500">—</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-slate-700">{hotel.price_range}</td>
                    <td className="py-3 px-4 text-slate-700">{hotel.distance_to_port_miles} mi</td>
                    <td className="py-3 px-4">
                      {hotel.shuttle_available ? (
                        <span className="inline-flex items-center gap-1 text-emerald-600">
                          <Check className="w-4 h-4" />
                          Yes
                        </span>
                      ) : (
                        <span className="text-slate-500">—</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {hotel.id === bestValueHotel?.id && (
                        <span className="inline-block bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-xs font-semibold">
                          Best Value
                        </span>
                      )}
                      {hotel.id === mostConvenientHotel?.id && (
                        <span className="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-semibold">
                          Most Convenient
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Tips Section */}
        <section className="bg-slate-50 rounded-lg p-6 sm:p-8 mb-16 border border-slate-200">
          <div className="flex items-center gap-3 mb-6">
            <Zap className="w-6 h-6 text-blue-600" />
            <h2 className="font-display text-2xl font-bold text-slate-900">
              {port.name} Tips
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {tips.map((tip, idx) => (
              <div key={idx} className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 font-semibold text-sm">
                  {idx + 1}
                </div>
                <p className="text-slate-700 text-sm leading-relaxed pt-0.5">
                  {tip}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer Navigation */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pt-8 border-t border-slate-200">
          <Link
            href="/hotels"
            className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back to all ports
          </Link>
          <p className="text-sm text-slate-600">
            Ready to book? Check availability on our affiliated booking partners.
          </p>
        </div>
      </div>
    </div>
  )
}

function HotelCard({
  hotel,
  isBestValue,
  isMostConvenient,
}: {
  hotel: any
  isBestValue?: boolean
  isMostConvenient?: boolean
}) {
  return (
    <div className="border border-slate-300 rounded-lg p-6 hover:shadow-lg transition-shadow">
      {/* Badges */}
      {(isBestValue || isMostConvenient) && (
        <div className="flex gap-2 mb-4 flex-wrap">
          {isBestValue && (
            <span className="inline-block bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold">
              Best Value
            </span>
          )}
          {isMostConvenient && (
            <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
              Most Convenient
            </span>
          )}
        </div>
      )}

      {/* Header */}
      <div className="mb-4">
        <h3 className="font-display text-xl font-bold text-slate-900 mb-2">
          {hotel.name}
        </h3>
        <div className="flex flex-wrap gap-2 items-center">
          <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm font-semibold">
            {hotel.price_range}
          </span>
          {hotel.is_disney_partner && (
            <span className="inline-block bg-blue-50 text-blue-600 px-3 py-1 rounded text-xs font-semibold">
              Disney Partner
            </span>
          )}
        </div>
      </div>

      {/* Info Pills */}
      <div className="flex flex-wrap gap-2 mb-5 pb-5 border-b border-slate-100">
        <div className="flex items-center gap-1.5 text-sm text-slate-700 bg-slate-50 px-3 py-2 rounded">
          <MapPin className="w-4 h-4 text-slate-500" />
          {hotel.distance_to_port_miles} mi to port
        </div>
        {hotel.shuttle_available ? (
          <div className="flex items-center gap-1.5 text-sm text-emerald-700 bg-emerald-50 px-3 py-2 rounded">
            <Check className="w-4 h-4" />
            Shuttle available
          </div>
        ) : (
          <div className="flex items-center gap-1.5 text-sm text-slate-600 bg-slate-50 px-3 py-2 rounded">
            <X className="w-4 h-4" />
            No shuttle
          </div>
        )}
      </div>

      {/* Shuttle Details */}
      {hotel.shuttle_available && hotel.shuttle_details && (
        <p className="text-xs text-slate-600 mb-4 p-3 bg-slate-50 rounded">
          <strong>Shuttle:</strong> {hotel.shuttle_details}
        </p>
      )}

      {/* Pros and Cons */}
      <div className="grid sm:grid-cols-2 gap-4 mb-5">
        <div>
          <h4 className="text-sm font-semibold text-emerald-700 mb-2 flex items-center gap-1.5">
            <Check className="w-4 h-4" /> Pros
          </h4>
          <ul className="space-y-1.5">
            {hotel.pros.map((pro: string, idx: number) => (
              <li key={idx} className="text-sm text-slate-700 flex gap-2">
                <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>{pro}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-rose-700 mb-2 flex items-center gap-1.5">
            <XIcon className="w-4 h-4" /> Cons
          </h4>
          <ul className="space-y-1.5">
            {hotel.cons.map((con: string, idx: number) => (
              <li key={idx} className="text-sm text-slate-700 flex gap-2">
                <XIcon className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                <span>{con}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Editorial Take */}
      <div className="mb-5 p-4 bg-slate-50 rounded-lg border-l-4 border-gold">
        <p className="text-sm text-slate-700 italic">
          {hotel.editorial_take}
        </p>
      </div>

      {/* CTA Button */}
      <a
        href={hotel.booking_affiliate_url}
        className="w-full inline-flex items-center justify-center gap-2 bg-gold text-navy font-semibold py-3 rounded-lg hover:bg-gold/90 transition-colors"
      >
        Check Availability
        <ArrowRight className="w-4 h-4" />
      </a>
    </div>
  )
}

// Helper component for X icon since we can't use XIcon in JSX directly
function X(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}

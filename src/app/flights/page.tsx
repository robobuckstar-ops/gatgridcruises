import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Bell,
  Building2,
  Calendar,
  Clock,
  CreditCard,
  ExternalLink,
  Luggage,
  MapPin,
  Plane,
  RefreshCw,
  Sparkles,
  TrendingDown,
} from 'lucide-react'
import { CruisePortGrid, FlightSearchBuilder } from './flight-search-builder'
import { TravelAffiliateDisclosure } from '@/components/ui/affiliate-disclosure'
import {
  FLIGHTS_HOME,
  HOTELS_HOME,
  PORT_TRAVEL_LINKS,
  TP_LINK_ATTRS,
  flightsTo,
  hotelsIn,
} from '@/lib/travelpayouts'

export const metadata: Metadata = {
  title: 'Cheap Flights to Your Cruise Port — GatGrid Cruises',
  description:
    'Build a flight search for your Disney cruise in 30 seconds. Pre-filled Google Flights, Southwest, and Kayak links plus tips on the best airports, when to book, and how to save.',
  alternates: { canonical: '/flights' },
  openGraph: {
    title: 'Flight Tips & Search Helper for Cruisers',
    description:
      'Generate pre-filled flight search links to your cruise port and learn when to book for the lowest fares.',
    url: 'https://gatgridcruises.com/flights',
    images: [
      {
        url: 'https://gatgridcruises.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'GatGridCruises Flight Search Helper',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Flight Tips & Search Helper for Cruisers',
    description:
      'Generate pre-filled Google Flights, Southwest, and Kayak links for your cruise dates.',
    images: ['https://gatgridcruises.com/og-image.png'],
  },
}

const TIPS = [
  {
    icon: Clock,
    title: 'Fly in the day before sailing',
    desc: "Cruise lines won't wait for a delayed plane. A pre-cruise hotel night turns a stressful sail day into a relaxed one — and is usually cheaper than re-routing missed flights.",
  },
  {
    icon: Calendar,
    title: 'Book 6–8 weeks out (domestic)',
    desc: 'For US flights to Florida cruise ports, fares typically bottom out 6–8 weeks before departure. International embarks (Vancouver, Barcelona, Rome) book best 3–5 months out.',
  },
  {
    icon: TrendingDown,
    title: 'Avoid Saturday flights',
    desc: 'Saturday is the most expensive day to fly. Sail on a Sunday? Fly in Friday or Saturday morning is often $80–$150 more than Friday — check both before you book.',
  },
  {
    icon: RefreshCw,
    title: "Use Southwest's free rebook",
    desc: "Southwest never charges change fees. Book early at a fair price, then rebook for travel funds if the fare drops. Set a reminder to check 30 days before sail.",
  },
  {
    icon: MapPin,
    title: 'Check secondary airports',
    desc: 'For Port Canaveral, MCO is closest but FLL is often $100+ cheaper and shuttle-able. For Galveston, HOU beats IAH 80% of the time. For Vancouver, sometimes flying into SEA + train saves $200/person.',
  },
  {
    icon: Luggage,
    title: 'Southwest = free bags',
    desc: 'Two free checked bags per person. For a family of four packing for a cruise, that\'s $280 saved over American/Delta basic economy on a round trip.',
  },
  {
    icon: CreditCard,
    title: 'Pay with points when possible',
    desc: "Chase Ultimate Rewards and Capital One Travel often beat published cash fares 20–25% on redemption. Pair with the card guide in our Tools menu.",
  },
  {
    icon: Sparkles,
    title: 'Book refundable / use travel insurance',
    desc: "Cruise-line air programs are often pricier but include guaranteed connection. If you book on your own, an inexpensive travel insurance policy covers missed-port costs.",
  },
]

const SOUTHWEST_RELEASE_NOTE = [
  'Southwest sells flights in chunks — typically 6 months out, sometimes adjusted',
  'Cheapest "Wanna Get Away" fares sell out within 24–48 hours of a new schedule release',
  'The Southwest fare-alert email list catches new releases the day they happen',
]

export default function FlightsPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero with search builder */}
      <section className="bg-gradient-to-br from-[#1E3A5F] via-[#162d4a] to-[#0f1f33] py-14 md:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-10">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[#D4AF37] text-xs font-semibold uppercase tracking-wider mb-4">
              <Plane className="w-3.5 h-3.5" aria-hidden="true" />
              Free flight search helper
            </span>
            <h1 className="font-fraunces text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Find Cheap Flights to Your Cruise Port
            </h1>
            <p className="text-base md:text-lg text-blue-200 max-w-2xl mx-auto leading-relaxed">
              Tell us your home airport and cruise dates. We&apos;ll build pre-filled search links to Google Flights, Southwest, and Kayak — and tell you which airport will save you the most.
            </p>
          </div>

          <FlightSearchBuilder />
        </div>
      </section>

      {/* Popular cruise ports */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-fraunces text-3xl md:text-4xl font-bold text-slate-900 mb-3">
              Airports for the biggest cruise ports
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Every cruise port has a primary airport — and usually a cheaper alternative. Here&apos;s where to fly into and why.
            </p>
          </div>

          <CruisePortGrid />

          <p className="mt-8 text-center text-sm text-slate-500">
            Need a hotel near the port too?{' '}
            <Link href="/hotels" className="text-[#1E3A5F] font-semibold hover:underline">
              Browse pre-cruise hotels →
            </Link>
          </p>

          <p className="mt-3 text-center text-sm text-slate-500">
            More flight help:{' '}
            <Link href="/tools/flights" className="text-[#1E3A5F] font-semibold hover:underline">
              Flight Finder
            </Link>{' '}
            ·{' '}
            <Link href="/flight-deals" className="text-[#1E3A5F] font-semibold hover:underline">
              Flight Deal Alerts
            </Link>
          </p>
        </div>
      </section>

      {/* Getting to your port — compare fares and pre-cruise hotel rates */}
      <section id="getting-to-your-port" className="bg-slate-50 py-16 md:py-20 border-t border-slate-200 scroll-mt-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-fraunces text-3xl md:text-4xl font-bold text-slate-900 mb-3">
              Getting to your port
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Once you know which airport you&apos;re flying into, compare fares and the
              night-before hotel in one pass. These search links are pre-set for the three ports
              Disney sails from most.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PORT_TRAVEL_LINKS.map(port => (
              <div
                key={port.port}
                className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col"
              >
                <h3 className="font-fraunces text-lg font-bold text-slate-900 mb-1">
                  {port.port}
                </h3>
                <p className="text-sm text-slate-500 mb-5">Fly into {port.airportLabel}</p>

                <div className="mt-auto space-y-2.5">
                  <a
                    href={flightsTo(port.airportCode)}
                    {...TP_LINK_ATTRS}
                    className="flex items-center justify-between gap-2 w-full rounded-lg bg-[#1E3A5F] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#2a4f7a] transition-colors"
                  >
                    <span className="inline-flex items-center gap-2">
                      <Plane className="w-4 h-4" aria-hidden="true" />
                      Flights to {port.airportCode}
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-70" aria-hidden="true" />
                  </a>
                  <a
                    href={hotelsIn(port.hotelDestination)}
                    {...TP_LINK_ATTRS}
                    className="flex items-center justify-between gap-2 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:border-[#1E3A5F] hover:text-[#1E3A5F] transition-colors"
                  >
                    <span className="inline-flex items-center gap-2">
                      <Building2 className="w-4 h-4" aria-hidden="true" />
                      Hotels in {port.hotelLabel}
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-70" aria-hidden="true" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-6 text-center text-sm text-slate-600">
            Sailing from somewhere else? Search{' '}
            <a
              href={FLIGHTS_HOME}
              {...TP_LINK_ATTRS}
              className="text-[#1E3A5F] font-semibold hover:underline"
            >
              all flights
            </a>{' '}
            or{' '}
            <a
              href={HOTELS_HOME}
              {...TP_LINK_ATTRS}
              className="text-[#1E3A5F] font-semibold hover:underline"
            >
              all hotels
            </a>
            .
          </p>

          <div className="mt-8 flex justify-center">
            <TravelAffiliateDisclosure className="max-w-2xl text-center" />
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="bg-slate-50 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-fraunces text-3xl md:text-4xl font-bold text-slate-900 mb-3">
              8 ways cruisers save on flights
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Practical advice from Disney cruise families who routinely fly round-trip for under $250 per person.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TIPS.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow"
              >
                <div className="w-9 h-9 rounded-lg bg-[#D4AF37]/15 flex items-center justify-center mb-3">
                  <Icon className="w-4.5 h-4.5 text-[#1E3A5F]" aria-hidden="true" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-1.5 text-[15px]">{title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Southwest alert CTA */}
      <section className="bg-[#0a1628] py-14 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-8 items-center">
            <div className="lg:col-span-3">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-bold uppercase tracking-wider mb-3">
                <Bell className="w-3.5 h-3.5" aria-hidden="true" />
                Southwest fare alerts
              </span>
              <h2 className="font-fraunces text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                Don&apos;t miss the day Southwest opens your dates
              </h2>
              <ul className="space-y-2 mb-6">
                {SOUTHWEST_RELEASE_NOTE.map(line => (
                  <li key={line} className="flex items-start gap-2 text-blue-200 text-sm">
                    <span className="text-[#D4AF37] mt-0.5">→</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
                <Plane className="w-8 h-8 text-[#D4AF37] mx-auto mb-3" aria-hidden="true" />
                <p className="text-white font-semibold mb-3 text-sm">
                  Get an email the moment Southwest releases new dates or drops fares for your cruise port.
                </p>
                <Link
                  href="/flight-deals"
                  className="inline-flex items-center justify-center w-full gap-2 px-5 py-3 rounded-xl bg-[#D4AF37] text-[#0a1628] font-bold text-sm hover:bg-yellow-300 transition-colors"
                >
                  <Bell className="w-4 h-4" aria-hidden="true" />
                  Sign up for flight alerts
                </Link>
                <p className="mt-3 text-xs text-blue-400">Free · No spam · Unsubscribe anytime</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Disclosure */}
      <section className="bg-white py-8 border-t border-slate-200">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs text-slate-500 leading-relaxed">
            GatGrid Cruises does not sell flights or process flight bookings. Search links open
            third-party sites (Google Flights, Southwest, Kayak) where you book directly. See our{' '}
            <Link href="/disclosures" className="underline hover:text-[#1E3A5F]">
              disclosures
            </Link>{' '}
            for details.
          </p>
        </div>
      </section>
    </main>
  )
}

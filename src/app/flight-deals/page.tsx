import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Plane,
  Bell,
  Calendar,
  TrendingDown,
  Search,
  MapPin,
  Clock,
  Check,
  ExternalLink,
} from 'lucide-react'
import { FlightDealsForm } from './flight-deals-form'

export const metadata: Metadata = {
  title: 'Flight Deal Alerts for Your Cruise — GatGrid Cruises',
  description:
    "Get notified the moment Southwest releases flights or runs a promo matching your cruise dates. Free flight deal alerts to MCO, MIA, and FLL — built for cruisers.",
  openGraph: {
    title: 'Never Miss a Flight Deal for Your Cruise',
    description:
      "Free alerts when Southwest opens new dates or drops fares to your cruise port. Stop refreshing the booking page — we'll email you.",
    url: 'https://gatgridcruises.com/flight-deals',
    images: [
      {
        url: 'https://gatgridcruises.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'GatGridCruises Flight Deal Alerts',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Flight Deal Alerts for Cruisers',
    description: 'Get notified when Southwest releases flights or promos matching your cruise dates.',
    images: ['https://gatgridcruises.com/og-image.png'],
  },
}

const HOW_IT_WORKS = [
  {
    icon: Calendar,
    title: 'Tell us your cruise window',
    desc: "Drop your sail month, departure city, and which Florida cruise port you're flying into. Takes 30 seconds.",
  },
  {
    icon: Search,
    title: 'We watch Southwest for you',
    desc: "Southwest opens its schedule in chunks (typically 6 months out). We monitor every release and every promo so you don't have to set a calendar reminder.",
  },
  {
    icon: Bell,
    title: 'You get a heads-up email',
    desc: 'The moment your dates open or a sale lands matching your route, we email you with the fare and a direct booking link. No spam, no hype.',
  },
]

const FLIGHT_TIPS = [
  {
    title: 'Fly in the day before',
    desc: "Cruise lines won't wait for a delayed plane. Booking the flight to arrive the night before — and a port-area hotel — turns a stressful morning into a relaxed one.",
    icon: Clock,
  },
  {
    title: "Use Southwest's 24-hour rule",
    desc: 'Southwest lets you cancel for full Travel Funds (no fee). Book early, then rebook if a better fare drops. Cruisers do this constantly to lock in cheap dates.',
    icon: TrendingDown,
  },
  {
    title: 'Check MCO, MIA, AND FLL',
    desc: 'For Port Canaveral, MCO is closest, but FLL is sometimes $200+ cheaper and only 3 hours by shuttle. We track all three for Florida cruises.',
    icon: MapPin,
  },
  {
    title: 'Tuesday/Wednesday departures',
    desc: 'Mid-week flights are typically 15–30% cheaper than Saturday flights. If your cruise sails Sunday, flying in Friday or Saturday morning often saves a lot.',
    icon: Calendar,
  },
  {
    title: 'Watch the Southwest calendar',
    desc: 'Southwest releases ~6 months at a time. The cheapest fares are gone within 48 hours of a new schedule open. Our alerts catch the release the moment it happens.',
    icon: Bell,
  },
  {
    title: 'Use credit card travel portals',
    desc: 'Chase Ultimate Rewards and Capital One Travel often beat published cash fares by 20–25% when redeeming points. Pair with our credit card hacks guide.',
    icon: Plane,
  },
]

const FLIGHT_RESOURCES = [
  {
    name: 'Southwest Airlines',
    desc: "Cruisers' favorite — bags fly free, no change fees, easy rebook on price drops.",
    href: 'https://www.southwest.com/',
  },
  {
    name: 'Google Flights',
    desc: 'Best for date-flexible searches and price tracking across all airlines.',
    href: 'https://www.google.com/flights',
  },
  {
    name: 'Kayak Explore',
    desc: 'See cheap fares from your home airport to MCO/MIA/FLL on a calendar grid.',
    href: 'https://www.kayak.com/explore/',
  },
  {
    name: "Going (formerly Scott's Cheap Flights)",
    desc: 'Mistake fares and big sales — useful for international cruise embarks.',
    href: 'https://www.going.com/',
  },
  {
    name: 'Hopper',
    desc: 'Predicts whether to buy now or wait. Decent for non-Southwest carriers.',
    href: 'https://www.hopper.com/',
  },
]

export default function FlightDealsPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1E3A5F] via-[#162d4a] to-[#0f1f33] py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="flex justify-center mb-5">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#D4AF37] text-sm font-semibold">
                <Plane className="w-4 h-4" aria-hidden="true" />
                Free · No spam · Built for cruisers
              </span>
            </div>

            <h1 className="font-fraunces text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Never Miss a Flight Deal for Your Cruise
            </h1>

            <p className="text-lg md:text-xl text-blue-200 max-w-2xl mx-auto leading-relaxed">
              Southwest releases flights in chunks and runs flash sales constantly. We watch the schedule for you and email you the second a deal matches your cruise window.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <FlightDealsForm dark />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-fraunces text-3xl md:text-4xl font-bold text-slate-900 text-center mb-4">
            How flight deal alerts work
          </h2>
          <p className="text-center text-slate-600 mb-12 max-w-xl mx-auto">
            Southwest pricing isn&apos;t random — but it does require timing. We do the watching so you can focus on packing.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {HOW_IT_WORKS.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="p-6 rounded-xl border border-slate-200 hover:border-[#1E3A5F] transition-colors"
              >
                <div className="w-12 h-12 rounded-lg bg-[#1E3A5F]/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-[#1E3A5F]" aria-hidden="true" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="bg-slate-50 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-fraunces text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              6 ways to find cheap flights to your cruise port
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Our subscribers consistently fly to Florida cruises for $150–$250 round trip per person. Here&apos;s the playbook.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FLIGHT_TIPS.map(({ title, desc, icon: Icon }) => (
              <div
                key={title}
                className="p-6 rounded-xl bg-white border border-slate-200 hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/15 flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5 text-[#1E3A5F]" aria-hidden="true" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-fraunces text-3xl md:text-4xl font-bold text-slate-900 text-center mb-4">
            Where we look for deals
          </h2>
          <p className="text-center text-slate-600 mb-10 max-w-xl mx-auto">
            Bookmark these. We monitor all of them — but if you want to do your own homework, start here.
          </p>

          <div className="space-y-3">
            {FLIGHT_RESOURCES.map(({ name, desc, href }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start justify-between gap-4 p-5 rounded-xl border border-slate-200 hover:border-[#1E3A5F] hover:bg-slate-50 transition-colors group"
              >
                <div>
                  <h3 className="font-semibold text-slate-900 group-hover:text-[#1E3A5F] flex items-center gap-2">
                    {name}
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
                  </h3>
                  <p className="text-slate-600 text-sm mt-1">{desc}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#0a1628] py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <Plane className="w-10 h-10 text-[#D4AF37] mx-auto mb-4" aria-hidden="true" />
          <h2 className="font-fraunces text-3xl md:text-4xl font-bold text-white mb-4">
            Set it and forget it
          </h2>
          <p className="text-blue-200 mb-8 max-w-xl mx-auto">
            Tell us your route once. We&apos;ll email you when Southwest opens dates or drops a fare matching your cruise window — usually weeks before everyone else notices.
          </p>

          <div className="max-w-2xl mx-auto">
            <FlightDealsForm dark />
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-blue-300 text-sm">
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4" aria-hidden="true" /> Free forever
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4" aria-hidden="true" /> No credit card
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4" aria-hidden="true" /> Unsubscribe anytime
            </span>
          </div>

          <p className="mt-8 text-blue-400 text-sm">
            Already booked your cruise?{' '}
            <Link href="/tools/flights" className="text-[#D4AF37] hover:underline">
              Try the Flight Finder →
            </Link>
          </p>
        </div>
      </section>
    </main>
  )
}

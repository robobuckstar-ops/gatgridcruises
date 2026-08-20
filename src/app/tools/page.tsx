import { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRightLeft,
  BedDouble,
  BellRing,
  Bus,
  CreditCard,
  DollarSign,
  FileText,
  GitCompare,
  Hotel,
  LineChart,
  Plane,
  PlaneTakeoff,
  Search,
  TrendingDown,
} from 'lucide-react'

export const metadata: Metadata = {
  alternates: { canonical: '/tools' },
  title: 'Disney Cruise Planning Tools — Calculators, Finders & Trackers',
  description:
    'Every free GatGrid tool for planning a Disney cruise: onboard credit and credit card calculators, stateroom and flight finders, sailing comparison, price tracking, transfers and port hotels.',
  openGraph: {
    title: 'Disney Cruise Planning Tools — Calculators, Finders & Trackers',
    description:
      'Every free GatGrid tool for planning a Disney cruise: onboard credit and credit card calculators, stateroom and flight finders, sailing comparison, price tracking, transfers and port hotels.',
    url: 'https://gatgridcruises.com/tools',
    images: [{ url: 'https://gatgridcruises.com/og-image.png', width: 1200, height: 630, alt: 'GatGridCruises' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Disney Cruise Planning Tools — Calculators, Finders & Trackers',
    description:
      'Every free GatGrid tool for planning a Disney cruise: onboard credit and credit card calculators, stateroom and flight finders, sailing comparison, price tracking, transfers and port hotels.',
    images: ['https://gatgridcruises.com/og-image.png'],
  },
}

// Mirrors the Tools dropdown in the site header. Keep the two in sync when a
// tool is added or moved.
const toolGroups = [
  {
    heading: 'Pick your sailing and stateroom',
    blurb: 'Narrow down which cruise to book and where to sleep on it.',
    tools: [
      {
        href: '/tools/compare',
        icon: GitCompare,
        title: 'Compare Sailings',
        description: 'Put up to four sailings side by side — dates, ship, itinerary and price in one table.',
        cta: 'Compare sailings',
      },
      {
        href: '/tools/staterooms',
        icon: BedDouble,
        title: 'Stateroom Finder',
        description: 'Filter real cabins by ship, category, deck, position, noise and view to find the right room.',
        cta: 'Find a stateroom',
      },
      {
        href: '/price-tracker',
        icon: LineChart,
        title: 'Price Tracker',
        description: 'Browse current fares across the fleet and filter by ship, destination or month.',
        cta: 'Track prices',
      },
      {
        href: '/price-watch',
        icon: TrendingDown,
        title: 'Price-Drop Watch',
        description: 'Ask us to watch your booked fare and reprice it if Disney drops the rate.',
        cta: 'Watch my fare',
      },
    ],
  },
  {
    heading: 'Save money on the booking',
    blurb: 'Onboard credit, card rewards, and moving an existing booking to us.',
    tools: [
      {
        href: '/tools/obc-calculator',
        icon: DollarSign,
        title: 'OBC Calculator',
        description: 'Find out exactly how much onboard credit you qualify for based on your booking fare.',
        cta: 'Calculate OBC',
      },
      {
        href: '/tools/credit-cards',
        icon: CreditCard,
        title: 'Credit Card Hacks',
        description: 'See which credit cards maximize rewards on Disney cruise bookings and onboard spending.',
        cta: 'Compare cards',
      },
      {
        href: '/transfer',
        icon: ArrowRightLeft,
        title: 'Transfer Your Booking',
        description: 'Already booked direct? Check whether your reservation can move to us and earn onboard credit.',
        cta: 'Check eligibility',
      },
    ],
  },
  {
    heading: 'Get to the port',
    blurb: 'Flights, ground transfers and a place to sleep the night before.',
    tools: [
      {
        href: '/tools/flights',
        icon: PlaneTakeoff,
        title: 'Flight Finder',
        description: 'Estimate flight times and fares from your home airport, and see when to land before you sail.',
        cta: 'Estimate flights',
      },
      {
        href: '/flights',
        icon: Search,
        title: 'Flight Search & Tips',
        description: 'Jump straight into Google Flights, Southwest or Kayak with your dates and airports pre-filled.',
        cta: 'Search flights',
      },
      {
        href: '/flight-deals',
        icon: BellRing,
        title: 'Flight Deal Alerts',
        description: 'Get an email when fares drop between your home city and your cruise port.',
        cta: 'Get flight alerts',
      },
      {
        href: '/tools/transfers',
        icon: Bus,
        title: 'Transfer Guide',
        description: 'Compare airport-to-terminal options — Disney coach, rideshare, shuttle and parking — by port.',
        cta: 'Compare transfers',
      },
      {
        href: '/hotels',
        icon: Hotel,
        title: 'Port Hotels',
        description: 'Pre-cruise hotels near each departure port, with typical nightly rates and shuttle notes.',
        cta: 'Browse hotels',
      },
    ],
  },
  {
    heading: 'Free help from a human',
    blurb: 'No cost, no obligation — our concierge service is free to use.',
    tools: [
      {
        href: '/book',
        icon: Plane,
        title: 'Free Cruise Quote',
        description: 'Tell us your dates and party size and we will price the sailing for you.',
        cta: 'Get a quote',
      },
      {
        href: '/free-guide',
        icon: FileText,
        title: 'Free First-Timer’s Guide',
        description: 'Our printable PDF walk-through of a first Disney cruise, start to finish.',
        cta: 'Get the guide',
      },
    ],
  },
]

const toolCount = toolGroups.reduce((sum, group) => sum + group.tools.length, 0)

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-[#1E3A5F] to-slate-900 py-16 md:py-20 border-b border-white/10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-fraunces text-4xl md:text-5xl font-bold text-white mb-4">Disney Cruise Planning Tools</h1>
          <p className="text-lg text-blue-200 max-w-2xl mx-auto">
            {toolCount} free tools to help you pick the right sailing, book it for less, and get to the port without
            stress. No account required.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {toolGroups.map((group) => (
          <section key={group.heading}>
            <h2 className="font-fraunces text-2xl font-bold text-slate-900">{group.heading}</h2>
            <p className="text-sm text-slate-600 mt-1 mb-5">{group.blurb}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {group.tools.map((tool) => {
                const Icon = tool.icon
                return (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="group flex flex-col gap-3 p-5 rounded-xl border border-slate-200 bg-white hover:border-navy hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-slate-100 group-hover:bg-navy/10 transition-colors duration-200">
                        <Icon className="h-5 w-5 text-navy" />
                      </div>
                      <h3 className="font-semibold text-slate-900 group-hover:text-navy transition-colors duration-200">
                        {tool.title}
                      </h3>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed flex-1">{tool.description}</p>
                    <span className="text-sm font-medium text-navy group-hover:underline">{tool.cta} →</span>
                  </Link>
                )
              })}
            </div>
          </section>
        ))}
      </div>
    </main>
  )
}

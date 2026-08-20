import { Metadata } from 'next'
import Link from 'next/link'
import { getPorts, getTransfersForPort } from '@/lib/data'
import { Car, ArrowRight, ExternalLink } from 'lucide-react'
import { TravelAffiliateDisclosure } from '@/components/ui/affiliate-disclosure'
import { TRANSFER_PARTNERS, TP_LINK_ATTRS } from '@/lib/travelpayouts'

export const metadata: Metadata = {
  alternates: { canonical: '/tools/transfers' },
  title: 'Transfer Guide — Getting to Your Disney Cruise Port',
  description: 'Compare transportation options to every Disney cruise departure port. Disney transfer vs Uber vs rental car vs driving.',
  openGraph: {
    title: 'Transfer Guide — Getting to Your Disney Cruise Port',
    description: 'Compare transportation options to every Disney cruise port — Disney transfer vs Uber vs rental car vs driving.',
    url: 'https://gatgridcruises.com/tools/transfers',
    images: [{ url: 'https://gatgridcruises.com/og-image.png', width: 1200, height: 630, alt: 'GatGridCruises' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Transfer Guide — Disney Cruise Ports',
    description: 'Disney transfer vs Uber vs rental car — which is best for your cruise port?',
    images: ['https://gatgridcruises.com/og-image.png'],
  },
}

export default function TransfersPage() {
  const ports = getPorts()
  // Only show ports that have transfer data
  const portsWithTransfers = ports.filter(p => getTransfersForPort(p.id).length > 0)

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-br from-slate-900 via-[#1E3A5F] to-slate-900 py-12 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl sm:text-4xl font-bold mb-2 text-white">Transfer Guide</h1>
          <p className="text-blue-200 text-lg">How to get from the airport to your Disney cruise port — honestly compared.</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-slate-600 mb-8 max-w-3xl">
          Disney&apos;s ground transfer costs $39 per person each way. For a family of 4, that&apos;s $312 round trip.
          An Uber from the same airport might cost $45 total. Here&apos;s the full breakdown for every port.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {portsWithTransfers.map(port => {
            const transfers = getTransfersForPort(port.id)
            // Options like personal car and hotel shuttle carry a $0 floor (parking-only,
            // or bundled with a hotel stay), which isn't a fare anyone can actually book.
            // The headline figure should be the cheapest option with a real price on it.
            const pricedFares = transfers
              .map(t => t.cost_estimate_min)
              .filter(cost => cost > 0)
            const cheapestFare = pricedFares.length > 0 ? Math.min(...pricedFares) : null
            return (
              <Link key={port.id} href={`/tools/transfers/${port.slug}`}
                className="group bg-white border border-slate-300 rounded-xl p-6 hover:border-blue-400 hover:shadow-lg transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <Car className="h-5 w-5 text-[#1E3A5F]" />
                  <h2 className="font-display text-xl font-bold text-slate-900 group-hover:text-[#1E3A5F] transition-colors">{port.name}</h2>
                </div>
                <p className="text-sm text-slate-600 mb-3">{transfers.length} transfer options compared</p>
                <p className="text-sm text-slate-600">
                  {cheapestFare !== null
                    ? <>Cheapest option from <strong className="text-slate-900">${cheapestFare}</strong></>
                    : <>See options for pricing</>}
                </p>
                <span className="inline-flex items-center gap-1 mt-3 text-sm text-[#1E3A5F] font-medium group-hover:text-[#162d4a]">
                  View full comparison <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            )
          })}
        </div>

        {/* Pre-booked private transfers — an alternative to Disney's coach
            and to gambling on rideshare availability at the terminal. */}
        <section className="mt-16 pt-12 border-t border-slate-200">
          <h2 className="font-display text-2xl font-bold text-slate-900 mb-2">
            Book a private airport transfer
          </h2>
          <p className="text-slate-600 mb-8 max-w-3xl">
            If you&apos;d rather have a driver already waiting than queue for a rideshare with four
            suitcases and a stroller, these two let you lock in a fixed price ahead of time.
            Popular routes: MCO → Port Canaveral, FLL → Port Everglades, MIA → PortMiami.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TRANSFER_PARTNERS.map(partner => (
              <div
                key={partner.name}
                className="flex flex-col bg-white border border-slate-300 rounded-xl p-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Car className="h-5 w-5 text-[#1E3A5F]" aria-hidden="true" />
                  <h3 className="font-display text-xl font-bold text-slate-900">{partner.name}</h3>
                </div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
                  Best for: {partner.bestFor}
                </p>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">{partner.description}</p>
                <a
                  href={partner.url}
                  {...TP_LINK_ATTRS}
                  className="mt-auto inline-flex items-center justify-center gap-2 rounded-lg bg-[#1E3A5F] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#2a4f7a] transition-colors"
                >
                  Check {partner.name} prices
                  <ExternalLink className="h-3.5 w-3.5 opacity-70" aria-hidden="true" />
                </a>
              </div>
            ))}
          </div>

          <TravelAffiliateDisclosure className="mt-6" />
        </section>
      </div>
    </div>
  )
}

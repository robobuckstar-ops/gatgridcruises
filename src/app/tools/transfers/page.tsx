import { Metadata } from 'next'
import Link from 'next/link'
import { getPorts, getTransfersForPort } from '@/lib/data'
import { Car, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Transfer Guide — Getting to Your Disney Cruise Port',
  description: 'Compare transportation options to every Disney cruise departure port. Disney transfer vs Uber vs rental car vs driving.',
}

export default function TransfersPage() {
  const ports = getPorts()
  // Only show ports that have transfer data
  const portsWithTransfers = ports.filter(p => getTransfersForPort(p.id).length > 0)

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 text-slate-900 py-12 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl sm:text-4xl font-bold mb-2 text-slate-900">Transfer Guide</h1>
          <p className="text-slate-600 text-lg">How to get from the airport to your Disney cruise port — honestly compared.</p>
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
            const cheapest = transfers.reduce((min, t) => t.cost_estimate_min < min.cost_estimate_min ? t : min, transfers[0])
            return (
              <Link key={port.id} href={`/tools/transfers/${port.slug}`}
                className="group bg-white border border-slate-300 rounded-xl p-6 hover:border-blue-400 hover:shadow-lg transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <Car className="h-5 w-5 text-blue-600" />
                  <h2 className="font-display text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{port.name}</h2>
                </div>
                <p className="text-sm text-slate-600 mb-3">{transfers.length} transfer options compared</p>
                <p className="text-sm text-slate-600">Cheapest option from <strong className="text-slate-900">${cheapest.cost_estimate_min}</strong></p>
                <span className="inline-flex items-center gap-1 mt-3 text-sm text-blue-600 font-medium group-hover:text-blue-700">
                  View full comparison <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

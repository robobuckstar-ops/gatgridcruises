'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Zap, TrendingDown, ArrowRight } from 'lucide-react'
import type { Sailing } from '@/types/database'
import { SailingCard } from './sailing-card'
import { GuestCountSelector } from './guest-count-selector'

interface SailingWithDrop extends Sailing {
  percentBelow?: number
}

interface HomeDealSectionsProps {
  lastMinuteSailings: Sailing[]
  priceDrops: SailingWithDrop[]
  featuredSailings: Sailing[]
}

export function HomeDealSections({ lastMinuteSailings, priceDrops, featuredSailings }: HomeDealSectionsProps) {
  const [guestCount, setGuestCount] = useState(2)

  return (
    <>
      {/* Guest count selector — shared across all homepage sections */}
      <div className="bg-white border-b border-slate-100 py-3">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <GuestCountSelector value={guestCount} onChange={setGuestCount} />
            <span className="text-xs text-slate-400 hidden sm:block">
              Price/person/night updates across all listings
            </span>
          </div>
        </div>
      </div>

      {/* Last-Minute Deals */}
      <section className="bg-gradient-to-br from-amber-50 to-yellow-50 py-16 md:py-20 border-t border-amber-100" aria-labelledby="last-minute-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-12">
            <Zap className="w-8 h-8 text-amber-600" aria-hidden="true" />
            <h2 id="last-minute-heading" className="font-fraunces text-3xl md:text-4xl font-bold text-slate-900">
              Last-Minute Steals
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {lastMinuteSailings.map((sailing) => (
              <SailingCard key={sailing.id} sailing={sailing} guestCount={guestCount} />
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/deals/last-minute"
              className="inline-flex items-center gap-2 text-amber-700 font-semibold hover:text-amber-900 transition-colors"
            >
              View All Last-Minute Deals
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Biggest Price Drops */}
      <section className="bg-white py-16 md:py-20" aria-labelledby="price-drops-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-12">
            <TrendingDown className="w-8 h-8 text-blue-600" aria-hidden="true" />
            <h2 id="price-drops-heading" className="font-fraunces text-3xl md:text-4xl font-bold text-slate-900">
              Biggest Price Drops This Week
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {priceDrops.map((sailing) => (
              <SailingCard
                key={sailing.id}
                sailing={sailing}
                guestCount={guestCount}
                percentBelow={sailing.percentBelow}
              />
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/deals"
              className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
            >
              View All Deals
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Sailings */}
      <section className="bg-slate-50 py-16 md:py-20" aria-labelledby="featured-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="featured-heading" className="font-fraunces text-3xl md:text-4xl font-bold text-slate-900 mb-12">
            Featured Sailings
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredSailings.map((sailing) => (
              <SailingCard key={sailing.id} sailing={sailing} guestCount={guestCount} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

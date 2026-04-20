'use client'

import Link from 'next/link'
import { Lightbulb } from 'lucide-react'
import { getCardBySlug } from '@/lib/credit-card-config'
import { CreditCardRecommendation } from './credit-card-recommendation'
import { cn } from '@/lib/utils'

interface TravelHackTipProps {
  tip: string
  cardSlug?: string
  className?: string
}

/**
 * Travel Hack Tip Box
 * Eye-catching tip box with optional card recommendation in compact form
 */
export function TravelHackTip({ tip, cardSlug, className }: TravelHackTipProps) {
  const card = cardSlug ? getCardBySlug(cardSlug) : undefined

  return (
    <div className={cn('rounded-xl border-2 border-amber-300 bg-amber-50 p-5', className)}>
      {/* Header with icon */}
      <div className="flex gap-3 mb-4">
        <div className="flex-shrink-0 mt-0.5">
          <Lightbulb className="h-6 w-6 text-amber-600" />
        </div>
        <div className="flex-1">
          <h3 className="font-display font-semibold text-amber-900 text-lg mb-1">Travel Hack</h3>
          <p className="text-sm text-amber-800 leading-relaxed">{tip}</p>
        </div>
      </div>

      {/* Card recommendation (compact) */}
      {card && (
        <div className="mb-4 mt-5 pt-4 border-t border-amber-200">
          <p className="text-xs font-semibold text-amber-900 mb-3 uppercase tracking-wide">
            Recommended Card
          </p>
          <CreditCardRecommendation card={card} compact showEditorialTake={false} />
        </div>
      )}

      {/* Learn more link */}
      <Link
        href="/travel-hacks"
        className="inline-flex items-center gap-2 mt-3 text-sm font-medium text-amber-700 hover:text-amber-900 transition-colors"
      >
        Learn more in our Travel Hacks guide
        <span>→</span>
      </Link>
    </div>
  )
}

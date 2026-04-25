'use client'

import Link from 'next/link'
import { Check, X } from 'lucide-react'
import { getCardBySlug, creditCards, type CreditCard } from '@/lib/credit-card-config'
import { cn } from '@/lib/utils'

interface CardComparisonTableProps {
  cardIds: string[]
}

/**
 * Credit Card Comparison Table
 * Side-by-side comparison highlighting the best value in each category
 */
export function CardComparisonTable({ cardIds }: CardComparisonTableProps) {
  // Get cards from IDs
  const cards = cardIds
    .map((id) => creditCards.find((c) => c.id === id))
    .filter((card): card is CreditCard => card !== undefined)

  if (cards.length === 0) {
    return (
      <div className="p-6 text-center text-slate-600 bg-slate-50 rounded-lg">
        No cards found for comparison.
      </div>
    )
  }

  // Helper: format points/dollar
  const formatEarning = (rate: number): string => `${rate}x`

  // Helper: find max value in a column for highlighting
  const getMaxInColumn = (getVal: (card: CreditCard) => number): number => {
    return Math.max(...cards.map(getVal))
  }

  // Helper: highlight cell if it's the best in this column
  const isBest = (value: number, maxValue: number): boolean => {
    return value === maxValue && maxValue > 0
  }

  // Count highlights per card (for "winner" badge)
  const cardHighlights = cards.map((card) => {
    let count = 0
    const maxFee = getMaxInColumn((c) => c.signupBonusValue)
    if (isBest(card.signupBonusValue, maxFee)) count++

    const maxTravel = getMaxInColumn((c) => c.pointsPerDollarTravel)
    if (isBest(card.pointsPerDollarTravel, maxTravel)) count++

    const maxDining = getMaxInColumn((c) => c.pointsPerDollarDining)
    if (isBest(card.pointsPerDollarDining, maxDining)) count++

    if (card.tripCancellation) count++
    if (card.tripDelay) count++
    if (card.loungeAccess) count++

    return count
  })

  const maxHighlights = Math.max(...cardHighlights)

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-max">
        <table className="w-full border-collapse">
          {/* Header */}
          <thead>
            <tr>
              <th className="text-left py-3 px-4 text-xs font-semibold text-slate-700 bg-slate-50 border-b border-slate-200 sticky left-0 z-10 min-w-32">
                Category
              </th>
              {cards.map((card, idx) => {
                const highlights = cardHighlights[idx]
                const isWinner = highlights === maxHighlights && maxHighlights > 0
                return (
                  <th
                    key={card.id}
                    className="py-3 px-4 text-center bg-slate-50 border-b border-slate-200 min-w-36"
                  >
                    <div className="space-y-2">
                      {/* Card name */}
                      <div>
                        <div className="text-sm font-semibold text-slate-900 text-center">{card.name}</div>
                        {isWinner && (
                          <span className="inline-block mt-1 px-2 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700">
                            Winner
                          </span>
                        )}
                      </div>

                      {/* Colored bar for card */}
                      <div
                        className="h-1 rounded-full"
                        style={{ backgroundColor: card.imageColor }}
                      />
                    </div>
                  </th>
                )
              })}
            </tr>
          </thead>

          {/* Body */}
          <tbody className="divide-y divide-slate-200">
            {/* Annual Fee */}
            <tr>
              <td className="py-3 px-4 text-sm font-medium text-slate-900 bg-[#1E3A5F]/10 sticky left-0 z-10">
                Annual Fee
              </td>
              {cards.map((card) => (
                <td
                  key={`${card.id}-fee`}
                  className="py-3 px-4 text-center text-sm text-slate-900 font-semibold"
                >
                  ${card.annualFee}
                </td>
              ))}
            </tr>

            {/* Signup Bonus */}
            <tr>
              <td className="py-3 px-4 text-sm font-medium text-slate-900 bg-[#1E3A5F]/10 sticky left-0 z-10">
                Signup Bonus
              </td>
              {cards.map((card) => {
                const maxBonus = getMaxInColumn((c) => c.signupBonusValue)
                const isBestBonus = isBest(card.signupBonusValue, maxBonus)
                return (
                  <td
                    key={`${card.id}-bonus`}
                    className={cn(
                      'py-3 px-4 text-center text-sm font-semibold',
                      isBestBonus && 'bg-emerald-100 text-emerald-900'
                    )}
                  >
                    <div>{card.signupBonus}</div>
                    <div className="text-xs text-slate-700">~${card.signupBonusValue}</div>
                  </td>
                )
              })}
            </tr>

            {/* Bonus Requirement */}
            <tr>
              <td className="py-3 px-4 text-sm font-medium text-slate-900 bg-[#1E3A5F]/10 sticky left-0 z-10">
                Minimum Spend
              </td>
              {cards.map((card) => (
                <td
                  key={`${card.id}-req`}
                  className="py-3 px-4 text-center text-xs text-slate-700"
                >
                  {card.signupBonusRequirement}
                </td>
              ))}
            </tr>

            {/* Travel Points */}
            <tr>
              <td className="py-3 px-4 text-sm font-medium text-slate-900 bg-[#1E3A5F]/10 sticky left-0 z-10">
                Travel Points/Dollar
              </td>
              {cards.map((card) => {
                const maxTravel = getMaxInColumn((c) => c.pointsPerDollarTravel)
                const isBestTravel = isBest(card.pointsPerDollarTravel, maxTravel)
                return (
                  <td
                    key={`${card.id}-travel`}
                    className={cn(
                      'py-3 px-4 text-center text-sm font-semibold',
                      isBestTravel && 'bg-emerald-100 text-emerald-900'
                    )}
                  >
                    {formatEarning(card.pointsPerDollarTravel)}
                  </td>
                )
              })}
            </tr>

            {/* Dining Points */}
            <tr>
              <td className="py-3 px-4 text-sm font-medium text-slate-900 bg-[#1E3A5F]/10 sticky left-0 z-10">
                Dining Points/Dollar
              </td>
              {cards.map((card) => {
                const maxDining = getMaxInColumn((c) => c.pointsPerDollarDining)
                const isBestDining = isBest(card.pointsPerDollarDining, maxDining)
                return (
                  <td
                    key={`${card.id}-dining`}
                    className={cn(
                      'py-3 px-4 text-center text-sm font-semibold',
                      isBestDining && 'bg-emerald-100 text-emerald-900'
                    )}
                  >
                    {formatEarning(card.pointsPerDollarDining)}
                  </td>
                )
              })}
            </tr>

            {/* Trip Cancellation */}
            <tr>
              <td className="py-3 px-4 text-sm font-medium text-slate-900 bg-[#1E3A5F]/10 sticky left-0 z-10">
                Trip Cancellation
              </td>
              {cards.map((card) => (
                <td
                  key={`${card.id}-cancel`}
                  className={cn(
                    'py-3 px-4 text-center',
                    card.tripCancellation && 'bg-emerald-50'
                  )}
                >
                  {card.tripCancellation ? (
                    <Check className="h-5 w-5 text-emerald-600 mx-auto" />
                  ) : (
                    <X className="h-5 w-5 text-slate-300 mx-auto" />
                  )}
                </td>
              ))}
            </tr>

            {/* Trip Delay */}
            <tr>
              <td className="py-3 px-4 text-sm font-medium text-slate-900 bg-[#1E3A5F]/10 sticky left-0 z-10">
                Trip Delay
              </td>
              {cards.map((card) => (
                <td
                  key={`${card.id}-delay`}
                  className={cn(
                    'py-3 px-4 text-center',
                    card.tripDelay && 'bg-emerald-50'
                  )}
                >
                  {card.tripDelay ? (
                    <Check className="h-5 w-5 text-emerald-600 mx-auto" />
                  ) : (
                    <X className="h-5 w-5 text-slate-300 mx-auto" />
                  )}
                </td>
              ))}
            </tr>

            {/* Lounge Access */}
            <tr>
              <td className="py-3 px-4 text-sm font-medium text-slate-900 bg-[#1E3A5F]/10 sticky left-0 z-10">
                Lounge Access
              </td>
              {cards.map((card) => (
                <td
                  key={`${card.id}-lounge`}
                  className={cn(
                    'py-3 px-4 text-center text-sm',
                    card.loungeAccess && 'bg-purple-50'
                  )}
                >
                  {card.loungeAccess ? (
                    <div className="font-semibold text-purple-700">{card.loungeAccess}</div>
                  ) : (
                    <span className="text-slate-400">—</span>
                  )}
                </td>
              ))}
            </tr>

            {/* Best For */}
            <tr>
              <td className="py-3 px-4 text-sm font-medium text-slate-900 bg-[#1E3A5F]/10 sticky left-0 z-10">
                Best For
              </td>
              {cards.map((card) => (
                <td
                  key={`${card.id}-bestfor`}
                  className="py-3 px-4 text-center text-sm text-slate-700 italic"
                >
                  {card.bestFor}
                </td>
              ))}
            </tr>

            {/* CTA Row */}
            <tr>
              <td className="py-4 px-4 bg-slate-50 sticky left-0 z-10" />
              {cards.map((card) => (
                <td key={`${card.id}-cta`} className="py-4 px-4 text-center bg-slate-50">
                  <Link
                    href={card.referralUrl}
                    className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition-colors duration-200"
                  >
                    Learn More
                  </Link>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Mobile Stack Note */}
      <p className="text-xs text-slate-500 text-center mt-4">
        💡 <strong>Tip:</strong> On smaller screens, scroll horizontally to compare all cards
      </p>
    </div>
  )
}

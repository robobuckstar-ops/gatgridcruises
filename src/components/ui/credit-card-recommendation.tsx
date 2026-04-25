'use client'

import Link from 'next/link'
import { ChevronRight, CreditCard } from 'lucide-react'
import type { CreditCard as CreditCardType } from '@/lib/credit-card-config'
import { cn } from '@/lib/utils'

interface CreditCardRecommendationProps {
  card: CreditCardType
  showEditorialTake?: boolean
  compact?: boolean
}

/**
 * Credit Card Recommendation Component
 * Editorial-style card that presents a credit card as helpful advice, not a hard sell
 */
export function CreditCardRecommendation({
  card,
  showEditorialTake = true,
  compact = false,
}: CreditCardRecommendationProps) {
  // Issuer badge colors
  const issuerColors: Record<string, string> = {
    chase: 'bg-[#1E3A5F]/20 text-blue-700',
    amex: 'bg-indigo-100 text-indigo-700',
    'capital-one': 'bg-orange-100 text-orange-700',
    citi: 'bg-sky-100 text-sky-700',
    'bank-of-america': 'bg-slate-100 text-slate-700',
    other: 'bg-gray-100 text-gray-700',
  }

  const hasReferralLink = card.referralUrl && card.referralUrl.length > 0

  const compactInner = (
    <>
      <div
        className="h-12 w-10 rounded flex-shrink-0 flex items-center justify-center text-white shadow-sm"
        style={{ backgroundColor: card.imageColor }}
      >
        <CreditCard className="h-5 w-5" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-slate-900 line-clamp-1">{card.name}</h4>
        <p className="text-xs text-emerald-600 font-medium">
          {card.signupBonus} bonus (~${card.signupBonusValue})
        </p>
      </div>
      <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-[#D4AF37] flex-shrink-0 transition-colors" />
    </>
  )

  if (compact) {
    const cls = "group flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 bg-white"
    return hasReferralLink ? (
      <Link href="/concierge" className={cls}>{compactInner}</Link>
    ) : (
      <div className={cls}>{compactInner}</div>
    )
  }

  // Full card layout
  return (
    <div className="group border border-slate-200 rounded-xl overflow-hidden bg-white hover:shadow-lg transition-all duration-200">
      <div className="flex flex-col md:flex-row">
        {/* Left: Card color visual */}
        <div
          className="h-32 md:h-auto md:w-32 flex-shrink-0 flex flex-col items-center justify-center text-white p-6"
          style={{ backgroundColor: card.imageColor }}
        >
          <CreditCard className="h-8 w-8 mb-2 opacity-90" />
          <span className="text-xs font-semibold text-center opacity-90 line-clamp-2">{card.name}</span>
        </div>

        {/* Right: Details */}
        <div className="flex-1 p-6 flex flex-col">
          {/* Header: Name + Issuer badge */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex-1">
              <h3 className="font-display text-xl font-semibold text-slate-900 mb-2">{card.name}</h3>
              <span
                className={cn(
                  'inline-block px-2.5 py-1 rounded-full text-xs font-semibold',
                  issuerColors[card.issuer] || issuerColors.other
                )}
              >
                {card.issuer === 'bank-of-america'
                  ? 'Bank of America'
                  : card.issuer === 'capital-one'
                    ? 'Capital One'
                    : card.issuer.charAt(0).toUpperCase() + card.issuer.slice(1)}
              </span>
            </div>
          </div>

          {/* Signup bonus + value */}
          <div className="mb-4 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-emerald-600 font-medium">Welcome Bonus</p>
                <p className="text-lg font-bold text-emerald-700">{card.signupBonus}</p>
                <p className="text-xs text-emerald-600">Worth ~${card.signupBonusValue}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-600 font-medium">Annual Fee</p>
                <p className="text-2xl font-bold text-slate-900">${card.annualFee}</p>
              </div>
            </div>
            {card.signupBonusRequirement && (
              <p className="text-xs text-emerald-700 mt-2 italic">{card.signupBonusRequirement}</p>
            )}
          </div>

          {/* Highlights */}
          <div className="mb-4">
            <p className="text-xs font-semibold text-slate-700 mb-2">Key Benefits</p>
            <ul className="space-y-1.5">
              {card.highlights.slice(0, 3).map((highlight, idx) => (
                <li key={idx} className="flex gap-2 text-sm text-slate-700">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Travel insurance badges */}
          <div className="mb-4 flex flex-wrap gap-2">
            {card.tripCancellation && (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-[#1E3A5F]/10 text-blue-700 text-xs font-medium">
                <span>✓</span> Trip Cancellation
              </span>
            )}
            {card.tripDelay && (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-[#1E3A5F]/10 text-blue-700 text-xs font-medium">
                <span>✓</span> Trip Delay
              </span>
            )}
            {card.loungeAccess && (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-slate-50 text-slate-700 text-xs font-medium">
                <span>✓</span> {card.loungeAccess}
              </span>
            )}
          </div>

          {/* Editorial take */}
          {showEditorialTake && (
            <p className="text-sm italic text-slate-700 mb-4 leading-relaxed">"{card.editorial_take}"</p>
          )}

          {/* CTA */}
          {hasReferralLink && (
            <div className="mt-auto">
              <Link
                href="/concierge"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#1E3A5F] hover:bg-[#2a4f7a] text-white font-medium text-sm transition-colors duration-200"
              >
                Learn More
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

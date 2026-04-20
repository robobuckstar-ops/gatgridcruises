'use client'

import { TrendingDown, TrendingUp, Minus } from 'lucide-react'
import type { PriceSnapshot } from '@/types/database'
import { formatPrice } from '@/lib/utils'

interface PriceTrendProps {
  snapshots: PriceSnapshot[]
}

export function PriceTrend({ snapshots }: PriceTrendProps) {
  if (snapshots.length < 2) {
    return (
      <span className="inline-flex items-center gap-1 text-xs text-slate-500">
        <Minus className="h-3 w-3" />
        <span>Insufficient data</span>
      </span>
    )
  }

  const recentSnapshots = snapshots.slice(-2)
  const previousPrice = recentSnapshots[0].lowest_price
  const currentPrice = recentSnapshots[1].lowest_price

  const difference = currentPrice - previousPrice
  const isIncreasing = difference > 0
  const isDecreasing = difference < 0
  const isStable = difference === 0

  if (isStable) {
    return (
      <span className="inline-flex items-center gap-1 text-xs text-slate-500">
        <Minus className="h-3 w-3" />
        <span>Stable</span>
      </span>
    )
  }

  if (isDecreasing) {
    return (
      <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-medium">
        <TrendingDown className="h-3 w-3" />
        <span>↓ {formatPrice(Math.abs(difference))}</span>
      </span>
    )
  }

  return (
    <span className="inline-flex items-center gap-1 text-xs text-red-600 font-medium">
      <TrendingUp className="h-3 w-3" />
      <span>↑ {formatPrice(difference)}</span>
    </span>
  )
}

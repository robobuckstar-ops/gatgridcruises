'use client'

import { AlertTriangle, CheckCircle2, Clock, TrendingDown } from 'lucide-react'
import type { PriceSnapshot } from '@/types/database'
import { formatPrice, daysUntil } from '@/lib/utils'

interface BuyWaitBadgeProps {
  currentPrice: number
  snapshots: PriceSnapshot[]
  sailDate: string
}

export function BuyWaitBadge({ currentPrice, snapshots, sailDate }: BuyWaitBadgeProps) {
  if (snapshots.length < 2) {
    return null
  }

  // Calculate metrics
  const historicalAvg = snapshots.reduce((sum, s) => sum + s.lowest_price, 0) / snapshots.length
  const pricePercentOfAvg = (currentPrice / historicalAvg) * 100
  const daysUntilSail = daysUntil(sailDate)
  const isCloseToDepature = daysUntilSail < 30

  // Calculate price trend (compare last 2 snapshots)
  const recentSnapshots = snapshots.slice(-2)
  const previousPrice = recentSnapshots[0].lowest_price
  const isRising = currentPrice > previousPrice
  const priceDelta = Math.abs(currentPrice - previousPrice)

  // Determine recommendation
  type RecommendationType = 'buy-now' | 'good-time' | 'fair' | 'consider-waiting' | 'overpriced'
  let recommendation: RecommendationType = 'fair'
  let color = 'amber' // fair
  let icon = Clock
  let label = 'Fair Price'
  let description = 'Price is near historical average'

  // Overpriced (15%+ above)
  if (pricePercentOfAvg >= 115) {
    recommendation = 'overpriced'
    color = 'red'
    icon = AlertTriangle
    label = 'Overpriced'
    description = `${Math.round(pricePercentOfAvg - 100)}% above average — wait for a drop`
  }
  // Consider waiting (above average, falling or stable)
  else if (pricePercentOfAvg > 105 && !isRising) {
    recommendation = 'consider-waiting'
    color = 'orange'
    icon = TrendingDown
    label = 'Consider Waiting'
    description = 'Price is above average and falling — better deals coming'
  }
  // Fair price (within 5% of average)
  else if (pricePercentOfAvg >= 95 && pricePercentOfAvg <= 105) {
    recommendation = 'fair'
    color = 'amber'
    icon = Clock
    label = 'Fair Price'
    description = 'Price is near historical average'
  }
  // Good time to buy (below average)
  else if (pricePercentOfAvg < 95) {
    // Check if urgent (close to departure)
    if (isCloseToDepature) {
      recommendation = 'buy-now'
      color = 'green'
      icon = CheckCircle2
      label = 'Act Now'
      description = 'Price is well below average — don\'t wait'
    }
    // Check if price is rising
    else if (isRising) {
      recommendation = 'buy-now'
      color = 'green'
      icon = CheckCircle2
      label = 'Great Time to Book'
      description = 'Price is well below average — don\'t wait'
    }
    // Just good timing
    else {
      recommendation = 'good-time'
      color = 'blue'
      icon = CheckCircle2
      label = 'Great Time to Book'
      description = 'Price is well below average — don\'t wait'
    }
  }

  const colorMap = {
    green: 'bg-emerald-50 border-emerald-200 text-emerald-900',
    blue: 'bg-blue-50 border-blue-200 text-blue-900',
    amber: 'bg-amber-50 border-amber-200 text-amber-900',
    orange: 'bg-orange-50 border-orange-200 text-orange-900',
    red: 'bg-red-50 border-red-200 text-red-900',
  }

  const iconColorMap = {
    green: 'text-emerald-600',
    blue: 'text-blue-600',
    amber: 'text-amber-600',
    orange: 'text-orange-600',
    red: 'text-red-600',
  }

  const Icon = icon

  return (
    <div className={`border rounded-lg p-4 ${colorMap[color as keyof typeof colorMap]}`}>
      <div className="flex items-start gap-3">
        <Icon className={`h-5 w-5 flex-shrink-0 mt-0.5 ${iconColorMap[color as keyof typeof iconColorMap]}`} />
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-sm mb-1">{label}</div>
          <p className="text-xs opacity-85 mb-2">{description}</p>
          <div className="flex items-center gap-2 text-xs opacity-75">
            <span>Current: <span className="font-semibold">{formatPrice(currentPrice)}</span></span>
            <span>•</span>
            <span>Avg: <span className="font-semibold">{formatPrice(Math.round(historicalAvg))}</span></span>
            {daysUntilSail >= 0 && (
              <>
                <span>•</span>
                <span>Departs in <span className="font-semibold">{daysUntilSail} days</span></span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

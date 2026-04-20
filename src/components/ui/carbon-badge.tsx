'use client'

import { useState } from 'react'
import { Leaf } from 'lucide-react'
import { calculateCarbonFootprint, getRatingColor } from '@/lib/carbon-calculator'

interface CarbonBadgeProps {
  shipTonnage: number
  shipCapacity: number
  shipYear: number
  seaDays: number
  portDays: number
  size?: 'sm' | 'md'
}

export function CarbonBadge({
  shipTonnage,
  shipCapacity,
  shipYear,
  seaDays,
  portDays,
  size = 'md',
}: CarbonBadgeProps) {
  const [showTooltip, setShowTooltip] = useState(false)
  const estimate = calculateCarbonFootprint(shipTonnage, shipCapacity, shipYear, seaDays, portDays)
  const colors = getRatingColor(estimate.rating)

  const ratingLabel =
    estimate.rating === 'low'
      ? 'Low Impact'
      : estimate.rating === 'moderate'
        ? 'Moderate Impact'
        : 'High Impact'

  if (size === 'sm') {
    return (
      <div className="relative inline-flex items-center gap-1">
        <div
          className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold ${colors.bgColor} ${colors.textColor}`}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <Leaf className="w-3 h-3" />
          {ratingLabel}
        </div>

        {showTooltip && (
          <div className="absolute bottom-full left-0 mb-2 w-48 bg-slate-900 text-white rounded-lg shadow-lg p-3 z-50 text-xs">
            <div className="font-semibold mb-2">{estimate.totalKgCO2.toLocaleString()} kg CO2</div>
            <div className="space-y-1">
              <div>Per day: {estimate.perDayKgCO2.toLocaleString()} kg</div>
              <div>Flight equiv: {estimate.equivalentFlightMiles.toLocaleString()} miles</div>
              <div>Offset cost: ${estimate.offsetCostUSD}</div>
            </div>
          </div>
        )}
      </div>
    )
  }

  // Medium size - card badge
  return (
    <div className="relative">
      <div
        className={`flex items-center gap-2 px-4 py-3 rounded-lg border-2 ${colors.bgColor} ${colors.borderColor} cursor-help`}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/50">
          <Leaf className={`w-5 h-5 ${colors.textColor}`} />
        </div>
        <div>
          <div className={`font-semibold ${colors.textColor}`}>Carbon Impact</div>
          <div className={`text-sm ${colors.textColor}`}>{ratingLabel}</div>
        </div>
      </div>

      {showTooltip && (
        <div className="absolute right-0 top-full mt-2 w-72 bg-slate-900 text-white rounded-lg shadow-lg p-4 z-50">
          <div className="font-semibold text-base mb-3">
            {estimate.totalKgCO2.toLocaleString()} kg CO2 per passenger
          </div>

          <div className="space-y-2 mb-4 text-sm">
            <div className="flex justify-between">
              <span>Per day:</span>
              <span className="font-semibold">{estimate.perDayKgCO2.toLocaleString()} kg</span>
            </div>
            <div className="flex justify-between border-t border-white/20 pt-2">
              <span>Equivalent to:</span>
              <span></span>
            </div>
            <div className="flex justify-between">
              <span>→ Flying</span>
              <span className="font-semibold">{estimate.equivalentFlightMiles.toLocaleString()} miles</span>
            </div>
            <div className="flex justify-between">
              <span>→ Driving</span>
              <span className="font-semibold">{estimate.equivalentDrivingMiles.toLocaleString()} miles</span>
            </div>
            <div className="flex justify-between border-t border-white/20 pt-2">
              <span>Offset cost:</span>
              <span className="font-semibold">${estimate.offsetCostUSD}</span>
            </div>
          </div>

          <a
            href="https://carbonfund.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs underline hover:text-blue-200"
          >
            Learn about carbon offsets →
          </a>
        </div>
      )}
    </div>
  )
}

'use client'

import { cn } from '@/lib/utils'

interface DealScoreBadgeProps {
  score: number
  label?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
  showTooltip?: boolean
}

/**
 * Get color classes based on score
 * Green (80+), Blue (60-79), Amber (40-59), Red (below 40)
 */
function getColorClasses(score: number): {
  ring: string
  fill: string
  text: string
} {
  if (score >= 80) {
    return {
      ring: 'stroke-emerald-500',
      fill: 'fill-emerald-500',
      text: 'text-emerald-700',
    }
  } else if (score >= 60) {
    return {
      ring: 'stroke-blue-500',
      fill: 'fill-blue-500',
      text: 'text-[#162d4a]',
    }
  } else if (score >= 40) {
    return {
      ring: 'stroke-amber-500',
      fill: 'fill-amber-500',
      text: 'text-amber-700',
    }
  } else {
    return {
      ring: 'stroke-red-500',
      fill: 'fill-red-500',
      text: 'text-red-700',
    }
  }
}

/**
 * Get size configuration
 */
function getSizeConfig(size: 'sm' | 'md' | 'lg'): {
  width: number
  height: number
  radius: number
  circumference: number
  scoreSize: string
  labelSize: string
  containerClass: string
} {
  const configs = {
    sm: {
      width: 40,
      height: 40,
      radius: 18,
      circumference: 113.1,
      scoreSize: 'text-sm',
      labelSize: 'text-xs',
      containerClass: 'w-10 h-10',
    },
    md: {
      width: 56,
      height: 56,
      radius: 26,
      circumference: 163.4,
      scoreSize: 'text-xl',
      labelSize: 'text-xs',
      containerClass: 'w-14 h-14',
    },
    lg: {
      width: 72,
      height: 72,
      radius: 32,
      circumference: 201,
      scoreSize: 'text-3xl',
      labelSize: 'text-sm',
      containerClass: 'w-18 h-18',
    },
  }
  return configs[size]
}

/**
 * Get accessible label based on score
 */
function getScoreLabel(score: number): string {
  if (score >= 80) return 'Exceptional Deal'
  if (score >= 60) return 'Great Value'
  if (score >= 40) return 'Fair Price'
  return 'Consider Waiting'
}

export function DealScoreBadge({
  score,
  label,
  size = 'md',
  className,
  showTooltip = false,
}: DealScoreBadgeProps) {
  const config = getSizeConfig(size)
  const colors = getColorClasses(score)
  const scoreLabel = getScoreLabel(score)

  // Calculate stroke dash offset for the progress ring
  const strokeDashoffset = config.circumference * (1 - score / 100)

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center relative group',
        config.containerClass,
        className
      )}
    >
      {/* SVG Circular gauge */}
      <svg
        width={config.width}
        height={config.height}
        viewBox={`0 0 ${config.width} ${config.height}`}
        className="absolute inset-0"
        aria-hidden="true"
        role="img"
      >
        {/* Background circle */}
        <circle
          cx={config.width / 2}
          cy={config.height / 2}
          r={config.radius}
          className="stroke-slate-200"
          strokeWidth="2"
          fill="none"
        />

        {/* Progress ring */}
        <circle
          cx={config.width / 2}
          cy={config.height / 2}
          r={config.radius}
          className={cn('transition-all duration-300', colors.ring)}
          strokeWidth="2"
          fill="none"
          strokeDasharray={config.circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{
            transform: 'rotate(-90deg)',
            transformOrigin: `${config.width / 2}px ${config.height / 2}px`,
          }}
        />
      </svg>

      {/* Score text and label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-0">
        <span className={cn('font-bold', colors.text, config.scoreSize)}>
          {score}
        </span>
        {label && (
          <span className={cn('font-medium', colors.text, config.labelSize)}>
            {label}
          </span>
        )}
      </div>

      {/* Accessible label for screen readers */}
      <span className="sr-only">
        Deal score {score} out of 100, {scoreLabel}. Based on price discount, urgency, ship popularity, and overall deal quality.
      </span>

      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-3 bg-slate-900 text-white text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
          <p className="font-semibold mb-1">Deal Score (0–100)</p>
          <p className="mb-2">{scoreLabel}</p>
          <p className="text-slate-200">
            Based on price discount, urgency (days to departure), ship popularity, and overall deal quality.
          </p>
        </div>
      )}
    </div>
  )
}

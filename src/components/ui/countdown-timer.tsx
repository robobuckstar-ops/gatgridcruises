'use client'

import { useState, useEffect } from 'react'
import { Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CountdownTimerProps {
  sailDate: string
  size?: 'sm' | 'md' | 'lg'
}

type TimeLeft = { days: number; hours: number } | null

function computeTimeLeft(sailDate: string): TimeLeft {
  const target = new Date(sailDate)
  const diff = target.getTime() - Date.now()
  if (diff <= 0) return null
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  return { days, hours }
}

export function CountdownTimer({ sailDate, size = 'md' }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => computeTimeLeft(sailDate))
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setTimeLeft(computeTimeLeft(sailDate))
    const interval = setInterval(() => setTimeLeft(computeTimeLeft(sailDate)), 60000)
    return () => clearInterval(interval)
  }, [sailDate])

  if (!timeLeft) {
    // Only render "Departed" after client mount confirms the sail date is in the past;
    // avoids stale-build SSR HTML showing "Departed" for future sailings.
    if (!mounted) return null
    return (
      <div className="text-xs text-slate-500 font-medium">
        Departed
      </div>
    )
  }

  // Determine color based on days remaining
  let colorClass = 'text-[#1E3A5F] bg-[#1E3A5F]/10 border-blue-200'
  if (timeLeft.days < 7) {
    colorClass = 'text-red-700 bg-red-50 border-red-200 animate-pulse'
  } else if (timeLeft.days < 14) {
    colorClass = 'text-red-600 bg-red-50 border-red-200'
  } else if (timeLeft.days < 30) {
    colorClass = 'text-amber-600 bg-amber-50 border-amber-200'
  }

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs gap-1',
    md: 'px-2.5 py-1.5 text-sm gap-1.5',
    lg: 'px-3 py-2 text-base gap-2',
  }

  const urgencyLabel = () => {
    if (timeLeft.days < 7) return 'Last-minute deal!'
    if (timeLeft.days < 14) return 'Very soon'
    if (timeLeft.days < 30) return 'Coming up'
    return 'Upcoming'
  }

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 rounded-lg border font-semibold whitespace-nowrap',
        colorClass,
        sizeClasses[size]
      )}
      aria-live="polite"
      aria-atomic="true"
      aria-label={`${timeLeft.days} days and ${timeLeft.hours} hours until departure. ${urgencyLabel()}`}
    >
      <Clock
        className={cn(
          'shrink-0',
          size === 'sm' ? 'h-3 w-3' : size === 'lg' ? 'h-5 w-5' : 'h-4 w-4'
        )}
        aria-hidden="true"
      />
      <span>{timeLeft.days}d {timeLeft.hours}h</span>
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { X, Clock, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const BOOKING_DEADLINE = new Date('2026-06-14T23:59:59')

function useCountdown(target: Date) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const calculate = () => {
      const now = new Date()
      const diff = target.getTime() - now.getTime()
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      })
    }
    calculate()
    const id = setInterval(calculate, 1000)
    return () => clearInterval(id)
  }, [target])

  return timeLeft
}

export function FamilyPromoBanner() {
  const [dismissed, setDismissed] = useState(true)
  const countdown = useCountdown(BOOKING_DEADLINE)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setDismissed(localStorage.getItem('family-promo-dismissed') === '1')
    }
  }, [])

  const expired =
    countdown.days === 0 && countdown.hours === 0 && countdown.minutes === 0 && countdown.seconds === 0
  if (dismissed || expired) return null

  const handleDismiss = () => {
    localStorage.setItem('family-promo-dismissed', '1')
    setDismissed(true)
  }

  return (
    <div className="bg-gradient-to-r from-[#0a1628] via-[#1E3A5F] to-[#0a1628] border-b border-[#D4AF37]/30 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center gap-3">
          <div className="flex-1 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 min-w-0">
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-lg" aria-hidden="true">👨‍👩‍👧‍👦</span>
              <div>
                <span className="text-[#D4AF37] font-bold text-sm">50% Off Up to 3 Kids</span>
                <span className="text-white/60 text-sm ml-2 hidden sm:inline">
                  · Oct 2026–Mar 2027 sailings
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-blue-200 flex-shrink-0">
              <Clock className="h-3.5 w-3.5 text-[#D4AF37]" aria-hidden="true" />
              <span>Book by Jun 14:</span>
              <span className="font-mono font-bold text-white tabular-nums">
                {countdown.days}d {String(countdown.hours).padStart(2, '0')}h{' '}
                {String(countdown.minutes).padStart(2, '0')}m {String(countdown.seconds).padStart(2, '0')}s
              </span>
            </div>
          </div>
          <Link
            href="/deals"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#D4AF37] text-[#1E3A5F] text-xs font-bold rounded-lg hover:bg-yellow-300 transition-colors whitespace-nowrap flex-shrink-0"
          >
            Browse Deals
            <ArrowRight className="h-3 w-3" aria-hidden="true" />
          </Link>
          <button
            onClick={handleDismiss}
            className="p-1.5 text-white/40 hover:text-white transition-colors flex-shrink-0 rounded"
            aria-label="Dismiss family promo banner"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

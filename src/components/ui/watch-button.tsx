'use client'

import { useState, useEffect } from 'react'
import { Eye, EyeOff } from 'lucide-react'

interface WatchButtonProps {
  sailingId: string
  sailingName: string
  currentPrice: number
}

export function WatchButton({ sailingId, sailingName, currentPrice }: WatchButtonProps) {
  const [watching, setWatching] = useState(false)

  useEffect(() => {
    // Check localStorage for watchlist
    const watchlist = JSON.parse(localStorage.getItem('ggc-watchlist') || '[]')
    setWatching(watchlist.some((w: any) => w.id === sailingId))
  }, [sailingId])

  const toggle = () => {
    const watchlist = JSON.parse(localStorage.getItem('ggc-watchlist') || '[]')
    if (watching) {
      const updated = watchlist.filter((w: any) => w.id !== sailingId)
      localStorage.setItem('ggc-watchlist', JSON.stringify(updated))
      setWatching(false)
    } else {
      watchlist.push({
        id: sailingId,
        name: sailingName,
        priceWhenAdded: currentPrice,
        addedAt: new Date().toISOString(),
      })
      localStorage.setItem('ggc-watchlist', JSON.stringify(watchlist))
      setWatching(true)
    }
  }

  return (
    <button
      onClick={toggle}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
        watching
          ? 'bg-gold/10 text-amber-700 border border-amber-300 hover:bg-gold/20'
          : 'bg-white text-slate-600 border border-slate-300 hover:bg-slate-50 hover:text-navy'
      }`}
      aria-pressed={watching}
      aria-label={watching ? `Stop watching ${sailingName} for price changes` : `Watch ${sailingName} for price changes`}
    >
      {watching ? <EyeOff className="h-4 w-4" aria-hidden="true" /> : <Eye className="h-4 w-4" aria-hidden="true" />}
      {watching ? 'Watching' : 'Watch Price'}
    </button>
  )
}

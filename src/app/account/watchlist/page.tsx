'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getCurrentUser } from '@/lib/auth'
import { Heart, TrendingDown, TrendingUp } from 'lucide-react'

interface WatchedSailing {
  id: string
  name: string
  ship: string
  date: string
  priceWhenAdded: number
  currentPrice: number
  addedAt: string
}

export default function WatchlistPage() {
  const [watchlist, setWatchlist] = useState<WatchedSailing[]>([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function checkAuth() {
      try {
        const user = await getCurrentUser()
        setIsLoggedIn(!!user)
      } catch {
        setIsLoggedIn(false)
      }

      if (typeof window !== 'undefined') {
        const stored = JSON.parse(localStorage.getItem('ggc-watchlist') || '[]')
        setWatchlist(stored)
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  const removeSailing = (sailingId: string) => {
    const updated = watchlist.filter((w) => w.id !== sailingId)
    setWatchlist(updated)
    localStorage.setItem('ggc-watchlist', JSON.stringify(updated))
  }

  const priceChange = (current: number, original: number) => {
    return current - original
  }

  const priceChangePercent = (current: number, original: number) => {
    if (original === 0) return 0
    return Math.round(((current - original) / original) * 100)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a1628] to-[#1E3A5F]">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <p className="text-blue-100">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a1628] to-[#1E3A5F]">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center py-16">
            <Heart className="h-16 w-16 text-blue-600 mx-auto mb-6 opacity-50" />
            <h1 className="text-4xl font-bold text-white mb-4">Your Watchlist</h1>
            <p className="text-lg text-blue-100 mb-8">
              Sign in to track Disney cruise prices
            </p>
            <Link
              href="/auth/login"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1628] to-[#1E3A5F]">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">Your Watchlist</h1>
          <p className="text-blue-100">Track prices on sailings you love</p>
        </div>

        {watchlist.length === 0 ? (
          <div className="bg-white border border-slate-300 rounded-lg p-12 text-center">
            <Heart className="h-16 w-16 text-blue-600 mx-auto mb-6 opacity-30" />
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              You're not watching any sailings yet
            </h2>
            <p className="text-slate-600 mb-8">
              Browse deals and click 'Watch' to get started.
            </p>
            <Link
              href="/deals"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              Browse Deals
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {watchlist.map((sailing) => {
              const change = priceChange(sailing.currentPrice, sailing.priceWhenAdded)
              const changePercent = priceChangePercent(
                sailing.currentPrice,
                sailing.priceWhenAdded
              )
              const isPriceDrop = change < 0

              return (
                <div
                  key={sailing.id}
                  className="bg-white border border-slate-300 rounded-lg p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-slate-900 mb-2">
                        {sailing.name}
                      </h3>
                      <div className="grid grid-cols-2 gap-4 text-sm text-slate-600">
                        <div>
                          <span className="opacity-75">Ship:</span>
                          <p className="text-slate-900 font-medium">{sailing.ship}</p>
                        </div>
                        <div>
                          <span className="opacity-75">Departure:</span>
                          <p className="text-slate-900 font-medium">
                            {new Date(sailing.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="bg-slate-50 border border-slate-200 rounded p-3">
                          <p className="text-xs text-slate-600 mb-1">When Added</p>
                          <p className="text-slate-900 font-semibold">
                            ${sailing.priceWhenAdded}
                          </p>
                        </div>
                        <div className="bg-slate-50 border border-slate-200 rounded p-3">
                          <p className="text-xs text-slate-600 mb-1">Current</p>
                          <p className="text-slate-900 font-semibold">
                            ${sailing.currentPrice}
                          </p>
                        </div>
                        <div
                          className={`rounded p-3 ${
                            isPriceDrop
                              ? 'bg-green-50 border border-green-200'
                              : 'bg-red-50 border border-red-200'
                          }`}
                        >
                          <p className="text-xs text-slate-600 mb-1">Change</p>
                          <div
                            className={`font-semibold flex items-center justify-center gap-1 ${
                              isPriceDrop ? 'text-green-600' : 'text-red-600'
                            }`}
                          >
                            {isPriceDrop ? (
                              <TrendingDown className="h-4 w-4" />
                            ) : (
                              <TrendingUp className="h-4 w-4" />
                            )}
                            {isPriceDrop ? '-' : '+'}${Math.abs(change)} ({changePercent}
                            %)
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => removeSailing(sailing.id)}
                        className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

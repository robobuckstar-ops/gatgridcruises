'use client'

import { useState } from 'react'
import { Minus, Plus, Users } from 'lucide-react'

interface GuestCountSelectorProps {
  value: number
  onChange: (total: number) => void
  className?: string
}

export function GuestCountSelector({ onChange, className = '' }: GuestCountSelectorProps) {
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)

  function changeAdults(delta: number) {
    const next = Math.max(1, Math.min(4, adults + delta))
    setAdults(next)
    onChange(Math.min(next + children, 4))
  }

  function changeChildren(delta: number) {
    const next = Math.max(0, Math.min(3, children + delta))
    setChildren(next)
    onChange(Math.min(adults + next, 4))
  }

  const total = Math.min(adults + children, 4)

  return (
    <div className={`flex flex-wrap items-center gap-4 ${className}`}>
      <div className="flex items-center gap-1.5 text-sm font-medium text-slate-600">
        <Users className="w-4 h-4" />
        <span>Guests</span>
      </div>

      {/* Adults */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-slate-500 w-12">Adults</span>
        <button
          onClick={() => changeAdults(-1)}
          disabled={adults <= 1}
          className="w-7 h-7 rounded-full border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <Minus className="w-3 h-3" />
        </button>
        <span className="w-5 text-center text-sm font-semibold text-slate-800">{adults}</span>
        <button
          onClick={() => changeAdults(1)}
          disabled={total >= 4}
          className="w-7 h-7 rounded-full border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <Plus className="w-3 h-3" />
        </button>
      </div>

      {/* Children */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-slate-500 w-12">Children</span>
        <button
          onClick={() => changeChildren(-1)}
          disabled={children <= 0}
          className="w-7 h-7 rounded-full border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <Minus className="w-3 h-3" />
        </button>
        <span className="w-5 text-center text-sm font-semibold text-slate-800">{children}</span>
        <button
          onClick={() => changeChildren(1)}
          disabled={total >= 4}
          className="w-7 h-7 rounded-full border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <Plus className="w-3 h-3" />
        </button>
      </div>

      {children > 0 && (
        <span className="text-xs text-slate-400 italic">Children typically pay ~60% of adult fare</span>
      )}
    </div>
  )
}

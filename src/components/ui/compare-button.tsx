'use client'

import { useCompare } from '@/context/compare-context'
import { Plus, X } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import type { Sailing } from '@/types/database'

interface CompareButtonProps {
  sailing: Sailing
  size?: 'sm' | 'md'
}

export function CompareButton({ sailing, size = 'md' }: CompareButtonProps) {
  const { selectedSailings, addSailing, removeSailing, isFull } = useCompare()
  const [isSelected, setIsSelected] = useState(false)
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    setIsSelected(selectedSailings.includes(sailing.id))
  }, [selectedSailings, sailing.id])

  const handleToggle = () => {
    if (isSelected) {
      removeSailing(sailing.id)
    } else {
      if (isFull) {
        setShowToast(true)
        setTimeout(() => setShowToast(false), 3000)
      } else {
        addSailing(sailing.id)
      }
    }
  }

  if (size === 'sm') {
    return (
      <>
        <button
          onClick={handleToggle}
          disabled={isFull && !isSelected}
          className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-semibold transition-colors ${
            isSelected
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : isFull
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-slate-100 text-slate-700 hover:bg-[#1E3A5F]/20 hover:text-blue-700'
          }`}
        >
          {isSelected ? (
            <>
              <X className="w-4 h-4" />
              Remove
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" />
              Compare
            </>
          )}
        </button>
        {showToast && (
          <div className="fixed bottom-4 right-4 bg-amber-100 border border-amber-300 text-amber-800 px-4 py-3 rounded-lg text-sm font-medium shadow-lg">
            Maximum 4 sailings can be compared
          </div>
        )}
      </>
    )
  }

  return (
    <>
      <button
        onClick={handleToggle}
        disabled={isFull && !isSelected}
        className={`w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
          isSelected
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : isFull
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
              : 'bg-[#1E3A5F]/10 text-blue-700 hover:bg-[#1E3A5F]/20 border border-blue-200'
        }`}
      >
        {isSelected ? (
          <>
            <X className="w-4 h-4" />
            Remove from Compare
          </>
        ) : (
          <>
            <Plus className="w-4 h-4" />
            Add to Compare
          </>
        )}
      </button>
      {showToast && (
        <div className="fixed bottom-4 right-4 bg-amber-100 border border-amber-300 text-amber-800 px-4 py-3 rounded-lg text-sm font-medium shadow-lg">
          Maximum 4 sailings can be compared
        </div>
      )}
    </>
  )
}

// Floating Compare Bar - shown when sailings are selected
export function CompareBar() {
  const { selectedSailings, clearAll } = useCompare()

  if (selectedSailings.length === 0) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-blue-600 shadow-2xl z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <p className="font-semibold text-slate-900 text-lg">
            {selectedSailings.length} sailing{selectedSailings.length !== 1 ? 's' : ''} selected
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={clearAll}
            className="px-4 py-2 text-slate-700 hover:text-slate-900 font-semibold transition-colors"
          >
            Clear All
          </button>
          <Link
            href="/tools/compare"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Compare Now
            <span className="bg-blue-700 text-white text-xs rounded-full px-2 py-0.5 font-bold">
              {selectedSailings.length}
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}

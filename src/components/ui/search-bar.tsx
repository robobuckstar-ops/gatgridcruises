'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { Search, X, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SearchBarProps {
  onSearch: (query: string) => void
  isLoading?: boolean
  placeholder?: string
}

export function SearchBar({ onSearch, isLoading = false, placeholder = 'Try: "family Caribbean cruise under $5000 in summer"' }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (debounceTimer) {
      clearTimeout(debounceTimer)
    }

    const timer = setTimeout(() => {
      onSearch(query)
      // Announce search results to screen readers
      if (query && resultsRef.current) {
        const announcement = document.createElement('div')
        announcement.setAttribute('role', 'status')
        announcement.setAttribute('aria-live', 'polite')
        announcement.setAttribute('aria-atomic', 'true')
        announcement.className = 'sr-only'
        announcement.textContent = `Search results updated for "${query}"`
        resultsRef.current.appendChild(announcement)
        setTimeout(() => announcement.remove(), 1000)
      }
    }, 300)

    setDebounceTimer(timer)

    return () => clearTimeout(timer)
  }, [query, onSearch])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setQuery('')
      setIsFocused(false)
    }
  }

  const handleClear = useCallback(() => {
    setQuery('')
  }, [])

  return (
    <form role="search" className="relative w-full max-w-2xl mx-auto" onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="search-input" className="sr-only">
        Search for cruises
      </label>
      <div
        className={cn(
          'relative flex items-center rounded-full border-2 transition-all duration-200',
          isFocused
            ? 'border-blue-400 shadow-lg shadow-blue-100 bg-white'
            : 'border-slate-200 bg-white hover:border-slate-300'
        )}
      >
        {/* Microphone icon (decorative) */}
        <div className="pl-4 text-slate-400" aria-hidden="true">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4"
            />
          </svg>
        </div>

        {/* Input */}
        <input
          id="search-input"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 px-4 py-3 bg-transparent text-slate-900 placeholder-slate-400 outline-none text-base focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-blue-600"
          aria-label="Search for cruises using natural language, e.g., family Caribbean cruise under 5000 in summer"
          aria-describedby="search-help"
        />

        {/* Loading indicator */}
        {isLoading && (
          <div className="pr-3 text-blue-500 animate-spin" aria-label="Loading search results">
            <Loader2 className="w-5 h-5" aria-hidden="true" />
          </div>
        )}

        {/* Clear button */}
        {query && !isLoading && (
          <button
            onClick={handleClear}
            className="pr-3 text-slate-400 hover:text-slate-600 transition-colors rounded-lg focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-blue-600"
            aria-label="Clear search query"
            type="button"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        )}

        {/* Search icon */}
        {!query && !isLoading && (
          <div className="pr-4 text-slate-400" aria-hidden="true">
            <Search className="w-5 h-5" />
          </div>
        )}
      </div>

      {/* Results container for announcements */}
      <div ref={resultsRef} aria-live="polite" aria-atomic="true" className="sr-only" />

      {/* Keyboard shortcut hint */}
      <div id="search-help" className="mt-2 text-center text-xs text-slate-500">
        Press <kbd className="px-2 py-1 bg-slate-100 rounded border border-slate-200">⌘K</kbd> to search
      </div>
    </form>
  )
}

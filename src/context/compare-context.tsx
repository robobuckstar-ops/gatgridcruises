'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

interface CompareContextType {
  selectedSailings: string[]
  addSailing: (sailingId: string) => void
  removeSailing: (sailingId: string) => void
  clearAll: () => void
  isFull: boolean
}

const CompareContext = createContext<CompareContextType | undefined>(undefined)

export function CompareProvider({ children }: { children: ReactNode }) {
  const [selectedSailings, setSelectedSailings] = useState<string[]>([])

  const addSailing = (sailingId: string) => {
    if (selectedSailings.length < 4 && !selectedSailings.includes(sailingId)) {
      setSelectedSailings([...selectedSailings, sailingId])
    }
  }

  const removeSailing = (sailingId: string) => {
    setSelectedSailings(selectedSailings.filter(id => id !== sailingId))
  }

  const clearAll = () => {
    setSelectedSailings([])
  }

  const isFull = selectedSailings.length >= 4

  return (
    <CompareContext.Provider value={{ selectedSailings, addSailing, removeSailing, clearAll, isFull }}>
      {children}
    </CompareContext.Provider>
  )
}

export function useCompare() {
  const context = useContext(CompareContext)
  if (context === undefined) {
    throw new Error('useCompare must be used within a CompareProvider')
  }
  return context
}

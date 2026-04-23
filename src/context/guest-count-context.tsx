'use client'

import { createContext, useContext, useState } from 'react'

interface GuestCountContextType {
  guests: number
  setGuests: (n: number) => void
}

const GuestCountContext = createContext<GuestCountContextType>({
  guests: 2,
  setGuests: () => {},
})

export function GuestCountProvider({ children }: { children: React.ReactNode }) {
  const [guests, setGuests] = useState(2)
  return (
    <GuestCountContext.Provider value={{ guests, setGuests }}>
      {children}
    </GuestCountContext.Provider>
  )
}

export function useGuestCount() {
  return useContext(GuestCountContext)
}

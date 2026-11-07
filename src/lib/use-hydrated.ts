'use client'

import { useEffect, useState } from 'react'

/**
 * False until React has attached its handlers. A submit before that is a plain
 * browser form submit: the page reloads, the lead is lost, and what they typed
 * lands in the URL. Lead forms keep their submit button disabled until this is true.
 */
export function useHydrated(): boolean {
  const [hydrated, setHydrated] = useState(false)
  useEffect(() => setHydrated(true), [])
  return hydrated
}

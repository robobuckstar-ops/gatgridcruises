'use client'

import type { ReactNode } from 'react'
import { usePathname } from 'next/navigation'

/** Leaves a site-wide block off the listed pages, e.g. forms on a thank-you page. */
export function HideOnRoutes({ paths, children }: { paths: string[]; children: ReactNode }) {
  const pathname = usePathname()
  return paths.includes(pathname) ? null : <>{children}</>
}

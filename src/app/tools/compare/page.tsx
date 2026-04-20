import { Metadata } from 'next'
import { getSailings } from '@/lib/data'
import { CompareTool } from './compare-tool'

export const metadata: Metadata = {
  title: 'Compare Sailings — Side-by-Side Disney Cruise Comparison',
  description: 'Compare up to 4 Disney cruise sailings side by side. See prices, ships, itineraries, cabin categories, and deal scores.',
}

export default function ComparePage() {
  const sailings = getSailings()
  return <CompareTool sailings={sailings} />
}

import { Metadata } from 'next'
import { otherCruiseDeals } from '@/data/other-cruise-lines'
import { OtherLinesGrid } from './other-lines-grid'

export const metadata: Metadata = {
  title: 'Other Cruise Line Deals — Bargain Steals Beyond Disney',
  description: 'Deeply discounted deals from Royal Caribbean, Carnival, Norwegian, MSC, Celebrity, Princess, and Holland America. Only the most significant discounts — 55%+ off.',
}

export default function OtherLinesPage() {
  return <OtherLinesGrid deals={otherCruiseDeals} />
}

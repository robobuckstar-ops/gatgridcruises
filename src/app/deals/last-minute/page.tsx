import { Metadata } from 'next'
import { getLastMinuteDeals, getShips, getPorts } from '@/lib/data'
import { LastMinuteDealGrid } from './last-minute-deal-grid'

export const metadata: Metadata = {
  title: 'Flash Deals | Last-Minute Disney Cruise Deals',
  description: 'Flash deals on Disney cruises departing within 90 days. Steep discounts, limited availability. Check prices before they change.',
}
import { redirect } from 'next/navigation'
import { redirect } from 'next/navigation'

export default function LastMinuteDealsPage() {
  redirect('/deals/flash-deals')
}

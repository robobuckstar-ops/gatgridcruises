import { Metadata } from 'next'
import { getSailings } from '@/lib/data'
import { CostCalculator } from './calculator'

export const metadata: Metadata = {
  title: 'Total Trip Cost Calculator',
  description: 'Find out what a Disney cruise really costs. Add flights, hotels, gratuities, excursions, and more to see the true total beyond the advertised price.',
}

export default function CostCalculatorPage() {
  const rawSailings = getSailings()
  const sailings = rawSailings.map(s => ({
    id: s.id,
    ship: s.ship?.name ?? 'Unknown Ship',
    destination: s.itinerary_name,
    startDate: s.sail_date,
    endDate: s.sail_date,
    nights: s.length_nights,
    lowestPrice: s.current_lowest_price,
  }))
  return <CostCalculator sailings={sailings} />
}

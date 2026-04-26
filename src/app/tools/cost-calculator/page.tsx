import { Metadata } from 'next'
import { getSailings } from '@/lib/data'
import { CostCalculator } from './calculator'
import { GetQuoteCTA } from '@/components/get-quote-cta'

export const metadata: Metadata = {
  title: 'Total Trip Cost Calculator',
  description: 'Find out what a Disney cruise really costs. Add flights, hotels, gratuities, excursions, and more to see the true total beyond the advertised price.',
  openGraph: {
    title: 'Total Trip Cost Calculator',
    description: 'What does a Disney cruise really cost? Add flights, hotels, gratuities, and excursions to see the true total.',
    url: 'https://gatgridcruises.com/tools/cost-calculator',
    images: [{ url: 'https://gatgridcruises.com/og-image.png', width: 1200, height: 630, alt: 'GatGridCruises' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Disney Cruise Total Trip Cost Calculator',
    description: 'Add flights, hotels, gratuities, and excursions to find the true cost of your Disney cruise.',
    images: ['https://gatgridcruises.com/og-image.png'],
  },
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
  return (
    <>
      <CostCalculator sailings={sailings} />
      <GetQuoteCTA />
    </>
  )
}

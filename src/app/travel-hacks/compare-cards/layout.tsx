import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Compare Travel Credit Cards for Disney Cruises',
  description: 'Side-by-side comparison of the best travel credit cards for booking Disney cruises. Find the card that earns the most rewards for your next voyage.',
  alternates: { canonical: 'https://gatgridcruises.com/travel-hacks/compare-cards' },
  openGraph: {
    title: 'Compare Travel Credit Cards for Disney Cruises',
    description: 'Side-by-side comparison of the best travel credit cards for booking Disney cruises.',
    url: 'https://gatgridcruises.com/travel-hacks/compare-cards',
  },
}

export default function CompareCardsLayout({ children }: { children: React.ReactNode }) {
  return children
}

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Disney Cruise Finder — Find Your Perfect Sailing | GatGridCruises',
  description:
    'Tell us your budget, dates, and preferences. Our AI finds the best Disney cruise match — filtering by ship, port, duration, and deal score.',
  openGraph: {
    title: 'AI Disney Cruise Finder',
    description: 'Find the best Disney cruise for your family with our AI-powered search tool.',
    url: 'https://gatgridcruises.com/search',
  },
}

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

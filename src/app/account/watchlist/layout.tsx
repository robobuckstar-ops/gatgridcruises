import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Watchlist | GatGridCruises',
  description: 'Your saved Disney cruise sailings. Track price changes and get alerted when deals drop.',
  robots: { index: false, follow: false },
}

export default function WatchlistLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

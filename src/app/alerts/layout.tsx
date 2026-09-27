import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Deal Alerts — Get Notified of Disney Cruise Discounts',
  description: 'Set up free deal alerts for Disney cruises. Choose your ships, cabin type, and destinations and we\'ll email you when prices drop.',
  alternates: { canonical: '/alerts' },
  openGraph: {
    title: 'Deal Alerts — Get Notified of Disney Cruise Discounts',
    description: 'Set up free deal alerts for Disney cruises. We\'ll email you when prices drop.',
    url: 'https://gatgridcruises.com/alerts',
    images: [{ url: 'https://gatgridcruises.com/og-image.png', width: 1200, height: 630, alt: 'GatGridCruises' }],
  },
}

export default function AlertsLayout({ children }: { children: React.ReactNode }) {
  return children
}

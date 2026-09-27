import { Metadata } from 'next'
import { CruiseCountdownTimeline } from './cruise-countdown-timeline'

export const metadata: Metadata = {
  alternates: { canonical: '/guides/cruise-countdown' },
  title: 'Disney Cruise Countdown Timeline: Every Deadline & Booking Window | GatGrid',
  description:
    'Never miss a Disney cruise booking window — excursions, specialty dining, spa and online check-in. Castaway Club tiers, midnight ET timing, and pro tips.',
  openGraph: {
    title: 'Disney Cruise Countdown Timeline | GatGrid',
    description:
      'Everything you need to do before your Disney cruise — organized by days before sailing, with Castaway Club booking windows, pro tips, and timezone alerts.',
    type: 'website',
    url: 'https://gatgridcruises.com/guides/cruise-countdown',
    images: [{ url: 'https://gatgridcruises.com/og-image.png', width: 1200, height: 630, alt: 'GatGridCruises' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Disney Cruise Countdown Timeline | GatGrid',
    description: 'Everything you need to do before your Disney cruise — Castaway Club booking windows, pro tips, and timezone alerts.',
    images: ['https://gatgridcruises.com/og-image.png'],
  },
}

export default function CruiseCountdownPage() {
  return <CruiseCountdownTimeline />
}

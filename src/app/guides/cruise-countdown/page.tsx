import { Metadata } from 'next'
import { CruiseCountdownTimeline } from './cruise-countdown-timeline'

export const metadata: Metadata = {
  title: 'Disney Cruise Countdown Timeline: Every Deadline & Booking Window | GatGrid',
  description:
    'The ultimate Disney Cruise Line countdown guide. Never miss a booking window for excursions, specialty dining, spa, or online check-in. Includes Castaway Club tier breakdown, midnight ET alerts, and pro tips from Grayson.',
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

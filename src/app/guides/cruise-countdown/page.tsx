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
  },
}

export default function CruiseCountdownPage() {
  return <CruiseCountdownTimeline />
}

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Onboard Credit Calculator — Disney Cruise OBC | GatGridCruises',
  description:
    'Calculate how much free onboard credit you earn when booking your Disney cruise through GatGrid Cruises. Tiers based on cruise fare.',
  openGraph: {
    title: 'Disney Cruise OBC Calculator',
    description: 'How much free onboard credit can you earn? Calculate your OBC by cruise fare.',
    url: 'https://gatgridcruises.com/tools/obc-calculator',
  },
}

export default function OBCCalculatorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

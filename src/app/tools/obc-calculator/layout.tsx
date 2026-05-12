import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Disney Cruise OBC Calculator — GatGridCruises',
  description:
    'Calculate how much free onboard credit you earn when planning your Disney cruise through GatGrid Cruises. Tiers based on cruise fare.',
  openGraph: {
    title: 'Disney Cruise OBC Calculator — GatGridCruises',
    description: 'How much free onboard credit can you earn? Calculate your OBC by cruise fare.',
    url: 'https://gatgridcruises.com/tools/obc-calculator',
    images: [{ url: 'https://gatgridcruises.com/og-image.png', width: 1200, height: 630, alt: 'GatGridCruises OBC Calculator' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Disney Cruise OBC Calculator — GatGridCruises',
    description: 'How much free onboard credit can you earn? Calculate your OBC by cruise fare.',
    images: ['https://gatgridcruises.com/og-image.png'],
  },
}

export default function OBCCalculatorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

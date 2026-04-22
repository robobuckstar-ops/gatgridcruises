import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Disney Cruise Carbon Footprint Calculator',
  description: 'Estimate the carbon footprint of your Disney cruise and discover ways to offset your voyage. Free tool from GatGridCruises.',
  alternates: { canonical: 'https://gatgridcruises.com/tools/carbon-calculator' },
  openGraph: {
    title: 'Disney Cruise Carbon Footprint Calculator',
    description: 'Estimate the carbon footprint of your Disney cruise and discover offset options.',
    url: 'https://gatgridcruises.com/tools/carbon-calculator',
  },
}

export default function CarbonCalculatorLayout({ children }: { children: React.ReactNode }) {
  return children
}

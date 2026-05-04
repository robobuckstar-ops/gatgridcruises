import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Trip — Disney Cruise Concierge Portal | GatGridCruises',
  description:
    'Sign in to your GatGridCruises trip portal to track price drops, refresh quotes, and manage your Disney cruise booking.',
  alternates: { canonical: 'https://gatgridcruises.com/my-trip' },
  robots: { index: false, follow: true },
}

export default function MyTripLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

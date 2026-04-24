import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign In | GatGridCruises',
  description: 'Sign in to your GatGrid Cruises account to manage deal alerts, saved sailings, and your watchlist.',
  robots: { index: false, follow: false },
}

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

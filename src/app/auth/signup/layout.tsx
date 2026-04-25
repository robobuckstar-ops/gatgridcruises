import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Create Account | GatGridCruises',
  description: 'Create a free GatGrid Cruises account to track deals, set price alerts, and save your favorite sailings.',
  robots: { index: false, follow: false },
}

export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

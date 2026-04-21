import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { SkipNav } from '@/components/ui/skip-nav'
import { Chatbot } from '@/components/ui/chatbot'
import { generateWebsiteSchema } from '@/lib/structured-data'
import { StructuredData } from '@/components/ui/structured-data'
import { GuestCountProvider } from '@/context/guest-count-context'

export const metadata: Metadata = {
  title: {
    default: 'GatGridCruises — Magically Valuable Disney Cruises',
    template: '%s | GatGridCruises',
  },
  description: 'Find the best Disney cruise deals, compare prices, and plan smarter. Tools, guides, and honest advice updated daily.',
  keywords: ['disney cruise', 'disney cruise deals', 'disney cruise line', 'cruise deals', 'disney wish', 'disney treasure'],
  authors: [{ name: 'GatGridCruises' }],
  themeColor: '#2563EB',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.svg',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://gatgridcruises.com',
    siteName: 'GatGridCruises',
    title: 'GatGridCruises — Magically Valuable Disney Cruises',
    description: 'Find the best Disney cruise deals, compare prices, and plan your perfect voyage.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GatGridCruises — Magically Valuable Disney Cruises',
    description: 'Find the best Disney cruise deals, compare prices, and plan your perfect voyage.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <GuestCountProvider>
          <StructuredData data={generateWebsiteSchema()} />
          <SkipNav />
          <Header />
          <main id="main-content" className="flex-1">{children}</main>
          <Footer />
          <Chatbot />
        </GuestCountProvider>
      </body>
    </html>
  )
}

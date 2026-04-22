import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { SkipNav } from '@/components/ui/skip-nav'
import { Chatbot } from '@/components/ui/chatbot'
import { generateWebsiteSchema } from '@/lib/structured-data'
import { StructuredData } from '@/components/ui/structured-data'

const GA_ID = 'G-XXXXXXXXXX'

export const metadata: Metadata = {
  title: {
    default: 'Disney Cruise Deal Finder — GatGridCruises',
    template: '%s | Disney Cruise Deal Finder',
  },
  description:
    'Find the best Disney cruise deals, compare prices, and plan your trip with free tools. Deals watched daily, honest advice, no booking pressure.',
  keywords: [
    'disney cruise deals',
    'disney cruise line',
    'disney cruise deal finder',
    'cheap disney cruise',
    'disney cruise prices',
    'disney cruise comparison',
    'disney wish deals',
    'disney treasure deals',
  ],
  authors: [{ name: 'GatGridCruises' }],
  manifest: '/manifest.json',
  icons: { icon: '/favicon.svg' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://gatgridcruises.com',
    siteName: 'Disney Cruise Deal Finder',
    title: 'Disney Cruise Deal Finder — GatGridCruises',
    description:
      'Find the best Disney cruise deals with our Deal Score system. Compare prices, track drops, and plan smarter.',
    images: [
      {
        url: 'https://gatgridcruises.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Disney Cruise Deal Finder',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Disney Cruise Deal Finder — GatGridCruises',
    description:
      'Find the best Disney cruise deals with our Deal Score system. Compare prices, track drops, and plan smarter.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        {/* Google Analytics 4 */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>

        <StructuredData data={generateWebsiteSchema()} />
        <SkipNav />
        <Header />
        <main id="main-content" className="flex-1">{children}</main>
        <Footer />
        <Chatbot />
      </body>
    </html>
  )
}

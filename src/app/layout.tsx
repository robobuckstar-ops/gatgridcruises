import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { SkipNav } from '@/components/ui/skip-nav'
import { ChatWidget } from '@/components/ui/chat-widget'
import { NewsletterPopup } from '@/components/ui/newsletter-popup'
import { generateWebsiteSchema, generateOrganizationSchema } from '@/lib/structured-data'
import { StructuredData } from '@/components/ui/structured-data'

const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX' // Replace with your real GA4 Measurement ID

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
    siteName: 'GatGridCruises',
    title: 'GatGridCruises — Magically Valuable Disney Cruises',
    description: 'Find the best Disney cruise deals, compare prices, and plan your perfect voyage.',
    images: [
      {
        url: 'https://gatgridcruises.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'GatGridCruises — Magically Valuable Disney Cruises',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GatGridCruises — Magically Valuable Disney Cruises',
    description: 'Find the best Disney cruise deals, compare prices, and plan your perfect voyage.',
    images: ['https://gatgridcruises.com/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://gatgridcruises.com',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        {/* Google Analytics 4 */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>

        <StructuredData data={generateWebsiteSchema()} />
        <StructuredData data={generateOrganizationSchema()} />
        <SkipNav />
        <Header />
        <main id="main-content" className="flex-1">{children}</main>
        <Footer />
        <ChatWidget />
        <NewsletterPopup />
      </body>
    </html>
  )
}

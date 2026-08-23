import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { SkipNav } from '@/components/ui/skip-nav'
import { ChatWidget } from '@/components/ui/chat-widget'
import { ObcBadge } from '@/components/ui/obc-badge'
import { NewsletterPopup } from '@/components/ui/newsletter-popup'
import { generateWebsiteSchema, generateOrganizationSchema } from '@/lib/structured-data'
import { StructuredData } from '@/components/ui/structured-data'
import { CopyProtection } from '@/components/ui/copy-protection'
import { FamilyPromoBanner } from '@/components/ui/family-promo-banner'
import { ReferralTracker } from '@/components/ui/referral-tracker'
import { GOOGLE_ADS_ID, META_PIXEL_ID } from '@/lib/analytics'

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-434T744BN1'

export const metadata: Metadata = {
  // Every route declares its own `alternates.canonical` as a root-relative
  // path; Next resolves those against this base. Deliberately NOT setting a
  // canonical here — metadata is inherited, so a root canonical would make
  // every page that doesn't override it claim to be the homepage.
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://gatgridcruises.com'),
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
    noarchive: true,
    nocache: true,
    nosnippet: false,
  },
  verification: {
    google: 'xxlVbTclSd-rAUoo-92p1-0adoSj0Ys8PLX4R96VTag',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/*
          Travelpayouts Drive — affiliate verification + outbound-link
          monetization for marker 766218 / project 563685. The loader filename
          is the base64 of the project id; `t` repeats it. Kept as an inline
          injector (rather than a plain <Script src>) so the tag lands in
          <head>, which is where Travelpayouts' "Check Drive connection" looks.
        */}
        <Script id="travelpayouts-drive" strategy="afterInteractive">
          {`
            (function () {
              var script = document.createElement("script");
              script.async = 1;
              script.setAttribute("data-cmp-ab", "2");
              script.src = 'https://emrldco.com/NTYzNjg1.js?t=563685';
              document.head.appendChild(script);
            })();
          `}
        </Script>

        {/*
          One gtag.js loader serves both GA4 and Google Ads — each gets its own
          gtag('config'). GA4 must stay in <head> for Search Console
          verification; the Ads config rides along so conversion events fired
          from the lead forms have a destination.
        */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="beforeInteractive"
        />
        <Script id="ga4-init" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
            gtag('config', '${GOOGLE_ADS_ID}');
          `}
        </Script>

        {/* Meta Pixel — base code; lead forms fire fbq('track','Lead') on success. */}
        <Script id="meta-pixel-init" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window,document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
      </head>
      <body className="min-h-screen flex flex-col">
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            alt=""
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          />
        </noscript>

        <StructuredData data={generateWebsiteSchema()} />
        <StructuredData data={generateOrganizationSchema()} />
        {/* Honeypot links – off-screen; real users never see them, scrapers follow them */}
        <div className="gg-trap" aria-hidden="true">
          <a href="/api/honeypot" tabIndex={-1}>Exclusive Deals Database</a>
          <a href="/api/honeypot?src=footer" tabIndex={-1}>Price Data Export</a>
          <a href="/api/honeypot?src=nav" tabIndex={-1}>Sailing Index</a>
        </div>
        <CopyProtection />
        <ReferralTracker />
        <SkipNav />
        <Header />
        <FamilyPromoBanner />
        <main id="main-content" className="flex-1 pb-28 sm:pb-0">{children}</main>
        <Footer />
        <ChatWidget />
        <ObcBadge />
        <NewsletterPopup />
      </body>
    </html>
  )
}

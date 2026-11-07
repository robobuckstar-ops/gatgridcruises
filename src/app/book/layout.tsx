import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Get a Free Disney Cruise Quote',
  description: 'Tell us about your dream Disney cruise and an independent advisor will send you personalized pricing within 1 business day. Free, no obligation.',
  alternates: { canonical: '/book' },
  openGraph: {
    title: 'Get a Free Disney Cruise Quote',
    description: 'An independent Disney cruise advisor will send you personalized pricing within 1 business day. Free, no obligation.',
    url: 'https://gatgridcruises.com/book',
    images: [{ url: 'https://gatgridcruises.com/og-image.png', width: 1200, height: 630, alt: 'GatGridCruises' }],
  },
}

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return children
}

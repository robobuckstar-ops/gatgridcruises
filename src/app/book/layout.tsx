import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Get a Free Disney Cruise Quote',
  description: 'Tell us about your dream Disney cruise and a licensed specialist will send you personalized pricing within 24 hours. Free, no obligation.',
  alternates: { canonical: 'https://gatgridcruises.com/book' },
  openGraph: {
    title: 'Get a Free Disney Cruise Quote',
    description: 'A licensed Disney cruise specialist will send you personalized pricing within 24 hours. Free, no obligation.',
    url: 'https://gatgridcruises.com/book',
  },
}

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return children
}

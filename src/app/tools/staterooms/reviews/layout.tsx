import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Disney Cruise Stateroom Reviews',
  description: 'Read and submit real Disney cruise stateroom reviews. Find out which cabins have the best views, quietest locations, and highest ratings.',
  alternates: { canonical: 'https://gatgridcruises.com/tools/staterooms/reviews' },
  openGraph: {
    title: 'Disney Cruise Stateroom Reviews',
    description: 'Real reviews for Disney cruise staterooms — best views, quietest locations, and top ratings.',
    url: 'https://gatgridcruises.com/tools/staterooms/reviews',
  },
}

export default function StateroomReviewsLayout({ children }: { children: React.ReactNode }) {
  return children
}

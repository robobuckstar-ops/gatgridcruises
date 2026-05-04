import { permanentRedirect } from 'next/navigation'

export const metadata = {
  robots: { index: false, follow: false },
}

// Health monitor + external referrers sometimes hit the plural /sailings.
// The actual sailing browser lives at /deals.
export default function SailingsRedirect(): never {
  permanentRedirect('/deals')
}

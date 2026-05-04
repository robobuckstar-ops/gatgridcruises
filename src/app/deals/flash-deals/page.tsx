import { redirect } from 'next/navigation'

// Flash Deals merged into Last-Minute Deals — same content (sailings within 90 days).
export default function FlashDealsPage() {
  redirect('/deals/last-minute')
}

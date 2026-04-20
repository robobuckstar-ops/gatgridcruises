import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { AdSlot } from '@/components/ui/ad-slot'

export default function GuidesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-white">
      {children}
    </div>
  )
}

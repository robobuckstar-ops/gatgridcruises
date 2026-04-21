'use client'

import { useGuestCount } from '@/context/guest-count-context'
import { Users } from 'lucide-react'
import { cn } from '@/lib/utils'

const GUEST_OPTIONS = [
  { value: 1, label: '1 Guest' },
  { value: 2, label: '2 Guests' },
  { value: 3, label: '3 Guests' },
  { value: 4, label: '4+ Guests' },
]

export function GuestSelector({ className }: { className?: string }) {
  const { guests, setGuests } = useGuestCount()

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Users className="h-4 w-4 text-slate-500 flex-shrink-0" />
      <div className="flex">
        {GUEST_OPTIONS.map((opt, i) => (
          <button
            key={opt.value}
            onClick={() => setGuests(opt.value)}
            className={cn(
              'px-3 py-1.5 text-xs font-medium border transition-colors',
              i === 0 && 'rounded-l-lg',
              i === GUEST_OPTIONS.length - 1 && 'rounded-r-lg',
              i > 0 && '-ml-px',
              guests === opt.value
                ? 'bg-blue-600 text-white border-blue-600 z-10 relative'
                : 'bg-white text-slate-600 border-slate-300 hover:border-blue-400 hover:z-10 relative'
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  )
}

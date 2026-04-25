'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Sailing } from '@/types/database'
import type { SailTogetherGroup } from '@/data/sail-together-groups'
import { formatDate } from '@/lib/utils'
import { Ship, Calendar, MapPin, Users } from 'lucide-react'

interface GroupCardProps {
  group: SailTogetherGroup
  sailing: Sailing
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

const colors = [
  'bg-[#1E3A5F]/20 text-blue-700',
  'bg-emerald-100 text-emerald-700',
  'bg-amber-100 text-amber-700',
  'bg-rose-100 text-rose-700',
  'bg-purple-100 text-purple-700',
  'bg-cyan-100 text-cyan-700',
]

function getColorForIndex(index: number): string {
  return colors[index % colors.length]
}

function MemberAvatars({ count }: { count: number }) {
  // Show up to 3 avatar circles, then +N if more
  const displayCount = Math.min(count, 3)
  const hasMore = count > 3

  return (
    <div className="flex items-center gap-2">
      <div className="flex -space-x-2">
        {Array.from({ length: displayCount }).map((_, i) => (
          <div
            key={i}
            className={`h-8 w-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-semibold ${getColorForIndex(i)}`}
          >
            {String.fromCharCode(65 + i)}
          </div>
        ))}
      </div>
      <span className="text-sm font-medium text-slate-700">
        {count === 1 ? '1 member' : `${count} members`}
      </span>
      {hasMore && <span className="text-xs text-slate-500">+{count - displayCount} more</span>}
    </div>
  )
}

export function GroupCard({ group, sailing }: GroupCardProps) {
  const [isJoining, setIsJoining] = useState(false)

  const handleJoin = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsJoining(true)
    // Show alert - in a real app, this would open a modal or redirect to signup
    setTimeout(() => {
      alert(
        'Join Sail Together! Create a free account to connect with fellow passengers sailing ' +
          formatDate(sailing.sail_date) +
          ' on the ' +
          sailing.ship?.name +
          '.'
      )
      setIsJoining(false)
    }, 300)
  }

  return (
    <div className="group bg-white rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all duration-200 overflow-hidden">
      {/* Color bar at top */}
      <div className="h-1.5 bg-gradient-to-r from-cyan-500 to-blue-500 group-hover:from-[#D4AF37] group-hover:to-amber-400 transition-all duration-200" />

      <div className="p-5">
        {/* Ship + Date Header */}
        <div className="space-y-1 mb-4">
          <h3 className="font-display text-lg font-semibold text-slate-900 group-hover:text-[#D4AF37] transition-colors">
            {sailing.ship?.name || 'Disney Cruise'}
          </h3>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Calendar className="h-4 w-4 text-slate-400 flex-shrink-0" />
            <span>{formatDate(sailing.sail_date)}</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-600">{sailing.length_nights} nights</span>
          </div>
        </div>

        {/* Itinerary */}
        <div className="mb-4 flex items-start gap-2">
          <MapPin className="h-4 w-4 text-slate-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-slate-700 font-medium">{sailing.itinerary_name}</p>
        </div>

        {/* Members section */}
        <div className="mb-4 pb-4 border-b border-slate-100">
          <MemberAvatars count={group.member_count} />
        </div>

        {/* Topics tags */}
        <div className="mb-4">
          <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-2">
            Recent Topics
          </p>
          <div className="flex flex-wrap gap-2">
            {group.recent_topics.map((topic, idx) => (
              <span
                key={idx}
                className="inline-flex items-center px-2.5 py-1 rounded-full text-xs bg-[#1E3A5F]/10 text-blue-700 border border-blue-200"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={handleJoin}
          disabled={isJoining}
          className="w-full py-2.5 px-4 bg-[#D4AF37] hover:bg-amber-500 active:bg-amber-600 disabled:opacity-75 text-slate-900 font-semibold rounded-lg transition-all duration-200 text-sm"
        >
          {isJoining ? 'Connecting...' : 'Join Group'}
        </button>
      </div>
    </div>
  )
}

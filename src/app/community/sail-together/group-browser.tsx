'use client'

import { useMemo, useState } from 'react'
import type { SailTogetherGroupWithSailing } from '@/lib/data'
import { GroupCard } from '@/components/ui/group-card'
import { getShips } from '@/lib/data'
import { Search, Filter } from 'lucide-react'

interface GroupBrowserProps {
  groups: SailTogetherGroupWithSailing[]
}

export function GroupBrowser({ groups }: GroupBrowserProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedShip, setSelectedShip] = useState<string>('all')
  const [selectedMonth, setSelectedMonth] = useState<string>('all')

  const ships = useMemo(() => {
    const uniqueShips = Array.from(
      new Set(groups.map(g => g.sailing.ship_id))
    )
    return getShips().filter(s => uniqueShips.includes(s.id))
  }, [groups])

  const months = useMemo(() => {
    const uniqueMonths = Array.from(
      new Set(
        groups.map(g => {
          const date = new Date(g.sailing.sail_date)
          return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
        })
      )
    ).sort().reverse()
    return uniqueMonths
  }, [])

  const filteredGroups = useMemo(() => {
    return groups.filter(g => {
      // Search filter
      const searchLower = searchTerm.toLowerCase()
      const matchesSearch =
        g.sailing.ship?.name.toLowerCase().includes(searchLower) ||
        g.sailing.itinerary_name.toLowerCase().includes(searchLower) ||
        g.recent_topics.some(t => t.toLowerCase().includes(searchLower))

      if (!matchesSearch) return false

      // Ship filter
      if (selectedShip !== 'all' && g.sailing.ship_id !== selectedShip) {
        return false
      }

      // Month filter
      if (selectedMonth !== 'all') {
        const date = new Date(g.sailing.sail_date)
        const monthStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
        if (monthStr !== selectedMonth) return false
      }

      return true
    })
  }, [groups, searchTerm, selectedShip, selectedMonth])

  return (
    <div className="space-y-6">
      {/* Search and Filter Section */}
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by ship, itinerary, or topic..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-slate-900 placeholder:text-slate-500"
          />
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              <Filter className="inline h-4 w-4 mr-2" />
              Ship
            </label>
            <select
              value={selectedShip}
              onChange={e => setSelectedShip(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-slate-900 text-sm"
            >
              <option value="all">All Ships</option>
              {ships.map(ship => (
                <option key={ship.id} value={ship.id}>
                  {ship.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-slate-700 mb-2">Sailing Month</label>
            <select
              value={selectedMonth}
              onChange={e => setSelectedMonth(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-slate-900 text-sm"
            >
              <option value="all">All Months</option>
              {months.map(month => {
                const [year, monthNum] = month.split('-')
                const date = new Date(parseInt(year), parseInt(monthNum) - 1)
                const label = date.toLocaleDateString('en-US', {
                  month: 'long',
                  year: 'numeric',
                })
                return (
                  <option key={month} value={month}>
                    {label}
                  </option>
                )
              })}
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="text-sm text-slate-600">
          Showing {filteredGroups.length} of {groups.length} groups
          {searchTerm && ` matching "${searchTerm}"`}
        </div>
      </div>

      {/* Results Grid */}
      {filteredGroups.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredGroups.map(group => (
            <GroupCard key={group.id} group={group} sailing={group.sailing} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-slate-600 mb-2">No groups found matching your search.</p>
          <p className="text-sm text-slate-500">Try adjusting your filters or search term.</p>
        </div>
      )}
    </div>
  )
}

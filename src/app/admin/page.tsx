import { Metadata } from 'next'
import Link from 'next/link'
import { getSailings, getShips, getPorts } from '@/lib/data'
import { formatPrice, formatDate } from '@/lib/utils'
import { BarChart3, Ship, MapPin, Anchor, Users, Settings, Plus, TrendingDown, BarChart2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Admin Dashboard',
}

export default function AdminDashboard() {
  const sailings = getSailings()
  const ships = getShips()
  const ports = getPorts()
  const featured = sailings.filter(s => s.is_featured)

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-navy text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-2xl font-bold">Admin Dashboard</h1>
              <p className="text-slate-400 text-sm">GatGridCruises Management</p>
            </div>
            <Link href="/" className="text-sm text-slate-300 hover:text-white">← Back to site</Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-navy/10 rounded-lg flex items-center justify-center">
                <Anchor className="h-5 w-5 text-navy" />
              </div>
              <span className="text-2xl font-bold text-navy">{sailings.length}</span>
            </div>
            <p className="text-sm text-slate-500">Total Sailings</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center">
                <TrendingDown className="h-5 w-5 text-blue-600" />
              </div>
              <span className="text-2xl font-bold text-navy">{featured.length}</span>
            </div>
            <p className="text-sm text-slate-500">Featured Deals</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                <Ship className="h-5 w-5 text-emerald-600" />
              </div>
              <span className="text-2xl font-bold text-navy">{ships.length}</span>
            </div>
            <p className="text-sm text-slate-500">Ships</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-[#1E3A5F]/10 rounded-lg flex items-center justify-center">
                <MapPin className="h-5 w-5 text-blue-600" />
              </div>
              <span className="text-2xl font-bold text-navy">{ports.length}</span>
            </div>
            <p className="text-sm text-slate-500">Ports</p>
          </div>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <Link href="/admin/sailings" className="bg-white rounded-xl border border-slate-200 p-5 hover:border-navy transition-colors group">
            <h3 className="font-semibold text-navy group-hover:text-[#D4AF37] transition-colors flex items-center gap-2">
              <Anchor className="h-4 w-4" /> Manage Sailings
            </h3>
            <p className="text-sm text-slate-500 mt-1">Create, edit, and manage cruise sailings and prices</p>
          </Link>
          <Link href="/admin/ships" className="bg-white rounded-xl border border-slate-200 p-5 hover:border-navy transition-colors group">
            <h3 className="font-semibold text-navy group-hover:text-[#D4AF37] transition-colors flex items-center gap-2">
              <Ship className="h-4 w-4" /> Manage Ships
            </h3>
            <p className="text-sm text-slate-500 mt-1">Create, edit, and manage cruise ships</p>
          </Link>
          <Link href="/admin/ports" className="bg-white rounded-xl border border-slate-200 p-5 hover:border-navy transition-colors group">
            <h3 className="font-semibold text-navy group-hover:text-[#D4AF37] transition-colors flex items-center gap-2">
              <MapPin className="h-4 w-4" /> Manage Ports
            </h3>
            <p className="text-sm text-slate-500 mt-1">Create, edit, and manage cruise ports</p>
          </Link>
          <Link href="/admin/hotels" className="bg-white rounded-xl border border-slate-200 p-5 hover:border-navy transition-colors group">
            <h3 className="font-semibold text-navy group-hover:text-[#D4AF37] transition-colors flex items-center gap-2">
              <MapPin className="h-4 w-4" /> Manage Hotels
            </h3>
            <p className="text-sm text-slate-500 mt-1">Manage pre-cruise hotel options</p>
          </Link>
          <Link href="/admin/transfers" className="bg-white rounded-xl border border-slate-200 p-5 hover:border-navy transition-colors group">
            <h3 className="font-semibold text-navy group-hover:text-[#D4AF37] transition-colors flex items-center gap-2">
              <MapPin className="h-4 w-4" /> Manage Transfers
            </h3>
            <p className="text-sm text-slate-500 mt-1">Manage airport and port transfers</p>
          </Link>
          <Link href="/admin/staterooms" className="bg-white rounded-xl border border-slate-200 p-5 hover:border-navy transition-colors group">
            <h3 className="font-semibold text-navy group-hover:text-[#D4AF37] transition-colors flex items-center gap-2">
              <Ship className="h-4 w-4" /> Manage Staterooms
            </h3>
            <p className="text-sm text-slate-500 mt-1">Manage ship staterooms and cabins</p>
          </Link>
          <Link href="/admin/subscribers" className="bg-white rounded-xl border border-slate-200 p-5 hover:border-navy transition-colors group">
            <h3 className="font-semibold text-navy group-hover:text-[#D4AF37] transition-colors flex items-center gap-2">
              <Users className="h-4 w-4" /> Manage Subscribers
            </h3>
            <p className="text-sm text-slate-500 mt-1">View and manage your email subscribers</p>
          </Link>
          <Link href="/admin/ads" className="bg-white rounded-xl border border-slate-200 p-5 hover:border-navy transition-colors group">
            <h3 className="font-semibold text-navy group-hover:text-[#D4AF37] transition-colors flex items-center gap-2">
              <BarChart2 className="h-4 w-4" /> Ad Management
            </h3>
            <p className="text-sm text-slate-500 mt-1">Manage ad slots and track performance</p>
          </Link>
          <div className="bg-white rounded-xl border border-slate-200 p-5 opacity-50">
            <h3 className="font-semibold text-slate-400 flex items-center gap-2">
              <Settings className="h-4 w-4" /> Site Settings
            </h3>
            <p className="text-sm text-slate-400 mt-1">Coming in Sprint 2</p>
          </div>
        </div>

        {/* Recent sailings table */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
            <h2 className="font-semibold text-navy">Recent Sailings</h2>
            <Link href="/admin/sailings" className="text-sm text-navy hover:text-blue-600 font-medium">View all →</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left px-5 py-3 text-slate-500 font-medium">Sailing</th>
                  <th className="text-left px-5 py-3 text-slate-500 font-medium">Ship</th>
                  <th className="text-left px-5 py-3 text-slate-500 font-medium">Date</th>
                  <th className="text-left px-5 py-3 text-slate-500 font-medium">Price</th>
                  <th className="text-left px-5 py-3 text-slate-500 font-medium">Score</th>
                  <th className="text-left px-5 py-3 text-slate-500 font-medium">Featured</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sailings.slice(0, 10).map(s => (
                  <tr key={s.id} className="hover:bg-slate-50">
                    <td className="px-5 py-3 font-medium text-navy">{s.itinerary_name}</td>
                    <td className="px-5 py-3 text-slate-600">{s.ship?.name}</td>
                    <td className="px-5 py-3 text-slate-600">{formatDate(s.sail_date)}</td>
                    <td className="px-5 py-3 font-medium">{formatPrice(s.current_lowest_price)}</td>
                    <td className="px-5 py-3">{s.sailing_score}</td>
                    <td className="px-5 py-3">{s.is_featured ? '⭐' : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

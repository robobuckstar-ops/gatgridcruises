'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Edit2, Trash2, Plus, TrendingUp } from 'lucide-react'

interface AdSlot {
  id: string
  location: string
  size: string
  status: 'placeholder' | 'adsense' | 'direct_sold'
  advertiser?: string
  impressions: number
  startDate?: string
  endDate?: string
  customHtml?: string
}

const INITIAL_SLOTS: AdSlot[] = [
  {
    id: 'homepage_hero',
    location: 'Homepage Hero',
    size: '728x90',
    status: 'placeholder',
    impressions: 0,
  },
  {
    id: 'homepage_grid_native',
    location: 'Homepage Grid Native',
    size: 'Native',
    status: 'placeholder',
    impressions: 0,
  },
  {
    id: 'deals_grid_native',
    location: 'Deals Grid Native',
    size: 'Native',
    status: 'placeholder',
    impressions: 0,
  },
  {
    id: 'deals_bottom_banner',
    location: 'Deals Bottom Banner',
    size: '728x90',
    status: 'placeholder',
    impressions: 0,
  },
  {
    id: 'sailing_top_banner',
    location: 'Sailing Top Banner',
    size: '728x90',
    status: 'placeholder',
    impressions: 0,
  },
  {
    id: 'sailing_sidebar',
    location: 'Sailing Sidebar',
    size: '300x250',
    status: 'placeholder',
    impressions: 0,
  },
  {
    id: 'hotels_sidebar',
    location: 'Hotels Sidebar',
    size: '300x250',
    status: 'placeholder',
    impressions: 0,
  },
]

export default function AdManagement() {
  const [slots, setSlots] = useState<AdSlot[]>(INITIAL_SLOTS)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editData, setEditData] = useState<Partial<AdSlot>>({})

  const totalSlots = slots.length
  const activePlacements = slots.filter(s => s.status !== 'placeholder').length
  const directSold = slots.filter(s => s.status === 'direct_sold').length
  const monthlyRevenue = directSold * 1500 // placeholder calculation

  const handleEdit = (slot: AdSlot) => {
    setEditingId(slot.id)
    setEditData({ ...slot })
  }

  const handleSave = () => {
    if (editingId) {
      setSlots(slots.map(s => (s.id === editingId ? { ...s, ...editData } : s)))
      setEditingId(null)
      setEditData({})
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setEditData({})
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this ad slot?')) {
      setSlots(slots.filter(s => s.id !== id))
    }
  }

  const handleCreateNew = () => {
    const newSlot: AdSlot = {
      id: `new_${Date.now()}`,
      location: 'New Ad Slot',
      size: '728x90',
      status: 'placeholder',
      impressions: 0,
    }
    setSlots([...slots, newSlot])
    handleEdit(newSlot)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'direct_sold':
        return 'bg-emerald-100 text-emerald-800'
      case 'adsense':
        return 'bg-[#1E3A5F]/20 text-blue-800'
      default:
        return 'bg-slate-100 text-slate-800'
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-navy text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-2xl font-bold">Ad Management</h1>
              <p className="text-slate-400 text-sm">Manage ad slots and track performance</p>
            </div>
            <Link href="/admin" className="text-sm text-slate-300 hover:text-white">
              ← Back to dashboard
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-navy/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-navy" />
              </div>
              <span className="text-2xl font-bold text-navy">{totalSlots}</span>
            </div>
            <p className="text-sm text-slate-500">Total Slots</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-[#1E3A5F]/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-blue-600" />
              </div>
              <span className="text-2xl font-bold text-navy">{activePlacements}</span>
            </div>
            <p className="text-sm text-slate-500">Active Placements</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-emerald-600" />
              </div>
              <span className="text-2xl font-bold text-navy">{directSold}</span>
            </div>
            <p className="text-sm text-slate-500">Direct-Sold</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-blue-600" />
              </div>
              <span className="text-2xl font-bold text-navy">${monthlyRevenue.toLocaleString()}</span>
            </div>
            <p className="text-sm text-slate-500">Revenue This Month</p>
          </div>
        </div>

        {/* Create new slot button */}
        <div className="mb-6">
          <button
            onClick={handleCreateNew}
            className="flex items-center gap-2 px-4 py-2 bg-navy text-white rounded-lg hover:bg-navy/90 transition-colors font-medium"
          >
            <Plus className="h-4 w-4" /> Create New Slot
          </button>
        </div>

        {/* Ad slots table */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden mb-8">
          <div className="px-5 py-4 border-b border-slate-200">
            <h2 className="font-semibold text-navy">All Ad Slots</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left px-5 py-3 text-slate-500 font-medium">Location</th>
                  <th className="text-left px-5 py-3 text-slate-500 font-medium">Size</th>
                  <th className="text-left px-5 py-3 text-slate-500 font-medium">Status</th>
                  <th className="text-left px-5 py-3 text-slate-500 font-medium">Advertiser</th>
                  <th className="text-left px-5 py-3 text-slate-500 font-medium">Impressions</th>
                  <th className="text-left px-5 py-3 text-slate-500 font-medium">Dates</th>
                  <th className="text-left px-5 py-3 text-slate-500 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {slots.map(slot => (
                  <tr key={slot.id} className="hover:bg-slate-50">
                    <td className="px-5 py-3 font-medium text-navy">{slot.location}</td>
                    <td className="px-5 py-3 text-slate-600">{slot.size}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(slot.status)}`}>
                        {slot.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-slate-600">{slot.advertiser || '—'}</td>
                    <td className="px-5 py-3 text-slate-600">{slot.impressions.toLocaleString()}</td>
                    <td className="px-5 py-3 text-slate-600 text-xs">
                      {slot.startDate && slot.endDate ? (
                        `${slot.startDate} to ${slot.endDate}`
                      ) : (
                        '—'
                      )}
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(slot)}
                          className="p-2 hover:bg-slate-200 rounded transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="h-4 w-4 text-navy" />
                        </button>
                        <button
                          onClick={() => handleDelete(slot.id)}
                          className="p-2 hover:bg-red-100 rounded transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Edit form modal */}
        {editingId && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-6 max-h-96 overflow-y-auto">
              <h3 className="text-xl font-bold text-navy mb-4">Edit Ad Slot</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={editData.location || ''}
                    onChange={e => setEditData({ ...editData, location: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Size
                    </label>
                    <input
                      type="text"
                      value={editData.size || ''}
                      onChange={e => setEditData({ ...editData, size: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Status
                    </label>
                    <select
                      value={editData.status || 'placeholder'}
                      onChange={e => setEditData({ ...editData, status: e.target.value as any })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
                    >
                      <option value="placeholder">Placeholder</option>
                      <option value="adsense">AdSense</option>
                      <option value="direct_sold">Direct Sold</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Advertiser
                  </label>
                  <input
                    type="text"
                    value={editData.advertiser || ''}
                    onChange={e => setEditData({ ...editData, advertiser: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
                    placeholder="Company name"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={editData.startDate || ''}
                      onChange={e => setEditData({ ...editData, startDate: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={editData.endDate || ''}
                      onChange={e => setEditData({ ...editData, endDate: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Custom HTML (optional)
                  </label>
                  <textarea
                    value={editData.customHtml || ''}
                    onChange={e => setEditData({ ...editData, customHtml: e.target.value })}
                    rows={4}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy font-mono text-xs"
                    placeholder="Paste custom HTML or ad code here"
                  />
                </div>

                <div className="flex gap-3 justify-end pt-4 border-t border-slate-200">
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors font-medium text-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-navy text-white rounded-lg hover:bg-navy/90 transition-colors font-medium"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Revenue summary */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="font-semibold text-navy mb-4">Revenue Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-slate-500 mb-1">This Month Revenue</p>
              <p className="text-2xl font-bold text-emerald-600">${monthlyRevenue.toLocaleString()}</p>
              <p className="text-xs text-slate-400 mt-1">{directSold} direct-sold slots</p>
            </div>
            <div>
              <p className="text-sm text-slate-500 mb-1">Total Impressions</p>
              <p className="text-2xl font-bold text-navy">
                {slots.reduce((sum, s) => sum + s.impressions, 0).toLocaleString()}
              </p>
              <p className="text-xs text-slate-400 mt-1">Across all slots</p>
            </div>
            <div>
              <p className="text-sm text-slate-500 mb-1">Available Slots</p>
              <p className="text-2xl font-bold text-blue-600">
                {slots.filter(s => s.status === 'placeholder').length}
              </p>
              <p className="text-xs text-slate-400 mt-1">Ready to monetize</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

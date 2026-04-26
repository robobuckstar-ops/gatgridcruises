'use client'

import { useState } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'
import type { PriceSnapshot } from '@/types/database'
import { formatPrice, formatDateShort } from '@/lib/utils'

const NAVY = '#1E3A5F'
const GOLD = '#D4AF37'

type Category = 'inside' | 'oceanview' | 'verandah' | 'concierge'

const CATEGORIES: { key: Category; label: string; field: keyof PriceSnapshot }[] = [
  { key: 'inside',    label: 'Interior',  field: 'inside_price'    },
  { key: 'oceanview', label: 'Oceanview', field: 'oceanview_price' },
  { key: 'verandah',  label: 'Verandah',  field: 'verandah_price'  },
  { key: 'concierge', label: 'Concierge', field: 'concierge_price' },
]

interface PriceChartProps {
  snapshots: PriceSnapshot[]
  currentPrice: number
  className?: string
}

export function PriceChart({ snapshots, currentPrice, className }: PriceChartProps) {
  const [category, setCategory] = useState<Category>('inside')

  if (snapshots.length < 2) {
    return (
      <div className={`h-80 flex items-center justify-center bg-slate-50 rounded-lg ${className || ''}`}>
        <p className="text-sm text-slate-500">Not enough price history data yet</p>
      </div>
    )
  }

  const catInfo = CATEGORIES.find(c => c.key === category)!

  const data = snapshots
    .filter(s => s[catInfo.field] !== null)
    .map(s => ({
      date: s.snapshot_date,
      price: Math.round((s[catInfo.field] as number) / 2),
    }))

  // Fall back to lowest_price if selected category has no data
  const chartData = data.length >= 2
    ? data
    : snapshots.map(s => ({ date: s.snapshot_date, price: Math.round(s.lowest_price / 2) }))

  const allPrices = chartData.map(d => d.price)
  const minPrice = Math.min(...allPrices)
  const maxPrice = Math.max(...allPrices)
  const avg = Math.round(allPrices.reduce((a, b) => a + b, 0) / allPrices.length)
  const padding = Math.max((maxPrice - minPrice) * 0.15, 80)
  const currentIndex = chartData.length - 1
  const currentPerPerson = Math.round(currentPrice / 2)

  return (
    <div className={className}>
      {/* Category toggle */}
      <div className="flex flex-wrap items-center gap-2 mb-5">
        {CATEGORIES.map(cat => {
          const active = category === cat.key
          return (
            <button
              key={cat.key}
              onClick={() => setCategory(cat.key)}
              style={active ? { backgroundColor: NAVY, borderColor: NAVY, color: '#fff' } : {}}
              className={`px-3 py-1.5 text-xs font-semibold rounded-full border transition-all ${
                active ? '' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400 hover:text-slate-800'
              }`}
            >
              {cat.label}
            </button>
          )
        })}
        <span className="ml-auto text-[11px] text-slate-400 italic">per person</span>
      </div>

      {/* Stats row */}
      <div className="flex items-center gap-4 mb-4 text-xs flex-wrap">
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-3 rounded" style={{ background: `linear-gradient(90deg, ${NAVY}55, ${NAVY})` }} />
          <span className="text-slate-600 font-medium">Price History</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-5 border-t-2 border-dashed border-slate-300" />
          <span className="text-slate-500">Avg: <span className="font-semibold text-slate-800">{formatPrice(avg)}</span></span>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <span className="text-slate-500">Low: <span className="font-semibold text-emerald-600">{formatPrice(minPrice)}</span></span>
          <span className="text-slate-500">
            Current:{' '}
            <span className="font-bold" style={{ color: GOLD }}>
              {formatPrice(chartData[currentIndex]?.price ?? currentPerPerson)}
            </span>
          </span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
          <defs>
            <linearGradient id="navyGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor={NAVY} stopOpacity={0.22} />
              <stop offset="95%" stopColor={NAVY} stopOpacity={0}    />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
          <XAxis
            dataKey="date"
            tickFormatter={val => formatDateShort(val)}
            tick={{ fontSize: 11, fill: '#94a3b8' }}
            tickLine={false}
            axisLine={{ stroke: '#e2e8f0' }}
            interval={Math.floor(chartData.length / 5)}
          />
          <YAxis
            tickFormatter={val => formatPrice(val)}
            tick={{ fontSize: 11, fill: '#94a3b8' }}
            tickLine={false}
            axisLine={false}
            domain={[minPrice - padding, maxPrice + padding]}
            width={85}
          />
          <Tooltip
            content={({ active, payload, label }) => {
              if (!active || !payload?.length) return null
              return (
                <div className="bg-white shadow-xl border border-slate-200 rounded-xl p-3 min-w-[130px]">
                  <p className="text-[11px] text-slate-400 mb-1">{formatDateShort(label)}</p>
                  <p className="text-sm font-bold" style={{ color: NAVY }}>{formatPrice(payload[0].value as number)}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">per person</p>
                </div>
              )
            }}
            cursor={{ stroke: '#cbd5e1', strokeDasharray: '4 4' }}
          />
          <ReferenceLine
            y={avg}
            stroke="#cbd5e1"
            strokeDasharray="5 5"
            strokeWidth={1.5}
          />
          <Area
            type="monotone"
            dataKey="price"
            stroke={NAVY}
            strokeWidth={2.5}
            fill="url(#navyGradient)"
            dot={(props: any) => {
              const { cx, cy, index } = props
              if (index !== currentIndex) return <g key={`dot-${index}`} />
              return (
                <circle
                  key={`dot-current`}
                  cx={cx}
                  cy={cy}
                  r={6}
                  fill={GOLD}
                  stroke={NAVY}
                  strokeWidth={2}
                />
              )
            }}
            activeDot={{ r: 5, fill: NAVY, strokeWidth: 2, stroke: '#fff' }}
          />
        </AreaChart>
      </ResponsiveContainer>

      <p className="text-[10px] text-slate-400 mt-3 text-center">
        Historical prices are tracked weekly · Gold dot = current price · Source: synthesized from market data
      </p>
    </div>
  )
}

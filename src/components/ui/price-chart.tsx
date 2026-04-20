'use client'

import { AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'
import type { PriceSnapshot } from '@/types/database'
import { formatPrice, formatDateShort } from '@/lib/utils'

interface PriceChartProps {
  snapshots: PriceSnapshot[]
  currentPrice: number
  className?: string
}

export function PriceChart({ snapshots, currentPrice, className }: PriceChartProps) {
  if (snapshots.length < 2) {
    return (
      <div className={`h-80 flex items-center justify-center bg-slate-50 rounded-lg ${className || ''}`}>
        <p className="text-sm text-slate-500">Not enough price history data yet</p>
      </div>
    )
  }

  const data = snapshots.map((s) => ({
    date: s.snapshot_date,
    price: s.lowest_price,
    inside: s.inside_price,
    oceanview: s.oceanview_price,
    verandah: s.verandah_price,
  }))

  const allPrices = data.map((d) => d.price)
  const minPrice = Math.min(...allPrices)
  const maxPrice = Math.max(...allPrices)
  const avg = allPrices.reduce((a, b) => a + b, 0) / allPrices.length
  const padding = (maxPrice - minPrice) * 0.15 || 200

  // Find the index of current price point (latest)
  const currentIndex = data.length - 1

  return (
    <div className={className}>
      <div className="flex items-center gap-4 mb-6 text-xs flex-wrap">
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-3 bg-gradient-to-r from-blue-400 to-blue-600 rounded" />
          <span className="text-slate-600 font-medium">Price History</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 border-t-2 border-dashed border-slate-400" />
          <span className="text-slate-600">Average: <span className="font-semibold text-slate-900">{formatPrice(avg)}</span></span>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <span className="text-slate-600">All-time low: <span className="font-semibold text-emerald-600">{formatPrice(minPrice)}</span></span>
          <span className="text-slate-600">Current: <span className="font-semibold text-blue-600">{formatPrice(currentPrice)}</span></span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={340}>
        <AreaChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
          <defs>
            <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
          <XAxis
            dataKey="date"
            tickFormatter={(val) => formatDateShort(val)}
            tick={{ fontSize: 12, fill: '#78909c' }}
            tickLine={false}
            axisLine={{ stroke: '#e2e8f0' }}
            interval={Math.floor(data.length / 5)}
          />
          <YAxis
            tickFormatter={(val) => formatPrice(val)}
            tick={{ fontSize: 12, fill: '#78909c' }}
            tickLine={false}
            axisLine={false}
            domain={[minPrice - padding, maxPrice + padding]}
            width={80}
          />
          <Tooltip
            content={({ active, payload, label }) => {
              if (!active || !payload?.length) return null
              return (
                <div className="bg-white shadow-lg border border-slate-200 rounded-lg p-3">
                  <p className="text-xs text-slate-500 mb-1">{formatDateShort(label)}</p>
                  <p className="text-sm font-bold text-blue-600">{formatPrice(payload[0].value as number)}</p>
                </div>
              )
            }}
            cursor={{ stroke: '#cbd5e1', strokeDasharray: '4 4' }}
          />
          <ReferenceLine
            y={avg}
            stroke="#a1a1a1"
            strokeDasharray="5 5"
            strokeWidth={1}
            label={{ value: 'Avg', position: 'insideTopRight', offset: -5, fill: '#64748b', fontSize: 11 }}
          />
          <Area
            type="monotone"
            dataKey="price"
            stroke="#2563eb"
            strokeWidth={3}
            fill="url(#priceGradient)"
            dot={(props) => {
              const { cx, cy, payload, index } = props as any
              const isLatest = index === currentIndex
              return (
                <circle
                  key={`dot-${index}`}
                  cx={cx}
                  cy={cy}
                  r={isLatest ? 5 : 0}
                  fill={isLatest ? '#D4AF37' : 'transparent'}
                  stroke={isLatest ? '#2563eb' : 'transparent'}
                  strokeWidth={isLatest ? 2 : 0}
                />
              )
            }}
            activeDot={{ r: 6, fill: '#2563eb', strokeWidth: 2, stroke: '#fff' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

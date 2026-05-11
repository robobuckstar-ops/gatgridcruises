import { getScoreBg } from '@/lib/utils'
import { Info } from 'lucide-react'

interface ScoreBadgeProps {
  score: number
  size?: 'sm' | 'md' | 'lg'
  showTooltip?: boolean
}

export function ScoreBadge({ score, size = 'md', showTooltip = false }: ScoreBadgeProps) {
  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  }

  return (
    <div className="relative inline-flex items-center gap-1.5 group">
      <span className={`inline-flex items-center rounded-full font-semibold border ${getScoreBg(score)} ${sizes[size]}`}>
        {score}
      </span>
      {showTooltip && (
        <>
          <Info className="h-3.5 w-3.5 text-slate-400 cursor-help" />
          <div className="absolute bottom-full left-0 mb-2 w-64 p-3 bg-[#1E3A5F] text-white text-xs rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
            <p className="font-semibold mb-1">Sailing Score (0–100)</p>
            <p>A composite score based on price vs. historical average (60%), urgency (20%), and ship popularity (20%). Higher = better deal.</p>
          </div>
        </>
      )}
    </div>
  )
}

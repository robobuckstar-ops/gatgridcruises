'use client'

interface SkeletonCardProps {
  lines?: number
  showImage?: boolean
  className?: string
}

export function SkeletonCard({
  lines = 3,
  showImage = true,
  className = '',
}: SkeletonCardProps) {
  return (
    <div className={`bg-white rounded-lg p-6 ${className}`}>
      {showImage && (
        <div className="w-full h-48 bg-slate-200 rounded-lg mb-4 animate-pulse" />
      )}

      <div className="space-y-3">
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={`bg-slate-200 rounded h-4 animate-pulse ${
              i === lines - 1 ? 'w-3/4' : 'w-full'
            }`}
          />
        ))}
      </div>

      <div className="mt-4 flex gap-2">
        <div className="h-10 bg-slate-200 rounded px-4 flex-1 animate-pulse" />
        <div className="h-10 bg-slate-200 rounded px-4 flex-1 animate-pulse" />
      </div>
    </div>
  )
}

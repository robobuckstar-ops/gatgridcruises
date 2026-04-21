'use client'

interface GuestCountSelectorProps {
  value: number
  onChange: (count: number) => void
  className?: string
}

export function GuestCountSelector({ value, onChange, className = '' }: GuestCountSelectorProps) {
  const options = [
    { count: 1, label: '1 Guest' },
    { count: 2, label: '2 Guests' },
    { count: 3, label: '3 Guests' },
    { count: 4, label: '4+ Guests' },
  ]

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-sm font-medium text-gray-600 whitespace-nowrap">Guests:</span>
      <div className="flex rounded-lg border border-gray-200 overflow-hidden">
        {options.map(({ count, label }) => (
          <button
            key={count}
            onClick={() => onChange(count)}
            className={`px-3 py-1.5 text-sm font-medium transition-colors ${
              value === count
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}

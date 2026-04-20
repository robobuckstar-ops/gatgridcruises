interface AdSlotProps {
  location: string
  size?: '728x90' | '300x250' | 'native'
  className?: string
}

export function AdSlot({ location, size = '300x250', className = '' }: AdSlotProps) {
  const dimensions = {
    '728x90': 'h-[90px] max-w-[728px]',
    '300x250': 'h-[250px] w-[300px]',
    'native': 'min-h-[120px]',
  }

  return (
    <div className={`${dimensions[size]} mx-auto bg-slate-50 border border-dashed border-slate-300 rounded-lg flex items-center justify-center ${className}`}>
      <div className="text-center">
        <p className="text-xs text-slate-400 font-medium">Ad Placement</p>
        <p className="text-[10px] text-slate-300">{location} · {size}</p>
      </div>
    </div>
  )
}

interface AdSlotProps {
  location?: string
  placement?: string
  size?: '728x90' | '300x250' | 'native'
  width?: number
  height?: number
  className?: string
}

export function AdSlot({
  location,
  placement,
  size,
  width,
  height,
  className = '',
}: AdSlotProps) {
  const label = location ?? placement ?? 'ad'

  let sizeClass = 'h-[250px] w-[300px]'
  if (size === '728x90' || (width && width >= 600)) {
    sizeClass = 'h-[90px] max-w-[728px] w-full'
  } else if (size === 'native') {
    sizeClass = 'min-h-[120px] w-full'
  }

  return (
    <div className={`${sizeClass} mx-auto bg-slate-50 border border-dashed border-slate-300 rounded-lg flex items-center justify-center ${className}`}>
      <div className="text-center">
        <p className="text-xs text-slate-400 font-medium">Ad Placement</p>
        <p className="text-[10px] text-slate-300">{label}</p>
      </div>
    </div>
  )
}

export default AdSlot

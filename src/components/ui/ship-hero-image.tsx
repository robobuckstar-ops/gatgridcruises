'use client'

import { useState } from 'react'
import { Ship as ShipIcon } from 'lucide-react'

interface ShipHeroImageProps {
  src: string
  shipName: string
  yearLaunched?: number
  className?: string
  imgClassName?: string
}

// Per-ship accent colors so the placeholders are visually distinct until real photos drop in.
// Once /public/images/ships/<slug>.jpg exists, the photo is rendered automatically; the
// placeholder shows only when the image fails to load.
const ACCENT_BY_SHIP: Record<string, string> = {
  'Disney Magic':     'from-amber-700 via-rose-700 to-amber-900',
  'Disney Wonder':    'from-sky-700 via-cyan-600 to-sky-900',
  'Disney Dream':     'from-indigo-700 via-blue-600 to-indigo-900',
  'Disney Fantasy':   'from-purple-700 via-fuchsia-600 to-purple-900',
  'Disney Wish':      'from-rose-700 via-pink-600 to-rose-900',
  'Disney Treasure':  'from-emerald-700 via-teal-600 to-emerald-900',
  'Disney Destiny':   'from-orange-700 via-amber-600 to-orange-900',
  'Disney Adventure': 'from-cyan-700 via-blue-600 to-cyan-900',
}

export function ShipHeroImage({
  src,
  shipName,
  yearLaunched,
  className = '',
  imgClassName = '',
}: ShipHeroImageProps) {
  const [errored, setErrored] = useState(false)
  const accent = ACCENT_BY_SHIP[shipName] ?? 'from-slate-700 via-blue-600 to-slate-900'
  const showPlaceholder = errored || !src

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {!showPlaceholder && (
        // Use a plain <img> tag so we don't have to allowlist remote hosts in next.config.ts.
        // When a real photo lands in /public/images/ships/, this loads transparently.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={shipName}
          loading="lazy"
          onError={() => setErrored(true)}
          className={`absolute inset-0 w-full h-full object-cover ${imgClassName}`}
        />
      )}
      {showPlaceholder && (
        <div className={`absolute inset-0 bg-gradient-to-br ${accent} flex flex-col items-center justify-center text-white`}>
          <ShipIcon className="w-12 h-12 mb-2 opacity-90" aria-hidden="true" />
          <p className="font-fraunces text-xl font-bold tracking-wide">{shipName}</p>
          {yearLaunched && <p className="text-xs uppercase tracking-widest opacity-80 mt-1">Launched {yearLaunched}</p>}
        </div>
      )}
    </div>
  )
}

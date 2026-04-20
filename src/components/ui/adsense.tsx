'use client'

import { useEffect, useRef } from 'react'

interface AdSenseProps {
  slot: string
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical'
  className?: string
  fallback?: boolean // If true, show placeholder instead of trying AdSense
}

export function AdSenseUnit({ slot, format = 'auto', className = '', fallback = true }: AdSenseProps) {
  const adRef = useRef<HTMLModElement>(null)
  const clientId = typeof window !== 'undefined' ? process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID : null

  useEffect(() => {
    if (!fallback && clientId && adRef.current) {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({})
      } catch (e) {
        // AdSense not loaded
      }
    }
  }, [clientId, fallback])

  // Show placeholder if no AdSense configured or fallback mode
  if (fallback || !clientId) {
    const sizes: Record<string, string> = {
      auto: 'min-h-[100px]',
      rectangle: 'h-[250px] w-[300px]',
      horizontal: 'h-[90px] max-w-[728px]',
      vertical: 'h-[600px] w-[160px]',
    }
    return (
      <div className={`${sizes[format]} mx-auto bg-slate-50 border border-dashed border-slate-300 rounded-lg flex items-center justify-center ${className}`}>
        <div className="text-center">
          <p className="text-xs text-slate-400 font-medium">Advertisement</p>
          <p className="text-[10px] text-slate-300">{slot}</p>
        </div>
      </div>
    )
  }

  return (
    <div className={className}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={clientId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  )
}

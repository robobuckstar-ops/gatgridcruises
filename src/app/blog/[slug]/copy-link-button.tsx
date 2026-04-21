'use client'

import { Copy } from 'lucide-react'

export function CopyLinkButton({ url }: { url: string }) {
  return (
    <button
      onClick={() => navigator.clipboard.writeText(url)}
      className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors font-medium"
    >
      <Copy className="h-4 w-4" />
      Copy Link
    </button>
  )
}

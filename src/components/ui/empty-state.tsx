import Link from 'next/link'
import { ReactNode } from 'react'

interface EmptyStateProps {
  icon?: ReactNode // lucide-react icon
  title: string
  description: string
  action?: { label: string; href: string }
  className?: string
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className = '',
}: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center py-12 px-4 ${className}`}>
      {icon && (
        <div className="text-slate-300 mb-4">
          {typeof icon === 'object' && 'props' in icon
            ? icon
            : <div className="text-5xl">{icon}</div>}
        </div>
      )}

      <h3 className="font-display text-2xl font-bold text-slate-900 mb-2 text-center">
        {title}
      </h3>

      <p className="text-slate-600 text-center max-w-md mb-6">
        {description}
      </p>

      {action && (
        <Link
          href={action.href}
          className="inline-flex items-center justify-center px-6 py-3 bg-[#1E3A5F] text-white font-medium rounded-lg hover:bg-[#162d4a] transition-colors duration-200"
        >
          {action.label}
        </Link>
      )}
    </div>
  )
}

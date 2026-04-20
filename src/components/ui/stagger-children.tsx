'use client'

import { ReactNode, Children } from 'react'

interface StaggerChildrenProps {
  children: ReactNode
  staggerDelay?: number // ms between each child
  animation?: string // animation type to apply
  className?: string
}

export function StaggerChildren({
  children,
  staggerDelay = 100,
  animation = 'fade-up',
  className = '',
}: StaggerChildrenProps) {
  return (
    <div className={className}>
      {Children.map(children, (child, index) => (
        <div
          key={index}
          className={`animate-${animation}`}
          style={{
            animationDelay: `${index * staggerDelay}ms`,
            opacity: 0,
            animation: `${animation} 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${
              index * staggerDelay
            }ms forwards`,
          }}
        >
          {child}
        </div>
      ))}
    </div>
  )
}

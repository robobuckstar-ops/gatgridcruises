'use client'

import { useRef, useEffect, useState, ReactNode } from 'react'

interface AnimateOnScrollProps {
  children: ReactNode
  className?: string
  animation?: 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right' | 'scale-up'
  delay?: number // ms
  threshold?: number
}

export function AnimateOnScroll({
  children,
  className = '',
  animation = 'fade-up',
  delay = 0,
  threshold = 0.1,
}: AnimateOnScrollProps) {
  const elementRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Trigger animation after delay
          if (delay > 0) {
            const timer = setTimeout(() => {
              setIsVisible(true)
            }, delay)
            return () => clearTimeout(timer)
          } else {
            setIsVisible(true)
          }
          // Stop observing once animation is triggered
          observer.unobserve(entry.target)
        }
      },
      {
        threshold,
      }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current)
      }
    }
  }, [delay, threshold])

  const animationClass = `animate-${animation}`

  return (
    <div
      ref={elementRef}
      className={`${animationClass} ${isVisible ? 'is-visible' : ''} ${className}`}
    >
      {children}
    </div>
  )
}

'use client'

import { useEffect } from 'react'

export function CopyProtection() {
  useEffect(() => {
    const isFormElement = (el: EventTarget | null): boolean => {
      if (!el || !(el instanceof HTMLElement)) return false
      const tag = el.tagName
      return (
        tag === 'INPUT' ||
        tag === 'TEXTAREA' ||
        tag === 'SELECT' ||
        el.isContentEditable ||
        el.closest('input, textarea, select, [contenteditable]') !== null
      )
    }

    const handleContextMenu = (e: MouseEvent) => {
      if (isFormElement(e.target)) return
      e.preventDefault()
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isFormElement(e.target)) return
      const ctrl = e.ctrlKey || e.metaKey
      // Block view-source, save-page, select-all, copy outside form elements
      if (ctrl && (e.key === 'u' || e.key === 's' || e.key === 'a' || e.key === 'c')) {
        e.preventDefault()
      }
    }

    const handleSelectStart = (e: Event) => {
      if (isFormElement(e.target)) return
      e.preventDefault()
    }

    document.addEventListener('contextmenu', handleContextMenu)
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('selectstart', handleSelectStart)

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu)
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('selectstart', handleSelectStart)
    }
  }, [])

  return null
}

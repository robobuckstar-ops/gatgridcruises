'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface AccordionItem {
  id: string
  title: string
  content: React.ReactNode
}

interface AccordionProps {
  items: AccordionItem[]
  allowMultiple?: boolean
}

export function Accordion({ items, allowMultiple = true }: AccordionProps) {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set())
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({})

  const toggleItem = (id: string) => {
    const newOpen = new Set(openIds)

    if (newOpen.has(id)) {
      newOpen.delete(id)
    } else {
      if (!allowMultiple) {
        newOpen.clear()
      }
      newOpen.add(id)
    }

    setOpenIds(newOpen)
  }

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent, itemId: string, index: number) => {
    const isOpen = openIds.has(itemId)

    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault()
        toggleItem(itemId)
        break
      case 'ArrowDown':
        e.preventDefault()
        if (index < items.length - 1) {
          buttonRefs.current[items[index + 1].id]?.focus()
        }
        break
      case 'ArrowUp':
        e.preventDefault()
        if (index > 0) {
          buttonRefs.current[items[index - 1].id]?.focus()
        }
        break
      case 'Home':
        e.preventDefault()
        buttonRefs.current[items[0].id]?.focus()
        break
      case 'End':
        e.preventDefault()
        buttonRefs.current[items[items.length - 1].id]?.focus()
        break
    }
  }

  return (
    <div className="space-y-3" role="region" aria-label="Accordion">
      {items.map((item, index) => (
        <div
          key={item.id}
          className="border border-slate-200 rounded-lg overflow-hidden hover:border-slate-300 transition-colors"
        >
          <button
            ref={(el) => {
              buttonRefs.current[item.id] = el
            }}
            onClick={() => toggleItem(item.id)}
            onKeyDown={(e) => handleKeyDown(e, item.id, index)}
            className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-slate-50 transition-colors focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-blue-600"
            aria-expanded={openIds.has(item.id)}
            aria-controls={`accordion-panel-${item.id}`}
            aria-label={`${item.title}, accordion item ${index + 1} of ${items.length}`}
          >
            <h3 className="text-left font-inter font-semibold text-slate-900">
              {item.title}
            </h3>
            <ChevronDown
              className={cn(
                'w-5 h-5 text-slate-600 transition-transform duration-200 flex-shrink-0 ml-4',
                openIds.has(item.id) && 'rotate-180'
              )}
              aria-hidden="true"
            />
          </button>

          {/* Content with smooth height animation */}
          <div
            id={`accordion-panel-${item.id}`}
            className={cn(
              'overflow-hidden transition-all duration-300 ease-in-out',
              openIds.has(item.id) ? 'max-h-96' : 'max-h-0'
            )}
            role="region"
            aria-labelledby={`accordion-button-${item.id}`}
            hidden={!openIds.has(item.id)}
          >
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 text-slate-700 font-inter text-sm leading-relaxed">
              {item.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

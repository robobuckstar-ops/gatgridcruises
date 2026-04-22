'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown, Anchor } from 'lucide-react'

const navItems = [
  { label: 'Deals', href: '/deals' },
  { label: 'Flash Deals', href: '/deals/flash-deals' },
  { label: 'Ships', href: '/ships' },
  { label: 'Guides', href: '/guides' },
  { label: 'Travel Hacks', href: '/travel-hacks' },
  {
    label: 'Tools',
    href: '/tools',
    children: [
      { label: 'AI Cruise Finder', href: '/search' },
      { label: 'Cost Calculator', href: '/tools/cost-calculator' },
      { label: 'Flight Finder', href: '/tools/flights' },
      { label: 'Stateroom Finder', href: '/tools/staterooms' },
      { label: 'Transfer Guide', href: '/tools/transfers' },
      { label: 'Compare Sailings', href: '/tools/compare' },
    ],
  },
  { label: 'Blog', href: '/blog' },
]

export function Header() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [toolsOpen, setToolsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (mobileOpen) {
          setMobileOpen(false)
          menuButtonRef.current?.focus()
        }
        if (toolsOpen) setToolsOpen(false)
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [mobileOpen, toolsOpen])

  useEffect(() => {
    if (!mobileOpen || !menuRef.current) return
    const focusable = menuRef.current.querySelectorAll<HTMLElement>(
      'a, button, [tabindex]:not([tabindex="-1"])'
    )
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      if (e.shiftKey) {
        if (document.activeElement === first) { last.focus(); e.preventDefault() }
      } else {
        if (document.activeElement === last) { first.focus(); e.preventDefault() }
      }
    }
    document.addEventListener('keydown', handleTab)
    first?.focus()
    return () => document.removeEventListener('keydown', handleTab)
  }, [mobileOpen])

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + '/')

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center group-hover:from-blue-700 group-hover:to-blue-900 transition-all">
              <Anchor className="w-4 h-4 text-white" aria-hidden="true" />
            </div>
            <span className="font-bold text-slate-900 text-base leading-tight">
              Disney Cruise<br />
              <span className="text-blue-600 text-sm font-semibold">Deal Finder</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Main navigation" className="hidden md:flex items-center gap-0.5">
            {navItems.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setToolsOpen(true)}
                  onMouseLeave={() => setToolsOpen(false)}
                >
                  <button
                    className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-slate-700 hover:text-blue-600 rounded-lg hover:bg-slate-50 transition-colors duration-150"
                    aria-expanded={toolsOpen}
                    aria-haspopup="true"
                    aria-controls="tools-dropdown"
                  >
                    {item.label}
                    <ChevronDown
                      className="h-3.5 w-3.5 transition-transform duration-200"
                      aria-hidden="true"
                      style={{ transform: toolsOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    />
                  </button>
                  {toolsOpen && (
                    <div
                      id="tools-dropdown"
                      className="absolute top-full left-0 mt-1 w-52 bg-white rounded-xl shadow-lg border border-slate-200 py-1.5"
                      role="menu"
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-150"
                          role="menuitem"
                          onClick={() => setToolsOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-150 ${
                    isActive(item.href)
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                  }`}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* Mobile hamburger */}
          <button
            ref={menuButtonRef}
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-slate-700 hover:text-blue-600 transition-colors rounded-lg"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          ref={menuRef}
          id="mobile-menu"
          className="md:hidden border-t border-slate-200 bg-white"
          role="navigation"
          aria-label="Mobile navigation"
        >
          <nav className="px-4 py-3 space-y-0.5">
            {navItems.map((item) => (
              <div key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-3 py-2.5 text-base font-medium rounded-lg transition-colors duration-150 ${
                    isActive(item.href)
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-blue-600'
                  }`}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="pl-4 mt-0.5 mb-1 space-y-0.5">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setMobileOpen(false)}
                        className={`block px-3 py-2 text-sm rounded-lg transition-colors duration-150 ${
                          isActive(child.href)
                            ? 'text-blue-600 font-medium'
                            : 'text-slate-500 hover:text-blue-600'
                        }`}
                        aria-current={isActive(child.href) ? 'page' : undefined}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}

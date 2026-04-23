'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown } from 'lucide-react'
import { SrOnly } from '@/components/ui/sr-only'

const navItems = [
  { label: 'Deals', href: '/deals' },
  { label: 'Last-Minute', href: '/deals/last-minute' },
  { label: '🔔 Deal Alerts', href: '/deal-alerts' },
  { label: 'Ships', href: '/ships' },
  {
    label: 'Tools',
    href: '/tools',
    children: [
      { label: 'AI Cruise Finder', href: '/search' },
      { label: 'OBC Calculator', href: '/tools/obc-calculator' },
      { label: 'Cost Calculator', href: '/tools/cost-calculator' },
      { label: 'Carbon Calculator', href: '/tools/carbon-calculator' },
      { label: 'Flight Finder', href: '/tools/flights' },
      { label: 'Stateroom Finder', href: '/tools/staterooms' },
      { label: 'Transfer Guide', href: '/tools/transfers' },
      { label: 'Compare Sailings', href: '/tools/compare' },
      { label: 'Price Tracker', href: '/price-tracker' },
    ],
  },
  { label: 'Blog', href: '/blog' },
  {
    label: 'Guides',
    href: '/guides',
    children: [
      { label: 'All Guides', href: '/guides' },
      { label: 'Packing Gear', href: '/guides/packing-gear' },
      { label: 'Travel Insurance', href: '/guides/travel-insurance' },
      { label: 'Port Guides', href: '/guides/ports' },
      { label: '↳ Port Canaveral', href: '/guides/ports/port-canaveral' },
      { label: '↳ Nassau', href: '/guides/ports/nassau' },
      { label: '↳ Castaway Cay', href: '/guides/ports/castaway-cay' },
      { label: '↳ Cozumel', href: '/guides/ports/cozumel' },
    ],
  },
  { label: 'Travel Hacks', href: '/travel-hacks' },
  { label: 'Solo Cruising', href: '/solo-cruising' },
  { label: 'Hotels', href: '/hotels' },
  { label: 'About', href: '/about' },
]

export function Header() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  const announceMenuState = (isOpen: boolean) => {
    const announcement = document.createElement('div')
    announcement.setAttribute('role', 'status')
    announcement.setAttribute('aria-live', 'polite')
    announcement.setAttribute('aria-atomic', 'true')
    announcement.className = 'sr-only'
    announcement.textContent = isOpen ? 'Mobile menu opened' : 'Mobile menu closed'
    document.body.appendChild(announcement)
    setTimeout(() => announcement.remove(), 1000)
  }

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (mobileOpen) {
          setMobileOpen(false)
          announceMenuState(false)
          menuButtonRef.current?.focus()
        }
        if (openDropdown) {
          setOpenDropdown(null)
        }
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [mobileOpen, openDropdown])

  useEffect(() => {
    if (!mobileOpen || !menuRef.current) return

    const focusableElements = menuRef.current.querySelectorAll(
      'a, button, [tabindex]:not([tabindex="-1"])'
    )
    const firstElement = focusableElements[0] as HTMLElement
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus()
          e.preventDefault()
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus()
          e.preventDefault()
        }
      }
    }

    document.addEventListener('keydown', handleTab)
    firstElement?.focus()

    return () => document.removeEventListener('keydown', handleTab)
  }, [mobileOpen])

  const isCurrentPage = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/')
  }

  const handleMobileMenuToggle = () => {
    setMobileOpen(!mobileOpen)
    announceMenuState(!mobileOpen)
  }

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-display">
            <span className="text-gold text-xl" aria-hidden="true">
              ⚓
            </span>
            <span className="text-xl font-bold text-navy">
              GatGridCruises
              <SrOnly> — Best Disney Cruise Deals</SrOnly>
            </span>
          </Link>

          {/* Get a Quote CTA — desktop */}
          <Link
            href="/book"
            className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#D4AF37] text-[#1E3A5F] text-sm font-bold hover:bg-yellow-300 transition-colors duration-200 shadow-sm"
          >
            Get a Quote
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Main navigation" className="hidden md:flex items-center gap-1">
            {navItems.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-slate-700 hover:text-navy rounded-lg hover:bg-slate-50 transition-colors duration-200"
                    aria-expanded={openDropdown === item.label}
                    aria-haspopup="true"
                    aria-controls={`${item.label.toLowerCase()}-dropdown`}
                  >
                    {item.label}
                    <ChevronDown
                      className="h-3.5 w-3.5 transition-transform duration-200"
                      aria-hidden="true"
                      style={{
                        transform: openDropdown === item.label ? 'rotate(180deg)' : 'rotate(0deg)',
                      }}
                    />
                  </button>
                  {openDropdown === item.label && (
                    <div
                      id={`${item.label.toLowerCase()}-dropdown`}
                      className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-lg border border-slate-200 py-2"
                      role="menu"
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-navy transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-blue-600"
                          role="menuitem"
                          onClick={() => setOpenDropdown(null)}
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
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    isCurrentPage(item.href)
                      ? 'text-navy bg-slate-100'
                      : 'text-slate-700 hover:text-navy hover:bg-slate-50'
                  }`}
                  aria-current={isCurrentPage(item.href) ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* Mobile hamburger */}
          <button
            ref={menuButtonRef}
            onClick={handleMobileMenuToggle}
            className="md:hidden p-2 text-slate-700 hover:text-navy transition-colors duration-200 rounded-lg"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
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
          <nav className="px-4 py-4 space-y-1">
            <Link
              href="/book"
              onClick={() => { setMobileOpen(false); announceMenuState(false) }}
              className="block px-3 py-2.5 text-base font-bold rounded-lg bg-[#D4AF37] text-[#1E3A5F] text-center mb-2"
            >
              Get a Free Quote
            </Link>
            {navItems.map((item) => (
              <div key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => {
                    setMobileOpen(false)
                    announceMenuState(false)
                  }}
                  className={`block px-3 py-2 text-base font-medium rounded-lg transition-colors duration-200 ${
                    isCurrentPage(item.href)
                      ? 'text-navy bg-slate-100'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-navy'
                  }`}
                  aria-current={isCurrentPage(item.href) ? 'page' : undefined}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="pl-4" role="region" aria-label={`${item.label} submenu`}>
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => {
                          setMobileOpen(false)
                          announceMenuState(false)
                        }}
                        className={`block px-3 py-1.5 text-sm rounded-lg transition-colors duration-200 ${
                          isCurrentPage(child.href)
                            ? 'text-navy font-medium'
                            : 'text-slate-500 hover:text-navy'
                        }`}
                        aria-current={isCurrentPage(child.href) ? 'page' : undefined}
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

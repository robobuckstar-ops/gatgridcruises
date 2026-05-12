'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown } from 'lucide-react'
import { SrOnly } from '@/components/ui/sr-only'

const navItems = [
  { label: 'Ships', href: '/ships' },
  {
    label: 'Deals',
    href: '/deals',
    children: [
      { label: 'Current Deals', href: '/deals' },
      { label: 'Last-Minute Deals', href: '/deals/last-minute' },
      { label: '🎲 Restricted Stateroom Deals', href: '/deals/restricted-staterooms' },
      { label: '🎖️ Military Deals', href: '/deals/military' },
      { label: '🔔 Deal Alerts', href: '/deal-alerts' },
    ],
  },
  {
    label: 'Guides',
    href: '/guides',
    children: [
      { label: 'All Guides', href: '/guides' },
      { label: 'First-Time Tips', href: '/guides/first-time-disney-cruise-tips' },
      { label: 'Stateroom Comparison', href: '/guides/stateroom-comparison' },
      { label: 'Packing List', href: '/guides/disney-cruise-packing-list' },
      { label: '🏝️ Port Guides', href: '/ports' },
      { label: 'Castaway Cay', href: '/guides/castaway-cay-guide' },
      { label: 'Lookout Cay', href: '/guides/ports/lookout-cay' },
      { label: 'With Toddlers', href: '/guides/disney-cruise-with-toddlers' },
      { label: 'Port Canaveral vs Miami', href: '/guides/port-canaveral-vs-miami' },
      { label: 'Excursion Savings', href: '/guides/excursion-savings' },
    ],
  },
  {
    label: 'Tools',
    href: '/tools',
    children: [
      { label: 'OBC Calculator', href: '/tools/obc-calculator' },
      { label: '💳 Credit Card Hacks', href: '/tools/credit-cards' },
      { label: 'Flight Finder', href: '/tools/flights' },
      { label: '✈️ Flight Deal Alerts', href: '/flight-deals' },
      { label: 'Transfer Guide', href: '/tools/transfers' },
      { label: 'Stateroom Finder', href: '/tools/staterooms' },
      { label: 'Price Tracker', href: '/price-tracker' },
      { label: 'Port Hotels', href: '/hotels' },
    ],
  },
  {
    label: 'Community',
    href: '/blog',
    children: [
      { label: 'Blog', href: '/blog' },
      { label: 'Sail Together', href: '/community/sail-together' },
      { label: 'Solo Cruising', href: '/solo-cruising' },
      { label: 'Travel Hacks', href: '/travel-hacks' },
    ],
  },
  {
    label: 'About',
    href: '/about',
    children: [
      { label: 'About GatGrid', href: '/about' },
      { label: '⭐ Concierge Service', href: '/concierge' },
      { label: '🤝 Partner Program', href: '/referral' },
    ],
  },
]

export function Header() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [openMobileSection, setOpenMobileSection] = useState<string | null>(null)
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
    if (mobileOpen) setOpenMobileSection(null)
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

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              href="/my-trip"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-navy text-navy text-sm font-semibold hover:bg-navy hover:text-white transition-colors duration-200"
            >
              ⚓ My Trip
            </Link>
            <Link
              href="/book"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#D4AF37] text-[#1E3A5F] text-sm font-bold hover:bg-yellow-300 transition-colors duration-200 shadow-sm"
            >
              Get a Quote
            </Link>
          </div>

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
                          className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-navy transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-[#1E3A5F]"
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
          className="md:hidden border-t border-slate-200 bg-white max-h-[calc(100vh-4rem)] overflow-y-auto"
          role="navigation"
          aria-label="Mobile navigation"
        >
          <nav className="px-4 py-4 space-y-0.5">
            <Link
              href="/book"
              onClick={() => { setMobileOpen(false); announceMenuState(false) }}
              className="block px-3 py-2.5 text-base font-bold rounded-lg bg-[#D4AF37] text-[#1E3A5F] text-center mb-2"
            >
              Get a Free Quote
            </Link>
            <Link
              href="/my-trip"
              onClick={() => { setMobileOpen(false); announceMenuState(false) }}
              className="block px-3 py-2.5 text-base font-semibold rounded-lg border-2 border-navy text-navy text-center mb-3"
            >
              ⚓ My Trip
            </Link>

            {navItems.map((item) => (
              <div key={item.label}>
                {item.children ? (
                  <>
                    <button
                      onClick={() =>
                        setOpenMobileSection(openMobileSection === item.label ? null : item.label)
                      }
                      className="flex items-center justify-between w-full px-3 py-2.5 text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-navy rounded-lg transition-colors duration-200"
                      aria-expanded={openMobileSection === item.label}
                    >
                      {item.label}
                      <ChevronDown
                        className="h-4 w-4 flex-shrink-0 transition-transform duration-200"
                        aria-hidden="true"
                        style={{
                          transform:
                            openMobileSection === item.label ? 'rotate(180deg)' : 'rotate(0deg)',
                        }}
                      />
                    </button>
                    {openMobileSection === item.label && (
                      <div className="mt-0.5 mb-1 ml-3 border-l-2 border-slate-100 pl-3 space-y-0.5">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => {
                              setMobileOpen(false)
                              announceMenuState(false)
                            }}
                            className={`block px-3 py-2 text-sm rounded-lg transition-colors duration-200 ${
                              isCurrentPage(child.href)
                                ? 'text-navy font-medium bg-slate-50'
                                : 'text-slate-600 hover:text-navy hover:bg-slate-50'
                            }`}
                            aria-current={isCurrentPage(child.href) ? 'page' : undefined}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    onClick={() => {
                      setMobileOpen(false)
                      announceMenuState(false)
                    }}
                    className={`block px-3 py-2.5 text-base font-medium rounded-lg transition-colors duration-200 ${
                      isCurrentPage(item.href)
                        ? 'text-navy bg-slate-100'
                        : 'text-slate-700 hover:bg-slate-50 hover:text-navy'
                    }`}
                    aria-current={isCurrentPage(item.href) ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}

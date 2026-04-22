import Link from 'next/link'
import { ArrowRight, Star } from 'lucide-react'

export function GetQuoteCTA() {
  return (
    <section className="bg-[#1E3A5F] py-14 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
              <Star className="w-5 h-5 text-[#D4AF37] fill-[#D4AF37]" aria-hidden="true" />
              <span className="text-[#D4AF37] text-sm font-semibold uppercase tracking-wider">
                Free Service — No Obligation
              </span>
            </div>
            <h2 className="font-fraunces text-3xl md:text-4xl font-bold text-white mb-3">
              Planning a Disney Cruise?
            </h2>
            <p className="text-blue-200 text-lg max-w-xl">
              Our specialists find you the best price and availability — our service is completely free. We earn a commission from the cruise line, not you.
            </p>
          </div>
          <div className="flex flex-col items-center gap-3 flex-shrink-0">
            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#D4AF37] text-[#1E3A5F] font-bold text-lg hover:bg-yellow-300 transition-colors duration-200 shadow-lg"
            >
              Get My Free Quote
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </Link>
            <p className="text-blue-300 text-xs text-center">
              Licensed advisor through Boardwalk Travel Agency
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

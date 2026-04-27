import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center">
        {/* 404 Number */}
        <p className="font-fraunces text-9xl md:text-10xl font-bold text-blue-600 mb-4" aria-hidden="true">
          404
        </p>

        {/* Heading */}
        <h1 className="font-fraunces text-4xl md:text-5xl font-bold text-slate-900 mb-4">
          Page Not Found
        </h1>

        {/* Subtitle */}
        <p className="font-inter text-xl text-gray-600 mb-12 max-w-md mx-auto">
          Looks like this ship has sailed. Let's get you back on course.
        </p>

        {/* Action Links */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg bg-[#1E3A5F] text-white font-semibold hover:bg-blue-700 transition-colors duration-200"
          >
            Return Home
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>

          <Link
            href="/deals"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg border-2 border-[#1E3A5F] text-[#1E3A5F] font-semibold hover:bg-[#1E3A5F] hover:text-white transition-colors duration-200"
          >
            Browse Deals
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>

          <Link
            href="/tools/cost-calculator"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg border-2 border-[#D4AF37] text-[#D4AF37] font-semibold hover:bg-[#D4AF37] hover:text-slate-900 transition-colors duration-200"
          >
            Cost Calculator
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  )
}

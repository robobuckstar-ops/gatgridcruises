import { Metadata } from 'next'
import { Mail, TrendingDown, Ship, Anchor } from 'lucide-react'
import { EmailSignup } from '@/components/ui/email-signup'

export const metadata: Metadata = {
  title: 'Subscribe to Weekly Deals',
  description: 'Get the best Disney cruise deals delivered to your inbox every Sunday. Free weekly digest with price drops, travel tips, and exclusive insights.',
}

export default function SubscribePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#0a1628] to-[#1E3A5F] text-white py-16 md:py-24 border-b border-slate-200">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#1E3A5F]/20 rounded-full mb-6">
            <Mail className="w-8 h-8 text-[#D4AF37]" />
          </div>

          <h1 className="font-fraunces text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Never Miss a Disney Cruise Deal
          </h1>

          <p className="font-inter text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Get the best Disney cruise price drops, travel tips, and planning insights delivered to your inbox every Sunday. Free, no spam, unsubscribe anytime.
          </p>
        </div>
      </section>

      {/* Signup Form Section */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-lg px-4 sm:px-6 lg:px-8">
          <EmailSignup />
        </div>
      </section>

      {/* What You'll Get Section */}
      <section className="bg-slate-50 py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-fraunces text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center">
            What You'll Get
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Price Drops */}
            <div className="bg-white rounded-xl p-8 border border-slate-200">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-emerald-100 mb-4">
                <TrendingDown className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="font-fraunces text-xl font-bold text-slate-900 mb-3">
                Biggest Price Drops
              </h3>
              <p className="font-inter text-gray-600">
                We scan sailing prices daily. Your digest highlights the biggest price drops and best current deals so you can book at the right time.
              </p>
            </div>

            {/* Featured Sailings */}
            <div className="bg-white rounded-xl p-8 border border-slate-200">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-[#1E3A5F]/20 mb-4">
                <Ship className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-fraunces text-xl font-bold text-slate-900 mb-3">
                Featured Sailings
              </h3>
              <p className="font-inter text-gray-600">
                Our curated selection of sailings worth your attention — including insider tips on which itineraries offer the best value.
              </p>
            </div>

            {/* Planning Tips */}
            <div className="bg-white rounded-xl p-8 border border-slate-200">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-amber-100 mb-4">
                <Anchor className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="font-fraunces text-xl font-bold text-slate-900 mb-3">
                Planning Tips
              </h3>
              <p className="font-inter text-gray-600">
                Expert advice on everything from stateroom selection to pre-cruise hotels, plus community insights from other cruisers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="bg-[#1E3A5F]/10 rounded-xl p-8 border border-[#D4AF37]/30">
            <h2 className="font-fraunces text-2xl font-bold text-slate-900 mb-4 text-center">
              Why Subscribe?
            </h2>
            <ul className="font-inter text-slate-700 space-y-3">
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <span>Stay ahead of price drops without constantly checking the web</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#D4AF37] font-bold">✓</span>
                <span>Get expert planning advice delivered right to your inbox</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#D4AF37] font-bold">✓</span>
                <span>No spam, no hard sales, just honest Disney cruise insights</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#D4AF37] font-bold">✓</span>
                <span>Unsubscribe anytime with one click</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  )
}

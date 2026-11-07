import { Metadata } from 'next'
import { OBCDisclaimer } from '@/components/ui/obc-disclaimer'
import { ObcEstimateForm } from './ObcEstimateForm'

export const metadata: Metadata = {
  title: 'See Your Onboard Credit in 60 Seconds | GatGrid Cruises',
  description:
    'A quick estimate of the onboard credit you could get on a Disney cruise booked with GatGrid Cruises, plus our free first-timer guide.',
  alternates: { canonical: '/obc-estimate' },
}

export default function ObcEstimatePage() {
  return (
    <main className="bg-slate-50 py-8 md:py-14">
      <div className="mx-auto max-w-xl px-4 sm:px-6">
        <h1 className="mb-2 text-center font-fraunces text-3xl font-bold text-[#1E3A5F] md:text-4xl">
          Get Your Onboard Credit Estimate
        </h1>
        <p className="mb-6 text-center font-inter text-base text-slate-600">
          Same Disney fare. Free onboard credit on top. Tell us a little and see your estimate right
          here, plus our free first-timer guide as a bonus.
        </p>
        <ObcEstimateForm />
        <div className="mt-6">
          <OBCDisclaimer />
        </div>
      </div>
    </main>
  )
}

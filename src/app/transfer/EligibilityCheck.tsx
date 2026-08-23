'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Info, Mail, RotateCcw } from 'lucide-react'
import { formatUSD, getOBC } from '@/lib/obc'
import { TransferForm } from './TransferForm'

/**
 * Self-qualification quiz that sits at the top of /transfer.
 *
 * Three yes/no questions cover the whole of Disney Cruise Line's transfer
 * policy, so a visitor knows where they stand before they type anything. The
 * logic is entirely client-side — nothing is submitted until the visitor
 * reaches the lead form, and the form itself is the same one the page has
 * always used, just revealed rather than always-on.
 *
 * A "no" answer is never a dead end: the blocked outcomes explain the reason in
 * plain language and offer what we can still do for that visitor.
 */

type Choice = boolean | null

interface Question {
  id: string
  prompt: string
  help?: string
  /** Copy for the answer that maps to `true`. */
  yes: string
  /** Copy for the answer that maps to `false`. */
  no: string
}

const QUESTIONS: Question[] = [
  {
    id: 'booked',
    prompt: 'When did you book this cruise?',
    help: 'Disney generally allows a transfer within about 30 days of the original booking date.',
    yes: 'Within the last 30 days',
    no: 'Longer ago than that',
  },
  {
    id: 'paid',
    prompt: 'Have you made your final payment yet?',
    help: 'A reservation that is paid in full can no longer be transferred.',
    yes: 'Yes — paid in full',
    no: 'Not yet — still on a deposit',
  },
  {
    id: 'agent',
    prompt: 'Is a travel agency already on the booking?',
    help: 'Disney only transfers reservations out of its own direct channel.',
    yes: 'Yes — an agency has it',
    no: 'No — I booked direct with Disney',
  },
]

/** Illustrative dollar figures, always derived from the OBC module. */
const OBC_LOW = formatUSD(getOBC(2000))
const OBC_HIGH = formatUSD(getOBC(10000))
const OBC_MID = formatUSD(getOBC(5000))

type Outcome = 'eligible' | 'window' | 'paid' | 'agent'

function OptionButton({
  label,
  selected,
  onClick,
}: {
  label: string
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`flex-1 rounded-xl border px-4 py-3.5 text-left font-inter text-sm font-semibold transition-colors sm:text-center ${
        selected
          ? 'border-[#D4AF37] bg-[#D4AF37] text-[#0a1628] shadow-lg'
          : 'border-white/20 bg-white/5 text-blue-100 hover:border-[#D4AF37]/60 hover:bg-white/10'
      }`}
    >
      {label}
    </button>
  )
}

export function EligibilityCheck() {
  const [booked, setBooked] = useState<Choice>(null)
  const [paid, setPaid] = useState<Choice>(null)
  const [agent, setAgent] = useState<Choice>(null)
  const resultRef = useRef<HTMLDivElement | null>(null)
  const hasScrolled = useRef(false)

  const answers: Choice[] = [booked, paid, agent]
  const setters = [setBooked, setPaid, setAgent]
  const answeredCount = answers.filter((a) => a !== null).length
  const complete = answeredCount === QUESTIONS.length

  // Disney's rules in order of severity: an agency already on the booking or a
  // completed final payment closes the door outright; the 30-day window is the
  // only condition worth a human second look.
  let outcome: Outcome | null = null
  if (complete) {
    if (agent) outcome = 'agent'
    else if (paid) outcome = 'paid'
    else if (booked) outcome = 'eligible'
    else outcome = 'window'
  }

  useEffect(() => {
    if (!complete || hasScrolled.current) return
    hasScrolled.current = true
    resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [complete])

  function reset() {
    setBooked(null)
    setPaid(null)
    setAgent(null)
    hasScrolled.current = false
  }

  const showForm = outcome === 'eligible' || outcome === 'window'

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl md:p-9">
      <div className="mb-7 text-center">
        <p className="mb-2 font-inter text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
          60-Second Eligibility Check
        </p>
        <h2 className="mb-3 font-fraunces text-2xl font-bold text-white md:text-3xl">
          Three questions. Then you&apos;ll know.
        </h2>
        <p className="mx-auto max-w-lg font-inter text-sm leading-relaxed text-blue-200 md:text-base">
          No email required to find out. Answer these and we&apos;ll tell you on this page whether
          your booking can move to us for free onboard credit.
        </p>
      </div>

      {/* Progress */}
      <div className="mb-6 flex items-center justify-center gap-2" aria-hidden="true">
        {QUESTIONS.map((q, i) => (
          <span
            key={q.id}
            className={`h-1.5 rounded-full transition-all ${
              answers[i] !== null ? 'w-10 bg-[#D4AF37]' : 'w-6 bg-white/15'
            }`}
          />
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        {complete
          ? 'All three questions answered. Your result is below.'
          : `Question ${answeredCount + 1} of ${QUESTIONS.length}.`}
      </p>

      <div className="space-y-5">
        {QUESTIONS.map((q, i) => {
          // Progressive reveal — the next question only appears once the
          // previous one is answered, so the first screen is a single choice.
          if (i > answeredCount) return null
          const value = answers[i]
          const set = setters[i]
          return (
            <fieldset key={q.id} className="rounded-2xl border border-white/10 bg-[#0a1628]/40 p-5">
              <legend className="px-1 font-inter text-base font-bold text-white md:text-lg">
                <span className="mr-2 text-[#D4AF37]">{i + 1}.</span>
                {q.prompt}
              </legend>
              <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                <OptionButton
                  label={q.yes}
                  selected={value === true}
                  onClick={() => set(true)}
                />
                <OptionButton
                  label={q.no}
                  selected={value === false}
                  onClick={() => set(false)}
                />
              </div>
              {q.help && (
                <p className="mt-3 flex items-start gap-2 font-inter text-xs leading-relaxed text-blue-300/80">
                  <Info className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
                  {q.help}
                </p>
              )}
            </fieldset>
          )
        })}
      </div>

      {outcome && (
        <div ref={resultRef} className="mt-7 scroll-mt-24">
          {outcome === 'eligible' && (
            <div className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-6">
              <div className="flex items-start gap-3">
                <CheckCircle2
                  className="mt-0.5 h-6 w-6 flex-shrink-0 text-emerald-300"
                  aria-hidden="true"
                />
                <div>
                  <h3 className="font-fraunces text-xl font-bold text-white">
                    You&apos;re likely eligible — let&apos;s grab your booking.
                  </h3>
                  <p className="mt-2 font-inter text-sm leading-relaxed text-emerald-100/90">
                    Booked direct in the last 30 days, still on a deposit, no agency attached —
                    that&apos;s exactly the reservation Disney lets you move. Once the transfer
                    completes you get free onboard credit on the same cruise you already booked.
                    Typical amounts run {OBC_LOW} to {OBC_HIGH}; a {formatUSD(5000)} cruise fare
                    earns {OBC_MID}.
                  </p>
                </div>
              </div>
            </div>
          )}

          {outcome === 'window' && (
            <div className="rounded-2xl border border-[#D4AF37]/40 bg-[#D4AF37]/10 p-6">
              <div className="flex items-start gap-3">
                <Info className="mt-0.5 h-6 w-6 flex-shrink-0 text-[#D4AF37]" aria-hidden="true" />
                <div>
                  <h3 className="font-fraunces text-xl font-bold text-white">
                    Worth checking — you may be just outside the window.
                  </h3>
                  <p className="mt-2 font-inter text-sm leading-relaxed text-amber-100/90">
                    Disney usually wants the transfer request within about 30 days of the original
                    booking date, so a booking made longer ago is a maybe rather than a yes. The
                    good news: everything else about your reservation lines up, and having us look
                    costs nothing. Send it over and we&apos;ll give you a straight answer today —
                    if Disney says no, you&apos;ve lost two minutes.
                  </p>
                </div>
              </div>
            </div>
          )}

          {outcome === 'paid' && (
            <BlockedResult
              title="This booking can’t be transferred — but here’s what we can do."
              reason="Once final payment is processed, Disney closes the reservation to a travel-agent transfer. That rule is Disney's and there's no workaround, so we won't pretend otherwise."
              onReset={reset}
            />
          )}

          {outcome === 'agent' && (
            <BlockedResult
              title="This one stays where it is — here’s why."
              reason="Disney only transfers a reservation out of its own direct booking channel. A cruise already held by another travel agency can't be moved to us for that sailing, and we wouldn't ask you to try."
              onReset={reset}
            />
          )}

          {showForm && (
            <div className="mt-6">
              <div className="mb-5 flex items-center justify-between gap-3">
                <h3 className="font-fraunces text-lg font-bold text-white">
                  Your booking details
                </h3>
                <button
                  type="button"
                  onClick={reset}
                  className="inline-flex items-center gap-1.5 font-inter text-xs font-semibold text-blue-300 transition-colors hover:text-[#D4AF37]"
                >
                  <RotateCcw className="h-3 w-3" aria-hidden="true" />
                  Start over
                </button>
              </div>
              <TransferForm
                quiz={{
                  bookedRecently: booked === true,
                  paidInFull: paid === true,
                  hasAgent: agent === true,
                }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

/**
 * A "no" outcome. It names the rule that blocks the transfer and then points at
 * the two things that are still genuinely useful to this visitor: free
 * concierge help on the cruise they already have, and talking to us before they
 * book the next one.
 */
function BlockedResult({
  title,
  reason,
  onReset,
}: {
  title: string
  reason: string
  onReset: () => void
}) {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/5 p-6">
      <h3 className="font-fraunces text-xl font-bold text-white">{title}</h3>
      <p className="mt-2 font-inter text-sm leading-relaxed text-blue-200">{reason}</p>

      <p className="mt-4 font-inter text-sm font-semibold text-white">What we can still do:</p>
      <ul className="mt-2 space-y-2 font-inter text-sm leading-relaxed text-blue-200">
        <li className="flex gap-2">
          <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-[#D4AF37]" aria-hidden="true" />
          Free concierge help on the cruise you already have — dining strategy, booking-window
          reminders, port-day planning. No charge, no booking required.
        </li>
        <li className="flex gap-2">
          <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-[#D4AF37]" aria-hidden="true" />
          Book your next Disney cruise through us from the start and the onboard credit is
          automatic — no transfer, no 30-day clock.
        </li>
      </ul>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/concierge"
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#D4AF37] px-6 py-3 font-inter text-sm font-bold text-[#0a1628] transition-colors hover:bg-yellow-300"
        >
          Get free concierge help
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
        <a
          href="mailto:bookings@gatgridcruises.com?subject=Booking%20Transfer%20Question"
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3 font-inter text-sm font-semibold text-white transition-colors hover:bg-white/10"
        >
          <Mail className="h-4 w-4" aria-hidden="true" />
          Ask us anyway
        </a>
      </div>

      <button
        type="button"
        onClick={onReset}
        className="mt-4 inline-flex items-center gap-1.5 font-inter text-xs font-semibold text-blue-300 transition-colors hover:text-[#D4AF37]"
      >
        <RotateCcw className="h-3 w-3" aria-hidden="true" />
        Answered something wrong? Start over
      </button>
    </div>
  )
}

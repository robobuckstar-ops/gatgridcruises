'use client'

import { useState, useMemo } from 'react'
import type { TransferOption } from '@/types/database'
import { Check, AlertCircle } from 'lucide-react'

interface TransferRecommenderProps {
  transfers: TransferOption[]
  portName: string
}

type ArrivalScenario = 'flying_same_day' | 'flying_previous_day' | 'staying_nearby' | 'driving_home'

export function TransferRecommender({ transfers, portName }: TransferRecommenderProps) {
  const [partySize, setPartySize] = useState(4)
  const [scenario, setScenario] = useState<ArrivalScenario>('flying_same_day')
  const [isDisneyPartner, setIsDisneyPartner] = useState(false)

  const recommendations = useMemo(() => {
    const scored = transfers.map(t => {
      let score = 0
      let reasoning = ''

      // Scenario-based scoring
      if (scenario === 'flying_same_day') {
        if (t.type === 'uber') {
          score += 40
          reasoning += 'Fast and cost-effective for same-day arrivals. '
        } else if (t.type === 'disney_ground') {
          score += 25
          reasoning += 'Reliable but slower for time-sensitive arrivals. '
        } else if (t.type === 'rental_car') {
          score += 15
          reasoning += 'Overkill for just airport transfer. '
        }
      } else if (scenario === 'flying_previous_day') {
        if (t.type === 'hotel_shuttle') {
          score += 45
          reasoning += "If you're staying overnight, shuttle is ideal. "
        } else if (t.type === 'uber') {
          score += 35
          reasoning += 'Good option without overnight hotel. '
        } else if (t.type === 'disney_ground') {
          score += 20
          reasoning += 'Works but less convenient. '
        }
      } else if (scenario === 'staying_nearby') {
        if (t.type === 'hotel_shuttle') {
          score += 50
          reasoning += 'The obvious choice for hotel guests. '
        } else if (t.type === 'personal_car') {
          score += 30
          reasoning += 'Viable if you have parking arranged. '
        } else if (t.type === 'uber') {
          score += 25
          reasoning += 'Quick backup if shuttle unavailable. '
        }
      } else if (scenario === 'driving_home') {
        if (t.type === 'personal_car') {
          score += 50
          reasoning += 'Your own car is the logical choice. '
        } else if (t.type === 'rental_car') {
          score += 15
          reasoning += "Don't rent if you're already driving. "
        }
      }

      // Party size considerations
      if (partySize >= 4) {
        const costPerPerson = Math.max(t.cost_estimate_min, t.cost_estimate_max) / partySize
        if (costPerPerson < 20) {
          score += 15
          reasoning += `At $${costPerPerson.toFixed(0)}/person for ${partySize} people, this scales well. `
        } else if (costPerPerson > 50) {
          score -= 10
          reasoning += `At $${costPerPerson.toFixed(0)}/person, expensive for large group. `
        }
      } else if (partySize === 1 || partySize === 2) {
        if (t.type === 'disney_ground' || t.type === 'hotel_shuttle') {
          score += 10
          reasoning += 'Simpler for solo/couple travelers. '
        }
      }

      // Time value
      if (scenario === 'flying_same_day' && t.travel_time_minutes < 45) {
        score += 10
        reasoning += 'Time matters when catching a cruise. '
      }

      // Disney partner hotel bonus
      if (isDisneyPartner && t.type === 'hotel_shuttle') {
        score += 15
        reasoning += 'You already have the hotel benefit. '
      }

      return { transfer: t, score, reasoning }
    })

    return scored.sort((a, b) => b.score - a.score)
  }, [partySize, scenario, isDisneyPartner, transfers])

  const topRecommendation = recommendations[0]
  const totalCost = topRecommendation.transfer.cost_estimate_max * partySize

  return (
    <div className="bg-white border border-slate-300 rounded-xl p-8 mb-8">
      <h2 className="font-display text-2xl font-bold text-slate-900 mb-6">Find Your Best Transfer Option</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Party Size</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
              <button
                key={n}
                onClick={() => setPartySize(n)}
                className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                  partySize === n
                    ? 'bg-[#1E3A5F] text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Arrival Scenario</label>
          <select
            value={scenario}
            onChange={(e) => setScenario(e.target.value as ArrivalScenario)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg text-slate-700 bg-white hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="flying_same_day">Flying in on cruise day</option>
            <option value="flying_previous_day">Flying in the day before</option>
            <option value="staying_nearby">Staying at a hotel near port</option>
            <option value="driving_home">Driving from home</option>
          </select>
        </div>
      </div>

      <div className="mb-8">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={isDisneyPartner}
            onChange={(e) => setIsDisneyPartner(e.target.checked)}
            className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm font-medium text-slate-700">Staying at Disney partner hotel</span>
        </label>
      </div>

      {topRecommendation && (
        <div className="bg-gradient-to-b from-[#0a1628] to-[#1E3A5F] border border-blue-200 text-slate-900 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-4 mb-4">
            <div className="flex-shrink-0">
              <Check className="h-6 w-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-display text-xl font-bold mb-2">
                Best for you: {topRecommendation.transfer.type === 'disney_ground' && 'Disney Ground Transfer'}
                {topRecommendation.transfer.type === 'uber' && 'Uber'}
                {topRecommendation.transfer.type === 'rental_car' && 'Rental Car'}
                {topRecommendation.transfer.type === 'personal_car' && 'Personal Car'}
                {topRecommendation.transfer.type === 'hotel_shuttle' && 'Hotel Shuttle'}
                {topRecommendation.transfer.type === 'taxi' && 'Taxi'}
              </h3>
              <p className="text-slate-700 mb-3">{topRecommendation.reasoning}</p>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-slate-600">Total Cost</p>
                  <p className="font-bold text-lg text-blue-600">${totalCost}</p>
                  <p className="text-slate-600 text-xs">{partySize} people</p>
                </div>
                <div>
                  <p className="text-slate-600">Travel Time</p>
                  <p className="font-bold text-lg text-blue-600">{topRecommendation.transfer.travel_time_minutes} min</p>
                </div>
                <div>
                  <p className="text-slate-600">Per Person</p>
                  <p className="font-bold text-lg text-blue-600">${Math.round(totalCost / partySize)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-slate-50 rounded-lg p-4">
        <p className="text-xs text-slate-600 flex gap-2">
          <AlertCircle className="h-4 w-4 flex-shrink-0 text-slate-500 mt-0.5" />
          <span>Prices are estimates. Always book in advance and confirm timing with the port. Surge pricing may apply to rideshare services on peak cruise days.</span>
        </p>
      </div>
    </div>
  )
}

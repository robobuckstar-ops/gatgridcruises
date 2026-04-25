'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, ArrowRight, Check } from 'lucide-react'

// Card data
const cardDatabase = [
  {
    id: 'csp',
    name: 'Chase Sapphire Preferred',
    annualFee: 95,
    signupBonus: '60K points',
    bonusValue: 750,
    travelPoints: 2,
    diningPoints: 2,
    tripInsurance: 'Yes',
    loungeAccess: 'No',
    bestFor: 'Best overall travel rewards',
  },
  {
    id: 'csr',
    name: 'Chase Sapphire Reserve',
    annualFee: 550,
    signupBonus: '60K points',
    bonusValue: 900,
    travelPoints: 3,
    diningPoints: 3,
    tripInsurance: 'Yes',
    loungeAccess: 'Priority Pass (10 visits)',
    bestFor: 'Best premium travel card',
  },
  {
    id: 'amex-biz-platinum',
    name: 'Amex Business Platinum',
    annualFee: 895,
    signupBonus: 'Up to 150K–300K points',
    bonusValue: 1500,
    travelPoints: 5,
    diningPoints: 1,
    tripInsurance: 'Yes',
    loungeAccess: 'Centurion Lounge + Priority Pass',
    bestFor: 'Best for luxury business travel',
  },
  {
    id: 'amex-gold',
    name: 'Amex Gold',
    annualFee: 250,
    signupBonus: '60K points',
    bonusValue: 720,
    travelPoints: 3,
    diningPoints: 4,
    tripInsurance: 'Yes',
    loungeAccess: 'No',
    bestFor: 'Best for dining rewards',
  },
  {
    id: 'chase-ink-preferred',
    name: 'Chase Ink Business Preferred',
    annualFee: 95,
    signupBonus: '100K points',
    bonusValue: 1250,
    travelPoints: 3,
    diningPoints: 3,
    tripInsurance: 'Yes',
    loungeAccess: 'No',
    bestFor: 'Best business signup bonus',
  },
  {
    id: 'chase-ink-unlimited',
    name: 'Chase Ink Business Unlimited',
    annualFee: 0,
    signupBonus: '$750 cash back',
    bonusValue: 750,
    travelPoints: 1.5,
    diningPoints: 1.5,
    tripInsurance: 'No',
    loungeAccess: 'No',
    bestFor: 'Best no-fee business card',
  },
  {
    id: 'capital-one-venture-x',
    name: 'Capital One Venture X',
    annualFee: 395,
    signupBonus: '75K miles',
    bonusValue: 750,
    travelPoints: 2,
    diningPoints: 2,
    tripInsurance: 'Yes',
    loungeAccess: 'Capital One Lounge + Priority Pass',
    bestFor: 'Best for simplicity + lounge access',
  },
  {
    id: 'capital-one-spark-plus',
    name: 'Capital One Spark Cash Plus',
    annualFee: 150,
    signupBonus: '$2,000 cash bonus',
    bonusValue: 2000,
    travelPoints: 2,
    diningPoints: 2,
    tripInsurance: 'No',
    loungeAccess: 'No',
    bestFor: 'Best for high business spend',
  },
  {
    id: 'capital-one-spark-select',
    name: 'Capital One Spark Cash Select',
    annualFee: 0,
    signupBonus: '$750 cash bonus',
    bonusValue: 750,
    travelPoints: 1.5,
    diningPoints: 1.5,
    tripInsurance: 'No',
    loungeAccess: 'No',
    bestFor: 'Best no-fee business cash back',
  },
  {
    id: 'citi-premier',
    name: 'Citi Premier',
    annualFee: 95,
    signupBonus: '60K points',
    bonusValue: 600,
    travelPoints: 3,
    diningPoints: 3,
    tripInsurance: 'Yes',
    loungeAccess: 'No',
    bestFor: 'Best budget travel option',
  },
  {
    id: 'capital-one-venture',
    name: 'Capital One Venture',
    annualFee: 95,
    signupBonus: '75K miles',
    bonusValue: 750,
    travelPoints: 2,
    diningPoints: 2,
    tripInsurance: 'No',
    loungeAccess: 'No',
    bestFor: 'Best simple flat-rate card',
  },
]

type CardId = typeof cardDatabase[number]['id']

export default function CompareCardsPage() {
  const [selectedCards, setSelectedCards] = useState<CardId[]>(['amex-biz-platinum', 'chase-ink-preferred', 'capital-one-venture-x'])
  const [openDropdown, setOpenDropdown] = useState(false)

  const activeCards = cardDatabase.filter(card => selectedCards.includes(card.id as CardId))

  const handleCardToggle = (cardId: CardId) => {
    if (selectedCards.includes(cardId)) {
      if (selectedCards.length > 1) {
        setSelectedCards(selectedCards.filter(id => id !== cardId))
      }
    } else {
      if (selectedCards.length < 4) {
        setSelectedCards([...selectedCards, cardId])
      }
    }
  }

  // Calculate best in each category
  const getHighlight = (field: string) => {
    const values = activeCards.map(card => {
      const key = field as keyof typeof card
      return { card, value: card[key] }
    })

    if (field === 'annualFee') {
      const min = Math.min(...values.map(v => v.value as number))
      return min === 0 ? null : min
    }
    if (field === 'bonusValue' || field === 'travelPoints' || field === 'diningPoints') {
      const max = Math.max(...values.map(v => v.value as number))
      return max
    }
    return null
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-[#1E3A5F]/5 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <Link href="/travel-hacks" className="inline-flex items-center gap-2 text-[#1E3A5F] hover:text-[#2a4f7a] mb-4 transition-colors text-sm font-medium">
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back to Travel Hacks
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">Compare Travel Credit Cards</h1>
          <p className="text-lg text-slate-600 max-w-2xl">
            Find the right card for your cruise strategy. Compare annual fees, signup bonuses, earning rates, and benefits side by side.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Card Selector */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-700 mb-2">Comparing {selectedCards.length} of {cardDatabase.length} cards</p>
              <p className="text-xs text-slate-500">Select up to 4 cards to compare</p>
            </div>
            <div className="relative w-full sm:w-64">
              <button
                onClick={() => setOpenDropdown(!openDropdown)}
                className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-left text-sm font-medium text-slate-700 hover:border-slate-400 flex items-center justify-between transition-colors"
              >
                <span>Add or remove cards</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {openDropdown && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-300 rounded-lg shadow-lg z-10">
                  <div className="max-h-96 overflow-y-auto">
                    {cardDatabase.map(card => (
                      <label
                        key={card.id}
                        className="flex items-center px-4 py-3 border-b border-slate-100 last:border-0 hover:bg-slate-50 cursor-pointer transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={selectedCards.includes(card.id as CardId)}
                          onChange={() => handleCardToggle(card.id as CardId)}
                          disabled={!selectedCards.includes(card.id as CardId) && selectedCards.length >= 4}
                          className="w-4 h-4 text-[#1E3A5F] rounded border-slate-300"
                        />
                        <span className="ml-3 text-sm text-slate-700">{card.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto border border-slate-200 rounded-lg">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
                <th className="px-4 py-3 text-left font-semibold text-slate-900">Feature</th>
                {activeCards.map(card => (
                  <th key={card.id} className="px-4 py-3 text-left font-semibold text-slate-900 whitespace-nowrap border-l border-slate-200">
                    <div className="text-sm font-bold text-slate-900">{card.name}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Annual Fee */}
              <tr className="border-b border-slate-200 hover:bg-slate-50">
                <td className="px-4 py-3 font-medium text-slate-900">Annual Fee</td>
                {activeCards.map(card => (
                  <td key={card.id} className={`px-4 py-3 border-l border-slate-200 ${card.annualFee === getHighlight('annualFee') ? 'bg-green-50' : ''}`}>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-700">${card.annualFee}</span>
                      {card.annualFee === getHighlight('annualFee') && card.annualFee > 0 && (
                        <span className="text-xs font-medium text-green-700 bg-green-100 px-2 py-1 rounded">Best Value</span>
                      )}
                      {card.annualFee === 0 && (
                        <span className="text-xs font-medium text-green-700">No Fee</span>
                      )}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Signup Bonus */}
              <tr className="border-b border-slate-200 hover:bg-slate-50">
                <td className="px-4 py-3 font-medium text-slate-900">Signup Bonus</td>
                {activeCards.map(card => (
                  <td key={card.id} className="px-4 py-3 border-l border-slate-200 text-slate-700">
                    {card.signupBonus}
                  </td>
                ))}
              </tr>

              {/* Bonus Value */}
              <tr className="border-b border-slate-200 hover:bg-slate-50 bg-amber-50">
                <td className="px-4 py-3 font-medium text-slate-900">Bonus Value (Estimated)</td>
                {activeCards.map(card => (
                  <td key={card.id} className={`px-4 py-3 border-l border-slate-200 font-semibold ${card.bonusValue === getHighlight('bonusValue') ? 'bg-green-100' : ''}`}>
                    <div className="flex items-center justify-between">
                      <span>${card.bonusValue}</span>
                      {card.bonusValue === getHighlight('bonusValue') && (
                        <span className="text-xs font-medium text-green-700">Highest</span>
                      )}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Points on Travel */}
              <tr className="border-b border-slate-200 hover:bg-slate-50">
                <td className="px-4 py-3 font-medium text-slate-900">Points on Travel</td>
                {activeCards.map(card => (
                  <td key={card.id} className={`px-4 py-3 border-l border-slate-200 ${card.travelPoints === getHighlight('travelPoints') ? 'bg-green-50' : ''}`}>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-700">{card.travelPoints}x</span>
                      {card.travelPoints === getHighlight('travelPoints') && (
                        <span className="text-xs font-medium text-green-700 bg-green-100 px-2 py-1 rounded">Best</span>
                      )}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Points on Dining */}
              <tr className="border-b border-slate-200 hover:bg-slate-50">
                <td className="px-4 py-3 font-medium text-slate-900">Points on Dining</td>
                {activeCards.map(card => (
                  <td key={card.id} className={`px-4 py-3 border-l border-slate-200 ${card.diningPoints === getHighlight('diningPoints') ? 'bg-green-50' : ''}`}>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-700">{card.diningPoints}x</span>
                      {card.diningPoints === getHighlight('diningPoints') && (
                        <span className="text-xs font-medium text-green-700 bg-green-100 px-2 py-1 rounded">Best</span>
                      )}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Trip Insurance */}
              <tr className="border-b border-slate-200 hover:bg-slate-50">
                <td className="px-4 py-3 font-medium text-slate-900">Trip Insurance</td>
                {activeCards.map(card => (
                  <td key={card.id} className="px-4 py-3 border-l border-slate-200">
                    <div className="flex items-center gap-2">
                      {card.tripInsurance === 'Yes' ? (
                        <>
                          <Check className="w-4 h-4 text-green-600" />
                          <span className="text-slate-700">Yes</span>
                        </>
                      ) : (
                        <span className="text-slate-500">No</span>
                      )}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Lounge Access */}
              <tr className="border-b border-slate-200 hover:bg-slate-50">
                <td className="px-4 py-3 font-medium text-slate-900">Lounge Access</td>
                {activeCards.map(card => (
                  <td key={card.id} className="px-4 py-3 border-l border-slate-200 text-slate-700">
                    {card.loungeAccess}
                  </td>
                ))}
              </tr>

              {/* Best For */}
              <tr className="bg-[#1E3A5F]/10 hover:bg-[#1E3A5F]/20">
                <td className="px-4 py-3 font-medium text-slate-900">Best For</td>
                {activeCards.map(card => (
                  <td key={card.id} className="px-4 py-3 border-l border-slate-200 text-slate-700 italic">
                    {card.bestFor}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>


        {/* CTA */}
        <div className="mt-12 bg-[#1E3A5F] rounded-lg p-8 text-white">
          <h2 className="text-2xl font-bold text-white mb-3">Ready to Make Your Move?</h2>
          <p className="text-slate-300 mb-6 max-w-2xl">
            Our travel advisors can help you book your Disney cruise the smart way — applying every point and perk for maximum value.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/book" className="inline-flex items-center gap-2 bg-[#D4AF37] text-[#1E3A5F] font-semibold px-6 py-3 rounded-lg hover:bg-yellow-300 transition-colors">
              Get a Free Quote <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/travel-hacks/stack-points-free-cruise" className="inline-flex items-center gap-2 bg-white/10 text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/20 border border-white/20 transition-colors">
              Learn the stacking strategy <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

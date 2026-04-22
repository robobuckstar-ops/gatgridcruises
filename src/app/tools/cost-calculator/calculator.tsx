'use client'

import { useState, useMemo } from 'react'
import { Copy, Check } from 'lucide-react'

interface Sailing {
  id: string
  ship: string
  destination: string
  startDate: string
  endDate: string
  nights: number
  lowestPrice: number
}

interface CostCalculatorProps {
  sailings: Sailing[]
}

export function CostCalculator({ sailings }: CostCalculatorProps) {
  // Cruise Details
  const [selectedSailing, setSelectedSailing] = useState<string>('')
  const [manualCruiseFare, setManualCruiseFare] = useState<number>(0)
  const [adults, setAdults] = useState<number>(2)
  const [children, setChildren] = useState<number>(0)
  const [nights, setNights] = useState<number>(7)

  // Getting There
  const [homeAirport, setHomeAirport] = useState<string>('')
  const [flightCostPerPerson, setFlightCostPerPerson] = useState<number>(0)
  const [preHotelYes, setPreHotelYes] = useState<boolean>(false)
  const [preHotelNights, setPreHotelNights] = useState<number>(1)
  const [preHotelCostPerNight, setPreHotelCostPerNight] = useState<number>(150)
  const [transferType, setTransferType] = useState<string>('ground')
  const [parkingDays, setParkingDays] = useState<number>(0)

  // Onboard Extras
  const [gratuityOverride, setGratuityOverride] = useState<number | null>(null)
  const [paloMeals, setPaloMeals] = useState<number>(0)
  const [remyMeals, setRemyMeals] = useState<number>(0)
  const [drinkPackageType, setDrinkPackageType] = useState<string>('none')
  const [estimatedBarSpend, setEstimatedBarSpend] = useState<number>(0)
  const [excursionsTotal, setExcursionsTotal] = useState<number>(0)
  const [photoPackage, setPhotoPackage] = useState<string>('none')
  const [spaSpend, setSpaSpend] = useState<number>(0)
  const [internetType, setInternetType] = useState<string>('none')
  const [bibbidiSpend, setBibbidiSpend] = useState<number>(0)
  const [kidsExtrasOther, setKidsExtrasOther] = useState<number>(0)
  const [copied, setCopied] = useState(false)

  // Get selected sailing details
  const currentSailing = sailings.find((s) => s.id === selectedSailing)
  const cruiseNights = currentSailing ? currentSailing.nights : nights
  const partySize = adults + children
  const baseCruiseFare = currentSailing ? currentSailing.lowestPrice : manualCruiseFare

  // Calculate all costs
  const calculations = useMemo(() => {
    const totalParty = adults + children

    // Cruise costs
    const totalCruiseFare = baseCruiseFare * totalParty

    // Flight costs
    const totalFlights = flightCostPerPerson * totalParty

    // Pre-cruise hotel
    const preHotelCost = preHotelYes
      ? preHotelNights * preHotelCostPerNight * totalParty
      : 0

    // Transfer costs
    let transferCost = 0
    if (transferType === 'ground') {
      transferCost = 39 * totalParty
    } else if (transferType === 'uber') {
      transferCost = 45 * totalParty
    } else if (transferType === 'rental') {
      transferCost = 60 * totalParty
    } else if (transferType === 'personal') {
      transferCost = parkingDays * 20
    }

    // Gratuities
    const gratuityPerPersonPerNight = 14.5
    const baseGratuities = gratuityPerPersonPerNight * cruiseNights * totalParty
    const totalGratuities = gratuityOverride !== null ? gratuityOverride : baseGratuities

    // Specialty dining
    const totalSpecialtyDining = (paloMeals * 45 + remyMeals * 125) * totalParty

    // Drink package
    let drinkCost = 0
    if (drinkPackageType === 'package') {
      drinkCost = 69 * cruiseNights * totalParty
    } else if (drinkPackageType === 'casual') {
      drinkCost = estimatedBarSpend * totalParty
    }

    // Photo package
    let photoCost = 0
    if (photoPackage === 'basic') {
      photoCost = 199
    } else if (photoPackage === 'premium') {
      photoCost = 399
    }

    // Internet
    let internetCost = 0
    if (internetType === 'basic') {
      internetCost = 12 * cruiseNights
    } else if (internetType === 'premium') {
      internetCost = 28 * cruiseNights
    }

    // Kids extras (per person for age-based items)
    let bibbidiTotal = bibbidiSpend
    const totalKidsExtras = bibbidiTotal + kidsExtrasOther

    // Category subtotals
    const travelSubtotal = totalFlights + preHotelCost + transferCost
    const onboardSubtotal =
      totalGratuities +
      totalSpecialtyDining +
      drinkCost +
      excursionsTotal +
      photoCost +
      spaSpend +
      internetCost +
      totalKidsExtras

    const grandTotal = totalCruiseFare + travelSubtotal + onboardSubtotal
    const costPerPerson = totalParty > 0 ? grandTotal / totalParty : 0

    return {
      totalCruiseFare,
      totalFlights,
      preHotelCost,
      transferCost,
      travelSubtotal,
      totalGratuities,
      baseGratuities,
      totalSpecialtyDining,
      drinkCost,
      excursionsTotal,
      photoCost,
      spaSpend,
      internetCost,
      totalKidsExtras,
      onboardSubtotal,
      grandTotal,
      costPerPerson,
    }
  }, [
    adults,
    children,
    baseCruiseFare,
    cruiseNights,
    flightCostPerPerson,
    preHotelYes,
    preHotelNights,
    preHotelCostPerNight,
    transferType,
    parkingDays,
    gratuityOverride,
    paloMeals,
    remyMeals,
    drinkPackageType,
    estimatedBarSpend,
    excursionsTotal,
    photoPackage,
    spaSpend,
    internetType,
    bibbidiSpend,
    kidsExtrasOther,
  ])

  // Generate shareable URL with encoded params
  const generateShareUrl = () => {
    const params = new URLSearchParams({
      sailing: selectedSailing,
      manual: manualCruiseFare.toString(),
      adults: adults.toString(),
      children: children.toString(),
      nights: nights.toString(),
      airport: homeAirport,
      flight: flightCostPerPerson.toString(),
      prehotel: preHotelYes ? '1' : '0',
      prehotelnights: preHotelNights.toString(),
      prehotelcost: preHotelCostPerNight.toString(),
      transfer: transferType,
      parking: parkingDays.toString(),
      gratuityoverride: gratuityOverride?.toString() || '',
      palo: paloMeals.toString(),
      remy: remyMeals.toString(),
      drinks: drinkPackageType,
      barspend: estimatedBarSpend.toString(),
      excursions: excursionsTotal.toString(),
      photo: photoPackage,
      spa: spaSpend.toString(),
      internet: internetType,
      bibbidi: bibbidiSpend.toString(),
      kidsother: kidsExtrasOther.toString(),
    })

    const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`
    return url
  }

  const handleCopyUrl = () => {
    const url = generateShareUrl()
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const percentageDifference =
    baseCruiseFare > 0
      ? Math.round(((calculations.grandTotal - baseCruiseFare * partySize) / (baseCruiseFare * partySize)) * 100)
      : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
            Total Trip Cost Calculator
          </h1>
          <p className="text-lg text-slate-600">
            Discover the true cost of your Disney cruise beyond the advertised fare
          </p>
        </div>

        {/* Travel Hack CTA Banner */}
        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-lg p-6 mb-12 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="text-2xl mt-0.5">✨</div>
            <div>
              <h2 className="font-bold text-amber-900 mb-1">Reduce Your Costs with Travel Hacks</h2>
              <p className="text-sm text-amber-800 mb-3">
                See how credit card bonuses, free trip insurance, and strategic point stacking could reduce this total by thousands.
              </p>
              <a href="/travel-hacks" className="inline-flex items-center gap-1 text-sm font-semibold text-amber-700 hover:text-amber-900 transition-colors">
                Explore travel hacks →
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Sections */}
          <div className="lg:col-span-2 space-y-6">
            {/* Section 1: Cruise Details */}
            <div className="bg-white rounded-lg shadow-md p-8 border-t-4 border-blue-900">
              <h2 className="text-2xl font-bold text-blue-900 mb-6">Cruise Details</h2>

              <div className="space-y-4">
                {/* Sailing Selection */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Select a Sailing
                  </label>
                  <select
                    value={selectedSailing}
                    onChange={(e) => setSelectedSailing(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">-- Or enter manual cruise fare below --</option>
                    {sailings.map((sailing) => (
                      <option key={sailing.id} value={sailing.id}>
                        {sailing.ship} - {sailing.destination} ({sailing.nights} nights) - ${sailing.lowestPrice}pp
                      </option>
                    ))}
                  </select>
                </div>

                {/* Manual Cruise Fare */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Cruise Fare per Person {selectedSailing && '(auto-filled)'}
                  </label>
                  <input
                    type="number"
                    value={baseCruiseFare}
                    onChange={(e) => {
                      setSelectedSailing('')
                      setManualCruiseFare(parseFloat(e.target.value) || 0)
                    }}
                    placeholder="e.g., 3000"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-slate-500 mt-1">Total for all guests: ${(baseCruiseFare * partySize).toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                </div>

                {/* Party Size */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Adults
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={adults}
                      onChange={(e) => setAdults(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Children
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={children}
                      onChange={(e) => setChildren(Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {currentSailing && (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
                    <p className="text-sm text-emerald-800">
                      <span className="font-semibold">Cruise Duration:</span> {currentSailing.nights} nights
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Section 2: Getting There */}
            <div className="bg-white rounded-lg shadow-md p-8 border-t-4 border-blue-900">
              <h2 className="text-2xl font-bold text-blue-900 mb-6">Getting There</h2>

              <div className="space-y-4">
                {/* Home Airport */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Home Airport
                  </label>
                  <input
                    type="text"
                    value={homeAirport}
                    onChange={(e) => setHomeAirport(e.target.value)}
                    placeholder="e.g., ATL, ORD, LAX"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Flight Costs */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Estimated Round-Trip Flight Cost per Person
                  </label>
                  <input
                    type="number"
                    value={flightCostPerPerson}
                    onChange={(e) => setFlightCostPerPerson(parseFloat(e.target.value) || 0)}
                    placeholder="e.g., 400"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-slate-500 mt-1">Total for all guests: ${(flightCostPerPerson * partySize).toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                </div>

                {/* Pre-Cruise Hotel */}
                <div className="border-t pt-4">
                  <div className="flex items-center mb-4">
                    <input
                      type="checkbox"
                      id="prehotel"
                      checked={preHotelYes}
                      onChange={(e) => setPreHotelYes(e.target.checked)}
                      className="h-4 w-4 text-blue-600 rounded"
                    />
                    <label htmlFor="prehotel" className="ml-3 text-sm font-semibold text-slate-700">
                      Pre-Cruise Hotel (night before departure)
                    </label>
                  </div>

                  {preHotelYes && (
                    <div className="grid grid-cols-2 gap-4 ml-7">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Nights
                        </label>
                        <input
                          type="number"
                          min="1"
                          value={preHotelNights}
                          onChange={(e) => setPreHotelNights(Math.max(1, parseInt(e.target.value) || 1))}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Cost per Night (all guests)
                        </label>
                        <input
                          type="number"
                          value={preHotelCostPerNight}
                          onChange={(e) => setPreHotelCostPerNight(parseFloat(e.target.value) || 0)}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  )}
                  <p className="text-xs text-slate-500 mt-2">
                    Total: ${calculations.preHotelCost.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </p>
                </div>

                {/* Transfer to Port */}
                <div className="border-t pt-4">
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    Transfer to Port
                  </label>
                  <div className="space-y-2">
                    {[
                      { value: 'ground', label: 'Disney Ground Transportation ($39pp)' },
                      { value: 'uber', label: 'Uber/Lyft (~$45pp)' },
                      { value: 'rental', label: 'Rental Car (~$60pp)' },
                      { value: 'personal', label: 'Personal Car (parking only)' },
                      { value: 'none', label: 'Included/Other' },
                    ].map((option) => (
                      <label key={option.value} className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="transfer"
                          value={option.value}
                          checked={transferType === option.value}
                          onChange={(e) => setTransferType(e.target.value)}
                          className="h-4 w-4 text-blue-600"
                        />
                        <span className="ml-3 text-sm text-slate-700">{option.label}</span>
                      </label>
                    ))}
                  </div>

                  {transferType === 'personal' && (
                    <div className="mt-3 ml-6">
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Parking Days (at $20/day)
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={parkingDays}
                        onChange={(e) => setParkingDays(Math.max(0, parseInt(e.target.value) || 0))}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  )}
                  <p className="text-xs text-slate-500 mt-2">
                    Total: ${calculations.transferCost.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
            </div>

            {/* Section 3: Onboard Extras */}
            <div className="bg-white rounded-lg shadow-md p-8 border-t-4 border-blue-900">
              <h2 className="text-2xl font-bold text-blue-900 mb-6">Onboard Extras</h2>

              <div className="space-y-5">
                {/* Gratuities */}
                <div className="bg-slate-50 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <label className="block text-sm font-semibold text-slate-700">
                      Gratuities
                    </label>
                    <span className="text-xs text-slate-500">
                      Auto-calculated at ${(14.5 * cruiseNights).toLocaleString('en-US', { minimumFractionDigits: 2 })}/person
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mb-3">
                    $14.50/person/night × {cruiseNights} nights × {partySize} guests = ${calculations.baseGratuities.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </p>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-2">
                      Override amount (optional):
                    </label>
                    <input
                      type="number"
                      value={gratuityOverride || ''}
                      onChange={(e) => setGratuityOverride(e.target.value ? parseFloat(e.target.value) : null)}
                      placeholder="Leave blank to use auto-calc"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                </div>

                {/* Specialty Dining */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Palo Meals (at $45pp)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={paloMeals}
                      onChange={(e) => setPaloMeals(Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <p className="text-xs text-slate-500 mt-1">${(paloMeals * 45 * partySize).toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Remy/Enchanté Meals (at $125pp)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={remyMeals}
                      onChange={(e) => setRemyMeals(Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <p className="text-xs text-slate-500 mt-1">${(remyMeals * 125 * partySize).toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                  </div>
                </div>

                {/* Beverages */}
                <div className="border-t pt-4">
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    Beverages
                  </label>
                  <div className="space-y-2 mb-4">
                    {[
                      { value: 'none', label: 'None - No extra beverages' },
                      { value: 'casual', label: 'Casual - Estimate bar spend' },
                      { value: 'package', label: 'Beverage Package ($69pp/day)' },
                    ].map((option) => (
                      <label key={option.value} className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="drinks"
                          value={option.value}
                          checked={drinkPackageType === option.value}
                          onChange={(e) => setDrinkPackageType(e.target.value)}
                          className="h-4 w-4 text-blue-600"
                        />
                        <span className="ml-3 text-sm text-slate-700">{option.label}</span>
                      </label>
                    ))}
                  </div>

                  {drinkPackageType === 'casual' && (
                    <div className="ml-6">
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Estimated Daily Bar Spend per Person
                      </label>
                      <input
                        type="number"
                        value={estimatedBarSpend}
                        onChange={(e) => setEstimatedBarSpend(parseFloat(e.target.value) || 0)}
                        placeholder="e.g., 25"
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <p className="text-xs text-slate-500 mt-1">
                        Total: ${(estimatedBarSpend * partySize * cruiseNights).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                  )}
                  {drinkPackageType === 'package' && (
                    <p className="text-xs text-slate-500 ml-6">
                      Total: ${(69 * cruiseNights * partySize).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </p>
                  )}
                </div>

                {/* Port Excursions */}
                <div className="border-t pt-4">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Estimated Port Excursions (all ports, all guests)
                  </label>
                  <input
                    type="number"
                    value={excursionsTotal}
                    onChange={(e) => setExcursionsTotal(parseFloat(e.target.value) || 0)}
                    placeholder="e.g., 800"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    Total: ${calculations.excursionsTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </p>
                </div>

                {/* Photo Package */}
                <div className="border-t pt-4">
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    Photo Package
                  </label>
                  <div className="space-y-2">
                    {[
                      { value: 'none', label: 'None ($0)' },
                      { value: 'basic', label: 'Basic Package ($199)' },
                      { value: 'premium', label: 'Premium Package ($399)' },
                    ].map((option) => (
                      <label key={option.value} className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="photo"
                          value={option.value}
                          checked={photoPackage === option.value}
                          onChange={(e) => setPhotoPackage(e.target.value)}
                          className="h-4 w-4 text-blue-600"
                        />
                        <span className="ml-3 text-sm text-slate-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Spa */}
                <div className="border-t pt-4">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Estimated Spa Spend
                  </label>
                  <input
                    type="number"
                    value={spaSpend}
                    onChange={(e) => setSpaSpend(parseFloat(e.target.value) || 0)}
                    placeholder="e.g., 200"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Internet */}
                <div className="border-t pt-4">
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    Internet Package
                  </label>
                  <div className="space-y-2">
                    {[
                      { value: 'none', label: 'None ($0)' },
                      { value: 'basic', label: 'Basic ($12/day)' },
                      { value: 'premium', label: 'Premium ($28/day)' },
                    ].map((option) => (
                      <label key={option.value} className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="internet"
                          value={option.value}
                          checked={internetType === option.value}
                          onChange={(e) => setInternetType(e.target.value)}
                          className="h-4 w-4 text-blue-600"
                        />
                        <span className="ml-3 text-sm text-slate-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                  {internetType !== 'none' && (
                    <p className="text-xs text-slate-500 mt-2">
                      Total: ${calculations.internetCost.toLocaleString('en-US', { minimumFractionDigits: 2 })} ({cruiseNights} days)
                    </p>
                  )}
                </div>

                {/* Kids Extras */}
                <div className="border-t pt-4">
                  <h3 className="font-semibold text-slate-700 mb-3">Kids' Extras</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Bibbidi Bobbidi Boutique
                      </label>
                      <input
                        type="number"
                        value={bibbidiSpend}
                        onChange={(e) => setBibbidiSpend(parseFloat(e.target.value) || 0)}
                        placeholder="e.g., 0-450"
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Other Kids' Activities & Extras
                      </label>
                      <input
                        type="number"
                        value={kidsExtrasOther}
                        onChange={(e) => setKidsExtrasOther(parseFloat(e.target.value) || 0)}
                        placeholder="e.g., 0"
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Summary Card (Fixed on Desktop) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-8 border-t-4 border-amber-500 sticky top-8">
              <h2 className="text-2xl font-bold text-blue-900 mb-6">Cost Breakdown</h2>

              {/* Itemized breakdown table */}
              <div className="space-y-4 mb-6">
                {/* Cruise Category */}
                <div>
                  <h3 className="font-semibold text-slate-700 text-sm mb-2 pb-2 border-b">Cruise</h3>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Cruise Fare ({partySize})</span>
                      <span className="font-semibold">${calculations.totalCruiseFare.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                    </div>
                  </div>
                </div>

                {/* Travel Category */}
                {calculations.travelSubtotal > 0 && (
                  <div>
                    <h3 className="font-semibold text-slate-700 text-sm mb-2 pb-2 border-b">Travel</h3>
                    <div className="space-y-1">
                      {calculations.totalFlights > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Flights</span>
                          <span>${calculations.totalFlights.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                        </div>
                      )}
                      {calculations.preHotelCost > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Pre-Cruise Hotel</span>
                          <span>${calculations.preHotelCost.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                        </div>
                      )}
                      {calculations.transferCost > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Transfer to Port</span>
                          <span>${calculations.transferCost.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-sm font-semibold pt-2 border-t">
                        <span className="text-slate-700">Subtotal</span>
                        <span>${calculations.travelSubtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Onboard Category */}
                {calculations.onboardSubtotal > 0 && (
                  <div>
                    <h3 className="font-semibold text-slate-700 text-sm mb-2 pb-2 border-b">Onboard</h3>
                    <div className="space-y-1">
                      {calculations.totalGratuities > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Gratuities</span>
                          <span>${calculations.totalGratuities.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                        </div>
                      )}
                      {calculations.totalSpecialtyDining > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Specialty Dining</span>
                          <span>${calculations.totalSpecialtyDining.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                        </div>
                      )}
                      {calculations.drinkCost > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Beverages</span>
                          <span>${calculations.drinkCost.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                        </div>
                      )}
                      {calculations.excursionsTotal > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Excursions</span>
                          <span>${calculations.excursionsTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                        </div>
                      )}
                      {calculations.photoCost > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Photo Package</span>
                          <span>${calculations.photoCost.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                        </div>
                      )}
                      {calculations.spaSpend > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Spa</span>
                          <span>${calculations.spaSpend.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                        </div>
                      )}
                      {calculations.internetCost > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Internet</span>
                          <span>${calculations.internetCost.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                        </div>
                      )}
                      {calculations.totalKidsExtras > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Kids' Extras</span>
                          <span>${calculations.totalKidsExtras.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-sm font-semibold pt-2 border-t">
                        <span className="text-slate-700">Subtotal</span>
                        <span>${calculations.onboardSubtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Ways to Reduce This Cost */}
              <div className="mb-6 pb-6 border-b border-slate-200">
                <h3 className="font-bold text-slate-800 text-sm mb-4 flex items-center gap-2">
                  <span className="text-lg">💡</span> Ways to Reduce Your Cruise Costs
                </h3>
                <div className="space-y-3">
                  <a href="/travel-hacks/fly-free-to-cruise-port" className="block p-3 bg-amber-50 border border-amber-200 rounded-lg hover:bg-amber-100 transition-colors group">
                    <div className="flex items-start gap-3">
                      <span className="text-lg">✈️</span>
                      <div className="flex-1">
                        <p className="font-medium text-sm text-slate-900 group-hover:text-blue-600">Cover your flights with a signup bonus</p>
                        <p className="text-xs text-slate-600 mt-0.5">The Chase Sapphire Preferred 60K bonus is worth ~$750 in travel</p>
                      </div>
                    </div>
                  </a>
                  <a href="/travel-hacks/free-trip-insurance" className="block p-3 bg-amber-50 border border-amber-200 rounded-lg hover:bg-amber-100 transition-colors group">
                    <div className="flex items-start gap-3">
                      <span className="text-lg">🛡️</span>
                      <div className="flex-1">
                        <p className="font-medium text-sm text-slate-900 group-hover:text-blue-600">Skip trip insurance purchases</p>
                        <p className="text-xs text-slate-600 mt-0.5">Premium travel cards include free cancellation and baggage coverage</p>
                      </div>
                    </div>
                  </a>
                  <a href="/travel-hacks/best-cards-for-cruises" className="block p-3 bg-amber-50 border border-amber-200 rounded-lg hover:bg-amber-100 transition-colors group">
                    <div className="flex items-start gap-3">
                      <span className="text-lg">💳</span>
                      <div className="flex-1">
                        <p className="font-medium text-sm text-slate-900 group-hover:text-blue-600">Earn 3–5x points on your cruise</p>
                        <p className="text-xs text-slate-600 mt-0.5">The right card covers your fare while you earn bonus points</p>
                      </div>
                    </div>
                  </a>
                  <a href="/travel-hacks/stack-points-free-cruise" className="block p-3 bg-amber-50 border border-amber-200 rounded-lg hover:bg-amber-100 transition-colors group">
                    <div className="flex items-start gap-3">
                      <span className="text-lg">🎯</span>
                      <div className="flex-1">
                        <p className="font-medium text-sm text-slate-900 group-hover:text-blue-600">Stack bonuses for a free cruise</p>
                        <p className="text-xs text-slate-600 mt-0.5">With 2–3 card strategy, your next cruise could cost $0</p>
                      </div>
                    </div>
                  </a>
                </div>
              </div>

              {/* Grand Total */}
              <div className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-4 mb-6 border-2 border-amber-300">
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-lg font-bold text-slate-800">Total Trip Cost</span>
                  <span className="text-3xl font-bold text-amber-600">
                    ${calculations.grandTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-sm text-slate-700">Per Person</span>
                  <span className="text-xl font-bold text-slate-800">
                    ${calculations.costPerPerson.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              {/* Price Comparison */}
              {baseCruiseFare > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-slate-700 mb-2">
                    <span className="font-semibold text-blue-900">Disney advertises</span> this cruise from{' '}
                    <span className="font-bold text-blue-900">${(baseCruiseFare * partySize).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                  </p>
                  <p className="text-sm text-slate-700">
                    <span className="font-semibold text-blue-900">Your estimated cost</span> is{' '}
                    <span className="font-bold text-amber-600">${calculations.grandTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                  </p>
                  <p className="text-sm mt-2 font-semibold text-amber-700">
                    That's <span className="text-lg">{percentageDifference}%</span> more than advertised
                  </p>
                </div>
              )}

              {/* Share Button */}
              <button
                onClick={handleCopyUrl}
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg transition-colors"
              >
                {copied ? (
                  <>
                    <Check size={18} />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy size={18} />
                    Share Calculator
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

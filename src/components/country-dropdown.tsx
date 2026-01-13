"use client"

import { useState } from "react"
import { ChevronDown, Plus } from "lucide-react"

const countries = [
  { label: "இந்தியா", value: "india" },
  { label: "மலேஷியா", value: "malaysia" },
  { label: "சிங்கப்பூர்", value: "singapore" },
  { label: "தாய்லாந்து", value: "thailand" },
  { label: "ஆஸ்திரேலியா", value: "australia" },
]

export function CountryDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState(countries[0])
  const [showAddOption, setShowAddOption] = useState(false)
  const [newCountry, setNewCountry] = useState("")
  const [customCountries, setCustomCountries] = useState<typeof countries>([])

  const allCountries = [...countries, ...customCountries]

  const handleSelectCountry = (country: (typeof countries)[0]) => {
    setSelectedCountry(country)
    setIsOpen(false)
  }

  const handleAddCountry = () => {
    if (newCountry.trim()) {
      const newEntry = {
        label: newCountry,
        value: newCountry.toLowerCase().replace(/\s+/g, "-"),
      }
      setCustomCountries([...customCountries, newEntry])
      setNewCountry("")
      setShowAddOption(false)
    }
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-white border border-gray-300 rounded-sm px-3 py-2 hover:bg-gray-50 transition font-semibold text-sm text-gray-700"
      >
        {selectedCountry.label}
        <ChevronDown size={16} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-white border border-gray-300 rounded-sm shadow-lg z-50 min-w-48">
          <div className="max-h-64 overflow-y-auto">
            {allCountries.map((country) => (
              <button
                key={country.value}
                onClick={() => handleSelectCountry(country)}
                className="w-full text-left px-4 py-2 hover:bg-[#e60000] hover:text-white transition text-sm font-semibold"
              >
                {country.label}
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200"></div>

          {/* Add Option Section */}
          {!showAddOption ? (
            <button
              onClick={() => setShowAddOption(true)}
              className="w-full px-4 py-2 text-[#e60000] hover:bg-gray-100 transition text-sm font-semibold flex items-center gap-2 justify-center"
            >
              <Plus size={16} />
              புதிய நாடு சேர்க்க
            </button>
          ) : (
            <div className="border-t border-gray-200 p-3 space-y-2">
              <input
                type="text"
                placeholder="நாட்டின் பெயரை உள்ளிடவும்"
                value={newCountry}
                onChange={(e) => setNewCountry(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAddCountry()
                }}
                className="w-full px-3 py-1 border border-gray-300 rounded-sm outline-none focus:border-[#e60000] text-sm"
                autoFocus
              />
              <div className="flex gap-2">
                <button
                  onClick={handleAddCountry}
                  className="flex-1 bg-[#e60000] text-white py-1 rounded-sm hover:bg-red-700 transition font-semibold text-sm"
                >
                  சேர்க்க
                </button>
                <button
                  onClick={() => {
                    setShowAddOption(false)
                    setNewCountry("")
                  }}
                  className="flex-1 bg-gray-200 text-gray-700 py-1 rounded-sm hover:bg-gray-300 transition font-semibold text-sm"
                >
                  ரத்து செய்
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

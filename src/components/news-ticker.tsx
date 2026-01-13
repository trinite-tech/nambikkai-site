"use client"

import { AlertCircle, ChevronRight, ChevronLeft } from "lucide-react"
import { useEffect, useState } from "react"

const tickerNews = [
  "பந்தயம்: நியாயத்தன்மை அல்லது பிழை?",
  "2025ல் ஸ்பிரிண்டிங்: புதிய பதிவுகள், புதிய போட்டிகள்",
  "கிரிக்கெட்டின் T20 பரிணாமம்: பொழுதுபோக்கு",
  "இந்தியப் பொருளாதாரம் 6.2% வளர்ச்சி",
]

export function NewsTicker() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % tickerNews.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + tickerNews.length) % tickerNews.length)
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % tickerNews.length)
  }

  return (
    <div className="bg-white border-b-2 border-[#e60000] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-1">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-[#e60000] text-white px-2 py-1 rounded-sm font-bold whitespace-nowrap flex-shrink-0">
            <AlertCircle size={12} />
            <span className="text-xs hidden sm:inline">⚡ செய்தி</span>
            <span className="text-xs sm:hidden">⚡</span>
          </div>

          {/* News ticker text */}
          <div className="flex-1 overflow-hidden">
            <div className="flex items-center gap-2">
              <p className="text-xs sm:text-sm font-semibold text-[#003d7a] whitespace-nowrap animate-marquee">{tickerNews[currentIndex]}</p>
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="flex items-center gap-1 flex-shrink-0">
            <button 
              onClick={handlePrev} 
              className="p-1 hover:bg-gray-100 rounded transition"
              suppressHydrationWarning
            >
              <ChevronLeft size={14} className="text-[#003d7a]" />
            </button>
            <button 
              onClick={handleNext} 
              className="p-1 hover:bg-gray-100 rounded transition"
              suppressHydrationWarning
            >
              <ChevronRight size={14} className="text-[#003d7a]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

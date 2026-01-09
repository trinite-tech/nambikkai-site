"use client"

import { useEffect, useState } from "react"

interface Ad {
  id: number
  company: string
  title: string
  description: string
  color: string
  icon: string
}

const ads: Ad[] = [
  {
    id: 1,
    company: "ட்ரினிட்டி தொழில்நுட்பம்",
    title: "அத்யாதுனிக தொழில்நுட்பம்",
    description: "உங்கள் வியாபாரத்தை மிகச்சிறந்த தீர்வுகளுடன் மாற்றுங்கள்",
    color: "from-blue-600 to-blue-800",
    icon: "🌐",
  },
  {
    id: 2,
    company: "தங்கப்பயிர் உணவுகள்",
    title: "ஆரோக்கியமான இயல்பான உணவு",
    description: "இயற்கை பொருட்களுடன் நல்ல ஆரோக்கிய தேர்வுகள் செய்யுங்கள்",
    color: "from-yellow-500 to-orange-600",
    icon: "🌾",
  },
  {
    id: 3,
    company: "டிஜிட்டல் புதுமைகள் கோ.",
    title: "டிஜிட்டல் உருமாற்றம்",
    description: "உங்கள் வியாபாரத்தை அடுத்த அளவிற்கு எடுத்துச் செல்லுங்கள்",
    color: "from-purple-600 to-pink-600",
    icon: "💻",
  },
  {
    id: 4,
    company: "பிரீமியம் நிதி குழு",
    title: "உங்கள் நிதி எதிர்காலம்",
    description: "நம்பகமான முதலீட்டு சேவைகள் மற்றும் ஆலோசனை",
    color: "from-green-600 to-emerald-800",
    icon: "💰",
  },
  {
    id: 5,
    company: "ஆரோக்கியம் பிளஸ் சுகம்",
    title: "ஆரோக்கியமான வாழ்க்கையின் பாதை",
    description: "உங்கள் ஆரோக்கியமே எங்கள் இலக்கு",
    color: "from-red-600 to-pink-700",
    icon: "❤️",
  },
]

export function AdCarousel3D() {
  const [current, setCurrent] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  useEffect(() => {
    if (!isAutoPlay) return

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % ads.length)
    }, 4000)

    return () => clearInterval(timer)
  }, [isAutoPlay])

  const next = () => {
    setCurrent((prev) => (prev + 1) % ads.length)
    setIsAutoPlay(false)
  }

  const prev = () => {
    setCurrent((prev) => (prev - 1 + ads.length) % ads.length)
    setIsAutoPlay(false)
  }

  return (
    <div
      className="relative w-full h-24 perspective"
      onMouseEnter={() => setIsAutoPlay(false)}
      onMouseLeave={() => setIsAutoPlay(true)}
    >
      <style>{`
        @keyframes rotate-3d {
          0% {
            transform: rotateY(0deg) rotateX(5deg);
            opacity: 0;
          }
          50% {
            transform: rotateY(0deg) rotateX(0deg);
            opacity: 1;
          }
          100% {
            transform: rotateY(0deg) rotateX(-5deg);
            opacity: 0;
          }
        }

        @keyframes flip-in {
          0% {
            transform: rotateY(90deg);
            opacity: 0;
          }
          100% {
            transform: rotateY(0deg);
            opacity: 1;
          }
        }

        .ad-card {
          animation: flip-in 0.6s ease-out forwards;
          perspective: 1000px;
        }

        .ad-card-inner {
          transform-style: preserve-3d;
          transition: transform 0.6s;
        }
      `}</style>

      {/* CHANGE: 3D flip animation carousel for ads */}
      <div className="absolute inset-0">
        {ads.map((ad, index) => {
          const isActive = index === current
          return (
            <div
              key={ad.id}
              className={`ad-card absolute inset-0 transition-all duration-500 ${
                isActive ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <div
                className={`bg-gradient-to-r ${ad.color} rounded-lg h-full flex items-center justify-between px-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer group`}
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="text-4xl">{ad.icon}</div>
                  <div className="text-white">
                    <p className="text-xs font-semibold opacity-90">{ad.company}</p>
                    <h3 className="text-lg font-bold">{ad.title}</h3>
                    <p className="text-xs opacity-80 hidden sm:block">{ad.description}</p>
                  </div>
                </div>
                <button className="bg-white text-gray-800 px-4 py-2 rounded font-semibold text-sm hover:bg-gray-100 transition whitespace-nowrap ml-4">
                  மேலும் தெரிந்து கொள்ளவும்
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Navigation buttons */}
      <button
        onClick={prev}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 bg-[#003d7a] hover:bg-[#1d4e89] text-white rounded-full p-2 transition z-20"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={next}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 bg-[#003d7a] hover:bg-[#1d4e89] text-white rounded-full p-2 transition z-20"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Indicator dots */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {ads.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrent(index)
              setIsAutoPlay(false)
            }}
            className={`w-2 h-2 rounded-full transition-all ${
              index === current ? "bg-white w-6" : "bg-white/50 hover:bg-white/75"
            }`}
          />
        ))}
      </div>
    </div>
  )
}

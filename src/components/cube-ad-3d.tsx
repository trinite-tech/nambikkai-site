"use client"

import { useEffect, useState } from "react"

interface CubeAd {
  id: number
  company: string
  title: string
  description: string
  color: string
  icon: string
  bgImage?: string
}

const cubeAds: CubeAd[] = [
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
  {
    id: 6,
    company: "கல்வி மையம்",
    title: "எதிர்காலத்தின் கல்வி",
    description: "உங்கள் குழந்தைகளுக்கு சிறந்த கல்வி வாய்ப்புகள்",
    color: "from-indigo-600 to-blue-700",
    icon: "📚",
  },
]

export function CubeAd3D() {
  const [currentFace, setCurrentFace] = useState(0)
  const [isRotating, setIsRotating] = useState(true)

  useEffect(() => {
    if (!isRotating) return

    const timer = setInterval(() => {
      setCurrentFace((prev) => (prev + 1) % 6)
    }, 3000)

    return () => clearInterval(timer)
  }, [isRotating])

  const rotateToCube = (faceIndex: number) => {
    setCurrentFace(faceIndex)
    setIsRotating(false)
    setTimeout(() => setIsRotating(true), 5000)
  }

  const getRotation = () => {
    const rotations = [
      "rotateY(0deg)",      // Front
      "rotateY(90deg)",     // Right
      "rotateY(180deg)",    // Back
      "rotateY(-90deg)",    // Left
      "rotateX(90deg)",     // Top
      "rotateX(-90deg)",    // Bottom
    ]
    return rotations[currentFace]
  }

  return (
    <div className="w-full h-64 flex items-center justify-center perspective-1000 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden">
      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .cube-container {
          position: relative;
          width: 200px;
          height: 200px;
          transform-style: preserve-3d;
          transition: transform 1s ease-in-out;
        }
        
        .cube-face {
          position: absolute;
          width: 200px;
          height: 200px;
          border: 2px solid rgba(255,255,255,0.3);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 20px;
          box-sizing: border-box;
          backdrop-filter: blur(10px);
        }
        
        .cube-face.front { transform: translateZ(100px); }
        .cube-face.back { transform: rotateY(180deg) translateZ(100px); }
        .cube-face.right { transform: rotateY(90deg) translateZ(100px); }
        .cube-face.left { transform: rotateY(-90deg) translateZ(100px); }
        .cube-face.top { transform: rotateX(90deg) translateZ(100px); }
        .cube-face.bottom { transform: rotateX(-90deg) translateZ(100px); }
        
        .floating-animation {
          animation: float 3s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .glow-effect {
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
        }
      `}</style>

      <div 
        className="cube-container floating-animation glow-effect"
        style={{ transform: getRotation() }}
        onMouseEnter={() => setIsRotating(false)}
        onMouseLeave={() => setIsRotating(true)}
      >
        {cubeAds.map((ad, index) => {
          const faceClasses = ["front", "right", "back", "left", "top", "bottom"]
          return (
            <div
              key={ad.id}
              className={`cube-face ${faceClasses[index]} bg-gradient-to-br ${ad.color} text-white cursor-pointer hover:scale-105 transition-transform`}
              onClick={() => rotateToCube(index)}
            >
              <div className="text-4xl mb-2">{ad.icon}</div>
              <h3 className="text-sm font-bold mb-1">{ad.company}</h3>
              <h4 className="text-xs font-semibold mb-2">{ad.title}</h4>
              <p className="text-xs opacity-90 leading-tight">{ad.description}</p>
              <button className="mt-3 bg-white text-gray-800 px-3 py-1 rounded text-xs font-semibold hover:bg-gray-100 transition">
                மேலும்
              </button>
            </div>
          )
        })}
      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {cubeAds.map((_, index) => (
          <button
            key={index}
            onClick={() => rotateToCube(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentFace 
                ? "bg-blue-600 scale-125" 
                : "bg-gray-400 hover:bg-gray-600"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
"use client"

import { useEffect, useState } from "react"

const miniAds = [
  { icon: "🌐", title: "தொழில்நுட்பம்", color: "from-blue-500 to-blue-700" },
  { icon: "🌾", title: "உணவுகள்", color: "from-yellow-500 to-orange-600" },
  { icon: "💻", title: "டிஜிட்டல்", color: "from-purple-500 to-pink-600" },
  { icon: "💰", title: "நிதி", color: "from-green-500 to-emerald-700" },
]

export function MiniCubeAd() {
  const [rotation, setRotation] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setRotation(prev => prev + 90)
    }, 2000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="w-24 h-24 perspective-300 mx-auto">
      <style>{`
        .perspective-300 { perspective: 300px; }
        .mini-cube {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          transition: transform 0.8s ease-in-out;
        }
        .mini-face {
          position: absolute;
          width: 96px;
          height: 96px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255,255,255,0.3);
        }
        .mini-face.f1 { transform: translateZ(48px); }
        .mini-face.f2 { transform: rotateY(90deg) translateZ(48px); }
        .mini-face.f3 { transform: rotateY(180deg) translateZ(48px); }
        .mini-face.f4 { transform: rotateY(-90deg) translateZ(48px); }
      `}</style>
      
      <div 
        className="mini-cube"
        style={{ transform: `rotateY(${rotation}deg)` }}
      >
        {miniAds.map((ad, i) => (
          <div key={i} className={`mini-face f${i+1} bg-gradient-to-br ${ad.color} text-white rounded-lg`}>
            <div className="text-2xl">{ad.icon}</div>
            <div className="text-xs font-bold mt-1">{ad.title}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
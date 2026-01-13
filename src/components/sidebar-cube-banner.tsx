"use client"

import { useEffect, useState } from "react"

const ads = [
  { icon: "🌐", title: "தொழில்நுட்பம்", subtitle: "புதிய தீர்வுகள்", color: "from-blue-500 to-blue-700" },
  { icon: "🌾", title: "உணவுகள்", subtitle: "இயற்கை சுவை", color: "from-green-500 to-emerald-600" },
  { icon: "💻", title: "டிஜிட்டல்", subtitle: "எதிர்காலம்", color: "from-purple-500 to-pink-600" },
  { icon: "💰", title: "நிதி சேவை", subtitle: "நம்பகமான", color: "from-yellow-500 to-orange-600" },
]

export function SidebarCubeBanner() {
  const [rotation, setRotation] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setRotation(prev => prev + 90)
    }, 2500)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="w-full h-32 perspective-500 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg overflow-hidden relative">
      <style>{`
        .perspective-500 { perspective: 500px; }
        .banner-cube {
          width: 120px;
          height: 120px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          transform-style: preserve-3d;
          transition: transform 1s ease-in-out;
          animation: float 4s ease-in-out infinite;
        }
        .banner-face {
          position: absolute;
          width: 120px;
          height: 120px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255,255,255,0.4);
          border-radius: 8px;
          text-align: center;
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }
        .banner-face.f1 { transform: translateZ(60px); }
        .banner-face.f2 { transform: rotateY(90deg) translateZ(60px); }
        .banner-face.f3 { transform: rotateY(180deg) translateZ(60px); }
        .banner-face.f4 { transform: rotateY(-90deg) translateZ(60px); }
        
        @keyframes float {
          0%, 100% { transform: translate(-50%, -50%) translateY(0px); }
          50% { transform: translate(-50%, -50%) translateY(-8px); }
        }
      `}</style>
      
      <div 
        className="banner-cube"
        style={{ transform: `translate(-50%, -50%) rotateY(${rotation}deg)` }}
      >
        {ads.map((ad, i) => (
          <div key={i} className={`banner-face f${i+1} bg-gradient-to-br ${ad.color} text-white`}>
            <div className="text-3xl mb-1">{ad.icon}</div>
            <div className="text-sm font-bold">{ad.title}</div>
            <div className="text-xs opacity-90">{ad.subtitle}</div>
          </div>
        ))}
      </div>
      
      <div className="absolute bottom-2 right-2 text-xs text-gray-500 font-semibold">
        விளம்பரம்
      </div>
    </div>
  )
}
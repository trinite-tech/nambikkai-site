"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const tamilAds = [
  {
    company: "Trinity Tech",
    title: "Trinity Technology Solutions",
    description: "Leading technology solutions for your business needs",
    image: "/trinity-ad-poster.jpg",
    color: "from-purple-600 to-indigo-800",
    icon: "🚀",
    link: "https://trinitetech.com/",
    isExternal: true
  },
  {
    company: "GrowthPulss",
    title: "Growth & Business Solutions",
    description: "Accelerate your business growth with our expert solutions",
    image: "/growthpulss-banner.jpg",
    color: "from-green-600 to-teal-700",
    icon: "📈",
    link: "https://www.growthpulss.com/",
    isExternal: true
  },
  {
    company: "தமிழ் டெக் சொல்யூஷன்ஸ்",
    title: "உங்கள் வியாபாரத்தை டிஜிட்டல் ஆக்குங்கள்",
    description: "நவீன தொழில்நுட்பத்துடன் உங்கள் வியாபாரத்தை வளர்க்க உதவுகிறோம்",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
    color: "from-blue-600 to-blue-800",
    icon: "💻"
  },
  {
    company: "சுவையான உணவகம்",
    title: "பாரம்பரிய தமிழ் சுவைகள்",
    description: "வீட்டு சமையல் போன்ற சுவையுடன் தரமான உணவு வகைகள்",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
    color: "from-orange-500 to-red-600",
    icon: "🍛"
  },
  {
    company: "கல்வி மையம்",
    title: "தமிழ் மொழி கல்வி",
    description: "உங்கள் குழந்தைகளுக்கு சிறந்த தமிழ் கல்வி மற்றும் பண்பாட்டு அறிவு",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop",
    color: "from-green-600 to-emerald-700",
    icon: "📚"
  },
  {
    company: "ஆரோக்கிய மருத்துவமனை",
    title: "உங்கள் ஆரோக்கியம் எங்கள் பொறுப்பு",
    description: "அனுபவமிக்க மருத்துவர்களுடன் சிறந்த சிகிச்சை சேவை",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
    color: "from-teal-600 to-cyan-700",
    icon: "🏥"
  }
];

export function HeroAdBanner() {
  const [currentAd, setCurrentAd] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAd((prev) => (prev + 1) % tamilAds.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-80 h-96 relative overflow-hidden rounded-xl shadow-2xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentAd}
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -300 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={`absolute inset-0 bg-gradient-to-br ${tamilAds[currentAd].color} text-white`}
        >
          <div className="relative h-full flex flex-col">
            {/* Background Image */}
            <div className={`absolute inset-0 ${currentAd === 0 || currentAd === 1 ? 'opacity-100' : 'opacity-20'}`}>
              <img
                src={tamilAds[currentAd].image}
                alt={tamilAds[currentAd].company}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Overlay for Trinity and GrowthPulss ads to ensure text readability */}
            {(currentAd === 0 || currentAd === 1) && (
              <div className="absolute inset-0 bg-black/40"></div>
            )}
            
            {/* Content */}
            <div className="relative z-10 p-6 flex flex-col justify-between h-full">
              <div>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl mb-4"
                >
                  {tamilAds[currentAd].icon}
                </motion.div>
                
                <motion.h3
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-sm font-semibold mb-2 opacity-90"
                >
                  {tamilAds[currentAd].company}
                </motion.h3>
                
                <motion.h2
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl font-bold mb-3 leading-tight"
                >
                  {tamilAds[currentAd].title}
                </motion.h2>
                
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-sm opacity-90 leading-relaxed"
                >
                  {tamilAds[currentAd].description}
                </motion.p>
              </div>
              
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex items-center justify-between"
              >
                {tamilAds[currentAd].link ? (
                  <a
                    href={tamilAds[currentAd].link}
                    target={tamilAds[currentAd].isExternal ? "_blank" : "_self"}
                    rel={tamilAds[currentAd].isExternal ? "noopener noreferrer" : undefined}
                    className="bg-white text-gray-800 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-gray-100 transition-colors inline-block"
                  >
                    மேலும் அறிய
                  </a>
                ) : (
                  <button className="bg-white text-gray-800 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-gray-100 transition-colors">
                    மேலும் அறிய
                  </button>
                )}
                
                {/* Progress indicators */}
                <div className="flex space-x-1">
                  {tamilAds.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentAd ? "bg-white w-6" : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      
      {/* Ad label */}
      <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
        விளம்பரம்
      </div>
    </div>
  );
}
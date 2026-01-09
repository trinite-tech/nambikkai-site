"use client"

import { Calendar, Search, ChevronDown, User, LogOut, Globe } from "lucide-react"
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useAuth } from "@/hooks/use-auth"
import { createClient } from "@/lib/supabase/client"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [langMenuOpen, setLangMenuOpen] = useState(false)
  const [currentLang, setCurrentLang] = useState('ta')
  const [mounted, setMounted] = useState(false)
  const { user, loading } = useAuth()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLanguageChange = (lang: string) => {
    setCurrentLang(lang)
    setLangMenuOpen(false)
  }

  const handleLogout = async () => {
    const supabase = createClient()
    if (supabase) {
      await supabase.auth.signOut()
    }
    setUserMenuOpen(false)
  }
  
  const today = new Date().toLocaleDateString("ta-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })

  const currentTime = new Date().toLocaleTimeString("ta-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })

  if (!mounted) {
    return (
      <header className="bg-white shadow-sm">
        <div className="bg-[#003d7a] text-white py-2">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Calendar size={14} />
                <span>{today}</span>
              </div>
              <div className="bg-[#e60000] px-2 py-1 rounded text-xs font-bold">
                {currentTime}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/auth/subscribe" className="text-xs bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded transition font-semibold">
                சந்தா
              </Link>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-6">
            <Image
              src="/logo.png"
              alt="நம்பிக்கை செய்திகள்"
              width={300}
              height={100}
              priority
              className="w-auto h-auto max-h-20"
            />
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className="bg-white shadow-sm">
      {/* Top bar */}
      <div className="bg-[#003d7a] text-white py-2">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              <span className="hidden sm:inline">{today}</span>
              <span className="sm:hidden">{today.split(' ')[0]}</span>
            </div>
            <div className="bg-[#e60000] px-2 py-1 rounded text-xs font-bold">
              {currentTime}
            </div>
            <span className="hidden sm:inline">தமிழ்நாடு, 26°C</span>
            <span className="sm:hidden">26°C</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1 sm:gap-2 text-xs bg-blue-600 hover:bg-blue-700 text-white px-2 sm:px-3 py-1 rounded transition"
              >
                <Globe size={12} />
                <span className="hidden sm:inline">{currentLang === 'ta' ? 'தமிழ்' : 'English'}</span>
                <span className="sm:hidden">{currentLang === 'ta' ? 'த' : 'En'}</span>
                <ChevronDown size={12} />
              </button>
              {langMenuOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white rounded shadow-lg z-50">
                  <button
                    onClick={() => handleLanguageChange('ta')}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition ${
                      currentLang === 'ta' ? 'bg-blue-50 text-blue-600' : 'text-[#003d7a]'
                    }`}
                  >
                    தமிழ்
                  </button>
                  <button
                    onClick={() => handleLanguageChange('en')}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition ${
                      currentLang === 'en' ? 'bg-blue-50 text-blue-600' : 'text-[#003d7a]'
                    }`}
                  >
                    English
                  </button>
                </div>
              )}
            </div>
            <Link 
              href="/auth/subscribe" 
              className="text-xs bg-yellow-600 hover:bg-yellow-700 text-white px-2 sm:px-3 py-1 rounded transition font-semibold"
            >
              <span className="hidden sm:inline">சந்தா</span>
              <span className="sm:hidden">சந்</span>
            </Link>
            {!loading && (
              user ? (
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-1 sm:gap-2 text-xs bg-green-600 hover:bg-green-700 text-white px-2 sm:px-3 py-1 rounded transition"
                  >
                    <User size={12} />
                    <span className="hidden sm:inline">வணக்கம்</span>
                  </button>
                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow-lg z-50">
                      <Link
                        href="/dashboard"
                        className="block px-4 py-2 text-[#003d7a] hover:bg-gray-100 transition text-sm"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        டாஷ்போர்டு
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 w-full text-left px-4 py-2 text-[#003d7a] hover:bg-gray-100 transition text-sm"
                      >
                        <LogOut size={12} />
                        வெளியேறு
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link 
                  href="/auth/login" 
                  className="text-xs bg-[#e60000] hover:bg-red-700 text-white px-2 sm:px-3 py-1 rounded transition"
                >
                  <span className="hidden sm:inline">உள்நுழைக</span>
                  <span className="sm:hidden">உள்</span>
                </Link>
              )
            )}
            <div className="relative">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1 sm:gap-2 bg-[#e60000] hover:bg-[#cc0000] px-2 sm:px-4 py-2 rounded transition text-white text-xs sm:text-sm"
              >
                <span className="hidden sm:inline">இந்தியா</span>
                <span className="sm:hidden">இந்</span>
                <ChevronDown size={16} />
              </button>
              {isOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow-lg z-50">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-left px-4 py-2 text-[#003d7a] hover:bg-gray-100 transition"
                  >
                    இந்தியா
                  </button>
                  <a
                    href="https://nambikkai.com.my/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-2 text-[#003d7a] hover:bg-gray-100 transition"
                  >
                    மலேஷியா
                  </a>
                </div>
              )}
            </div>
            <div className="hidden lg:flex items-center gap-2 ml-2">
              <a href="https://www.facebook.com/nambikkaionline" target="_blank" rel="noopener noreferrer" className="hover:text-[#e60000] transition">
                <Facebook size={16} />
              </a>
              <a href="#" className="hover:text-[#e60000] transition">
                <Twitter size={16} />
              </a>
              <a href="https://www.instagram.com/nambikkai_india/" target="_blank" rel="noopener noreferrer" className="hover:text-[#e60000] transition">
                <Instagram size={16} />
              </a>
              <a href="https://www.youtube.com/@nambikkaionline" target="_blank" rel="noopener noreferrer" className="hover:text-[#e60000] transition">
                <Youtube size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Logo section */}
      <div className="max-w-7xl mx-auto px-4 py-2 sm:py-4">
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
          <Image
            src="/logo.png"
            alt="நம்பிக்கை செய்திகள்"
            width={300}
            height={100}
            priority
            className="w-auto h-auto max-h-12 sm:max-h-20"
          />
          <div className="flex-1 w-full">
            <a 
              href="https://www.growthpulss.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block relative w-full h-16 sm:h-24 overflow-hidden rounded-lg shadow-xl border-2 border-gray-200"
            >
              <img
                src="/growthpulss-banner.jpg"
                alt="GrowthPulss Banner"
                className="w-full h-full object-contain bg-white"
              />
              <div className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded font-semibold">
                விளம்பரம்
              </div>
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}

"use client"

import Link from "next/link"
import { Menu, X, Home } from "lucide-react"
import { useState, useEffect } from "react"
import { getCategories } from "@/lib/categories"

interface NavItem {
  label: string
  href: string
  slug?: string
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [navItems, setNavItems] = useState<NavItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setMounted(true)
    loadCategories()
  }, [])

  const loadCategories = async () => {
    try {
      const result = await getCategories()
      
      // Always include home and news at the beginning
      const baseItems = [
        { label: "முகப்பு", href: "/" },
        { label: "செய்திகள்", href: "/news" },
      ]
      
      if (result.success && result.categories.length > 0) {
        // Filter out home and news from Strapi categories to avoid duplicates
        const dynamicCategories = result.categories.filter(
          (cat: NavItem) => !['/', '/news'].includes(cat.href)
        )
        setNavItems([...baseItems, ...dynamicCategories])
      } else {
        // Use fallback categories
        setNavItems(result.categories)
      }
    } catch (error) {
      console.error('Error loading categories:', error)
      // Fallback to static menu
      setNavItems([
        { label: "முகப்பு", href: "/" },
        { label: "செய்திகள்", href: "/news" },
        { label: "உலகம்", href: "/category/world" },
        { label: "இந்தியா", href: "/category/india" },
        { label: "தமிழ்நாடு", href: "/category/tamilnadu" },
        { label: "விளையாட்டு", href: "/category/sports" },
        { label: "தொழில்நுட்பம்", href: "/category/tech" },
        { label: "வணிகம்", href: "/category/business" },
        { label: "படங்கள்", href: "/images" },
      ])
    } finally {
      setLoading(false)
    }
  }

  if (!mounted || loading) {
    return (
      <nav className="bg-[#003d7a] text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition">
              <div className="w-10 h-10 bg-[#e60000] rounded-full flex items-center justify-center">
                <Home size={20} className="text-white" />
              </div>
              <span className="font-bold text-xl hidden sm:block">நம்பிக்கை</span>
            </Link>
            <div className="hidden lg:flex items-center justify-center flex-1 max-w-4xl mx-8">
              <div className="animate-pulse flex space-x-2 w-full">
                {[1,2,3,4,5,6,7,8].map((i) => (
                  <div key={i} className="h-8 bg-white/20 rounded flex-1"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className="bg-[#003d7a] text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Home */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition">
            <div className="w-10 h-10 bg-[#e60000] rounded-full flex items-center justify-center">
              <Home size={20} className="text-white" />
            </div>
            <span className="font-bold text-xl hidden sm:block">நம்பிக்கை</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center justify-center flex-1 max-w-4xl mx-8">
            <div className="flex items-center justify-center space-x-2 w-full">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="font-semibold text-white hover:text-[#e60000] hover:bg-white/10 px-3 py-2 rounded transition duration-200 text-sm whitespace-nowrap flex items-center justify-center min-h-[40px] flex-1 text-center"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="lg:hidden p-2 hover:bg-white/10 rounded transition"
          >
            {isOpen ? <X size={24} className="text-white" /> : <Menu size={24} className="text-white" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="lg:hidden pb-4 space-y-1 border-t border-white/20 mt-2 pt-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-4 py-3 hover:bg-white/10 rounded transition font-semibold text-white hover:text-[#e60000]"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}

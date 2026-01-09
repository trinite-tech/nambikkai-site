"use client"

import { Header } from "@/components/header"
import { Navbar } from "@/components/navbar"
import { NewsTicker } from "@/components/news-ticker"
import { Footer } from "@/components/footer"
import { HeroAdBanner } from "@/components/hero-ad-banner"
import { SidebarWidget } from "@/components/sidebar-widget"
import { SidebarCubeBanner } from "@/components/sidebar-cube-banner"
import { categories } from "@/lib/sample-data"

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Navbar />
      <NewsTicker />
      
      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            {children}
          </div>
          
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-6">
              <HeroAdBanner />
              
              <SidebarWidget
                title="வகைப்பாடுகள்"
                type="categories"
                items={categories.map((cat, idx) => ({
                  label: cat.label,
                  count: [67, 45, 89, 34, 56, 78, 23][idx] || 50,
                  href: cat.href,
                }))}
              />

              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="font-bold text-[#003d7a] mb-4 pb-3 border-b-2 border-[#e60000] text-base">நம்மைப் பின்தொடருங்கள்</h3>
                <div className="space-y-4">
                  <SidebarCubeBanner />
                  <div className="grid grid-cols-1 gap-3">
                    <a 
                      href="https://www.facebook.com/nambikkaionline"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition font-semibold text-center"
                    >
                      பேஸ்புக்
                    </a>
                    <a 
                      href="https://www.instagram.com/nambikkai_india/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-pink-500 text-white py-3 rounded hover:bg-pink-600 transition font-semibold text-center"
                    >
                      இன்ஸ்டாக்ராம்
                    </a>
                    <a 
                      href="https://www.youtube.com/@nambikkaionline"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-[#e60000] text-white py-3 rounded hover:bg-red-700 transition font-semibold text-center"
                    >
                      யூடியூப்
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}
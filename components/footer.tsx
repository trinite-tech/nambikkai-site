"use client"

import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Youtube, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"
import { sampleArticles, categories } from "@/lib/sample-data"

export function Footer() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 10))
  const [selectedDate, setSelectedDate] = useState<number | null>(null)
  const [newsIndex, setNewsIndex] = useState(0)

  const getDaysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  const getFirstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay()

  const daysInMonth = getDaysInMonth(currentMonth)
  const firstDay = getFirstDayOfMonth(currentMonth)
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const emptyDays = Array.from({ length: firstDay }, () => null)
  const calendarDays = [...emptyDays, ...days]

  const monthNames = [
    "ஜனவரி",
    "பிப்ரவரி",
    "மார்ச்",
    "ஏப்ரல்",
    "மே",
    "ஜூன்",
    "ஜூலை",
    "ஆகஸ்ட்",
    "செப்டம்பர்",
    "அக்டோபர்",
    "நவம்பர்",
    "டிசம்பர்",
  ]

  const dayNames = ["ஞாயிறு", "திங்கள்", "செவ்வாய்", "புதன்", "வியாழன்", "வெள்ளி", "சனி"]

  const breakingNews = sampleArticles.slice(0, 4)
  const latestPosts = sampleArticles.slice(0, 3)
  
  // Extract news dates and convert to day numbers with article mapping
  const newsDateMap = new Map()
  sampleArticles.forEach(article => {
    const dateStr = article.date
    const dayMatch = dateStr.match(/^(\d+)/)
    if (dayMatch) {
      const day = parseInt(dayMatch[1])
      if (!newsDateMap.has(day)) {
        newsDateMap.set(day, [])
      }
      newsDateMap.get(day).push(article)
    }
  })
  const newsDates = Array.from(newsDateMap.keys())

  return (
    <footer className="relative bg-[#003d7a] text-white py-12 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="bubble bubble-1"></div>
        <div className="bubble bubble-2"></div>
        <div className="bubble bubble-3"></div>
        <div className="bubble bubble-4"></div>
        <div className="bubble bubble-5"></div>
        <div className="bubble bubble-6"></div>
      </div>

      <div className="relative z-10">
        <div className="bg-[#e60000] text-white py-4 px-4 mb-8 flex items-center gap-4 overflow-hidden">
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="text-lg font-bold">⚡</span>
            <span className="font-bold">சமீபத்திய செய்திகள்</span>
          </div>
          <div className="flex-1 overflow-hidden">
            <div className="breaking-news-scroll whitespace-nowrap">
              {breakingNews.map((news, idx) => (
                <span key={idx} className="inline-block mr-16">
                  {news.title}
                </span>
              ))}
              {breakingNews.map((news, idx) => (
                <span key={`repeat-${idx}`} className="inline-block mr-16">
                  {news.title}
                </span>
              ))}
            </div>
          </div>
          <button
            onClick={() => setNewsIndex((newsIndex - 1 + breakingNews.length) % breakingNews.length)}
            className="flex-shrink-0 bg-white text-[#e60000] p-2 rounded-full hover:bg-gray-200 transition"
            suppressHydrationWarning
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => setNewsIndex((newsIndex + 1) % breakingNews.length)}
            className="flex-shrink-0 bg-white text-[#e60000] p-2 rounded-full hover:bg-gray-200 transition"
            suppressHydrationWarning
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Logo and Description */}
            <div>
              <Image src="/logo.png" alt="நம்பிக்கை செய்திகள்" width={140} height={52} className="mb-4 h-auto w-auto" />
              <p className="text-sm text-gray-300 leading-relaxed">
                Petrichor Enterprises, Nambikkai Sdn Bhd (1434468-U), Malaysia நிறுவனத்தின் அதிகாரப்பூர்வ கூட்டாளியாகும். 'Nambikkai' பிராண்டும் அதன் லோகோவும் பயன்படுத்த அனுமதி பெற்றுள்ளது. மேலும், Petrichor Enterprises நிறுவனம் Nambikkai SDN BHD (Malaysia) உடன் செய்தி உள்ளடக்கம் மற்றும் இந்தியாவில் நிகழ்ச்சிகள் நடத்துதல் தொடர்பாக இணைந்து செயல்படுகிறது.
              </p>
              <div className="mt-4 flex gap-3">
                <a href="#" className="hover:text-[#e60000] transition">
                  <Facebook size={18} />
                </a>
                <a href="#" className="hover:text-[#e60000] transition">
                  <Twitter size={18} />
                </a>
                <a href="#" className="hover:text-[#e60000] transition">
                  <Instagram size={18} />
                </a>
                <a href="#" className="hover:text-[#e60000] transition">
                  <Youtube size={18} />
                </a>
              </div>
            </div>

            {/* Categories */}
            <div>
              <h4 className="font-bold mb-4 text-lg">வகைப்பாடுகள்</h4>
              <ul className="space-y-2 text-sm">
                {categories.map((cat) => (
                  <li key={cat.label}>
                    <Link href={cat.href} className="hover:text-[#e60000] transition flex items-center gap-2">
                      <span className="text-[#e60000]">●</span> {cat.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Latest Posts */}
            <div>
              <h4 className="font-bold mb-4 text-lg">சமீபத்திய செய்திகள்</h4>
              <div className="space-y-3 text-sm">
                {latestPosts.map((post) => (
                  <div key={post.id} className="pb-3 border-b border-[#1d4e89] last:border-b-0">
                    <Link
                      href={`/article/${post.id}`}
                      className="hover:text-[#e60000] transition font-medium line-clamp-2"
                    >
                      {post.title}
                    </Link>
                    <p className="text-xs text-gray-400 mt-1">{post.date}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-lg">நாட்காட்டி</h4>
              <div className="bg-[#1d4e89] p-4 rounded">
                <div className="flex justify-between items-center mb-4">
                  <button
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                    className="hover:text-[#e60000] transition"
                    suppressHydrationWarning
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <span className="font-bold text-sm">
                    {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                  </span>
                  <button
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                    className="hover:text-[#e60000] transition"
                    suppressHydrationWarning
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>

                <div className="calendar-header">
                  {dayNames.map((day) => (
                    <div key={day} className="calendar-header-day">
                      {day}
                    </div>
                  ))}
                </div>

                <div className="calendar-grid">
                  {calendarDays.map((day, idx) => (
                    <div
                      key={idx}
                      className={`calendar-day text-xs ${
                        day === null ? "opacity-0" : ""
                      } ${day === selectedDate ? "highlight" : ""} ${
                        day && newsDates.includes(day) ? "bg-[#e60000] text-white font-bold" : ""
                      }`}
                      onClick={() => {
                        if (day) {
                          setSelectedDate(day)
                          if (newsDateMap.has(day)) {
                            const articles = newsDateMap.get(day)
                            window.location.href = `/article/${articles[0].id}`
                          }
                        }
                      }}
                    >
                      {day}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-[#1d4e89] pt-8">
            <div className="mb-6 pb-6 border-b border-[#1d4e89]">
              <p className="text-xs text-gray-400 leading-relaxed">
               
              </p>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-300">
              <div className="mb-4">
                <p className="text-xs text-gray-400 leading-relaxed mb-2">
                  Petrichor Enterprises, Nambikkai Sdn Bhd (1434468-U), Malaysia நிறுவனத்தின் அதிகாரப்பூர்வ கூட்டாளியாகும். 'Nambikkai' பிராண்டும் அதன் லோகோவும் பயன்படுத்த அனுமதி பெற்றுள்ளது.
                </p>
                <p className="text-xs text-gray-400 leading-relaxed mb-3">
                  மேலும், Petrichor Enterprises நிறுவனம் Nambikkai SDN BHD (Malaysia) உடன் செய்தி உள்ளடக்கம் மற்றும் இந்தியாவில் நிகழ்ச்சிகள் நடத்துதல் தொடர்பாக இணைந்து செயல்படுகிறது.
                </p>
              </div>
              <p>&copy; 2025 நம்பிக்கை செய்திகள். அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டுள்ளன.</p>
              <div className="flex gap-4 mt-4 md:mt-0">
                <a href="/about" className="hover:text-[#e60000] transition">
                  பற்றி
                </a>
                <a href="#" className="hover:text-[#e60000] transition">
                  தனியுரிமை கொள்கை
                </a>
                <a href="#" className="hover:text-[#e60000] transition">
                  பயன்பாட்டு விதிமுறைகள்
                </a>
                <a href="#" className="hover:text-[#e60000] transition">
                  தொடர்புக்கு
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

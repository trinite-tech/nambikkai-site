import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { Analytics } from "@vercel/analytics/next"
import { MainLayout } from "@/components/main-layout"

export const metadata: Metadata = {
  metadataBase: new URL("https://tamil-news.vercel.app"),
  title: "நம்பிக்கை செய்திகள் - Nambikkai Tamil News Portal | தமிழ் செய்திகள் சமீபத்திய വിவரങ്ങള്",
  description:
    "உலகம், இந்தியா, தமிழ்நாடு, விளையாட்டு, தொழில்நுட்பம், சினிமா மற்றும் வணிகம் செய்திகள் தமிழில். Get latest Tamil news from around the world.",
  keywords: "tamil news, தமிழ் செய்திகள், tamilnews, இந்தியா செய்திகள், உலக செய்திகள்",
  openGraph: {
    type: "website",
    locale: "ta_IN",
    url: "https://tamil-news.vercel.app",
    title: "நம்பிக்கை செய்திகள் - Nambikkai Tamil News Portal",
    description: "Latest Tamil news from India and around the world",
    siteName: "Nambikkai News",
  },
  twitter: {
    card: "summary_large_image",
    title: "நம்பிக்கை செய்திகள் - Nambikkai News",
    description: "Latest Tamil news updates",
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/apple-icon.png",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ta" dir="ltr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Mukta:wght@400;600;700;800&family=Catamaran:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">
        <MainLayout>{children}</MainLayout>
        <Analytics />
      </body>
    </html>
  )
}

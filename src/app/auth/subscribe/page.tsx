"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Star, Crown } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function SubscribePage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      // Check if Supabase is available
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        throw new Error("Supabase configuration missing")
      }

      const supabase = createClient()
      
      if (!supabase) {
        throw new Error("Authentication service not available")
      }
      
      // Test connection first
      const { data: testData, error: testError } = await supabase.auth.getSession()
      if (testError && testError.message.includes('fetch')) {
        throw new Error("Network connection error. Please check your internet connection.")
      }

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            subscription_type: 'premium'
          }
        }
      })
      
      if (error) {
        if (error.message.includes('fetch')) {
          throw new Error("Network error. Please try again later.")
        }
        throw error
      }
      
      router.push("/auth/signup-success")
    } catch (error: unknown) {
      console.error('Subscription error:', error)
      if (error instanceof Error) {
        if (error.message.includes('fetch') || error.message.includes('Network')) {
          setError("Network connection error. Please check your internet connection and try again.")
        } else {
          setError(error.message)
        }
      } else {
        setError("An unexpected error occurred. Please try again.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#003d7a] to-[#1d4e89] p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl w-full">
        {/* Premium Features */}
        <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-2">
              <Crown className="h-12 w-12 text-yellow-600" />
            </div>
            <CardTitle className="text-2xl text-yellow-800">பிரீமியம் சந்தா</CardTitle>
            <CardDescription className="text-yellow-700">முழு உள்ளடக்கத்திற்கான அணுகல்</CardDescription>
            <Badge className="bg-yellow-600 text-white mx-auto">
              <Star className="h-3 w-3 mr-1" />
              சிறப்பு சலுகை
            </Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center mb-6">
              <div className="text-3xl font-bold text-yellow-800">₹99</div>
              <div className="text-sm text-yellow-600">மாதத்திற்கு</div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Check className="h-5 w-5 text-green-600" />
                <span className="text-sm">அனைத்து செய்திகளுக்கும் முழு அணுகல்</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="h-5 w-5 text-green-600" />
                <span className="text-sm">விளம்பரம் இல்லாத அனுபவம்</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="h-5 w-5 text-green-600" />
                <span className="text-sm">பிரத்யேக பிரீமியம் உள்ளடக்கம்</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="h-5 w-5 text-green-600" />
                <span className="text-sm">முன்னதாக செய்தி அறிவிப்புகள்</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="h-5 w-5 text-green-600" />
                <span className="text-sm">ஆஃப்லைன் வாசிப்பு வசதி</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="h-5 w-5 text-green-600" />
                <span className="text-sm">24/7 வாடிக்கையாளர் ஆதரவு</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Signup Form */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-2xl">பிரீமியம் சந்தா பதிவு</CardTitle>
            <CardDescription>முழு உள்ளடக்கத்திற்கான அணுகலைப் பெறுங்கள்</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubscribe} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#003d7a] mb-1">பெயர்</label>
                <Input
                  type="text"
                  placeholder="உங்கள் பெயர்"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#003d7a] mb-1">மின்னஞ்சல்</label>
                <Input
                  type="email"
                  placeholder="உங்கள்@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#003d7a] mb-1">கடவுச்சொல்</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full"
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button type="submit" disabled={isLoading} className="w-full bg-yellow-600 hover:bg-yellow-700 text-white">
                {isLoading ? "பதிவு செய்கிறது..." : "பிரீமியம் சந்தா தொடங்கு"}
              </Button>
            </form>
            <div className="mt-4 text-center text-sm">
              ஏற்கனவே கணக்கு உள்ளதா?{" "}
              <Link href="/auth/login" className="text-[#e60000] hover:underline font-semibold">
                உள்நுழைக
              </Link>
            </div>
            <div className="mt-2 text-center text-xs text-gray-500">
              பதிவு செய்வதன் மூலம், நீங்கள் எங்கள் சேவை விதிமுறைகளை ஏற்றுக்கொள்கிறீர்கள்
            </div>
            {error && error.includes('Network') && (
              <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded text-sm text-blue-800">
                <p className="font-semibold">வேறு வழி:</p>
                <p>இந்த சமயத்தில் சேவை கிடைக்கவில்லை. கீழே உள்ள விவரங்களை பயன்படுத்தி சந்தா பெறலாம்:</p>
                <ul className="mt-2 space-y-1">
                  <li>• மின்னஞ்சல்: subscribe@nambikkai.com</li>
                  <li>• தொலைபேசி: +91 9876543210</li>
                  <li>• WhatsApp: +91 9876543210</li>
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
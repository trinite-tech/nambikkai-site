"use client"

import type React from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

export default function OTPLoginPage() {
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  const sendOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: true,
        }
      })
      
      if (error) throw error
      
      setOtpSent(true)
      setSuccess("OTP அனுப்பப்பட்டது! உங்கள் மின்னஞ்சலை சரிபார்க்கவும்")
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "பிழை ஏற்பட்டது")
    } finally {
      setIsLoading(false)
    }
  }

  const verifyOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const supabase = createClient()
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: 'email'
      })
      
      if (error) throw error
      
      if (data.user) {
        router.push("/dashboard")
      }
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "தவறான OTP")
    } finally {
      setIsLoading(false)
    }
  }

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#003d7a] to-[#1d4e89] p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl">OTP உள்நுழைவு</CardTitle>
            <CardDescription>ஏற்றப்படுகிறது...</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="animate-pulse space-y-4">
              <div className="h-10 bg-gray-200 rounded"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#003d7a] to-[#1d4e89] p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">OTP உள்நுழைவு</CardTitle>
          <CardDescription>
            {!otpSent ? "மின்னஞ்சல் மூலம் OTP பெறவும்" : "OTP குறியீட்டை உள்ளிடவும்"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!otpSent ? (
            <form onSubmit={sendOTP} className="space-y-4">
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
              {error && <p className="text-sm text-red-500">{error}</p>}
              {success && <p className="text-sm text-green-500">{success}</p>}
              <Button 
                type="submit" 
                disabled={isLoading} 
                className="w-full bg-[#e60000] hover:bg-red-700 text-white"
              >
                {isLoading ? "அனுப்பப்படுகிறது..." : "OTP அனுப்பவும்"}
              </Button>
            </form>
          ) : (
            <form onSubmit={verifyOTP} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#003d7a] mb-1">
                  OTP குறியீடு ({email})
                </label>
                <Input
                  type="text"
                  placeholder="123456"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  maxLength={6}
                  className="w-full text-center text-lg tracking-widest"
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button 
                type="submit" 
                disabled={isLoading || otp.length !== 6} 
                className="w-full bg-[#e60000] hover:bg-red-700 text-white"
              >
                {isLoading ? "சரிபார்க்கப்படுகிறது..." : "OTP சரிபார்க்கவும்"}
              </Button>
              <Button 
                type="button" 
                variant="outline"
                onClick={() => {
                  setOtpSent(false)
                  setOtp("")
                  setError(null)
                  setSuccess(null)
                }}
                className="w-full"
              >
                மீண்டும் OTP அனுப்பவும்
              </Button>
            </form>
          )}
          
          <div className="mt-6 space-y-2 text-center text-sm">
            <Link href="/auth/login" className="text-[#e60000] hover:underline font-semibold block">
              கடவுச்சொல் மூலம் உள்நுழைக
            </Link>
            <Link href="/auth/signup" className="text-[#e60000] hover:underline font-semibold block">
              புதிய கணக்கு உருவாக்கவும்
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
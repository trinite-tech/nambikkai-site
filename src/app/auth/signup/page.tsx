"use client"

import type React from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { sendOTP, verifyOTP } from "@/lib/emailService"
import { Mail, Lock, User, CheckCircle, ArrowLeft, Sparkles, Eye, EyeOff } from "lucide-react"

export default function SignUpPage() {
  const [email, setEmail] = useState("")
  const [fullName, setFullName] = useState("")
  const [otp, setOtp] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState<'email' | 'otp' | 'password' | 'success'>('email')
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  const sendOTPCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const result = await sendOTP(email)
      
      if (result.success) {
        setStep('otp')
        setSuccess(`OTP அனுப்பப்பட்டது ${email} க்கு`)
      } else {
        setError(result.error || "OTP அனுப்புவதில் பிழை")
      }
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "பிழை ஏற்பட்டது")
    } finally {
      setIsLoading(false)
    }
  }

  const verifyOTPCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const result = await verifyOTP(email, otp)
      
      if (result.verified) {
        setStep('password')
        setSuccess("OTP சரிபார்க்கப்பட்டது!")
      } else {
        setError(result.error || "தவறான OTP")
      }
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "தவறான OTP")
    } finally {
      setIsLoading(false)
    }
  }

  const createAccount = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setError("கடவுச்சொற்கள் பொருந்தவில்லை")
      return
    }
    
    setIsLoading(true)
    setError(null)

    try {
      const supabase = createClient()
      const { data: user, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          emailRedirectTo: undefined,
          data: {
            full_name: fullName
          }
        }
      })

      if (user.user || !error) {
        setStep('success')
        setSuccess("கணக்கு வெற்றிகரமாக உருவாக்கப்பட்டது!")
        setTimeout(() => {
          router.push('/auth/login')
        }, 3000)
      } else {
        setError(error?.message || 'கணக்கு உருவாக்குவதில் பிழை')
      }
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "கணக்கு உருவாக்குவதில் பிழை")
    } finally {
      setIsLoading(false)
    }
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#003d7a] via-[#1d4e89] to-[#0056b3] flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-white/20 rounded-lg"></div>
              <div className="h-4 bg-white/20 rounded"></div>
              <div className="h-12 bg-white/20 rounded-xl"></div>
              <div className="h-12 bg-white/20 rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#003d7a] via-[#1d4e89] to-[#0056b3] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="w-full max-w-md relative z-10">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl mb-4 shadow-lg">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">நம்பிக்கை - சைன் அப்</h1>
            <p className="text-white/70">
              {step === 'email' && "உங்கள் விவரங்களை உள்ளிடவும்"}
              {step === 'otp' && "OTP குறியீட்டை சரிபார்க்கவும்"}
              {step === 'password' && "கடவுச்சொல்லை அமைக்கவும்"}
              {step === 'success' && "நம்பிக்கை செய்திகளுக்கு வரவேற்கிறோம்!"}
            </p>
          </div>

          {step === 'email' && (
            <form onSubmit={sendOTPCode} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white/90">முழு பெயர்</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="உங்கள் முழு பெயர்"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="pl-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-xl h-12 backdrop-blur-sm focus:bg-white/20 transition-all duration-200"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white/90">மின்னஞ்சல் முகவரி</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                  <Input
                    type="email"
                    placeholder="உங்கள்@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-xl h-12 backdrop-blur-sm focus:bg-white/20 transition-all duration-200"
                  />
                </div>
              </div>
              {error && (
                <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-3">
                  <p className="text-sm text-red-200">{error}</p>
                </div>
              )}
              <Button 
                type="submit" 
                disabled={isLoading} 
                className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white rounded-xl h-12 font-semibold shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    அனுப்பப்படுகிறது...
                  </div>
                ) : (
                  "OTP அனுப்பவும்"
                )}
              </Button>
            </form>
          )}

          {step === 'otp' && (
            <form onSubmit={verifyOTPCode} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white/90">OTP குறியீடு</label>
                <p className="text-sm text-white/60 mb-3">
                  {email} க்கு அனுப்பப்பட்ட 6 இலக்க குறியீட்டை உள்ளிடவும்
                </p>
                <Input
                  type="text"
                  placeholder="123456"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  required
                  maxLength={6}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-xl h-12 text-center text-lg tracking-widest font-mono backdrop-blur-sm focus:bg-white/20 transition-all duration-200"
                />
              </div>
              {error && (
                <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-3">
                  <p className="text-sm text-red-200">{error}</p>
                </div>
              )}
              {success && (
                <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-3">
                  <p className="text-sm text-green-200">{success}</p>
                </div>
              )}
              <Button 
                type="submit" 
                disabled={isLoading || otp.length !== 6} 
                className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white rounded-xl h-12 font-semibold shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:transform-none"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    சரிபார்க்கப்படுகிறது...
                  </div>
                ) : (
                  "OTP சரிபார்க்கவும்"
                )}
              </Button>
              <Button 
                type="button" 
                variant="outline"
                onClick={() => {
                  setStep('email')
                  setOtp("")
                  setError(null)
                  setSuccess(null)
                }}
                className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-xl h-12 backdrop-blur-sm transition-all duration-200"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                மின்னஞ்சல் மாற்றவும்
              </Button>
            </form>
          )}

          {step === 'password' && (
            <form onSubmit={createAccount} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white/90">கடவுச்சொல்</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="கடவுச்சொல்லை உள்ளிடவும்"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-12 pr-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-xl h-12 backdrop-blur-sm focus:bg-white/20 transition-all duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white/90">கடவுச்சொல்லை உறுதிப்படுத்தவும்</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="கடவுச்சொல்லை மீண்டும் உள்ளிடவும்"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="pl-12 pr-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-xl h-12 backdrop-blur-sm focus:bg-white/20 transition-all duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              {error && (
                <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-3">
                  <p className="text-sm text-red-200">{error}</p>
                </div>
              )}
              <Button 
                type="submit" 
                disabled={isLoading} 
                className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white rounded-xl h-12 font-semibold shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    கணக்கு உருவாக்கப்படுகிறது...
                  </div>
                ) : (
                  "கணக்கு உருவாக்கவும்"
                )}
              </Button>
            </form>
          )}

          {step === 'success' && (
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">நம்பிக்கை செய்திகளுக்கு வரவேற்கிறோம்!</h3>
                <p className="text-white/70 mb-2">
                  உங்கள் கணக்கு வெற்றிகரமாக உருவாக்கப்பட்டது.
                </p>
                <p className="text-white/60 text-sm">
                  உள்நுழைவு பக்கத்திற்கு திருப்பி விடப்படுகிறீர்கள்...
                </p>
              </div>
              <Button 
                onClick={() => router.push('/auth/login')}
                className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white rounded-xl h-12 font-semibold shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                உள்நுழைவு பக்கத்திற்கு செல்லவும்
              </Button>
            </div>
          )}
          
          {step !== 'success' && (
            <div className="mt-6 text-center text-sm">
              <span className="text-white/70">ஏற்கனவே கணக்கு உள்ளதா? </span>
              <Link href="/auth/login" className="text-orange-400 hover:text-orange-300 font-semibold transition-colors">
                உள்நுழைக
              </Link>
            </div>
          )}
        </div>
      </div>
      
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}

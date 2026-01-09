"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Eye, EyeOff, Mail, Lock, User, Sparkles } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [adminEmail, setAdminEmail] = useState("")
  const [adminPassword, setAdminPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showAdminPassword, setShowAdminPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleUserLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const supabase = createClient()
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      
      if (error) throw error
      
      if (data.user) {
        router.push("/")
      }
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "பிழை ஏற்பட்டது")
    } finally {
      setIsLoading(false)
    }
  }

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      if (adminEmail === "admin@nambikkai.com" && adminPassword === "admin123") {
        router.push("/admin")
      } else {
        throw new Error("தவறான நிர்வாக விவரங்கள்")
      }
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "பிழை ஏற்பட்டது")
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
            <h1 className="text-3xl font-bold text-white mb-2">நம்பிக்கை</h1>
            <p className="text-white/70">உங்கள் கணக்கிற்கு உள்நுழைக</p>
          </div>

          <Tabs defaultValue="user" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-1">
              <TabsTrigger 
                value="user" 
                className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-lg transition-all duration-200"
              >
                <User className="w-4 h-4 mr-2" />
                பயனர்
              </TabsTrigger>
              <TabsTrigger 
                value="admin" 
                className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-lg transition-all duration-200"
              >
                <Lock className="w-4 h-4 mr-2" />
                நிர்வாகம்
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="user" className="mt-6">
              <form onSubmit={handleUserLogin} className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-white/90">மின்னஞ்சல்</label>
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
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-white/90">கடவுச்சொல்</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
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
                      உள்நுழைவு...
                    </div>
                  ) : (
                    "உள்நுழைக"
                  )}
                </Button>
                <div className="text-center">
                  <Link href="/auth/otp" className="text-sm text-white/70 hover:text-white transition-colors">
                    OTP மூலம் உள்நுழைக
                  </Link>
                </div>
              </form>
              <div className="mt-6 text-center text-sm">
                <span className="text-white/70">கணக்கு இல்லையா? </span>
                <Link href="/auth/signup" className="text-orange-400 hover:text-orange-300 font-semibold transition-colors">
                  சைன் அப்
                </Link>
              </div>
            </TabsContent>
            
            <TabsContent value="admin" className="mt-6">
              <form onSubmit={handleAdminLogin} className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-white/90">நிர்வாக மின்னஞ்சல்</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                    <Input
                      type="email"
                      placeholder="admin@nambikkai.com"
                      value={adminEmail}
                      onChange={(e) => setAdminEmail(e.target.value)}
                      required
                      className="pl-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-xl h-12 backdrop-blur-sm focus:bg-white/20 transition-all duration-200"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-white/90">நிர்வாக கடவுச்சொல்</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                    <Input
                      type={showAdminPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      required
                      className="pl-12 pr-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-xl h-12 backdrop-blur-sm focus:bg-white/20 transition-all duration-200"
                    />
                    <button
                      type="button"
                      onClick={() => setShowAdminPassword(!showAdminPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                    >
                      {showAdminPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
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
                  className="w-full bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 text-white rounded-xl h-12 font-semibold shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      உள்நுழைவு...
                    </div>
                  ) : (
                    "நிர்வாக உள்நுழைவு"
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
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

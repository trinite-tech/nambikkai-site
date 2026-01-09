"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { User, CreditCard, Settings, HelpCircle, LogOut, Crown, Check } from "lucide-react"

interface Profile {
  id: string
  full_name: string | null
  username: string | null
  subscription_status: string
  subscription_end_date: string | null
}

interface Subscription {
  plan_type: string
  status: string
  end_date: string | null
}

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [dataLoading, setDataLoading] = useState(true)

  useEffect(() => {
    async function fetchUserData() {
      if (!user) {
        setDataLoading(false)
        return
      }

      const supabase = createClient()
      
      try {
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()

        if (profileError) {
          console.error('Error fetching profile:', profileError)
        } else {
          setProfile(profileData)
        }

        const { data: subscriptionData, error: subscriptionError } = await supabase
          .from('subscriptions')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(1)
          .single()

        if (subscriptionError) {
          setSubscription({
            plan_type: 'free',
            status: 'active',
            end_date: null
          })
        } else {
          setSubscription(subscriptionData)
        }
      } catch (error) {
        console.error('Error fetching user data:', error)
      } finally {
        setDataLoading(false)
      }
    }

    fetchUserData()
  }, [user])

  if (loading || dataLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#003d7a] via-[#1d4e89] to-[#0056b3] flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-white">தரவு ஏற்றப்படுகிறது...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#003d7a] via-[#1d4e89] to-[#0056b3] flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">உள்நுழைவு தேவை</h2>
          <p className="text-white/70 mb-6">இந்த பக்கத்தை அணுக உள்நுழைய வேண்டும்</p>
          <Link href="/auth/login">
            <Button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white rounded-xl px-6 py-3">
              உள்நுழைய
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#003d7a] via-[#1d4e89] to-[#0056b3] relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-black text-white mb-2">உங்கள் கணக்கு</h1>
          <p className="text-white/70">உங்கள் சந்தாவை நிர்வகிக்கவும் மற்றும் விதிமுறைகளை மாற்றவும்</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Card */}
            <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <User className="w-5 h-5" />
                  சுயவிவரம்
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-white/70">மின்னஞ்சல்</label>
                  <p className="text-lg text-white">{user.email}</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-white/70">பெயர்</label>
                  <p className="text-lg text-white">{profile?.full_name || profile?.username || "பெயர் அமைக்கப்படவில்லை"}</p>
                </div>
              </CardContent>
            </Card>

            {/* Subscription Card */}
            <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  சந்தா விவரங்கள்
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-semibold text-white/70">திட்டம்</label>
                    <p className="text-lg font-bold text-orange-400 capitalize flex items-center gap-2">
                      {subscription?.plan_type === 'premium' && <Crown className="w-5 h-5" />}
                      {subscription?.plan_type || "free"}
                    </p>
                  </div>
                  <div className={`px-4 py-2 rounded-xl font-semibold ${
                    subscription?.status === "active" 
                      ? "bg-green-500/20 text-green-300 border border-green-500/30" 
                      : "bg-red-500/20 text-red-300 border border-red-500/30"
                  }`}>
                    {subscription?.status === "active" ? "செயல்படிக்கிறது" : "செயல்பட வில்லை"}
                  </div>
                </div>

                {subscription?.end_date && (
                  <div>
                    <label className="text-sm font-semibold text-white/70">அடுத்த பில்லிங் தேதி</label>
                    <p className="text-lg text-white">
                      {new Date(subscription.end_date).toLocaleDateString("ta-IN")}
                    </p>
                  </div>
                )}

                {subscription?.plan_type === "free" && (
                  <Link href="/pricing">
                    <Button className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white rounded-xl h-12 font-semibold shadow-lg transform hover:scale-105 transition-all duration-200 mt-4">
                      <Crown className="w-4 h-4 mr-2" />
                      பிரீமியம்க்கு புரதி செய்யவும்
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>

            {/* Benefits Card */}
            {subscription?.plan_type !== "free" && (
              <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Crown className="w-5 h-5 text-orange-400" />
                    பிரீமியம் பயன்
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-white">அனைத்து செய்திகள் வரம்பு இல்லாமல்</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-white">விளம்பரங்கள் இல்லை</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-white">ஆரம்ப வெளியீடு அணுக</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-white">கட்டுரை சேமிக்கவும் மற்றும் பகிரவும்</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-lg border-orange-400/50 border-2 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center gap-2">
                  <HelpCircle className="w-5 h-5" />
                  தேவை உதவி?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-white/70">
                  உங்களுக்கு ஏதேனும் கேள்விகள் அல்லது சிக்கல்கள் இருந்தால், எங்கள் ஆதரவு குழுவிற்கு தொடர்பு கொள்ளவும்.
                </p>
                <Button className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white rounded-xl h-12 font-semibold shadow-lg transform hover:scale-105 transition-all duration-200">
                  தொடர்புக்கு
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  செயல்கள்
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/pricing" className="block">
                  <Button variant="outline" className="w-full justify-start text-left bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-xl h-12">
                    <CreditCard className="w-4 h-4 mr-2" />
                    திட்ட மாற்றவும்
                  </Button>
                </Link>
                <Link href="/" className="block">
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left bg-red-500/20 border-red-500/30 text-red-300 hover:bg-red-500/30 rounded-xl h-12"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    வெளியே செல்லவும்
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
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
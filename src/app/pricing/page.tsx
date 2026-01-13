"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PRODUCTS } from "@/lib/products"
import Link from "next/link"
import { Crown, Check, Star } from "lucide-react"

export default function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#003d7a] via-[#1d4e89] to-[#0056b3] relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-40 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl mb-6 shadow-2xl">
            <Crown className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-black text-white mb-6">பிரீமியம் சந்தா திட்டங்கள்</h1>
          <p className="text-white/80 text-xl max-w-3xl mx-auto mb-8">
            உங்கள் செய்தி அனுபவத்தை மேம்படுத்தவும் பிரீமியம் அம்சங்களுக்கு அணுகல் பெறவும்
          </p>
          <div className="flex items-center justify-center gap-6 text-white/70">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span>விளம்பரங்கள் இல்லை</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span>வரம்பில்லா செய்திகள்</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span>ஆரம்ப அணுகல்</span>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {PRODUCTS.map((product) => (
            <Card
              key={product.id}
              className={`relative bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl ${
                product.id === "premium-yearly" ? "border-orange-400/50 border-2 md:scale-105 bg-gradient-to-br from-orange-500/10 to-red-600/10" : ""
              }`}
            >
              {product.id === "premium-yearly" && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                  <Star className="w-4 h-4 inline mr-1" />
                  சிறந்த மதிப்பு
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl text-[#003d7a] flex items-center gap-2">
                  {product.id !== "free" && <Crown className="w-6 h-6 text-orange-500" />}
                  {product.name}
                </CardTitle>
                <CardDescription className="text-gray-600">{product.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <span className="text-4xl font-black text-[#e60000]">
                    {product.priceInCents === 0 ? "₹0" : `₹${(product.priceInCents / 100).toLocaleString("ta-IN")}`}
                  </span>
                  {product.priceInCents > 0 && (
                    <span className="text-gray-600 ml-2">{product.id === "premium-monthly" ? "/மாதம்" : "/ஆண்டு"}</span>
                  )}
                </div>

                <div className="space-y-3">
                  {product.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-green-500 flex-shrink-0 mt-0.5 flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {product.id === "free" ? (
                  <Link href="/auth/signup">
                    <Button className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white rounded-xl h-12 font-semibold shadow-lg transform hover:scale-105 transition-all duration-200">
                      இப்போது தொடங்கவும்
                    </Button>
                  </Link>
                ) : (
                  <Button
                    onClick={() => setSelectedPlan(product.id)}
                    className={`w-full rounded-xl h-12 font-semibold shadow-lg transform hover:scale-105 transition-all duration-200 ${
                      selectedPlan === product.id 
                        ? "bg-green-500 hover:bg-green-600 text-white" 
                        : "bg-[#003d7a] hover:bg-blue-900 text-white"
                    }`}
                  >
                    {selectedPlan === product.id ? (
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4" />
                        தேர்ந்தெடுக்கப்பட்டது
                      </div>
                    ) : (
                      "தேர்ந்தெடுக்கவும்"
                    )}
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedPlan && selectedPlan !== "free" && (
          <div className="bg-gradient-to-r from-[#003d7a] via-[#1d4e89] to-[#0056b3] rounded-3xl p-8 text-white text-center mb-12 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-600/10"></div>
            <div className="relative z-10">
              <Crown className="w-12 h-12 text-orange-400 mx-auto mb-4" />
              <p className="text-2xl font-bold mb-6">
                {selectedPlan === "premium-monthly" ? "மாதாந்திர பிரீமியம் சந்தாவை தொடங்கவும்" : "வருடாந்திர பிரீமியம் சந்தாவை தொடங்கவும்"}
              </p>
              <Link href={`/checkout?plan=${selectedPlan}`}>
                <Button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-8 py-4 text-lg rounded-xl font-semibold shadow-lg transform hover:scale-105 transition-all duration-200">
                  செலுத்த முன்னேற
                </Button>
              </Link>
            </div>
          </div>
        )}
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
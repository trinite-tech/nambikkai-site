export interface Product {
  id: string
  name: string
  description: string
  priceInCents: number
  features: string[]
}

export const PRODUCTS: Product[] = [
  {
    id: "free",
    name: "இலவசம்",
    description: "அடிப்படை செய்திகள்",
    priceInCents: 0,
    features: ["தினசரி செய்திகள்", "மூல செய்திகள் முதல் 5", "விளம்பரங்கள் கொண்ட"],
  },
  {
    id: "premium-monthly",
    name: "பிரீமியம்",
    description: "மாதத்திற்கு சந்தா",
    priceInCents: 99900, // $999/month
    features: [
      "அனைத்து செய்திகள் வரம்பு இல்லாமல்",
      "விளம்பரங்கள் இல்லை",
      "ஆரம்ப வெளியீடு அணுக",
      "7 நாட்களுக்கு வரலாறு",
      "கட்டுரை சேமிக்க",
    ],
  },
  {
    id: "premium-yearly",
    name: "பிரீமியம் வருடம்",
    description: "ஆண்டிற்கு சந்தா",
    priceInCents: 89900, // $899/year (save $100)
    features: [
      "அனைத்து செய்திகள் வரம்பு இல்லாமல்",
      "விளம்பரங்கள் இல்லை",
      "ஆரம்ப வெளியீடு அணுக",
      "30 நாட்களுக்கு வரலாறு",
      "কাস্টম সতর্কতা",
      "অগ্রাধিকার সমর্থন",
    ],
  },
]

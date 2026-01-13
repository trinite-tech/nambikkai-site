import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function SignUpSuccessPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#003d7a] to-[#1d4e89] p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">வரவேற்கிறோம்!</CardTitle>
          <CardDescription>உங்கள் மின்னஞ்சல் உறுதிப்படுத்தவும்</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600">
            நீங்கள் வெற்றிகரமாக பதிவு செய்துள்ளீர்கள். உங்கள் கணக்கை உறுதிப்படுத்த உங்கள் மின்னஞ்சல் சரிபார்க்கவும்.
          </p>
          <Link
            href="/auth/login"
            className="inline-block w-full text-center bg-[#e60000] hover:bg-red-700 text-white py-2 rounded font-semibold"
          >
            உள்நுழைக
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}

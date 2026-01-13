import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-8">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">404</h2>
        <h3 className="text-2xl font-bold text-red-600 mb-4">பக்கம் கிடைக்கவில்லை</h3>
        <p className="text-gray-600 mb-6">நீங்கள் தேடும் பக்கம் இல்லை அல்லது நகர்த்தப்பட்டுள்ளது</p>
        <Link href="/" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 inline-block">
          முகப்புக்கு செல்லவும்
        </Link>
      </div>
    </div>
  )
}
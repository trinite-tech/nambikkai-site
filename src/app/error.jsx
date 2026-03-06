'use client'

import Link from 'next/link'

export default function Error({ error, reset }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold text-red-600 mb-4">ஏதோ தவறு நடந்துள்ளது!</h2>
        <p className="text-gray-600 mb-6">பக்கத்தை ஏற்ற முடியவில்லை</p>
        <div className="space-x-4">
          <button
            onClick={() => reset()}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            மீண்டும் முயற்சிக்கவும்
          </button>
          <Link href="/" className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700 inline-block">
            முகப்புக்கு செல்லவும்
            #nambikkai_testin
          </Link>
        </div>
      </div>
    </div>
  )
}
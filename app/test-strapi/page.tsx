"use client"

import { useEffect, useState } from 'react'
import { testStrapiConnection } from '@/lib/test-strapi'

export default function TestStrapiPage() {
  const [results, setResults] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function runTest() {
      try {
        const testResults = await testStrapiConnection()
        setResults(testResults)
      } catch (error) {
        setResults({ 
          connection: false, 
          errors: [`Test failed: ${error}`],
          articles: 0,
          categories: 0,
          images: 0
        })
      } finally {
        setLoading(false)
      }
    }
    runTest()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003d7a] mx-auto mb-4"></div>
          <p className="text-[#003d7a]">Testing Strapi Connection...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-[#003d7a] mb-8">Strapi CMS Connection Test</h1>
        
        <div className={`p-6 rounded-lg mb-6 ${results?.connection ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500'} border-2`}>
          <h2 className="text-xl font-bold mb-2">
            {results?.connection ? '✅ Connection Successful' : '❌ Connection Failed'}
          </h2>
          <p className="text-gray-700">
            Strapi URL: <code className="bg-gray-200 px-2 py-1 rounded">http://13.200.250.14:1338</code>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-[#003d7a] mb-2">Articles</h3>
            <p className="text-3xl font-bold text-green-600">{results?.articles || 0}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-[#003d7a] mb-2">Categories</h3>
            <p className="text-3xl font-bold text-blue-600">{results?.categories || 0}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-[#003d7a] mb-2">Images</h3>
            <p className="text-3xl font-bold text-purple-600">{results?.images || 0}</p>
          </div>
        </div>

        {results?.errors && results.errors.length > 0 && (
          <div className="bg-red-50 border border-red-200 p-6 rounded-lg mb-6">
            <h3 className="text-lg font-semibold text-red-800 mb-3">Errors:</h3>
            <ul className="list-disc list-inside space-y-1">
              {results.errors.map((error: string, index: number) => (
                <li key={index} className="text-red-700">{error}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-8 flex gap-4">
          <button
            onClick={() => window.location.reload()}
            className="bg-[#003d7a] text-white px-6 py-2 rounded hover:bg-blue-800 transition"
          >
            Refresh Test
          </button>
          <a
            href="/"
            className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  )
}
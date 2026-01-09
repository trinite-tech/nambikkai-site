'use client'

import { useEffect, useState } from 'react'
import { getNews } from '@/lib/api'

export default function TestPage() {
  const [status, setStatus] = useState('Testing connection...')
  const [articles, setArticles] = useState([])

  useEffect(() => {
    async function test() {
      try {
        const result = await getNews()
        if (result.data && result.data.length > 0) {
          setStatus(`✅ Connected! Found ${result.data.length} articles`)
          setArticles(result.data)
        } else {
          setStatus('❌ Connected but no articles found')
        }
      } catch (error) {
        setStatus(`❌ Connection failed: ${error.message}`)
      }
    }
    test()
  }, [])

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Strapi Connection Test</h1>
      <p className="mb-4">{status}</p>
      
      {articles.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Articles from Strapi:</h2>
          {articles.map((article, index) => (
            <div key={index} className="border p-4 mb-2 rounded">
              <h3 className="font-bold">{article.title}</h3>
              <p className="text-gray-600">{article.excerpt}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
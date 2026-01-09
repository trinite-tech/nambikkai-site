'use client'

import { useEffect, useState } from 'react'
import { getNews, formatArticle } from "@/lib/api"
import { sampleArticles } from "@/lib/sample-data"
import { NewsArticleCard } from "@/components/news-article-card"
import { StyleTest } from "@/components/style-test"

interface Article {
  id?: string;
  documentId?: string;
  title?: string;
  excerpt?: string;
  content?: string;
  image?: string;
  category?: string;
  author?: string;
  date?: string;
  readTime?: string;
  slug?: string;
  [key: string]: any;
}

type DynamicHomepageProps = {
  data?: any;
};

export function DynamicHomepage({ data }: DynamicHomepageProps) {
  const [articles, setArticles] = useState<Article[]>(sampleArticles)
  const [loading, setLoading] = useState(true)
  const [usingStrapi, setUsingStrapi] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState('Checking...')

  useEffect(() => {
    async function loadArticles() {
      try {
        setConnectionStatus('Connecting to Strapi...')
        console.log('🔄 Attempting to connect to Strapi CMS...')
        
        const result = await getNews()
        
        if (result.connected) {
          if (result.isEmpty) {
            console.log('⚠️ Strapi connected but database is empty')
            setConnectionStatus('Connected to Strapi but no articles found - using sample data')
            setUsingStrapi(false)
          } else if (result.data?.length > 0) {
            console.log('✅ Strapi connection successful!')
            const formattedArticles = result.data.map(formatArticle)
            setArticles(formattedArticles)
            setUsingStrapi(true)
            setConnectionStatus(`Connected - ${result.data.length} articles loaded from Strapi`)
          } else {
            console.log('⚠️ Strapi connected but returned no data')
            setConnectionStatus('Connected to Strapi but no data returned - using sample data')
            setUsingStrapi(false)
          }
        } else {
          console.log('❌ Strapi connection failed:', result.error)
          setConnectionStatus(`Connection failed: ${result.error || 'Unknown error'} - using sample data`)
          setUsingStrapi(false)
        }
      } catch (error) {
        console.log('❌ Unexpected error:', error)
        setConnectionStatus('Unexpected error - using sample articles')
        setUsingStrapi(false)
      } finally {
        setLoading(false)
      }
    }

    loadArticles()
  }, [])

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-700">🔄 {connectionStatus}</p>
        </div>
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-gray-200 h-32 rounded-lg"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <main>
      <h1>{data?.attributes?.title}</h1>
      <p>{data?.attributes?.description}</p>
      
      <div className="space-y-8">
        {/* Style Test - Remove this after confirming styles work */}
        <StyleTest />
        
        {/* Connection Status */}
        <div className={`border rounded-lg p-4 ${
          usingStrapi 
            ? 'bg-green-50 border-green-200' 
            : 'bg-blue-50 border-blue-200'
        }`}>
          <p className={`text-sm ${
            usingStrapi 
              ? 'text-green-700' 
              : 'text-blue-700'
          }`}>
            {usingStrapi ? (
              <>✅ {connectionStatus}</>
            ) : (
              <>📊 {connectionStatus}</>
            )}
          </p>
          {!usingStrapi && (
            <p className="text-xs text-blue-600 mt-1">
              Strapi server is running but database is empty. Add articles in Strapi admin or visit <a href="/test-strapi" className="underline">/test-strapi</a> for diagnostics
            </p>
          )}
        </div>

        {/* Featured Article */}
        {articles.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-black text-[#003d7a] mb-6 pb-4 border-b-4 border-[#e60000]">
              முக்கிய செய்தி
            </h2>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <NewsArticleCard article={articles[0]} featured={true} />
            </div>
          </div>
        )}

        {/* Latest News */}
        <div className="mb-8">
          <h2 className="text-2xl font-black text-[#003d7a] mb-6 pb-4 border-b-4 border-[#e60000]">
            சமீபத்திய செய்திகள்
          </h2>

          {articles.length > 1 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {articles.slice(1, 7).map((article: Article, index: number) => (
                <div key={article.id || article.documentId || `article-${index}`} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <NewsArticleCard article={article} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg">
              <p className="text-gray-500">செய்திகள் காணப்படவில்லை</p>
            </div>
          )}
        </div>

        {/* More News */}
        {articles.length > 7 && (
          <div className="mb-8">
            <h2 className="text-xl font-black text-[#003d7a] mb-6 pb-4 border-b-4 border-[#e60000]">
              மேலும் செய்திகள்
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {articles.slice(7).map((article: Article, index: number) => (
                <div key={article.id || article.documentId || `more-article-${index}`} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <NewsArticleCard article={article} compact={true} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
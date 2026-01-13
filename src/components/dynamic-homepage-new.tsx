'use client'

import { useEffect, useState } from 'react'
import { getNews, formatArticle } from "@/lib/api"
import { sampleArticles } from "@/lib/sample-data"
import { NewsArticleCard } from "@/components/news-article-card"
import { ConnectionStatus } from "@/components/connection-status"

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
  const [showConnectionStatus, setShowConnectionStatus] = useState(false)

  useEffect(() => {
    async function loadArticles() {
      try {
        const result = await getNews()
        
        if (result.connected) {
          if (result.data?.length > 0) {
            const formattedArticles = result.data.map(formatArticle)
            setArticles(formattedArticles)
            setUsingStrapi(true)
          } else {
            setUsingStrapi(false)
          }
        } else {
          setUsingStrapi(false)
        }
        
        setShowConnectionStatus(true)
      } catch (error) {
        setUsingStrapi(false)
        setShowConnectionStatus(true)
      } finally {
        setLoading(false)
      }
    }

    loadArticles()
  }, [])

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-gray-200 h-32 rounded-lg"></div>
        ))}
      </div>
    )
  }

  return (
    <main>
      <h1>{data?.attributes?.title}</h1>
      <p>{data?.attributes?.description}</p>
      
      {/* Connection Status Popup */}
      {showConnectionStatus && (
        <ConnectionStatus 
          isConnected={usingStrapi} 
          onClose={() => setShowConnectionStatus(false)}
        />
      )}
      
      <div className="space-y-8">
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
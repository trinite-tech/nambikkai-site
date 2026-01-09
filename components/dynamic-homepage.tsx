"use client"

import { useState, useEffect } from 'react'
import { ArticleCard } from './article-card'
import { SidebarWidget } from './sidebar-widget'
import { getNews, formatArticle } from '@/lib/api'
import { sampleArticles } from '@/lib/sample-data'

export function DynamicHomepage() {
  const [articles, setArticles] = useState(sampleArticles)
  const [loading, setLoading] = useState(true)
  const [usingStrapi, setUsingStrapi] = useState(false)

  useEffect(() => {
    async function loadArticles() {
      try {
        const response = await getNews()
        const strapiArticles = response.data || []
        
        if (strapiArticles.length > 0) {
          const formattedArticles = strapiArticles.map(formatArticle)
          setArticles(formattedArticles)
          setUsingStrapi(true)
          console.log('✅ Loaded articles from Strapi:', formattedArticles.length)
        } else {
          console.log('📄 Using sample data - no Strapi articles found')
        }
      } catch (error) {
        console.log('📄 Using sample data - Strapi connection failed')
      } finally {
        setLoading(false)
      }
    }

    loadArticles()
  }, [])

  const featuredArticle = articles[0]
  const latestArticles = articles.slice(1, 5)
  const trendingArticles = articles.slice(0, 5).map((a: any) => ({
    label: a.title,
    href: `/article/${a.slug || a.id}`
  }))

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-64 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      {/* Status indicator */}
      <div className="mb-4 p-3 rounded-lg bg-blue-50 border border-blue-200">
        <p className="text-sm text-blue-700">
          {usingStrapi ? (
            <>✅ Connected to Strapi CMS - Showing {articles.length} articles</>
          ) : (
            <>📄 Using sample data - Start Strapi to see dynamic content</>
          )}
        </p>
      </div>

      {/* Featured Section */}
      <section className="mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-black text-[#003d7a] mb-6 flex items-center gap-2 pb-4 border-b-4 border-[#e60000]">
              முக்கிய செய்திகள்
            </h2>
            <ArticleCard {...featuredArticle} featured />
          </div>
          <SidebarWidget 
            title="பிரபலமான செய்திகள்" 
            type="trending" 
            items={trendingArticles} 
          />
        </div>
      </section>

      {/* Latest News Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-black text-[#003d7a] mb-6 flex items-center gap-2 pb-4 border-b-4 border-[#e60000]">
          சமீபத்திய செய்திகள்
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {latestArticles.map((article) => (
            <ArticleCard key={article.id} {...article} />
          ))}
        </div>
      </section>

      {/* Category Sections */}
      <section className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          {["இந்தியா", "விளையாட்டு", "தொழில்நுட்பம்"].map((catName) => {
            const categoryArticles = articles.filter(article => 
              article.category === catName
            ).slice(0, 2)
            
            const displayArticles = categoryArticles.length > 0 
              ? categoryArticles 
              : articles.slice(0, 2)
            
            return (
              <div key={catName} className="mb-12">
                <div className="flex items-center justify-between mb-6 pb-4 border-b-4 border-[#e60000]">
                  <h3 className="text-xl font-black text-[#003d7a]">{catName}</h3>
                  <a href={`/category/${catName.toLowerCase()}`} className="text-[#e60000] font-bold hover:underline text-sm">
                    மேலும் பார்க்க →
                  </a>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {displayArticles.map((article: any) => (
                    <ArticleCard key={article.id || article.slug} {...article} />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </main>
  )
}
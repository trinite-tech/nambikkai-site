import { getNews, formatArticle } from '@/lib/api'
import { NewsArticleCard } from '@/components/news-article-card'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default async function NewsPage() {
  let articles: any[] = []
  
  try {
    const posts = await getNews()
    if (posts.data?.length > 0) {
      articles = posts.data.map(formatArticle)
    }
  } catch {}
  
  if (articles.length === 0) {
    const { sampleArticles } = await import('@/lib/sample-data')
    articles = sampleArticles
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            முகப்புக்கு திரும்பு
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">செய்திகள்</h1>
        </div>
      </div>

      {/* Articles */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <div key={article.id || index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <NewsArticleCard article={article} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">செய்திகள் காணப்படவில்லை</p>
          </div>
        )}
      </div>
    </div>
  )
}
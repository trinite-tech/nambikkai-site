import { getArticlesByCategory, formatArticle } from '@/lib/api'
import { NewsArticleCard } from '@/components/news-article-card'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export async function generateStaticParams() {
  return [
    { slug: 'world' },
    { slug: 'india' },
    { slug: 'tamilnadu' },
    { slug: 'sports' },
    { slug: 'tech' },
    { slug: 'business' },
    { slug: 'cinema' }
  ]
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  let articles: any[] = []
  let categoryName = ''

  try {
    const response = await getArticlesByCategory(params.slug)
    if (response.data && response.data.length > 0) {
      articles = response.data.map(formatArticle)
      categoryName = articles[0]?.category || params.slug
    }
  } catch {}
  
  if (articles.length === 0) {
    const { sampleArticles } = await import('@/lib/sample-data')
    const categoryMap: { [key: string]: string } = {
      'world': 'உலகம்',
      'india': 'இந்தியா', 
      'tamilnadu': 'தமிழ்நாடு',
      'sports': 'விளையாட்டு',
      'tech': 'தொழில்நுட்பம்',
      'business': 'வணிகம்',
      'cinema': 'பொழுதுபோக்கு'
    }
    categoryName = categoryMap[params.slug] || params.slug
    articles = sampleArticles.filter(article => 
      article.category === categoryName
    )
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
          <h1 className="text-3xl font-bold text-gray-900">
            {categoryName || params.slug} செய்திகள்
          </h1>
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
            <p className="text-gray-500 text-lg">இந்த பிரிவில் செய்திகள் இல்லை</p>
          </div>
        )}
      </div>
    </div>
  )
}
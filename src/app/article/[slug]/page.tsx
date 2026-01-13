import type { Article } from '@/lib/types'
import { getArticle, formatArticle, getNews } from '@/lib/api'
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export async function generateStaticParams() {
  try {
    const response = await getNews()
    if (response.data?.length > 0) {
      return response.data.map((article: any) => ({
        slug: article.slug || article.documentId || article.id?.toString() || 'default'
      }))
    }
  } catch {}
  
  return [
    { slug: '1' },
    { slug: '2' },
    { slug: '3' },
    { slug: '4' },
    { slug: '5' },
    { slug: '6' },
    { slug: '7' },
    { slug: 'default' }
  ]
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  let article: Article | null = null

  
  try {
    const response = await getArticle(params.slug)
    if (response.data && response.data.length > 0) {
      article = formatArticle(response.data[0])
    }
  } catch {}
  
  if (!article) {
    const { sampleArticles } = await import('@/lib/sample-data')
    const foundArticle = sampleArticles.find(a => a.id === params.slug)
    article = foundArticle || sampleArticles[parseInt(params.slug) - 1] || sampleArticles[0]
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">கட்டுரை கிடைக்கவில்லை</h1>
          <Link href="/" className="text-blue-600 hover:underline">
            முகப்புக்கு திரும்பு
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            முகப்புக்கு திரும்பு
          </Link>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 py-8">
        {/* Category Badge */}
        <div className="mb-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
            <Tag className="w-4 h-4 mr-1" />
            {article.category}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
          {article.title}
        </h1>

        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-gray-600">
          <div className="flex items-center">
            <User className="w-4 h-4 mr-1" />
            <span>{article.author}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{article.date}</span>
          </div>
        </div>

        {/* Featured Image */}
        {article.image && article.image !== '/placeholder.jpg' && (
          <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
            <Image
              src={article.image}
              alt={article.imageAlt || article.title}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        )}

        {/* Excerpt */}
        {article.excerpt && (
          <div className="text-lg text-gray-700 mb-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
            {article.excerpt}
          </div>
        )}

        {/* Content */}
        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </article>
    </div>
  )
}
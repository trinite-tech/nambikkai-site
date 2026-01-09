import Link from 'next/link'
import Image from 'next/image'
import { getStrapiMediaUrl } from '@/lib/strapi'

export default function ArticleCard({ article, featured = false }) {
  const imageUrl = getStrapiMediaUrl(article.featuredImage)
  
  return (
    <Link href={`/article/${article.slug}`}>
      <article className={`bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow ${featured ? 'lg:flex' : ''}`}>
        <div className={`relative ${featured ? 'lg:w-1/2' : 'w-full h-48'}`}>
          <Image
            src={imageUrl}
            alt={article.featuredImage?.alternativeText || article.title}
            fill
            className="object-cover"
          />
        </div>
        <div className={`p-6 ${featured ? 'lg:w-1/2' : ''}`}>
          {article.category && (
            <span className="inline-block bg-[#e60000] text-white px-3 py-1 rounded-full text-sm font-bold mb-3">
              {article.category.name}
            </span>
          )}
          <h2 className={`font-bold text-[#003d7a] mb-3 line-clamp-2 ${featured ? 'text-2xl' : 'text-lg'}`}>
            {article.title}
          </h2>
          <p className="text-gray-600 line-clamp-3 mb-4">
            {article.excerpt}
          </p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>{article.author?.name}</span>
            <span>{new Date(article.publishedAt).toLocaleDateString('ta-IN')}</span>
          </div>
        </div>
      </article>
    </Link>
  )
}
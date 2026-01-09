import Image from "next/image"
import Link from "next/link"
import { formatArticle } from "@/lib/api"

interface NewsArticleCardProps {
  article: any
  featured?: boolean
  compact?: boolean
}

export function NewsArticleCard({ article, featured = false, compact = false }: NewsArticleCardProps) {
  // Handle both Strapi and sample data formats
  let formattedArticle
  
  if (article.documentId || (article.featuredImage && article.publishedAt)) {
    // This is Strapi data
    formattedArticle = formatArticle(article)
  } else {
    // This is sample data, use as-is
    formattedArticle = {
      id: article.id || article.documentId,
      title: article.title,
      excerpt: article.excerpt,
      content: article.content,
      slug: article.slug || article.id || article.documentId,
      category: article.category,
      author: article.author,
      date: article.date,
      image: article.image || article.featuredImage || '/placeholder.jpg',
      imageAlt: article.title
    }
  }
  
  // Ensure image path is valid
  if (!formattedArticle.image || formattedArticle.image === '') {
    formattedArticle.image = '/placeholder.jpg'
  }

  // Create proper article URL
  const articleUrl = `/article/${formattedArticle.slug || formattedArticle.id}`

  return (
    <Link href={articleUrl} className="group">
      <div className={`bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow ${
        featured ? 'md:flex' : ''
      }`}>
        {/* Featured Image */}
        <div className={`relative bg-gray-200 ${
          featured 
            ? 'w-full md:w-1/2 h-48 md:h-64' 
            : compact 
              ? 'w-full h-32' 
              : 'w-full h-40 sm:h-48'
        }`}>
          <Image
            src={formattedArticle.image}
            alt={formattedArticle.imageAlt || formattedArticle.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            unoptimized
          />
          <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
            <span className="bg-[#e60000] text-white px-2 py-1 rounded text-xs font-bold">
              {formattedArticle.category}
            </span>
          </div>
        </div>
        
        {/* Content */}
        <div className={`p-3 sm:p-4 ${
          featured ? 'md:w-1/2 md:flex md:flex-col md:justify-center' : ''
        }`}>
          <h3 className={`font-bold text-[#003d7a] mb-2 group-hover:text-[#e60000] transition-colors ${
            featured 
              ? 'text-xl md:text-2xl line-clamp-3' 
              : compact 
                ? 'text-sm line-clamp-2' 
                : 'text-base sm:text-lg line-clamp-2'
          }`}>
            {formattedArticle.title}
          </h3>
          <p className={`text-gray-600 mb-3 ${
            featured 
              ? 'text-base line-clamp-4' 
              : compact 
                ? 'text-xs line-clamp-2' 
                : 'text-sm line-clamp-2 sm:line-clamp-3'
          }`}>
            {formattedArticle.excerpt}
          </p>
          
          {/* Meta Info */}
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span className="truncate mr-2">{formattedArticle.author}</span>
            <span className="whitespace-nowrap">{formattedArticle.date}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
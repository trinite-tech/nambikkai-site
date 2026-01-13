"use client"

import Link from "next/link"
import { Clock, User } from "lucide-react"
import Image from "next/image"

interface ArticleCardProps {
  id: string
  title: string
  excerpt: string
  image: string
  category: string
  author: string
  date: string
  featured?: boolean
}

export function ArticleCard({ id, title, excerpt, image, category, author, date, featured = false }: ArticleCardProps) {
  if (featured) {
    return (
      <Link href={`/article/${id}`}>
        <div className="group cursor-pointer h-full">
          <div className="relative w-full aspect-video overflow-hidden rounded-sm">
            <Image
              src={image || "/placeholder.svg?height=400&width=600&query=Tamil news featured"}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <span className="inline-block bg-[#e60000] px-3 py-1 rounded text-xs font-bold mb-2">{category}</span>
              <h3 className="text-2xl font-bold leading-tight">{title}</h3>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <p className="text-gray-600 text-sm line-clamp-2">{excerpt}</p>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <User size={14} />
                {author}
              </div>
              <div className="flex items-center gap-1">
                <Clock size={14} />
                {date}
              </div>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link href={`/article/${id}`}>
      <div className="group cursor-pointer border border-gray-200 rounded-sm overflow-hidden hover:shadow-lg transition duration-300 h-full flex flex-col">
        <div className="relative w-full aspect-video overflow-hidden bg-gray-200">
          <Image
            src={image || "/placeholder.svg?height=300&width=400&query=Tamil news article"}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition duration-300"
          />
        </div>
        <div className="p-4 flex flex-col flex-1">
          <span className="inline-block bg-[#e60000] text-white px-2 py-1 rounded text-xs font-bold mb-2 w-fit">
            {category}
          </span>
          <h3 className="font-bold text-[#003d7a] group-hover:text-[#e60000] transition mb-2 line-clamp-2">{title}</h3>
          <p className="text-gray-600 text-sm line-clamp-2 flex-1">{excerpt}</p>
          <div className="flex items-center gap-3 text-xs text-gray-500 mt-3 pt-3 border-t border-gray-200">
            <div className="flex items-center gap-1">
              <User size={14} />
              {author}
            </div>
            <div className="flex items-center gap-1">
              <Clock size={14} />
              {date}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

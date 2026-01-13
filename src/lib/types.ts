// lib/types.ts
interface HomepageData {
  title: string
  description: string
}

export interface Article {
  id: string
  title: string
  excerpt: string
  content: string
  slug: string
  category: string
  categorySlug: string
  author: string
  date: string
  readTime: string
  image: string
  imageAlt: string   // 👈 IMPORTANT (optional)
}
export interface Category {
  id: string    
  name: string
  slug: string
}
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL_PROD || process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN

// Fallback URLs to try
const FALLBACK_URLS = [
  process.env.NEXT_PUBLIC_STRAPI_URL,
  'https://strapi-nambikkai.herokuapp.com'
].filter(Boolean)

// Debug logging for server-side only
if (typeof window === 'undefined') {
  console.log('🔑 API Token Status:', {
    exists: !!STRAPI_TOKEN,
    length: STRAPI_TOKEN?.length || 0,
    first10: STRAPI_TOKEN?.substring(0, 10) + '...' || 'none'
  })
}

// Helper function to make API requests with fallback
async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(STRAPI_TOKEN && { Authorization: `Bearer ${STRAPI_TOKEN}` }),
    },
    timeout: 10000, // 10 second timeout
    ...options,
  }

  // Try primary URL first
  if (STRAPI_URL) {
    try {
      console.log('🔑 Using API token:', STRAPI_TOKEN?.substring(0, 10) + '...')
      const url = `${STRAPI_URL}/api${endpoint}`
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000)
      
      const response = await fetch(url, {
        ...defaultOptions,
        signal: controller.signal
      })
      
      clearTimeout(timeoutId)
      
      if (response.ok) {
        return await response.json()
      }
    } catch (error) {
      console.log(`Failed to connect to ${STRAPI_URL}:`, error)
    }
  }

  // Try fallback URLs
  for (const fallbackUrl of FALLBACK_URLS) {
    try {
      const url = `${fallbackUrl}/api${endpoint}`
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000)
      
      const response = await fetch(url, {
        ...defaultOptions,
        signal: controller.signal
      })
      
      clearTimeout(timeoutId)
      
      if (response.ok) {
        return await response.json()
      }
    } catch (error) {
      console.log(`Failed to connect to ${fallbackUrl}:`, error)
    }
  }

  console.log('❌ Strapi connection failed: All Strapi endpoints failed')
  
  // Return empty data structure instead of throwing
  return {
    data: [],
    meta: {
      pagination: {
        page: 1,
        pageSize: 10,
        pageCount: 0,
        total: 0
      }
    }
  }
}

// Get all articles with optional filters
export async function getArticles(params: {
  limit?: number
  featured?: boolean
  breaking?: boolean
  premium?: boolean
  category?: string
  populate?: string[]
} = {}) {
  const { limit = 10, featured, breaking, premium, category, populate = ['featuredImage', 'category', 'author', 'tags'] } = params
  
  let endpoint = '/articles?'
  
  // Add population
  const populateQuery = populate.map(field => `populate[${field}]=*`).join('&')
  endpoint += populateQuery
  
  // Add filters
  const filters: string[] = []
  if (featured) filters.push('filters[featured][$eq]=true')
  if (breaking) filters.push('filters[breaking][$eq]=true')
  if (premium) filters.push('filters[premium][$eq]=true')
  if (category) filters.push(`filters[category][slug][$eq]=${category}`)
  
  if (filters.length > 0) {
    endpoint += '&' + filters.join('&')
  }
  
  // Add pagination
  endpoint += `&pagination[limit]=${limit}`
  
  // Sort by published date
  endpoint += '&sort[0]=publishedDate:desc'
  
  return await fetchAPI(endpoint)
}

// Get single article by slug
export async function getArticleBySlug(slug: string) {
  const endpoint = `/articles?filters[slug][$eq]=${slug}&populate[featuredImage]=*&populate[gallery]=*&populate[category]=*&populate[author]=*&populate[tags]=*`
  
  const response = await fetchAPI(endpoint)
  return response.data?.[0] || null
}

// Get articles by category slug
export async function getArticlesByCategory(categorySlug: string, limit = 10) {
  return await getArticles({ category: categorySlug, limit })
}

// Get all categories
export async function getCategories() {
  const endpoint = '/categories?populate[articles]=*&sort[0]=sortOrder:asc'
  return await fetchAPI(endpoint)
}

// Get single category by slug
export async function getCategoryBySlug(slug: string) {
  const endpoint = `/categories?filters[slug][$eq]=${slug}&populate[articles]=*`
  
  const response = await fetchAPI(endpoint)
  return response.data?.[0] || null
}

// Get all authors
export async function getAuthors() {
  const endpoint = '/authors?populate[avatar]=*&populate[articles]=*'
  return await fetchAPI(endpoint)
}

// Get single author by slug
export async function getAuthorBySlug(slug: string) {
  const endpoint = `/authors?filters[slug][$eq]=${slug}&populate[avatar]=*&populate[articles]=*`
  
  const response = await fetchAPI(endpoint)
  return response.data?.[0] || null
}

// Get all tags
export async function getTags() {
  const endpoint = '/tags?populate[articles]=*'
  return await fetchAPI(endpoint)
}

// Get advertisements by position
export async function getAdvertisements(position?: string) {
  let endpoint = '/advertisements?populate[image]=*&filters[active][$eq]=true'
  
  if (position) {
    endpoint += `&filters[position][$eq]=${position}`
  }
  
  // Filter by date range (current date should be between startDate and endDate)
  const now = new Date().toISOString()
  endpoint += `&filters[$or][0][startDate][$null]=true&filters[$or][1][startDate][$lte]=${now}`
  endpoint += `&filters[$or][0][endDate][$null]=true&filters[$or][1][endDate][$gte]=${now}`
  
  return await fetchAPI(endpoint)
}

// Create subscriber
export async function createSubscriber(data: {
  email: string
  name?: string
  subscriptionType?: 'free' | 'premium'
  categories?: number[]
}) {
  const endpoint = '/subscribers'
  
  return await fetchAPI(endpoint, {
    method: 'POST',
    body: JSON.stringify({ data }),
  })
}

// Search articles
export async function searchArticles(query: string, limit = 10) {
  const endpoint = `/articles?filters[$or][0][title][$containsi]=${query}&filters[$or][1][excerpt][$containsi]=${query}&populate[featuredImage]=*&populate[category]=*&populate[author]=*&pagination[limit]=${limit}`
  
  return await fetchAPI(endpoint)
}

// Get featured articles
export async function getFeaturedArticles(limit = 5) {
  return await getArticles({ featured: true, limit })
}

// Get breaking news
export async function getBreakingNews(limit = 3) {
  return await getArticles({ breaking: true, limit })
}

// Get premium articles
export async function getPremiumArticles(limit = 10) {
  return await getArticles({ premium: true, limit })
}

// Update article view count
export async function updateArticleViewCount(articleId: number) {
  try {
    // First get current view count
    const article = await fetchAPI(`/articles/${articleId}`)
    const currentViews = article.data?.attributes?.viewCount || 0
    
    // Update with incremented view count
    const endpoint = `/articles/${articleId}`
    return await fetchAPI(endpoint, {
      method: 'PUT',
      body: JSON.stringify({
        data: {
          viewCount: currentViews + 1
        }
      }),
    })
  } catch (error) {
    console.error('Failed to update view count:', error)
    return null
  }
}

export default {
  getArticles,
  getArticleBySlug,
  getArticlesByCategory,
  getCategories,
  getCategoryBySlug,
  getAuthors,
  getAuthorBySlug,
  getTags,
  getAdvertisements,
  createSubscriber,
  searchArticles,
  getFeaturedArticles,
  getBreakingNews,
  getPremiumArticles,
  updateArticleViewCount,
}
// API Configuration for EC2 Strapi Connection
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://13.200.250.14:1338'
const FALLBACK_STRAPI_URL = 'https://strapi-nambikkai.herokuapp.com' // Backup URL

// API token from Strapi Admin - Load from environment variables
const API_TOKEN = process.env.STRAPI_API_TOKEN

// Debug logging for API token
if (typeof window === 'undefined') { // Only log on server side
  console.log('🔑 API Token Status:', {
    exists: !!API_TOKEN,
    length: API_TOKEN?.length || 0,
    first10: API_TOKEN?.substring(0, 10) + '...' || 'Not found'
  })
}

// Helper function to try multiple URLs
async function fetchWithFallback(endpoint: string, options: RequestInit = {}) {
  const urls = [STRAPI_URL, FALLBACK_STRAPI_URL]
  
  for (const baseUrl of urls) {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout
      
      const response = await fetch(`${baseUrl}${endpoint}`, {
        ...options,
        signal: controller.signal
      })
      
      clearTimeout(timeoutId)
      
      if (response.ok) {
        return { response, baseUrl }
      }
    } catch (error) {
      console.log(`Failed to connect to ${baseUrl}: ${error}`)
      continue
    }
  }
  
  throw new Error('All Strapi endpoints failed')
}

// Fetch news/articles from Strapi
export async function getNews() {
  try {
    // Check if API token is available
    if (!API_TOKEN) {
      console.log('⚠️ No API token found in environment variables')
      return { data: [], connected: false, error: 'Missing API token' }
    }

    console.log('🔑 Using API token:', API_TOKEN.substring(0, 10) + '...')
    
    const { response, baseUrl } = await fetchWithFallback('/api/articles?populate=*', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_TOKEN}`,
      },
      cache: 'no-store'
    })

    const data = await response.json()
    console.log(`✅ Connected to Strapi at: ${baseUrl}`)
    
    if (data.data && data.data.length === 0) {
      console.log('⚠️ Strapi connected but database is empty')
      return { data: [], isEmpty: true, connected: true }
    }
    
    return { ...data, connected: true }
  } catch (error) {
    console.log('❌ Strapi connection failed:', error.message)
    return { data: [], connected: false, error: error.message }
  }
}

// Fetch single article by documentId or slug
export async function getArticle(idOrSlug: string) {
  try {
    // Try by documentId first with auth
    const res = await fetch(
      `${STRAPI_URL}/api/articles?populate=*&filters[documentId][$eq]=${idOrSlug}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_TOKEN}`,
        },
        cache: 'no-store'
      }
    );
    
    let data;
    if (res.ok) {
      data = await res.json();
    } else {
      // Fallback to public API
      const publicRes = await fetch(
        `${STRAPI_URL}/api/articles?populate=*&filters[documentId][$eq]=${idOrSlug}`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          cache: 'no-store'
        }
      );
      if (publicRes.ok) {
        data = await publicRes.json();
      } else {
        return { data: [] };
      }
    }
    
    // If not found by documentId, try by slug
    if (!data.data || data.data.length === 0) {
      const res2 = await fetch(
        `${STRAPI_URL}/api/articles?populate=*&filters[slug][$eq]=${idOrSlug}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_TOKEN}`,
          },
          cache: 'no-store'
        }
      );
      
      if (res2.ok) {
        return await res2.json();
      } else {
        // Fallback to public API for slug
        const publicRes2 = await fetch(
          `${STRAPI_URL}/api/articles?populate=*&filters[slug][$eq]=${idOrSlug}`,
          {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            cache: 'no-store'
          }
        );
        return publicRes2.ok ? await publicRes2.json() : { data: [] };
      }
    }
    
    return data;
  } catch (error) {
    return { data: [] };
  }
}

// Fetch articles by category
export async function getArticlesByCategory(categorySlug: string) {
  try {
    const res = await fetch(
      `${STRAPI_URL}/api/articles?populate=*&filters[category][slug][$eq]=${categorySlug}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_TOKEN}`,
        },
        cache: 'no-store'
      }
    );

    if (!res.ok) {
      // Fallback to public API
      const publicRes = await fetch(
        `${STRAPI_URL}/api/articles?populate=*&filters[category][slug][$eq]=${categorySlug}`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          cache: 'no-store'
        }
      );
      return publicRes.ok ? await publicRes.json() : { data: [] };
    }

    return await res.json();
  } catch (error) {
    return { data: [] };
  }
}

// Fetch categories
export async function getCategories() {
  try {
    const { response } = await fetchWithFallback('/api/categories', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_TOKEN}`,
      },
      cache: 'no-store'
    })

    return await response.json()
  } catch (error) {
    return { data: [] }
  }
}

// Fetch all uploaded images from Strapi
export async function getAllImages() {
  try {
    const res = await fetch(
      `${STRAPI_URL}/api/upload/files`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_TOKEN}`,
        },
        cache: 'no-store'
      }
    );

    if (!res.ok) {
      // Fallback to public API
      const publicRes = await fetch(
        `${STRAPI_URL}/api/upload/files`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          cache: 'no-store'
        }
      );
      return publicRes.ok ? await publicRes.json() : [];
    }

    const images = await res.json();
    
    // Format images with full URLs
    return images.map((image: any) => ({
      id: image.id,
      name: image.name,
      alternativeText: image.alternativeText || image.name,
      caption: image.caption,
      width: image.width,
      height: image.height,
      formats: image.formats,
      hash: image.hash,
      ext: image.ext,
      mime: image.mime,
      size: image.size,
      url: image.url?.startsWith('http') ? image.url : `${STRAPI_URL}${image.url}`,
      previewUrl: image.previewUrl ? 
        (image.previewUrl.startsWith('http') ? image.previewUrl : `${STRAPI_URL}${image.previewUrl}`) : 
        null,
      provider: image.provider,
      createdAt: image.createdAt,
      updatedAt: image.updatedAt
    }));
  } catch (error) {
    return [];
  }
}

// Convert Strapi article to app format
export function formatArticle(article: any) {
  const strapiUrl = STRAPI_URL
  
  // Safe content processing
  let excerpt = ''
  if (article.excerpt) {
    excerpt = article.excerpt
  } else if (article.content && typeof article.content === 'string') {
    excerpt = article.content.replace(/<[^>]*>/g, '').substring(0, 150) + '...'
  }
  
  // Process content - handle various Strapi content formats
  let content = ''
  
  if (article.content) {
    if (typeof article.content === 'string') {
      content = article.content
      // Wrap plain text in paragraphs if not already HTML
      if (!content.includes('<p>') && !content.includes('<div>')) {
        content = content.split('\n\n').map((para: string) => 
          para.trim() ? `<p>${para.trim()}</p>` : ''
        ).join('\n')
      }
    } else if (Array.isArray(article.content)) {
      // Handle Strapi blocks format (v5)
      content = article.content
        .map((block: any) => {
          if (block.type === 'paragraph' && block.children) {
            const text = block.children
              .map((child: any) => {
                if (child.type === 'text') {
                  let txt = child.text || ''
                  // Handle formatting
                  if (child.bold) txt = `<strong>${txt}</strong>`
                  if (child.italic) txt = `<em>${txt}</em>`
                  if (child.underline) txt = `<u>${txt}</u>`
                  return txt
                }
                return ''
              })
              .join('')
            return text.trim() ? `<p>${text}</p>` : ''
          }
          if (block.type === 'heading' && block.children) {
            const level = block.level || 2
            const text = block.children.map((c: any) => c.text || '').join('')
            return text.trim() ? `<h${level}>${text}</h${level}>` : ''
          }
          if (block.type === 'list' && block.children) {
            const tag = block.format === 'ordered' ? 'ol' : 'ul'
            const items = block.children
              .map((item: any) => {
                const text = item.children?.map((c: any) => c.text || '').join('') || ''
                return text.trim() ? `<li>${text}</li>` : ''
              })
              .filter((i: string) => i)
              .join('')
            return items ? `<${tag}>${items}</${tag}>` : ''
          }
          return ''
        })
        .filter((html: string) => html)
        .join('\n')
    } else if (typeof article.content === 'object') {
      content = JSON.stringify(article.content)
    }
  }
  
  if (!content || content.trim() === '') {
    content = '<p>உள்ளடக்கம் கிடைக்கவில்லை</p>'
  }
  
  // Enhanced image URL handling - check all possible Strapi image field structures
  let imageUrl = '/placeholder.jpg'
  
  // Helper function to construct full image URL
  const getFullImageUrl = (url: string) => {
    if (!url) return '/placeholder.jpg'
    return url.startsWith('http') ? url : `${strapiUrl}${url}`
  }
  
  // Check all possible image field variations
  const imageFields = [
    // Strapi v4/v5 format with data.attributes
    article.featuredimage?.data?.attributes?.url,
    article.featuredImage?.data?.attributes?.url,
    article.image?.data?.attributes?.url,
    article.thumbnail?.data?.attributes?.url,
    article.cover?.data?.attributes?.url,
    article.photo?.data?.attributes?.url,
    article.picture?.data?.attributes?.url,
    
    // Direct URL format (legacy)
    article.featuredimage?.url,
    article.featuredImage?.url,
    article.image?.url,
    article.thumbnail?.url,
    article.cover?.url,
    article.photo?.url,
    article.picture?.url,
    
    // Array format (media field)
    Array.isArray(article.media) && article.media[0]?.data?.attributes?.url,
    Array.isArray(article.images) && article.images[0]?.data?.attributes?.url,
    Array.isArray(article.gallery) && article.gallery[0]?.data?.attributes?.url,
    
    // Nested formats
    article.attributes?.featuredImage?.data?.attributes?.url,
    article.attributes?.image?.data?.attributes?.url,
  ]
  
  // Find the first valid image URL
  for (const field of imageFields) {
    if (field && typeof field === 'string') {
      imageUrl = getFullImageUrl(field)
      break
    }
  }
  
  // Get alternative text for accessibility
  const getImageAlt = () => {
    const altFields = [
      article.featuredimage?.data?.attributes?.alternativeText,
      article.featuredImage?.data?.attributes?.alternativeText,
      article.image?.data?.attributes?.alternativeText,
      article.media?.[0]?.data?.attributes?.alternativeText,
      article.images?.[0]?.data?.attributes?.alternativeText,
      article.attributes?.featuredImage?.data?.attributes?.alternativeText,
      article.title
    ]
    
    for (const alt of altFields) {
      if (alt && typeof alt === 'string') {
        return alt
      }
    }
    
    return 'செய்தி படம்'
  }
  
  return {
    id: article.documentId || article.id,
    title: article.title || 'தலைப்பு இல்லை',
    excerpt: excerpt,
    content: content,
    slug: article.slug || article.documentId || article.id?.toString(),
    category: article.category?.name || 'செய்திகள்',
    categorySlug: article.category?.slug || 'news',
    author: article.author?.name || 'தமிழ் செய்திகள்',
    date: article.publishedAt ? new Date(article.publishedAt).toLocaleDateString('ta-IN') : new Date().toLocaleDateString('ta-IN'),
    readTime: '5 நிமிடம்',
    image: imageUrl,
    imageAlt: getImageAlt()
  }
}
import { getNews, getCategories, getAllImages } from './api'

export async function testStrapiConnection() {
  const results = {
    connection: false,
    articles: 0,
    categories: 0,
    images: 0,
    errors: [] as string[],
    details: {} as any
  }

  try {
    // Test basic connection
    const response = await fetch('http://13.200.250.14:1338/api', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store'
    })
    
    if (response.ok) {
      results.connection = true
    } else {
      results.errors.push(`Connection failed: ${response.status}`)
    }
  } catch (error) {
    results.errors.push(`Connection error: ${error}`)
  }

  try {
    // Test articles endpoint
    const articles = await getNews()
    results.articles = articles.data?.length || 0
    results.details.articles = articles.data?.slice(0, 3) || []
  } catch (error) {
    results.errors.push(`Articles error: ${error}`)
  }

  try {
    // Test categories endpoint
    const categories = await getCategories()
    results.categories = categories.data?.length || 0
    results.details.categories = categories.data || []
  } catch (error) {
    results.errors.push(`Categories error: ${error}`)
  }

  try {
    // Test images endpoint
    const images = await getAllImages()
    results.images = Array.isArray(images) ? images.length : 0
    results.details.images = Array.isArray(images) ? images.slice(0, 3) : []
  } catch (error) {
    results.errors.push(`Images error: ${error}`)
  }

  return results
}
// Simple test to check if Strapi is working
const STRAPI_URL = 'http://localhost:1337'

async function testStrapi() {
  try {
    console.log('Testing Strapi connection...')
    
    // Test basic connection
    const response = await fetch(`${STRAPI_URL}/api/articles?populate=*`)
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    
    const data = await response.json()
    console.log('✅ Strapi connection successful!')
    console.log(`📄 Found ${data.data.length} articles`)
    
    if (data.data.length > 0) {
      console.log('📰 Sample article:')
      console.log(`   Title: ${data.data[0].title}`)
      console.log(`   Slug: ${data.data[0].slug}`)
    } else {
      console.log('⚠️  No articles found in Strapi')
    }
    
  } catch (error) {
    console.error('❌ Strapi connection failed:', error.message)
    console.log('\n🔧 Troubleshooting:')
    console.log('1. Make sure Strapi is running: cd strapi-nambikkai && npm run dev')
    console.log('2. Check if port 1337 is accessible')
    console.log('3. Create an article in Strapi admin panel')
  }
}

testStrapi()
// Simple API test script
const STRAPI_URL = 'http://13.200.250.14:1338'
const API_TOKEN = '5bd947dfae3c9c1dfcfcf63efca959b9078a5a7ef2fd56a6fd44389d16373ed97223645842940c11d131732bedb9268795c805e8b67bc847a8ba4ddfa753531686d7d803128812363e5cc084c6920247174ec64fa440bbcfd966cd5f051edbae2c5218c4f3a17402f6529c794ffd0d23e5e339c04750be7aced2eb5cff063a98'

async function testAPI() {
  console.log('🔍 Testing Strapi API Connection...')
  console.log(`📡 URL: ${STRAPI_URL}`)
  
  try {
    // Test 1: Basic connection
    console.log('\n1️⃣ Testing basic connection...')
    const healthRes = await fetch(`${STRAPI_URL}/api/articles`, {
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json'
      }
    })
    
    console.log(`Status: ${healthRes.status}`)
    
    if (!healthRes.ok) {
      throw new Error(`HTTP ${healthRes.status}: ${healthRes.statusText}`)
    }
    
    // Test 2: Fetch articles
    console.log('\n2️⃣ Testing articles endpoint...')
    const articlesRes = await fetch(`${STRAPI_URL}/api/articles?populate=*`, {
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json'
      }
    })
    
    const articlesData = await articlesRes.json()
    console.log(`✅ Articles found: ${articlesData.data?.length || 0}`)
    
    if (articlesData.data && articlesData.data.length > 0) {
      console.log(`📰 First article: "${articlesData.data[0].title}"`)
    }
    
    // Test 3: Check categories
    console.log('\n3️⃣ Testing categories endpoint...')
    const categoriesRes = await fetch(`${STRAPI_URL}/api/categories`, {
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json'
      }
    })
    
    const categoriesData = await categoriesRes.json()
    console.log(`✅ Categories found: ${categoriesData.data?.length || 0}`)
    
    console.log('\n🎉 API Connection Test PASSED!')
    console.log('✅ Ready to post content from Strapi to main website')
    
  } catch (error) {
    console.log('\n❌ API Connection Test FAILED!')
    console.error('Error:', error.message)
    
    if (error.message.includes('ECONNREFUSED')) {
      console.log('🔧 Fix: Check if Strapi server is running')
    } else if (error.message.includes('401')) {
      console.log('🔧 Fix: Check API token permissions')
    } else if (error.message.includes('CORS')) {
      console.log('🔧 Fix: Update CORS settings in Strapi')
    }
  }
}

testAPI()
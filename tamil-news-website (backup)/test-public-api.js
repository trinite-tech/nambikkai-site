// Test API without authentication
const STRAPI_URL = 'http://13.200.250.14:1338'

async function testPublicAPI() {
  console.log('🔍 Testing Strapi Public API...')
  console.log(`📡 URL: ${STRAPI_URL}`)
  
  try {
    // Test without authentication
    console.log('\n1️⃣ Testing public access...')
    const res = await fetch(`${STRAPI_URL}/api/articles`)
    
    console.log(`Status: ${res.status}`)
    console.log(`Headers: ${JSON.stringify(Object.fromEntries(res.headers.entries()), null, 2)}`)
    
    if (res.ok) {
      const data = await res.json()
      console.log(`✅ Public API works! Articles: ${data.data?.length || 0}`)
    } else {
      console.log(`❌ Status ${res.status}: ${res.statusText}`)
    }
    
  } catch (error) {
    console.log('❌ Connection failed:', error.message)
  }
}

testPublicAPI()
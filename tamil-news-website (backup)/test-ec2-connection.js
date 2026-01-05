// Comprehensive EC2 Strapi Connection Test
const STRAPI_URL = 'http://13.200.250.14:1338'
const API_TOKEN = '5bd947dfae3c9c1dfcfcf63efca959b9078a5a7ef2fd56a6fd44389d16373ed97223645842940c11d131732bedb9268795c805e8b67bc847a8ba4ddfa753531686d7d803128812363e5cc084c6920247174ec64fa440bbcfd966cd5f051edbae2c5218c4f3a17402f6529c794ffd0d23e5e339c04750be7aced2eb5cff063a98'

async function testEC2StrapiConnection() {
  console.log('🚀 Testing EC2 Strapi Connection for Hostinger Website')
  console.log(`📡 Strapi URL: ${STRAPI_URL}`)
  console.log(`🔑 API Token: ${API_TOKEN.substring(0, 20)}...`)
  console.log('=' .repeat(60))
  
  try {
    // Test 1: Basic server health
    console.log('\n1️⃣ Testing server health...')
    const healthRes = await fetch(`${STRAPI_URL}/api/articles`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    console.log(`✅ Server Status: ${healthRes.status} ${healthRes.statusText}`)
    
    // Test 2: Authenticated API access
    console.log('\n2️⃣ Testing authenticated API access...')
    const authRes = await fetch(`${STRAPI_URL}/api/articles?populate=*`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_TOKEN}`
      }
    })
    
    if (authRes.ok) {
      const authData = await authRes.json()
      console.log(`✅ Authenticated API: SUCCESS`)
      console.log(`📰 Articles found: ${authData.data?.length || 0}`)
      
      if (authData.data && authData.data.length > 0) {
        console.log(`📝 Sample article: "${authData.data[0].title}"`)
        console.log(`🏷️ Category: ${authData.data[0].category?.name || 'No category'}`)
        console.log(`📅 Published: ${authData.data[0].publishedAt || 'No date'}`)
      }
    } else {
      console.log(`❌ Authenticated API: FAILED (${authRes.status})`)
      
      // Test public fallback
      console.log('🔄 Testing public API fallback...')
      const publicData = await healthRes.json()
      console.log(`📰 Public articles: ${publicData.data?.length || 0}`)
    }
    
    // Test 3: Categories endpoint
    console.log('\n3️⃣ Testing categories endpoint...')
    const catRes = await fetch(`${STRAPI_URL}/api/categories`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_TOKEN}`
      }
    })
    
    if (catRes.ok) {
      const catData = await catRes.json()
      console.log(`✅ Categories: ${catData.data?.length || 0} found`)
    } else {
      console.log(`⚠️ Categories: ${catRes.status} ${catRes.statusText}`)
    }
    
    // Test 4: CORS headers check
    console.log('\n4️⃣ Checking CORS headers...')
    const corsHeaders = Object.fromEntries(authRes.headers.entries())
    console.log(`🌐 CORS Origin: ${corsHeaders['access-control-allow-origin'] || 'Not set'}`)
    console.log(`🔒 CORS Credentials: ${corsHeaders['access-control-allow-credentials'] || 'Not set'}`)
    
    // Test 5: Connection summary
    console.log('\n' + '=' .repeat(60))
    console.log('📊 CONNECTION SUMMARY:')
    console.log(`✅ Server: ONLINE`)
    console.log(`✅ API Token: ${authRes.ok ? 'VALID' : 'INVALID/NEEDS_PERMISSIONS'}`)
    console.log(`✅ Content: ${authData?.data?.length || 0} articles available`)
    console.log(`✅ Ready for Hostinger: ${authRes.ok ? 'YES' : 'NEEDS_SETUP'}`)
    
    if (!authRes.ok) {
      console.log('\n🔧 REQUIRED ACTIONS:')
      console.log('1. Check API token permissions in Strapi Admin')
      console.log('2. Enable public access for Articles in Strapi')
      console.log('3. Update CORS settings to include Hostinger domain')
    }
    
  } catch (error) {
    console.log('\n❌ CONNECTION FAILED!')
    console.error('Error:', error.message)
    
    if (error.message.includes('ECONNREFUSED')) {
      console.log('🔧 Fix: Start Strapi server on EC2')
    } else if (error.message.includes('timeout')) {
      console.log('🔧 Fix: Check EC2 security groups and firewall')
    }
  }
}

testEC2StrapiConnection()
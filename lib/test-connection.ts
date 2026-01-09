// Test Strapi connection directly
const testUrls = [
  'http://13.200.250.14:1338/api',
  'http://13.200.250.14:1338',
  'http://13.200.250.14:1338/admin'
]

async function testStrapiConnection() {
  console.log('🔍 Testing Strapi connections...')
  
  for (const url of testUrls) {
    try {
      console.log(`Testing: ${url}`)
      
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 5000)
      
      const response = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal
      })
      
      clearTimeout(timeoutId)
      
      console.log(`Status: ${response.status}`)
      
      if (response.ok) {
        const text = await response.text()
        console.log(`✅ SUCCESS: ${url}`)
        console.log(`Response: ${text.substring(0, 100)}...`)
        return url
      } else {
        console.log(`❌ FAILED: ${url} - Status: ${response.status}`)
      }
    } catch (error) {
      console.log(`❌ ERROR: ${url} - ${error.message}`)
    }
  }
  
  console.log('💥 All connections failed')
  return null
}

// Export for use in browser console
if (typeof window !== 'undefined') {
  window.testStrapiConnection = testStrapiConnection
}

export { testStrapiConnection }
// declare global {
//   interface Window {
//     testStrapiConnection: () => Promise<string | null>
//   }
// }

// Test Strapi connection directly
const testUrls = [
  'http://13.200.250.14:1338/api',
  'http://13.200.250.14:1338',
  'http://13.200.250.14:1338/admin',
]

async function testStrapiConnection(): Promise<string | null> {
  console.log('🔍 Testing Strapi connections...')

  for (const url of testUrls) {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 5000)

      const response = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (response.ok) {
        console.log(`✅ SUCCESS: ${url}`)
        return url
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(`❌ ERROR: ${url} - ${error.message}`)
      } else {
        console.log(`❌ ERROR: ${url} - Unknown error`)
      }
    }
  }

  console.log('💥 All connections failed')
  return null
}

// if (typeof window !== 'undefined') {
//   window.testStrapiConnection = testStrapiConnection
// }

export { testStrapiConnection }

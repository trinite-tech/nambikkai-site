// Test Strapi connection
const STRAPI_URL = 'http://13.200.250.14:1338';
const API_TOKEN = 'a807434f6cb8c156770df6d4267018ffc025744d805da93ca8e351d0d233e47ae286563e70c3cd22530b457a85df591c6532388a6dc749998c4f6c56f9800ba55d62fff716cec6d79a798c42d4cf05fe94249ae67691e7608d91bd38f4d79fd2d7585f517c0e570f0a7cbef91259d166de114a4803d34248d1a349bf4152a539';

async function testConnection() {
  console.log('Testing Strapi connection...');
  
  try {
    // Test basic connection
    const response = await fetch(`${STRAPI_URL}/api/articles`, {
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Connection successful!');
      console.log('Data:', JSON.stringify(data, null, 2));
    } else {
      console.log('❌ Connection failed');
      const errorText = await response.text();
      console.log('Error:', errorText);
    }
  } catch (error) {
    console.log('❌ Network error:', error.message);
  }
}

testConnection();
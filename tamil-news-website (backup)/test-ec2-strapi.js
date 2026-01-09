// Test connection to EC2 Strapi instance
const EC2_STRAPI_URL = 'http://13.200.250.14:1338';

async function testEC2Connection() {
  console.log('Testing connection to EC2 Strapi instance...');
  console.log('URL:', EC2_STRAPI_URL);
  
  try {
    // Test without token first
    const response = await fetch(`${EC2_STRAPI_URL}/api/articles`);
    console.log('Response status:', response.status);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ EC2 Strapi connection successful!');
      console.log('Articles found:', data.data?.length || 0);
      
      if (data.data?.length > 0) {
        console.log('Sample article:', data.data[0].title);
      }
      
      // Check if we need authentication
      console.log('\n--- Testing with authentication ---');
      const authResponse = await fetch(`${EC2_STRAPI_URL}/api/articles`, {
        headers: {
          'Authorization': 'Bearer a807434f6cb8c156770df6d4267018ffc025744d805da93ca8e351d0d233e47ae286563e70c3cd22530b457a85df591c6532388a6dc749998c4f6c56f9800ba55d62fff716cec6d79a798c42d4cf05fe94249ae67691e7608d91bd38f4d79fd2d7585f517c0e570f0a7cbef91259d166de114a4803d34248d1a349bf4152a539'
        }
      });
      
      if (authResponse.ok) {
        const authData = await authResponse.json();
        console.log('✅ Authenticated request successful!');
        console.log('Authenticated articles:', authData.data?.length || 0);
      }
      
    } else {
      console.log('❌ Connection failed');
      const errorText = await response.text();
      console.log('Error:', errorText);
    }
  } catch (error) {
    console.log('❌ Network error:', error.message);
    console.log('Make sure:');
    console.log('1. EC2 instance is running');
    console.log('2. Strapi is running on port 1338');
    console.log('3. Security group allows port 1338');
    console.log('4. EC2 public IP is correct');
  }
}

testEC2Connection();
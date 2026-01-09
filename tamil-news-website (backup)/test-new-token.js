// Test EC2 Strapi with new token
const EC2_STRAPI_URL = 'http://13.200.250.14:1338';
const NEW_TOKEN = '281b09a503849df4353f8be214da3d8eb0f9052b5bb426a59230c8579fa61502c409bb92df35c02cd2686df5ab394f02153d6bea29786d52b88f9ed98a99ffb50bde124023faa7c3dafebc70121ab107dcaf63a05d3d3565bbd80a670c373d6ba182869c171e13b2215097d2277d42512c47f0def1bc42ac28adf1b68adb13c8';

async function testNewToken() {
  console.log('Testing EC2 Strapi with new API token...');
  
  try {
    const response = await fetch(`${EC2_STRAPI_URL}/api/articles?populate=*`, {
      headers: {
        'Authorization': `Bearer ${NEW_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Response status:', response.status);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ New token works!');
      console.log('Articles found:', data.data?.length || 0);
      
      if (data.data?.length > 0) {
        console.log('Articles:');
        data.data.forEach((article, index) => {
          console.log(`${index + 1}. ${article.title}`);
        });
      }
    } else {
      console.log('❌ Token failed');
      const errorText = await response.text();
      console.log('Error:', errorText);
    }
  } catch (error) {
    console.log('❌ Connection error:', error.message);
  }
}

testNewToken();
// Test script to check Strapi article response
const STRAPI_URL = 'http://localhost:1338'; // or 1337
const ARTICLE_ID = 'iuyt3agdxqiwidyl61sfsm4w';

async function testArticle() {
  try {
    const url = `${STRAPI_URL}/api/articles?populate=*&filters[documentId][$eq]=${ARTICLE_ID}`;
    console.log('Fetching:', url);
    
    const response = await fetch(url);
    const data = await response.json();
    
    console.log('\n=== FULL RESPONSE ===');
    console.log(JSON.stringify(data, null, 2));
    
    if (data.data && data.data.length > 0) {
      const article = data.data[0];
      console.log('\n=== ARTICLE CONTENT ===');
      console.log('Type:', typeof article.content);
      console.log('Content:', article.content);
      
      if (Array.isArray(article.content)) {
        console.log('\n=== CONTENT IS ARRAY ===');
        article.content.forEach((block, i) => {
          console.log(`Block ${i}:`, JSON.stringify(block, null, 2));
        });
      }
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

testArticle();

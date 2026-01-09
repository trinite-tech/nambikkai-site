// Run this script to create default categories in Strapi
// Usage: node strapi-setup-categories.js

const categories = [
  { name: "உலக செய்திகள்", slug: "world", description: "உலகம் முழுவதும் நடக்கும் செய்திகள்" },
  { name: "இந்தியா", slug: "india", description: "இந்திய செய்திகள்" },
  { name: "தமிழ்நாடு", slug: "tamilnadu", description: "தமிழ்நாடு செய்திகள்" },
  { name: "விளையாட்டு", slug: "sports", description: "விளையாட்டு செய்திகள்" },
  { name: "தொழில்நுட்பம்", slug: "tech", description: "தொழில்நுட்ப செய்திகள்" },
  { name: "வணிகம்", slug: "business", description: "வணிக செய்திகள்" },
  { name: "பொழுதுபோக்கு", slug: "cinema", description: "சினிமா மற்றும் பொழுதுபோக்கு செய்திகள்" }
];

async function createCategories() {
  const STRAPI_URL = 'http://localhost:1337';
  
  for (const category of categories) {
    try {
      const response = await fetch(`${STRAPI_URL}/api/categories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            ...category,
            publishedAt: new Date().toISOString()
          }
        }),
      });

      if (response.ok) {
        console.log(`✅ Created category: ${category.name}`);
      } else {
        console.log(`❌ Failed to create category: ${category.name}`);
      }
    } catch (error) {
      console.error(`Error creating category ${category.name}:`, error);
    }
  }
}

createCategories();
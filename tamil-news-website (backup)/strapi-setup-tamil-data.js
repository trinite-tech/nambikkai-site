const axios = require('axios');

const STRAPI_URL = 'http://localhost:1337';
const API_TOKEN = 'your-api-token'; // Replace with your actual token

const categories = [
  {
    name: "உலக செய்திகள்",
    slug: "world-news",
    description: "உலகம் முழுவதும் நடக்கும் முக்கிய செய்திகள்",
    color: "#1e40af",
    icon: "🌍",
    featured: true,
    sortOrder: 1
  },
  {
    name: "இந்தியா",
    slug: "india",
    description: "இந்தியாவின் அரசியல், சமூக மற்றும் பொருளாதார செய்திகள்",
    color: "#dc2626",
    icon: "🇮🇳",
    featured: true,
    sortOrder: 2
  },
  {
    name: "தமிழ்நாடு",
    slug: "tamilnadu",
    description: "தமிழ்நாட்டின் உள்ளூர் செய்திகள் மற்றும் நிகழ்வுகள்",
    color: "#059669",
    icon: "🏛️",
    featured: true,
    sortOrder: 3
  },
  {
    name: "விளையாட்டு",
    slug: "sports",
    description: "கிரிக்கெட், கால்பந்து மற்றும் பிற விளையாட்டு செய்திகள்",
    color: "#ea580c",
    icon: "⚽",
    featured: true,
    sortOrder: 4
  },
  {
    name: "தொழில்நுட்பம்",
    slug: "technology",
    description: "புதிய தொழில்நுட்பம் மற்றும் கண்டுபிடிப்புகள்",
    color: "#7c3aed",
    icon: "💻",
    featured: false,
    sortOrder: 5
  },
  {
    name: "வணிகம்",
    slug: "business",
    description: "பொருளாதாரம், வணிகம் மற்றும் நிதி செய்திகள்",
    color: "#0891b2",
    icon: "💼",
    featured: false,
    sortOrder: 6
  },
  {
    name: "பொழுதுபோக்கு",
    slug: "entertainment",
    description: "சினிமா, இசை மற்றும் பொழுதுபோக்கு செய்திகள்",
    color: "#be185d",
    icon: "🎬",
    featured: false,
    sortOrder: 7
  }
];

const tags = [
  { name: "அவசர செய்தி", slug: "breaking-news", color: "#dc2626" },
  { name: "பிரத்யேக", slug: "exclusive", color: "#7c2d12" },
  { name: "நேர்காணல்", slug: "interview", color: "#059669" },
  { name: "ஆய்வு", slug: "analysis", color: "#1e40af" },
  { name: "கருத்து", slug: "opinion", color: "#7c3aed" },
  { name: "புகைப்படங்கள்", slug: "photos", color: "#ea580c" },
  { name: "வீடியோ", slug: "video", color: "#be185d" },
  { name: "நேரலை", slug: "live", color: "#dc2626" }
];

const authors = [
  {
    name: "ஆ. வெங்கடேஸ்",
    slug: "a-venkatesh",
    bio: "10 ஆண்டுகள் அனுபவம் கொண்ட பொருளாதார செய்தியாளர்",
    designation: "மூத்த செய்தியாளர்",
    experience: "10 ஆண்டுகள்",
    specialization: "வணிகம்",
    email: "venkatesh@nambikkai.com"
  },
  {
    name: "கி. பாலசுப்பிரமணியன்",
    slug: "k-balasubramanyan",
    bio: "தமிழ்நாடு அரசியல் மற்றும் சமூக செய்திகளில் நிபுணர்",
    designation: "செய்தியாளர்",
    experience: "8 ஆண்டுகள்",
    specialization: "தமிழ்நாடு",
    email: "bala@nambikkai.com"
  }
];

async function setupData() {
  try {
    console.log('Setting up Tamil news website data...');
    
    // Create categories
    for (const category of categories) {
      await axios.post(`${STRAPI_URL}/api/categories`, {
        data: category
      }, {
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`,
          'Content-Type': 'application/json'
        }
      });
      console.log(`Created category: ${category.name}`);
    }
    
    // Create tags
    for (const tag of tags) {
      await axios.post(`${STRAPI_URL}/api/tags`, {
        data: tag
      }, {
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`,
          'Content-Type': 'application/json'
        }
      });
      console.log(`Created tag: ${tag.name}`);
    }
    
    // Create authors
    for (const author of authors) {
      await axios.post(`${STRAPI_URL}/api/authors`, {
        data: author
      }, {
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`,
          'Content-Type': 'application/json'
        }
      });
      console.log(`Created author: ${author.name}`);
    }
    
    console.log('Setup completed successfully!');
  } catch (error) {
    console.error('Error setting up data:', error.response?.data || error.message);
  }
}

setupData();
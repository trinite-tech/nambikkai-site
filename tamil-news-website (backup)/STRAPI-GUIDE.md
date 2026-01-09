# 📰 How to Post News from Strapi to Main Website

## 🚀 Quick Setup

### 1. **Start Strapi CMS**
```bash
cd strapi-nambikkai
npm run dev
```
- Open http://localhost:1337/admin
- Create admin account if first time

### 2. **Create Your First Article**

#### Step 1: Go to Content Manager
1. Click "Content Manager" in left sidebar
2. Click "Article" under Collection Types

#### Step 2: Create New Article
1. Click "Create new entry" button
2. Fill in the form:

**Required Fields:**
- **Title**: செய்தி தலைப்பு (Article headline in Tamil)
- **Content**: முழு செய்தி உள்ளடக்கம் (Full article content)
- **Excerpt**: சுருக்கம் (Brief summary)
- **Slug**: URL-friendly version (e.g., "tamil-news-headline")

**Optional Fields:**
- **Featured Image**: Upload news image
- **Category**: Select from dropdown (உலகம், இந்தியா, விளையாட்டு, etc.)
- **Author**: Select author
- **Tags**: Add relevant tags
- **Featured**: Check if this should be featured article

#### Step 3: Publish Article
1. Click "Save" button
2. Click "Publish" to make it live
3. Article will appear on main website immediately!

## 📋 Content Types Available

### 📄 **Articles**
- Title, Content, Excerpt
- Featured Image
- Category, Author, Tags
- Publication status

### 📂 **Categories** 
- உலகம் (World)
- இந்தியா (India) 
- தமிழ்நாடு (Tamil Nadu)
- விளையாட்டு (Sports)
- தொழில்நுட்பம் (Technology)
- சினிமா (Cinema)
- வணிகம் (Business)

### 👤 **Authors**
- Name, Bio, Profile Image
- Social media links

### 🏷️ **Tags**
- Organize articles by topics

## 🔄 How It Works

1. **Create Article in Strapi** → Article saved in database
2. **Publish Article** → Article becomes available via API
3. **Main Website Fetches** → Next.js pulls latest articles
4. **Display on Website** → Articles appear automatically

## 🎯 Pro Tips

### **For Better SEO:**
- Use descriptive titles in Tamil
- Add proper excerpts
- Upload high-quality images
- Use relevant tags

### **For Better Organization:**
- Always select a category
- Use consistent author names
- Add publication dates
- Use featured flag for important news

### **For Tamil Content:**
- Use proper Tamil fonts
- Write clear headlines
- Include English translations if needed
- Use appropriate Tamil punctuation

## 🔧 API Endpoints

Your articles are available at:
- All articles: `http://localhost:1337/api/articles?populate=*`
- By category: `http://localhost:1337/api/articles?filters[category][slug][$eq]=world`
- Single article: `http://localhost:1337/api/articles?filters[slug][$eq]=article-slug`

## 🚨 Troubleshooting

**Article not showing on website?**
1. Check if article is published (not draft)
2. Verify Strapi is running on port 1337
3. Check browser console for API errors
4. Refresh the main website

**Images not loading?**
1. Ensure images are uploaded to Strapi
2. Check image permissions in Strapi
3. Verify image URLs in API response

---

**Ready to publish your first Tamil news article! 🎉**
# Content Management Guide

## 📝 How to Add News Articles

### Method 1: Using Sample Data (Quick & Easy)

**File**: `lib/sample-data.ts`

Add new articles to the `sampleArticles` array:

```typescript
{
  id: "7", // Unique ID
  title: "புதிய செய்தி தலைப்பு",
  excerpt: "செய்தியின் சுருக்கம் இங்கே வரும்...",
  content: `முழு செய்தி உள்ளடக்கம் இங்கே வரும். 
  
  இது பல பத்திகளாக இருக்கலாம். HTML tags பயன்படுத்தலாம்:
  
  <p>முதல் பத்தி</p>
  <p>இரண்டாம் பத்தி</p>
  <strong>முக்கியமான தகவல்</strong>`,
  image: "/your-image.jpg", // Public folder இல் உள்ள image
  category: "விளையாட்டு", // Must match exactly
  author: "செய்தியாளர் பெயர்",
  date: "26 நவம்பர் 2024",
  readTime: "5 நிமிடம்",
}
```

### Method 2: Using Strapi CMS (Professional)

1. **Start Strapi**:
   ```bash
   cd strapi-nambikkai
   npm run develop
   ```

2. **Access Admin Panel**: http://localhost:1337/admin

3. **Create Article**:
   - Go to "Articles" → "Create new entry"
   - Fill in: Title, Content, Excerpt
   - Upload Featured Image
   - Select Category
   - Set Author
   - Publish

## 🗂️ Category Management

### Current Categories:
- **விளையாட்டு** (sports)
- **வணிகம்** (business) 
- **உலக செய்திகள்** (world)
- **தமிழ்நாடு** (tamilnadu)
- **தொழில்நுட்பம்** (tech)
- **பொழுதுபொக்கு** (cinema)

### Adding New Category:

1. **Update sample-data.ts**:
```typescript
export const categories = [
  // ... existing categories
  { label: "அரசியல்", href: "/category/politics" },
]
```

2. **Update category page mapping**:
```typescript
const categoryMap: { [key: string]: string } = {
  // ... existing mappings
  'politics': 'அரசியல்',
}
```

3. **Update navbar.tsx**:
```typescript
const navItems = [
  // ... existing items
  { label: "அரசியல்", href: "/category/politics" },
]
```

## 🖼️ Adding Images

1. **Place image in `/public` folder**
2. **Reference in article**:
   ```typescript
   image: "/my-news-image.jpg"
   ```

## 🔧 Troubleshooting

### "No Content Displayed"
1. **Check category name** - Must match exactly
2. **Check article category** - Use exact Tamil text
3. **Clear browser cache**
4. **Restart development server**

### Common Issues:
- **Wrong category name**: Use exact Tamil spelling
- **Missing image**: Add to `/public` folder
- **Content not showing**: Check for syntax errors in sample-data.ts

## 📋 Quick Content Template

Copy this template for new articles:

```typescript
{
  id: "NEW_ID",
  title: "செய்தி தலைப்பு",
  excerpt: "செய்தியின் சுருக்கம்...",
  content: "முழு செய்தி உள்ளடக்கம்...",
  image: "/image-name.jpg",
  category: "விளையாட்டு", // Choose from existing categories
  author: "ஆசிரியர் பெயர்",
  date: "இன்றைய தேதி",
  readTime: "5 நிமிடம்",
}
```

## 🚀 Publishing Steps

1. **Add content** to `sample-data.ts`
2. **Add image** to `/public` folder
3. **Save files**
4. **Refresh browser**
5. **Check category page**

Content should now display properly in the respective categories!
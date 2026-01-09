# Image Guide for Tamil News Website

## 📸 How to Add Images

### 1. **Adding Images to Public Folder**
- Place your images in the `/public` folder
- Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`, `.svg`
- Recommended size: 800x600px or 1200x800px for articles

### 2. **Image Naming Convention**
```
/public/
  ├── article-images/
  │   ├── economy-news-2024.jpg
  │   ├── sports-cricket-match.jpg
  │   └── technology-update.jpg
  ├── category-images/
  │   ├── business-banner.jpg
  │   └── sports-banner.jpg
  └── placeholder.jpg (fallback image)
```

### 3. **Adding Images to Articles**

#### For Sample Data (lib/sample-data.ts):
```typescript
{
  id: "7",
  title: "புதிய செய்தி தலைப்பு",
  excerpt: "செய்தியின் சுருக்கம்...",
  content: "முழு செய்தி உள்ளடக்கம்...",
  image: "/article-images/your-image-name.jpg", // ← Add your image path here
  category: "தொழில்நுட்பம்",
  author: "செய்தியாளர் பெயர்",
  date: "26 நவம்பர் 2024",
  readTime: "5 நிமிடம்",
}
```

#### For Strapi CMS:
1. Upload image in Strapi admin panel
2. Add to article's "Featured Image" field
3. Image will automatically appear on website

### 4. **Image Optimization Tips**
- **Size**: Keep images under 500KB for faster loading
- **Dimensions**: Use 16:9 aspect ratio (e.g., 800x450px)
- **Format**: Use `.jpg` for photos, `.png` for graphics with transparency
- **Compression**: Use tools like TinyPNG to compress images

### 5. **Current Available Images**
✅ Already available in `/public`:
- `/indian-economy-growth.jpg`
- `/chennai-rain-drainage.jpg`
- `/cricket-ball-fairness.jpg`
- `/cricket-t20-evolution.jpg`
- `/sprinting-olympic-records.jpg`
- `/north-america-snowstorm.jpg`
- `/placeholder.jpg` (fallback)

### 6. **Adding New Categories**
To add a new category with images:

1. **Update sample-data.ts**:
```typescript
export const categories = [
  // ... existing categories
  { label: "புதிய வகை", href: "/category/new-category" },
]
```

2. **Update category page mapping**:
```typescript
const categoryMap: { [key: string]: string } = {
  // ... existing mappings
  'new-category': 'புதிய வகை',
}
```

3. **Add category banner image**:
```
/public/category-banners/new-category-banner.jpg
```

### 7. **Troubleshooting Images**
- **Image not showing**: Check file path and ensure image exists in `/public`
- **Slow loading**: Compress image or reduce size
- **Broken image**: Fallback to `/placeholder.jpg` automatically

### 8. **Best Practices**
- Always include alt text for accessibility
- Use descriptive file names
- Keep consistent image sizes within categories
- Test images on different screen sizes
- Use WebP format for better compression (optional)

## 🚀 Quick Start
1. Add your image to `/public` folder
2. Update the `image` field in your article data
3. Image will automatically appear with hover effects and proper sizing!
# Strapi Content Fix Guide

## Issues Fixed

### 1. Content Not Displaying
**Problem**: Articles from Strapi showing "உள்ளடக்கம் கிடைக்கவில்லை" (No content available)

**Solution**: 
- Updated `formatArticle()` function to properly process content
- Added automatic paragraph wrapping for plain text
- Added fallback message when content is empty

### 2. Images Not Visible
**Problem**: Featured images from Strapi not displaying

**Solution**:
- Fixed image URL handling in `formatArticle()`
- Added support for both `featuredImage` and `image` fields
- Updated Next.js config to allow Strapi image domains
- Handles both relative and absolute URLs

## How to Add Content in Strapi

### Step 1: Start Strapi
```bash
cd strapi-nambikkai
npm run develop
```

### Step 2: Access Admin Panel
Open: http://localhost:1337/admin (or 1338 based on your config)

### Step 3: Create Article

1. **Go to Content Manager** → **Articles** → **Create new entry**

2. **Fill Required Fields**:
   - **Title**: செய்தி தலைப்பு
   - **Content**: Use rich text editor or HTML
   - **Excerpt**: Short summary (optional, auto-generated if empty)
   - **Slug**: URL-friendly name (e.g., `news-title`)

3. **Add Image**:
   - Click **Featured Image** field
   - Upload image from your computer
   - Or select from Media Library
   - Add **Alternative Text** for accessibility

4. **Set Category**:
   - Select from dropdown or create new
   - Use Tamil names: விளையாட்டு, வணிகம், etc.

5. **Set Author**:
   - Select existing author or create new

6. **Publish**:
   - Click **Save** button
   - Then click **Publish** to make it live

## Content Formatting Tips

### For Rich Content:
```html
<p>முதல் பத்தி உள்ளடக்கம்</p>

<p>இரண்டாம் பத்தி உள்ளடக்கம்</p>

<p><strong>முக்கியமான தகவல்:</strong></p>
<ul>
  <li>முதல் புள்ளி</li>
  <li>இரண்டாம் புள்ளி</li>
  <li>மூன்றாம் புள்ளி</li>
</ul>

<p>கடைசி பத்தி</p>
```

### For Plain Text:
Just write paragraphs separated by blank lines:
```
முதல் பத்தி உள்ளடக்கம்.

இரண்டாம் பத்தி உள்ளடக்கம்.

மூன்றாம் பத்தி உள்ளடக்கம்.
```

The system will automatically wrap them in `<p>` tags.

## Troubleshooting

### Content Still Not Showing?

1. **Check Strapi is Running**:
   ```bash
   # Should see Strapi running on port 1337 or 1338
   ```

2. **Verify Content Field**:
   - Open article in Strapi admin
   - Make sure Content field has text
   - Save and Publish again

3. **Check Browser Console**:
   - Open DevTools (F12)
   - Look for errors
   - Check Network tab for API calls

### Images Not Loading?

1. **Check Image Upload**:
   - Go to Media Library in Strapi
   - Verify image is uploaded
   - Check file size (should be < 5MB)

2. **Verify Image URL**:
   - In article, check Featured Image field
   - Should show thumbnail preview

3. **Check Strapi URL**:
   - Verify `.env.local` has correct `NEXT_PUBLIC_STRAPI_URL`
   - Should match your Strapi port (1337 or 1338)

4. **Restart Dev Server**:
   ```bash
   # Stop current server (Ctrl+C)
   npm run dev
   ```

## API Response Format

Strapi returns articles in this format:
```json
{
  "data": [
    {
      "id": 1,
      "documentId": "abc123",
      "title": "செய்தி தலைப்பு",
      "content": "<p>உள்ளடக்கம்</p>",
      "excerpt": "சுருக்கம்",
      "slug": "news-slug",
      "publishedAt": "2025-01-08T10:00:00.000Z",
      "category": {
        "name": "விளையாட்டு",
        "slug": "sports"
      },
      "author": {
        "name": "ஆசிரியர் பெயர்"
      },
      "featuredImage": {
        "url": "/uploads/image.jpg",
        "alternativeText": "படம் விளக்கம்"
      }
    }
  ]
}
```

## Quick Checklist

Before publishing an article:
- [ ] Title is in Tamil
- [ ] Content has multiple paragraphs
- [ ] Featured image is uploaded
- [ ] Category is selected
- [ ] Author is set
- [ ] Slug is URL-friendly
- [ ] Article is Published (not just Saved)
- [ ] Preview looks good

## Need Help?

If issues persist:
1. Check Strapi logs in terminal
2. Check Next.js dev server logs
3. Verify `.env.local` configuration
4. Try creating a test article with simple content
5. Check if sample articles work (they should)

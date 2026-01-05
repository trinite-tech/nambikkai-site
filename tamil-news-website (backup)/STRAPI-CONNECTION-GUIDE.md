# 🔗 Complete Strapi CMS Connection Guide

## 📋 Overview
This guide shows you how to connect your Next.js Tamil news website to Strapi CMS for dynamic content management.

## 🚀 Step 1: Set Up Strapi Instance

### Start Strapi
```bash
strapi-setup.bat
```
OR manually:
```bash
cd strapi-nambikkai
npm install
npm run dev
```

**Expected Result:** Strapi runs on http://localhost:1337

## 🔧 Step 2: Configure Strapi Admin

1. **Open Strapi Admin:** http://localhost:1337/admin
2. **Create Admin Account** (first time only):
   - First Name: Admin
   - Last Name: User
   - Email: admin@tamilnews.com
   - Password: Admin123!

## 📝 Step 3: Organize Content in Strapi

### Content Types Already Available:
- **Articles** - News articles
- **Categories** - News categories  
- **Authors** - Article writers
- **Tags** - Article tags

### Create Sample Categories:
1. Go to **Content Manager** → **Category**
2. Create these categories:

| Name | Slug |
|------|------|
| உலகம் | world |
| இந்தியா | india |
| தமிழ்நாடு | tamil-nadu |
| விளையாட்டு | sports |
| தொழில்நுட்பம் | technology |
| சினிமா | cinema |

### Create Sample Author:
1. Go to **Content Manager** → **Author**
2. Create author:
   - **Name:** செய்தியாளர் குழு
   - **Bio:** தமிழ் செய்திகள் செய்தியாளர் குழு

## 📰 Step 4: Create Sample Article

1. **Go to Content Manager** → **Article** → **Create new entry**

2. **Fill Article Details:**

**Title:**
```
தமிழ்நாட்டில் புதிய தொழில்நுட்ப மையம் திறப்பு
```

**Content:**
```
சென்னை: தமிழ்நாடு அரசு இன்று சென்னையில் ஒரு புதிய தொழில்நுட்ப மையத்தை திறந்து வைத்தது. இந்த மையம் இளைஞர்களுக்கு நவீன தொழில்நுட்பத்தில் பயிற்சி அளிக்கும்.

முதலமைச்சர் இந்த நிகழ்ச்சியில் கலந்து கொண்டு, "இந்த மையம் தமிழ்நாட்டின் தொழில்நுட்ப வளர்ச்சிக்கு பெரும் பங்களிப்பு செய்யும்" என்று கூறினார்.

இந்த மையத்தில் செயற்கை நுண்ணறிவு, இணைய பாதுகாப்பு, மென்பொருள் மேம்பாடு போன்ற துறைகளில் பயிற்சி அளிக்கப்படும். ஆயிரம் மாணவர்கள் ஒரே நேரத்தில் பயிற்சி பெற முடியும்.

தனியார் நிறுவனங்களும் இந்த திட்டத்தில் பங்கேற்று, மாணவர்களுக்கு வேலை வாய்ப்புகளை வழங்க உறுதியளித்துள்ளன.
```

**Excerpt:**
```
தமிழ்நாடு அரசு சென்னையில் புதிய தொழில்நுட்ப மையம் திறந்து வைத்தது. இளைஞர்களுக்கு நவீன தொழில்நுட்பத்தில் பயிற்சி அளிக்கும்.
```

**Slug:**
```
tamil-nadu-tech-center-opening
```

**Other Fields:**
- **Category:** Select "தொழில்நுட்பம்"
- **Author:** Select "செய்தியாளர் குழு"
- **Featured Image:** Upload any tech-related image (optional)

3. **Save and Publish** the article

## 🌐 Step 5: Load Data in Next.js

### Start Next.js Website:
```bash
npm run dev
```

**Expected Result:** Website runs on http://localhost:3000

### How Data Loading Works:

1. **API Service** (`lib/api.ts`) - Connects to Strapi
2. **Dynamic Component** (`components/dynamic-homepage.tsx`) - Loads articles
3. **Fallback System** - Uses sample data if Strapi unavailable
4. **Real-time Updates** - Shows Strapi articles when available

## ✅ Step 6: Verify Connection

### Check Website Status:
- Go to http://localhost:3000
- Look for status indicator at top:
  - ✅ **"Connected to Strapi CMS"** = Working!
  - 📄 **"Using sample data"** = Strapi not connected

### Test Article Display:
1. Your Strapi article should appear on homepage
2. Click article to view full content
3. Create more articles in Strapi to see them appear

## 🔧 Troubleshooting

### Article Not Showing?
1. Check if article is **Published** (not Draft)
2. Verify Strapi is running on port 1337
3. Check browser console for API errors
4. Refresh the website

### Strapi Won't Start?
1. Kill processes on port 1337: `taskkill /F /IM node.exe`
2. Delete `.tmp` folder in `strapi-nambikkai`
3. Run `npm run dev` again

### Connection Failed?
1. Verify both servers are running
2. Check firewall/antivirus blocking ports
3. Try accessing http://localhost:1337/api/articles directly

## 📁 Key Files Created:

- `lib/api.ts` - Strapi API connection
- `components/dynamic-homepage.tsx` - Dynamic content loading
- `app/page.tsx` - Updated homepage
- `strapi-setup.bat` - Strapi startup script

## 🎯 Next Steps:

1. **Add More Content:** Create more articles, categories, authors
2. **Upload Images:** Add featured images to articles
3. **Customize Design:** Modify components for your needs
4. **Deploy:** Push to production with environment variables

---

**Your Tamil news website is now dynamically connected to Strapi CMS! 🎉**
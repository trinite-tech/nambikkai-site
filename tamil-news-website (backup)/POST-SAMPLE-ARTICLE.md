# 📰 How to Post Sample Article via Strapi CMS

## 🚀 Step-by-Step Guide

### Step 1: Start Strapi CMS
```bash
cd strapi-nambikkai
npm run dev
```
- Wait for "Server started on http://localhost:1337"
- Open http://localhost:1337/admin in browser

### Step 2: Create Admin Account (First Time Only)
1. Fill in admin details:
   - **First Name**: Admin
   - **Last Name**: User  
   - **Email**: admin@tamilnews.com
   - **Password**: Admin123!
2. Click "Let's start"

### Step 3: Create Sample Article
1. Click **"Content Manager"** in left sidebar
2. Click **"Article"** under Collection Types
3. Click **"Create new entry"** button

### Step 4: Fill Article Details

**Copy this sample content:**

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
tamil-nadu-new-tech-center-opening
```

**Other Fields:**
- **Category**: Select "தொழில்நுட்பம்" (Technology)
- **Author**: Select or create "செய்தியாளர் குழு"
- **Featured**: Check the box ✅
- **Featured Image**: Upload any tech-related image (optional)

### Step 5: Publish Article
1. Click **"Save"** button (top right)
2. Click **"Publish"** button
3. Confirm publication

### Step 6: View on Website
1. Start main website: `npm run dev` (in main folder)
2. Open http://localhost:3000
3. Your article will appear on homepage! 🎉

## 🔧 Troubleshooting

**If article doesn't appear:**
1. Check if article is published (not draft)
2. Refresh the main website
3. Check browser console for errors
4. Verify Strapi is running on port 1337

**If Strapi won't start:**
1. Kill any processes on port 1337/1338
2. Delete `.tmp` folder in strapi-nambikkai
3. Run `npm run dev` again

---

**Your first Tamil news article is now live! 🎉**
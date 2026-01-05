# Strapi CMS to Website Connection - Manual Setup Guide

## ✅ Connection Status: WORKING
Your Strapi CMS is running and accessible at: http://13.200.250.14:1338
API Token is configured and working.

## 🚀 Deployment Steps for nambikkai.info

### 1. Upload Static Files to Hostinger
1. Go to your Hostinger control panel
2. Open File Manager
3. Navigate to `public_html` directory
4. Upload ALL contents from the `out` folder to `public_html`
5. Make sure `index.html` is in the root of `public_html`

### 2. Verify Website is Live
- Visit: https://nambikkai.info
- The website should load with sample data initially
- Check browser console for any errors

### 3. Test Strapi Connection (After Upload)
- Visit: https://nambikkai.info/test
- This page will test the live connection to your Strapi CMS
- You should see: "✅ Connected! Found X articles"

## 📝 Content Management Workflow

### Adding Content in Strapi:
1. Access Strapi Admin: http://13.200.250.14:1338/admin
2. Login with your admin credentials
3. Go to "Content Manager" > "Articles"
4. Click "Create new entry"
5. Fill in:
   - Title: Article title
   - Excerpt: Short description
   - Description: Full article content
   - Featured Image: Upload image
6. Click "Save" then "Publish"

### Content Will Appear On:
- Homepage: Latest articles section
- News page: All articles list
- Individual article pages

## 🔧 Manual Tasks Required:

### 1. Strapi Server Management
- Keep Strapi running on EC2: `npm run develop`
- For production: `npm run start`
- Set up PM2 for auto-restart: `pm2 start npm --name "strapi" -- run start`

### 2. Domain Configuration (If needed)
- Ensure nambikkai.info points to your Hostinger server
- Check DNS settings in Hostinger control panel

### 3. SSL Certificate (Recommended)
- Enable SSL in Hostinger control panel
- This will make your site https://nambikkai.info

## 🔍 Troubleshooting

### If articles don't appear:
1. Check Strapi is running: http://13.200.250.14:1338/admin
2. Verify articles are published (not just saved)
3. Check browser console for CORS errors
4. Test API directly: http://13.200.250.14:1338/api/articles

### If images don't load:
- Images are served from: http://13.200.250.14:1338/uploads/
- Make sure images are uploaded in Strapi admin

## ✅ Current Configuration:
- Strapi URL: http://13.200.250.14:1338
- API Token: Configured and working
- Website: Ready for deployment to nambikkai.info
- Test page: Available at /test after deployment

## 📞 Next Steps:
1. Upload the `out` folder contents to Hostinger
2. Visit nambikkai.info to verify it's working
3. Test the connection at nambikkai.info/test
4. Start adding content in Strapi admin panel

Your Tamil news website is ready for deployment!
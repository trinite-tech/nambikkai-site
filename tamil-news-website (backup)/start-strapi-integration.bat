@echo off
echo ========================================
echo Strapi CMS Integration - Complete Setup
echo ========================================
echo.

echo Step 1: Starting Strapi CMS...
start "Strapi CMS" cmd /k "cd strapi-nambikkai && echo Strapi Admin: http://localhost:1337/admin && npm run dev"

timeout /t 8 /nobreak > nul

echo Step 2: Starting Next.js Website...
start "Next.js Website" cmd /k "echo Website: http://localhost:3000 && npm run dev"

echo.
echo ========================================
echo 🎉 Complete Strapi Integration Ready!
echo ========================================
echo.
echo 🔗 Strapi Admin: http://localhost:1337/admin
echo 🌐 Homepage: http://localhost:3000
echo 📰 Sample Article: http://localhost:3000/article/sample-slug
echo 📂 Category Page: http://localhost:3000/category/technology
echo.
echo 📋 Features Implemented:
echo ✅ Central Strapi API helper (/lib/strapi.js)
echo ✅ Layout with Tamil fonts (/components/Layout.jsx)
echo ✅ ArticleCard component (/components/ArticleCard.jsx)
echo ✅ Homepage with featured/latest articles
echo ✅ Single article pages with SEO
echo ✅ Category listing pages
echo ✅ Rich text content rendering
echo ✅ Proper image URL handling
echo ✅ Server-side rendering (SSR)
echo.
echo Create articles in Strapi to see them on the website!
pause
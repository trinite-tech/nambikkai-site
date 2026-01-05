@echo off
echo ========================================
echo Starting Tamil News Website
echo ========================================
echo.

echo Step 1: Starting Strapi CMS...
start "Strapi CMS" cmd /k "cd strapi-nambikkai && npm run dev"

timeout /t 5 /nobreak > nul

echo Step 2: Starting News Website...
start "News Website" cmd /k "npm run dev"

echo.
echo ========================================
echo News Website Ready!
echo ========================================
echo.
echo 🔗 Strapi Admin: http://localhost:1337/admin
echo 🌐 Main Website: http://localhost:3000
echo 📰 News Page: http://localhost:3000/news
echo.
echo Create articles in Strapi to see them displayed!
pause
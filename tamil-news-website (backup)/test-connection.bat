@echo off
echo ========================================
echo Testing Strapi CMS Connection
echo ========================================
echo.

echo Step 1: Starting Strapi CMS...
start "Strapi CMS" cmd /k "cd strapi-nambikkai && echo Strapi Admin: http://localhost:1337/admin && npm run dev"

echo Waiting for Strapi to initialize...
timeout /t 8 /nobreak > nul

echo Step 2: Testing API connection...
node test-strapi.js

echo.
echo Step 3: Starting Next.js website...
start "Next.js Website" cmd /k "echo Website: http://localhost:3000 && npm run dev"

echo.
echo ========================================
echo 🎯 Connection Test Complete
echo ========================================
echo.
echo 🔗 Strapi Admin: http://localhost:1337/admin
echo 🌐 Website: http://localhost:3000
echo.
echo 📋 To test the connection:
echo 1. Create admin account in Strapi (first time)
echo 2. Add sample article using STRAPI-CONNECTION-GUIDE.md
echo 3. Check website - should show "Connected to Strapi CMS"
echo 4. Your article will appear on homepage!
echo.
pause
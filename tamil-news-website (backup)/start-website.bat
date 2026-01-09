@echo off
echo ========================================
echo Tamil News Website - Quick Start
echo ========================================
echo.

echo Step 1: Starting Strapi CMS...
start "Strapi CMS" cmd /k "cd strapi-nambikkai && echo Starting Strapi CMS on http://localhost:1337 && npm run dev"

echo Waiting for Strapi to initialize...
timeout /t 5 /nobreak > nul

echo Step 2: Starting Main Website...
start "Main Website" cmd /k "echo Starting Main Website on http://localhost:3000 && npm run dev"

echo.
echo ========================================
echo ✅ Both servers are starting!
echo ========================================
echo.
echo 📰 Strapi CMS Admin: http://localhost:1337/admin
echo 🌐 Main Website: http://localhost:3000
echo.
echo 📋 To post news:
echo 1. Go to Strapi admin and create articles
echo 2. Publish them to see on main website
echo 3. Check STRAPI-GUIDE.md for detailed steps
echo.
pause
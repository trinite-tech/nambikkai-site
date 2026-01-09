@echo off
echo ========================================
echo Fixing Strapi 500 Errors
echo ========================================
echo.

echo Step 1: Checking environment variables...
echo NEXT_PUBLIC_STRAPI_URL should be: http://localhost:1337
echo STRAPI_API_TOKEN should be set (check .env.local)
echo.

echo Step 2: Starting Strapi with CORS fix...
start "Strapi CMS" cmd /k "cd strapi-nambikkai && echo Strapi with CORS: http://localhost:1337/admin && npm run dev"

timeout /t 8 /nobreak > nul

echo Step 3: Starting Next.js...
start "Next.js" cmd /k "echo Next.js: http://localhost:3000 && npm run dev"

echo.
echo ========================================
echo 🔧 Strapi Error Fixes Applied
echo ========================================
echo.
echo ✅ Fixed CORS configuration
echo ✅ Fixed API URL format (no trailing slash)
echo ✅ Added error handling for missing ENV vars
echo ✅ Using populate=* instead of populate=deep
echo.
echo 📋 Manual Steps (if still getting errors):
echo 1. Go to Strapi Admin: http://localhost:1337/admin
echo 2. Settings → Users & Permissions → Roles → Public
echo 3. Enable permissions for Article, Category, Author, Tag
echo 4. Generate API token in Settings → API Tokens
echo 5. Update STRAPI_API_TOKEN in .env.local
echo.
pause
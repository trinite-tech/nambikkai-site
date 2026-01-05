@echo off
echo ========================================
echo Tamil News Website - Complete Test
echo ========================================
echo.

echo Step 1: Starting Strapi CMS...
start "Strapi CMS" cmd /k "cd strapi-nambikkai && echo Strapi Admin: http://localhost:1337/admin && npm run dev"

echo Waiting for Strapi to start...
timeout /t 10 /nobreak > nul

echo Step 2: Testing Strapi connection...
node test-strapi.js

echo.
echo Step 3: Starting Main Website...
start "Main Website" cmd /k "echo Main Website: http://localhost:3000 && npm run dev"

echo.
echo ========================================
echo 🎯 Testing Instructions
echo ========================================
echo.
echo 1. Wait for both servers to start
echo 2. Go to http://localhost:1337/admin
echo 3. Create admin account if first time
echo 4. Go to Content Manager > Article > Create new entry
echo 5. Add this sample article:
echo.
echo Title: தமிழ்நாட்டில் புதிய தொழில்நுட்ப மையம் திறப்பு
echo Category: தொழில்நுட்பம்
echo Content: [Copy from POST-SAMPLE-ARTICLE.md]
echo.
echo 6. Save and Publish
echo 7. Check http://localhost:3000 - article should appear!
echo.
pause
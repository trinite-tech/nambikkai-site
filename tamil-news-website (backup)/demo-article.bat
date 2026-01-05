@echo off
echo ========================================
echo Tamil News Website - Sample Article Demo
echo ========================================
echo.

echo Step 1: Starting Strapi CMS...
start "Strapi CMS" cmd /k "cd strapi-nambikkai && echo Strapi CMS Admin: http://localhost:1337/admin && npm run dev"

echo Waiting for Strapi to start...
timeout /t 8 /nobreak > nul

echo Step 2: Starting Main Website...
start "Main Website" cmd /k "echo Main Website: http://localhost:3000 && npm run dev"

echo.
echo ========================================
echo 📰 Ready to Post Sample Article!
echo ========================================
echo.
echo 🔗 Strapi Admin: http://localhost:1337/admin
echo 🌐 Main Website: http://localhost:3000
echo.
echo 📋 Next Steps:
echo 1. Go to Strapi admin (create account if first time)
echo 2. Follow POST-SAMPLE-ARTICLE.md guide
echo 3. Copy the sample Tamil article content
echo 4. Publish and see it on main website!
echo.
echo Sample Article Topic: "தமிழ்நாட்டில் புதிய தொழில்நுட்ப மையம் திறப்பு"
echo.
pause
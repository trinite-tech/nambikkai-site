@echo off
echo ========================================
echo Starting Tamil News Website Development
echo ========================================
echo.

echo Starting Strapi CMS on port 1337...
start "Strapi CMS" cmd /k "cd strapi-nambikkai && npm run dev"

timeout /t 3 /nobreak > nul

echo Starting Next.js App on port 3000...
start "Next.js App" cmd /k "npm run dev"

echo.
echo ========================================
echo Development servers are starting...
echo ========================================
echo.
echo Strapi CMS: http://localhost:1337/admin
echo Next.js App: http://localhost:3000
echo.
echo Press any key to close this window...
pause > nul
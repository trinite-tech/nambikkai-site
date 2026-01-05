@echo off
echo ========================================
echo Testing Strapi API Connection
echo ========================================
echo.

echo Starting Next.js server...
start "Next.js" cmd /k "npm run dev"

timeout /t 5 /nobreak > nul

echo Testing API endpoint...
curl http://localhost:3000/api/test-strapi

echo.
echo Test complete. Check the JSON response above.
pause
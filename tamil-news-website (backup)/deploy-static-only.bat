@echo off
echo === Static HTML Deployment Only ===

REM Delete any Next.js build files
if exist ".next" rmdir /s /q ".next"
if exist "out" rmdir /s /q "out"

echo ✓ Your static website is ready in public_html folder
echo.
echo Upload ONLY these files to Hostinger:
echo - public_html/index.html
echo - public_html/.htaccess  
echo - public_html/[all image files]
echo.
echo DO NOT upload:
echo - app/ folder
echo - components/ folder
echo - Any Next.js files
echo.
echo Your domain should show the Tamil news website immediately.
pause
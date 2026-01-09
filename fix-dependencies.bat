@echo off
echo Fixing Tamil News Website Dependencies...
echo.

echo Removing node_modules and package-lock.json...
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del package-lock.json

echo.
echo Installing dependencies...
npm install

echo.
echo Installing Tailwind CSS v3 and related packages...
npm install -D tailwindcss@^3.4.0 postcss@^8.5 autoprefixer@^10.4.20 tailwindcss-animate@^1.0.7

echo.
echo Dependencies fixed! You can now run:
echo npm run dev
echo.
pause
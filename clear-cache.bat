@echo off
echo Clearing Next.js build cache...

if exist .next rmdir /s /q .next
if exist node_modules\.cache rmdir /s /q node_modules\.cache

echo Cache cleared!
echo.
echo Starting development server...
npm run dev
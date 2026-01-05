@echo off
echo ========================================
echo Setting up Strapi CMS Instance
echo ========================================
echo.

cd strapi-nambikkai

echo Installing Strapi dependencies...
call npm install

echo.
echo Starting Strapi development server...
echo This will open Strapi admin at http://localhost:1337/admin
echo.
call npm run dev
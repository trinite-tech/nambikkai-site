@echo off
echo ========================================
echo Tamil News Website Setup Script
echo ========================================
echo.

echo Step 1: Installing main project dependencies...
call npm install
if %errorlevel% neq 0 (
    echo Error: Failed to install main dependencies
    pause
    exit /b 1
)
echo ✓ Main dependencies installed successfully
echo.

echo Step 2: Setting up Strapi CMS...
cd strapi-nambikkai
call npm install
if %errorlevel% neq 0 (
    echo Error: Failed to install Strapi dependencies
    pause
    exit /b 1
)
echo ✓ Strapi dependencies installed successfully
cd ..
echo.

echo Step 3: Creating necessary directories...
if not exist "public\uploads" mkdir public\uploads
if not exist "logs" mkdir logs
echo ✓ Directories created successfully
echo.

echo ========================================
echo Setup completed successfully!
echo ========================================
echo.
echo Next steps:
echo 1. Configure your Supabase database (run the SQL script)
echo 2. Update your .env.local file with actual API keys
echo 3. Start Strapi CMS: cd strapi-nambikkai && npm run dev
echo 4. Start the main application: npm run dev
echo.
echo For detailed instructions, see the README below.
echo.
pause
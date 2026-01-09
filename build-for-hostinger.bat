@echo off
echo Building Tamil News Website for Hostinger...

REM Install dependencies
npm install

REM Build the project
npm run build

REM Export static files (if needed)
npx next export

echo Build complete! Upload the 'out' folder to Hostinger.
pause
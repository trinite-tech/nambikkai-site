# Tamil News Website - Hostinger Deployment Script
# Run this in PowerShell

Write-Host "=== Tamil News Website - Hostinger Deployment ===" -ForegroundColor Green

# Step 1: Build the website
Write-Host "Step 1: Building website..." -ForegroundColor Yellow
npm install
npm run build

# Step 2: Check if build was successful
if (Test-Path "out") {
    Write-Host "✓ Build successful! 'out' folder created." -ForegroundColor Green
    
    # Step 3: Show next steps
    Write-Host "`nStep 2: Upload to Hostinger" -ForegroundColor Yellow
    Write-Host "1. Login to your Hostinger control panel"
    Write-Host "2. Go to File Manager"
    Write-Host "3. Navigate to 'public_html' folder"
    Write-Host "4. Upload ALL contents from the 'out' folder"
    Write-Host "5. Make sure index.html is in the root of public_html"
    
    Write-Host "`nStep 3: Configure your domain" -ForegroundColor Yellow
    Write-Host "1. Update .env.production with your actual domain"
    Write-Host "2. Enable SSL certificate in Hostinger"
    Write-Host "3. Test your website"
    
    Write-Host "`n✓ Ready for deployment!" -ForegroundColor Green
    Write-Host "Files to upload are in the 'out' folder" -ForegroundColor Cyan
    
    # Open the out folder
    Start-Process "out"
} else {
    Write-Host "✗ Build failed! Check for errors above." -ForegroundColor Red
}

Read-Host "Press Enter to continue..."
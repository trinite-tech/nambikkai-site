# Get API Token from EC2 Strapi Instance

## Step 1: Access your EC2 Strapi Admin
1. Open browser and go to: http://13.200.250.14:1338/admin
2. Login with your admin credentials

## Step 2: Create/Get API Token
1. In Strapi admin, go to "Settings" (gear icon in sidebar)
2. Click on "API Tokens" under "Global Settings"
3. Click "Create new API Token"
4. Fill in:
   - Name: "Website API Token"
   - Description: "Token for nambikkai.info website"
   - Token duration: "Unlimited"
   - Token type: "Read-only" or "Full access"
5. Click "Save"
6. Copy the generated token (it will only show once!)

## Step 3: Update Website Configuration
Once you have the token, I'll update the website configuration.

## Alternative: Use Existing Token
If you already have a token, you can find it in:
- Strapi Admin > Settings > API Tokens
- Look for existing tokens and regenerate if needed

## Current Status:
- EC2 Strapi URL: http://13.200.250.14:1338 ✅
- Connection: Working ✅
- Articles: 3 found ✅
- Need: Proper API token from your EC2 instance

Please get the API token from your EC2 Strapi admin panel and share it.
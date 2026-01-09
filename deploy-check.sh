#!/bin/bash

echo "🚀 Preparing for Amplify deployment..."

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Run build to check for errors
echo "🔨 Building application..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful! Ready for Amplify deployment."
    echo ""
    echo "Next steps:"
    echo "1. Push to GitHub: git add . && git commit -m 'Deploy to Amplify' && git push"
    echo "2. Amplify will automatically deploy from your GitHub repository"
else
    echo "❌ Build failed! Please fix errors before deploying."
    exit 1
fi
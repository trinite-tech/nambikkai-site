#!/bin/bash

# Build and deploy to Hostinger
echo "Building for production..."
npm run build

echo "Exporting static files..."
npm run export

echo "Files ready for upload to nambikkai.info"
echo "Upload the 'out' folder contents to your Hostinger public_html directory"
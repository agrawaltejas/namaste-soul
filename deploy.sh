#!/bin/bash

# Manual deployment script for GitHub Pages
# This script builds the project and deploys it manually using gh-pages

echo "🏗️  Building the project..."
npm run build

echo "📦 Checking build output..."
ls -la dist/

echo "🔍 Verifying index.html..."
head -5 dist/index.html

echo "🚀 Deploying to GitHub Pages..."
npx gh-pages -d dist

echo "✅ Deployment complete!"
echo "🌐 Your site should be available at: https://www.namastesoul.org"

#!/bin/bash
# ============================================================
# Hostinger Deployment Script - Dr. Ahmed Abdellatif
# Run this script directly on the Hostinger server via SSH
# ============================================================

set -e

APP_DIR="/home/u614350323/domains/drahmedabdellatif.com/nodejs"
REPO_URL="https://github.com/ziadkhalifaa/drahmedabdellatif-web"

echo "=================================================="
echo "🚀 Starting deployment on Hostinger..."
echo "=================================================="

# Step 1: Go to app directory
cd "$APP_DIR"
echo "📁 Working directory: $(pwd)"

# Step 2: Check current git status
echo ""
echo "📋 Current git status:"
git log --oneline -5

# Step 3: Stash any local changes and pull latest
echo ""
echo "⬇️  Pulling latest code from GitHub..."
git fetch origin main
git reset --hard origin/main
echo "✅ Code updated to latest commit: $(git log --oneline -1)"

# Step 4: Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install --production=false

# Step 5: Build the application
echo ""
echo "🔨 Building Next.js standalone application..."
npm run build

# Step 6: Restart the application via PM2
echo ""
echo "🔄 Restarting application via PM2..."
if pm2 list | grep -q "online\|stopped\|errored"; then
    pm2 restart all --update-env
    echo "✅ PM2 processes restarted"
else
    # Start fresh if no PM2 processes exist
    cd .next/standalone
    pm2 start server.js --name "drahmedabdellatif" --env production
    echo "✅ PM2 process started fresh"
fi

# Step 7: Save PM2 process list
pm2 save

# Step 8: Show final status
echo ""
echo "=================================================="
echo "✅ Deployment completed successfully!"
echo "=================================================="
pm2 list
echo ""
echo "📊 Application logs (last 20 lines):"
pm2 logs --nostream --lines 20

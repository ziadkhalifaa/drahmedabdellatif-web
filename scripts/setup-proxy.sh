#!/bin/bash
# Setup Reverse Proxy and PM2 for Next.js on Hostinger

NODEJS_DIR="/home/u614350323/domains/drahmedabdellatif.com/nodejs"
HTACCESS="/home/u614350323/domains/drahmedabdellatif.com/public_html/.htaccess"
NODE_BIN="/opt/alt/alt-nodejs20/root/bin/node"
NPX_BIN="/opt/alt/alt-nodejs20/root/bin/npx"

export PATH="/opt/alt/alt-nodejs20/root/bin:$PATH"

echo "=== Killing old processes ==="
pkill -9 node
pkill -9 lsphp

echo "=== Starting Next.js Standalone via PM2 ==="
cd "$NODEJS_DIR"
export PORT=4000
export NODE_ENV=production
export UV_THREADPOOL_SIZE=1
export NODE_OPTIONS="--max-old-space-size=256"

# Kill any existing PM2 instances
$NPX_BIN -y pm2 kill

# Start Next.js on Port 4000
$NPX_BIN -y pm2 start server.js --name "next-app" --env production

echo "=== Updating .htaccess for Reverse Proxy ==="
cat > "$HTACCESS" << 'EOF'
RewriteEngine On
RewriteRule ^(.*)$ http://127.0.0.1:4000/$1 [P,L]
EOF

echo "=== Saving PM2 state ==="
$NPX_BIN -y pm2 save

echo "=== Done! Site is now proxied to port 4000 ==="
$NPX_BIN -y pm2 list

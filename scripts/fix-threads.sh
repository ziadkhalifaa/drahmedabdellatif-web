#!/bin/bash
# Fix pthread/thread exhaustion on Hostinger Passenger

NODEJS_DIR="/home/u614350323/domains/drahmedabdellatif.com/nodejs"

echo "=== Disabling Worker Threads in server.js ==="

# Patch server.js to set UV_THREADPOOL_SIZE before anything else
cat > "$NODEJS_DIR/server.js" << 'SERVEREOF'
const path = require('path');
const fs = require('fs');

// *** Critical for Hostinger shared hosting: limit thread pool ***
process.env.UV_THREADPOOL_SIZE = '1';
process.env.NODE_OPTIONS = '--max-old-space-size=256';

// Global error handlers
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

// Set environment variables
process.env.NODE_ENV = 'production';
process.env.PORT = process.env.PORT || '3000';
process.env.HOSTNAME = '0.0.0.0';

console.log('--- Process Info ---');
console.log('Node Version:', process.version);
console.log('Memory Usage:', JSON.stringify(process.memoryUsage()));
console.log('ENV PORT:', process.env.PORT);
console.log('UV_THREADPOOL_SIZE:', process.env.UV_THREADPOOL_SIZE);
console.log('--------------------');

const candidatePaths = [
  path.join(__dirname, '.next/standalone/server.js'),
  path.join(__dirname, 'apps/web/.next/standalone/server.js'),
];

const standaloneServerPath = candidatePaths.find(p => fs.existsSync(p));

if (standaloneServerPath) {
  console.log('Starting Standalone Next.js Server...');
  console.log('Path:', standaloneServerPath);

  try {
    const standaloneDir = path.dirname(standaloneServerPath);
    process.chdir(standaloneDir);
    console.log('Changed dir to:', standaloneDir);
    require(standaloneServerPath);
    console.log('Standalone Next.js server loaded successfully');
  } catch (err) {
    console.error('Failed to start standalone server:', err);
    process.exit(1);
  }
} else {
  console.error('Standalone build not found. Searched:');
  candidatePaths.forEach(p => console.error('  -', p));
  process.exit(1);
}
SERVEREOF

echo "=== server.js updated ==="
echo ""

# Restore correct .htaccess (remove NODE_OPTIONS override that conflicts)
HTACCESS="/home/u614350323/domains/drahmedabdellatif.com/public_html/.htaccess"
echo 'PassengerAppRoot /home/u614350323/domains/drahmedabdellatif.com/nodejs' > "$HTACCESS"
echo 'PassengerAppType node' >> "$HTACCESS"
echo 'PassengerNodejs /opt/alt/alt-nodejs20/root/bin/node' >> "$HTACCESS"
echo 'PassengerStartupFile server.js' >> "$HTACCESS"
echo 'PassengerBaseURI /' >> "$HTACCESS"
echo 'PassengerRestartDir /home/u614350323/domains/drahmedabdellatif.com/nodejs/tmp' >> "$HTACCESS"
echo 'SetEnv LSNODE_CONSOLE_LOG console.log' >> "$HTACCESS"
echo 'RewriteRule ^\.builds - [F,L]' >> "$HTACCESS"

echo "=== .htaccess restored ==="
cat "$HTACCESS"

echo ""
echo "=== Triggering Passenger restart ==="
touch "$NODEJS_DIR/tmp/restart.txt"
echo "Done at: $(date)"

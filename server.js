const path = require('path');
const fs = require('fs');

// Set environment variables
process.env.NODE_ENV = 'production';
process.env.PORT = process.env.PORT || '3000';

const standaloneServerPath = path.join(__dirname, 'apps/web/.next/standalone/server.js');

if (fs.existsSync(standaloneServerPath)) {
  console.log('🚀 Starting Standalone Next.js Server...');
  console.log('Path:', standaloneServerPath);
  
  // In standalone mode, Next.js expects to be run from the standalone directory
  // to correctly find the node_modules and .next folder
  process.chdir(path.join(__dirname, 'apps/web/.next/standalone'));
  
  require('./server.js');
} else {
  console.error('❌ Standalone server not found at:', standaloneServerPath);
  console.error('Please ensure the build command finished successfully and scripts/copy-assets.mjs ran.');
  
  // Fallback for Hostinger: bind to port anyway to avoid 503 while we debug
  const http = require('http');
  http.createServer((req, res) => {
    res.writeHead(503, { 'Content-Type': 'text/plain' });
    res.end('Server initialization in progress or failed. Check logs.');
  }).listen(process.env.PORT);
}

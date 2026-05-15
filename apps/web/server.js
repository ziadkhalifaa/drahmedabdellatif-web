const path = require('path');
const fs = require('fs');

// Global error handlers
process.on('unhandledRejection', (reason, promise) => {
  console.error('💥 Unhandled Rejection at:', promise, 'reason:', reason);
});
process.on('uncaughtException', (err) => {
  console.error('💥 Uncaught Exception:', err);
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
console.log('__dirname:', __dirname);
console.log('--------------------');

// When deployed via git subtree push --prefix apps/web,
// the contents of apps/web/ are at the repo root.
// So the standalone server is at .next/standalone/server.js
// relative to THIS file's directory.
const candidatePaths = [
  // Hostinger: web_repo root = apps/web contents
  path.join(__dirname, '.next/standalone/server.js'),
  // Fallback: monorepo layout (legacy/manual upload)
  path.join(__dirname, 'apps/web/.next/standalone/server.js'),
];

const standaloneServerPath = candidatePaths.find(p => fs.existsSync(p));

if (standaloneServerPath) {
  console.log('🚀 Starting Standalone Next.js Server...');
  console.log('Path:', standaloneServerPath);

  try {
    const standaloneDir = path.dirname(standaloneServerPath);
    process.chdir(standaloneDir);
    console.log('Changed dir to:', standaloneDir);

    require(standaloneServerPath);
    console.log('✅ Standalone Next.js server loaded successfully');
  } catch (err) {
    console.error('💥 Failed to start standalone server:', err);
    process.exit(1);
  }
} else {
  console.error('❌ Standalone build not found. Searched:');
  candidatePaths.forEach(p => console.error('  -', p));
  console.error('Run npm run build first.');
  process.exit(1);
}

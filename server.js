const { spawn } = require('child_process');
const path = require('path');

const port = process.env.PORT || 3000;
const webDir = path.join(__dirname, 'apps', 'web');

// Find next binary - check root node_modules first (npm workspaces hoisting), then web
const nextBin = path.join(__dirname, 'node_modules', '.bin', 'next');

console.log(`Starting Next.js from: ${webDir}`);
console.log(`Using next binary: ${nextBin}`);
console.log(`Port: ${port}`);

const child = spawn(nextBin, ['start', '-p', String(port)], {
  cwd: webDir,
  stdio: 'inherit',
  env: { ...process.env, PORT: String(port) }
});

child.on('close', (code) => {
  console.log(`Next.js process exited with code ${code}`);
  process.exit(code || 0);
});

child.on('error', (err) => {
  console.error('Failed to start Next.js:', err.message);
  // Try alternative: use npx
  const alt = spawn('npx', ['next', 'start', '-p', String(port)], {
    cwd: webDir,
    stdio: 'inherit',
    env: { ...process.env, PORT: String(port) }
  });
  alt.on('close', (code) => process.exit(code || 0));
});

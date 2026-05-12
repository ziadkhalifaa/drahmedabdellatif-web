const { createServer } = require('http');
const { parse } = require('url');
const path = require('path');

const port = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production';
const dir = path.join(__dirname, 'apps', 'web');

// Require next from root node_modules (added as root dependency)
const next = require('next');

const app = next({ dev, dir });
const handle = app.getRequestHandler();

console.log(`Starting Next.js app (dev=${dev}) from dir: ${dir}`);
console.log(`PORT: ${port}`);

app.prepare()
  .then(() => {
    createServer((req, res) => {
      try {
        const parsedUrl = parse(req.url, true);
        handle(req, res, parsedUrl);
      } catch (err) {
        console.error('Error handling request:', err);
        res.statusCode = 500;
        res.end('Internal Server Error');
      }
    }).listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Failed to prepare Next.js app:', err);
    process.exit(1);
  });

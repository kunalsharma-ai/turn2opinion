// Zero-dependency static server that behaves like the production host:
// /about/ -> dist/client/about/index.html, unknown URLs -> 404.html with HTTP 404.
// Usage: npm run preview   (PORT=4173 by default)
import { createServer } from 'node:http';
import { createReadStream, existsSync, statSync } from 'node:fs';
import { extname, join, normalize, resolve } from 'node:path';

const dir = resolve(process.argv[2] || 'dist/client');
const port = Number(process.env.PORT || 4173);
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webmanifest': 'application/manifest+json'
};

createServer((req, res) => {
  const url = decodeURIComponent((req.url || '/').split('?')[0]);
  let file = normalize(join(dir, url));
  if (!file.startsWith(dir)) {
    res.writeHead(403).end();
    return;
  }
  // Redirect "/about" -> "/about/" (matches canonical URLs)
  if (!extname(url) && !url.endsWith('/') && existsSync(join(file, 'index.html'))) {
    res.writeHead(301, { Location: url + '/' }).end();
    return;
  }
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html');
  let status = 200;
  if (!existsSync(file)) {
    file = join(dir, '404.html');
    status = 404;
    if (!existsSync(file)) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Not found');
      return;
    }
  }
  const type = TYPES[extname(file)] || 'application/octet-stream';
  const cache = /\/assets\//.test(file) ? 'public, max-age=31536000, immutable' : 'no-cache';
  res.writeHead(status, { 'Content-Type': type, 'Cache-Control': cache });
  createReadStream(file).pipe(res);
}).listen(port, () => console.log(`Preview: http://localhost:${port}  (serving ${dir})`));

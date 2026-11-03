import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { documentApi } from './documents.mjs';
import { feedbackApi } from './feedback.mjs';

const root = resolve('dist');
const api = documentApi();
const feedback = feedbackApi();
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.otf': 'font/otf', '.png': 'image/png', '.ico': 'image/x-icon' };
const server = createServer((req, res) => {
  feedback(req, res, () => api(req, res, async () => {
    if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405); return res.end(); }
    try {
      const path = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
      const file = resolve(root, `.${path}`);
      if (file !== root && !file.startsWith(root + sep)) { res.writeHead(403); return res.end(); }
      let body;
      let type;
      try { body = await readFile(file); type = types[extname(file)] || 'application/octet-stream'; }
      catch { if (extname(path)) { res.writeHead(404); return res.end(); } body = await readFile(resolve(root, 'index.html')); type = types['.html']; }
      res.writeHead(200, { 'Content-Type': type, 'X-Content-Type-Options': 'nosniff' });
      res.end(req.method === 'HEAD' ? undefined : body);
    } catch { res.writeHead(500); res.end('Unable to serve application. Run npm run build first.'); }
  }));
});
server.requestTimeout = 60_000;
server.listen(Number(process.env.PORT || 3000), process.env.HOST || '127.0.0.1', () => console.log(`LearnSpace: http://${process.env.HOST || '127.0.0.1'}:${process.env.PORT || 3000}`));

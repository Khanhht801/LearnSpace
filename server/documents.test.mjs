import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { documentApi } from './documents.mjs';

test('legacy document endpoints stay closed without intercepting other routes', async () => {
  const api = documentApi();
  const server = createServer((req, res) => api(req, res, () => { res.writeHead(404); res.end(); }));
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  try {
    for (const [path, method] of [['/api/documents', 'GET'], ['/api/documents', 'POST'], ['/api/documents/123/file', 'GET']]) {
      const response = await fetch(base + path, { method });
      assert.equal(response.status, 410);
      assert.equal((await response.json()).error, 'Chức năng chia sẻ tài liệu chưa được mở.');
    }
    assert.equal((await fetch(base + '/api/documents-other')).status, 404);
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
});

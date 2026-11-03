import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { documentApi } from './documents.mjs';

test('upload, persistence, download and invalid submissions', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'learnspace-upload-test-'));
  let api = documentApi(directory);
  const server = createServer((req, res) => api(req, res));
  await new Promise((done) => server.listen(0, '127.0.0.1', done));
  const base = `http://127.0.0.1:${server.address().port}`;
  function form(name = 'lesson.md', content = '# Useful learning notes', consent = true) {
    const data = new FormData();
    for (const [key, value] of Object.entries({ title: 'Learning notes', description: 'A detailed introduction to learning React components.', author: 'Contributor', topic: 'React', source: 'Original notes', usageNote: 'Share with attribution', level: 'Cơ bản' })) data.set(key, value);
    if (consent) data.set('permission', 'on');
    data.set('file', new Blob([content]), name);
    return data;
  }
  try {
    assert.deepEqual(await (await fetch(`${base}/api/documents`)).json(), []);
    const response = await fetch(`${base}/api/documents`, { method: 'POST', body: form() });
    assert.equal(response.status, 201);
    const item = await response.json();
    assert.equal(item.title, 'Learning notes');
    api = documentApi(directory);
    const list = await (await fetch(`${base}/api/documents`)).json();
    assert.equal(list.length, 1);
    assert.equal(list[0].id, item.id);
    const download = await fetch(base + item.fileUrl);
    assert.equal(await download.text(), '# Useful learning notes');
    assert.match(download.headers.get('content-disposition'), /^attachment/);
    for (const data of [form('bad.html', '<script>alert(1)</script>'), form('bad.pdf', 'not a PDF'), form('notes.md', 'notes', false), form('large.txt', 'a'.repeat(10 * 1024 * 1024 + 1))]) {
      const rejected = await fetch(`${base}/api/documents`, { method: 'POST', body: data });
      assert.ok([400, 413].includes(rejected.status));
    }
    const crossOrigin = await fetch(`${base}/api/documents`, { method: 'POST', headers: { Origin: 'https://unrelated.example' }, body: form() });
    assert.equal(crossOrigin.status, 403);
    assert.equal((await (await fetch(`${base}/api/documents`)).json()).length, 1);
    assert.equal((await fetch(`${base}/api/documents/00000000-0000-0000-0000-000000000000/file`)).status, 404);
  } finally {
    await new Promise((done) => server.close(done));
    await rm(directory, { recursive: true, force: true });
  }
});

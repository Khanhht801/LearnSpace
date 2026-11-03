import { mkdir, readdir, readFile, writeFile, unlink } from 'node:fs/promises';
import { resolve, extname } from 'node:path';
import { randomUUID } from 'node:crypto';

export const MAX_FILE_SIZE = 10 * 1024 * 1024;
const extensions = new Set(['.pdf', '.txt', '.md', '.docx', '.pptx', '.xlsx']);

export function documentApi(directory = resolve('data/documents')) {
  const reply = (res, status, data) => { res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' }); res.end(JSON.stringify(data)); };
  return async (req, res, next = () => { res.writeHead(404); res.end(); }) => {
    const path = new URL(req.url, 'http://localhost').pathname;
    if (!path.startsWith('/api/documents')) return next();
    try {
      await mkdir(directory, { recursive: true });
      if (path === '/api/documents' && req.method === 'GET') {
        const names = (await readdir(directory)).filter((name) => name.endsWith('.json'));
        const items = await Promise.all(names.map(async (name) => JSON.parse(await readFile(resolve(directory, name), 'utf8'))));
        return reply(res, 200, items.sort((a, b) => b.createdAt.localeCompare(a.createdAt)));
      }
      const download = path.match(/^\/api\/documents\/([a-f0-9-]{36})\/file$/);
      if (download && req.method === 'GET') {
        const item = JSON.parse(await readFile(resolve(directory, `${download[1]}.json`), 'utf8'));
        const buffer = await readFile(resolve(directory, `${item.id}${item.extension}`));
        res.writeHead(200, { 'Content-Type': 'application/octet-stream', 'Content-Length': buffer.length, 'Content-Disposition': `attachment; filename="document${item.extension}"; filename*=UTF-8''${encodeURIComponent(item.fileName)}`, 'X-Content-Type-Options': 'nosniff', 'Content-Security-Policy': "sandbox; default-src 'none'" });
        return res.end(buffer);
      }
      if (path !== '/api/documents' || req.method !== 'POST') return reply(res, 404, { error: 'Không tìm thấy yêu cầu.' });
      if (req.headers.origin && new URL(req.headers.origin).host !== req.headers.host) return reply(res, 403, { error: 'Nguồn yêu cầu không hợp lệ.' });
      if (!req.headers['content-type']?.startsWith('multipart/form-data')) return reply(res, 415, { error: 'Vui lòng gửi tài liệu bằng biểu mẫu.' });
      const chunks = [];
      let size = 0;
      for await (const chunk of req) {
        size += chunk.length;
        if (size > MAX_FILE_SIZE + 64 * 1024) return reply(res, 413, { error: 'File vượt quá giới hạn 10 MB.' });
        chunks.push(chunk);
      }
      let form;
      try { form = await new Request('http://localhost', { method: 'POST', headers: { 'Content-Type': req.headers['content-type'] }, body: Buffer.concat(chunks) }).formData(); }
      catch { return reply(res, 400, { error: 'Biểu mẫu không hợp lệ.' }); }
      const fields = {};
      for (const [key, min, max] of [['title', 3, 120], ['description', 20, 2000], ['author', 2, 80], ['topic', 2, 80], ['source', 2, 300], ['usageNote', 2, 300]]) {
        const value = form.get(key);
        if (typeof value !== 'string' || value.trim().length < min || value.trim().length > max) return reply(res, 400, { error: `Thông tin ${key} không hợp lệ (${min}–${max} ký tự).` });
        fields[key] = value.trim();
      }
      if (!['Cơ bản', 'Trung cấp', 'Nâng cao', 'Mọi trình độ'].includes(form.get('level')) || form.get('permission') !== 'on') return reply(res, 400, { error: 'Chọn trình độ và xác nhận quyền chia sẻ tài liệu.' });
      const file = form.get('file');
      if (!file || typeof file === 'string' || !file.size || file.size > MAX_FILE_SIZE) return reply(res, 400, { error: 'Chọn file có dung lượng từ 1 byte đến 10 MB.' });
      const extension = extname(file.name).toLowerCase();
      if (!extensions.has(extension)) return reply(res, 400, { error: 'Chỉ hỗ trợ PDF, TXT, MD, DOCX, PPTX, XLSX.' });
      const buffer = Buffer.from(await file.arrayBuffer());
      if ((extension === '.pdf' && !buffer.subarray(0, 5).equals(Buffer.from('%PDF-'))) || (['.docx', '.pptx', '.xlsx'].includes(extension) && buffer.subarray(0, 2).toString() !== 'PK') || (['.txt', '.md'].includes(extension) && buffer.includes(0))) return reply(res, 400, { error: 'Nội dung file không phù hợp định dạng đã chọn.' });
      const id = randomUUID();
      const item = { id, ...fields, level: form.get('level'), fileName: file.name.slice(0, 180), fileSize: file.size, extension, createdAt: new Date().toISOString(), fileUrl: `/api/documents/${id}/file` };
      await writeFile(resolve(directory, `${id}${extension}`), buffer, { flag: 'wx' });
      try { await writeFile(resolve(directory, `${id}.json`), JSON.stringify(item), { flag: 'wx' }); }
      catch (error) { await unlink(resolve(directory, `${id}${extension}`)); throw error; }
      return reply(res, 201, item);
    } catch (error) {
      if (!res.headersSent) reply(res, error.code === 'ENOENT' ? 404 : 500, { error: error.code === 'ENOENT' ? 'Tài liệu không tồn tại.' : 'Không thể xử lý tài liệu. Vui lòng thử lại.' });
    }
  };
}

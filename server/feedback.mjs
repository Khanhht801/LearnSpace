import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { randomUUID } from 'node:crypto';

export function feedbackApi(directory = resolve('data/feedback')) {
  return async (req, res, next) => {
    if (new URL(req.url, 'http://localhost').pathname !== '/api/feedback') return next();
    const reply = (status, data) => { res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' }); res.end(JSON.stringify(data)); };
    if (req.method !== 'POST') return reply(405, { error: 'Phương thức không được hỗ trợ.' });
    try {
      if (req.headers.origin && new URL(req.headers.origin).host !== req.headers.host) return reply(403, { error: 'Nguồn yêu cầu không hợp lệ.' });
      if (!req.headers['content-type']?.startsWith('application/json')) return reply(415, { error: 'Dữ liệu không hợp lệ.' });
      let size = 0;
      const chunks = [];
      for await (const chunk of req) {
        size += chunk.length;
        if (size > 16384) return reply(413, { error: 'Nội dung quá dài.' });
        chunks.push(chunk);
      }
      let body;
      try { body = JSON.parse(Buffer.concat(chunks).toString('utf8')); } catch { return reply(400, { error: 'Dữ liệu không hợp lệ.' }); }
      if (!body || !['content', 'feature', 'other'].includes(body.category) || typeof body.message !== 'string' || body.message.trim().length < 10 || body.message.trim().length > 2000) return reply(400, { error: 'Chọn loại góp ý và nhập nội dung từ 10 đến 2.000 ký tự.' });
      const item = { id: randomUUID(), category: body.category, message: body.message.trim(), createdAt: new Date().toISOString() };
      await mkdir(directory, { recursive: true });
      await writeFile(resolve(directory, `${item.id}.json`), JSON.stringify(item), { flag: 'wx' });
      return reply(201, { id: item.id });
    } catch { return reply(500, { error: 'Chưa thể lưu góp ý. Vui lòng thử lại.' }); }
  };
}

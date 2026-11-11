// The legacy community upload API is closed until a reviewed publishing flow exists.
// Previously stored files are left untouched and are not publicly served by this API.
export function documentApi() {
  return async (req, res, next = () => { res.writeHead(404); res.end(); }) => {
    const path = new URL(req.url, 'http://localhost').pathname;
    if (path !== '/api/documents' && !path.startsWith('/api/documents/')) return next();
    res.writeHead(410, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
    res.end(JSON.stringify({ error: 'Chức năng chia sẻ tài liệu chưa được mở.' }));
  };
}

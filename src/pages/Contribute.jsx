import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import { LibraryBoundary } from '../hooks/LibraryProvider.jsx';
import { useLibrary } from '../hooks/useLibrary.js';
import { createContribution } from '../lib/contributions.js';
import './community.css';

export default function Contribute() {
  const { session } = useAuth();
  const { topics } = useLibrary();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  async function submit(event) {
    event.preventDefault();
    if (busy) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    setBusy(true); setError(''); setSent(false);
    try {
      await createContribution(session.user.id, {
        category_id: Number(data.get('category')), title: data.get('title').trim(), description: data.get('description').trim(),
        author: data.get('author').trim(), source: data.get('source').trim(), usage_note: data.get('usage').trim(),
      }, data.get('file'));
      form.reset(); setSent(true);
    } catch (reason) {
      setError(reason instanceof Error && reason.message.startsWith('Tài liệu đã được tạo') ? reason.message : reason instanceof Error && (reason.message.startsWith('Chọn file') || reason.message.startsWith('File không')) ? reason.message : 'Chưa thể gửi tài liệu. Vui lòng kiểm tra thông tin và thử lại.');
    } finally { setBusy(false); }
  }

  return <div className="community-page"><div className="community-inner">
    <p className="eyebrow">CÙNG CHIA SẺ KIẾN THỨC</p><h1>Gửi tài liệu để xét duyệt</h1>
    <p>Tài liệu PDF tối đa 10 MB. Tài liệu chỉ xuất hiện trong thư viện sau khi được quản trị viên kiểm tra và duyệt.</p>
    <Link to="/my-contributions">Xem tài liệu đã gửi →</Link>
    <LibraryBoundary><form className="community-form" onSubmit={submit} aria-busy={busy}>
      <fieldset disabled={busy}>
        <label htmlFor="contribution-title">Tiêu đề</label><input id="contribution-title" name="title" minLength={3} maxLength={120} required />
        <label htmlFor="contribution-category">Chủ đề</label><select id="contribution-category" name="category" defaultValue="" required><option value="" disabled>Chọn chủ đề</option>{topics.map((topic) => <option key={topic.categoryId} value={topic.categoryId}>{topic.title}</option>)}</select>
        <label htmlFor="contribution-description">Mô tả nội dung</label><textarea id="contribution-description" name="description" minLength={20} maxLength={2000} required />
        <label htmlFor="contribution-author">Tác giả</label><input id="contribution-author" name="author" minLength={2} maxLength={100} required />
        <label htmlFor="contribution-source">Nguồn tài liệu</label><input id="contribution-source" name="source" minLength={2} maxLength={300} required />
        <label htmlFor="contribution-usage">Điều kiện sử dụng</label><input id="contribution-usage" name="usage" minLength={2} maxLength={300} required />
        <label htmlFor="contribution-file">File PDF</label><input id="contribution-file" name="file" type="file" accept=".pdf,application/pdf" required />
        <label className="community-consent"><input type="checkbox" required /> <span>Tôi có quyền chia sẻ tài liệu và đồng ý để tài liệu được công khai sau khi duyệt.</span></label>
        <button type="submit">{busy ? 'Đang gửi…' : 'Gửi tài liệu'}</button>
      </fieldset>
      {error && <p className="community-error" role="alert">{error} <Link to="/my-contributions">Tài liệu đã gửi</Link></p>}
      {sent && <p role="status">Đã gửi tài liệu để xét duyệt. <Link to="/my-contributions">Xem trạng thái</Link></p>}
    </form></LibraryBoundary>
  </div></div>;
}

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../utils/supabase.js';
import { finishContribution, uploadContribution } from '../lib/contributions.js';
import { useAuth } from '../hooks/useAuth.js';
import './community.css';

const labels = { uploading: 'Chưa gửi xong', pending: 'Đang chờ duyệt', approved: 'Đã duyệt', rejected: 'Không được duyệt' };

export default function MyContributions() {
  const { session } = useAuth();
  const userId = session.user.id;
  const [state, setState] = useState({ items: [], loading: true, error: '' });
  const [revision, setRevision] = useState(0);
  const [busy, setBusy] = useState('');
  const [notice, setNotice] = useState('');
  useEffect(() => {
    let active = true;
    supabase.from('contributions').select('id,title,status,review_note,document_id,file_path,created_at').eq('user_id', userId).order('created_at', { ascending: false }).then(({ data, error }) => {
      if (active) setState({ items: data || [], loading: false, error: error ? 'Chưa thể tải danh sách.' : '' });
    }).catch(() => { if (active) setState({ items: [], loading: false, error: 'Chưa thể tải danh sách.' }); });
    return () => { active = false; };
  }, [revision, userId]);

  async function retry(item, file) {
    if (busy) return;
    setBusy(item.id); setNotice('');
    try {
      if (file?.size) await uploadContribution(item.id, item.file_path, file);
      else await finishContribution(item.id);
      setRevision((value) => value + 1);
      setNotice('Đã gửi tài liệu để xét duyệt.');
    } catch {
      setNotice('Chưa thể hoàn tất. Nếu file chưa được tải lên, hãy chọn file PDF và thử lại; nếu đã tải, thử gửi lại không chọn file.');
    } finally { setBusy(''); }
  }

  return <div className="community-page"><div className="community-inner">
    <p className="eyebrow">ĐÓNG GÓP CỦA BẠN</p><h1>Tài liệu đã gửi</h1><Link to="/contribute">Gửi tài liệu mới →</Link>
    {notice && <p role="status">{notice}</p>}
    {state.loading ? <p role="status">Đang tải danh sách…</p> : state.error ? <div role="alert"><p>{state.error}</p><button type="button" onClick={() => setRevision((value) => value + 1)}>Thử lại</button></div> : state.items.length === 0 ? <p>Bạn chưa gửi tài liệu nào.</p> : state.items.map((item) => <article className="community-card" key={item.id}>
      <h2>{item.title}</h2><p>Trạng thái: <strong>{labels[item.status] || item.status}</strong></p>
      {item.review_note && <p>Phản hồi: {item.review_note}</p>}
      {item.status === 'approved' && item.document_id && <Link to={`/courses/${item.document_id}`}>Mở tài liệu →</Link>}
      {item.status === 'uploading' && <form onSubmit={(event) => { event.preventDefault(); retry(item, new FormData(event.currentTarget).get('file')); }}><p>Nếu file đã tải xong, gửi lại không cần chọn file. Nếu chưa, chọn PDF để tải lại.</p><label htmlFor={`file-${item.id}`}>File PDF (tùy chọn)</label><input id={`file-${item.id}`} name="file" type="file" accept=".pdf,application/pdf" /><button disabled={Boolean(busy)} type="submit">{busy === item.id ? 'Đang xử lý…' : 'Hoàn tất gửi tài liệu'}</button></form>}
    </article>)}
  </div></div>;
}

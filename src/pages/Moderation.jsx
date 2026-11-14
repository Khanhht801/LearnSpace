import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../utils/supabase.js';
import { useLibrary } from '../hooks/useLibrary.js';
import './community.css';

export default function Moderation() {
  const { topics } = useLibrary();
  const [state, setState] = useState({ contributions: [], reports: [], loading: true, error: '' });
  const [revision, setRevision] = useState(0);
  const [busy, setBusy] = useState('');
  const [notice, setNotice] = useState('');
  const [fileLink, setFileLink] = useState({ id: '', url: '' });
  useEffect(() => {
    let active = true;
    Promise.all([
      supabase.from('contributions').select('id,category_id,title,description,author,source,usage_note,file_path,created_at').eq('status', 'pending').order('created_at'),
      supabase.from('document_reports').select('id,document_id,reason,created_at').eq('status', 'pending').order('created_at'),
    ]).then(([contributions, reports]) => {
      if (active) setState({ contributions: contributions.data || [], reports: reports.data || [], loading: false, error: contributions.error || reports.error ? 'Chưa thể tải hàng đợi kiểm duyệt.' : '' });
    }).catch(() => { if (active) setState({ contributions: [], reports: [], loading: false, error: 'Chưa thể tải hàng đợi kiểm duyệt.' }); });
    return () => { active = false; };
  }, [revision]);

  async function action(key, work) {
    if (busy) return;
    setBusy(key); setNotice('');
    try {
      const { error } = await work();
      if (error) throw error;
      setNotice('Đã xử lý thành công.'); setFileLink({ id: '', url: '' }); setRevision((value) => value + 1);
    } catch { setNotice('Chưa thể xử lý. Mục có thể đã được xử lý hoặc phiên đăng nhập đã hết hạn.'); }
    finally { setBusy(''); }
  }

  async function prepareDownload(item) {
    setFileLink({ id: '', url: '' }); setNotice('');
    try {
      const { data, error } = await supabase.storage.from('contributions').createSignedUrl(item.file_path, 60, { download: true });
      if (error) throw error;
      setFileLink({ id: item.id, url: data.signedUrl });
    } catch { setNotice('Không thể tạo liên kết tải file.'); }
  }

  return <div className="community-page"><div className="community-inner">
    <p className="eyebrow">QUẢN TRỊ LEARNSPACE</p><h1>Kiểm duyệt cộng đồng</h1>
    <p>File do cộng đồng gửi chưa được quét mã độc tự động. Hãy kiểm tra nguồn, quyền chia sẻ và quét file bằng công cụ tin cậy trước khi duyệt.</p>
    {notice && <p role="status">{notice}</p>}
    {state.loading ? <p role="status">Đang tải hàng đợi…</p> : state.error ? <div role="alert"><p>{state.error}</p><button type="button" onClick={() => setRevision((value) => value + 1)}>Thử lại</button></div> : <>
      <h2>Tài liệu chờ duyệt</h2>{state.contributions.length === 0 && <p>Không có tài liệu chờ duyệt.</p>}
      {state.contributions.map((item) => <article className="community-card" key={item.id}>
        <h2>{item.title}</h2><p>{item.description}</p><dl><dt>Chủ đề</dt><dd>{topics.find((topic) => topic.categoryId === item.category_id)?.title || `#${item.category_id}`}</dd><dt>Tác giả</dt><dd>{item.author}</dd><dt>Nguồn</dt><dd>{item.source}</dd><dt>Điều kiện sử dụng</dt><dd>{item.usage_note}</dd></dl>
        <div className="community-actions"><button type="button" onClick={() => prepareDownload(item)}>Tạo liên kết tải file</button>{fileLink.id === item.id && <a href={fileLink.url}>Tải file để kiểm tra (hiệu lực 1 phút)</a>}</div>
        <form onSubmit={(event) => { event.preventDefault(); const form = event.currentTarget; const data = new FormData(form); const choice = event.nativeEvent.submitter?.value; if (choice === 'approve' && !data.get('checked')) { setNotice('Hãy xác nhận đã kiểm tra file và quyền chia sẻ trước khi duyệt.'); return; } if (choice === 'reject' && String(data.get('note') || '').trim().length < 5) { setNotice('Nhập lý do từ chối ít nhất 5 ký tự.'); return; } action(item.id, () => supabase.rpc('review_contribution', { p_id: item.id, p_action: choice, p_note: String(data.get('note') || '').trim() || null })); }}>
          <label htmlFor={`note-${item.id}`}>Phản hồi (bắt buộc khi từ chối)</label><textarea id={`note-${item.id}`} name="note" maxLength={1000} rows={3} />
          <label className="community-consent"><input type="checkbox" name="checked" /><span>Tôi đã kiểm tra file, nguồn và quyền chia sẻ.</span></label>
          <div className="community-actions"><button type="submit" name="action" value="approve" disabled={Boolean(busy)}>Duyệt và công khai</button><button type="submit" name="action" value="reject" disabled={Boolean(busy)}>Từ chối</button></div>
        </form>
      </article>)}
      <h2>Báo cáo tài liệu</h2>{state.reports.length === 0 && <p>Không có báo cáo chờ xử lý.</p>}
      {state.reports.map((report) => <article className="community-card" key={report.id}><h2>Tài liệu #{report.document_id}</h2><p>{report.reason}</p><p><Link to={`/courses/${report.document_id}`}>Xem tài liệu được báo cáo →</Link></p><div className="community-actions"><button type="button" disabled={Boolean(busy)} onClick={() => action(report.id, () => supabase.rpc('resolve_document_report', { p_id: report.id, p_hide: false }))}>Đánh dấu đã xem</button><button type="button" disabled={Boolean(busy)} onClick={() => action(report.id, () => supabase.rpc('resolve_document_report', { p_id: report.id, p_hide: true }))}>Ẩn tài liệu và xử lý</button></div></article>)}
    </>}
  </div></div>;
}

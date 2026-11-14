import { useState } from 'react';
import { supabase } from '../../utils/supabase.js';

export default function ReportDocument({ documentId }) {
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState('');
  const [failed, setFailed] = useState(false);

  async function submit(event) {
    event.preventDefault();
    if (busy) return;
    const form = event.currentTarget;
    setBusy(true); setNotice(''); setFailed(false);
    try {
      const { error } = await supabase.from('document_reports').insert({ document_id: documentId, reason: form.elements.reason.value.trim() });
      if (error) throw error;
      form.reset(); setNotice('Đã gửi báo cáo để quản trị viên xem xét.');
    } catch { setFailed(true); setNotice('Chưa thể gửi báo cáo. Nội dung của bạn vẫn được giữ lại.'); }
    finally { setBusy(false); }
  }

  return <details className="document-report"><summary>Báo cáo vấn đề với tài liệu</summary><form onSubmit={submit}>
    <label htmlFor="report-reason">Mô tả vấn đề hoặc yêu cầu về bản quyền</label><textarea id="report-reason" name="reason" minLength={10} maxLength={2000} required />
    <button type="submit" disabled={busy}>{busy ? 'Đang gửi…' : 'Gửi báo cáo'}</button>
    {notice && <p role={failed ? 'alert' : 'status'}>{notice}</p>}
  </form></details>;
}

import { useState } from 'react';

export default function FeedbackSection() {
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setSending(true); setError(''); setSuccess(false);
    try {
      const response = await fetch('/api/feedback', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ category: data.get('category'), message: data.get('message') }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Chưa thể gửi góp ý.');
      form.reset(); setSuccess(true);
    } catch (reason) {
      setError(reason instanceof TypeError || reason instanceof SyntaxError ? 'Không thể gửi góp ý lúc này. Nội dung của bạn vẫn được giữ lại, hãy thử lại nhé.' : reason.message);
    } finally { setSending(false); }
  }

  return (
    <section className="feedback-section" id="gop-y" aria-labelledby="feedback-title">
      <div className="landing-inner feedback-layout">
        <div className="feedback-copy"><p className="eyebrow"><span aria-hidden="true">✦</span> CÙNG LÀM LEARNSPACE TỐT HƠN</p><h2 id="feedback-title">Bạn muốn LearnSpace<br /><span>có thêm gì?</span></h2><p>Một ý tưởng nhỏ cũng có thể giúp LearnSpace trở nên hữu ích hơn cho nhiều người học.</p><img className="feedback-mascot" src="/mascot-feedback.png" alt="Linh vật LearnSpace vui vẻ bên hộp thư đỏ và bóng đèn ý tưởng" width="1024" height="1024" loading="lazy" /></div>
        <form className="feedback-form" onSubmit={handleSubmit} aria-busy={sending}>
          <fieldset disabled={sending}><legend>Bạn muốn đề xuất về:</legend><div className="feedback-categories"><label><input type="radio" name="category" value="content" defaultChecked required />Tài liệu / chủ đề mới</label><label><input type="radio" name="category" value="feature" />Tính năng muốn có</label><label><input type="radio" name="category" value="other" />Góp ý khác</label></div><label htmlFor="feedback-message">Nội dung đề xuất</label><textarea id="feedback-message" name="message" rows={6} minLength={10} maxLength={2000} required placeholder={'Nhập ý tưởng, nhu cầu hoặc góp ý của bạn tại đây...\n• Ví dụ: Thêm tài liệu về ...\n• Hoặc: Có thể bổ sung tính năng ...\n• Hoặc: Mình góp ý rằng ...'} aria-describedby="feedback-help" /><p id="feedback-help">10–2.000 ký tự.</p><button type="submit"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m22 2-7 20-4-9L2 9 22 2ZM22 2 11 13M11 13v7l4-4" /></svg>{sending ? 'Đang gửi…' : 'Gửi đề xuất'}</button></fieldset>
          {error && <p className="notice notice-error" role="alert">{error}</p>}{success && <p className="notice notice-success" role="status">Đã nhận đề xuất của bạn. Cảm ơn bạn đã giúp LearnSpace tốt hơn! Bạn có thể tiếp tục gửi ý kiến khác.</p>}
        </form>
      </div>
    </section>
  );
}

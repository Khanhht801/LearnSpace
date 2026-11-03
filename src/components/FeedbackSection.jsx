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
        <div className="feedback-copy"><p className="eyebrow">CÙNG LÀM LEARNSPACE TỐT HƠN</p><h2 id="feedback-title">Bạn muốn LearnSpace<br /><span>có thêm gì?</span></h2><p>Chưa tìm thấy tài liệu mình cần, hay có ý tưởng giúp LearnSpace hữu ích hơn? Chia sẻ với chúng mình nhé.</p><p className="feedback-note">Không cần tên hay email. Góp ý được gửi riêng để xem xét, không hiển thị công khai.</p></div>
        <form className="feedback-form" onSubmit={handleSubmit} aria-busy={sending}>
          <fieldset disabled={sending}><legend>Bạn muốn đề xuất về:</legend><div className="feedback-categories"><label><input type="radio" name="category" value="content" defaultChecked required />Tài liệu / chủ đề mới</label><label><input type="radio" name="category" value="feature" />Tính năng website</label><label><input type="radio" name="category" value="other" />Góp ý khác</label></div><label htmlFor="feedback-message">Nội dung đề xuất</label><textarea id="feedback-message" name="message" rows={4} minLength={10} maxLength={2000} required placeholder="Ví dụ: Mình muốn có thêm bài tập React về quản lý state…" aria-describedby="feedback-help" /><p id="feedback-help">10–2.000 ký tự. Đừng đưa thông tin riêng tư vào góp ý.</p><button type="submit">{sending ? 'Đang gửi…' : 'Gửi đề xuất'} <span aria-hidden="true">↗</span></button></fieldset>
          {error && <p className="notice notice-error" role="alert">{error}</p>}{success && <p className="notice notice-success" role="status">Đã nhận đề xuất của bạn. Cảm ơn bạn đã giúp LearnSpace tốt hơn! Bạn có thể tiếp tục gửi ý kiến khác.</p>}
        </form>
      </div>
    </section>
  );
}

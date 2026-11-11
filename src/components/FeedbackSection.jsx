export default function FeedbackSection() {
  const email = import.meta.env.VITE_CONTRIBUTION_EMAIL?.trim();

  return (
    <section className="feedback-section" id="gop-y" aria-labelledby="feedback-title">
      <div className="landing-inner feedback-layout">
        <div className="feedback-copy"><p className="eyebrow">CÙNG LÀM LEARNSPACE TỐT HƠN</p><h2 id="feedback-title">Bạn muốn LearnSpace<br /><span>có thêm gì?</span></h2><p>Những đề xuất về tài liệu và chủ đề giúp LearnSpace phát triển phù hợp hơn với người học.</p><img className="feedback-mascot" src="/mascot-feedback.png" alt="" width="1024" height="1024" loading="lazy" /></div>
        <div className="feedback-form">
          <h3>Góp ý cho LearnSpace</h3>
          {email ? <p>Gửi đề xuất của bạn qua email: <a href={`mailto:${email}`}>{email}</a>.</p> : <p>Kênh tiếp nhận góp ý đang được cập nhật. Vui lòng quay lại sau nhé.</p>}
        </div>
      </div>
    </section>
  );
}

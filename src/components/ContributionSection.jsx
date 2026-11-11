import { Link } from 'react-router-dom';

export default function ContributionSection({ detailed = false }) {
  const Title = detailed ? 'h1' : 'h2';
  return (
    <section className={`contribution-section${detailed ? ' contribution-full' : ''}`} id="dong-gop" aria-labelledby="contribution-title">
      <div className="landing-inner contribution-layout">
        <div className="contribution-copy">
          <p className="eyebrow">CÙNG LEARNSPACE HỌC HỎI</p>
          <Title id="contribution-title">Kiến thức hữu ích,<br /><span>được chọn lọc để sẻ chia.</span></Title>
          <p>Ở giai đoạn đầu, tài liệu được người quản lý LearnSpace chọn lọc và cập nhật. Chức năng cộng đồng gửi tài liệu sẽ được mở sau.</p>
          <div className="contribution-actions"><Link className="button-link" to="/courses">Khám phá thư viện <span aria-hidden="true">→</span></Link></div>
        </div>
        <div className="contribution-panel">
          <div className="contribution-options">
            <h3>Cùng xây dựng thư viện</h3>
            <p>Bạn có thể góp ý về các chủ đề và nội dung muốn tìm hiểu. LearnSpace sẽ thông báo khi có thể nhận tài liệu từ cộng đồng.</p>
            <Link to="/#gop-y">Góp ý cho LearnSpace <span aria-hidden="true">→</span></Link>
          </div>
          <div className="contribution-mascot" aria-hidden="true"><div className="contribution-books"><span /><span /></div><img src="/mascot.png" alt="" width="1254" height="1254" loading="lazy" /></div>
        </div>
      </div>
    </section>
  );
}

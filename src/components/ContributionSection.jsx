import { Link } from 'react-router-dom';

export default function ContributionSection({ detailed = false }) {
  const Title = detailed ? 'h1' : 'h2';
  return (
    <section className={`contribution-section${detailed ? ' contribution-full' : ''}`} id="dong-gop" aria-labelledby="contribution-title">
      <div className="landing-inner contribution-layout">
        <div className="contribution-copy">
          <p className="eyebrow">CÙNG LEARNSPACE HỌC HỎI</p>
          <Title id="contribution-title">Kiến thức hữu ích,<br /><span>được chọn lọc để sẻ chia.</span></Title>
          <p>Chia sẻ tài liệu bạn có quyền đăng tải. Quản trị viên sẽ kiểm tra trước khi tài liệu xuất hiện trong thư viện.</p>
          <div className="contribution-actions"><Link className="button-link" to="/contribute">Gửi tài liệu <span aria-hidden="true">→</span></Link></div>
        </div>
        <div className="contribution-panel">
          <div className="contribution-options">
            <h3>Cùng xây dựng thư viện</h3>
            <p>Gửi file PDF tối đa 10 MB, ghi rõ tác giả, nguồn và điều kiện sử dụng. Bạn có thể theo dõi kết quả duyệt trong tài khoản.</p>
            <Link to="/my-contributions">Xem tài liệu đã gửi <span aria-hidden="true">→</span></Link>
          </div>
          <div className="contribution-mascot" aria-hidden="true"><div className="contribution-books"><span /><span /></div><img src="/mascot.png" alt="" width="1254" height="1254" loading="lazy" /></div>
        </div>
      </div>
    </section>
  );
}

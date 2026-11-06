import { Link } from 'react-router-dom';

export default function Footer({ topId = 'hero' }) {
  const email = import.meta.env.VITE_CONTRIBUTION_EMAIL?.trim();
  return (
    <footer className="landing-footer">
      <div className="landing-inner">
        <div className="footer-grid">
          <div className="footer-brand"><Link to="/" aria-label="LearnSpace — Trang chủ"><img className="footer-logo" src="/logo.png" alt="LearnSpace" width="2160" height="720" /></Link><p>Không gian chia sẻ kiến thức và tài liệu học tập. Học theo cách của bạn, tiến xa hơn mỗi ngày.</p></div>
          <nav aria-label="Điều hướng cuối trang"><h2>Khám phá</h2><Link to="/about">Giới thiệu</Link><Link to="/topics">Chủ đề</Link><Link to="/courses">Thư viện</Link><Link to="/saved">Đã lưu</Link></nav>
          <div><h2>Kết nối & chia sẻ</h2><Link to="/contact">Hướng dẫn đóng góp</Link><Link to="/#gop-y">Góp ý cho LearnSpace</Link>{email ? <a href={`mailto:${email}`}>{email}</a> : <p>Kênh liên hệ sẽ được cập nhật.</p>}</div>
        </div>
        <div className="footer-usage"><h2>Nguồn & điều kiện sử dụng</h2><p>Tôn trọng quyền tác giả. Kiểm tra nguồn và điều kiện sử dụng của từng tài liệu trước khi sao chép, chia sẻ hoặc sử dụng lại; truy cập miễn phí không có nghĩa là được tự do tái phân phối.</p></div>
        <div className="footer-bottom"><span>LearnSpace · Không gian chia sẻ kiến thức.</span><a href={`#${topId}`}>Về đầu trang ↑</a></div>
      </div>
    </footer>
  );
}

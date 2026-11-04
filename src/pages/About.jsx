import { Link } from 'react-router-dom';

const values = [
  { title: 'Tìm điều cần khám phá', description: 'Tìm theo tên hoặc chọn chủ đề để thu hẹp nội dung bạn quan tâm.', path: 'm21 21-5-5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z', label: 'Khám phá thư viện', to: '/courses' },
  { title: 'Biết trước nội dung', description: 'Xem mô tả, cấp độ và thời lượng trước khi chọn mục phù hợp.', path: 'M5 3h9l5 5v13H5V3ZM14 3v6h5M8 13h8M8 17h5', label: 'Xem một nội dung', to: '/courses/1' },
  { title: 'Giữ lại điều hữu ích', description: 'Lưu mục yêu thích để tìm lại trên trình duyệt bạn đang dùng.', path: 'M6 3h12v18l-6-4-6 4V3Z', label: 'Nội dung đã lưu', to: '/saved' },
  { title: 'Có nơi để sẻ chia', description: 'Đóng góp tài liệu và gửi góp ý để cùng xây dựng LearnSpace.', path: 'M18 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM18 22a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM9 10.5l6-4M9 13.5l6 4', label: 'Chia sẻ tài liệu', to: '/contact' },
];

export default function About() {
  return (
    <div className="about-page">
      <section className="about-hero" aria-labelledby="about-title">
        <div className="about-inner about-hero-layout">
          <div className="about-hero-copy">
            <p className="eyebrow">VỀ LEARNSPACE</p>
            <h1 id="about-title">Một nơi giữ lại điều hay.<br /><span>Một điểm bắt đầu<br />để học tiếp.</span></h1>
            <p className="about-description">Dành cho những ai đang tự học và muốn tìm lại kiến thức dễ dàng hơn, LearnSpace giúp bạn khám phá nội dung học tập, lưu lại mục hữu ích và chia sẻ tài liệu với cộng đồng.</p>
            <div className="about-actions">
              <Link className="button-link" to="/courses">Khám phá thư viện <span aria-hidden="true">↗</span></Link>
              <a className="about-secondary-link" href="#gia-tri">Điều LearnSpace mang lại <span aria-hidden="true">↓</span></a>
            </div>
            <p className="about-hero-note"><span aria-hidden="true">✦</span> Học theo nhịp của bạn. Chia sẻ điều bạn biết.</p>
          </div>
          <div className="about-hero-visual">
            <div className="about-visual-orbit" aria-hidden="true" />
            <span className="about-visual-spark" aria-hidden="true">✦</span>
            <div className="about-paper" aria-hidden="true"><span>GÓC HỌC TẬP CỦA BẠN</span><strong>Mỗi điều hay,<br />một trang mới.</strong><i /><i /><i /></div>
            <img src="/mascot-reading.png" alt="Linh vật gà vàng LearnSpace đang đọc sách" width="1024" height="1024" fetchPriority="high" />
            <div className="about-visual-caption"><span aria-hidden="true">♡</span><div>Điều hay, luôn ở lại.<small>Để bạn tiếp tục khi sẵn sàng.</small></div></div>
          </div>
        </div>
      </section>
      <section className="about-values" id="gia-tri" aria-labelledby="about-values-title">
        <div className="about-inner">
          <div className="about-values-heading">
            <p className="eyebrow">GIÁ TRỊ TỪ NHỮNG ĐIỀU NHỎ</p>
            <h2 id="about-values-title">Bớt thời gian tìm kiếm.<br /><span>Thêm không gian học hỏi.</span></h2>
            <p>Từ lần tìm kiếm đầu tiên đến những nội dung muốn giữ lại, LearnSpace cùng bạn bắt đầu bằng những việc đơn giản.</p>
          </div>
          <div className="about-values-grid">
            {values.map((value, index) => (
              <article className="about-value-card" key={value.title}>
                <div className="about-value-top"><span className="about-value-icon" aria-hidden="true"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d={value.path} /></svg></span><span className="about-value-number" aria-hidden="true">0{index + 1}</span></div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
                <Link to={value.to}>{value.label} <span aria-hidden="true">↗</span></Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

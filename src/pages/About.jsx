import { Link } from 'react-router-dom';

const values = [
  { title: 'Dễ tìm điều cần học', description: 'Tìm theo tên và khám phá theo chủ đề để đến gần hơn với nội dung bạn quan tâm.', path: 'm21 21-5-5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z' },
  { title: 'Hiểu trước khi chọn', description: 'Xem mô tả, cấp độ và thời lượng để chọn nội dung phù hợp với nhu cầu học tập.', path: 'M12 5C9 3 5 3 2 4v15c3-1 7-1 10 1 3-2 7-2 10-1V4c-3-1-7-1-10 1ZM12 5v15' },
  { title: 'Giữ lại kiến thức hay', description: 'Lưu mục yêu thích để dễ dàng tìm lại và tiếp tục khám phá trên trình duyệt bạn đang dùng.', path: 'M6 3h12v18l-6-4-6 4V3Z' },
  { title: 'Chia sẻ điều hữu ích', description: 'Đóng góp tài liệu bạn có quyền chia sẻ, cùng làm phong phú thêm không gian học tập chung.', path: 'M18 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM18 22a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM9 10.5l6-4M9 13.5l6 4' },
  { title: 'Lắng nghe để cải thiện', description: 'Mỗi góp ý là một cơ hội để LearnSpace hiểu nhu cầu của bạn và từng bước hoàn thiện.', path: 'M9 18h6M10 22h4M8 14a7 7 0 1 1 8 0c-1 1-1 2-1 4H9c0-2 0-3-1-4ZM12 1v2M2 8l2 1M20 9l2-1' },
  { title: 'Tôn trọng nguồn tri thức', description: 'Khuyến khích ghi rõ nguồn, tôn trọng tác giả và kiểm tra điều kiện sử dụng trước khi chia sẻ.', path: 'M5 3h9l5 5v13H5V3ZM14 3v6h5M8 13h8M8 17h5' },
];

const badgePositions = [[73, 73], [38, 240], [73, 407], [407, 73], [442, 240], [407, 407]];
const nodePositions = [[134, 134], [90, 240], [134, 346], [346, 134], [390, 240], [346, 346]];

function ValuesDiagram() {
  return (
    <svg className="core-values-diagram" viewBox="0 0 480 480" aria-hidden="true">
      <defs>
        <filter id="about-badge-shadow" x="-50%" y="-50%" width="200%" height="220%">
          <feDropShadow dx="0" dy="7" stdDeviation="6" floodColor="#db1f1f" floodOpacity=".22" />
        </filter>
      </defs>
      <circle cx="240" cy="240" r="150" fill="none" stroke="#777" strokeWidth="2.5" strokeDasharray="1 6" strokeLinecap="round" />
      <circle cx="240" cy="240" r="128" fill="#f0f0f0" />
      <text x="240" y="226" className="core-values-count" textAnchor="middle">6</text>
      <text x="240" y="267" className="core-values-word" textAnchor="middle">GIÁ TRỊ</text>
      <text x="240" y="301" className="core-values-word" textAnchor="middle">LEARNSPACE</text>
      {values.map((value, index) => {
        const [x, y] = badgePositions[index];
        const [nodeX, nodeY] = nodePositions[index];
        const angle = Math.atan2(240 - y, 240 - x) * 180 / Math.PI;
        return (
          <g key={value.title}>
            <circle cx={nodeX} cy={nodeY} r="8" fill="#f1b4b4" />
            <circle cx={nodeX} cy={nodeY} r="4" fill="#db1f1f" />
            <g transform={`translate(${x} ${y})`}>
              <path d="M30-12 55 0 30 12Z" transform={`rotate(${angle})`} fill="#db1f1f" />
              <circle r="40" fill="white" stroke="#db1f1f" strokeWidth="4" filter="url(#about-badge-shadow)" />
              <g transform="translate(-19 -19) scale(1.5833)" fill="none" stroke="#db1f1f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={value.path} /></g>
            </g>
          </g>
        );
      })}
    </svg>
  );
}

function ValueItem({ value }) {
  return (
    <article className="core-value-item">
      <span className="core-value-mobile-icon" aria-hidden="true"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d={value.path} /></svg></span>
      <div><h3>{value.title}</h3><p>{value.description}</p></div>
    </article>
  );
}

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
          <h2 className="core-values-label" id="about-values-title">6 giá trị cốt lõi</h2>
          <div className="core-values-layout">
            <div className="core-values-column core-values-left">
              {values.slice(0, 3).map((value) => <ValueItem key={value.title} value={value} />)}
            </div>
            <ValuesDiagram />
            <div className="core-values-column core-values-right">
              {values.slice(3).map((value) => <ValueItem key={value.title} value={value} />)}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

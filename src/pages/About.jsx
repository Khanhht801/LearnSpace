import { useLayoutEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const values = [
  { title: 'Dễ tìm điều cần học', description: 'Tìm theo tên và khám phá theo chủ đề để đến gần hơn với nội dung bạn quan tâm.', path: 'M10 1a9 9 0 1 0 5.2 16.35l5.85 5.85 2.15-2.15-5.85-5.85A9 9 0 0 0 10 1Zm0 3.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11Z' },
  { title: 'Hiểu trước khi chọn', description: 'Xem mô tả, cấp độ và thời lượng để chọn nội dung phù hợp với nhu cầu học tập.', path: 'M1 3c3.7-1.1 7.2-.5 10 1.5V22c-2.8-2-6.3-2.6-10-1.5V3Zm12 1.5C15.8 2.5 19.3 1.9 23 3v17.5c-3.7-1.1-7.2-.5-10 1.5V4.5Z' },
  { title: 'Giữ lại kiến thức hay', description: 'Lưu mục yêu thích để dễ dàng tìm lại và tiếp tục khám phá trên trình duyệt bạn đang dùng.', path: 'M6 1h12a2 2 0 0 1 2 2v20l-8-5-8 5V3a2 2 0 0 1 2-2Z' },
  { title: 'Chia sẻ điều hữu ích', description: 'Đóng góp tài liệu bạn có quyền chia sẻ, cùng làm phong phú thêm không gian học tập chung.', path: 'M18 1a4 4 0 1 1 0 8 4 4 0 0 1 0-8ZM5 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8Zm13 7a4 4 0 1 1 0 8 4 4 0 0 1 0-8Zm-9-5.5 4.5-2.4 1.4 2.6-4.5 2.4L9 9.5Zm1.4 2.4 4.5 2.4-1.4 2.6L9 14.5l1.4-2.6Z' },
  { title: 'Lắng nghe để cải thiện', description: 'Mỗi góp ý là một cơ hội để LearnSpace hiểu nhu cầu của bạn và từng bước hoàn thiện.', path: 'M12 4a6.5 6.5 0 0 0-4.7 11c1.2 1.2 1.7 2 1.7 3h6c0-1 .5-1.8 1.7-3A6.5 6.5 0 0 0 12 4ZM9 19h6v2H9v-2Zm1 3h4v2h-4v-2ZM11 0h2v3h-2V0ZM1 8h3v2H1V8Zm19 0h3v2h-3V8ZM3.2 2.8l2.2 2.1L4 6.3 1.8 4.2l1.4-1.4Zm17.6 0 1.4 1.4L20 6.3l-1.4-1.4 2.2-2.1Z' },
  { title: 'Tôn trọng nguồn tri thức', description: 'Khuyến khích ghi rõ nguồn, tôn trọng tác giả và kiểm tra điều kiện sử dụng trước khi chia sẻ.', path: 'M5 1h9v7h7v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2Zm11 0 5 5h-5V1ZM7 12v2h10v-2H7Zm0 5v2h7v-2H7Z' },
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
              <g transform="translate(-20 -20) scale(1.6667)" fill="#db1f1f"><path d={value.path} fillRule="evenodd" /></g>
            </g>
          </g>
        );
      })}
    </svg>
  );
}

function ValueItem({ value }) {
  const icon = <span className="core-value-mobile-icon" aria-hidden="true"><svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d={value.path} fillRule="evenodd" /></svg></span>;

  return (
    <>
      <article className="core-value-item">
        {icon}
        <div><h3>{value.title}</h3><p>{value.description}</p></div>
      </article>
      <details className="core-value-accordion">
        <summary>{icon}<h3>{value.title}</h3><span className="core-value-chevron" aria-hidden="true" /></summary>
        <p>{value.description}</p>
      </details>
    </>
  );
}

export default function About() {
  const { key, hash } = useLocation();
  const contributionEmail = import.meta.env.VITE_CONTRIBUTION_EMAIL?.trim();

  useLayoutEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [key, hash]);

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
      <section className="about-story" id="cau-chuyen" aria-labelledby="about-story-title">
        <div className="about-inner">
          <div className="about-story-layout">
            <div className="about-story-visual">
              <div className="about-story-notebook" aria-hidden="true">
                <span>Ý TƯỞNG NHỎ, KHÔNG GIAN CHUNG</span>
                <strong>Kiến thức hay,<br />đừng để lạc mất.</strong>
                <div className="about-story-note"><span>01</span> Tìm lại dễ hơn</div>
                <div className="about-story-note"><span>02</span> Giữ điều hữu ích</div>
                <div className="about-story-note"><span>03</span> Cùng nhau sẻ chia</div>
              </div>
              <img src="/mascot-message.png" alt="Linh vật LearnSpace bên những cuốn sách và tài liệu học tập" width="1024" height="1024" loading="lazy" />
              <span className="about-story-spark" aria-hidden="true">✦</span>
            </div>
            <div className="about-story-copy">
              <p className="eyebrow">CÂU CHUYỆN LEARNSPACE</p>
              <h2 id="about-story-title">Từ những tài liệu rời rạc,<br /><span>đến một không gian chung.</span></h2>
              <p>Khi tự học, đôi lúc điều khó không chỉ là hiểu một kiến thức mới, mà còn là tìm lại tài liệu hữu ích đã từng gặp. Một đường dẫn lưu vội, một ghi chép nằm quên, một nội dung muốn đọc lại nhưng không biết ở đâu.</p>
              <p>LearnSpace hướng đến một điều đơn giản: tập hợp nội dung học tập trong một không gian dễ tìm, dễ lưu và dễ chia sẻ. Bắt đầu với những nội dung lập trình đang có, LearnSpace mong muốn từng bước làm cho việc học và chia sẻ kiến thức trở nên gần gũi hơn.</p>
              <blockquote>Điều hữu ích với bạn hôm nay có thể là điểm bắt đầu của một người khác ngày mai.</blockquote>
            </div>
          </div>
          <ol className="about-story-steps" aria-label="Ý tưởng xây dựng LearnSpace">
            <li><span aria-hidden="true">01</span><div><h3>Nhu cầu ban đầu</h3><p>Tìm một nơi để những nội dung hữu ích không bị lãng quên.</p></div></li>
            <li><span aria-hidden="true">02</span><div><h3>Ý tưởng tập hợp</h3><p>Đưa việc tìm kiếm và lưu nội dung về cùng một không gian.</p></div></li>
            <li><span aria-hidden="true">03</span><div><h3>Mong muốn sẻ chia</h3><p>Để kiến thức được tiếp nối qua những đóng góp của cộng đồng.</p></div></li>
          </ol>
        </div>
      </section>
      <section className="about-how" id="cach-hoat-dong" aria-labelledby="about-how-title">
        <div className="about-inner">
          <div className="about-section-heading">
            <p className="eyebrow">BẮT ĐẦU THẬT ĐƠN GIẢN</p>
            <h2 id="about-how-title">Ba bước nhỏ.<br /><span>Thêm một điều mới.</span></h2>
            <p>Không cần bắt đầu bằng một kế hoạch lớn. Hãy chọn một nội dung bạn muốn tìm hiểu hôm nay.</p>
          </div>
          <ol className="about-how-steps">
            <li>
              <span className="about-how-number" aria-hidden="true">01</span>
              <span className="about-how-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d={values[0].path} fillRule="evenodd" /></svg></span>
              <h3>Chọn nội dung</h3>
              <p>Tìm theo tên hoặc khám phá theo chủ đề để chọn điều bạn đang quan tâm.</p>
              <Link to="/courses">Mở thư viện <span aria-hidden="true">↗</span></Link>
            </li>
            <li>
              <span className="about-how-number" aria-hidden="true">02</span>
              <span className="about-how-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d={values[1].path} fillRule="evenodd" /></svg></span>
              <h3>Xem thông tin</h3>
              <p>Đọc mô tả, xem cấp độ và thời lượng để biết nội dung có phù hợp với bạn.</p>
              <Link to="/courses/1">Khám phá React cơ bản <span aria-hidden="true">↗</span></Link>
            </li>
            <li>
              <span className="about-how-number" aria-hidden="true">03</span>
              <span className="about-how-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d={values[2].path} fillRule="evenodd" /></svg></span>
              <h3>Lưu để quay lại</h3>
              <p>Nhấn yêu thích để giữ nội dung hữu ích trong danh sách đã lưu trên trình duyệt hiện tại.</p>
              <Link to="/saved">Xem nội dung đã lưu <span aria-hidden="true">↗</span></Link>
            </li>
          </ol>
        </div>
      </section>
      <section className="about-team" id="nguoi-xay-dung" aria-labelledby="about-team-title">
        <div className="about-inner about-team-layout">
          <div className="about-section-heading">
            <p className="eyebrow">CON NGƯỜI & KẾT NỐI</p>
            <h2 id="about-team-title">Người đứng sau<br /><span>LearnSpace.</span></h2>
            <p>Một không gian học tập được hoàn thiện từ những điều nhỏ: nội dung dễ tìm hơn, thao tác dễ dùng hơn và những góp ý được lắng nghe.</p>
            <a className="about-team-feedback" href="/#gop-y">Gửi một góp ý cho LearnSpace <span aria-hidden="true">↗</span></a>
          </div>
          <article className="about-team-card" aria-labelledby="about-project-title">
            <div className="about-team-card-top"><span className="about-project-avatar" aria-hidden="true">LS</span><div><p>DỰ ÁN HỌC TẬP & CHIA SẺ</p><h3 id="about-project-title">LearnSpace</h3></div></div>
            <p>LearnSpace đang từng bước phát triển một nơi để tìm kiếm, lưu lại và chia sẻ nội dung học tập. Thông tin về người xây dựng sẽ được giới thiệu tại đây khi được công bố.</p>
            <div className="about-team-principle"><span aria-hidden="true">✦</span><p>Cùng xây dựng một nơi mà kiến thức hữu ích được giữ lại và sẻ chia.</p></div>
          </article>
        </div>
      </section>
      <section className="about-start" id="bat-dau" aria-labelledby="about-start-title">
        <div className="about-inner">
          <div className="about-start-panel">
            <span className="about-start-decoration" aria-hidden="true">✦</span>
            <p className="eyebrow">MỘT ĐIỀU HAY ĐANG CHỜ BẠN</p>
            <h2 id="about-start-title">Điều bạn muốn khám phá<br />tiếp theo là gì?</h2>
            <p className="about-start-description">Bắt đầu từ một nội dung bạn quan tâm, lưu lại điều hữu ích và quay lại khi bạn muốn tìm hiểu thêm.</p>
            <div className="about-start-actions">
              <Link className="button-link" to="/courses">Khám phá thư viện <span aria-hidden="true">↗</span></Link>
              <Link className="about-start-share" to="/contact">Chia sẻ tài liệu <span aria-hidden="true">↗</span></Link>
            </div>
            <div className="about-start-contact"><a href="/#gop-y">Góp ý cho LearnSpace</a><span aria-hidden="true">·</span>{contributionEmail ? <a href={`mailto:${contributionEmail}`}>{contributionEmail}</a> : <span>Kênh liên hệ sẽ được cập nhật.</span>}</div>
          </div>
          <div className="about-page-bottom"><span>LearnSpace · Không gian chia sẻ kiến thức.</span><a href="#about-title">Về đầu trang ↑</a></div>
        </div>
      </section>
    </div>
  );
}

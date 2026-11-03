import { Link, useNavigate } from 'react-router-dom';
import Introduction from '../components/Introduction.jsx';
import Topics from '../components/Topics.jsx';
import LibrarySection from '../components/LibrarySection.jsx';
import ContributionSection from '../components/ContributionSection.jsx';
import SavedSection from '../components/SavedSection.jsx';
import FeedbackSection from '../components/FeedbackSection.jsx';
import Footer from '../components/Footer.jsx';

export default function Home({ favoriteIds, onToggleFavorite }) {
  return (
    <>
    <section className="welcome-page" id="hero" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="hero-eyebrow"><span aria-hidden="true" /> KHÔNG GIAN CHO NGƯỜI HAM HỌC</p>
        <h1 id="hero-title">Kiến thức dễ tìm.<br /><span>Học tập dễ hơn.</span></h1>
        <p className="hero-description">Mỗi điều bạn học hôm nay, mở ra một khả năng mới.<br className="desktop-break" /> Khám phá, đọc và lưu tài liệu hữu ích cùng LearnSpace.</p>
        <HeroSearch />
        <div className="hero-topics"><span>Thử tìm:</span><Link to="/courses?q=React">React</Link><Link to="/courses?q=Router">React Router</Link><Link to="/courses?q=API">API</Link></div>
        <a className="hero-cta" href="#thu-vien">Khám phá tài liệu <span aria-hidden="true">↗</span></a>
        <div className="hero-benefits"><span><b aria-hidden="true">✓</b> Truy cập miễn phí</span><span><b aria-hidden="true">✓</b> Không cần tài khoản</span></div>
      </div>
      <div className="hero-visual" aria-hidden="true">
        <div className="orbit orbit-one" /><div className="orbit orbit-two" />
        <span className="visual-spark spark-one">✦</span><span className="visual-spark spark-two">✧</span>
        <div className="resource-note">MỘT CHÚT MỖI NGÀY <span>↗</span></div>
        <div className="resource-sheet sheet-back" />
        <div className="resource-sheet sheet-front">
          <div className="sheet-top"><span className="sheet-logo">L↗</span><span>LEARN / EXPLORE / GROW</span><span>01</span></div>
          <p className="sheet-caption">GHI CHÉP HỌC TẬP</p>
          <h2>Từ tò mò<br />đến <em>hiểu biết.</em></h2>
          <div className="code-preview"><span>const</span> journey = {'{'}<br />&nbsp; curiosity: <i>true</i>,<br />&nbsp; learning: <i>'every day'</i><br />{'}'};</div>
          <div className="sheet-bottom"><span>Học theo cách của bạn.</span><span>↗</span></div>
        </div>
        <div className="floating-bookmark"><span>⌑</span><div>Điều hay, lưu lại.<small>Sẵn sàng cho lần học tiếp theo</small></div></div>
      </div>
      <div className="hero-bottom"><span>KHÁM PHÁ KIẾN THỨC. NUÔI DƯỠNG TÒ MÒ.</span><span>LEARN AT YOUR OWN PACE <span aria-hidden="true">↘</span></span></div>
    </section>
    <Introduction />
    <Topics />
    <LibrarySection favoriteIds={favoriteIds} onToggleFavorite={onToggleFavorite} />
    <ContributionSection />
    <SavedSection favoriteIds={favoriteIds} onToggleFavorite={onToggleFavorite} />
    <FeedbackSection />
    <Footer />
    </>
  );
}

function HeroSearch() {
  const navigate = useNavigate();
  return (
    <form className="hero-search" role="search" onSubmit={(event) => {
      event.preventDefault();
      const keyword = new FormData(event.currentTarget).get('q').trim();
      navigate(keyword ? `/courses?q=${encodeURIComponent(keyword)}` : '/courses');
    }}>
      <label className="sr-only" htmlFor="hero-search">Tìm tài liệu</label>
      <svg width="21" height="21" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="1.7" /><path d="m16 16 5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>
      <input id="hero-search" name="q" type="search" placeholder="Bạn muốn học gì hôm nay?" />
      <button type="submit" aria-label="Tìm tài liệu"><span className="search-text">Tìm kiếm</span><span aria-hidden="true">→</span></button>
    </form>
  );
}

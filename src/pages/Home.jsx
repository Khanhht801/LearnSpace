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
        <p className="hero-eyebrow"><span aria-hidden="true">✦</span> KHO TÀI LIỆU & TRI THỨC CHUNG CỦA CỘNG ĐỒNG</p>
        <h1 id="hero-title">Kiến thức dễ tìm.<br /><span>Học tập dễ hơn.</span></h1>
        <p className="hero-description">LearnSpace là không gian chung để lưu trữ, chia sẻ tài liệu học tập và cùng khám phá tri thức trong nhiều lĩnh vực.</p>
        <HeroSearch />
        <div className="hero-topics"><span>Tìm nhanh:</span><Link to="/courses?q=React">React</Link><Link to="/courses?q=Router">React Router</Link><Link to="/courses?q=API">Làm việc với API</Link></div>
        <div className="hero-actions">
          <a className="hero-cta" href="#thu-vien"><HeroIcon name="share" /> Khám phá thư viện <span aria-hidden="true">→</span></a>
          <a className="hero-about" href="#gioi-thieu"><HeroIcon name="play" /> LearnSpace là gì?</a>
        </div>
      </div>
      <div className="hero-visual">
        <div className="orbit orbit-one" aria-hidden="true" />
        <span className="visual-spark spark-one" aria-hidden="true">✦</span><span className="visual-spark spark-two" aria-hidden="true">✧</span>
        <div className="resource-note"><HeroIcon name="cap" /> Học · Chia sẻ · Khám phá</div>
        <div className="resource-sheet sheet-back" aria-hidden="true" />
        <div className="resource-sheet sheet-front">
          <div className="sheet-top"><img className="sheet-logo" src="/logo.png" alt="LearnSpace" width="2160" height="720" /><span>Tài liệu học tập</span><span aria-hidden="true">•••</span></div>
          <div className="sheet-heading"><h2>Từ cơ bản<br />đến <em>hiểu sâu.</em></h2><span className="sheet-pdf"><HeroIcon name="file" />PDF</span></div>
          <ul className="sheet-checklist">
            <li>Tóm tắt kiến thức</li><li>Ví dụ minh họa</li><li>Bài tập vận dụng</li><li>Tài liệu tham khảo</li>
          </ul>
          <div className="sheet-lines" aria-hidden="true"><span /><span /></div>
        </div>
        <div className="mascot-platform" aria-hidden="true" />
        <img className="hero-mascot" src="/mascot.png" alt="Linh vật LearnSpace: chú gà vàng đeo khăn đỏ và ba lô, vẫy cánh chào bạn" width="1024" height="1024" fetchPriority="high" />
        <div className="floating-bookmark"><span><HeroIcon name="book" /></span><div>Tri thức hay, cùng sẻ chia.<small>Từ cộng đồng LearnSpace</small></div></div>
      </div>
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

function HeroIcon({ name }) {
  const paths = {
    share: 'M18 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM18 22a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM9 10.5l6-4M9 13.5l6 4',
    play: 'M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0ZM10 8l6 4-6 4V8Z',
    cap: 'M2 8l10-5 10 5-10 5L2 8ZM6 10v7c4 3 8 3 12 0v-7M22 8v8',
    file: 'M5 2h9l5 5v15H5V2ZM14 2v6h5M8 12h8M8 16h8',
    book: 'M12 5C9 3 5 3 2 4v15c3-1 7-1 10 1 3-2 7-2 10-1V4c-3-1-7-1-10 1ZM12 5v15',
  };
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name]} /></svg>;
}

import { Link } from 'react-router-dom';
import courses from '../data/courses.js';
import topics from '../data/topics.js';

export default function LibrarySection({ favoriteIds, onToggleFavorite }) {
  return (
    <section className="library-section" id="thu-vien" aria-labelledby="library-title">
      <div className="landing-inner">
        <div className="library-heading"><div><p className="eyebrow">THƯ VIỆN LEARNSPACE</p><h2 id="library-title">Một tài liệu hay.<br /><span>Một bước tiến mới.</span></h2><p>Chọn nội dung bạn muốn khám phá, lưu lại để tiếp tục khi cần.</p></div><Link className="topics-all" to="/courses">Xem tất cả tài liệu <span aria-hidden="true">↗</span></Link></div>
        <div className="library-grid">
          {courses.slice(0, 6).map((course, index) => {
            const topic = topics.find((item) => item.courseIds.includes(course.id));
            const saved = favoriteIds.includes(course.id);
            return (
              <article className="library-card" key={course.id}>
                <div className="library-card-cover" aria-hidden="true"><span>LEARNSPACE / GHI CHÉP HỌC TẬP</span><strong>{['</>', '↗', '{ }'][index % 3]}</strong><span>KHÁM PHÁ TỪNG CHÚT MỘT <b>0{index + 1}</b></span></div>
                <div className="library-card-body"><div className="library-card-meta"><span>{topic?.title || 'Kiến thức'}</span><span>{course.level}</span></div><h3><Link to={`/courses/${course.id}`}>{course.title}</Link></h3><p>{course.description}</p>
                  <div className="library-card-info"><span>Lo&#7841;i: Gi&#7899;i thi&#7879;u n&#7897;i dung</span><span>C&#7853;p nh&#7853;t: Ch&#432;a c&#243; th&#244;ng tin</span></div>
                  <div className="library-card-actions"><Link to={`/courses/${course.id}`}>Xem nội dung <span aria-hidden="true">↗</span></Link><button type="button" aria-pressed={saved} aria-label={`${saved ? 'Bỏ lưu' : 'Lưu'} ${course.title}`} onClick={() => onToggleFavorite(course.id)}><svg width="17" height="20" viewBox="0 0 18 20" fill={saved ? 'currentColor' : 'none'} aria-hidden="true"><path d="M4 2h10a1 1 0 0 1 1 1v14l-6-4-6 4V3a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>{saved ? 'Đã lưu' : 'Lưu'}</button></div></div>
              </article>
            );
          })}
        </div>
        {courses.length === 0 && <p>Thư viện đang được chuẩn bị. Hãy quay lại để khám phá tài liệu mới.</p>}
      </div>
    </section>
  );
}

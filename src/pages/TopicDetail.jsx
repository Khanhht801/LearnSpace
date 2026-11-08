import { useLibrary } from '../hooks/useLibrary.js';
import { Link, useParams } from 'react-router-dom';
import Footer from '../components/Footer.jsx';
import TopicCard from '../components/TopicCard.jsx';
import '../topics.css';

export default function TopicDetail({ favoriteIds, onToggleFavorite }) {
  const { courses, topics } = useLibrary();
  const { topicId } = useParams();
  const topic = topics.find((item) => item.id === topicId);

  if (!topic) return <section><h1>Không tìm thấy chủ đề</h1><p>Chủ đề này chưa có hoặc đường dẫn không đúng.</p><Link to="/topics">Khám phá tất cả chủ đề →</Link></section>;

  const topicCourses = topic.courseIds.map((id) => courses.find((course) => course.id === id)).filter(Boolean);
  const nextTopic = topics.find((item) => item.id !== topic.id);

  return (
    <div className="topics-page topic-detail-page" id="topics-top">
      <section className="topics-page-intro" aria-labelledby="topic-detail-title">
        <div className="topic-page-inner">
          <nav className="topic-breadcrumb" aria-label="Đường dẫn"><Link to="/">Trang chủ</Link><span aria-hidden="true">/</span><Link to="/topics">Chủ đề</Link><span aria-hidden="true">/</span><span aria-current="page">{topic.title}</span></nav>
          <div className="topic-detail-hero"><div><p className="eyebrow">TỪNG BƯỚC KHÁM PHÁ</p><h1 id="topic-detail-title">{topic.title}</h1><p className="topics-page-lead">{topic.description}</p><p className="topic-detail-meta">{topicCourses.length} tài liệu hiện có</p><a className="button-link" href="#topic-learning">Bắt đầu tìm hiểu <span aria-hidden="true">↓</span></a></div><img src={topic.coverImage} alt="" width="1200" height="550" fetchPriority="high" /></div>
        </div>
      </section>



      <section className="topic-detail-section" id="topic-learning" aria-labelledby="topic-learning-title">
        <div className="topic-page-inner"><p className="eyebrow">CHỌN MỘT BƯỚC ĐỂ BẮT ĐẦU</p><h2 id="topic-learning-title">Tài liệu trong chủ đề</h2><p className="topic-section-description">Tìm hiểu lần lượt, hoặc mở ngay nội dung bạn đang cần.</p>
          {topicCourses.length > 0 ? <ol className="topic-learning-list">{topicCourses.map((course, index) => {
            const saved = favoriteIds.includes(course.id);
            return <li key={course.id}><span className="topic-step-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><div className="topic-learning-content"><span className="topic-count">{course.file_type?.toUpperCase()}</span><h3><Link to={`/courses/${course.id}`}>{course.title}</Link></h3><p>{course.description}</p><div className="topic-learning-actions"><Link to={`/courses/${course.id}`}>Xem nội dung <span aria-hidden="true">→</span></Link><button type="button" aria-pressed={saved} aria-label={`${saved ? 'Bỏ lưu' : 'Lưu'} ${course.title}`} onClick={() => onToggleFavorite(course.id)}>{saved ? 'Đã lưu' : 'Lưu tài liệu'}</button></div></div></li>;
          })}</ol> : <p className="topics-empty">Tài liệu cho chủ đề này đang được chuẩn bị.</p>}
        </div>
      </section>


      {nextTopic && <section className="topic-detail-section" aria-labelledby="topic-next-title"><div className="topic-page-inner topic-next-layout"><div><p className="eyebrow">TIẾP TỤC TÌM HIỂU</p><h2 id="topic-next-title">Khám phá chủ đề tiếp theo</h2><p>Khám phá thêm tài liệu ở một chủ đề khác.</p><Link className="topics-all" to="/topics">Tất cả chủ đề <span aria-hidden="true">→</span></Link></div><TopicCard topic={nextTopic} /></div></section>}
      <Footer topId="topics-top" />
    </div>
  );
}

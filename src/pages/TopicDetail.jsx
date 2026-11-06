import { Link, useParams } from 'react-router-dom';
import Footer from '../components/Footer.jsx';
import TopicCard from '../components/TopicCard.jsx';
import courses from '../data/courses.js';
import topics from '../data/topics.js';
import '../topics.css';

export default function TopicDetail({ favoriteIds, onToggleFavorite }) {
  const { topicId } = useParams();
  const topic = topics.find((item) => item.id === topicId);

  if (!topic) return <section><h1>Không tìm thấy chủ đề</h1><p>Chủ đề này chưa có hoặc đường dẫn không đúng.</p><Link to="/topics">Khám phá tất cả chủ đề →</Link></section>;

  const topicCourses = topic.courseIds.map((id) => courses.find((course) => course.id === id)).filter(Boolean);
  const nextTopic = topics.find((item) => item.id === topic.nextTopicId);

  return (
    <div className="topics-page topic-detail-page" id="topics-top">
      <section className="topics-page-intro" aria-labelledby="topic-detail-title">
        <div className="topic-page-inner">
          <nav className="topic-breadcrumb" aria-label="Đường dẫn"><Link to="/">Trang chủ</Link><span aria-hidden="true">/</span><Link to="/topics">Chủ đề</Link><span aria-hidden="true">/</span><span aria-current="page">{topic.title}</span></nav>
          <div className="topic-detail-hero"><div><p className="eyebrow">TỪNG BƯỚC KHÁM PHÁ</p><h1 id="topic-detail-title">{topic.title}</h1><p className="topics-page-lead">{topic.description}</p><p className="topic-detail-meta">{topic.level} · {topicCourses.length} tài liệu hiện có</p><a className="button-link" href="#topic-learning">Bắt đầu tìm hiểu <span aria-hidden="true">↓</span></a></div><img src={topic.coverImage} alt="" width="1200" height="550" fetchPriority="high" /></div>
        </div>
      </section>

      <section className="topic-detail-section" aria-labelledby="topic-preparation-title">
        <div className="topic-page-inner"><p className="eyebrow">TRƯỚC KHI BẮT ĐẦU</p><h2 id="topic-preparation-title">Một chút chuẩn bị, dễ học hơn.</h2><div className="topic-preparation-grid"><div><h3>Chủ đề này phù hợp với ai?</h3><p>{topic.audience}</p></div><div><h3>Bạn nên biết trước</h3><p>{topic.prerequisites}</p></div></div></div>
      </section>

      <section className="topic-detail-section topic-knowledge-section" aria-labelledby="topic-knowledge-title">
        <div className="topic-page-inner"><p className="eyebrow">BỨC TRANH TỔNG QUAN</p><h2 id="topic-knowledge-title">Những kiến thức bạn sẽ khám phá</h2><div className="topic-knowledge-grid">{topic.knowledge.map((item, index) => <div key={item.title}><span className="topic-knowledge-number" aria-hidden="true">0{index + 1}</span><h3>{item.title}</h3><p>{item.description}</p></div>)}</div></div>
      </section>

      <section className="topic-detail-section" id="topic-learning" aria-labelledby="topic-learning-title">
        <div className="topic-page-inner"><p className="eyebrow">CHỌN MỘT BƯỚC ĐỂ BẮT ĐẦU</p><h2 id="topic-learning-title">Thứ tự học gợi ý</h2><p className="topic-section-description">Tìm hiểu lần lượt, hoặc mở ngay nội dung bạn đang cần.</p>
          {topicCourses.length > 0 ? <ol className="topic-learning-list">{topicCourses.map((course, index) => {
            const saved = favoriteIds.includes(course.id);
            return <li key={course.id}><span className="topic-step-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><div className="topic-learning-content"><span className="topic-count">{course.level}</span><h3><Link to={`/courses/${course.id}`}>{course.title}</Link></h3><p>{course.description}</p><div className="topic-learning-actions"><Link to={`/courses/${course.id}`}>Xem nội dung <span aria-hidden="true">→</span></Link><button type="button" aria-pressed={saved} aria-label={`${saved ? 'Bỏ lưu' : 'Lưu'} ${course.title}`} onClick={() => onToggleFavorite(course.id)}>{saved ? 'Đã lưu' : 'Lưu tài liệu'}</button></div></div></li>;
          })}</ol> : <p className="topics-empty">Tài liệu cho chủ đề này đang được chuẩn bị.</p>}
        </div>
      </section>

      <section className="topic-detail-section topic-practice-section" aria-labelledby="topic-practice-title">
        <div className="topic-page-inner topic-practice-layout"><div><p className="eyebrow">THỬ ÁP DỤNG</p><h2 id="topic-practice-title">{topic.practice.title}</h2><p>Một bài thực hành gợi ý để kết nối những điều bạn vừa tìm hiểu.</p></div><ul>{topic.practice.tasks.map((task) => <li key={task}>{task}</li>)}</ul></div>
      </section>

      {nextTopic && <section className="topic-detail-section" aria-labelledby="topic-next-title"><div className="topic-page-inner topic-next-layout"><div><p className="eyebrow">TIẾP TỤC TÌM HIỂU</p><h2 id="topic-next-title">Khám phá chủ đề tiếp theo</h2><p>{topic.nextDescription}</p><Link className="topics-all" to="/topics">Tất cả chủ đề <span aria-hidden="true">→</span></Link></div><TopicCard topic={nextTopic} /></div></section>}
      <Footer topId="topics-top" />
    </div>
  );
}

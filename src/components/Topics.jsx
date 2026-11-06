import { Link } from 'react-router-dom';
import topics from '../data/topics.js';
import courses from '../data/courses.js';

export default function Topics() {
  const availableTopics = topics.map((topic) => ({ ...topic, count: courses.filter((course) => topic.courseIds.includes(course.id)).length })).filter((topic) => topic.count > 0);

  return (
    <section className="topics-section" id="chu-de" aria-labelledby="topics-title">
      <div className="topics-inner">
        <div className="topics-heading">
          <div><p className="eyebrow">KHÁM PHÁ THEO CHỦ ĐỀ</p><h2 id="topics-title">Bạn muốn học điều gì hôm nay?</h2><p>Chọn một điều bạn quan tâm. Bắt đầu từ đó, đi xa hơn mỗi ngày.</p></div>
          <Link className="topics-all" to="/courses">Xem toàn bộ thư viện <span aria-hidden="true">↗</span></Link>
        </div>
        {availableTopics.length > 0 ? <div className="topics-grid">
          {availableTopics.map((topic) => (
            <Link className="topic-card" to={`/courses?topic=${topic.id}`} key={topic.id}>
              <span className="topic-card-cover" aria-hidden="true"><img src={topic.coverImage} alt="" width="1200" height="550" loading="lazy" decoding="async" /></span>
              <div className="topic-card-top"><span className="topic-count">{topic.count} tài liệu</span></div>
              <h3>{topic.title}</h3><p>{topic.description}</p>
              <ul className="topic-tags" aria-label="Nội dung trong chủ đề">{topic.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
              <span className="topic-card-action">Khám phá chủ đề <span aria-hidden="true">↗</span></span>
            </Link>
          ))}
        </div> : <p className="topics-empty">Các chủ đề đang được chuẩn bị. Bạn có thể quay lại sau để khám phá nội dung mới.</p>}
      </div>
    </section>
  );
}

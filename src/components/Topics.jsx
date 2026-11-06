import { Link } from 'react-router-dom';
import topics from '../data/topics.js';
import courses from '../data/courses.js';
import TopicCard from './TopicCard.jsx';

export default function Topics() {
  const availableTopics = topics.map((topic) => ({ ...topic, count: courses.filter((course) => topic.courseIds.includes(course.id)).length })).filter((topic) => topic.count > 0);

  return (
    <section className="topics-section" id="chu-de" aria-labelledby="topics-title">
      <div className="topics-inner">
        <div className="topics-heading">
          <div><p className="eyebrow">KHÁM PHÁ THEO CHỦ ĐỀ</p><h2 id="topics-title">Bạn muốn học điều gì hôm nay?</h2><p>Chọn một điều bạn quan tâm. Bắt đầu từ đó, đi xa hơn mỗi ngày.</p></div>
          <Link className="topics-all" to="/topics">Xem tất cả chủ đề <span aria-hidden="true">↗</span></Link>
        </div>
        {availableTopics.length > 0 ? <div className="topics-grid">
          {availableTopics.map((topic) => (
            <TopicCard topic={topic} key={topic.id} />
          ))}
        </div> : <p className="topics-empty">Các chủ đề đang được chuẩn bị. Bạn có thể quay lại sau để khám phá nội dung mới.</p>}
      </div>
    </section>
  );
}

import { Link } from 'react-router-dom';
import courses from '../data/courses.js';

export default function TopicCard({ topic }) {
  const count = courses.filter((course) => topic.courseIds.includes(course.id)).length;

  return (
    <Link className="topic-card" to={`/topics/${topic.id}`}>
      <span className="topic-card-cover" aria-hidden="true">
        <img src={topic.coverImage} alt="" width="1200" height="550" loading="lazy" decoding="async" />
      </span>
      <div className="topic-card-top"><span className="topic-count">{count} tài liệu</span></div>
      <h3>{topic.title}</h3>
      <p>{topic.description}</p>
      <ul className="topic-tags" aria-label="Kiến thức chính">
        {topic.tags.map((tag) => <li key={tag}>{tag}</li>)}
      </ul>
      <span className="topic-card-action">Khám phá chủ đề <span aria-hidden="true">↗</span></span>
    </Link>
  );
}

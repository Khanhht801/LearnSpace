import { Link } from 'react-router-dom';

export default function CourseCard({ course, isFavorite, onToggleFavorite }) {
  return (
    <article className="course-card">
      <h2>{course.title}</h2>
      <p>
        {course.level} · {course.duration} giờ
      </p>
      <p>{course.description}</p>

      <Link to={`/courses/${course.id}`}>Xem chi tiết</Link>{' '}
      <button aria-pressed={isFavorite} type="button" onClick={() => onToggleFavorite(course.id)}>
        {isFavorite ? 'Bỏ yêu thích' : 'Thêm yêu thích'}
      </button>
    </article>
  );
}

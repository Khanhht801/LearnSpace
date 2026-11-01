import { Link, useParams } from 'react-router-dom';
import courses from '../data/courses.js';

export default function CourseDetail({ favoriteIds, onToggleFavorite }) {
  const { courseId } = useParams();
  const course = courses.find((item) => item.id === Number(courseId));

  if (!course) {
    return (
      <section>
        <h1>Không tìm thấy khóa học</h1>
        <Link to="/courses">Quay lại danh sách</Link>
      </section>
    );
  }

  const isFavorite = favoriteIds.includes(course.id);

  return (
    <article className="course-detail">
      <h1>{course.title}</h1>
      <p>Cấp độ: {course.level}</p>
      <p>Thời lượng: {course.duration} giờ</p>
      <p>{course.description}</p>

      <button aria-pressed={isFavorite} type="button" onClick={() => onToggleFavorite(course.id)}>
        {isFavorite ? 'Bỏ yêu thích' : 'Thêm yêu thích'}
      </button>
      <p>
        <Link to="/courses">Quay lại danh sách</Link>
      </p>
    </article>
  );
}

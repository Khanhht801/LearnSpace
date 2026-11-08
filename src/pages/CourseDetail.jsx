import { useLibrary } from '../hooks/useLibrary.js';
import { Link, useParams } from 'react-router-dom';

export default function CourseDetail({ favoriteIds, onToggleFavorite }) {
  const { courses } = useLibrary();
  const { courseId } = useParams();
  const course = courses.find((item) => item.id === Number(courseId));

  if (!course) {
    return (
      <section>
        <h1>Không tìm thấy tài liệu</h1>
        <Link to="/courses">Quay lại danh sách</Link>
      </section>
    );
  }

  const isFavorite = favoriteIds.includes(course.id);

  return (
    <article className="course-detail">
      <h1>{course.title}</h1>
      {course.file_type && <p>Định dạng: {course.file_type.toUpperCase()}</p>}
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

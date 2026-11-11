import { useLibrary } from '../hooks/useLibrary.js';
import { Link, useParams } from 'react-router-dom';
import Footer from '../components/Footer.jsx';

export default function CourseDetail({ favoriteIds, onToggleFavorite }) {
  const { courses, topics } = useLibrary();
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
  const topic = topics.find((item) => item.categoryId === course.category_id);
  const updated = course.created_at && !Number.isNaN(Date.parse(course.created_at))
    ? new Intl.DateTimeFormat('vi-VN', { dateStyle: 'long' }).format(new Date(course.created_at)) : null;

  return (
    <><article className="course-detail" id="document-top">
      <nav aria-label="Đường dẫn"><Link to="/courses">Thư viện</Link> / {topic && <><Link to={`/topics/${topic.id}`}>{topic.title}</Link> / </>}<span aria-current="page">{course.title}</span></nav>
      <h1>{course.title}</h1>
      {course.file_type && <p>Định dạng: {course.file_type.toUpperCase()}</p>}
      {updated && <p>Ngày thêm: <time dateTime={course.created_at}>{updated}</time></p>}
      <p>{course.description}</p>
      <p>Chức năng đọc và tải tài liệu đang được chuẩn bị.</p>

      <button aria-pressed={isFavorite} type="button" onClick={() => onToggleFavorite(course.id)}>
        {isFavorite ? 'Bỏ yêu thích' : 'Thêm yêu thích'}
      </button>
      <p>
        <Link to="/courses">Quay lại danh sách</Link>
      </p>
    </article><Footer topId="document-top" /></>
  );
}

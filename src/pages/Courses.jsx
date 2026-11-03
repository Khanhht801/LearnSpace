import { useSearchParams } from 'react-router-dom';
import CourseCard from '../components/CourseCard.jsx';
import courses from '../data/courses.js';
import topics from '../data/topics.js';

export default function Courses({ favoriteIds, onToggleFavorite, savedOnly = false }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('q') || '';
  const selectedTopic = topics.find((topic) => topic.id === searchParams.get('topic'));
  const normalize = (value) => value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd');

  const filteredCourses = courses.filter((course) =>
    (!savedOnly || favoriteIds.includes(course.id)) && (!selectedTopic || selectedTopic.courseIds.includes(course.id)) && normalize(course.title).includes(normalize(keyword.trim())),
  );

  return (
    <section className="courses-page">
      <h1>{savedOnly ? 'Tài liệu đã lưu' : 'Thư viện tài liệu'}</h1>
      {selectedTopic && <p>Chủ đề: <strong>{selectedTopic.title}</strong> <button type="button" onClick={() => setSearchParams(keyword ? { q: keyword } : {})}>Bỏ lọc chủ đề</button></p>}
      {savedOnly && <p>Danh sách được lưu trên trình duyệt hiện tại, chưa đồng bộ giữa thiết bị.</p>}

      <label htmlFor="course-search">Tìm tài liệu: </label>
      <input
        id="course-search"
        type="search"
        value={keyword}
        onChange={(event) => setSearchParams((current) => { const next = new URLSearchParams(current); if (event.target.value) next.set('q', event.target.value); else next.delete('q'); return next; }, { replace: true })}
        placeholder="Ví dụ: React"
      />

      <p>Tìm thấy {filteredCourses.length} tài liệu.</p>

      {filteredCourses.length > 0 ? (
        <div className="course-grid">{filteredCourses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            isFavorite={favoriteIds.includes(course.id)}
            onToggleFavorite={onToggleFavorite}
          />
        ))}</div>
      ) : (
        <p>{savedOnly ? 'Chưa có tài liệu đã lưu phù hợp. Hãy mở thư viện để chọn tài liệu bạn muốn học lại.' : 'Không có tài liệu phù hợp.'}</p>
      )}
    </section>
  );
}

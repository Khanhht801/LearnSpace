import { useState } from 'react';
import CourseCard from '../components/CourseCard.jsx';
import courses from '../data/courses.js';

export default function Courses({ favoriteIds, onToggleFavorite }) {
  const [keyword, setKeyword] = useState('');

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(keyword.trim().toLowerCase()),
  );

  return (
    <section className="courses-page">
      <h1>Danh sách khóa học</h1>

      <label htmlFor="course-search">Tìm khóa học: </label>
      <input
        id="course-search"
        type="search"
        value={keyword}
        onChange={(event) => setKeyword(event.target.value)}
        placeholder="Ví dụ: React"
      />

      <p>Tìm thấy {filteredCourses.length} khóa học.</p>

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
        <p>Không có khóa học phù hợp.</p>
      )}
    </section>
  );
}

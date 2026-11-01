import { useEffect, useState } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import './App.css';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import CourseDetail from './pages/CourseDetail.jsx';
import Courses from './pages/Courses.jsx';
import Home from './pages/Home.jsx';
import NotFound from './pages/NotFound.jsx';

function getInitialFavoriteIds() {
  const savedValue = localStorage.getItem('favoriteCourseIds');

  if (!savedValue) {
    return [];
  }

  try {
    const parsedValue = JSON.parse(savedValue);
    return Array.isArray(parsedValue) ? parsedValue : [];
  } catch {
    return [];
  }
}

export default function App() {
  const [favoriteIds, setFavoriteIds] = useState(getInitialFavoriteIds);

  useEffect(() => {
    localStorage.setItem('favoriteCourseIds', JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  function handleToggleFavorite(courseId) {
    setFavoriteIds((currentIds) =>
      currentIds.includes(courseId)
        ? currentIds.filter((id) => id !== courseId)
        : [...currentIds, courseId],
    );
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <NavLink className="brand" to="/">Learn<span>Space</span></NavLink>
        <nav aria-label="Điều hướng chính">
          <NavLink to="/" end>Trang chủ</NavLink>
          <NavLink to="/about">Giới thiệu</NavLink>
          <NavLink to="/courses">Khóa học</NavLink>
          <NavLink to="/contact">Liên hệ</NavLink>
        </nav>
        <p className="favorite-count">Yêu thích <strong>{favoriteIds.length}</strong></p>
      </header>

      <main className="main-content" id="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/courses"
            element={
              <Courses
                favoriteIds={favoriteIds}
                onToggleFavorite={handleToggleFavorite}
              />
            }
          />
          <Route
            path="/courses/:courseId"
            element={
              <CourseDetail
                favoriteIds={favoriteIds}
                onToggleFavorite={handleToggleFavorite}
              />
            }
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}


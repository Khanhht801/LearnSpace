import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import CourseDetail from './pages/CourseDetail.jsx';
import Courses from './pages/Courses.jsx';
import Home from './pages/Home.jsx';
import NotFound from './pages/NotFound.jsx';

function getInitialFavoriteIds() {
  try {
  const savedValue = localStorage.getItem('favoriteCourseIds');

  if (!savedValue) {
    return [];
  }

    const parsedValue = JSON.parse(savedValue);
    return Array.isArray(parsedValue) ? parsedValue.filter((id) => Number.isInteger(id)) : [];
  } catch {
    return [];
  }
}

export default function App() {
  const [favoriteIds, setFavoriteIds] = useState(getInitialFavoriteIds);
  const [storageError, setStorageError] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('favoriteCourseIds', JSON.stringify(favoriteIds));
      setStorageError(false);
    } catch {
      setStorageError(true);
    }
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
      <Header savedCount={favoriteIds.length} />
      {storageError && <p className="storage-notice" role="status">Trình duyệt không cho phép lưu lâu dài. Danh sách đã lưu chỉ được giữ trong phiên hiện tại.</p>}

      <main className="main-content" id="main-content">
        <Routes>
          <Route path="/" element={<Home favoriteIds={favoriteIds} onToggleFavorite={handleToggleFavorite} />} />
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
          <Route path="/saved" element={<Courses favoriteIds={favoriteIds} onToggleFavorite={handleToggleFavorite} savedOnly />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}


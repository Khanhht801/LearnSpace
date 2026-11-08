import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { LibraryBoundary, LibraryProvider } from './hooks/LibraryProvider.jsx';
import './App.css';
import Header from './components/Header.jsx';
import ScrollToLocation from './components/ScrollToLocation.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import CourseDetail from './pages/CourseDetail.jsx';
import Courses from './pages/Courses.jsx';
import Home from './pages/Home.jsx';
import NotFound from './pages/NotFound.jsx';
import Topics from './pages/Topics.jsx';
import TopicDetail from './pages/TopicDetail.jsx';
import Auth from './pages/Auth.jsx';

function getInitialFavoriteIds() {
  try {
  const savedValue = localStorage.getItem('savedDocumentIds');

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
      localStorage.setItem('savedDocumentIds', JSON.stringify(favoriteIds));
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
      <ScrollToLocation />
      <Header />
      {storageError && <p className="storage-notice" role="status">Trình duyệt không cho phép lưu lâu dài. Danh sách đã lưu chỉ được giữ trong phiên hiện tại.</p>}

      <main className="main-content" id="main-content">
        <LibraryProvider>
          <Routes>
            <Route path="/login" element={<Auth key="login" />} />
            <Route path="/register" element={<Auth key="register" register />} />
            <Route path="/" element={<Home favoriteIds={favoriteIds} onToggleFavorite={handleToggleFavorite} />} />
            <Route path="/topics" element={<Topics />} />
            <Route
              path="/courses"
              element={<Courses favoriteIds={favoriteIds} onToggleFavorite={handleToggleFavorite} />}
            />
            <Route path="/saved" element={<Courses favoriteIds={favoriteIds} onToggleFavorite={handleToggleFavorite} savedOnly />} />
            <Route element={<LibraryBoundary />}>
              <Route path="/topics/:topicId" element={<TopicDetail favoriteIds={favoriteIds} onToggleFavorite={handleToggleFavorite} />} />
              <Route
                path="/courses/:courseId"
                element={
                  <CourseDetail
                    favoriteIds={favoriteIds}
                    onToggleFavorite={handleToggleFavorite}
                  />
                }
              />
            </Route>
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </LibraryProvider>
      </main>
    </div>
  );
}


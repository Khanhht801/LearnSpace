import { lazy, Suspense, useEffect } from 'react';
import { Navigate, Outlet, Route, Routes, useLocation, useMatch } from 'react-router-dom';
import { LibraryBoundary, LibraryProvider } from './hooks/LibraryProvider.jsx';
import './App.css';
import Header from './components/Header.jsx';
import ScrollToLocation from './components/ScrollToLocation.jsx';
import Home from './pages/Home.jsx';
import { useAuth } from './hooks/useAuth.js';
import { useSavedDocuments } from './hooks/useSavedDocuments.js';
import './auth.css';

const About = lazy(() => import('./pages/About.jsx'));
const Contact = lazy(() => import('./pages/Contact.jsx'));
const CourseDetail = lazy(() => import('./pages/CourseDetail.jsx'));
const Courses = lazy(() => import('./pages/Courses.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));
const Topics = lazy(() => import('./pages/Topics.jsx'));
const TopicDetail = lazy(() => import('./pages/TopicDetail.jsx'));
const Auth = lazy(() => import('./pages/Auth.jsx'));
const ConfirmEmail = lazy(() => import('./pages/ConfirmEmail.jsx'));
const PasswordRecovery = lazy(() => import('./pages/PasswordRecovery.jsx'));
const Contribute = lazy(() => import('./pages/Contribute.jsx'));
const MyContributions = lazy(() => import('./pages/MyContributions.jsx'));
const Moderation = lazy(() => import('./pages/Moderation.jsx'));

function RequireAuth() {
  const { session, loading, error } = useAuth();
  const location = useLocation();
  if (loading) return <section className="library-inner" role="status">Đang kiểm tra phiên đăng nhập…</section>;
  if (error) return <section className="library-inner" role="alert">Không thể kiểm tra phiên đăng nhập. Vui lòng tải lại trang và thử lại.</section>;
  if (!session) return <Navigate to="/auth/login" replace state={{ from: location.pathname + location.search + location.hash }} />;
  return <Outlet />;
}

function RequireAdmin() {
  const { session } = useAuth();
  return session?.user.app_metadata?.learnspace_role === 'admin' ? <Outlet /> : <section className="library-inner"><h1>Không có quyền truy cập</h1><p>Trang này chỉ dành cho quản trị viên.</p></section>;
}

export default function App() {
  const { pathname } = useLocation();
  const isLoginPage = useMatch('/login');
  const isRegisterPage = useMatch('/register');
  const isAuthPage = useMatch('/auth/*');
  const saved = useSavedDocuments();

  useEffect(() => {
    if (/^\/courses\/\d+$/.test(pathname)) return;
    const titles = { '/': 'Trang chủ', '/courses': 'Thư viện', '/topics': 'Chủ đề', '/saved': 'Tài liệu đã lưu', '/about': 'Giới thiệu', '/contact': 'Liên hệ', '/contribute': 'Gửi tài liệu', '/my-contributions': 'Tài liệu đã gửi', '/moderation': 'Kiểm duyệt', '/auth/login': 'Đăng nhập', '/auth/register': 'Đăng ký', '/auth/forgot-password': 'Quên mật khẩu', '/auth/reset-password': 'Đặt lại mật khẩu' };
    document.title = `${titles[pathname] || 'LearnSpace'} | LearnSpace`;
  }, [pathname]);

  useEffect(() => {
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const sections = document.querySelectorAll('.main-content > section:not(.welcome-page), .main-content > div > section, .main-content > .personal-sections > section');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('motion-reveal');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0, rootMargin: '0px 0px -40px 0px' });

    sections.forEach((section) => {
      if (section.firstElementChild) observer.observe(section.firstElementChild);
    });
    return () => observer.disconnect();
  }, [pathname]);

  const favoriteIds = saved.ids;
  const handleToggleFavorite = saved.toggle;

  return (
    <div className="app-shell">
      <ScrollToLocation />
      {!isAuthPage && !isLoginPage && !isRegisterPage && <Header />}
      {saved.error && <div className="storage-notice" role="alert">{saved.error} <button type="button" onClick={saved.retry}>Thử lại</button></div>}

      <main className="main-content" id="main-content">
        <LibraryProvider>
          <Suspense fallback={<section className="library-inner" role="status">Đang tải trang…</section>}><Routes>
            <Route path="/auth">
              <Route index element={<Auth key="callback" />} />
              <Route path="confirm" element={<ConfirmEmail />} />
              <Route path="login" element={<Auth key="login" />} />
              <Route path="register" element={<Auth key="register" register />} />
              <Route path="forgot-password" element={<PasswordRecovery />} />
              <Route path="reset-password" element={<PasswordRecovery reset />} />
              <Route path="*" element={<Navigate to="/auth/login" replace />} />
            </Route>
            <Route path="/login" element={<Navigate to="/auth/login" replace />} />
            <Route path="/register" element={<Navigate to="/auth/register" replace />} />
            <Route path="/" element={<Home favoriteIds={favoriteIds} onToggleFavorite={handleToggleFavorite} savedLoading={saved.loading} savedReady={saved.ready} />} />
            <Route path="/topics" element={<Topics />} />
            <Route
              path="/courses"
              element={<Courses favoriteIds={favoriteIds} onToggleFavorite={handleToggleFavorite} />}
            />
            <Route element={<RequireAuth />}><Route path="/saved" element={<Courses favoriteIds={favoriteIds} onToggleFavorite={handleToggleFavorite} savedOnly savedLoading={saved.loading} savedReady={saved.ready} />} /></Route>
            <Route element={<RequireAuth />}>
              <Route path="/contribute" element={<Contribute />} />
              <Route path="/my-contributions" element={<MyContributions />} />
              <Route element={<RequireAdmin />}><Route path="/moderation" element={<Moderation />} /></Route>
            </Route>
            <Route element={<LibraryBoundary />}>
              <Route path="/topics/:topicId" element={<TopicDetail favoriteIds={favoriteIds} onToggleFavorite={handleToggleFavorite} />} />
              <Route element={<RequireAuth />}><Route
                path="/courses/:courseId"
                element={
                  <CourseDetail
                    favoriteIds={favoriteIds}
                    onToggleFavorite={handleToggleFavorite}
                  />
                }
              /></Route>
            </Route>
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes></Suspense>
        </LibraryProvider>
      </main>
    </div>
  );
}


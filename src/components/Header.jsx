import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import topics from '../data/topics.js';

export default function Header({ savedCount }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header" onKeyDown={(event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        event.currentTarget.querySelector('.menu-toggle')?.focus();
      }
    }}>
      <NavLink className="brand" to="/#hero" onClick={() => { closeMenu(); if (location.pathname === '/') window.scrollTo({ top: 0 }); }} aria-label="LearnSpace — Trang chủ">
        <img className="brand-logo" src="/logo.png" alt="LearnSpace" width="2160" height="720" />
      </NavLink>
      <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="primary-navigation" aria-label={menuOpen ? 'Đóng menu' : 'Mở menu'} onClick={() => setMenuOpen(!menuOpen)}>
        <span aria-hidden="true">{menuOpen ? '✕' : '☰'}</span>
      </button>
      <nav id="primary-navigation" className={menuOpen ? 'primary-nav is-open' : 'primary-nav'} aria-label="Điều hướng chính">
        <NavLink to="/about" onClick={closeMenu}>Giới thiệu</NavLink>
        <details className="topic-menu" key={location.key}
          onPointerEnter={(event) => { if (event.pointerType === 'mouse') event.currentTarget.open = true; }}
          onPointerLeave={(event) => { if (event.pointerType === 'mouse' && !event.currentTarget.contains(document.activeElement)) event.currentTarget.open = false; }}
          onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) event.currentTarget.open = false; }}
          onKeyDown={(event) => { if (event.key === 'Escape') { event.stopPropagation(); event.currentTarget.open = false; event.currentTarget.querySelector('summary').focus(); } }}>
          <summary>Chủ đề</summary>
          <div className="topic-dropdown">
            <span className="dropdown-label">KHÁM PHÁ CHỦ ĐỀ</span>
            <Link to="/courses" onClick={closeMenu}>Tất cả chủ đề</Link>
            {topics.map((topic) => {
              const isActive = location.pathname === '/courses' && new URLSearchParams(location.search).get('topic') === topic.id;
              return <Link key={topic.id} to={`/courses?topic=${topic.id}`} className={isActive ? 'active' : undefined} aria-current={isActive ? 'page' : undefined} onClick={closeMenu}>{topic.title}</Link>;
            })}
          </div>
        </details>
        <NavLink to="/courses" onClick={closeMenu}>Thư viện</NavLink>
        <NavLink to="/contact" onClick={closeMenu}>Đóng góp</NavLink>
      </nav>
      <NavLink className="saved-link" to="/saved" onClick={closeMenu} aria-label={`Đã lưu: ${savedCount} tài liệu`}>
        <svg width="18" height="20" viewBox="0 0 18 20" fill="none" aria-hidden="true"><path d="M4 2h10a1 1 0 0 1 1 1v14l-6-4-6 4V3a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /></svg>
        <span>Đã lưu</span><strong>{savedCount}</strong>
      </NavLink>
    </header>
  );
}

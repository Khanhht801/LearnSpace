import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

export default function Header() {
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
        <NavLink to="/" end onClick={closeMenu}>Trang chủ</NavLink>
        <NavLink to="/about" onClick={closeMenu}>Giới thiệu</NavLink>
        <NavLink to="/topics" onClick={closeMenu}>Chủ đề</NavLink>
        <NavLink to="/courses" onClick={closeMenu}>Thư viện</NavLink>
        <NavLink to="/contact" onClick={closeMenu}>Đóng góp</NavLink>
      </nav>
      <NavLink className="login-button" to="/login" onClick={closeMenu}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.6" /><path d="M4 21v-2a8 8 0 0 1 16 0v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
        <span>Đăng nhập</span>
      </NavLink>
    </header>
  );
}

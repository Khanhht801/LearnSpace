import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section>
      <h1>404 — Không tìm thấy trang</h1>
      <Link to="/">Quay về trang chủ</Link>
    </section>
  );
}
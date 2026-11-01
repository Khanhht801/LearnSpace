import { Link } from 'react-router-dom';

export default function About() {
  return (
    <section className="about-page">
      <p className="eyebrow">VỀ LEARNSPACE</p>
      <h1>Giới thiệu</h1>
      <p className="page-intro">Một không gian nhỏ dành cho hành trình học lập trình của bạn.</p>
      <div className="about-content">
        <h2>Kiến thức rõ ràng, học tập chủ động.</h2>
        <p>LearnSpace tập hợp các khóa học về React, điều hướng và làm việc với API. Bạn có thể tìm kiếm khóa học, xem nội dung chi tiết và lưu lại những khóa học yêu thích để dễ dàng quay lại.</p>
        <Link className="button-link" to="/courses">Xem các khóa học →</Link>
      </div>
    </section>
  );
}

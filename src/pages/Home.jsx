import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <section className="welcome-page">
      <p className="eyebrow">HỌC TỪNG CHÚT, TIẾN XA HƠN</p>
      <h1>Bắt đầu hành trình<br />học React của bạn.</h1>
      <p className="page-intro">Khám phá các khóa học, xây dựng nền tảng vững chắc và từng bước tạo nên ứng dụng của riêng bạn.</p>
      <Link className="button-link" to="/courses">Khám phá khóa học <span aria-hidden="true">→</span></Link>
    </section>
  );
}

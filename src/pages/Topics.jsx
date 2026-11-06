import { Link } from 'react-router-dom';
import Footer from '../components/Footer.jsx';
import TopicCard from '../components/TopicCard.jsx';
import topics from '../data/topics.js';
import '../topics.css';

export default function Topics() {
  const startingTopic = topics.find((topic) => topic.id === 'react');

  return (
    <div className="topics-page" id="topics-top">
      <section className="topics-page-intro" aria-labelledby="topics-page-title">
        <div className="topic-page-inner">
          <nav className="topic-breadcrumb" aria-label="Đường dẫn"><Link to="/">Trang chủ</Link><span aria-hidden="true">/</span><span aria-current="page">Chủ đề</span></nav>
          <p className="eyebrow">KHÁM PHÁ CHỦ ĐỀ</p>
          <h1 id="topics-page-title">Bạn muốn tìm hiểu<br /><span>điều gì hôm nay?</span></h1>
          <p className="topics-page-lead">Khám phá kiến thức theo từng chủ đề và tìm điểm bắt đầu phù hợp với bạn.</p>
          <div className="topics-intro-bottom"><span>Mỗi chủ đề, một hướng khám phá.</span><a href="#topic-list">Chọn chủ đề của bạn <span aria-hidden="true">↓</span></a></div>
        </div>
      </section>

      <section className="topics-page-catalog" id="topic-list" aria-labelledby="topic-list-title">
        <div className="topic-page-inner">
          <div className="topic-section-heading"><div><p className="eyebrow">TÌM ĐIỀU BẠN QUAN TÂM</p><h2 id="topic-list-title">Các chủ đề để khám phá</h2></div><span className="topics-catalog-count">{topics.length} chủ đề hiện có</span></div>
          {topics.length > 0 ? <div className="topics-grid">{topics.map((topic) => <TopicCard key={topic.id} topic={topic} />)}</div> : <p className="topics-empty">Các chủ đề đang được chuẩn bị. Bạn hãy quay lại sau để khám phá nội dung mới.</p>}
        </div>
      </section>

      {startingTopic && <section className="topics-page-start" aria-labelledby="topics-start-title">
        <div className="topic-page-inner topic-start-layout">
          <div className="topic-start-copy"><p className="eyebrow">MỘT GỢI Ý CHO BẠN</p><h2 id="topics-start-title">Chưa biết <br />bắt đầu từ đâu?</h2><p>Nếu đã biết JavaScript cơ bản, bạn có thể bắt đầu với React. Làm quen từng khái niệm nhỏ trước khi xây dựng một ứng dụng có nhiều trang.</p><Link className="button-link" to={`/topics/${startingTopic.id}`}>Khám phá React <span aria-hidden="true">→</span></Link></div>
          <ol className="topic-start-steps" aria-label="Thứ tự tìm hiểu React">
            <li><span className="topic-step-number" aria-hidden="true">01</span><div><h3>Component & JSX</h3><p>Chia giao diện thành những phần nhỏ, dễ hiểu.</p></div></li>
            <li><span className="topic-step-number" aria-hidden="true">02</span><div><h3>Props & State</h3><p>Truyền dữ liệu và cập nhật giao diện theo tương tác.</p></div></li>
            <li><span className="topic-step-number" aria-hidden="true">03</span><div><h3>React Router</h3><p>Kết nối các trang thành một ứng dụng.</p></div></li>
          </ol>
        </div>
      </section>}

      <section className="topics-page-suggest" aria-labelledby="topics-suggest-title">
        <div className="topic-page-inner topic-suggest-layout"><div><p className="eyebrow">CÙNG MỞ RỘNG TRI THỨC</p><h2 id="topics-suggest-title">Bạn muốn học thêm chủ đề nào?</h2><p>Gửi đề xuất để LearnSpace bổ sung những nội dung bạn quan tâm.</p></div><Link className="topic-outline-link" to="/#gop-y">Gửi đề xuất <span aria-hidden="true">↗</span></Link></div>
      </section>
      <Footer topId="topics-top" />
    </div>
  );
}

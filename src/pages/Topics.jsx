import { Link } from 'react-router-dom';
import Footer from '../components/Footer.jsx';
import GalleryHoverCarousel from '../components/ui/gallery-hover-carousel.jsx';
import topics from '../data/topics.js';
import '../topics.css';

export default function Topics() {
  const startingTopic = topics.find((topic) => topic.id === 'react');

  return (
    <div className="topics-page" id="topics-top">
      <section className="topics-page-intro topics-discovery-intro" aria-labelledby="topics-page-title">
        <div className="topic-page-inner topics-discovery-layout">
          <div className="topics-discovery-copy">
            <p className="eyebrow">KHÁM PHÁ CHỦ ĐỀ</p>
            <h1 id="topics-page-title">Bạn muốn tìm hiểu<br /><span>điều gì hôm nay?</span></h1>
            <p className="topics-page-lead">Khám phá kiến thức theo từng chủ đề và tìm điểm bắt đầu phù hợp với bạn.</p>
          </div>
          <img className="topics-discovery-mascot" src="/mascot-topics.png" alt="Linh vật LearnSpace: chú gà vàng đeo khăn đỏ, cầm sách và vẫy cánh mời bạn khám phá chủ đề" width="1254" height="1254" fetchPriority="high" />
        </div>
      </section>

      <section className="topics-page-catalog" id="topic-list" aria-labelledby="topic-list-title">
        <div className="topic-page-inner">
          <GalleryHoverCarousel
            heading="Các chủ đề để khám phá"
            description="Chọn điều bạn quan tâm và khám phá kiến thức theo cách của bạn."
            items={topics.map((topic) => ({
              id: topic.id,
              title: topic.title,
              summary: topic.description,
              url: `/topics/${topic.id}`,
              image: topic.coverImage,
            }))}
          />
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

import { useLibrary } from '../hooks/useLibrary.js';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer.jsx';
import GalleryHoverCarousel from '../components/ui/gallery-hover-carousel.jsx';
import '../topics.css';

export default function Topics() {
  const { topics } = useLibrary();

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


      <section className="topics-page-suggest" aria-labelledby="topics-suggest-title">
        <div className="topic-page-inner topic-suggest-layout"><div><p className="eyebrow">CÙNG MỞ RỘNG TRI THỨC</p><h2 id="topics-suggest-title">Bạn muốn học thêm chủ đề nào?</h2><p>Gửi đề xuất để LearnSpace bổ sung những nội dung bạn quan tâm.</p></div><Link className="topic-outline-link" to="/#gop-y">Gửi đề xuất <span aria-hidden="true">↗</span></Link></div>
      </section>
      <Footer topId="topics-top" />
    </div>
  );
}

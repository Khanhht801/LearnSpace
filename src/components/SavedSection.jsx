import { Link } from 'react-router-dom';
import courses from '../data/courses.js';

export default function SavedSection({ favoriteIds, onToggleFavorite }) {
  const saved = courses.filter((course) => favoriteIds.includes(course.id));
  return (
    <section className="saved-section" id="da-luu" aria-labelledby="saved-title">
      <div className="landing-inner">
        <div className="library-heading"><div><p className="eyebrow">GÓC HỌC TẬP CỦA BẠN</p><h2 id="saved-title">Điều hay đã lưu,<br /><span>sẵn sàng để học tiếp.</span></h2></div><Link className="topics-all" to="/saved">Xem tất cả đã lưu <span aria-hidden="true">↗</span></Link></div>
        {saved.length > 0 ? <ul className="saved-preview">{saved.slice(0, 3).map((course) => <li key={course.id}><div><span className="saved-level">{course.level}</span><h3><Link to={`/courses/${course.id}`}>{course.title}</Link></h3><p>{course.description}</p></div><div className="saved-preview-actions"><Link className="button-link" to={`/courses/${course.id}`}>Tiếp tục đọc <span aria-hidden="true">↗</span></Link><button type="button" className="saved-remove" onClick={() => onToggleFavorite(course.id)} aria-label={`Bỏ lưu ${course.title}`}>Bỏ lưu</button></div></li>)}</ul> : <div className="saved-empty"><span className="saved-empty-icon" aria-hidden="true">⌑</span><h3>Chưa có tài liệu đã lưu</h3><p>Gặp nội dung bạn thích? Nhấn “Lưu” trên thẻ tài liệu để dễ dàng quay lại học tiếp.</p><a className="button-link" href="#thu-vien">Khám phá tài liệu <span aria-hidden="true">↗</span></a></div>}
      </div>
    </section>
  );
}

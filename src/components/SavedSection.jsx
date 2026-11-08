import { useLibrary } from '../hooks/useLibrary.js';
import { Link } from 'react-router-dom';

export default function SavedSection({ favoriteIds, onToggleFavorite }) {
  const { courses } = useLibrary();
  const saved = courses.filter((course) => favoriteIds.includes(course.id));
  return (
    <section className="saved-section" id="da-luu" aria-labelledby="saved-title">
      <div className="landing-inner">
        <div className="library-heading"><div><p className="eyebrow">GÓC HỌC TẬP CỦA BẠN</p><h2 id="saved-title">Điều hay đã lưu,<br /><span>sẵn sàng để học tiếp.</span></h2></div>{saved.length > 0 && <Link className="topics-all" to="/saved">Xem tất cả đã lưu <span aria-hidden="true">↗</span></Link>}</div>
        {saved.length > 0 ? <ul className="saved-preview">{saved.slice(0, 3).map((course) => <li key={course.id}><div><span className="saved-level">{course.file_type?.toUpperCase()}</span><h3><Link to={`/courses/${course.id}`}>{course.title}</Link></h3><p>{course.description}</p></div><div className="saved-preview-actions"><Link className="button-link" to={`/courses/${course.id}`}>Tiếp tục đọc <span aria-hidden="true">↗</span></Link><button type="button" className="saved-remove" onClick={() => onToggleFavorite(course.id)} aria-label={`Bỏ lưu ${course.title}`}>Bỏ lưu</button></div></li>)}</ul> : <div className="saved-empty-scene">
          <div className="saved-empty-back" aria-hidden="true" />
          <div className="saved-empty">
            <span className="saved-empty-icon" aria-hidden="true"><svg width="42" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2h12a1 1 0 0 1 1 1v19l-7-5-7 5V3a1 1 0 0 1 1-1Z" /></svg><i /><i /><i /></span>
            <h3>Bộ sưu tập của bạn đang chờ tài liệu đầu tiên</h3>
            <p>Lưu lại những nội dung bạn muốn đọc tiếp để việc học<br className="saved-desktop-break" /> liền mạch và dễ dàng hơn.</p>
            <div className="saved-suggestions"><Link to="/courses?q=React"><span aria-hidden="true">&lt;/&gt;</span> React</Link><Link to="/courses?q=Router"><span aria-hidden="true">▤</span> React Router</Link><Link to="/courses?q=API"><span aria-hidden="true">▥</span> API</Link></div>
            <a className="button-link saved-explore" href="#thu-vien">Khám phá thư viện <span aria-hidden="true">→</span></a>
          </div>
          <img className="saved-mascot" src="/mascot-reading.png" alt="Linh vật LearnSpace ngồi đọc sách cạnh ba lô đỏ" width="1024" height="1024" loading="lazy" />
          <span className="saved-spark saved-spark-left" aria-hidden="true">✧</span><span className="saved-spark saved-spark-right" aria-hidden="true">✧</span>
        </div>}
      </div>
    </section>
  );
}

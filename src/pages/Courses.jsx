import { useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer.jsx';
import courses from '../data/courses.js';
import topics from '../data/topics.js';
import '../library.css';

export default function Courses({ favoriteIds, onToggleFavorite, savedOnly = false }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('q') || '';
  const selectedTopic = topics.find((topic) => topic.id === searchParams.get('topic'));
  const levels = [...new Set(courses.map((course) => course.level))];
  const selectedLevel = levels.includes(searchParams.get('level')) ? searchParams.get('level') : '';
  const hasFilters = Boolean(keyword || selectedTopic || selectedLevel);
  const savedCount = courses.filter((course) => favoriteIds.includes(course.id)).length;
  function updateFilter(key, value) {
    setSearchParams((current) => {
      const next = new URLSearchParams(current);
      if (value) next.set(key, value);
      else next.delete(key);
      return next;
    }, { replace: true });
  }
  const normalize = (value) => value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd');

  const filteredCourses = courses.filter((course) =>
    (!savedOnly || favoriteIds.includes(course.id)) && (!selectedTopic || selectedTopic.courseIds.includes(course.id)) && (!selectedLevel || selectedLevel === course.level) && normalize(`${course.title} ${course.description}`).includes(normalize(keyword.trim())),
  );

  return (
    <div className="library-page" id="library-top">
      <section className="library-intro" aria-labelledby="library-page-title">
        <div className="library-inner library-intro-layout">
          <div>
            <p className="eyebrow">{savedOnly ? 'GÓC HỌC TẬP CỦA BẠN' : 'THƯ VIỆN LEARNSPACE'}</p>
            <h1 id="library-page-title">{savedOnly ? <>Tài liệu đã lưu.<br /><span>Kiến thức để dành.</span></> : <>Tìm kiến thức cho<br /><span>bước tiếp theo.</span></>}</h1>
            <p className="library-lead">{savedOnly ? 'Những nội dung bạn quan tâm, sẵn sàng để khám phá khi bạn cần.' : 'Khám phá tài liệu về React và phát triển ứng dụng web. Chọn nội dung phù hợp và lưu lại để học khi cần.'}</p>
            <label htmlFor="course-search" className="sr-only">Tìm tài liệu theo tên hoặc mô tả</label>
            <div className="library-search"><svg width="23" height="23" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="1.7" /><path d="m16 16 5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg><input id="course-search" type="search" value={keyword} onChange={(event) => updateFilter('q', event.target.value)} placeholder="Tìm tài liệu, ví dụ: React, props, API…" /></div>
            {savedOnly && <p className="library-storage-note">Danh sách được lưu trên trình duyệt hiện tại, chưa đồng bộ giữa thiết bị.</p>}
          </div>
          <div className="library-mascot-wrap"><img src="/mascot-library.png" width="1254" height="1254" className="library-mascot" alt="" fetchPriority="high" /><span className="library-mascot-caption">Mỗi trang đọc, một điều mới.</span></div>
        </div>
      </section>
      <section className="library-catalog" id="library-catalog" aria-labelledby="library-catalog-title">
        <div className="library-inner">
          <p className="sr-only" role="status" aria-atomic="true">Tìm thấy {filteredCourses.length} tài liệu</p>
          <div className="library-catalog-heading"><div><p className="eyebrow">{savedOnly ? 'ĐÃ CHỌN CHO RIÊNG MÌNH' : 'ĐỌC, HIỂU VÀ KHÁM PHÁ'}</p><h2 id="library-catalog-title">{savedOnly ? 'Những tài liệu bạn muốn đọc lại' : 'Một tài liệu hay. Một bước tiến mới.'}</h2></div><span className="library-catalog-label">Học theo nhịp của bạn</span></div>
          {filteredCourses.length > 0 ? <div className="library-grid">{filteredCourses.map((course) => {
            const topic = topics.find((item) => item.courseIds.includes(course.id));
            const saved = favoriteIds.includes(course.id);
            return <article className="library-card" key={course.id}><div className="library-card-cover"><img src={course.coverImage} alt="" width="960" height="520" loading="lazy" decoding="async" /></div><div className="library-card-body"><div className="library-card-meta"><span>{topic?.title || 'Kiến thức'}</span><span>{course.level}</span></div><h3><Link to={`/courses/${course.id}`}>{course.title}</Link></h3><p>{course.description}</p><div className="library-card-actions"><Link to={`/courses/${course.id}`}>Xem tài liệu <span aria-hidden="true">→</span></Link><button type="button" aria-pressed={saved} aria-label={`${saved ? 'Bỏ lưu' : 'Lưu'} ${course.title}`} onClick={() => onToggleFavorite(course.id)}><Bookmark filled={saved} />{saved ? 'Đã lưu' : 'Lưu'}</button></div></div></article>;
          })}</div> : <div className="library-empty"><Bookmark /><h3>{savedOnly && !hasFilters ? 'Chưa có tài liệu đã lưu.' : 'Chưa tìm thấy tài liệu phù hợp.'}</h3><p>{savedOnly && !hasFilters ? 'Khám phá thư viện và lưu những nội dung bạn muốn tìm hiểu.' : 'Thử từ khóa khác hoặc xóa bộ lọc để xem lại danh sách tài liệu.'}</p>{hasFilters ? <button type="button" onClick={() => setSearchParams({}, { replace: true })}>Xóa tìm kiếm và bộ lọc</button> : <Link className="button-link" to="/courses">Khám phá thư viện →</Link>}</div>}
        </div>
      </section>
      {!savedOnly && <>
        <section className="library-saved-section" aria-labelledby="library-saved-title"><div className="library-inner library-saved-layout"><div className="library-saved-icon" aria-hidden="true"><Bookmark filled /></div><div className="library-saved-copy"><p className="eyebrow">GÓC NHỎ CỦA BẠN</p><h2 id="library-saved-title">{savedCount ? 'Để dành hôm trước, khám phá hôm nay.' : 'Giữ lại điều bạn muốn tìm hiểu.'}</h2><p>{savedCount ? <>Bạn có <strong>{savedCount} tài liệu đã lưu</strong>. Mở danh sách để chọn nội dung muốn đọc tiếp.</> : 'Nhấn biểu tượng lưu trên tài liệu để dễ dàng tìm lại khi cần.'}</p><p className="library-storage-note">Tài liệu đã lưu được giữ trên trình duyệt hiện tại.</p></div><Link className="library-outline-link" to="/saved">Xem tài liệu đã lưu <span aria-hidden="true">→</span></Link></div></section>
        <section className="library-practice" aria-labelledby="library-practice-title"><div className="library-inner library-practice-layout">
          <div className="library-practice-copy"><p className="eyebrow">THỬ SỨC VỚI REACT</p><h2 id="library-practice-title">Đọc hiểu rồi,<br /><span>thử làm nhé.</span></h2><p>Kết hợp những điều vừa học để tự xây dựng một ứng dụng ghi chú nhỏ của riêng bạn.</p><div className="library-practice-tags" aria-label="Kiến thức áp dụng"><span>Component</span><span>Props</span><span>State</span><span>React Router</span></div></div>
          <div className="library-practice-brief"><div className="library-brief-heading"><span>BÀI THỰC HÀNH</span><span aria-hidden="true">&lt;/&gt;</span></div><h3>Ứng dụng ghi chú của bạn</h3><ol><li><strong>Thêm và xóa ghi chú</strong><p>Nhập nội dung, hiển thị danh sách và xóa từng ghi chú.</p></li><li><strong>Tìm lại điều đã ghi</strong><p>Lọc danh sách ghi chú theo từ khóa người dùng nhập.</p></li><li><strong>Kết nối hai trang</strong><p>Tạo trang ghi chú và trang giới thiệu bằng React Router.</p></li></ol><details><summary>Xem yêu cầu & cách tự kiểm tra</summary><div className="library-practice-details"><p><strong>Trước khi bắt đầu:</strong> làm quen với JavaScript, component, props và state. Dùng một mảng trong state để quản lý ghi chú; mỗi ghi chú có ID riêng.</p><p><strong>Tự kiểm tra khi hoàn thành:</strong></p><ul><li>Không thêm được ghi chú trống hoặc chỉ có khoảng trắng.</li><li>Thêm nhiều ghi chú rồi xóa một ghi chú: các ghi chú khác giữ nguyên.</li><li>Từ khóa rỗng hiển thị toàn bộ ghi chú; không có kết quả thì hiện thông báo.</li><li>Chuyển giữa hai trang bằng liên kết và nút quay lại của trình duyệt.</li><li>Có thể nhập, thêm, tìm và xóa ghi chú bằng bàn phím.</li></ul><p><strong>Thử thêm:</strong> lưu ghi chú vào localStorage để giữ nội dung sau khi tải lại trang.</p></div></details></div>
        </div></section>
      </>}
      <Footer topId="library-top" />
    </div>
  );
}

function Bookmark({ filled = false }) {
  return <svg width="18" height="20" viewBox="0 0 18 20" fill={filled ? 'currentColor' : 'none'} aria-hidden="true"><path d="M4 2h10a1 1 0 0 1 1 1v14l-6-4-6 4V3a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>;
}

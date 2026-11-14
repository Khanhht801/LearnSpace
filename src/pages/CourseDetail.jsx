import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { supabase } from '../../utils/supabase.js';
import { useLibrary } from '../hooks/useLibrary.js';
import Footer from '../components/Footer.jsx';
import '../library.css';

export default function CourseDetail({ favoriteIds, onToggleFavorite }) {
  const { courses, topics } = useLibrary();
  const { courseId } = useParams();
  const course = courses.find((item) => item.id === Number(courseId));
  const [detail, setDetail] = useState({ courseId: null, loading: true, error: false, document: null, readUrl: '', downloadUrl: '' });
  const [attempt, setAttempt] = useState(0);
  const [shareStatus, setShareStatus] = useState({ courseId: null, result: '' });

  useEffect(() => {
    if (course) document.title = `${course.title} | LearnSpace`;
  }, [course]);

  async function shareDocument() {
    const url = new URL(`/courses/${course.id}`, window.location.origin).href;
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(url);
      setShareStatus({ courseId: course.id, result: 'success' });
    } catch { setShareStatus({ courseId: course.id, result: 'manual' }); }
  }

  useEffect(() => {
    if (!course) return;
    let active = true;
    let timer;
    async function load() {
      setDetail({ courseId: course.id, loading: true, error: false, document: null, readUrl: '', downloadUrl: '' });
      try {
        const { data, error } = await supabase.from('document').select('id,file_path,author,source,usage_note,updated_at').eq('id', course.id).maybeSingle();
        if (error) throw error;
        if (!data) { if (active) setDetail({ courseId: course.id, loading: false, error: false, document: null, readUrl: '', downloadUrl: '' }); return; }
        let readUrl = '';
        let downloadUrl = '';
        if (data.file_path) {
          const [read, download] = await Promise.all([
            supabase.storage.from('documents').createSignedUrl(data.file_path, 300),
            supabase.storage.from('documents').createSignedUrl(data.file_path, 300, { download: true }),
          ]);
          if (!read.error && !download.error) { readUrl = read.data.signedUrl; downloadUrl = download.data.signedUrl; }
        }
        if (active) {
          setDetail({ courseId: course.id, loading: false, error: false, document: data, readUrl, downloadUrl });
          if (readUrl) timer = setTimeout(() => setAttempt((value) => value + 1), 240000);
        }
      } catch {
        if (active) setDetail({ courseId: course.id, loading: false, error: true, document: null, readUrl: '', downloadUrl: '' });
      }
    }
    load();
    return () => { active = false; clearTimeout(timer); };
  }, [course, attempt]);

  if (!course || (detail.courseId === course.id && !detail.loading && !detail.error && !detail.document)) return <section className="library-inner"><h1>Không tìm thấy tài liệu</h1><p>Tài liệu không tồn tại hoặc không còn được xuất bản.</p><Link to="/courses">Quay lại thư viện</Link></section>;
  if (detail.courseId !== course.id) return <section className="library-inner" role="status">Đang tải thông tin tài liệu…</section>;

  const isFavorite = favoriteIds.includes(course.id);
  const topic = topics.find((item) => item.categoryId === course.category_id);
  const date = detail.document?.updated_at || course.created_at;
  const updated = date && !Number.isNaN(Date.parse(date)) ? new Intl.DateTimeFormat('vi-VN', { dateStyle: 'long' }).format(new Date(date)) : null;

  return <><article className="course-detail document-detail" id="document-top">
    <nav aria-label="Đường dẫn"><Link to="/courses">Thư viện</Link> / {topic && <><Link to={`/topics/${topic.id}`}>{topic.title}</Link> / </>}<span aria-current="page">{course.title}</span></nav>
    <h1>{course.title}</h1>
    <p>{course.description}</p>
    <dl className="document-meta">
      {course.file_type && <div><dt>Định dạng</dt><dd>{course.file_type.toUpperCase()}</dd></div>}
      {updated && <div><dt>Ngày cập nhật</dt><dd><time dateTime={date}>{updated}</time></dd></div>}
      {detail.document?.author && <div><dt>Tác giả</dt><dd>{detail.document.author}</dd></div>}
      {detail.document?.source && <div><dt>Nguồn</dt><dd>{detail.document.source}</dd></div>}
      {detail.document?.usage_note && <div><dt>Điều kiện sử dụng</dt><dd>{detail.document.usage_note}</dd></div>}
    </dl>
    <div className="document-actions"><button aria-pressed={isFavorite} type="button" onClick={() => onToggleFavorite(course.id)}>{isFavorite ? 'Bỏ lưu' : 'Lưu tài liệu'}</button>
      <button type="button" onClick={shareDocument}>Chia sẻ liên kết</button>
      {detail.readUrl && <><a className="button-link" href={detail.readUrl} target="_blank" rel="noopener noreferrer">Mở tài liệu</a><a className="button-link" href={detail.downloadUrl}>Tải tài liệu</a></>}
    </div>
    {shareStatus.courseId === course.id && shareStatus.result === 'success' && <p role="status">Đã sao chép liên kết tài liệu.</p>}
    {shareStatus.courseId === course.id && shareStatus.result === 'manual' && <div role="status"><label htmlFor="share-document-link">Sao chép liên kết tài liệu:</label><input id="share-document-link" className="document-share-url" readOnly value={new URL(`/courses/${course.id}`, window.location.origin).href} onFocus={(event) => event.target.select()} /></div>}
    {detail.loading && <p role="status">Đang tải thông tin tài liệu…</p>}
    {detail.error && <div role="alert"><p>Không thể tải thông tin tài liệu. Vui lòng thử lại.</p><button type="button" onClick={() => setAttempt((value) => value + 1)}>Thử lại</button></div>}
    {!detail.loading && !detail.error && detail.document && !detail.readUrl && <div role="status"><p>Không thể mở file. File có thể chưa sẵn sàng hoặc phiên đăng nhập đã hết hạn.</p><button type="button" onClick={() => setAttempt((value) => value + 1)}>Thử lại</button></div>}
    {detail.readUrl && course.file_type?.toLowerCase() === 'pdf' && <iframe className="document-preview" src={detail.readUrl} title={`Xem trước ${course.title}`} />}
    <p><Link to="/courses">Quay lại thư viện</Link></p>
  </article><Footer topId="document-top" /></>;
}

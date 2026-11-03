import { useEffect, useRef, useState } from 'react';

const MAX_SIZE = 10 * 1024 * 1024;
const accept = '.pdf,.txt,.md,.docx,.pptx,.xlsx';

export default function ContributionSection() {
  const dialogRef = useRef(null);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [listError, setListError] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [uploading, setUploading] = useState(false);
  const [fileName, setFileName] = useState('');
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setListError('');
    fetch('/api/documents', { signal: controller.signal })
      .then(async (response) => { if (!response.ok) throw new Error(); const items = await response.json(); if (!Array.isArray(items)) throw new Error(); setDocuments(items); })
      .catch((reason) => { if (reason.name !== 'AbortError') setListError('Chưa thể tải tài liệu cộng đồng. Vui lòng thử lại.'); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [refresh]);

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const file = data.get('file');
    setError(''); setSuccess('');
    if (!file?.size || file.size > MAX_SIZE) { setError('Chọn file có dung lượng không quá 10 MB.'); return; }
    if (!/\.(pdf|txt|md|docx|pptx|xlsx)$/i.test(file.name)) { setError('Định dạng file chưa được hỗ trợ.'); return; }
    setUploading(true);
    try {
      const response = await fetch('/api/documents', { method: 'POST', body: data });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Không thể đăng tài liệu.');
      setSuccess(`Đã đăng “${result.title}”. Mọi người có thể xem thông tin và tải file bên dưới.`);
      form.reset(); setFileName(''); setRefresh((value) => value + 1);
    } catch (reason) { setError(reason instanceof SyntaxError || reason instanceof TypeError ? 'Không thể kết nối để đăng tài liệu. Nội dung bạn nhập vẫn được giữ lại.' : reason.message); }
    finally { setUploading(false); }
  }

  return (
    <section className="contribution-section" id="dong-gop" aria-labelledby="contribution-title">
      <div className="landing-inner">
        <div className="contribution-layout">
          <div className="contribution-copy">
            <p className="eyebrow">KIẾN THỨC HAY, CÙNG NHAU CHIA SẺ</p>
            <h2 id="contribution-title">Chia sẻ điều bạn biết,<br /><span>giúp người khác tiến xa hơn.</span></h2>
            <p>Đăng tài liệu học tập của bạn ngay tại đây. Thêm tiêu đề, mô tả và nguồn để mọi người dễ tìm hiểu, lựa chọn và tải về.</p>
            <div className="contribution-actions"><button type="button" aria-haspopup="dialog" onClick={() => dialogRef.current.showModal()}>Chia sẻ tài liệu <span aria-hidden="true">↗</span></button></div>
            <p className="contribution-review">Chia sẻ tài liệu bạn có quyền sử dụng, cùng cộng đồng học hỏi mỗi ngày.</p>
          </div>
          <div className="contribution-options"><h3>Bạn có thể chia sẻ gì?</h3><ol><li><span aria-hidden="true">01</span><div><h4>Ghi chép học tập</h4><p>Những kiến thức, tóm tắt và kinh nghiệm bạn tích lũy.</p></div></li><li><span aria-hidden="true">02</span><div><h4>Tài liệu hữu ích</h4><p>Bài tập, tài liệu tham khảo và nội dung học tập có nguồn rõ ràng.</p></div></li><li><span aria-hidden="true">03</span><div><h4>Kiến thức của bạn</h4><p>Bài hướng dẫn tự biên soạn giúp người khác bắt đầu dễ dàng hơn.</p></div></li></ol></div>
        </div>
        <dialog className="contribution-dialog" ref={dialogRef} aria-labelledby="upload-dialog-title" onCancel={(event) => { if (uploading) event.preventDefault(); }}>
          <form className="upload-form" onSubmit={handleSubmit} aria-busy={uploading}>
            <div className="upload-dialog-heading"><h3 id="upload-dialog-title">Đăng tài liệu học tập</h3><button className="upload-dialog-close" type="button" disabled={uploading} aria-label="Đóng biểu mẫu" onClick={() => dialogRef.current.close()}>✕</button></div><p className="upload-form-intro">Các trường bên dưới đều bắt buộc. Tài liệu được đăng công khai.</p>
            <fieldset disabled={uploading}>
              <label htmlFor="upload-title">Tiêu đề tài liệu</label><input id="upload-title" name="title" required minLength={3} maxLength={120} placeholder="Ví dụ: Ghi chép React dành cho người mới" />
              <label htmlFor="upload-description">Mô tả nội dung</label><textarea id="upload-description" name="description" required minLength={20} maxLength={2000} rows={4} placeholder="Tài liệu nói về điều gì? Ai nên học và sẽ học được gì?" />
              <div className="upload-form-row"><div><label htmlFor="upload-author">Tên người chia sẻ</label><input id="upload-author" name="author" required minLength={2} maxLength={80} autoComplete="nickname" /></div><div><label htmlFor="upload-topic">Chủ đề</label><input id="upload-topic" name="topic" list="upload-topics" required minLength={2} maxLength={80} placeholder="Chọn hoặc nhập chủ đề" /><datalist id="upload-topics"><option value="React" /><option value="JavaScript" /><option value="Git" /><option value="Kỹ năng học tập" /></datalist></div></div>
              <label htmlFor="upload-level">Trình độ</label><select id="upload-level" name="level" defaultValue="" required><option value="" disabled>Chọn trình độ phù hợp</option>{['Cơ bản', 'Trung cấp', 'Nâng cao', 'Mọi trình độ'].map((level) => <option key={level}>{level}</option>)}</select>
              <label htmlFor="upload-source">Tác giả / nguồn tài liệu</label><input id="upload-source" name="source" required minLength={2} maxLength={300} placeholder="Tự biên soạn hoặc ghi tên tác giả và nguồn gốc" />
              <label htmlFor="upload-usage">Điều kiện sử dụng</label><input id="upload-usage" name="usageNote" required minLength={2} maxLength={300} placeholder="Ví dụ: Được chia sẻ lại khi ghi rõ nguồn" />
              <label htmlFor="upload-file">File tài liệu</label><div className="upload-file-area"><input id="upload-file" name="file" type="file" accept={accept} required aria-describedby="upload-file-help" onChange={(event) => setFileName(event.target.files[0]?.name || '')} /><p id="upload-file-help">PDF, TXT, MD, DOCX, PPTX, XLSX · Tối đa 10 MB</p>{fileName && <p className="upload-file-name">Đã chọn: {fileName}</p>}</div>
              <label className="upload-consent"><input type="checkbox" name="permission" required /><span>Tôi có quyền chia sẻ tài liệu này và đồng ý đăng công khai.</span></label>
              <button className="upload-submit" type="submit">{uploading ? 'Đang đăng tài liệu…' : 'Đăng tài liệu'} <span aria-hidden="true">↗</span></button>
            </fieldset>
            {error && <p className="upload-error" role="alert">{error}</p>}{success && <p className="upload-success" role="status">{success}</p>}
          </form>
        </dialog>
        <div className="community-documents" aria-labelledby="community-title">
          <div className="community-heading"><div><p className="eyebrow">TỪ CỘNG ĐỒNG LEARNSPACE</p><h3 id="community-title">Tài liệu vừa được chia sẻ</h3></div><button type="button" onClick={() => setRefresh((value) => value + 1)} disabled={loading}>Làm mới</button></div>
          {loading ? <p role="status">Đang tải tài liệu…</p> : listError ? <p role="alert">{listError}</p> : documents.length === 0 ? <p className="community-empty">Chưa có tài liệu cộng đồng. Hãy là người đầu tiên chia sẻ điều hữu ích!</p> : <div className="community-grid">{documents.map((item) => <article className="community-card" key={item.id}><div className="community-meta"><span>{item.topic}</span><span>{item.level}</span></div><h4>{item.title}</h4><p className="community-description">{item.description}</p><dl><div><dt>Người chia sẻ</dt><dd>{item.author}</dd></div><div><dt>Nguồn</dt><dd>{item.source}</dd></div><div><dt>Sử dụng</dt><dd>{item.usageNote}</dd></div></dl><p className="community-date">{new Intl.DateTimeFormat('vi-VN', {timeZone: 'Asia/Bangkok'}).format(new Date(item.createdAt))} · {(item.fileSize / 1024 / 1024).toFixed(2)} MB</p><a className="button-link" href={item.fileUrl} download>Tải tài liệu <span aria-hidden="true">↓</span></a></article>)}</div>}
        </div>
      </div>
    </section>
  );
}

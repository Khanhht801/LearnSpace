import { useRef, useState } from 'react';
import ContributionGuide from './ContributionGuide.jsx';

const MAX_SIZE = 10 * 1024 * 1024;
const accept = '.pdf,.txt,.md,.docx,.pptx,.xlsx';
const sharingOptions = [
  { title: 'Ghi chép học tập', description: 'Tóm tắt, hệ thống kiến thức và mẹo học hiệu quả.', icon: 'M7 3v4M17 3v4M5 5h14v17H5V5ZM8 11h8M8 15h8M8 18h5' },
  { title: 'Tài liệu hữu ích', description: 'Slide, bài giảng, đề cương hay tài liệu tham khảo chất lượng.', icon: 'M5 2h9l5 5v15H5V2ZM14 2v6h5M8 12h8M8 16h8' },
  { title: 'Kinh nghiệm ôn luyện', description: 'Cách học, lộ trình ôn tập hoặc trải nghiệm thi thực tế.', icon: 'M2 8l10-5 10 5-10 5L2 8ZM6 10v7c4 3 8 3 12 0v-7M22 8v9' },
  { title: 'Bộ sưu tập theo chủ đề', description: 'Tổng hợp tài liệu, ghi chú và nguồn học xoay quanh một chủ đề cụ thể.', icon: 'M2 7l10-5 10 5-10 5L2 7ZM5 11l-3 2 10 5 10-5-3-2M5 17l-3 2 10 5 10-5-3-2' },
];

export default function ContributionSection({ onDocumentShared, detailed = false }) {
  const Title = detailed ? 'h1' : 'h2';
  const dialogRef = useRef(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [uploading, setUploading] = useState(false);
  const [fileName, setFileName] = useState('');
  const [sharedFile, setSharedFile] = useState(null);
  function openForm() {
    setError(''); setSuccess(''); setSharedFile(null);
    dialogRef.current.showModal();
  }
  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const file = data.get('file');
    setError(''); setSuccess(''); setSharedFile(null);
    if (!file?.size || file.size > MAX_SIZE) { setError('Chọn file có dung lượng không quá 10 MB.'); return; }
    if (!/\.(pdf|txt|md|docx|pptx|xlsx)$/i.test(file.name)) { setError('Định dạng file chưa được hỗ trợ.'); return; }
    setUploading(true);
    try {
      const response = await fetch('/api/documents', { method: 'POST', body: data });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Không thể đăng tài liệu.');
      setSuccess(`Đã đăng “${result.title}”. Cảm ơn bạn đã chia sẻ nguồn học cùng cộng đồng LearnSpace!`);
      setSharedFile(result);
      form.reset(); setFileName(''); onDocumentShared?.();
    } catch (reason) { setError(reason instanceof SyntaxError || reason instanceof TypeError ? 'Không thể kết nối để đăng tài liệu. Nội dung bạn nhập vẫn được giữ lại.' : reason.message); }
    finally { setUploading(false); }
  }

  return (
    <>
    <section className={`contribution-section${detailed ? ' contribution-full' : ''}`} id="dong-gop" aria-labelledby="contribution-title">
      <div className="landing-inner">
        <div className="contribution-layout">
          <div className="contribution-copy">
            <p className="eyebrow"><span aria-hidden="true">✦</span> KIẾN THỨC MỞ, CỘNG ĐỒNG MẠNH</p>
            <Title id="contribution-title">Chia sẻ điều bạn biết,<br /><span>giúp người khác tiến xa hơn.</span></Title>
            <p>{detailed ? 'Một trang ghi chép rõ ràng, một tài liệu hữu ích hay một kinh nghiệm học tập của bạn có thể giúp người khác hiểu bài nhanh hơn. Hãy chia sẻ những nội dung bạn tự biên soạn hoặc được phép chia sẻ cùng cộng đồng LearnSpace.' : 'Một ghi chú bạn từng viết, một tài liệu bạn thấy hữu ích hay một kinh nghiệm nhỏ cũng có thể trở thành điểm khởi đầu cho ai đó.'}</p>
            <div className="contribution-actions"><button type="button" aria-haspopup="dialog" onClick={openForm}>Chia sẻ tài liệu của bạn <span aria-hidden="true">→</span></button></div>
            {detailed && <p className="contribution-file-hint">PDF, TXT, MD, DOCX, PPTX, XLSX · Tối đa 10 MB/file<br />Tài liệu được đăng công khai sau khi gửi thành công.</p>}
          </div>
          <div className="contribution-panel">
            <span className="contribution-spark contribution-spark-one" aria-hidden="true">✦</span>
            <span className="contribution-spark contribution-spark-two" aria-hidden="true">✧</span>
            <div className="contribution-options">
              <h3>Bạn có thể chia sẻ gì?</h3>
              <ul>{sharingOptions.map((option, index) => <li key={option.title}><span className="contribution-icon" aria-hidden="true"><svg width="36" height="36" viewBox="0 0 24 26" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d={option.icon} /></svg></span><div><h4>{option.title}</h4><p>{option.description}</p>{detailed && <p className="contribution-example">Ví dụ: {['Ghi chép React cơ bản, bảng tổng hợp công thức.', 'Slide JavaScript, bài tập Git có lời giải.', 'Lộ trình tự học lập trình web, cách ghi chú hiệu quả.', 'Tổng hợp nguồn học React dành cho người mới.'][index]}</p>}</div></li>)}</ul>
              {detailed && <p className="contribution-format-note">Với kinh nghiệm học tập hoặc bộ sưu tập nguồn học, hãy tổng hợp thành file trước khi đăng.</p>}
            </div>
            <div className="contribution-mascot" aria-hidden="true"><div className="contribution-books"><span /><span /></div><img src="/mascot.png" alt="" width="1254" height="1254" loading="lazy" /></div>
          </div>
        </div>
        <dialog className="contribution-dialog" ref={dialogRef} aria-labelledby="upload-dialog-title" onCancel={(event) => { if (uploading) event.preventDefault(); }}>
          <form className="upload-form" onSubmit={handleSubmit} aria-busy={uploading}>
            <div className="upload-dialog-heading"><h3 id="upload-dialog-title">Đăng tài liệu học tập</h3><button className="upload-dialog-close" type="button" disabled={uploading} aria-label="Đóng biểu mẫu" onClick={() => dialogRef.current.close()}>✕</button></div><p className="upload-form-intro">Các trường bên dưới đều bắt buộc. File và thông tin bạn cung cấp sẽ được đăng công khai.</p>
            <fieldset disabled={uploading}>
              <label htmlFor="upload-title">Tiêu đề tài liệu</label><input id="upload-title" name="title" required minLength={3} maxLength={120} placeholder="Ví dụ: Ghi chép React dành cho người mới" />
              <label htmlFor="upload-description">Mô tả nội dung</label><textarea id="upload-description" name="description" required minLength={20} maxLength={2000} rows={4} placeholder="Tài liệu nói về điều gì? Ai nên học và sẽ học được gì?" />
              <div className="upload-form-row"><div><label htmlFor="upload-author">Tên hiển thị</label><input id="upload-author" name="author" required minLength={2} maxLength={80} autoComplete="nickname" placeholder="Tên hoặc bút danh của bạn" /></div><div><label htmlFor="upload-topic">Chủ đề</label><input id="upload-topic" name="topic" list="upload-topics" required minLength={2} maxLength={80} placeholder="Chọn hoặc nhập chủ đề" /><datalist id="upload-topics"><option value="React" /><option value="JavaScript" /><option value="Git" /><option value="Kỹ năng học tập" /></datalist></div></div>
              <label htmlFor="upload-level">Trình độ</label><select id="upload-level" name="level" defaultValue="" required><option value="" disabled>Chọn trình độ phù hợp</option>{['Cơ bản', 'Trung cấp', 'Nâng cao', 'Mọi trình độ'].map((level) => <option key={level}>{level}</option>)}</select>
              <label htmlFor="upload-source">Tác giả / nguồn tài liệu</label><input id="upload-source" name="source" required minLength={2} maxLength={300} placeholder="Tự biên soạn hoặc ghi tên tác giả và nguồn gốc" />
              <label htmlFor="upload-usage">Người khác được sử dụng tài liệu như thế nào?</label><input id="upload-usage" name="usageNote" required minLength={2} maxLength={300} placeholder="Ví dụ: Được chia sẻ lại khi ghi rõ tác giả và nguồn" />
              <label htmlFor="upload-file">File tài liệu</label><div className="upload-file-area"><input id="upload-file" name="file" type="file" accept={accept} required aria-describedby="upload-file-help" onChange={(event) => setFileName(event.target.files[0]?.name || '')} /><p id="upload-file-help">PDF, TXT, MD, DOCX, PPTX, XLSX · Tối đa 10 MB</p>{fileName && <p className="upload-file-name">Đã chọn: {fileName}</p>}</div>
              <label className="upload-consent"><input type="checkbox" name="permission" required /><span>Tôi có quyền chia sẻ tài liệu này và hiểu rằng file cùng các thông tin tôi cung cấp sẽ được hiển thị công khai.</span></label>
              <button className="upload-submit" type="submit">{uploading ? 'Đang đăng tài liệu…' : 'Đăng tài liệu'} <span aria-hidden="true">↗</span></button>
            </fieldset>
            {error && <p className="upload-error" role="alert">{error}</p>}{success && <div className="upload-success" role="status"><p>{success}</p>{sharedFile && <a href={sharedFile.fileUrl} target="_blank" rel="noopener noreferrer">Xem tài liệu vừa đăng <span aria-hidden="true">↗</span></a>}</div>}
          </form>
        </dialog>

      </div>
    </section>
    {detailed && <ContributionGuide onShare={openForm} />}
    </>
  );
}

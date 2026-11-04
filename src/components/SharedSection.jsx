import { useEffect, useState } from 'react';

function topicStyle(topic) {
  if (/toán/i.test(topic)) return { symbol: '∑', kind: 'math', label: 'sin²x + cos²x = 1' };
  if (/ngoại ngữ|tiếng|ielts|english/i.test(topic)) return { symbol: 'Aa', kind: 'language', label: 'LEARN' };
  if (/react|javascript|api|tin học|lập trình|git/i.test(topic)) return { symbol: '</>', kind: 'code', label: '{ CODE }' };
  return { symbol: '▤', kind: 'notes', label: 'GHI CHÉP' };
}

export default function SharedSection({ revision }) {
  const [result, setResult] = useState({ items: [], loading: true, error: '' });
  const [retry, setRetry] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [currentTime] = useState(Date.now);

  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/documents', { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error();
        const items = await response.json();
        if (!Array.isArray(items)) throw new Error();
        items.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
        setResult({ items, loading: false, error: '' });
      })
      .catch((error) => {
        if (error.name !== 'AbortError') setResult({ items: [], loading: false, error: 'Chưa thể tải tài liệu cộng đồng. Vui lòng thử lại.' });
      });
    return () => controller.abort();
  }, [revision, retry]);

  return (
    <section className="shared-section" id="chia-se" aria-labelledby="shared-title">
      <div className="shared-inner">
        <div className="shared-heading">
          <div><p className="eyebrow">TỪ CỘNG ĐỒNG LEARNSPACE</p><h2 id="shared-title">Tài liệu <span>được chia sẻ</span></h2><p>Khám phá những nội dung mới nhất được cộng đồng LearnSpace bổ sung.</p></div>
          <button className="shared-view-all" type="button" aria-expanded={showAll} aria-controls="shared-documents" onClick={() => setShowAll((value) => !value)}>{showAll ? 'Thu gọn tài liệu' : 'Xem tất cả tài liệu mới'} <span aria-hidden="true">→</span></button>
        </div>
        <div id="shared-documents" aria-live="polite">
          {result.loading ? <p className="shared-state" role="status">Đang tải tài liệu…</p> : result.error ? <div className="shared-state"><p role="alert">{result.error}</p><button type="button" onClick={() => { setResult({ items: [], loading: true, error: '' }); setRetry((value) => value + 1); }}>Thử lại</button></div> : result.items.length === 0 ? <div className="shared-state"><p>Chưa có tài liệu cộng đồng. Hãy là người đầu tiên chia sẻ điều hữu ích!</p><a href="#dong-gop">Chia sẻ tài liệu của bạn <span aria-hidden="true">→</span></a></div> : <div className="shared-grid">{(showAll ? result.items : result.items.slice(0, 3)).map((item) => {
            const style = topicStyle(item.topic);
            const age = currentTime - new Date(item.createdAt).getTime();
            const isNew = age >= -60000 && age < 7 * 86400000;
            return <article className="shared-card" key={item.id}>
              <div className={`shared-cover shared-cover-${style.kind}`}>
                <span className="shared-topic"><span aria-hidden="true">{style.symbol}</span>{item.topic}</span>
                {isNew && <span className="shared-new">Mới</span>}
                <div className="shared-illustration" aria-hidden="true"><div className="shared-illustration-page"><span>{style.label}</span><i /><i /><i /></div><div className="shared-illustration-accent" /></div>
              </div>
              <div className="shared-card-body">
                <h3><a href={item.fileUrl} download>{item.title}</a></h3>
                <p className="shared-file-meta"><svg width="20" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M5 2h9l5 5v15H5V2ZM14 2v6h5M8 12h8M8 16h8" /></svg><span>{item.extension.slice(1).toUpperCase()} · {(item.fileSize / 1024 / 1024).toFixed(2)} MB · <time dateTime={item.createdAt}>{new Intl.DateTimeFormat('vi-VN', { timeZone: 'Asia/Bangkok' }).format(new Date(item.createdAt))}</time></span></p>
                <p className="shared-description">{item.description}</p>
                <details className="shared-details"><summary>Nguồn và thông tin tài liệu</summary><dl><div><dt>Người chia sẻ</dt><dd>{item.author}</dd></div><div><dt>Trình độ</dt><dd>{item.level}</dd></div><div><dt>Nguồn</dt><dd>{item.source}</dd></div><div><dt>Sử dụng</dt><dd>{item.usageNote}</dd></div></dl></details>
                <a className="shared-download" href={item.fileUrl} download>Tải tài liệu <span aria-hidden="true">↓</span></a>
              </div>
            </article>;
          })}</div>}
        </div>
      </div>
    </section>
  );
}

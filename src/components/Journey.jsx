const steps = [
  { title: 'Tìm điều bạn tò mò', description: 'Bắt đầu từ chủ đề khiến bạn muốn khám phá ngay hôm nay.', icon: 'M21 21l-5-5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z' },
  { title: 'Đọc và khám phá', description: 'Mở tài liệu, ghi nhớ điều cần thiết và hiểu sâu hơn từng ý tưởng.', icon: 'M12 5C9 3 5 3 2 4v15c3-1 7-1 10 1 3-2 7-2 10-1V4c-3-1-7-1-10 1ZM12 5v15' },
  { title: 'Lưu để học tiếp', description: 'Đánh dấu nội dung hữu ích để quay lại bất cứ khi nào bạn sẵn sàng.', icon: 'M6 3h12v18l-6-4-6 4V3Z' },
];

export default function Journey() {
  return (
    <section className="journey-section" id="hanh-trinh" aria-labelledby="journey-title">
      <div className="journey-inner">
        <div className="journey-heading">
          <p className="journey-eyebrow">BẮT ĐẦU TỪ ĐIỀU NHỎ</p>
          <h2 id="journey-title">Ba bước nhỏ,<br /><span>thêm một <span className="journey-highlight">điều mới</span>.<i className="journey-rays" aria-hidden="true"><b /><b /><b /></i></span></h2>
          <p className="journey-description">Chỉ cần một chủ đề bạn quan tâm, LearnSpace sẽ giúp bạn bắt đầu hành trình học hỏi.</p>
        </div>
        <ol className="journey-steps">
          {steps.map((step, index) => (
            <li className="journey-card" key={step.title}>
              {index === 0 && <div className="journey-mascot" aria-hidden="true"><img src="/mascot.png" alt="" width="1254" height="1254" loading="lazy" /></div>}
              <span className="journey-number" aria-hidden="true">0{index + 1}</span>
              <span className="sr-only">Bước {index + 1}: </span>
              <span className="journey-icon" aria-hidden="true"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={step.icon} /></svg></span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
              {index < steps.length - 1 && <span className="journey-arrow" aria-hidden="true">→</span>}
            </li>
          ))}
        </ol>
        <span className="journey-spark journey-spark-left" aria-hidden="true">✧</span>
        <span className="journey-spark journey-spark-right" aria-hidden="true">✧<small>✦</small></span>
      </div>
    </section>
  );
}

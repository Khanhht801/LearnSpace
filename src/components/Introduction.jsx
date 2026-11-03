const benefits = [
  { title: 'Học không rào cản', description: 'Truy cập miễn phí, bắt đầu khám phá mà không cần tạo tài khoản.', icon: 'M12 3 3 7.5l9 4.5 9-4.5L12 3ZM6 10v6c3 3 9 3 12 0v-6M21 8v7' },
  { title: 'Tìm đúng điều cần học', description: 'Tìm theo từ khóa và khám phá nội dung phù hợp với điều bạn quan tâm.', icon: 'M21 21l-5-5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z' },
  { title: 'Tôn trọng nguồn kiến thức', description: 'Kiểm tra tác giả, nguồn và điều kiện sử dụng trước khi chia sẻ hoặc sử dụng lại tài liệu.', icon: 'M5 3h10l4 4v14H5V3ZM14 3v5h5M8 12h8M8 16h6' },
  { title: 'Điều hay, luôn ở lại', description: 'Lưu tài liệu yêu thích để quay lại học tiếp trên cùng trình duyệt.', icon: 'M6 3h12v18l-6-4-6 4V3Z' },
];

const steps = [
  { title: 'Tìm điều bạn tò mò', description: 'Chọn nội dung hoặc nhập từ khóa vào thư viện.' },
  { title: 'Đọc và khám phá', description: 'Mở nội dung, đọc hoặc tải khi có file đính kèm.' },
  { title: 'Lưu để học tiếp', description: 'Đánh dấu tài liệu và quay lại khi bạn sẵn sàng.' },
];

export default function Introduction() {
  return (
    <section className="introduction" id="gioi-thieu" aria-labelledby="introduction-title">
      <div className="introduction-inner">
        <div className="introduction-heading">
          <div>
            <p className="eyebrow">VỀ LEARNSPACE</p>
            <h2 id="introduction-title">Một không gian chung.<br /><span>Nhiều cơ hội học hỏi.</span></h2>
          </div>
          <div className="introduction-summary">
            <p>LearnSpace là nơi chia sẻ kiến thức và tài liệu học tập, dành cho những ai muốn tự học và mở rộng hiểu biết mỗi ngày.</p>
            <p>Từ một câu hỏi nhỏ đến một kỹ năng mới, bạn có thể bắt đầu theo cách của mình, theo nhịp của mình.</p>
            <a className="introduction-link" href="#chu-de">Khám phá chủ đề <span aria-hidden="true">↗</span></a>
          </div>
        </div>

        <div className="introduction-benefits">
          {benefits.map((benefit) => (
            <article className="introduction-benefit" key={benefit.title}>
              <span className="introduction-icon" aria-hidden="true"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d={benefit.icon} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </article>
          ))}
        </div>

        <div className="introduction-guide">
          <div className="introduction-guide-heading"><p className="eyebrow">BẮT ĐẦU THẬT ĐƠN GIẢN</p><h3>Ba bước nhỏ,<br />thêm một điều mới.</h3></div>
          <ol className="introduction-steps">
            {steps.map((step, index) => (
              <li key={step.title}><span className="introduction-step-number" aria-hidden="true">0{index + 1}</span><h4>{step.title}</h4><p>{step.description}</p></li>
            ))}
          </ol>
        </div>
        <p className="introduction-storage-note">Danh sách đã lưu chỉ có trên trình duyệt hiện tại và chưa đồng bộ giữa các thiết bị.</p>
      </div>
    </section>
  );
}

const benefits = [
  { title: 'Học không rào cản', description: 'Tiếp cận tài liệu, bài đọc và ý tưởng học tập trong một không gian mở.', icon: 'M12 3 3 7.5l9 4.5 9-4.5L12 3ZM6 10v6c3 3 9 3 12 0v-6M21 8v7' },
  { title: 'Tìm đúng điều cần học', description: 'Khám phá nội dung theo chủ đề và bắt đầu từ điều bạn quan tâm.', icon: 'M21 21l-5-5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z' },
  { title: 'Tôn trọng nguồn kiến thức', description: 'Giữ rõ nguồn, ngữ cảnh và giá trị của mỗi tài liệu được chia sẻ.', icon: 'M5 3h10l4 4v14H5V3ZM14 3v5h5M8 12h8M8 16h6' },
  { title: 'Điều hay, luôn ở lại', description: 'Lưu lại tài liệu hữu ích để quay lại học tiếp khi bạn muốn.', icon: 'M6 3h12v18l-6-4-6 4V3Z' },
];

export default function Introduction() {
  return (
    <section className="introduction" id="gioi-thieu" aria-labelledby="introduction-title">
      <div className="introduction-inner">
        <p className="eyebrow">VỀ LEARNSPACE</p>
        <div className="introduction-heading">
          <div>
            <h2 id="introduction-title">Một không gian chung.<br /><span>Nhiều cơ hội học hỏi.</span></h2>
          </div>
          <div className="introduction-summary">
            <p>LearnSpace là nơi chia sẻ kiến thức theo cách gần gũi hơn. Tại đây, bạn có thể tìm tài liệu hữu ích, lưu lại điều quan trọng và tiếp tục học theo nhịp của riêng mình.</p>
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

      </div>
    </section>
  );
}

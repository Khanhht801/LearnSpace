const steps = [
  { title: 'Chuẩn bị tài liệu', text: 'Chọn file dễ đọc, kiểm tra nội dung và nguồn tài liệu. Mỗi file có dung lượng tối đa 10 MB.' },
  { title: 'Giới thiệu nội dung', text: 'Điền tiêu đề, mô tả, chủ đề, trình độ và tên hoặc bút danh để người học biết tài liệu có phù hợp với mình.' },
  { title: 'Chia sẻ với cộng đồng', text: 'Xác nhận quyền chia sẻ và đăng công khai. Mọi người có thể xem thông tin và tải file ngay sau khi đăng thành công.' },
];

const checklist = [
  { title: 'Đặt tên cụ thể', text: 'Dùng “React cơ bản — Component, Props và State” thay cho “Tài liệu hay” để người đọc dễ tìm đúng nội dung.' },
  { title: 'Mô tả đúng nội dung', text: 'Cho biết tài liệu dành cho ai, gồm những phần nào và người học cần có kiến thức nền gì.' },
  { title: 'Kiểm tra file trước khi gửi', text: 'Bảo đảm tài liệu đầy đủ, chữ rõ ràng, không bị lỗi và có thể mở được.' },
  { title: 'Ghi rõ tác giả và nguồn', text: 'Chỉ đăng nội dung bạn tự biên soạn hoặc được phép chia sẻ. Ghi rõ nguồn và cách người khác được sử dụng lại.' },
  { title: 'Bảo vệ thông tin cá nhân', text: 'Xóa số điện thoại, địa chỉ và những thông tin riêng tư bạn không muốn hiển thị công khai.' },
];

export default function ContributionGuide({ onShare }) {
  return (
    <>
      <section className="contribution-steps" aria-labelledby="contribution-steps-title">
        <div className="landing-inner">
          <div className="contribution-guide-heading"><p className="eyebrow">BẮT ĐẦU TỪ ĐIỀU BẠN CÓ</p><h2 id="contribution-steps-title">Một đóng góp nhỏ.<br /><span>Ba bước để sẻ chia.</span></h2><p>Không cần một tài liệu thật đồ sộ. Hãy bắt đầu với điều hữu ích bạn đã học được.</p></div>
          <ol className="contribution-step-list">{steps.map((step, index) => <li key={step.title}><span className="contribution-step-number" aria-hidden="true">0{index + 1}</span><h3>{step.title}</h3><p>{step.text}</p></li>)}</ol>
        </div>
      </section>
      <section className="contribution-checklist" aria-labelledby="contribution-checklist-title">
        <div className="landing-inner contribution-checklist-layout">
          <div className="contribution-checklist-copy"><p className="eyebrow">CÙNG GIỮ CHẤT LƯỢNG NGUỒN HỌC</p><h2 id="contribution-checklist-title">Trước khi bạn đăng,<br /><span>kiểm tra một chút nhé.</span></h2><p>Một vài lưu ý nhỏ để tài liệu của bạn dễ tìm, dễ học và hữu ích hơn với mọi người.</p><img src="/mascot.png" alt="Linh vật LearnSpace: chú gà vàng đeo khăn đỏ và ba lô, đồng hành cùng người chia sẻ" width="1254" height="1254" loading="lazy" /></div>
          <div className="contribution-checklist-panel">
            <ul>{checklist.map((item) => (
              <li key={item.title}>
                <details className="contribution-checklist-item">
                  <summary><span className="contribution-check" aria-hidden="true">✓</span><h3>{item.title}</h3><span className="contribution-checklist-toggle" aria-hidden="true" /></summary>
                  <p>{item.text}</p>
                </details>
              </li>
            ))}</ul>
            <div className="contribution-ready"><p><strong>Sẵn sàng chia sẻ điều hữu ích?</strong><br />File và tên hiển thị của bạn sẽ được đăng công khai.</p><button type="button" aria-haspopup="dialog" onClick={onShare}>Chia sẻ tài liệu <span aria-hidden="true">↗</span></button></div>
          </div>
        </div>
      </section>
    </>
  );
}

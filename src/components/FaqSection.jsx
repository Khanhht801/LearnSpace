const questions = [
  ['Có cần tạo tài khoản không?', 'Không. Bạn có thể tìm và đọc nội dung công khai trực tiếp, tải xuống khi tài liệu có file đính kèm.'],
  ['Tài liệu có miễn phí không?', 'Nội dung công khai được truy cập miễn phí. Xem nguồn và điều kiện sử dụng trên từng tài liệu trước khi chia sẻ hoặc sử dụng lại.'],
  ['Tài liệu đã lưu nằm ở đâu?', 'Mở mục Đã lưu trên navbar. Danh sách chỉ lưu trên trình duyệt hiện tại, chưa đồng bộ giữa thiết bị; xóa dữ liệu trình duyệt có thể làm mất danh sách.'],
  ['Làm sao để đóng góp tài liệu?', 'Điền thông tin trong mục Đóng góp, chọn file tối đa 10 MB và xác nhận quyền chia sẻ. Nhấn Đăng tài liệu; sau khi lưu thành công, tài liệu sẽ xuất hiện công khai trong danh sách cộng đồng.'],
  ['Làm sao để báo liên kết lỗi?', 'Chuẩn bị đường dẫn tài liệu và mô tả lỗi, sau đó gửi qua kênh liên hệ trong mục Đóng góp khi kênh này được thiết lập.'],
];

export default function FaqSection() {
  return <section className="faq-section" id="faq" aria-labelledby="faq-title"><div className="landing-inner faq-layout"><div><p className="eyebrow">GIẢI ĐÁP NHANH</p><h2 id="faq-title">Bạn hỏi,<br /><span>LearnSpace giải đáp.</span></h2><p>Một vài điều cần biết để bắt đầu học dễ dàng hơn.</p><a className="introduction-link" href="#dong-gop">Xem hướng dẫn đóng góp <span aria-hidden="true">↗</span></a></div><div className="faq-list">{questions.map(([question, answer]) => <details key={question}><summary>{question}<span className="faq-indicator" aria-hidden="true" /></summary><p>{answer}</p></details>)}</div></div></section>;
}

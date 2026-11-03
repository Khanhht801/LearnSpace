# Cấu trúc landing page LearnSpace

Tham chiếu: [Phân tích nghiệp vụ](./PhanTichNghiepVu.md) và [Định hướng giao diện](./LangmasterStyle.md).

Mục tiêu: giúp người dùng tìm, đọc hoặc tải tài liệu và lưu để học lại. Nội dung công khai, miễn phí, không yêu cầu tài khoản trong bản đầu.

## 1. Navbar — thứ tự từ trái sang phải

**Logo → Giới thiệu → Chủ đề → Thư viện → Đóng góp → Đã lưu**

| Thứ tự | Thành phần | Nội dung và hành vi |
| --- | --- | --- |
| 1 | Logo LearnSpace | Về đầu trang chủ |
| 2 | Giới thiệu | Cuộn đến section Giới thiệu (`#gioi-thieu`) |
| 3 | Chủ đề ▾ | Cuộn đến section Chủ đề (`#chu-de`); dropdown cho phép mở thư viện đã lọc theo chủ đề |
| 4 | Thư viện | Cuộn đến section Thư viện (`#thu-vien`); từ đây có thể mở trang toàn bộ tài liệu |
| 5 | Đóng góp | Cuộn đến section Đóng góp (`#dong-gop`) |
| 6 | Đã lưu | Cuộn đến section Đã lưu (`#da-luu`); có biểu tượng bookmark và số tài liệu đã lưu trên trình duyệt |

## 2. Các section — thứ tự từ trên xuống

Hero đặt đầu trang. Các section chính tiếp theo đi đúng thứ tự navbar: **Giới thiệu → Chủ đề → Thư viện → Đóng góp → Đã lưu**. FAQ và footer đặt cuối trang.

| Thứ tự | Section | ID | Nội dung đề xuất | Hành động chính |
| --- | --- | --- | --- | --- |
| 1 | Hero | `hero` | Tiêu đề “Kiến thức dễ tìm. Học tập dễ hơn.”; mô tả thư viện học tập miễn phí, không cần tài khoản; ô tìm kiếm “Bạn muốn học gì hôm nay?”; minh họa học tập hoặc giao diện thư viện thực tế | “Khám phá tài liệu” cuộn đến Thư viện; tìm kiếm mở kết quả trong trang thư viện |
| 2 | Giới thiệu | `gioi-thieu` | Giới thiệu LearnSpace và mục tiêu chia sẻ kiến thức; bốn lợi ích: miễn phí, dễ tìm, nguồn rõ ràng, thuận tiện học lại; hướng dẫn Tìm → Đọc/tải → Lưu | “Khám phá chủ đề” |
| 3 | Chủ đề | `chu-de` | Các thẻ React, JavaScript, Git, Kỹ năng học tập…; mỗi thẻ có biểu tượng, tên và mô tả ngắn; chỉ hiện chủ đề đã có nội dung | Chọn chủ đề để mở thư viện đã lọc |
| 4 | Thư viện | `thu-vien` | Hiển thị 3–6 tài liệu nổi bật; có thể thêm nhóm mới cập nhật khi đủ nội dung. Card có tên, mô tả, chủ đề, trình độ, loại và ngày cập nhật | “Đọc tài liệu”, “Lưu tài liệu”, “Xem tất cả tài liệu”; chỉ hiện tải khi có file thật |
| 5 | Đóng góp | `dong-gop` | Form đăng trực tiếp: tiêu đề, mô tả, người chia sẻ, chủ đề, trình độ, nguồn, điều kiện sử dụng, file và xác nhận quyền chia sẻ. Bên dưới là danh sách tài liệu cộng đồng | “Đăng tài liệu” lưu lên server và công khai; “Tải tài liệu” tải file; “Làm mới” cập nhật danh sách |
| 6 | Đã lưu | `da-luu` | Xem trước danh sách tài liệu đã lưu trên trình duyệt; khi rỗng, hiện lời nhắc khám phá và lưu tài liệu; giải thích chưa đồng bộ giữa thiết bị | “Tiếp tục đọc”, “Bỏ lưu”, “Xem tất cả đã lưu”; khi rỗng có “Khám phá tài liệu” |
| 7 | Câu hỏi thường gặp | `faq` | Giải đáp về tài khoản, miễn phí, lưu tài liệu, đóng góp và báo lỗi | Mở/đóng từng câu trả lời |
| 8 | Footer | — | Logo, giới thiệu ngắn, liên kết điều hướng, kênh liên hệ thật, thông tin nguồn, điều kiện sử dụng và bản quyền phù hợp | Mở liên kết hoặc kênh liên hệ |

## 3. Nội dung câu hỏi thường gặp

| Thứ tự | Câu hỏi | Trả lời đề xuất |
| --- | --- | --- |
| 1 | Có cần tạo tài khoản không? | Không. Bạn có thể tìm, đọc và tải tài liệu công khai trực tiếp. |
| 2 | Tài liệu có miễn phí không? | Tài liệu công khai được truy cập miễn phí; xem nguồn và điều kiện sử dụng trên từng tài liệu. |
| 3 | Tài liệu đã lưu nằm ở đâu? | Mở mục Đã lưu. Danh sách chỉ lưu trên trình duyệt hiện tại, chưa đồng bộ giữa thiết bị; xóa dữ liệu trình duyệt có thể làm mất danh sách. |
| 4 | Làm sao để đóng góp tài liệu? | Điền thông tin và chọn file trong mục Đóng góp, xác nhận quyền chia sẻ rồi nhấn Đăng tài liệu. Sau khi server lưu thành công, tài liệu xuất hiện công khai trong danh sách cộng đồng. |
| 5 | Làm sao để báo liên kết lỗi? | Gửi đường dẫn tài liệu và mô tả lỗi qua kênh liên hệ trong mục Đóng góp. |

## 4. Quy định giao diện và nội dung

| Thành phần | Quy định |
| --- | --- |
| Navbar | Nền trắng, chữ `#252525`; hover và mục đang chọn màu đỏ `#DB1F1F`; focus bàn phím rõ ràng |
| Navbar mobile | Giữ logo và biểu tượng Đã lưu bên ngoài; các mục còn lại trong menu ☰, giữ thứ tự Giới thiệu → Chủ đề → Thư viện → Đóng góp |
| Hero | Gradient `#DB1F1F → #9D0B0F`, chữ trắng |
| Nền section | Xen kẽ trắng và hồng nhạt `#FFF2F2` |
| Footer | Nền `#231F20`, chữ trắng |
| Font | SVN-Gilroy khi có asset được phép sử dụng; fallback `sans-serif` |
| Card | Bo góc 12–20px, bóng nhẹ, khoảng trắng thoáng |
| Responsive | Mobile xếp một cột; tìm kiếm và CTA dễ thao tác |
| Tài khoản | Không hiển thị đăng nhập/đăng ký trong bản đầu |
| Nội dung thực tế | Không dùng số liệu cộng đồng hoặc đánh giá giả; liên kết đọc/tải phải hoạt động |
| Đóng góp | Đăng trực tiếp qua API; chỉ báo thành công khi server đã lưu file và metadata; không xóa dữ liệu form khi đăng thất bại |
| Đã lưu | Trạng thái thống nhất giữa navbar, card và danh sách; dùng dữ liệu trên trình duyệt hiện tại |

## 5. Thứ tự triển khai thống nhất

**Navbar → Hero → Giới thiệu → Chủ đề → Thư viện → Đóng góp → Đã lưu → FAQ → Footer**

Lợi ích và hướng dẫn học nằm trong Giới thiệu; tài liệu nổi bật và mới cập nhật nằm trong Thư viện để trang gọn và giữ đúng thứ tự đã chọn.

## 6. Chi tiết section Đóng góp — đăng tài liệu trực tiếp

Yêu cầu này thay thế phương án gửi email/chủ website đăng thủ công trong bản phân tích nghiệp vụ cũ. Người dùng đăng trực tiếp và nội dung xuất hiện công khai sau khi lưu thành công, chưa có tài khoản hoặc bước duyệt.

| Trường | Quy tắc |
| --- | --- |
| Tiêu đề | Bắt buộc, 3–120 ký tự |
| Mô tả | Bắt buộc, 20–2.000 ký tự, giới thiệu nội dung và đối tượng học |
| Người chia sẻ | Tên hiển thị công khai, 2–80 ký tự; chưa xác minh danh tính |
| Chủ đề | Chọn gợi ý hoặc nhập chủ đề, 2–80 ký tự |
| Trình độ | Cơ bản, Trung cấp, Nâng cao hoặc Mọi trình độ |
| Tác giả / nguồn | Bắt buộc, 2–300 ký tự |
| Điều kiện sử dụng | Bắt buộc, 2–300 ký tự |
| File | Một file PDF, TXT, MD, DOCX, PPTX hoặc XLSX; tối đa 10 MB |
| Xác nhận | Có quyền chia sẻ và đồng ý đăng công khai |

Luồng: bấm “Chia sẻ tài liệu” → mở hộp thoại → nhập thông tin → chọn file → kiểm tra → đang đăng → server lưu → báo thành công và làm mới danh sách. Form mặc định ẩn để section gọn; đóng bằng nút Đóng hoặc Escape, giữ bản nhập khi mở lại. Trong khi đăng, chặn đóng để tránh mất trạng thái. Lỗi giữ nguyên nội dung để sửa hoặc thử lại. Danh sách có trạng thái đang tải, trống, lỗi và nút làm mới.

Tài liệu cộng đồng hiển thị tiêu đề, mô tả, chủ đề, trình độ, tên người chia sẻ, nguồn, điều kiện sử dụng, ngày đăng, dung lượng và nút tải file. Ngày đăng lấy từ server. File được tải dưới dạng đính kèm.

### Vận hành

- API `GET /api/documents`, `POST /api/documents`, `GET /api/documents/:id/file`.
- File và metadata lưu trong `data/documents/` ở server, không đưa vào Git; không dùng localStorage để chia sẻ file.
- `npm run dev` hoặc `npm run preview` cung cấp cả giao diện và API; `npm run build` rồi `npm start` để chạy bản build bằng Node.js.
- Hosting chỉ phục vụ file tĩnh sẽ không xử lý upload. Khi đưa lên mạng cần server Node.js và ổ đĩa lưu trữ bền vững; sao lưu thư mục dữ liệu.
- Bản này chưa có quản trị, kiểm duyệt, xác minh tài khoản, chống spam hoặc quét mã độc. Dữ liệu người dùng nhập được hiển thị dạng văn bản; có kiểm tra định dạng và dung lượng file phía server.
- Tài liệu cộng đồng nằm trong section Đóng góp; danh mục biên tập trong Thư viện và tính năng Đã lưu hiện vẫn dùng dữ liệu cũ.

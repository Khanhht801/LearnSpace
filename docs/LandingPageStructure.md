# Cấu trúc landing page LearnSpace

Tham chiếu: [Phân tích nghiệp vụ](./PhanTichNghiepVu.md) và [Định hướng giao diện](./LangmasterStyle.md).

Mục tiêu: giúp người dùng tìm, đọc hoặc tải tài liệu và lưu để học lại. Nội dung công khai, miễn phí, không yêu cầu tài khoản trong bản đầu.

## 1. Navbar — thứ tự từ trái sang phải

**Logo → Giới thiệu → Chủ đề → Thư viện → Đóng góp → Đã lưu**

| Thứ tự | Thành phần | Nội dung và hành vi |
| --- | --- | --- |
| 1 | Logo LearnSpace | Về đầu trang chủ |
| 2 | Giới thiệu | Cuộn đến section Giới thiệu (`#gioi-thieu`) |
| 3 | Chủ đề | Không có tam giác; hover mở danh sách chủ đề để chọn; trên mobile chạm để mở. “Tất cả chủ đề” cuộn đến `#chu-de`, chọn chủ đề mở thư viện đã lọc |
| 4 | Thư viện | Cuộn đến section Thư viện (`#thu-vien`); từ đây có thể mở trang toàn bộ tài liệu |
| 5 | Đóng góp | Cuộn đến section Đóng góp (`#dong-gop`) |
| 6 | Đã lưu | Cuộn đến section Đã lưu (`#da-luu`); có biểu tượng bookmark và số tài liệu đã lưu trên trình duyệt |

## 2. Các section — thứ tự từ trên xuống

Hero đặt đầu trang. Các section tiếp theo: **Giới thiệu → Hành trình → Chủ đề → Thư viện → Đóng góp → Đã lưu**. Hành trình đặt ngay sau Giới thiệu, không thêm mục riêng trên navbar. Góp ý và footer đặt cuối trang.

| Thứ tự | Section | ID | Nội dung hiện tại | Hành động chính |
| --- | --- | --- | --- | --- |
| 1 | Hero | `hero` | Tiêu đề “Kiến thức dễ tìm. Học tập dễ hơn.”; mô tả thư viện học tập miễn phí, không cần tài khoản; ô tìm kiếm “Bạn muốn học gì hôm nay?”; minh họa học tập hoặc giao diện thư viện thực tế | “Khám phá tài liệu” cuộn đến Thư viện; tìm kiếm mở kết quả trong trang thư viện |
| 2 | Giới thiệu | `gioi-thieu` | Tiêu đề “Một không gian chung. Nhiều cơ hội học hỏi.”; mô tả bên phải; bốn thẻ: Học không rào cản, Tìm đúng điều cần học, Tôn trọng nguồn kiến thức, Điều hay, luôn ở lại; nền hồng nhạt, icon đỏ | Đọc giới thiệu và lợi ích |
| 3 | Hành trình | `hanh-trinh` | “Ba bước nhỏ, thêm một điều mới.”; ba thẻ 01–03: Tìm điều bạn tò mò → Đọc và khám phá → Lưu để học tiếp; mascot trên thẻ đầu | Hướng dẫn hành trình học hỏi |
| 4 | Chủ đề | `chu-de` | Các thẻ React, JavaScript, Git, Kỹ năng học tập…; mỗi thẻ có biểu tượng, tên và mô tả ngắn; chỉ hiện chủ đề đã có nội dung | Chọn chủ đề để mở thư viện đã lọc |
| 5 | Thư viện | `thu-vien` | Hiển thị 3–6 tài liệu nổi bật; có thể thêm nhóm mới cập nhật khi đủ nội dung. Card có tên, mô tả, chủ đề, trình độ, loại và ngày cập nhật | “Đọc tài liệu”, “Lưu tài liệu”, “Xem tất cả tài liệu”; chỉ hiện tải khi có file thật |
| 6 | Đóng góp | `dong-gop` | Giới thiệu ngắn, các gợi ý chia sẻ và nút “Chia sẻ tài liệu”. Form mặc định ẩn, chỉ xuất hiện trong popup khi bấm nút. Danh sách tài liệu cộng đồng nằm bên dưới | “Chia sẻ tài liệu” mở popup; “Đăng tài liệu” lưu và công khai; “Tải tài liệu” tải file; “Làm mới” cập nhật danh sách |
| 7 | Đã lưu | `da-luu` | Xem trước tài liệu đã lưu; khi rỗng, mời khám phá và lưu tài liệu. Đã bỏ dòng ghi chú về lưu trên trình duyệt và mất dữ liệu khỏi section | “Tiếp tục đọc”, “Bỏ lưu”, “Xem tất cả đã lưu”; khi rỗng có “Khám phá tài liệu” |
| 8 | Góp ý | `gop-y` | Tiêu đề “Bạn muốn LearnSpace có thêm gì?”; chọn Tài liệu / chủ đề mới, Tính năng website hoặc Góp ý khác; nhập nội dung, không cần tên hay email | “Gửi đề xuất”; lưu riêng trên server, thông báo thành công hoặc lỗi; không công khai góp ý |
| 9 | Footer | — | Logo, giới thiệu ngắn, liên kết điều hướng, kênh liên hệ thật, thông tin nguồn, điều kiện sử dụng và bản quyền phù hợp | Mở liên kết hoặc kênh liên hệ |

## 3. Section Góp ý — Bạn muốn LearnSpace có thêm gì?

Đặt sau Đã lưu, trước footer. Lời dẫn: “Chưa tìm thấy tài liệu mình cần, hay có ý tưởng giúp LearnSpace hữu ích hơn? Chia sẻ với chúng mình nhé.”

| Thành phần | Nội dung / hành vi |
| --- | --- |
| Loại đề xuất | Tài liệu / chủ đề mới; Tính năng website; Góp ý khác |
| Nội dung | Bắt buộc, 10–2.000 ký tự; gợi ý: “Mình muốn có thêm bài tập React về quản lý state…” |
| Thông tin cá nhân | Không yêu cầu tên hoặc email |
| Nút gửi | “Gửi đề xuất”; chuyển “Đang gửi…” và khóa form khi gửi |
| Thành công | Chỉ báo sau khi server lưu được; xóa form, cảm ơn và cho gửi góp ý khác |
| Thất bại | Hiện lỗi, giữ nguyên nội dung để sửa hoặc thử lại |
| Lưu trữ | POST `/api/feedback`, lưu file JSON trong `data/feedback/` trên server; không đưa vào Git |
| Riêng tư | Không công khai danh sách; không có API đọc công khai; chủ website xem file trên server |

Đề xuất được xem xét, không đồng nghĩa với cam kết triển khai. Giữ nền hồng nhạt, font SVN-Gilroy và nút đỏ theo style.

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
| Góp ý | Section `#gop-y` sau Đã lưu; form hiển thị trực tiếp, lưu riêng trên server; footer liên kết “Góp ý cho LearnSpace” đến section này |

## 5. Thứ tự triển khai thống nhất

**Navbar → Hero → Giới thiệu → Hành trình → Chủ đề → Thư viện → Đóng góp → Đã lưu → Góp ý → Footer**

Lợi ích nằm trong Giới thiệu; hướng dẫn học là section Hành trình riêng ngay sau đó. Tài liệu nổi bật và mới cập nhật nằm trong Thư viện.

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

## 7. Section Hành trình — Ba bước nhỏ, thêm một điều mới

- Vị trí: ngay sau `#gioi-thieu`, trước `#chu-de`; ID `hanh-trinh`.
- Component: `src/components/Journey.jsx`, được đặt sau `<Introduction />` trong `src/pages/Home.jsx`; style trong `src/App.css`.
- Dùng nền hồng nhạt `#FFF6F8`, font SVN-Gilroy và màu đỏ thương hiệu hiện tại.
- Phần đầu căn giữa: nhãn “BẮT ĐẦU TỪ ĐIỀU NHỎ” với hai đường kẻ hai bên; tiêu đề hai dòng, dòng đầu đen và dòng sau đỏ, gạch cong và tia vàng trang trí.
- Mô tả: “Chỉ cần một chủ đề bạn quan tâm, LearnSpace sẽ giúp bạn bắt đầu hành trình học hỏi.”

| Bước | Tiêu đề | Mô tả | Biểu tượng |
| --- | --- | --- | --- |
| 01 | Tìm điều bạn tò mò | Bắt đầu từ chủ đề khiến bạn muốn khám phá ngay hôm nay. | Kính lúp |
| 02 | Đọc và khám phá | Mở tài liệu, ghi nhớ điều cần thiết và hiểu sâu hơn từng ý tưởng. | Sách mở |
| 03 | Lưu để học tiếp | Đánh dấu nội dung hữu ích để quay lại bất cứ khi nào bạn sẵn sàng. | Bookmark |

Ba thẻ bo góc, nền trắng trong nhẹ, viền và bóng hồng nhạt; số bước đặt ở góc trên trái. Desktop hiển thị ba cột với mũi tên nối ngang. Ở màn hình rộng tối đa 800px, chuyển thành một cột với mũi tên hướng xuống. Mascot dùng lại `/mascot.png`, hiển thị phần đầu phía trên thẻ đầu tiên; các ngôi sao trang trí màu hồng.

Các bước dùng danh sách có thứ tự và icon trang trí được ẩn với trình đọc màn hình. Section chỉ hướng dẫn, không có nút hay liên kết thao tác riêng.

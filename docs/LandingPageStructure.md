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

Hero đặt đầu trang. Các section tiếp theo: **Giới thiệu → Hành trình → Chủ đề → Thư viện → Thông điệp → Đóng góp → Chia sẻ → Đã lưu**. Hành trình đặt ngay sau Giới thiệu, không thêm mục riêng trên navbar. Góp ý và footer đặt cuối trang.

| Thứ tự | Section | ID | Nội dung hiện tại | Hành động chính |
| --- | --- | --- | --- | --- |
| 1 | Hero | `hero` | Tiêu đề “Kiến thức dễ tìm. Học tập dễ hơn.”; mô tả thư viện học tập miễn phí, không cần tài khoản; ô tìm kiếm “Bạn muốn học gì hôm nay?”; minh họa học tập hoặc giao diện thư viện thực tế | “Khám phá tài liệu” cuộn đến Thư viện; tìm kiếm mở kết quả trong trang thư viện |
| 2 | Giới thiệu | `gioi-thieu` | Tiêu đề “Một không gian chung. Nhiều cơ hội học hỏi.”; mô tả bên phải; bốn thẻ: Học không rào cản, Tìm đúng điều cần học, Tôn trọng nguồn kiến thức, Điều hay, luôn ở lại; nền hồng nhạt, icon đỏ | Đọc giới thiệu và lợi ích |
| 3 | Hành trình | `hanh-trinh` | “Ba bước nhỏ, thêm một điều mới.”; ba thẻ 01–03: Tìm điều bạn tò mò → Đọc và khám phá → Lưu để học tiếp; mascot trên thẻ đầu | Hướng dẫn hành trình học hỏi |
| 4 | Chủ đề | `chu-de` | Các thẻ React, JavaScript, Git, Kỹ năng học tập…; mỗi thẻ có biểu tượng, tên và mô tả ngắn; chỉ hiện chủ đề đã có nội dung | Chọn chủ đề để mở thư viện đã lọc |
| 5 | Thư viện | `thu-vien` | Hiển thị 3–6 tài liệu nổi bật; có thể thêm nhóm mới cập nhật khi đủ nội dung. Card có tên, mô tả, chủ đề, trình độ, loại và ngày cập nhật | “Đọc tài liệu”, “Lưu tài liệu”, “Xem tất cả tài liệu”; chỉ hiện tải khi có file thật |
| 6 | Thông điệp | `thong-diep` | Tinh thần LearnSpace: không cần biết tất cả, chỉ cần luôn muốn học hỏi; mascot đeo tai nghe đọc sách | Truyền tải tinh thần học hỏi và cộng đồng |
| 7 | Đóng góp | `dong-gop` | Giới thiệu ngắn, các gợi ý chia sẻ và nút “Chia sẻ tài liệu của bạn”. Form mặc định ẩn, chỉ xuất hiện trong popup khi bấm nút. Danh sách tài liệu cộng đồng đặt trong section Chia sẻ riêng ngay sau Đóng góp | “Chia sẻ tài liệu của bạn” mở popup; “Đăng tài liệu” lưu và công khai; “Tải tài liệu” tải file; danh sách cập nhật tại section Chia sẻ sau khi đăng thành công |
| 8 | Chia sẻ | `chia-se` | Tài liệu cộng đồng mới nhất; thẻ bìa hồng, chủ đề, định dạng, dung lượng, ngày đăng và mô tả | Xem tất cả / Thu gọn, tải tài liệu, xem nguồn |
| 9 | Đã lưu | `da-luu` | Xem trước tài liệu đã lưu; khi rỗng, mời khám phá và lưu tài liệu. Đã bỏ dòng ghi chú về lưu trên trình duyệt và mất dữ liệu khỏi section | “Tiếp tục đọc”, “Bỏ lưu”, “Xem tất cả đã lưu”; khi rỗng có “Khám phá tài liệu” |
| 10 | Góp ý | `gop-y` | Tiêu đề “Bạn muốn LearnSpace có thêm gì?”; chọn Tài liệu / chủ đề mới, Tính năng muốn có hoặc Góp ý khác; nhập nội dung, không cần tên hay email | “Gửi đề xuất”; lưu riêng trên server, thông báo thành công hoặc lỗi; không công khai góp ý |
| 11 | Footer | — | Logo, giới thiệu ngắn, liên kết điều hướng, kênh liên hệ thật, thông tin nguồn, điều kiện sử dụng và bản quyền phù hợp | Mở liên kết hoặc kênh liên hệ |

## 3. Section Góp ý — Bạn muốn LearnSpace có thêm gì?

Đặt sau Đã lưu, trước footer. Lời dẫn: “Một ý tưởng nhỏ cũng có thể giúp LearnSpace trở nên hữu ích hơn cho nhiều người học.”

| Thành phần | Nội dung / hành vi |
| --- | --- |
| Loại đề xuất | Tài liệu / chủ đề mới; Tính năng muốn có; Góp ý khác |
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

**Navbar → Hero → Giới thiệu → Hành trình → Chủ đề → Thư viện → Thông điệp → Đóng góp → Chia sẻ → Đã lưu → Góp ý → Footer**

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

Luồng: bấm “Chia sẻ tài liệu của bạn” → mở hộp thoại → nhập thông tin → chọn file → kiểm tra → đang đăng → server lưu → báo thành công và cập nhật danh sách trong section Chia sẻ. Form mặc định ẩn để section gọn; đóng bằng nút Đóng hoặc Escape, giữ bản nhập khi mở lại. Trong khi đăng, chặn đóng để tránh mất trạng thái. Lỗi giữ nguyên nội dung để sửa hoặc thử lại. Danh sách có trạng thái đang tải, trống, lỗi và nút thử lại khi tải thất bại.

Tài liệu cộng đồng hiển thị tiêu đề, mô tả, chủ đề, trình độ, tên người chia sẻ, nguồn, điều kiện sử dụng, ngày đăng, dung lượng và nút tải file. Ngày đăng lấy từ server. File được tải dưới dạng đính kèm.

### Vận hành

- API `GET /api/documents`, `POST /api/documents`, `GET /api/documents/:id/file`.
- File và metadata lưu trong `data/documents/` ở server, không đưa vào Git; không dùng localStorage để chia sẻ file.
- `npm run dev` hoặc `npm run preview` cung cấp cả giao diện và API; `npm run build` rồi `npm start` để chạy bản build bằng Node.js.
- Hosting chỉ phục vụ file tĩnh sẽ không xử lý upload. Khi đưa lên mạng cần server Node.js và ổ đĩa lưu trữ bền vững; sao lưu thư mục dữ liệu.
- Bản này chưa có quản trị, kiểm duyệt, xác minh tài khoản, chống spam hoặc quét mã độc. Dữ liệu người dùng nhập được hiển thị dạng văn bản; có kiểm tra định dạng và dung lượng file phía server.
- Tài liệu cộng đồng nằm trong section Chia sẻ; danh mục biên tập trong Thư viện và tính năng Đã lưu hiện vẫn dùng dữ liệu cũ.

## 7. Section Hành trình — Ba bước nhỏ, thêm một điều mới

- Vị trí: ngay sau `#gioi-thieu`, trước `#chu-de`; ID `hanh-trinh`.
- Component: `src/components/Journey.jsx`, được đặt sau `<Introduction />` trong `src/pages/Home.jsx`; style trong `src/App.css`.
- Dùng nền trắng `#FFFFFF`, font SVN-Gilroy và màu đỏ thương hiệu hiện tại.
- Phần đầu căn giữa: nhãn “BẮT ĐẦU TỪ ĐIỀU NHỎ” với hai đường kẻ hai bên; tiêu đề hai dòng, dòng đầu đen và dòng sau đỏ, gạch cong và tia vàng trang trí.
- Mô tả: “Chỉ cần một chủ đề bạn quan tâm, LearnSpace sẽ giúp bạn bắt đầu hành trình học hỏi.”

| Bước | Tiêu đề | Mô tả | Biểu tượng |
| --- | --- | --- | --- |
| 01 | Tìm điều bạn tò mò | Bắt đầu từ chủ đề khiến bạn muốn khám phá ngay hôm nay. | Kính lúp |
| 02 | Đọc và khám phá | Mở tài liệu, ghi nhớ điều cần thiết và hiểu sâu hơn từng ý tưởng. | Sách mở |
| 03 | Lưu để học tiếp | Đánh dấu nội dung hữu ích để quay lại bất cứ khi nào bạn sẵn sàng. | Bookmark |

Ba thẻ bo góc, nền trắng trong nhẹ, viền và bóng hồng nhạt; số bước đặt ở góc trên trái. Desktop hiển thị ba cột với mũi tên nối ngang. Ở màn hình rộng tối đa 800px, chuyển thành một cột với mũi tên hướng xuống. Mascot dùng lại `/mascot.png`, hiển thị phần đầu phía trên thẻ đầu tiên; các ngôi sao trang trí màu hồng.

Các bước dùng danh sách có thứ tự và icon trang trí được ẩn với trình đọc màn hình. Section chỉ hướng dẫn, không có nút hay liên kết thao tác riêng.

## 8. Giao diện section Đóng góp

Section `#dong-gop` dùng nền đỏ gradient, họa tiết cong mờ, chữ trắng và điểm nhấn vàng nhạt. Desktop chia hai cột; màn hình tối đa 991px xếp nội dung và khung gợi ý theo chiều dọc.

- Bên trái: nhãn “KIẾN THỨC MỞ, CỘNG ĐỒNG MẠNH”; tiêu đề “Chia sẻ điều bạn biết, giúp người khác tiến xa hơn.”; mô tả khuyến khích chia sẻ ghi chú, tài liệu và kinh nghiệm; nút trắng “Chia sẻ tài liệu của bạn” có mũi tên.
- Bên phải: khung bo góc có viền sáng, tiêu đề “Bạn có thể chia sẻ gì?”; bốn dòng gồm Ghi chép học tập, Tài liệu hữu ích, Kinh nghiệm ôn luyện và Bộ sưu tập theo chủ đề. Mỗi dòng có icon đỏ trên nền kem hồng và mô tả ngắn.
- Mascot dùng lại `/mascot.png` ở góc dưới phải cùng chồng sách trang trí; ngôi sao vàng nhạt quanh khung.
- Nút chia sẻ tiếp tục mở popup đăng tài liệu hiện tại. Giữ nguyên kiểm tra file, quyền chia sẻ, trạng thái đăng, thông báo lỗi/thành công và danh sách tài liệu cộng đồng tại section `#chia-se` ngay sau đó.

## 9. Section Chia sẻ — Tài liệu được chia sẻ

- ID `chia-se`, đặt ngay sau `dong-gop` và trước `da-luu`; component `src/components/SharedSection.jsx`.
- Tách toàn bộ danh sách khỏi nền đỏ của Đóng góp. Section mới nền trắng, nhãn đỏ “TỪ CỘNG ĐỒNG LEARNSPACE”, tiêu đề đen/đỏ và mô tả theo mẫu.
- Lấy dữ liệu thật từ `GET /api/documents`, sắp xếp mới nhất trước; mặc định hiện tối đa ba thẻ. “Xem tất cả tài liệu mới” mở toàn bộ ngay trong section; “Thu gọn tài liệu” trở lại ba thẻ.
- Thẻ có bìa minh họa bằng CSS theo chủ đề, nhãn chủ đề, nhãn “Mới” khi đăng trong bảy ngày qua, tên, định dạng, dung lượng và ngày đăng theo múi giờ Asia/Bangkok. Không thêm số trang hoặc thời gian giả khi API chưa cung cấp.
- Giữ mô tả, thông tin người chia sẻ/nguồn/điều kiện sử dụng trong mục mở rộng và liên kết tải file thật.
- Có trạng thái đang tải, trống và lỗi với nút thử lại. Đăng thành công trong popup Đóng góp sẽ tự cập nhật section Chia sẻ.
- Desktop ba cột, tối đa 991px hai cột, tối đa 600px một cột. Không thêm mục navbar riêng.

## 10. Section Đã lưu — Góc học tập của bạn

- Section `#da-luu` dùng nền hồng nhạt, tiêu đề “Điều hay đã lưu, sẵn sàng để học tiếp.” với dòng thứ hai màu đỏ.
- Khi chưa lưu tài liệu: khung trắng kem bo góc lớn, tấm nền hồng xoay phía sau, icon bookmark, tiêu đề “Bộ sưu tập của bạn đang chờ tài liệu đầu tiên” và lời nhắc lưu để học tiếp.
- Gợi ý React, React Router và API dẫn đến kết quả tìm kiếm thật; nút “Khám phá thư viện” cuộn đến `#thu-vien`.
- Mascot mới `/mascot-reading.png`: gà vàng ngồi đọc sách đỏ, khăn đỏ chữ L, ba lô đỏ; nền trong suốt, đặt ở góc dưới trái theo ảnh mẫu. Ngôi sao vàng trang trí hai bên.
- Khi đã có tài liệu: giữ danh sách xem trước tối đa ba tài liệu, “Tiếp tục đọc”, “Bỏ lưu” và “Xem tất cả đã lưu”; đồng bộ với trạng thái yêu thích trên navbar và thư viện.
- Mobile chuyển khung thành toàn chiều rộng và đặt mascot thấp hơn để không che nội dung hay nút.

## 11. Giao diện section Góp ý

- Section `#gop-y` theo mẫu: nền hồng nhạt có họa tiết cong, hai cột trên desktop; màn hình tối đa 800px xếp dọc.
- Cột phải có nhãn “CÙNG LÀM LEARNSPACE TỐT HƠN”, tiêu đề “Bạn muốn LearnSpace có thêm gì?” đen/đỏ và lời mời chia sẻ ý tưởng. Trên màn hình tối đa 800px, giới thiệu và ảnh ở trên form.
- Mascot `/mascot-feedback.png`: hộp thư đỏ có phong bì ở bên trái, gà vàng khăn đỏ chữ L và ba lô đỏ ở bên phải hướng về form, bóng đèn ý tưởng phía trên; chữ L giữ đúng chiều, ảnh nền trong suốt đặt dưới mô tả.
- Cột trái là form trắng bo góc lớn; ba lựa chọn dạng pill: Tài liệu / chủ đề mới, Tính năng muốn có, Góp ý khác. Giá trị API vẫn là `content`, `feature`, `other`.
- Ô nội dung nền xám nhạt, placeholder nhiều dòng gợi ý tài liệu/tính năng/góp ý; giữ giới hạn 10–2.000 ký tự, label và hướng dẫn truy cập. Nút đỏ “Gửi đề xuất” kèm icon máy bay giấy.
- Giữ nguyên API và quyền riêng tư: chỉ xóa form khi lưu thành công, giữ nội dung khi lỗi, khóa form trong lúc gửi và hiển thị thông báo trạng thái.

## 12. Section Thông điệp — Tinh thần LearnSpace

- ID `thong-diep`, component `src/components/MessageSection.jsx`; ngay sau `#thu-vien`, trước `#dong-gop`. Không thêm mục navbar riêng.
- Theo mẫu: nền hồng nhạt, họa tiết sóng phía dưới, hai cột trên desktop và một cột ở màn hình tối đa 800px.
- Cột trái: nhãn pill “TINH THẦN LEARNSPACE”; tiêu đề “Không cần biết tất cả. Chỉ cần luôn muốn học hỏi.” với dòng thứ hai màu đỏ.
- Nội dung: “Mỗi người bắt đầu với một nền tảng khác nhau, nhưng ai cũng có thể tiếp tục tiến bộ. LearnSpace tin rằng tri thức có giá trị hơn khi được khám phá, lưu giữ và sẻ chia.”
- Khung thông điệp có icon cộng đồng và dòng “Học theo cách riêng. Phát triển cùng cộng đồng.”; không có nút thao tác.
- Cột phải dùng ảnh mới `/mascot-message.png`: gà vàng khăn đỏ chữ L, tai nghe đỏ, đọc sách bên chồng sách và chậu cây; các bong bóng biểu tượng bóng đèn, biểu đồ tăng trưởng và mũ tốt nghiệp. Ảnh có nền trong suốt.

## 13. Cỡ chữ section Chủ đề và Thư viện

Hai section `#chu-de` và `#thu-vien` dùng cùng thang chữ với các section landing page khác, giữ font SVN-Gilroy và màu hiện tại:

| Thành phần | Desktop | Mobile tối đa 600px |
| --- | --- | --- |
| Nhãn section | 18px, weight 800 | 14px |
| Tiêu đề section | `clamp(32px, 3.5vw, 50px)`, weight 800 | 30px |
| Mô tả section | 21px; tối đa 800px dùng 19px | 17px |
| Liên kết xem tất cả | 19px | 17px |
| Tiêu đề thẻ | 27px, weight 800 | 25px |
| Mô tả thẻ | 19px; tối đa 800px dùng 18px | 18px |
| Metadata, tag, số tài liệu | 14px | 14px |
| Hành động thẻ | Chủ đề 18px, xem nội dung 16px, nút lưu 15px | Chủ đề 17px, các nút còn lại giữ nguyên |

Khoảng cách sau phần đầu section tăng để chữ thoáng. Từ 992px đến 1200px, liên kết xem tất cả xuống dưới tiêu đề để tránh ép chiều ngang; breakpoint lưới thẻ giữ nguyên.

## 14. Khoảng cách giữa các section

- Dùng biến CSS `--landing-section-space`: padding trên/dưới 44px trên desktop, 32px khi màn hình tối đa 800px, 28px khi tối đa 480px. Thay cho các khoảng 64–110px trước đây.
- Hero dùng 40px trên / 48px dưới; tối đa 800px dùng 32px / 36px.
- Khoảng từ heading đến thẻ Chủ đề, Thư viện, Chia sẻ: 32px trên desktop, 24px trên điện thoại. Giới thiệu đến bốn thẻ giảm còn 40px / 30px.
- Giữ khoảng trống cần thiết cho mascot tràn khỏi khung Đóng góp, Đã lưu và mascot phía trên bước đầu Hành trình. Không giảm padding bên trong form hoặc nút bấm.
- Thông điệp giữ 56px phía dưới trên desktop, 40px trên mobile cho họa tiết sóng; Đã lưu giữ 48px / 32px để mascot không bị cắt.

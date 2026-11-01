# Phân tích nghiệp vụ LearnSpace

Ngày lập: 01/11/2026. Trạng thái: đề xuất phạm vi để triển khai.

## Tổng quan — thông tin quan trọng

**LearnSpace là không gian chia sẻ kiến thức và tài liệu học tập. Bản đầu chỉ có frontend, bạn quản lý và đăng tải nội dung; mọi người có thể truy cập, đọc và tải tài liệu công khai.**

| Quyết định chính | Nội dung |
| --- | --- |
| Mục tiêu | Giúp mọi người tìm, sử dụng và chia sẻ tài liệu học tập dễ dàng |
| Phạm vi kỹ thuật | React + Vite + React Router, dữ liệu và file tĩnh; chưa làm backend |
| Người đăng tài liệu | Bạn thêm/sửa nội dung trong mã nguồn, kiểm tra rồi build và deploy |
| Người học | Không cần tài khoản; tìm kiếm, lọc, đọc, tải, lưu tài liệu và chia sẻ liên kết |
| Cộng đồng đóng góp | Gửi tài liệu/góp ý qua kênh liên hệ thực tế để bạn duyệt trước khi xuất bản |
| Lưu cá nhân | Dùng `localStorage`, chỉ lưu trên trình duyệt hiện tại, chưa đồng bộ thiết bị |
| Style giao diện | Theo [LangmasterStyle.md](./LangmasterStyle.md): đỏ `#DB1F1F`, gradient đến `#9D0B0F`, nền trắng/hồng nhạt, font SVN-Gilroy |
| Chưa triển khai | Đăng nhập, quản trị trên web, tự upload, bình luận, thanh toán và số liệu cộng đồng dùng chung |

### Ưu tiên triển khai bản đầu

1. **Thư viện tài liệu:** danh sách, chủ đề, tìm kiếm, lọc và sắp xếp.
2. **Chi tiết tài liệu:** nội dung thật, nguồn, tác giả, ngày cập nhật và đọc/tải file.
3. **Đã lưu và chia sẻ:** lưu trên trình duyệt, mở lại và sao chép liên kết.
4. **Trang chủ và đóng góp:** giới thiệu LearnSpace, gợi ý nội dung và hướng dẫn gửi tài liệu.
5. **Hoàn thiện sử dụng:** mobile, trạng thái lỗi/rỗng và mở trực tiếp đường dẫn khi deploy.

### Luồng sử dụng cốt lõi

- **Người học:** Khám phá → Tìm/lọc → Xem tài liệu → Đọc/tải → Lưu hoặc chia sẻ.
- **Bạn xuất bản:** Chuẩn bị nội dung → Thêm file và thông tin → Kiểm tra → Deploy.
- **Người đóng góp:** Gửi qua kênh liên hệ → Bạn duyệt → Xuất bản cùng website.

### Điều kiện quan trọng trước khi phát hành

- Có tài liệu thật và liên kết đọc/tải hoạt động; không chỉ dừng ở dữ liệu minh họa.
- Form liên hệ hiện tại chưa gửi dữ liệu thực tế: cần thay bằng kênh liên hệ thật, bỏ thông báo “đã gửi thành công” giả.
- Nội dung được đóng gói trong website là công khai; bản nháp phải được loại khỏi bản deploy.
- Bản đầu hoàn thành khi người học thực hiện được luồng **tìm → đọc/tải → lưu**, và bạn có thể thêm tài liệu mới rồi xuất bản.

Các phần bên dưới mô tả chi tiết vai trò, phạm vi, dữ liệu, quy tắc và tiêu chí nghiệm thu.

## 1. Mục tiêu và định vị

LearnSpace là không gian chia sẻ kiến thức và thư viện tài liệu học tập. Người đọc có thể khám phá, tìm kiếm, đọc, tải tài liệu và lưu nội dung để học lại. Chủ website đăng tải, tổ chức và duyệt nội dung để đảm bảo tài liệu dễ tìm, có nguồn và có giá trị sử dụng.

Giai đoạn đầu chỉ có frontend. Nội dung công khai được đóng gói cùng website; chủ website cập nhật nội dung trong mã nguồn rồi build và deploy. Người đọc không cần tài khoản.

Các giả định cho bản phân tích này:

- Tài liệu công khai, sử dụng miễn phí; chưa có bán khóa học hoặc thanh toán.
- Bạn là người quản lý và xuất bản nội dung chính.
- Chủ đề ban đầu ưu tiên lập trình/công nghệ theo tài liệu hiện có, nhưng cấu trúc cho phép bổ sung lĩnh vực khác.
- Cộng đồng có thể gửi đề xuất qua kênh liên hệ; bài gửi chỉ xuất hiện sau khi bạn duyệt và deploy.
- Giao diện sử dụng màu sắc, font và đặc trưng từ [LangmasterStyle.md](./LangmasterStyle.md).

## 2. Người dùng và nhu cầu

| Vai trò | Nhu cầu | Quyền và cách thực hiện trong giai đoạn đầu |
| --- | --- | --- |
| Người học / khách truy cập | Tìm đúng nội dung, đọc và tải tài liệu | Truy cập nội dung đã xuất bản, tìm kiếm, lọc, lưu cá nhân |
| Người đóng góp | Chia sẻ kiến thức hoặc góp ý tài liệu | Mở kênh liên hệ, gửi nội dung để chủ website duyệt |
| Chủ website / biên tập viên | Thêm, sửa, phân loại, xuất bản và gỡ nội dung | Thao tác trong repository, kiểm tra bản preview và deploy |

Vai trò biên tập viên là vai trò vận hành ngoài website. Không xây trang đăng nhập hoặc trang quản trị giả lập quyền bằng frontend.

## 3. Phạm vi sản phẩm

### MVP — cần có trong bản đầu

| Mã | Chức năng | Giá trị mang lại |
| --- | --- | --- |
| FR-01 | Trang chủ giới thiệu, chủ đề và tài liệu nổi bật | Giúp người mới hiểu LearnSpace và bắt đầu học |
| FR-02 | Thư viện tài liệu | Duyệt nội dung theo danh sách thống nhất |
| FR-03 | Tìm kiếm, lọc và sắp xếp | Tìm nội dung phù hợp mục tiêu học |
| FR-04 | Trang chi tiết tài liệu | Xem mô tả, kiến thức cần có, nội dung và nguồn |
| FR-05 | Đọc trực tuyến hoặc mở/tải file | Sử dụng tài liệu ngay |
| FR-06 | Lưu và bỏ lưu tài liệu | Tạo danh sách học cá nhân trên trình duyệt |
| FR-07 | Chia sẻ liên kết | Giới thiệu đúng tài liệu cho người khác |
| FR-08 | Hướng dẫn đóng góp và báo lỗi | Tạo đường đi thực tế để cộng đồng tham gia |
| FR-09 | Quy trình xuất bản nội dung tĩnh | Giúp chủ website duy trì thư viện |
| FR-10 | Trạng thái rỗng, lỗi và trang không tồn tại | Giúp người dùng hiểu và tiếp tục thao tác |

### Phát triển tiếp khi vẫn chỉ có frontend

- Lộ trình học: tập hợp tài liệu theo thứ tự gợi ý.
- Đánh dấu đã học và phần trăm hoàn thành lộ trình trên cùng trình duyệt.
- Xuất/nhập danh sách đã lưu bằng file để người dùng tự chuyển thiết bị.
- Trang người đóng góp từ dữ liệu do biên tập viên quản lý.

### Chưa triển khai

- Tài khoản, đồng bộ dữ liệu giữa thiết bị.
- Người dùng tự upload và xuất bản tài liệu trực tiếp trên website.
- Bình luận, đánh giá cộng đồng, lượt thích dùng chung, chat và thông báo.
- Thống kê lượt xem/lượt tải toàn hệ thống khi chưa có nguồn đo thực tế.
- Thanh toán, tài liệu riêng tư hoặc kiểm soát quyền tải.

Không hiển thị số liệu cộng đồng giả. Nội dung đóng gói trong frontend là nội dung công khai; ẩn nút hoặc đường dẫn không tạo ra quyền truy cập riêng tư.

## 4. Cấu trúc nội dung

Phân biệt ba khái niệm:

- **Chủ đề:** nhóm nội dung, ví dụ React, JavaScript, Git, Kỹ năng học tập.
- **Tài liệu:** đơn vị nội dung độc lập, có thể là bài viết, PDF, file bài tập hoặc liên kết tài nguyên.
- **Lộ trình:** danh sách tài liệu có thứ tự để đạt một mục tiêu học; để giai đoạn sau.

Mỗi tài liệu có một chủ đề chính và nhiều thẻ. Loại tài liệu và trình độ là thuộc tính riêng, không dùng thay cho chủ đề.

| Trường tài liệu | Bắt buộc | Ý nghĩa / quy tắc |
| --- | --- | --- |
| `id` | Có | Định danh duy nhất, giữ ổn định khi đổi tiêu đề |
| `slug` | Có | Đường dẫn duy nhất, dễ đọc, không dấu |
| `title`, `summary` | Có | Tên và mô tả giúp quyết định có học hay không |
| `topicId` | Có | Tham chiếu một chủ đề hợp lệ |
| `tags` | Không | Từ khóa bổ sung, dùng tên nhất quán |
| `type` | Có | `article`, `pdf`, `download` hoặc `external` |
| `level` | Có | Cơ bản, trung cấp, nâng cao hoặc mọi trình độ |
| `author` | Có | Tác giả hoặc người đóng góp thực tế |
| `publishedAt`, `updatedAt` | Có | Ngày xuất bản và cập nhật để đánh giá độ mới |
| `contentPath` | Theo loại | Nội dung bài viết, bắt buộc với `article` |
| `fileUrl`, `fileName`, `fileSize` | Theo loại | Đường dẫn, tên và dung lượng file; bắt buộc với tài liệu tải |
| `externalUrl` | Theo loại | Địa chỉ nguồn ngoài; bắt buộc với `external` |
| `source`, `usageNote` | Có | Nguồn và điều kiện sử dụng; có thể ghi “Tài liệu tự biên soạn” |
| `prerequisites` | Không | Kiến thức nên biết trước khi học |
| `cover`, `featured`, `readingMinutes` | Không | Ảnh, lựa chọn nổi bật và thời gian đọc ước tính |

Một bài viết có thể đính kèm file tải thêm. Không bắt buộc mọi tài liệu đều có file tải. Thời gian đọc là ước tính, không phải thời lượng khóa học.

## 5. Luồng nghiệp vụ

### 5.1. Khám phá và sử dụng tài liệu

1. Người đọc vào trang chủ hoặc truy cập trực tiếp liên kết tài liệu.
2. Mở thư viện, nhập từ khóa hoặc chọn chủ đề, loại và trình độ.
3. Xem kết quả và mở trang chi tiết.
4. Đọc mô tả, tác giả, ngày cập nhật, nguồn và kiến thức cần có.
5. Đọc bài, mở PDF, tải file hoặc truy cập nguồn ngoài tùy loại.
6. Lưu tài liệu hoặc sao chép liên kết để quay lại/chia sẻ.

Không yêu cầu đăng nhập trước khi đọc hoặc tải tài liệu công khai.

### 5.2. Lưu tài liệu cá nhân

1. Người đọc chọn “Lưu tài liệu” trên card hoặc trang chi tiết.
2. Website lưu ID vào `localStorage` và cập nhật trạng thái ở các nơi liên quan.
3. Người đọc mở trang “Đã lưu” để tiếp tục học.
4. Chọn “Bỏ lưu” để xóa khỏi danh sách cá nhân.

Danh sách chỉ tồn tại trên trình duyệt và thiết bị hiện tại, không có đồng bộ. Xóa dữ liệu trình duyệt có thể làm mất danh sách. Nếu bộ nhớ bị chặn hoặc ghi thất bại, vẫn cho đọc/tải và thông báo rằng lựa chọn chưa được lưu lâu dài.

### 5.3. Chủ website xuất bản tài liệu

1. Chuẩn bị nội dung, file, mô tả, chủ đề, tác giả và nguồn.
2. Thêm bài/file và metadata vào repository.
3. Kiểm tra nội dung, liên kết, hiển thị mobile và bản preview.
4. Build và deploy website.
5. Mở bản công khai để xác nhận tài liệu có thể đọc và tải.

Trạng thái biên tập: **Nháp → Sẵn sàng duyệt → Đã xuất bản → Gỡ khỏi thư viện**. Đây là quy trình vận hành; không bắt buộc xây màn hình quản lý trạng thái. Bản nháp phải được loại khỏi dữ liệu và file public của bản deploy, không chỉ ẩn trên giao diện.

Khi gỡ tài liệu, loại khỏi danh sách và xử lý đường dẫn cũ bằng thông báo phù hợp hoặc chuyển đến tài liệu thay thế. Nếu cần gỡ cả file công khai, phải loại file khỏi bản deploy và kiểm tra URL trực tiếp.

### 5.4. Cộng đồng đóng góp hoặc báo lỗi

1. Người đọc mở “Đóng góp” hoặc “Báo lỗi tài liệu”.
2. Website hiển thị thông tin cần gửi: tên tài liệu, liên kết, mô tả, nguồn, tên người đóng góp.
3. Mở ứng dụng email qua `mailto:` sau khi chủ website cấu hình địa chỉ thực.
4. Người dùng tự kiểm tra và gửi email; chủ website nhận, duyệt rồi xuất bản theo luồng ở trên.

Mở ứng dụng email không đồng nghĩa đã gửi thành công. Nếu chưa có email cấu hình, hiển thị hướng dẫn cùng trạng thái “Kênh đóng góp đang được cập nhật”; không tạo địa chỉ giả. Chưa xây form nhận dữ liệu nếu không có nơi nhận và lưu thực tế.

## 6. Quy tắc tìm kiếm, lọc và hiển thị

- Tìm trong tiêu đề, mô tả và thẻ; chưa tìm toàn văn trong file PDF.
- Tìm không phân biệt hoa/thường và dấu tiếng Việt; ví dụ “tai lieu” có thể tìm “tài liệu”.
- Từ khóa kết hợp với các bộ lọc theo điều kiện AND. Bản đầu mỗi bộ lọc chọn một giá trị hoặc “Tất cả”.
- Mặc định sắp xếp theo ngày xuất bản mới nhất; tùy chọn thêm “Cập nhật gần nhất” và “Tên A–Z”. Nếu bằng nhau, dùng ID để giữ thứ tự ổn định.
- Hiển thị tổng số kết quả sau lọc. Không có kết quả thì cho xóa bộ lọc và gợi ý quay về thư viện.
- Nên lưu từ khóa, bộ lọc và trang hiện tại trong query URL để có thể chia sẻ và quay lại. Đổi bộ lọc thì về trang đầu.
- Đề xuất phân trang 12 tài liệu/trang. Trang vượt phạm vi sau khi lọc trở về trang hợp lệ.
- Tài liệu liên quan: cùng chủ đề, loại tài liệu hiện tại khỏi kết quả, tối đa 4 mục; ẩn khối nếu không có mục phù hợp.
- Tài liệu nổi bật do chủ website chọn, không gọi là “phổ biến nhất” khi chưa có dữ liệu đo.

## 7. Các màn hình đề xuất

| Màn hình | Đường dẫn dự kiến | Nội dung chính |
| --- | --- | --- |
| Trang chủ | `/` | Giới thiệu, tìm kiếm, chủ đề, tài liệu nổi bật và mới nhất |
| Thư viện | `/tai-lieu` | Từ khóa, bộ lọc, sắp xếp, kết quả, phân trang |
| Chi tiết tài liệu | `/tai-lieu/:slug` | Metadata, nội dung/xem trước, nguồn, đọc/tải, lưu, chia sẻ, báo lỗi |
| Đã lưu | `/da-luu` | Tài liệu lưu trên thiết bị và trạng thái danh sách rỗng |
| Giới thiệu | `/gioi-thieu` | Mục tiêu LearnSpace, đối tượng và cách sử dụng |
| Đóng góp | `/dong-gop` | Hướng dẫn gửi bài, thông tin liên hệ thực tế |
| Không tìm thấy | Đường dẫn không hợp lệ | Giải thích và nút về thư viện |

PDF có thể mở bằng trình xem của trình duyệt; luôn có liên kết mở riêng/tải file khi vùng xem nhúng không hoạt động. Với nguồn ngoài, ghi rõ đây là tài nguyên ngoài LearnSpace. Không hứa tải được file từ nguồn ngoài nếu phía nguồn không hỗ trợ.

## 8. Áp dụng style Langmaster

| Thành phần LearnSpace | Quy định đề xuất |
| --- | --- |
| Nhận diện chính | Đỏ `#DB1F1F`; gradient `#DB1F1F → #9D0B0F` |
| Header | Nền trắng, menu chữ `#252525`; active/hover đỏ |
| Hero | Gradient đỏ, chữ trắng, CTA “Khám phá tài liệu” |
| Nền vùng đọc | Trắng; chữ `#252525`; hạn chế mảng đỏ lớn quanh bài dài |
| Khối gợi ý / chủ đề | Hồng nhạt `#FFF2F2`, viền/điểm nhấn đỏ |
| Input tìm kiếm | Nền `#F2F4F5`, nhãn rõ, viền focus đỏ |
| Nút chính | Gradient đỏ, chữ trắng, bo 12px |
| Card | Nền trắng, bo 12–20px, bóng nhẹ theo tài liệu style |
| Footer | Nền `#231F20`, chữ trắng |
| Font | SVN-Gilroy; fallback `sans-serif`; dùng asset font được phép sử dụng |
| Typography | H1 desktop 40px/800, H2 32px/700; nội dung đề xuất 16–18px, line-height 1.6–1.8 |
| Responsive | Tham chiếu mốc 992px; mobile xếp một cột và thu gọn điều hướng |

Giữ bảng màu và đặc trưng thiết kế từ tài liệu tham chiếu, nhưng nội dung, logo và tên thương hiệu là LearnSpace. Không cần sao chép form tư vấn hoặc các thành phần bán khóa học của Langmaster.

Placeholder nhạt chỉ dùng làm gợi ý, không thay nhãn hoặc chữ nhập. Điều chỉnh tương phản tại từng thành phần khi triển khai. Trạng thái lưu, lỗi và đang chọn cần có chữ/biểu tượng đi kèm, không chỉ phân biệt bằng màu.

## 9. Tiêu chí nghiệm thu MVP

| Chức năng | Điều kiện được coi là hoàn thành |
| --- | --- |
| Khám phá | Người mới có thể đi từ trang chủ đến tài liệu qua CTA hoặc chủ đề |
| Tìm kiếm | Tìm được từ khóa có/không dấu; kết quả kết hợp đúng bộ lọc và sắp xếp |
| Chi tiết | Mỗi tài liệu xuất bản có URL riêng, thông tin bắt buộc và hành động phù hợp với loại |
| Đọc/tải | File thực tồn tại và liên kết hoạt động; tài liệu không có file không hiện nút tải giả |
| Đã lưu | Trạng thái thống nhất giữa card/chi tiết/trang đã lưu và còn sau reload trên cùng trình duyệt |
| Lỗi bộ nhớ | Dữ liệu localStorage hỏng hoặc không ghi được không làm sập website |
| Chia sẻ | Sao chép đúng URL chi tiết; chỉ báo thành công khi sao chép được; thất bại thì hiện URL để sao chép thủ công |
| Đóng góp | Mở đúng kênh liên hệ đã cấu hình; không báo đã gửi nếu chưa gửi thực tế |
| Xuất bản | Thêm một tài liệu qua metadata và file, deploy xong truy cập được từ thư viện và URL trực tiếp |
| Trạng thái lỗi | Có giao diện cho thư viện rỗng, không có kết quả, danh sách lưu rỗng và slug không tồn tại |
| Mobile và truy cập | Không tràn ngang ở màn hình 360px; menu, lọc và nút thao tác dùng được bằng bàn phím, có focus rõ |
| Hosting | Mở trực tiếp và reload đường dẫn chi tiết hoạt động trên môi trường deploy đã chọn |

Không hiển thị “tải thành công” chỉ vì người đọc bấm nút: frontend không xác nhận chắc chắn trình duyệt đã lưu file vào thiết bị.

## 10. Đối chiếu với dự án hiện tại

Dự án đang dùng React, Vite và React Router. Các nhận xét dưới đây dựa trên mã nguồn đã đọc, chưa phải kiểm thử giao diện đang chạy.

| Hiện tại | Hướng chuyển đổi đề xuất |
| --- | --- |
| `Courses.jsx`, `CourseDetail.jsx`, dữ liệu `courses.js` | Chuyển mô hình khóa học sang tài liệu; bổ sung loại, chủ đề, slug, nguồn và nội dung/file |
| Lưu yêu thích bằng `favoriteCourseIds` | Phát triển thành “Đã lưu”; giữ/migrate các ID chỉ khi có ánh xạ dữ liệu phù hợp, không tự gán sang tài liệu khác |
| Header hiển thị số yêu thích | Cho phép mở trang “Đã lưu” từ header |
| `Home.jsx`, `About.jsx` | Điều chỉnh định vị sang thư viện kiến thức và chia sẻ tài liệu |
| `Contact.jsx` chỉ xử lý state nhưng báo “Đã gửi thông tin thành công” | Thay bằng kênh liên hệ thật hoặc hướng dẫn đóng góp, bỏ thông báo gửi giả |
| Route `/courses` và `/courses/:courseId` | Chuyển sang route tài liệu; nếu URL cũ đã được chia sẻ thì thêm chuyển hướng khi có ánh xạ rõ ràng |
| Các file học tập trong `docs/` | Chọn nội dung phù hợp để công khai; không mặc định xuất bản toàn bộ tài liệu nội bộ |

Chỉ triển khai frontend và dữ liệu tĩnh; không cần thêm backend để hoàn thành MVP này. Với host tĩnh, cần cấu hình phục vụ route SPA hoặc dùng định tuyến phù hợp với host để đường dẫn trực tiếp không trả lỗi.

## 11. Thứ tự thực hiện

1. Chuẩn hóa danh mục, mô hình tài liệu và chọn nội dung ban đầu; chuẩn bị font và token Langmaster.
2. Xây thư viện, tìm kiếm/lọc và trang chi tiết có nội dung/file thật.
3. Hoàn thiện đã lưu, chia sẻ và các trạng thái lỗi/rỗng.
4. Cập nhật trang chủ, giới thiệu và hướng dẫn đóng góp; thay form liên hệ giả.
5. Kiểm tra mobile, bàn phím, đường dẫn trực tiếp, file tải và quy trình thêm tài liệu; deploy bản đầu.

Đánh giá bản đầu bằng các kết quả kiểm chứng được: tài liệu có metadata đầy đủ, liên kết hoạt động và hoàn thành được luồng tìm → đọc/tải → lưu. Các chỉ số như người dùng hoạt động, lượt tải toàn hệ thống hoặc tỷ lệ quay lại chỉ bổ sung khi có công cụ đo thực tế.

# Phạm vi sản phẩm LearnSpace

Cập nhật: 11/11/2026. Tài liệu này thay thế phạm vi frontend tĩnh trước đây.

## Mục tiêu

LearnSpace là thư viện tài liệu lập trình miễn phí. Khách được khám phá danh mục; người dùng đăng nhập để mở chi tiết, đọc, tải và gửi tài liệu. Tài liệu cộng đồng phải được quản trị viên kiểm tra và duyệt trước khi công khai.

## Hiện trạng sau các thay đổi Phase 4

- Giao diện thư viện đọc metadata từ các bảng `categories` và `document` trên Supabase. Các route `/courses` và `/topics` được giữ nguyên.
- Thành viên có thể gửi PDF tối đa 10 MB và theo dõi trạng thái. Quản trị viên duyệt hoặc từ chối, xử lý báo cáo và có thể ẩn tài liệu. API Node `/api/documents` cũ vẫn đóng và dữ liệu cũ không tự chuyển sang thư viện.
- Góp ý dùng email cấu hình `VITE_CONTRIBUTION_EMAIL` nếu có; nếu chưa cấu hình, trang thông báo kênh đang được cập nhật.
- Danh mục tìm kiếm không dấu, lọc, sắp xếp và phân trang ở phía dữ liệu. Trang chi tiết yêu cầu đăng nhập; tài liệu xuất bản có thể được xem hoặc tải qua bucket riêng tư bằng URL có thời hạn.
- Tài liệu nháp không được truy cập qua Data API công khai; quyền Storage chỉ cho phép tài khoản đăng nhập đọc file của tài liệu đã xuất bản. Danh sách đã lưu gắn với tài khoản và đồng bộ giữa thiết bị.
- Danh sách cũ trên trình duyệt được chuyển một lần sang tài khoản đăng nhập đầu tiên; chỉ chuyển các ID còn thuộc tài liệu đã xuất bản. Nếu có lỗi, danh sách cũ được giữ để thử lại và không tự chuyển sang tài khoản khác.
- Dữ liệu cũ vẫn được giữ, nhưng bucket chưa có file tương ứng khi kiểm tra Phase 2. Trang chi tiết sẽ báo file chưa sẵn sàng cho đến khi file thật được tải lên.
- File cộng đồng chưa được quét mã độc tự động; quản trị viên phải kiểm tra nguồn, quyền chia sẻ và quét file trước khi duyệt. Giới hạn MIME, dung lượng và kiểm tra chữ ký PDF ở giao diện không xác nhận file an toàn. Chưa có hạn mức chống spam theo tài khoản.

## Những việc cần hoàn tất khi đưa nội dung lên

Schema hiện có đã được kiểm tra qua session pooler; migration Phase 2 bổ sung trạng thái xuất bản, metadata chi tiết, bucket riêng tư và chính sách truy cập. Repo vẫn chưa có migration khởi tạo các bảng `categories` và `document` vốn có. Khi tạo dự án Supabase mới, cần chuẩn bị schema nền tương ứng trước khi chạy migration.

Xem [hướng dẫn xuất bản](./HuongDanXuatBan.md) để thêm file và metadata có quyền chia sẻ, cấu hình URL khôi phục mật khẩu và kiểm tra luồng thật. Cần cấu hình `VITE_CONTRIBUTION_EMAIL` để mở kênh góp ý qua email.

## Phân kỳ

1. Thống nhất nguồn thư viện, dừng luồng đóng góp cũ, làm rõ tình trạng dữ liệu và hướng dẫn vận hành.
2. Hoàn thiện danh mục, chi tiết, xác thực và quyền đọc/tải tài liệu.
3. Đồng bộ tài liệu đã lưu, hoàn thiện góp ý, trải nghiệm và kiểm tra phát hành.
4. Mở cộng đồng gửi tài liệu và quy trình quản trị viên duyệt trước khi công khai.

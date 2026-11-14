# Phạm vi sản phẩm LearnSpace

Cập nhật: 11/11/2026. Tài liệu này thay thế phạm vi frontend tĩnh trước đây.

## Mục tiêu

LearnSpace là thư viện tài liệu lập trình miễn phí. Giai đoạn đầu, chủ website chọn lọc và xuất bản tài liệu qua Supabase Dashboard. Khách được khám phá danh mục; trải nghiệm dự kiến yêu cầu đăng nhập để mở chi tiết, đọc và tải. Cộng đồng đóng góp tài liệu sẽ được mở ở giai đoạn sau, với bước duyệt trước khi công khai.

## Hiện trạng sau các thay đổi Phase 2

- Giao diện thư viện đọc metadata từ các bảng `categories` và `document` trên Supabase. Các route `/courses` và `/topics` được giữ nguyên.
- Biểu mẫu và danh sách tài liệu cộng đồng đã ẩn; API Node `/api/documents` trả 410 và không xóa các file đã lưu cũ. Không tự chuyển các file đó sang thư viện.
- Góp ý dùng email cấu hình `VITE_CONTRIBUTION_EMAIL` nếu có; nếu chưa cấu hình, trang thông báo kênh đang được cập nhật.
- Danh mục tìm kiếm không dấu, lọc, sắp xếp và phân trang ở phía dữ liệu. Trang chi tiết yêu cầu đăng nhập; tài liệu xuất bản có thể được xem hoặc tải qua bucket riêng tư bằng URL có thời hạn.
- Tài liệu nháp không được truy cập qua Data API công khai; quyền Storage chỉ cho phép tài khoản đăng nhập đọc file của tài liệu đã xuất bản. Danh sách đã lưu vẫn ở trình duyệt và chưa đồng bộ thiết bị.
- Dữ liệu cũ vẫn được giữ, nhưng bucket chưa có file tương ứng khi kiểm tra Phase 2. Trang chi tiết sẽ báo file chưa sẵn sàng cho đến khi file thật được tải lên.

## Những việc cần hoàn tất khi đưa nội dung lên

Schema hiện có đã được kiểm tra qua session pooler; migration Phase 2 bổ sung trạng thái xuất bản, metadata chi tiết, bucket riêng tư và chính sách truy cập. Repo vẫn chưa có migration khởi tạo các bảng `categories` và `document` vốn có. Khi tạo dự án Supabase mới, cần chuẩn bị schema nền tương ứng trước khi chạy migration.

Xem [hướng dẫn xuất bản](./HuongDanXuatBan.md) để thêm file và metadata có quyền chia sẻ, cấu hình URL khôi phục mật khẩu và kiểm tra luồng thật. Lưu đồng bộ theo tài khoản thuộc Phase 3.

## Phân kỳ

1. Thống nhất nguồn thư viện, dừng luồng đóng góp cũ, làm rõ tình trạng dữ liệu và hướng dẫn vận hành.
2. Hoàn thiện danh mục, chi tiết, xác thực và quyền đọc/tải tài liệu.
3. Đồng bộ tài liệu đã lưu, hoàn thiện góp ý, trải nghiệm và kiểm tra phát hành.
4. Mở cộng đồng gửi tài liệu và quy trình quản trị viên duyệt trước khi công khai.

# Phạm vi sản phẩm LearnSpace

Cập nhật: 11/11/2026. Tài liệu này thay thế phạm vi frontend tĩnh trước đây.

## Mục tiêu

LearnSpace là thư viện tài liệu lập trình miễn phí. Giai đoạn đầu, chủ website chọn lọc và xuất bản tài liệu qua Supabase Dashboard. Khách được khám phá danh mục; trải nghiệm dự kiến yêu cầu đăng nhập để mở chi tiết, đọc và tải. Cộng đồng đóng góp tài liệu sẽ được mở ở giai đoạn sau, với bước duyệt trước khi công khai.

## Hiện trạng sau các thay đổi Phase 1

- Giao diện thư viện đọc metadata từ các bảng `categories` và `document` trên Supabase. Các route `/courses` và `/topics` được giữ nguyên.
- Biểu mẫu và danh sách tài liệu cộng đồng đã ẩn; API Node `/api/documents` trả 410 và không xóa các file đã lưu cũ. Không tự chuyển các file đó sang thư viện.
- Góp ý dùng email cấu hình `VITE_CONTRIBUTION_EMAIL` nếu có; nếu chưa cấu hình, trang thông báo kênh đang được cập nhật.
- Danh sách đã lưu vẫn ở trình duyệt. Trang chi tiết hiện chưa có đọc/tải, và yêu cầu đăng nhập cùng kiểm soát truy cập file chưa được triển khai. Không coi việc ẩn giao diện là bảo vệ dữ liệu.

## Những việc cần xác minh trước khi xuất bản thật

Lần kiểm tra chỉ dùng quyền đọc công khai: thấy `categories` và `document`, trong đó `document` có `file_path`; không có quyền kiểm tra đầy đủ schema, RLS, bucket, dữ liệu bản nháp hoặc cấu hình deploy. Repo không chứa migration tạo hai bảng này. Vì vậy chưa thể khẳng định quyền, nội dung, bản nháp hoặc file đang được bảo vệ đúng; chưa thay đổi schema hay dữ liệu từ xa.

Xem [hướng dẫn xuất bản](./HuongDanXuatBan.md) để kiểm kê cấu hình và các bước hoàn thiện trước khi đưa tài liệu thật lên. Quyền đọc/tải theo tài khoản, lưu đồng bộ, trang chi tiết đầy đủ và quy trình xuất bản hoàn chỉnh thuộc các phase tiếp theo.

## Phân kỳ

1. Thống nhất nguồn thư viện, dừng luồng đóng góp cũ, làm rõ tình trạng dữ liệu và hướng dẫn vận hành.
2. Hoàn thiện danh mục, chi tiết, xác thực và quyền đọc/tải tài liệu.
3. Đồng bộ tài liệu đã lưu, hoàn thiện góp ý, trải nghiệm và kiểm tra phát hành.
4. Mở cộng đồng gửi tài liệu và quy trình quản trị viên duyệt trước khi công khai.

# Xuất bản tài liệu qua Supabase Dashboard

LearnSpace dùng bảng `categories`, `document` và bucket riêng tư `documents`. Khách xem danh mục tài liệu đã xuất bản; tài khoản đăng nhập mới có thể yêu cầu đường dẫn đọc/tải ngắn hạn. Các đường dẫn này có hiệu lực tối đa 5 phút và có thể tiếp tục hoạt động đến khi hết hạn sau khi một tài liệu bị gỡ.

## Thêm tài liệu

1. Chuẩn bị file có quyền chia sẻ, tác giả, nguồn và điều kiện sử dụng. Trong Storage, tải file vào bucket `documents`; ghi lại chính xác đường dẫn tương đối trong bucket, ví dụ `react/react-co-ban.pdf`.
2. Trong Table Editor → `categories`, chọn chủ đề có sẵn hoặc tạo chủ đề mới với tên, slug duy nhất và mô tả.
3. Trong bảng `document`, thêm dòng với `category_id`, `title`, `slug` duy nhất, `description`, `file_path` (đúng đường dẫn đã tải), `file_type` (ví dụ `pdf`) và `thumbnail_url` nếu có. Điền `author`, `source`, `usage_note` và `updated_at` khi có thông tin.
4. Giữ `is_published = false` trong lúc chuẩn bị. Kiểm tra file, metadata và quyền sử dụng; chuyển `is_published` sang `true` để xuất bản. Tài liệu nháp không xuất hiện trong thư viện hoặc Data API công khai.
5. Kiểm tra từ website: khách thấy card trong thư viện; sau khi đăng nhập có thể mở chi tiết, xem PDF và tải file. Kiểm tra cả liên kết mở riêng nếu trình xem nhúng không hoạt động.

File cần được tải lên bằng Supabase Dashboard hoặc Storage API; không chèn trực tiếp metadata vào `storage.objects`. Để gỡ tài liệu, chuyển `is_published` sang `false`. File vẫn nằm trong bucket, có thể quản lý trong Dashboard. Khi sửa nội dung, cập nhật `updated_at` theo thời điểm sửa.

## Dữ liệu cũ

Các bản ghi cũ vẫn được giữ ở trạng thái xuất bản để không thay đổi danh mục hiện có. Khi triển khai Phase 2, bucket `documents` chưa có file; các đường dẫn cũ là metadata, vì vậy trang chi tiết báo file chưa sẵn sàng. Bạn cần cung cấp file thực sự có quyền chia sẻ và tải vào đúng đường dẫn, hoặc cập nhật `file_path` tương ứng. Không tự động xuất bản các file trong `docs/` hoặc file nhận từ biểu mẫu cộng đồng cũ.

Các file từng được lưu bởi API cộng đồng cũ vẫn ở máy chủ Node cũ. Nếu cần giữ, sao lưu và kiểm tra nội dung, nguồn, quyền chia sẻ và thông tin cá nhân trước khi quyết định chuyển thủ công.

## Kiểm tra cấu hình

- Cấu hình Supabase Auth cho phép URL `/auth/reset-password` trên từng origin trong Authentication → URL Configuration; kiểm tra mẫu email và luồng khôi phục bằng tài khoản thử.
- Chỉ dùng publishable key trên frontend; không đưa mật khẩu database hoặc service role key vào frontend hay Git.
- Với SQL test, chạy `supabase/tests/library_phase2.sql` trên môi trường phù hợp; các bản ghi kiểm thử được hoàn tác. Kiểm tra `supabase migration list` và `supabase db advisors` sau khi áp dụng migration.
- Đường dẫn có chữ ký là bí mật tạm thời: không lưu công khai trong metadata hay chia sẻ ngoài người dùng được phép.

Xem thêm [quyền truy cập Storage](https://supabase.com/docs/guides/storage/security/access-control) và [Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security).

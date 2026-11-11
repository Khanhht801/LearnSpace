# Kiểm kê và chuẩn bị xuất bản tài liệu

LearnSpace dự kiến dùng Supabase Dashboard để quản lý nội dung. Tài liệu này mô tả hiện trạng và các bước kiểm tra; **chưa phải quy trình xuất bản file hoàn chỉnh**. Trang chi tiết chưa đọc/tải file, và chính sách bảo vệ file chưa được xác minh.

## Kiểm tra dự án hiện tại

1. Mở đúng dự án Supabase trong Dashboard. Trong Table Editor, kiểm tra `categories` và `document`, các cột, liên kết giữa bảng và nội dung đã có. Giao diện hiện đọc `categories` (`id`, `name`, `slug`, `description`) và `document` (`id`, `category_id`, `title`, `slug`, `description`, `thumbnail_url`, `file_type`, `created_at`).
2. Kiểm tra `file_path`, bucket tương ứng và các file hiện có trong Storage. Không đặt tài liệu cần đăng nhập trong bucket công khai hoặc dùng URL công khai như biện pháp bảo vệ.
3. Kiểm tra RLS, quyền Data API và chính sách Storage bằng tài khoản khách và tài khoản thử; xác nhận bản nháp không lộ qua API và khách không truy cập được file. RLS, quyền bảng và quyền Storage cần được kiểm tra riêng.
4. Xác định dữ liệu cũ cần giữ, quyền sử dụng từng tài liệu và cách nhận biết tài liệu được xuất bản. Chưa có bằng chứng trong repo rằng bảng `document` có trạng thái xuất bản; không đưa bản nháp vào bảng đang được đọc công khai.
5. Kiểm tra môi trường deploy và biến trong README. Không đưa secret hoặc service role key vào frontend.

## Chuẩn bị một tài liệu

- Chọn file có quyền chia sẻ; ghi lại tiêu đề, mô tả, chủ đề, định dạng, tác giả/nguồn, quyền sử dụng và ngày cập nhật.
- Sau khi schema, trạng thái xuất bản, bucket và quyền được xác nhận và triển khai, thêm metadata và file qua Dashboard theo cấu hình thực tế; kiểm tra hiển thị, đăng nhập, đọc/tải và truy cập trái phép trước khi công bố.
- Những trường nguồn, quyền sử dụng, trạng thái xuất bản và luồng file chưa được xác nhận là đã tồn tại hoặc được giao diện hỗ trợ. Không giả định việc điền chúng trong Dashboard đã làm chúng hiển thị trên website.

## Dữ liệu từ biểu mẫu cũ

API cộng đồng cũ đã đóng; file từng lưu trên máy chủ Node vẫn giữ nguyên tại nơi triển khai cũ. Nếu cần giữ lại, sao lưu và kiểm tra nội dung, nguồn, quyền chia sẻ và thông tin cá nhân trước khi quyết định chuyển thủ công. Không tự động đưa các file này lên Supabase hoặc công khai lại.

Tham khảo [quyền truy cập Storage](https://supabase.com/docs/guides/storage/security/access-control) và [Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security) của Supabase khi cấu hình.

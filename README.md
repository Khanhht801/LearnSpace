# React + Vite

Đọc [phạm vi hiện tại](docs/PhanTichNghiepVu.md) và [hướng dẫn kiểm kê, chuẩn bị xuất bản](docs/HuongDanXuatBan.md) trước khi đăng tài liệu. Quyền truy cập file và quy trình xuất bản đầy đủ chưa được xác minh.

## Deploy LearnSpace trên Vercel

- Build command: `npm run build`; Output directory: `dist`.
- Trong Project Settings → Environment Variables, đặt `VITE_SUPABASE_URL` và `VITE_SUPABASE_PUBLISHABLE_KEY` cho môi trường Production (và Preview nếu sử dụng). Lấy giá trị tương ứng từ dự án Supabase; xem tên biến trong `.env.example`.
- Các biến `VITE_*` được đóng gói vào JavaScript lúc build. Sau khi thêm/sửa biến, phải Redeploy để áp dụng. File `.env` trên máy không được push lên GitHub.
- Đặt `VITE_CONTRIBUTION_EMAIL` thành địa chỉ tiếp nhận góp ý thật. Nếu chưa cấu hình, website hiển thị thông báo kênh đang được cập nhật, không giả vờ đã nhận góp ý.
- Chỉ dùng publishable key ở frontend; không đưa `DATABASE_URL`, service role hoặc secret key vào biến `VITE_*`.
- `vercel.json` hỗ trợ mở trực tiếp và tải lại các route React. API cộng đồng `/api/documents` đã đóng trên server Node.js; dữ liệu file cũ không bị xóa. API `/api/feedback` chỉ có trên server Node.js, chưa phải Vercel Function và không còn được giao diện sử dụng. Giao diện góp ý hiển thị email `VITE_CONTRIBUTION_EMAIL` nếu được cấu hình khi build.

Nếu trang trắng và console báo `supabaseUrl is required`, bản build đang thiếu biến Supabase. Ứng dụng hiện hiển thị thông báo cấu hình khi gặp trường hợp này.

### Xác nhận email đăng ký

- Triển khai phiên bản có route `/auth/confirm` trước khi thay mẫu email, để các liên kết mới không dẫn đến trang chưa tồn tại.
- Trong Supabase Dashboard, mở **Authentication → Email Templates → Confirm signup**, thay nội dung bằng file `supabase/templates/confirm-signup.html` và lưu. Đặt **Site URL** thành địa chỉ công khai của LearnSpace (hoặc địa chỉ tương ứng với môi trường). Mẫu này sử dụng `{{ .SiteURL }}` nên tất cả email sẽ dẫn về Site URL đó.
- Người dùng mở link trong email rồi bấm **Xác nhận email**; chỉ lúc đó ứng dụng mới gửi mã đến Supabase. Các email cũ vẫn dùng luồng cũ. Kiểm tra bằng một tài khoản thử và email thật sau khi cập nhật; mã xác nhận vẫn chỉ dùng được một lần.

### Khôi phục mật khẩu

- Trong Authentication → URL Configuration của Supabase, cho phép URL `/auth/reset-password` trên từng origin sử dụng. Kiểm tra Site URL và mẫu email khôi phục của dự án trước khi phát hành.
- Thử toàn bộ luồng với một tài khoản thử và hộp thư thật; ứng dụng gửi yêu cầu đặt lại và cập nhật mật khẩu qua Supabase Auth.

### Tài liệu đã lưu

- Đăng nhập để lưu tài liệu theo tài khoản và đồng bộ giữa các thiết bị. Danh sách cũ trong `localStorage` được nhập một lần vào tài khoản đầu tiên đăng nhập trên trình duyệt; chỉ nhập tài liệu còn được xuất bản.
- Khi việc nhập thất bại, website giữ dữ liệu cũ, gắn lần nhập với cùng tài khoản và cho phép thử lại. Danh sách không khả dụng khi mạng lỗi sẽ hiển thị thông báo thay vì giả vờ trống.

### Đóng góp cộng đồng

- Người dùng đăng nhập gửi PDF qua `/contribute` và xem trạng thái tại `/my-contributions`. Chỉ tài liệu được duyệt mới xuất hiện trong thư viện.
- Quản trị viên dùng `/moderation` để duyệt, từ chối và xử lý báo cáo. Quy trình kiểm tra nguồn, bản quyền, quét file thủ công và các giới hạn hiện tại được mô tả trong [hướng dẫn xuất bản](docs/HuongDanXuatBan.md).

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.

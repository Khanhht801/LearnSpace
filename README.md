# React + Vite

## Deploy LearnSpace trên Vercel

- Build command: `npm run build`; Output directory: `dist`.
- Trong Project Settings → Environment Variables, đặt `VITE_SUPABASE_URL` và `VITE_SUPABASE_PUBLISHABLE_KEY` cho môi trường Production (và Preview nếu sử dụng). Lấy giá trị tương ứng từ dự án Supabase; xem tên biến trong `.env.example`.
- Các biến `VITE_*` được đóng gói vào JavaScript lúc build. Sau khi thêm/sửa biến, phải Redeploy để áp dụng. File `.env` trên máy không được push lên GitHub.
- Chỉ dùng publishable key ở frontend; không đưa `DATABASE_URL`, service role hoặc secret key vào biến `VITE_*`.
- `vercel.json` hỗ trợ mở trực tiếp và tải lại các route React. Các API `/api/documents` và `/api/feedback` hiện chạy bằng server Node.js riêng (`npm start`), chưa phải Vercel Functions; deploy frontend trên Vercel chưa cung cấp các API này.

Nếu trang trắng và console báo `supabaseUrl is required`, bản build đang thiếu biến Supabase. Ứng dụng hiện hiển thị thông báo cấu hình khi gặp trường hợp này.

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.

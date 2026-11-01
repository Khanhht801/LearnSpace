# Hướng dẫn tạo ReactJS và thiết lập React Router từ số 0

Sau khi hoàn thành hướng dẫn này, bạn sẽ có một ứng dụng React gồm ba trang:

```text
/          → Trang chủ
/about     → Giới thiệu
URL khác   → Trang 404
```

> Trong tài liệu này, “tạo ReactJS” nghĩa là tạo ứng dụng React bằng **Vite**. Vite là công cụ khởi tạo và chạy dự án; React là thư viện xây dựng giao diện.

## Bước 1: kiểm tra Node.js và npm

Mở Terminal, PowerShell hoặc Command Prompt:

```bash
node --version
npm --version
```

Nếu hai lệnh đều in ra phiên bản, chuyển sang bước 2. Nếu lệnh không tồn tại, cài bản Node.js LTS phù hợp với yêu cầu hiện tại của Vite rồi mở lại terminal. Không nên tiếp tục nếu `node` hoặc `npm` chưa hoạt động.

## Bước 2: tạo project React bằng Vite

Chạy các lệnh sau tại thư mục bạn muốn chứa project:

```bash
npm create vite@latest react-router-practice -- --template react
cd react-router-practice
npm install
```

Ý nghĩa:

- `react-router-practice` là tên thư mục project; có thể đổi tên.
- `--template react` chọn React dùng JavaScript, không phải TypeScript.
- `npm install` cài các package được khai báo trong `package.json`.

Chạy thử project ban đầu:

```bash
npm run dev
```

Terminal sẽ in một địa chỉ, thường là `http://localhost:5173`. Mở địa chỉ đó trong trình duyệt. Giữ terminal đang chạy; nhấn `Ctrl + C` khi muốn dừng server.

## Bước 3: cài React Router

Trong thư mục `react-router-practice`, chạy:

```bash
npm install react-router-dom@7
```

Kiểm tra package đã được ghi vào project:

```bash
npm list react-router-dom
```

Tài liệu này cố định major version 7 để tránh trộn lẫn cú pháp cũ như `Switch`, `Redirect` hoặc `useHistory`. Toàn bộ ví dụ import từ `react-router-dom`.

## Bước 4: tạo các trang

Trong `src`, tạo thư mục `pages` và ba file sau.

**File `src/pages/Home.jsx`:**

```jsx
export default function Home() {
  return <h1>Trang chủ</h1>;
}
```

**File `src/pages/About.jsx`:**

```jsx
export default function About() {
  return <h1>Giới thiệu</h1>;
}
```

**File `src/pages/NotFound.jsx`:**

```jsx
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section>
      <h1>404 — Không tìm thấy trang</h1>
      <Link to="/">Quay về trang chủ</Link>
    </section>
  );
}
```

## Bước 5: bọc ứng dụng bằng `BrowserRouter`

Thay nội dung `src/main.jsx` bằng:

```jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
```

`BrowserRouter` kết nối ứng dụng với URL và lịch sử của trình duyệt. Chỉ bọc một lần ở đây; không bọc thêm trong `App.jsx`.

## Bước 6: khai báo các route

Thay nội dung `src/App.jsx` bằng:

```jsx
import { Link, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  return (
    <div>
      <nav>
        <Link to="/">Trang chủ</Link>{' | '}
        <Link to="/about">Giới thiệu</Link>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}
```

Đọc cấu hình theo cách sau:

| Thành phần | Vai trò |
| ---------- | ------- |
| `BrowserRouter` | Cung cấp môi trường routing cho ứng dụng |
| `Routes` | Tìm nhánh route phù hợp với URL hiện tại |
| `Route` | Ánh xạ một `path` tới giao diện trong `element` |
| `Link` | Chuyển URL nội bộ mà không tải lại toàn bộ trang |
| `path="*"` | Khớp các URL chưa được khai báo để hiển thị trang 404 |

## Bước 7: chạy và tự kiểm tra

Nếu server chưa chạy:

```bash
npm run dev
```

Kiểm tra lần lượt:

1. Mở `/` và xác nhận thấy “Trang chủ”.
2. Bấm “Giới thiệu” và xác nhận URL đổi thành `/about`.
3. Dùng nút Back và Forward của trình duyệt.
4. Gõ một URL không tồn tại, ví dụ `/abc`, và xác nhận thấy trang 404.
5. Tải lại trang tại `/about` trong môi trường local và xác nhận ứng dụng vẫn chạy.

## Cấu trúc project sau khi hoàn thành

```text
react-router-practice/
├── src/
│   ├── pages/
│   │   ├── About.jsx
│   │   ├── Home.jsx
│   │   └── NotFound.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

## Lỗi thường gặp

- **`npm` không được nhận diện:** cài Node.js rồi mở lại terminal.
- **`Failed to resolve import "react-router-dom"`:** chạy `npm install react-router-dom@7` đúng trong thư mục có `package.json`.
- **`useLocation() may be used only in the context of a Router`:** component đang nằm ngoài `BrowserRouter`; kiểm tra lại `main.jsx`.
- **Trang trắng sau khi sửa file:** xem lỗi đầu tiên trong terminal và Console của trình duyệt; thường là sai đường dẫn import hoặc sai tên file.
- **Dùng thẻ `<a href="/about">`:** trình duyệt tải lại tài liệu. Với liên kết nội bộ của SPA, dùng `<Link to="/about">`.

## Học tiếp

Sau khi hoàn thành phần setup, tiếp tục với [Buổi 5: React Router — Điều hướng trong ứng dụng React](./05-react-router-revised.md) để học route lồng nhau, URL params, query string, điều hướng bằng code, guard, 404 và triển khai.

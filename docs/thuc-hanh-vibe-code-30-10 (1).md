# Hướng dẫn tạo ReactJS và thiết lập React Router từ số 0

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

## Thực hành tổng hợp: nâng cấp thành ứng dụng khóa học mini

Phần trên giúp bạn thiết lập Router thành công. Trong phần thực hành này, bạn sẽ tiếp tục nâng cấp **chính project `react-router-practice`** để ôn lại kiến thức từ Buổi 1 đến Buổi 5:

- Component, props và JSX.
- Render danh sách với `map` và `key`.
- Render có điều kiện.
- State, sự kiện và controlled form.
- Lifting state up và cập nhật mảng bất biến.
- `useEffect` để đồng bộ dữ liệu với `localStorage`.
- `Link`, route động, `useParams` và trang 404.

Sau khi hoàn thành, ứng dụng có các URL:

```text
/                    → Trang chủ
/about               → Giới thiệu
/courses             → Danh sách và tìm kiếm khóa học
/courses/:courseId   → Chi tiết một khóa học
/contact             → Form liên hệ
URL khác             → Trang 404
```

> Nên làm lần lượt từng bước. Sau mỗi bước, lưu file và kiểm tra trình duyệt trước khi đi tiếp.

### Bước thực hành 1: tạo dữ liệu khóa học

Tạo thư mục `src/data`, sau đó tạo file `src/data/courses.js`:

```js
const courses = [
  {
    id: 1,
    title: 'React cơ bản',
    level: 'Cơ bản',
    duration: 12,
    description: 'Component, JSX, props và state trong React.',
  },
  {
    id: 2,
    title: 'React Router',
    level: 'Trung bình',
    duration: 8,
    description: 'Điều hướng và tổ chức nhiều màn hình trong SPA.',
  },
  {
    id: 3,
    title: 'Làm việc với API',
    level: 'Trung bình',
    duration: 10,
    description: 'Dùng useEffect để lấy và quản lý dữ liệu từ API.',
  },
];

export default courses;
```

Ở bước này, mỗi phần tử có một `id` riêng. Sau đó `id` sẽ được dùng làm `key` khi render danh sách và làm tham số trên URL.

### Bước thực hành 2: tạo `CourseCard` để ôn component và props

Tạo thư mục `src/components`, sau đó tạo file `src/components/CourseCard.jsx`:

```jsx
import { Link } from 'react-router-dom';

export default function CourseCard({ course, isFavorite, onToggleFavorite }) {
  return (
    <article>
      <h2>{course.title}</h2>
      <p>
        {course.level} · {course.duration} giờ
      </p>
      <p>{course.description}</p>

      <Link to={`/courses/${course.id}`}>Xem chi tiết</Link>{' '}
      <button type="button" onClick={() => onToggleFavorite(course.id)}>
        {isFavorite ? 'Bỏ yêu thích' : 'Thêm yêu thích'}
      </button>
    </article>
  );
}
```

Đoạn code này ôn lại ba ý:

1. `course`, `isFavorite` và `onToggleFavorite` là props do component cha truyền xuống.
2. Nội dung nút được render có điều kiện bằng toán tử ba ngôi.
3. Arrow function trong `onClick` giúp chỉ gọi hàm khi người dùng bấm nút.

### Bước thực hành 3: tạo trang danh sách và ô tìm kiếm

Tạo file `src/pages/Courses.jsx`:

```jsx
import { useState } from 'react';
import CourseCard from '../components/CourseCard.jsx';
import courses from '../data/courses.js';

export default function Courses({ favoriteIds, onToggleFavorite }) {
  const [keyword, setKeyword] = useState('');

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(keyword.trim().toLowerCase()),
  );

  return (
    <section>
      <h1>Danh sách khóa học</h1>

      <label htmlFor="course-search">Tìm khóa học: </label>
      <input
        id="course-search"
        type="search"
        value={keyword}
        onChange={(event) => setKeyword(event.target.value)}
        placeholder="Ví dụ: React"
      />

      <p>Tìm thấy {filteredCourses.length} khóa học.</p>

      {filteredCourses.length > 0 ? (
        filteredCourses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            isFavorite={favoriteIds.includes(course.id)}
            onToggleFavorite={onToggleFavorite}
          />
        ))
      ) : (
        <p>Không có khóa học phù hợp.</p>
      )}
    </section>
  );
}
```

Tự kiểm tra bước 3:

1. `input` có cả `value` và `onChange`, vì vậy đây là controlled input.
2. `filter` tạo mảng mới và không sửa mảng `courses` ban đầu.
3. `map` chuyển từng object thành một `CourseCard`.
4. `key={course.id}` giúp React nhận diện ổn định từng phần tử.
5. Khi kết quả rỗng, giao diện hiển thị thông báo thay vì danh sách.

### Bước thực hành 4: tạo route động cho trang chi tiết

Tạo file `src/pages/CourseDetail.jsx`:

```jsx
import { Link, useParams } from 'react-router-dom';
import courses from '../data/courses.js';

export default function CourseDetail({ favoriteIds, onToggleFavorite }) {
  const { courseId } = useParams();
  const course = courses.find((item) => item.id === Number(courseId));

  if (!course) {
    return (
      <section>
        <h1>Không tìm thấy khóa học</h1>
        <Link to="/courses">Quay lại danh sách</Link>
      </section>
    );
  }

  const isFavorite = favoriteIds.includes(course.id);

  return (
    <article>
      <h1>{course.title}</h1>
      <p>Cấp độ: {course.level}</p>
      <p>Thời lượng: {course.duration} giờ</p>
      <p>{course.description}</p>

      <button type="button" onClick={() => onToggleFavorite(course.id)}>
        {isFavorite ? 'Bỏ yêu thích' : 'Thêm yêu thích'}
      </button>
      <p>
        <Link to="/courses">Quay lại danh sách</Link>
      </p>
    </article>
  );
}
```

Route động sẽ có dạng `/courses/:courseId`. Ví dụ khi URL là `/courses/2`, `useParams()` trả về `{ courseId: '2' }`.

Lưu ý `courseId` lấy từ URL luôn là chuỗi. Vì `id` trong dữ liệu là số, code phải dùng `Number(courseId)` trước khi so sánh.

### Bước thực hành 5: tạo controlled form có validation

Tạo file `src/pages/Contact.jsx`:

```jsx
import { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError('Vui lòng nhập đầy đủ thông tin.');
      setIsSubmitted(false);
      return;
    }

    setError('');
    setIsSubmitted(true);
    setForm({ name: '', email: '', message: '' });
  }

  return (
    <section>
      <h1>Liên hệ</h1>

      {error && <p role="alert">{error}</p>}
      {isSubmitted && <p>Đã gửi thông tin thành công.</p>}

      <form onSubmit={handleSubmit}>
        <p>
          <label htmlFor="name">Họ tên</label><br />
          <input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </p>

        <p>
          <label htmlFor="email">Email</label><br />
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
          />
        </p>

        <p>
          <label htmlFor="message">Nội dung</label><br />
          <textarea
            id="message"
            name="message"
            value={form.message}
            onChange={handleChange}
          />
        </p>

        <button type="submit">Gửi</button>
      </form>
    </section>
  );
}
```

Sau khi viết xong, thử bấm “Gửi” khi các ô còn trống, rồi thử lại khi đã nhập đủ dữ liệu. Quan sát cách state quyết định thông báo nào được hiển thị.

### Bước thực hành 6: đưa state yêu thích lên `App`

Trang danh sách và trang chi tiết cùng cần đọc, sửa danh sách yêu thích. Vì vậy state phải nằm ở component cha chung là `App`. Đây chính là **lifting state up**.

Thay toàn bộ `src/App.jsx` bằng:

```jsx
import { useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import CourseDetail from './pages/CourseDetail.jsx';
import Courses from './pages/Courses.jsx';
import Home from './pages/Home.jsx';
import NotFound from './pages/NotFound.jsx';

function getInitialFavoriteIds() {
  const savedValue = localStorage.getItem('favoriteCourseIds');

  if (!savedValue) {
    return [];
  }

  try {
    const parsedValue = JSON.parse(savedValue);
    return Array.isArray(parsedValue) ? parsedValue : [];
  } catch {
    return [];
  }
}

export default function App() {
  const [favoriteIds, setFavoriteIds] = useState(getInitialFavoriteIds);

  useEffect(() => {
    localStorage.setItem('favoriteCourseIds', JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  function handleToggleFavorite(courseId) {
    setFavoriteIds((currentIds) =>
      currentIds.includes(courseId)
        ? currentIds.filter((id) => id !== courseId)
        : [...currentIds, courseId],
    );
  }

  return (
    <div>
      <header>
        <nav>
          <Link to="/">Trang chủ</Link>{' | '}
          <Link to="/about">Giới thiệu</Link>{' | '}
          <Link to="/courses">Khóa học</Link>{' | '}
          <Link to="/contact">Liên hệ</Link>
        </nav>
        <p>Số khóa học yêu thích: {favoriteIds.length}</p>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/courses"
            element={
              <Courses
                favoriteIds={favoriteIds}
                onToggleFavorite={handleToggleFavorite}
              />
            }
          />
          <Route
            path="/courses/:courseId"
            element={
              <CourseDetail
                favoriteIds={favoriteIds}
                onToggleFavorite={handleToggleFavorite}
              />
            }
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}
```

Luồng dữ liệu ở bước này:

```text
App giữ favoriteIds
├── truyền favoriteIds + handleToggleFavorite → Courses
│   └── Courses truyền tiếp → CourseCard
└── truyền favoriteIds + handleToggleFavorite → CourseDetail
```

Khi người dùng bấm nút yêu thích:

1. Component con gọi `onToggleFavorite(course.id)`.
2. Hàm trong `App` tạo một mảng state mới.
3. `App` và các component con render lại.
4. `useEffect` chạy vì `favoriteIds` thay đổi và lưu mảng mới vào `localStorage`.

Không gọi `localStorage.setItem` trực tiếp trong phần thân component vì render cần giữ tính thuần khiết. Việc đồng bộ với hệ thống bên ngoài được đặt trong `useEffect`.

### Bước thực hành 7: chạy và kiểm tra toàn bộ luồng

Chạy project nếu server đã dừng:

```bash
npm run dev
```

Kiểm tra lần lượt các ca sau:

1. Mở `/courses` và xác nhận có ba khóa học.
2. Gõ `router` vào ô tìm kiếm và xác nhận chỉ còn một kết quả.
3. Xóa từ khóa và bấm “Xem chi tiết” ở một khóa học.
4. Xác nhận URL có dạng `/courses/1`, `/courses/2` hoặc `/courses/3`.
5. Mở `/courses/999` và xác nhận thấy “Không tìm thấy khóa học”.
6. Thêm một khóa học vào yêu thích, sau đó chuyển sang trang chi tiết của khóa học đó.
7. Xác nhận trạng thái yêu thích giống nhau ở cả danh sách và trang chi tiết.
8. Tải lại trình duyệt và xác nhận số khóa học yêu thích không bị mất.
9. Mở `/contact`, thử submit form trống rồi submit form hợp lệ.
10. Dùng Back và Forward để kiểm tra lịch sử điều hướng.
11. Gõ `/duong-dan-khong-ton-tai` và xác nhận trang 404 xuất hiện.

### Bước thực hành 8: tự làm thêm, không xem lời giải trước

Sau khi phiên bản trên hoạt động, tự chọn một hoặc nhiều yêu cầu:

1. Thêm thuộc tính `teacher` cho mỗi khóa học và hiển thị ở cả hai trang.
2. Thêm bộ lọc cấp độ bằng thẻ `<select>` controlled.
3. Thêm nút “Xóa từ khóa” và chỉ hiển thị nút khi ô tìm kiếm không rỗng.
4. Tạo trang `/favorites` chỉ hiển thị các khóa học đã yêu thích.
5. Đổi menu từ `Link` sang `NavLink` và tạo kiểu riêng cho liên kết đang active.
6. Cập nhật `document.title` theo từng trang bằng `useEffect`.

Mỗi lần hoàn thành một yêu cầu, hãy kiểm tra lại cả luồng cũ để chắc chắn thay đổi mới không làm hỏng chức năng đang có.

## Checklist sau phần thực hành

Bạn đã nắm phần này nếu có thể tự giải thích và thực hiện các việc sau:

- [ ] Tạo component và truyền dữ liệu bằng props.
- [ ] Render danh sách bằng `map` và chọn `key` ổn định.
- [ ] Dùng state để điều khiển input và giao diện.
- [ ] Xử lý `onClick`, `onChange`, `onSubmit` và `preventDefault`.
- [ ] Cập nhật mảng state mà không dùng `push` hoặc sửa trực tiếp state cũ.
- [ ] Đưa state lên component cha khi nhiều trang cùng cần sử dụng.
- [ ] Dùng `useEffect` để đồng bộ state với `localStorage`.
- [ ] Tạo route tĩnh, route động và route 404.
- [ ] Đọc tham số URL bằng `useParams`.
- [ ] Dùng `Link` để điều hướng mà không tải lại toàn bộ trang.

## Học tiếp

Sau khi hoàn thành phần setup và thực hành tổng hợp, tiếp tục với [Buổi 5: React Router — Điều hướng trong ứng dụng React](./05-react-router-revised.md) để học route lồng nhau, URL params, query string, điều hướng bằng code, guard, 404 và triển khai.

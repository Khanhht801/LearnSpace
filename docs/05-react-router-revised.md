# Buổi 5: React Router — Điều hướng trong ứng dụng React

> **Phạm vi:** JavaScript, React và **React Router v7 — Declarative Mode**. Các ví dụ dùng `react-router-dom@7` để thống nhất với giáo trình gốc; đây không phải khẳng định v7 là phiên bản mới nhất.
>
> **Cách học:** hiểu một khái niệm → đọc ví dụ → mở URL để kiểm chứng → làm bài tập. Ví dụ xuyên suốt là một Blog có danh sách, chi tiết bài viết và khu vực cần đăng nhập.
>
> **Ngày rà soát:** 23/10/2026. Bản này giữ lộ trình bốn tầng và các phần 0–9 của tài liệu gốc. Những sửa đổi kỹ thuật, bổ sung và nguồn đối chiếu được ghi riêng trong `05-react-router-review.md`.

## Trước khi bắt đầu

Bạn cần biết component, JSX, props, `useState`, xử lý sự kiện, form, `useEffect` và cách gọi API cơ bản. Chưa cần biết Context: trong bài này, thông tin người dùng được lưu ở `App` và truyền xuống bằng props.

**Sau bài học, bạn cần làm được:** cấu hình route; dùng layout chung; chuyển trang bằng liên kết hoặc code; đọc path params và query string; tạo luồng đăng nhập giả lập; phân biệt trang 404 của React với lỗi 404 từ server.

React Router có nhiều cách sử dụng. **Declarative Mode** ở đây là cách khai báo bằng `<BrowserRouter>`, `<Routes>` và `<Route>`. Data Mode và Framework Mode có thêm cơ chế tải dữ liệu, xử lý tác vụ và tổ chức ứng dụng; bài này không trộn các API đó vào ví dụ cơ bản. [S01]

## Lộ trình bốn tầng

| Tầng | Nội dung | Câu hỏi cần trả lời |
| --- | --- | --- |
| **1 — Nền tảng** | Phần 0–2 | URL nào hiển thị giao diện nào? |
| **2 — Điều hướng** | Phần 3–4 | Chuyển trang thế nào? Đọc dữ liệu từ URL ra sao? |
| **3 — Kiểm soát** | Phần 5–6 | Khi nào cho mở trang? Xử lý 403, 404 và triển khai thế nào? |
| **4 — Thực hành** | Phần 7–9 | Ghép thành Blog và tự kiểm tra được không? |


**Đi tới phần:** [0. Vì sao cần router](#phan-0) · [1. Cài đặt](#phan-1) · [2. Matching và layout](#phan-2) · [3. Điều hướng](#phan-3) · [4. Params và query](#phan-4) · [5. Guard](#phan-5) · [6. 404 và deploy](#phan-6) · [7. Dự án](#phan-7) · [8. Sửa lỗi](#phan-8) · [9. Bài tập](#phan-9).

Lần đọc đầu, tập trung phần 0–4 và làm bài 1–3. Sau đó học phần 5–6, ghép dự án phần 7; các mục ghi **phần mở rộng** có thể đọc sau.

**Quy ước ví dụ:** khối có tên file là nội dung file tương ứng. Khối ghi **“trích đoạn”** chỉ minh họa một ý, không phải ứng dụng độc lập. Phần 7 tập hợp mã nguồn hoàn chỉnh; không cần ghép tất cả ví dụ nhỏ ở phần trước vào cùng một `App.jsx`.

---

# Tầng 1 — Nền tảng

<a id="phan-0"></a>

## Phần 0: Tại sao cần React Router?

### 0.1. Bắt đầu từ một nhu cầu quen thuộc

Bạn đang làm Blog. Người dùng cần mở các địa chỉ sau:

```text
/           → Trang chủ
/posts      → Danh sách bài viết
/posts/12   → Chi tiết bài viết có ID là 12
/about      → Giới thiệu
```

Bạn có thể dùng `useState` để đổi phần nội dung đang hiển thị. Tuy nhiên, **chỉ đổi state không tự tạo ra địa chỉ riêng và lịch sử điều hướng cho từng màn hình**.

Ví dụ minh họa, không dùng router:

```jsx
import { useState } from 'react';

export default function App() {
  const [screen, setScreen] = useState('home');

  return (
    <>
      <button onClick={() => setScreen('home')}>Trang chủ</button>
      <button onClick={() => setScreen('posts')}>Bài viết</button>
      {screen === 'home' ? <h1>Trang chủ</h1> : <h1>Bài viết</h1>}
    </>
  );
}
```

Bấm “Bài viết” làm giao diện đổi, nhưng URL vẫn như cũ. Copy URL không ghi lại lựa chọn `screen`. Tải lại trang làm `useState('home')` khởi tạo lại. Nút Back của trình duyệt cũng không biết về lần đổi state này.

Vấn đề không phải “React không biết URL tồn tại”. JavaScript vẫn đọc được `window.location`. Vấn đề là **React không cung cấp sẵn một hệ thống ánh xạ URL sang các trang của ứng dụng**. React Router đảm nhiệm phần tổ chức đó. [S01][S02]

### 0.2. Định nghĩa các khái niệm đầu tiên

**Routing — định tuyến:** quá trình xác định giao diện hoặc cách xử lý tương ứng với địa chỉ người dùng đang truy cập.

**Route — tuyến:** một khai báo trong cấu hình định tuyến. Trong bài này, route thường có một mẫu đường dẫn và một React element sẽ hiển thị khi khớp.

**SPA — Single Page Application:** ứng dụng web có thể cập nhật nội dung và chuyển giữa các màn hình trong cùng tài liệu đang mở, thay vì yêu cầu trình duyệt tải một tài liệu HTML mới cho mỗi lần điều hướng nội bộ. SPA vẫn có thể tải dữ liệu, ảnh hoặc các phần mã JavaScript khi cần. [S02]

**Client-side routing — định tuyến phía trình duyệt:** JavaScript xử lý điều hướng nội bộ, cập nhật URL/lịch sử và hiển thị giao diện phù hợp mà không tải lại toàn bộ tài liệu. [S03]

**React Router:** thư viện hỗ trợ kết nối URL, cấu trúc route và giao diện React; cung cấp các công cụ điều hướng và đọc thông tin vị trí hiện tại. Trong bài này, ta dùng nó để xây dựng SPA. [S01]

Hãy hình dung URL là “địa chỉ phòng”, route là “bảng hướng dẫn”, còn component là “nội dung trong phòng”. Phép so sánh này chỉ giúp ghi nhớ; route không phải file HTML hoặc thư mục thật.

### 0.3. SPA và MPA khác nhau ở đâu?

**MPA — Multi Page Application:** ứng dụng mà việc chuyển sang các trang khác thường yêu cầu một tài liệu HTML mới từ server. HTML có thể được sinh động, không nhất thiết mỗi trang tương ứng một file `.html` nằm sẵn trên ổ đĩa.

| Điều cần so sánh | MPA điển hình | SPA với client-side routing |
| --- | --- | --- |
| Chuyển trang nội bộ | Nhận tài liệu HTML mới | Cập nhật giao diện trong tài liệu hiện tại |
| Nguồn nội dung | Server thường dựng HTML cho từng trang | JavaScript thường dựng/cập nhật phần giao diện |
| Tài nguyên mạng | Có thể dùng cache; không nhất thiết tải lại mọi JS/CSS | Có thể vẫn tải dữ liệu hoặc mã tách riêng |
| State React | Môi trường JavaScript của trang mới khởi tạo lại | Phụ thuộc component nào còn được giữ trong cây giao diện |

Không kết luận “MPA luôn chậm” hoặc “SPA luôn nhanh”. Bảng chỉ so sánh cách điều hướng, không phải phép đo hiệu năng. React Router cũng không chỉ dành cho SPA; phạm vi bài học mới là SPA. [S01][S02][S03]

> **Không tải lại trang ≠ giữ mọi state.** Khi một component bị gỡ khỏi cây giao diện (*unmount*), state cục bộ của nó không được giữ để tự phục hồi khi quay lại. State ở layout hoặc `App` có thể tiếp tục tồn tại nếu component đó vẫn được giữ. Đây là quy tắc của React, không phải một cam kết của router. [S04]

### 0.4. Khi bấm một liên kết, điều gì xảy ra?

Với điều hướng nội bộ do React Router xử lý:

```text
Bấm liên kết tới /posts/12
          ↓
Router cập nhật vị trí và lịch sử trình duyệt
          ↓
So khớp pathname với cấu hình route
          ↓
Hiển thị trang chi tiết bài viết
          ↓
Component có thể gọi API để lấy nội dung bài 12
```

Khi dán URL vào tab mới hoặc nhấn F5, trình duyệt vẫn gửi yêu cầu tới server. Vì thế, React Router không tự giải quyết cấu hình server khi triển khai; ta sẽ học phần đó ở mục 6.3. [S03][S22]

**Tự kiểm tra:** vì sao một state `screen = 'posts'` không đủ để chia sẻ trang danh sách cho người khác?

**Đáp án:** URL chưa biểu diễn lựa chọn đó; người khác không nhận được state trong bộ nhớ của tab bạn đang dùng.

<a id="phan-1"></a>

## Phần 1: Cài đặt và hiểu URL, Route, Path

### 1.1. Chuẩn bị dự án

Trong dự án React/Vite đã có từ buổi trước:

```bash
npm install react-router-dom@7
npm run dev
```

Ghi rõ `@7` để cài đúng major version của giáo trình. Trong v7, `react-router-dom` cung cấp lại các API từ `react-router`; tài liệu chính thức cũng dùng import từ `react-router`. Để người mới không phải đổi cách import giữa chừng, **toàn bộ bài dùng `react-router-dom`**. Không trộn hướng dẫn v5 (`Switch`, `Redirect`, `useHistory`) vào bài này. [S05]

Dự án mới có thể tạo bằng Vite:

```bash
npm create vite@latest router-practice -- --template react
cd router-practice
npm install
npm install react-router-dom@7
npm run dev
```

Chọn template **React/JavaScript** khi công cụ hỏi thêm. Dùng Node đáp ứng yêu cầu của phiên bản Vite đang cài; hướng dẫn Vite được dẫn ở [S06]. Tài liệu v7 nêu React/React DOM tối thiểu 18 và Node tối thiểu 20, nhưng công cụ build có thể yêu cầu Node mới hơn. [S05][S06]

### 1.2. Tách một URL thành các phần

Xét URL minh họa:

```text
https://example.com/posts/12?tab=comments&page=2#reply
└────── origin ─────┘└path─┘└────── search ─────┘└hash┘
```

| Thành phần | Giá trị | Ý nghĩa trong ví dụ |
| --- | --- | --- |
| `origin` | `https://example.com` | Giao thức và địa chỉ máy chủ |
| `pathname` | `/posts/12` | Đường dẫn tới trang bài viết |
| `search` | `?tab=comments&page=2` | Query string: các lựa chọn bổ sung |
| `hash` | `#reply` | Fragment, thường dùng để chỉ một vị trí/phần nội dung |

**Segment** là một đoạn của pathname, ngăn cách bởi dấu `/`. Trong `/posts/12`, hai segment là `posts` và `12`.

**Path pattern** là mẫu đường dẫn dùng để khai báo route, chẳng hạn `/posts/:id`. Mẫu này không phải URL cụ thể; `/posts/12` mới là một giá trị có thể khớp mẫu. `Routes` so khớp route dựa trên pathname; query string được đọc riêng, không viết vào `path`. [S07]

```jsx
// Trích đoạn: khai báo mẫu đường dẫn, không đưa ?page=2 vào path.
<Route path="/posts/:id" element={<PostDetail />} />
```

### 1.3. Ba thành phần nền tảng trong cách học này

| Thành phần | Định nghĩa | Cách ghi nhớ |
| --- | --- | --- |
| `BrowserRouter` | Router dùng lịch sử trình duyệt và cung cấp thông tin định tuyến cho cây con | Môi trường để routing hoạt động |
| `Routes` | Chọn và render nhánh route phù hợp với vị trí hiện tại | Nơi xét “URL này đi nhánh nào?” |
| `Route` | Khai báo đường dẫn, giao diện và/hoặc các route con | Một mục trong cấu hình |

Đây là ba thành phần của **Declarative Mode đang học**, không phải bộ ba bắt buộc của mọi cách dùng React Router. [S08][S09][S10]

### 1.4. Ứng dụng đầu tiên — chỉ hai file chính

**File `src/main.jsx`:** đặt `BrowserRouter` một lần ở đây.

```jsx
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
```

**File `src/App.jsx`:**

```jsx
import { Link, Route, Routes } from 'react-router-dom';

function Home() {
  return <h1>Trang chủ</h1>;
}

function About() {
  return <h1>Giới thiệu</h1>;
}

export default function App() {
  return (
    <>
      <nav>
        <Link to="/">Trang chủ</Link>{' | '}
        <Link to="/about">Giới thiệu</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}
```

`path="/about"` trả lời “đường dẫn nào?”. `element={<About />}` trả lời “hiện gì?”. Trong cách viết này, truyền **React element** `<About />`, không truyền trực tiếp `About` cho prop `element`. [S10]

Mở địa chỉ local mà terminal in ra, thường là `http://localhost:5173`. Bấm “Giới thiệu”, quan sát URL chuyển sang `/about`; sau đó thử Back và Forward.

> Đã bọc `BrowserRouter` ở `main.jsx` thì **không bọc thêm lần nữa trong `App`**. Các component dùng `Link`, `useNavigate`, `useLocation`… phải nằm trong cây con của router. [S08]

### 1.5. Path tương đối và tuyệt đối trong cấu hình route

**Path tuyệt đối** bắt đầu bằng `/`, biểu diễn đường dẫn từ gốc định tuyến. **Path tương đối** không bắt đầu bằng `/`; khi khai báo route con, nó được nối với đường dẫn của route cha. [S11]

```jsx
// Trích đoạn: Settings được mở tại /admin/settings.
<Route path="/admin" element={<AdminLayout />}>
  <Route path="settings" element={<Settings />} />
</Route>
```

Hãy đọc theo phép ghép:

```text
Route cha: /admin
Route con: settings
URL:       /admin/settings
```

Trong cấu trúc trên, viết route con `path="/settings"` **không** có nghĩa là `/admin/settings`; đó là path tuyệt đối không phù hợp với đường dẫn cha. Path tuyệt đối trong route con không bị cấm hoàn toàn: nó phải bắt đầu bằng toàn bộ đường dẫn cha, ví dụ `/admin/settings`. Để dễ đọc, bài này ưu tiên path tương đối cho route con. Đây là quy tắc được đối chiếu với mã nguồn router [S12], không phải quy tắc “hễ có `/` trong route con là sai”.

Dưới cha `/`, hai cách `about` và `/about` đều có thể tạo URL `/about`; vì vậy không dùng trường hợp đó để minh họa một lỗi vốn không có.

<a id="phan-2"></a>

## Phần 2: So khớp route, route lồng nhau và layout

### 2.1. Route matching — chọn nhánh phù hợp

**Route matching** là việc so sánh pathname hiện tại với cấu hình route để tìm nhánh phù hợp. React Router v7 xếp hạng mức cụ thể của route, không đơn giản chọn khai báo đầu tiên từ trên xuống. [S03][S12]

Ví dụ **trích đoạn**:

```jsx
<Routes>
  <Route path="*" element={<NotFound />} />
  <Route path="/posts/:id" element={<PostDetail />} />
  <Route path="/posts/new" element={<CreatePost />} />
  <Route path="/posts" element={<Posts />} />
</Routes>
```

| URL thử | Giao diện được chọn | Lý do |
| --- | --- | --- |
| `/posts/new` | `CreatePost` | Segment tĩnh `new` cụ thể hơn `:id` |
| `/posts/12` | `PostDetail` | `12` được lấy làm tham số `id` |
| `/posts` | `Posts` | Khớp route danh sách |
| `/something-else` | `NotFound` | Không có nhánh cụ thể hơn phù hợp |

**`path="*"` đặt đầu vẫn không “nuốt” `/posts/new`.** Đặt catch-all ở cuối là quy ước trình bày, không phải yêu cầu của thuật toán. Tránh định nghĩa nhiều route cùng mẫu và cùng mục đích rồi dựa vào thứ tự để phân biệt. [S03][S12]

Không học thuộc một bảng “route dài luôn thắng route ngắn”. Trước hết một route phải **khớp** URL; sau đó mới xét độ cụ thể giữa các nhánh cùng khớp. Trong cấu hình đơn giản trên, `/posts` không tự nhận `/posts/12` chỉ vì nó là tiền tố.

### 2.2. Nested route — route lồng nhau

**Nested route** là route được khai báo bên trong route khác. Cấu trúc này giúp tổ chức quan hệ cha–con cho đường dẫn và giao diện. Route cha có thể tạo layout chung; route con cung cấp phần nội dung thay đổi. [S11]

Ví dụ Blog có header, menu và footer giống nhau ở mọi trang. Thay vì chép lại các phần này vào từng component, ta tạo `Layout`.

**Layout** là component chứa khung giao diện dùng chung. **Outlet** là vị trí trong khung đó nơi React Router render route con đang khớp; không có route con phù hợp thì vị trí này không render nội dung con. [S13]

Thay `src/App.jsx` của ví dụ đầu bằng file sau; giữ nguyên `main.jsx`:

```jsx
import { Link, Outlet, Route, Routes } from 'react-router-dom';

function Layout() {
  return (
    <>
      <header>
        <p>Blog học React</p>
        <nav>
          <Link to="/">Trang chủ</Link>{' | '}
          <Link to="/posts">Bài viết</Link>{' | '}
          <Link to="/about">Giới thiệu</Link>
        </nav>
      </header>
      <main><Outlet /></main>
      <footer>Ví dụ layout dùng chung</footer>
    </>
  );
}

function Home() { return <h1>Trang chủ</h1>; }
function Posts() { return <h1>Bài viết</h1>; }
function About() { return <h1>Giới thiệu</h1>; }
function NotFound() { return <h1>Không tìm thấy trang</h1>; }

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="posts" element={<Posts />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
```

Khi URL là `/about`, cây giao diện có thể hình dung như sau:

```text
Layout
├── header
├── main
│   └── Outlet → About
└── footer
```

`Layout` không tự biết phải render `About`. Cấu hình route xác định quan hệ đó, còn `Outlet` cung cấp vị trí hiển thị.

### 2.3. Index route — trang mặc định của route cha

**Index route** là route con hiển thị tại **đúng URL của cha**. Nó dùng prop `index`, không khai báo thêm segment và không có route con. [S11]

```jsx
// Trích đoạn
<Route path="/posts" element={<PostsLayout />}>
  <Route index element={<Posts />} />
  <Route path=":id" element={<PostDetail />} />
</Route>
```

Tại `/posts`, `Outlet` của `PostsLayout` hiện `Posts`. Tại `/posts/12`, nó hiện `PostDetail`.

`index` không có nghĩa là “route nào được viết đầu”. Cũng không nên xem `index` là tên khác hoàn toàn tương đương với `path=""`: route có path rỗng có thể tham gia cấu trúc lồng nhau khác, còn index là route lá mặc định, không có children. [S10][S11]

### 2.4. Nhiều tầng layout

```jsx
// Trích đoạn cấu hình
<Route path="/" element={<Layout />}>
  <Route path="posts" element={<PostsLayout />}>
    <Route index element={<Posts />} />
    <Route path=":id" element={<PostDetail />} />
  </Route>
</Route>
```

Tại `/posts/12`, thứ tự từ ngoài vào trong là:

```text
Layout → Outlet → PostsLayout → Outlet → PostDetail
```

Cả `Layout` và `PostsLayout` cần có `Outlet` nếu chúng có nhiệm vụ render route con. **Không bắt buộc lồng layout chỉ vì URL có nhiều segment.** Khai báo phẳng `path="posts/:id"` cũng hợp lệ; chọn cấu trúc theo nhu cầu dùng chung giao diện. [S11][S13]

### 2.5. Route không có path

**Pathless route** là route không khai báo `path`. Nó thêm một cấp tổ chức hoặc layout, nhưng không thêm segment vào URL. Ta sẽ dùng nó để gom những trang cần đăng nhập. [S11]

```jsx
// Trích đoạn: không tạo ra /ProtectedRoute/dashboard.
<Route element={<ProtectedRoute user={user} />}>
  <Route path="dashboard" element={<Dashboard />} />
  <Route path="profile" element={<Profile />} />
</Route>
```

**Tự kiểm tra:** tại `/posts/12`, vì sao không thấy `PostDetail` dù khai báo route con đúng?

**Điểm cần kiểm tra đầu tiên:** layout cha có render `<Outlet />` không?

---

# Tầng 2 — Điều hướng và dữ liệu trong URL

<a id="phan-3"></a>

## Phần 3: Link, NavLink, useNavigate và useLocation

### 3.1. Link — liên kết chuyển trang nội bộ

**`Link`** là component tạo liên kết có `href` và hỗ trợ điều hướng phía trình duyệt. Với một lần click nội bộ thông thường, router chuyển trang mà không yêu cầu trình duyệt tải tài liệu mới. Người dùng vẫn có thể dùng các hành vi liên kết như mở tab mới. [S14]

```jsx
import { Link } from 'react-router-dom';

export default function NavigationExample() {
  return (
    <nav>
      <Link to="/posts">Xem bài viết</Link>{' | '}
      <Link to="/posts/12">Đọc bài 12</Link>
    </nav>
  );
}
```

`to` là đích đến. Khi đích là một bài cụ thể, truyền `/posts/12`, **không truyền `/posts/:id`** vì `:id` chỉ là ký hiệu trong mẫu route.

Không cần thay mọi thẻ `<a>` bằng `Link`. Dùng `Link` cho điều hướng nội bộ được router quản lý; dùng `<a>` cho website ngoài, email, tải file hoặc trường hợp cần điều hướng tài liệu. Ví dụ:

```jsx
// Trích đoạn: hai liên kết có mục đích khác nhau.
<Link to="/about">Giới thiệu trong ứng dụng</Link>
<a href="https://react.dev" target="_blank" rel="noreferrer">
  Mở tài liệu React
</a>
```

Dùng `<a href="/posts">` không phải cú pháp sai. Nó thường tạo một lần điều hướng tài liệu thay vì chuyển trang theo cách của router. Điều cần chọn đúng là **hành vi mong muốn**, không phải cấm thẻ HTML. [S03][S14]

### 3.2. NavLink — liên kết biết trang đang được chọn

**`NavLink`** là `Link` có thêm trạng thái khớp route, thường dùng để đánh dấu mục menu hiện tại. Khi active, nó có thể thêm class `active` và `aria-current="page"`. [S15]

```jsx
import { NavLink } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav aria-label="Điều hướng chính">
      <NavLink to="/">Trang chủ</NavLink>{' | '}
      <NavLink to="/posts">Bài viết</NavLink>{' | '}
      <NavLink to="/about">Giới thiệu</NavLink>
    </nav>
  );
}
```

```css
nav a.active {
  font-weight: 700;
  text-decoration-thickness: 3px;
}
```

**Prop `end`** yêu cầu kết thúc việc khớp ở cuối đích của liên kết. Ví dụ phù hợp để học `end` là menu `/posts`:

| Liên kết | URL hiện tại | Active? |
| --- | --- | --- |
| `<NavLink to="/posts">` | `/posts` | Có |
| `<NavLink to="/posts">` | `/posts/12` | Có |
| `<NavLink to="/posts" end>` | `/posts` | Có |
| `<NavLink to="/posts" end>` | `/posts/12` | Không |

Vì vậy, giữ menu “Bài viết” active khi đang đọc một bài thì không thêm `end`; chỉ đánh dấu trang danh sách thì thêm `end`.

> **Trường hợp gốc `/` là ngoại lệ:** React Router v7 xử lý `NavLink to="/"` để nó không active ở mọi trang. Không giải thích rằng “thiếu `end` ở `/` thì menu Trang chủ luôn active”. [S15]

Tùy chỉnh class khi cần:

```jsx
// Trích đoạn
<NavLink
  to="/posts"
  className={({ isActive }) => isActive ? 'menu-item selected' : 'menu-item'}
>
  Bài viết
</NavLink>
```

### 3.3. useNavigate — chuyển trang sau một xử lý

**`useNavigate`** là hook trả về hàm `navigate`, cho phép yêu cầu điều hướng bằng code. Dùng khi cần điều hướng sau khi xử lý xong một hành động; một liên kết chỉ dùng để đi trang khác thì thường nên dùng `Link`. [S16]

Ví dụ dưới đây giả lập việc lưu một bản nháp trong bộ nhớ của trình duyệt. Ứng dụng cần có route `/posts`:

```jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function DraftForm() {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    if (!title.trim()) return;

    try {
      localStorage.setItem('demo-draft-title', title.trim());
      navigate('/posts'); // Chỉ chuyển khi thao tác lưu thành công.
    } catch {
      setError('Trình duyệt không cho phép lưu bản nháp.');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="draft-title">Tiêu đề bản nháp</label>
      <input id="draft-title" value={title}
        onChange={(event) => setTitle(event.target.value)} />
      {error && <p role="alert">{error}</p>}
      <button type="submit" disabled={!title.trim()}>Lưu và về danh sách</button>
    </form>
  );
}
```

Trong ứng dụng dùng API, điểm điều hướng đặt sau khi API xác nhận thao tác thành công; cần giữ người dùng ở form và báo lỗi khi thao tác thất bại. Không đặt hai lệnh `navigate` liên tiếp chỉ để minh họa hai lựa chọn.

### 3.4. Lịch sử trình duyệt: push và replace

**History entry** là một mục trong lịch sử điều hướng của tab. Điều hướng thông thường thêm mục mới; **`replace: true` thay mục hiện tại**, không xóa toàn bộ lịch sử trước đó. [S16][S17]

```jsx
// Hai lựa chọn độc lập. Không chạy cả hai cho cùng một lần điều hướng.
navigate('/dashboard');
navigate('/dashboard', { replace: true });
```

Giả sử lịch sử đang là:

```text
/ → /login
```

Điều hướng thông thường tới dashboard:

```text
/ → /login → /dashboard
Back quay về /login.
```

Điều hướng với `replace: true` từ login:

```text
/ → /dashboard
Back quay về /.
```

Một mục `/login` nằm ở vị trí khác trước đó vẫn có thể còn trong lịch sử. `replace` không phải công cụ xóa mọi dấu vết của một URL.

### 3.5. navigate(-1) không đồng nghĩa “về trang danh sách”

```jsx
// Trích đoạn
<button type="button" onClick={() => navigate(-1)}>
  Quay lại theo lịch sử
</button>
```

`navigate(-1)` lùi một mục trong lịch sử tab. Mục đó có thể là trang khác trong app, website ngoài, hoặc không có bước lùi phù hợp. Vì vậy, khi yêu cầu nghiệp vụ là “Về danh sách bài viết”, dùng đích xác định: [S16]

```jsx
<Link to="/posts">Về danh sách bài viết</Link>
```

Nếu cần quay về đúng bộ lọc trước đó, phải lưu/khôi phục query tương ứng hoặc tận dụng lịch sử trong một luồng đã biết rõ; không tự suy ra rằng mọi lần mở chi tiết đều xuất phát từ danh sách.

### 3.6. useLocation — xem vị trí hiện tại

**`useLocation`** trả về đối tượng vị trí do router quản lý. Những trường cần biết là `pathname`, `search`, `hash`, `state` và `key`. `key` là khóa nhận diện location, không phải ID dữ liệu nghiệp vụ. [S18]

```jsx
import { useLocation } from 'react-router-dom';

export default function LocationInfo() {
  const location = useLocation();

  return (
    <section>
      <p>Pathname: {location.pathname}</p>
      <p>Query string: {location.search || '(không có)'}</p>
      <p>Hash: {location.hash || '(không có)'}</p>
    </section>
  );
}
```

Tại `/posts/12?tab=comments#reply`, ba giá trị lần lượt là `/posts/12`, `?tab=comments` và `#reply`.

### 3.7. Location state — dữ liệu đi cùng một mục lịch sử

**Location state** là dữ liệu bổ sung gắn với vị trí điều hướng, không hiển thị trong URL. Với `BrowserRouter`, cơ chế này dựa trên `history.state`. [S14][S17]

```jsx
// Trích đoạn nơi tạo liên kết
<Link to="/posts/12" state={{ fromList: true }}>
  Đọc bài 12
</Link>
```

```jsx
// Component ở trang đích
import { useLocation } from 'react-router-dom';

export default function ArrivalNote() {
  const location = useLocation();
  return <p>{location.state?.fromList ? 'Bạn vừa đến từ danh sách.' : 'Chào bạn.'}</p>;
}
```

Không mô tả state này là “chỉ sống trong một lần điều hướng rồi mất”. Nó gắn với history entry và có thể còn khi Back/Forward hoặc tải lại entry đó. Tuy nhiên, **copy riêng URL không mang theo state**, và truy cập trực tiếp có thể không có giá trị này. Luôn có phương án dự phòng. [S14][S17]

Dùng query/path cho thông tin cần chia sẻ qua URL; dùng location state cho ngữ cảnh phụ, chẳng hạn trang cần quay lại sau đăng nhập. Không đặt mật khẩu hay thông tin bí mật vào các cơ chế này.

### 3.8. Link tương đối — phần mở rộng

`path` của một `Route` và `to` của một `Link` không phải cùng một prop. `to` tương đối được giải theo ngữ cảnh route nơi liên kết được render, không đơn thuần nối vào mọi chuỗi đang có trên thanh địa chỉ. [S14]

```jsx
// Với route cha /posts và route con :id,
// Link dưới đây trong PostDetail đi lên route cha /posts.
<Link to="..">Lên route cha</Link>
```

Mặc định, `..` lùi theo cấp **route**. Nếu một route chứa nhiều segment như `posts/:id`, lùi một cấp route có thể bỏ nhiều segment. `relative="path"` dùng cách lùi theo segment của path. Trong bài cơ bản, dùng `to="/posts"` khi cần đích rõ ràng; chưa cần dựa vào các trường hợp tương đối phức tạp. [S14]

### 3.9. Chọn công cụ theo mục đích

| Nhu cầu | Công cụ |
| --- | --- |
| Liên kết đi tới trang nội bộ | `Link` |
| Menu cần đánh dấu trang hiện tại | `NavLink` |
| Chuyển trang sau khi xử lý hành động | `useNavigate` |
| Đọc vị trí hiện tại | `useLocation` |
| Chuyển hướng theo điều kiện khi render | `Navigate`, học ở phần 5 |

**Tự kiểm tra:** nút “Về danh sách” có nên mặc định gọi `navigate(-1)` không?

**Đáp án:** không; khi cần chắc chắn tới danh sách, dùng `Link to="/posts"`.

<a id="phan-4"></a>

## Phần 4: Dynamic route và query string

### 4.1. Dynamic route — đường dẫn có tham số

**Dynamic segment** là một segment trong mẫu route bắt đầu bằng `:`, dùng làm vị trí nhận giá trị từ URL. **Dynamic route** là route có segment động. [S11]

```jsx
// Trích đoạn cấu hình
<Route path="/posts/:id" element={<PostDetail />} />
```

| URL | Giá trị nhận được |
| --- | --- |
| `/posts/1` | `id = "1"` |
| `/posts/12` | `id = "12"` |
| `/posts/abc` | `id = "abc"` |

`id` là tên do người viết chọn. Viết `:postId` thì phải đọc `postId`. Một route động cho phép dùng chung component cho nhiều bài viết, thay vì tạo một route cho từng ID.

### 4.2. useParams — đọc path params

**`useParams`** trả về đối tượng các tham số được lấy từ những route đang khớp trong ngữ cảnh của component. Giá trị tham số có mặt là chuỗi; tên không tồn tại hoặc tham số tùy chọn không có giá trị có thể là `undefined`. [S19]

```jsx
import { useParams } from 'react-router-dom';

export default function PostDetail() {
  const { id } = useParams();
  return <h1>Đang xem bài viết có ID: {id}</h1>;
}
```

Hook này phải được dùng ở component được render trong ngữ cảnh route có tham số tương ứng. **Chỉ nằm dưới `BrowserRouter` chưa đảm bảo có `id`**: một `App` nằm phía trên `<Routes>` không tự nhận params của route con bên dưới. [S19]

### 4.3. Router khớp URL không có nghĩa dữ liệu tồn tại

`/posts/999999` có thể khớp `/posts/:id`, nhưng hệ thống không có bài viết đó. `:id` cũng không tự kiểm tra ID phải là số.

Ví dụ nhỏ dùng dữ liệu trong file để bạn tập trung vào route:

```jsx
import { Link, useParams } from 'react-router-dom';

const posts = [
  { id: 1, title: 'Làm quen với React', body: 'Component giúp chia nhỏ giao diện.' },
  { id: 2, title: 'Học React Router', body: 'URL cho biết trang đang được mở.' },
];

export default function PostDetail() {
  const { id } = useParams();
  const numericId = Number(id);
  const validId = typeof id === 'string'
    && /^[1-9]\d*$/.test(id)
    && Number.isSafeInteger(numericId);

  if (!validId) {
    return <p>ID không hợp lệ. <Link to="/posts">Về danh sách</Link></p>;
  }

  const post = posts.find((item) => item.id === numericId);
  if (!post) {
    return <p>Không tìm thấy bài viết. <Link to="/posts">Về danh sách</Link></p>;
  }

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <Link to="/posts">Về danh sách</Link>
    </article>
  );
}
```

Đây là **quy tắc ID của ví dụ**: số nguyên dương, không có số 0 ở đầu. Ứng dụng khác có thể dùng chuỗi slug hoặc UUID và phải kiểm tra theo quy tắc khác. Không ép mọi params thành số.

Tự thử `/posts/1`, `/posts/2`, `/posts/999` và `/posts/abc`. Hai URL cuối cho hai lý do thất bại khác nhau: không có dữ liệu và đầu vào sai định dạng.

### 4.4. Gọi API theo params — liên hệ buổi 4

Trong dự án phần 7, ta thay mảng dữ liệu bằng API. Luồng xử lý cần đủ:

```text
Đọc id → kiểm tra định dạng → gửi request theo id
                                   ↓
                đang tải / thành công / không có dữ liệu / lỗi
```

Nếu đổi từ `/posts/1` sang `/posts/2`, React có thể tiếp tục dùng cùng instance `PostDetail`. Vì vậy, effect tải dữ liệu cần phụ thuộc vào `id` hoặc URL được tạo từ `id`. Không đặt `[]` rồi cho rằng component chắc chắn sẽ mount lại. [S04][S20]

Khi gọi `fetch`, phải kiểm tra `response.ok`: mã HTTP 404 hoặc 500 không tự làm Promise của `fetch` bị reject. Khi URL đổi hoặc component rời trang, cần cleanup để hủy request hoặc bỏ qua kết quả đã cũ. Phần 7 dùng `AbortController`, kiểm tra tín hiệu hủy trước khi cập nhật state và phân biệt HTTP 404. [S20][S21]

**Race condition — tranh chấp thứ tự kết quả:** request cho bài 1 gửi trước nhưng trả về sau request cho bài 2, rồi vô tình ghi đè nội dung bài 2. Cleanup không chỉ cần khi có polling; nó còn có ích với request theo tham số. [S20]

### 4.5. Query string — các lựa chọn bổ sung trong URL

**Query string** là phần sau dấu `?` và trước `#`, gồm các cặp tên–giá trị, ví dụ:

```text
/posts?q=react&page=2
```

Ở đây `q` là từ khóa và `page` là trang kết quả. `q`, `page`, `sort` là tên do ứng dụng quy ước, không phải từ khóa bắt buộc của React Router. [S07]

| Loại thông tin | Ví dụ | Thường dùng khi |
| --- | --- | --- |
| Path param | `/posts/12` | Xác định đối tượng/trang cụ thể |
| Query param | `/posts?q=react&page=2` | Tìm kiếm, lọc, sắp xếp, phân trang |
| Location state | `{ fromList: true }` | Mang ngữ cảnh phụ không cần nằm trong URL |

Đây là hướng dẫn thiết kế, không phải giới hạn cứng của web. Hai URL `/posts?q=react` và `/posts?q=router` thường dùng cùng route `path="posts"`; không tạo riêng route cho mỗi từ khóa.

### 4.6. useSearchParams — đọc và cập nhật query

**`useSearchParams`** trả về `[searchParams, setSearchParams]`. `searchParams` là `URLSearchParams`; gọi `setSearchParams` sẽ cập nhật query và tạo một lần điều hướng. [S23]

```jsx
import { useSearchParams } from 'react-router-dom';

export default function QueryInfo() {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('q') ?? '';
  const rawPage = searchParams.get('page');
  const parsedPage = Number(rawPage);
  const page = Number.isSafeInteger(parsedPage) && parsedPage >= 1
    ? parsedPage : 1;

  return (
    <section>
      <p>Từ khóa: {keyword || '(chưa có)'}</p>
      <p>Trang: {page}</p>
      <button type="button" onClick={() => setSearchParams({ q: 'react', page: '2' })}>
        Xem trang 2 của từ khóa react
      </button>
    </section>
  );
}
```

`get('q')` trả chuỗi hoặc `null`, không tự trả một số hoặc boolean. `getAll('tag')` đọc nhiều giá trị cùng tên, chẳng hạn `?tag=react&tag=router`. [S24]

### 4.7. Cập nhật một query mà không làm mất query khác

Lệnh sau **thay bộ query**, không tự merge với bộ cũ:

```jsx
// Trích đoạn: ?q=react&sort=newest sẽ thành ?page=2.
setSearchParams({ page: '2' });
```

Muốn giữ các lựa chọn khác, tạo bản sao rồi cập nhật:

```jsx
// Trích đoạn trong component có useSearchParams.
function goToPage(nextPage) {
  const next = new URLSearchParams(searchParams);
  next.set('page', String(nextPage));
  setSearchParams(next);
}
```

Muốn bỏ một bộ lọc:

```jsx
const next = new URLSearchParams(searchParams);
next.delete('q');
setSearchParams(next);
```

Không chỉ gọi `searchParams.set(...)` rồi chờ URL tự đổi. Bản thân đối tượng này có thể bị sửa, nhưng phải dùng setter để điều hướng. Cũng không nên gọi setter nhiều lần liên tiếp với kỳ vọng nó xếp hàng cập nhật giống hệt `setState`. Gom các thay đổi vào một `next` rồi gọi một lần. [S23]

### 4.8. Tìm kiếm và đồng bộ Back/Forward

Có hai giá trị cần phân biệt: **`input` là nội dung đang gõ**, còn **`keyword` là từ khóa đã áp dụng trong URL**. Submit mới đưa `input` lên URL.

```jsx
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const titles = ['Học React', 'React Router cơ bản', 'JavaScript cho người mới'];

export default function SearchExample() {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('q') ?? '';
  const [input, setInput] = useState(keyword);

  useEffect(() => {
    setInput(keyword);
  }, [keyword]);

  function handleSubmit(event) {
    event.preventDefault();
    const next = new URLSearchParams(searchParams);
    const trimmed = input.trim();
    if (trimmed) next.set('q', trimmed);
    else next.delete('q');
    next.delete('page');
    setInput(trimmed);
    setSearchParams(next);
  }

  const matches = titles.filter((title) =>
    title.toLowerCase().includes(keyword.trim().toLowerCase()),
  );

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <label htmlFor="keyword">Từ khóa</label>
        <input id="keyword" value={input}
          onChange={(event) => setInput(event.target.value)} />
        <button type="submit">Tìm kiếm</button>
      </form>
      <p>Đang lọc theo: {keyword || '(tất cả)'}</p>
      {matches.length ? (
        <ul>{matches.map((title) => <li key={title}>{title}</li>)}</ul>
      ) : <p>Không có kết quả phù hợp.</p>}
    </section>
  );
}
```

Điểm quan trọng của ví dụ là effect `[keyword]`. `useState(keyword)` chỉ lấy giá trị khởi tạo, không tự lấy lại giá trị mới mỗi lần URL đổi. Effect giúp ô nhập thay đổi khi Back/Forward đưa người dùng về từ khóa trước đó. [S20][S32]

Tự thử: tìm `react`, tiếp tục tìm `javascript`, bấm Back. URL, ô nhập và kết quả phải cùng trở về lần tìm `react`.

Với tìm kiếm theo từng lần submit, thêm history entry thường hữu ích. Với cập nhật theo mỗi ký tự, có thể dùng `setSearchParams(next, { replace: true })` và cân nhắc trì hoãn xử lý (*debounce*) để tránh tạo nhiều mục lịch sử. Debounce là phần mở rộng, không bắt buộc trong bài này. [S23][S16]

---

# Tầng 3 — Kiểm soát truy cập và xử lý đường dẫn

<a id="phan-5"></a>

## Phần 5: Protected Route — kiểm soát giao diện theo đăng nhập

### 5.1. Ba khái niệm cần tách biệt

**Authentication — xác thực:** xác định người dùng là ai, thường thông qua một quy trình đăng nhập và phiên làm việc.

**Authorization — phân quyền:** xác định người dùng đó được phép thực hiện hành động hoặc truy cập tài nguyên nào.

**Protected route — route có điều kiện truy cập:** cách tổ chức giao diện để chỉ render nhánh trang khi điều kiện phù hợp; nếu không, chuyển tới đăng nhập hoặc trang thông báo không có quyền. Đây là một mẫu triển khai của ứng dụng, **không có sẵn một component tên `ProtectedRoute` do React Router cung cấp**. [S25]

Trong Blog mẫu:

| Người truy cập | `/posts` | `/dashboard` | `/admin` |
| --- | --- | --- | --- |
| Chưa đăng nhập | Được xem | Sang `/login` | Sang `/login` |
| Thành viên | Được xem | Được xem | Sang `/403` |
| Quản trị viên | Được xem | Được xem | Được xem |

> **Ranh giới bảo mật:** guard phía React chỉ kiểm soát giao diện và luồng điều hướng. Người dùng có thể sửa JavaScript, localStorage hoặc gọi API trực tiếp. Backend phải xác thực và kiểm tra quyền cho từng yêu cầu cần bảo vệ; không tin `role` do client tự gửi. [S25]

### 5.2. Navigate — chuyển hướng bằng component

**`Navigate`** là component thực hiện điều hướng khi được render. Nó không tạo một nút hoặc liên kết trên màn hình. Dùng `to` cho đích đến và `replace` khi muốn thay history entry hiện tại. [S26]

```jsx
// Trích đoạn nằm trong một component dưới Router.
if (!user) {
  return <Navigate to="/login" replace />;
}
```

Tên gần giống nhưng vai trò khác nhau:

| Công cụ | Cách sử dụng |
| --- | --- |
| `useNavigate()` | Lấy hàm `navigate`, gọi khi xử lý sự kiện hoặc luồng phù hợp |
| `<Navigate />` | Trả về một component chuyển hướng theo kết quả render |

Không gọi `navigate('/login')` trực tiếp trong thân render rồi tiếp tục trả JSX. Trong ví dụ guard của bài, trả về `<Navigate />` để thể hiện nhánh giao diện tương ứng.

### 5.3. Viết guard không dùng hai nguồn trạng thái đăng nhập

Dùng một prop `user`: `null` nghĩa là chưa đăng nhập; object nghĩa là có người dùng giả lập. Không đồng thời truyền `isAuthenticated` và `user` rồi để hai giá trị mâu thuẫn.

**File `src/components/ProtectedRoute.jsx`:**

```jsx
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export default function ProtectedRoute({ user, allowedRoles }) {
  const location = useLocation();

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: {
            pathname: location.pathname,
            search: location.search,
            hash: location.hash,
          },
        }}
      />
    );
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/403" replace />;
  }

  return <Outlet />;
}
```

Đọc theo thứ tự: chưa có `user` thì đi đăng nhập; đã có `user` nhưng không thuộc danh sách quyền yêu cầu thì đi 403; còn lại render route con.

`allowedRoles` là **prop tự đặt tên**, có dạng mảng như `['admin']`. `state.from` lưu cả `pathname`, `search` và `hash`, không chỉ pathname, để không làm mất lựa chọn trên trang đích. Việc nhận location state sử dụng cơ chế ở phần 3.7. [S14][S18]

**Trích đoạn cấu hình trong `App`:**

```jsx
<Routes>
  <Route path="login" element={<Login user={user} onLogin={setUser} />} />
  <Route path="403" element={<Forbidden />} />

  <Route element={<ProtectedRoute user={user} />}>
    <Route path="dashboard" element={<Dashboard user={user} />} />
    <Route path="profile" element={<Profile user={user} />} />
  </Route>

  <Route element={<ProtectedRoute user={user} allowedRoles={['admin']} />}>
    <Route path="admin" element={<Admin />} />
  </Route>
</Routes>
```

Đây là hai nhóm guard độc lập, cùng dùng `user`. `/login` và `/403` ở ngoài các guard để tránh tự chặn trang đăng nhập hoặc tạo vòng chuyển hướng.

### 5.4. Quay lại nơi người dùng đang muốn vào

Luồng cần đạt:

```text
Chưa đăng nhập, mở /dashboard?tab=saved#saved
             ↓
Guard lưu địa chỉ đích vào state.from rồi chuyển /login
             ↓
Người dùng đăng nhập thành công
             ↓
Cập nhật user trong state React
             ↓
Chuyển tới /dashboard?tab=saved#saved bằng replace
```

Trong bài thực hành, ta kiểm tra đích quay lại bằng `getReturnTo` ở `src/utils/url.js`. Hàm chỉ cho quay lại một trong các trang bảo vệ của ví dụ. Nếu thiếu hoặc không hợp lệ, dùng `/dashboard`.

```jsx
// Trích đoạn trong handler của Login.
const returnTo = getReturnTo(location.state?.from);
onLogin({ name: 'Học viên', role: 'member' });
navigate(returnTo, { replace: true });
```

Không chuyển về một địa chỉ lấy từ dữ liệu bên ngoài mà không kiểm tra. Không chọn `/login` làm đích quay lại mặc định vì có thể gây chuyển hướng lặp.

Bản `Login.jsx` đầy đủ ở phần 7 có form, state, import và handler hoàn chỉnh; không có lời gọi `api.login()` chưa được định nghĩa.

### 5.5. Đăng nhập giả lập không phải đăng nhập thật

Bài tập dùng `useState` và localStorage để mô phỏng. Việc chọn vai trò `admin` trong form chỉ nhằm kiểm tra các nhánh giao diện. **Không dùng cách này làm hệ thống phân quyền của sản phẩm thật.** [S25]

Trong ví dụ, `App` là nơi giữ `user`, còn localStorage giúp nhớ lựa chọn sau khi tải lại. Chỉ sửa localStorage mà không cập nhật state React không tự làm giao diện trong tab hiện tại render lại. Bản hoàn chỉnh cập nhật cả hai và xử lý trường hợp JSON hỏng hoặc storage bị chặn. [S32][S33][S34]

Nếu ứng dụng thật cần gọi server để kiểm tra phiên, phải có trạng thái **đang xác minh** trước khi kết luận chưa đăng nhập. Minh họa ý tưởng:

```jsx
// Trích đoạn ý tưởng, không phải API có sẵn của React Router.
if (authStatus === 'checking') return <p>Đang kiểm tra phiên...</p>;
if (!user) return <Navigate to="/login" replace />;
return <Outlet />;
```

Bài mẫu đọc dữ liệu giả lập đồng bộ nên không thêm một trạng thái chờ giả không cần thiết. Việc xác thực thật, token, cookie và bảo mật phiên nằm ngoài phạm vi buổi này.

**Tự kiểm tra:** giấu menu “Quản trị” có đủ để bảo vệ API quản trị không?

**Đáp án:** không. Menu và route guard chỉ tác động phía client; API vẫn phải kiểm tra quyền. [S25]

<a id="phan-6"></a>

## Phần 6: Trang 404, chuyển hướng và triển khai

### 6.1. Catch-all route — nhánh dự phòng

**Catch-all route** dùng `*` để nhận phần pathname còn lại phù hợp trong phạm vi của nó. Với `path="*"` ở cấp chính của ứng dụng, ta thường dùng nó làm trang không tìm thấy khi không có nhánh cụ thể hơn khớp. [S11][S12]

```jsx
// Trích đoạn: để cuối cho dễ đọc, không phải vì bắt buộc về thứ tự.
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/posts" element={<Posts />} />
  <Route path="*" element={<NotFound />} />
</Routes>
```

```jsx
// File src/pages/NotFound.jsx — ví dụ độc lập.
import { Link, useLocation } from 'react-router-dom';

export default function NotFound() {
  const location = useLocation();
  return (
    <section>
      <h1>404 — Không tìm thấy trang</h1>
      <p>Không có trang tương ứng với <code>{location.pathname}</code>.</p>
      <Link to="/">Về trang chủ</Link>
    </section>
  );
}
```

**Ba tình huống khác nhau cần phân biệt:**

| Tình huống | Ai xử lý? |
| --- | --- |
| `/khong-co-trang-nay` không khớp route cụ thể | Catch-all trong React |
| `/posts/999999` khớp route nhưng API không có bài | Trang chi tiết xử lý “không tìm thấy bài viết” |
| F5 tại `/posts/12`, hosting không phục vụ được app | Cấu hình server/hosting |

Hiển thị dòng chữ “404” hoặc “403” trong React **không tự thay HTTP status của tài liệu HTML đã được server trả về**. Với SPA fallback trả `index.html` mã 200, người dùng có thể thấy giao diện 404 dù request tài liệu có mã 200. Muốn kiểm soát HTTP status thực sự cần xử lý phía server hoặc một kiến trúc triển khai phù hợp. [S22]

### 6.2. Redirect — đổi đích điều hướng

**Redirect** trong phạm vi ví dụ client-side là việc chuyển người dùng từ vị trí hiện tại tới vị trí khác. Có thể dùng cùng một component `Navigate` trong khai báo route hoặc trong một nhánh điều kiện. Đó không phải hai API riêng. [S26]

```jsx
// Trích đoạn: đường dẫn cũ chuyển sang đường dẫn mới.
<Route path="/old-posts" element={<Navigate to="/posts" replace />} />
```

```jsx
// Trích đoạn: chuyển hướng theo điều kiện.
if (user) return <Navigate to="/dashboard" replace />;
```

Client-side redirect này không tự tạo phản hồi HTTP 301/302 từ server. Khi cần chuyển URL cũ ở cấp hosting hoặc làm SEO, cấu hình redirect phù hợp tại server/hosting thay vì chỉ dựa vào component.

### 6.3. Vì sao bấm Link được nhưng nhấn F5 lại lỗi?

Khi app đã chạy, router biết `/posts/12` là một trang chi tiết. Khi F5, trình duyệt yêu cầu server phục vụ trực tiếp `/posts/12`. Hosting tĩnh có thể không có tài nguyên ở địa chỉ đó.

**SPA fallback** là cấu hình phục vụ `index.html` cho các yêu cầu trang thuộc SPA chưa được một tài nguyên hoặc handler phù hợp xử lý, để app khởi động rồi router quyết định giao diện. Thường dùng **rewrite**, nghĩa là phục vụ tài nguyên khác nhưng vẫn giữ URL người dùng đang mở. [S22]

```text
GET /posts/12
       ↓
Hosting phục vụ index.html, URL vẫn là /posts/12
       ↓
JavaScript khởi động → React Router khớp /posts/:id
```

Không hiểu thành “mọi request đều trả HTML”. Tài nguyên JS/CSS/ảnh, endpoint API và các handler đặc biệt cần được xử lý đúng loại; một API trả HTML thay vì JSON là dấu hiệu cấu hình sai.

### 6.4. Ví dụ cấu hình theo môi trường

Các cấu hình dưới đây dành cho **SPA tĩnh ở gốc website**. Dự án có API/serverless functions, nhiều ứng dụng hoặc cấu hình URL riêng cần điều chỉnh theo hosting.

**Vite development:** dùng `npm run dev` trong bài học. Khi build, Vite tạo thư mục đầu ra `dist`; môi trường production vẫn cần cấu hình phục vụ đường dẫn của SPA. `vite preview` dùng xem trước bản build, không phải server production được khuyến nghị. [S27]

**Netlify:** tạo `public/_redirects`; với cấu hình Vite thông thường, file này được đưa vào thư mục build. Quy tắc fallback:

```text
/*  /index.html  200
```

Nếu có các quy tắc API/proxy khác, đặt và kiểm tra chúng trước fallback. Lưu ý: quy tắc **hosting** có cơ chế ưu tiên riêng; đừng suy từ thứ tự `Route` của React Router sang `_redirects`. [S22]

**Vercel:** tạo `vercel.json` ở gốc dự án:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

Đây là mẫu trong hướng dẫn Vite SPA của Vercel. Không chép đè các cấu hình API sẵn có; cần kiểm tra lại khi bật `cleanUrls` hoặc có quy tắc nâng cao. [S28]

**Nginx:** cấu hình tối giản cho một SPA tĩnh; thay đường dẫn `root` theo nơi chứa `dist`:

```nginx
server {
    listen 80;
    server_name example.com;
    root /var/www/blog/dist;
    index index.html;

    location /assets/ {
        try_files $uri =404;
    }

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

Ví dụ này không cấu hình backend hay HTTPS. Nếu cùng host có `/api/`, phải thêm handler API đúng nơi và không để API bị fallback về HTML. `try_files` kiểm tra các tài nguyên theo thứ tự rồi dùng đích dự phòng. [S29]

### 6.5. HashRouter — lựa chọn khi khó cấu hình fallback

**`HashRouter`** lưu phần địa chỉ route sau `#`, ví dụ `https://example.com/#/posts/12`. Fragment không được gửi lên server trong yêu cầu tài liệu, nên server không cần hiểu `/posts/12` để phục vụ trang gốc. [S30]

```jsx
// Trích đoạn thay phần Router trong main.jsx, không bọc thêm một Router thứ hai.
import { HashRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <HashRouter>
    <App />
  </HashRouter>,
);
```

Đây là lựa chọn đơn giản cho nhiều bài tập trên hosting tĩnh như GitHub Pages. Vẫn phải triển khai đúng `index.html` và đường dẫn tài nguyên. Dấu `#` dành cho routing làm URL khác với URL sạch và có thể ảnh hưởng nhu cầu liên kết/đánh chỉ mục; không cần đưa ra kết luận tuyệt đối “dùng hash là không thể SEO”.

### 6.6. Deploy trong thư mục con — phần mở rộng

Nếu ứng dụng nằm tại `/my-blog/`, phải phân biệt:

| Cấu hình | Vai trò |
| --- | --- |
| `base` của Vite | Tiền tố URL cho tài nguyên build |
| `basename` của BrowserRouter | Tiền tố chung của URL route |
| Fallback của hosting | Phục vụ entry HTML đúng vị trí |

Ví dụ với `BrowserRouter`:

```jsx
<BrowserRouter basename="/my-blog">
  <App />
</BrowserRouter>
```

```js
// Trích đoạn cấu hình Vite; giữ nguyên plugins đang dùng.
export default defineConfig({
  plugins: [react()],
  base: '/my-blog/',
});
```

Trong cấu hình route và `Link`, vẫn dùng đường dẫn theo gốc ứng dụng như `/posts`; không tự thêm tiền tố lần nữa. Với `HashRouter`, phần route nằm sau `#`, nhưng đường dẫn tài nguyên Vite vẫn phải đúng. [S08][S27][S30]

**Kiểm tra sau deploy:** mở trang chủ; bấm liên kết vào chi tiết; dán URL chi tiết vào tab mới; F5 tại chi tiết; thử một URL không tồn tại. Không chỉ kiểm tra đường đi từ trang chủ.

---

# Tầng 4 — Ghép thành ứng dụng và tự kiểm tra

<a id="phan-7"></a>

## Phần 7: Dự án cuối buổi — Blog nhiều màn hình

### 7.1. Sản phẩm cần đạt

Ứng dụng có trang chủ, giới thiệu, danh sách bài viết, chi tiết, tìm kiếm/phân trang bằng query, đăng nhập giả lập, dashboard, hồ sơ, trang quản trị, 403 và 404. Các trang dùng chung layout. URL cũ `/old-posts` chuyển sang `/posts`.

Dữ liệu bài viết lấy từ **JSONPlaceholder**, một API giả lập công khai phục vụ học tập. Danh sách và chi tiết cần mạng; đây không phải backend đăng nhập. Khi dịch vụ hoặc kết nối gặp lỗi, ứng dụng phải hiện thông báo thay vì để loading mãi. [S31]

**Cách bắt đầu:** dùng dự án Vite đang có hoặc giải nén `react-router-blog-demo.zip`. Với bản ZIP, mở terminal trong thư mục có `package.json` rồi chạy:

```bash
npm install
npm run dev
```

Để kiểm tra bản build trên máy của bạn:

```bash
npm run build
npm run preview
```

Mã nguồn dưới đây là các file hoàn chỉnh của ví dụ. Bản ZIP có thêm README, kiểm thử hàm tiện ích và cấu hình hosting. Không cần dùng `AuthContext`, `useAuth` hoặc một API đăng nhập chưa được định nghĩa.

> **Phạm vi kiểm chứng bản biên soạn:** các hàm tiện ích đã được kiểm thử bằng Node và mã JavaScript/JSX được kiểm tra cú pháp. Môi trường biên soạn không truy cập được npm registry nên chưa chạy cài dependency, Vite build hoặc kiểm thử giao diện end-to-end. Checklist ở mục 7.17 dùng để kiểm chứng các luồng trên máy người học.

### 7.2. Cấu trúc thư mục

```text
react-router-blog-demo/
├── index.html
├── package.json
├── vite.config.js
├── public/
│   └── _redirects                 # Tùy chọn khi triển khai Netlify
├── vercel.json                    # Tùy chọn khi triển khai Vercel
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── styles.css
    ├── api/
    │   └── posts.js
    ├── components/
    │   ├── Layout.jsx
    │   └── ProtectedRoute.jsx
    ├── hooks/
    │   └── useJson.js
    ├── pages/
    │   ├── StaticPages.jsx
    │   ├── Posts.jsx
    │   ├── PostDetail.jsx
    │   └── Login.jsx
    └── utils/
        ├── demoAuth.js
        └── url.js
```

`StaticPages.jsx` gom các trang ngắn để người mới không phải tạo quá nhiều file. Khi nội dung tăng lên, có thể tách mỗi trang thành một file riêng. Thư mục `hooks` dùng lại kiến thức custom hook ở buổi 4.

### 7.3. Các file khởi động

Dự án đã có Vite thì giữ cấu hình build đang chạy của bạn và bổ sung dependency router v7. Cấu hình dưới đây thuộc bản mẫu độc lập, chủ động chọn major Vite 7/React 19/React Router 7; không có ý nghĩa khẳng định đó là các bản mới nhất. Với bản ZIP, sau lần `npm install` đầu tiên nên lưu `package-lock.json` để các máy khác dùng cùng bộ dependency đã giải quyết.

**File `package.json`:**

```json
{
  "name": "react-router-blog-demo",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "node --test tests/*.test.js"
  },
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-router-dom": "^7.0.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^5.0.0",
    "vite": "^7.0.0"
  },
  "engines": {
    "node": "^20.19.0 || >=22.12.0"
  }
}
```

**File `vite.config.js`:**

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
```

**File `index.html`:**

```html
<!doctype html>
<html lang="vi">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Blog học React Router</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

**File `src/main.jsx`:**

```jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './styles.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
```

Trong `main.jsx`, chỉ có một router. `StrictMode` giúp phát hiện vấn đề trong quá trình phát triển; khi kiểm tra effect, React có thể chạy thêm chu kỳ setup/cleanup ở môi trường development. Vì vậy, hook gọi API phải có cleanup đúng, không xóa `StrictMode` chỉ để che request lặp. [S20]

`npm test` trong package mẫu chạy các file kiểm thử có sẵn trong ZIP; không cần chạy lệnh này để mở ứng dụng. Các file kiểm thử không được chép lại trong phần mã giao diện dưới đây.

### 7.4. App.jsx — nơi giữ user và cấu hình route

Đọc file theo hai phần: state/hàm xử lý người dùng ở trên; cây route ở dưới. `user` là dữ liệu chung cần truyền xuống, không phải API của router.

**File `src/App.jsx`:**

```jsx
import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Posts from './pages/Posts.jsx';
import PostDetail from './pages/PostDetail.jsx';
import Login from './pages/Login.jsx';
import {
  Home, About, Dashboard, Profile, Admin, Forbidden, NotFound,
} from './pages/StaticPages.jsx';
import { readDemoUser, writeDemoUser } from './utils/demoAuth.js';

export default function App() {
  const [user, setUser] = useState(readDemoUser);
  const [storageWarning, setStorageWarning] = useState('');

  function updateUser(nextUser) {
    setUser(nextUser);
    const saved = writeDemoUser(nextUser);
    setStorageWarning(saved ? '' :
      'Không cập nhật được localStorage. Trạng thái trong tab vẫn thay đổi; tải lại có thể đọc dữ liệu cũ.');
  }

  return (
    <>
      {storageWarning && <p role="status">{storageWarning}</p>}
      <Routes>
        <Route path="/" element={<Layout user={user} onLogout={() => updateUser(null)} />}>
          <Route index element={<Home />} />
          <Route path="posts" element={<Posts />} />
          <Route path="posts/:id" element={<PostDetail />} />
          <Route path="about" element={<About />} />
          <Route path="login" element={<Login user={user} onLogin={updateUser} />} />
          <Route path="403" element={<Forbidden />} />
          <Route path="old-posts" element={<Navigate to="/posts" replace />} />

          <Route element={<ProtectedRoute user={user} />}>
            <Route path="dashboard" element={<Dashboard user={user} />} />
            <Route path="profile" element={<Profile user={user} />} />
          </Route>
          <Route element={<ProtectedRoute user={user} allowedRoles={['admin']} />}>
            <Route path="admin" element={<Admin />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}
```

Tất cả route nằm dưới `Layout`, nên dashboard và trang quản trị cũng có menu chung. Hai nhóm `ProtectedRoute` đều nhận `user`; nhóm admin thêm `allowedRoles`.

### 7.5. Layout.jsx — khung giao diện

Menu dùng `NavLink`; tiêu đề Blog dùng `Link`; phần giữa dùng `Outlet`. Đăng xuất cập nhật state trước khi chuyển về trang chủ. Liên kết bỏ qua menu dùng `<a href="#main-content">` vì đây là liên kết fragment trong cùng trang, không cần biến mọi thẻ `<a>` thành `Link`.

**File `src/components/Layout.jsx`:**

```jsx
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';

export default function Layout({ user, onLogout }) {
  const navigate = useNavigate();

  function handleLogout() {
    onLogout();
    navigate('/', { replace: true });
  }

  return (
    <div className="layout">
      <a className="skip-link" href="#main-content">Đến nội dung chính</a>
      <header>
        <p className="brand"><Link to="/">Blog học React Router</Link></p>
        <nav aria-label="Điều hướng chính">
          <NavLink to="/">Trang chủ</NavLink>
          <NavLink to="/posts">Bài viết</NavLink>
          <NavLink to="/about">Giới thiệu</NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/profile">Hồ sơ</NavLink>
          <NavLink to="/admin">Quản trị</NavLink>
        </nav>
        {user ? (
          <p>
            Xin chào, {user.name} ({user.role}){' '}
            <button type="button" onClick={handleLogout}>Đăng xuất</button>
          </p>
        ) : <Link to="/login">Đăng nhập</Link>}
      </header>
      <main id="main-content" tabIndex={-1}>
        <Outlet />
      </main>
      <footer>Ứng dụng học tập. Đăng nhập và phân quyền chỉ là giả lập.</footer>
    </div>
  );
}
```

### 7.6. ProtectedRoute.jsx — kiểm soát nhánh con

Đây là cùng quy tắc đã học ở phần 5, được đưa lại để bạn có thể chép đầy đủ dự án.

**File `src/components/ProtectedRoute.jsx`:**

```jsx
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export default function ProtectedRoute({ user, allowedRoles }) {
  const location = useLocation();

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: {
            pathname: location.pathname,
            search: location.search,
            hash: location.hash,
          },
        }}
      />
    );
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/403" replace />;
  }

  return <Outlet />;
}
```

### 7.7. utils/url.js — kiểm tra đầu vào từ URL

`parsePage` đưa giá trị phân trang sai về 1; `isValidPostId` áp dụng quy tắc ID số nguyên dương của bài; `getReturnTo` giới hạn đích quay lại. Quyền vào đích đó vẫn do guard quyết định, không phải do hàm kiểm tra URL.

**File `src/utils/url.js`:**

```js
// URL là dữ liệu đầu vào: không mặc định rằng người dùng nhập đúng.
export function parsePage(value) {
  const page = Number(value);
  return Number.isSafeInteger(page) && page >= 1 ? page : 1;
}

export function isValidPostId(id) {
  return typeof id === 'string'
    && /^[1-9]\d*$/.test(id)
    && Number.isSafeInteger(Number(id));
}

// Chỉ nhận đích quay lại thuộc các trang được bảo vệ của bài học.
// Đây là quy tắc của ứng dụng mẫu, không phải API của React Router.
export function getReturnTo(from) {
  const fallback = '/dashboard';
  if (!from || typeof from !== 'object') return fallback;
  const allowedPaths = ['/dashboard', '/profile', '/admin'];
  if (!allowedPaths.includes(from.pathname)) return fallback;

  const search = typeof from.search === 'string'
    && from.search.startsWith('?') && !from.search.includes('#')
    ? from.search : '';
  const hash = typeof from.hash === 'string' && from.hash.startsWith('#')
    ? from.hash : '';

  return { pathname: from.pathname, search, hash };
}
```

### 7.8. utils/demoAuth.js — đọc/ghi người dùng giả lập

`try/catch` ngăn JSON hỏng hoặc storage bị chặn làm ứng dụng sập khi khởi động. Trả `false` khi ghi không thành công để `App` thông báo rõ. Dữ liệu trong localStorage có thể bị sửa; các kiểm tra hình dạng bên dưới chỉ giúp ví dụ ổn định, không tạo bảo mật thật. [S25]

**File `src/utils/demoAuth.js`:**

```js
// CHỈ GIẢ LẬP GIAO DIỆN. Đây không phải hệ thống xác thực thật.
const STORAGE_KEY = 'router-lesson-demo-user';

export function readDemoUser() {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null');
    if (
      value && typeof value.name === 'string'
      && value.name.trim() && ['member', 'admin'].includes(value.role)
    ) {
      return { name: value.name, role: value.role };
    }
  } catch {
    // JSON hỏng hoặc trình duyệt chặn storage: xem như chưa đăng nhập.
  }
  return null;
}

export function writeDemoUser(user) {
  try {
    if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    else localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch {
    // State React vẫn hoạt động trong tab hiện tại dù không lưu được.
    return false;
  }
}
```

### 7.9. Login.jsx — cập nhật user và quay lại đúng đích

Form chỉ yêu cầu tên hiển thị và vai trò giả lập. Không nhập mật khẩu thật. Khi submit hợp lệ, gọi `onLogin` rồi điều hướng với `replace`.

**File `src/pages/Login.jsx`:**

```jsx
import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { getReturnTo } from '../utils/url.js';

export default function Login({ user, onLogin }) {
  const [name, setName] = useState('Học viên');
  const [role, setRole] = useState('member');
  const location = useLocation();
  const navigate = useNavigate();
  const returnTo = getReturnTo(location.state?.from);

  if (user) return <Navigate to={returnTo} replace />;

  function handleSubmit(event) {
    event.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName) return;

    onLogin({ name: trimmedName, role });
    navigate(returnTo, { replace: true });
  }

  return (
    <section>
      <h1>Đăng nhập giả lập</h1>
      <p>Chọn vai trò để thử route. Không nhập mật khẩu hoặc tài khoản thật.</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Tên hiển thị</label>
        <input id="name" value={name} required maxLength={50}
          onChange={(event) => setName(event.target.value)} />

        <label htmlFor="role">Vai trò giả lập</label>
        <select id="role" value={role} onChange={(event) => setRole(event.target.value)}>
          <option value="member">Thành viên</option>
          <option value="admin">Quản trị viên</option>
        </select>
        <button type="submit" disabled={!name.trim()}>Đăng nhập</button>
      </form>
    </section>
  );
}
```

### 7.10. hooks/useJson.js — gom thao tác gọi API

Hook nhận một URL và trả về `status`, `data`, `error`. Đây là **custom hook của bài**, không phải hook của React Router.

| Status | Ý nghĩa |
| --- | --- |
| `idle` | Chưa có URL để gọi |
| `loading` | Đang chờ dữ liệu |
| `success` | Đã đọc JSON thành công |
| `not-found` | Server trả HTTP 404 |
| `error` | Lỗi mạng, lỗi HTTP khác hoặc không đọc được JSON |

Hook hủy request cũ khi đổi URL/rời trang. Trường `result.url` giúp không hiển thị nhầm dữ liệu cũ trong lần render ngay sau khi URL yêu cầu thay đổi. Đây là cách triển khai cho ví dụ, không phải yêu cầu bắt buộc phải dùng đúng hình dạng state này. [S20][S21]

**File `src/hooks/useJson.js`:**

```js
import { useEffect, useState } from 'react';

// null: không gửi request. url thay đổi: tải dữ liệu mới và hủy request cũ.
export default function useJson(url) {
  const [result, setResult] = useState({
    url: null, status: 'idle', data: null, error: '',
  });

  useEffect(() => {
    if (!url) return;

    const controller = new AbortController();
    setResult({ url, status: 'loading', data: null, error: '' });

    async function load() {
      try {
        const response = await fetch(url, { signal: controller.signal });

        if (response.status === 404) {
          if (!controller.signal.aborted) {
            setResult({ url, status: 'not-found', data: null, error: '' });
          }
          return;
        }
        if (!response.ok) throw new Error(`Máy chủ trả lỗi HTTP ${response.status}.`);

        const data = await response.json();
        if (!controller.signal.aborted) {
          setResult({ url, status: 'success', data, error: '' });
        }
      } catch (error) {
        if (controller.signal.aborted) return;
        setResult({
          url,
          status: 'error',
          data: null,
          error: error instanceof Error ? error.message : 'Không tải được dữ liệu.',
        });
      }
    }

    load();
    return () => controller.abort();
  }, [url]);

  // Không hiển thị dữ liệu của URL cũ trong lúc effect mới chưa chạy.
  if (!url) return { status: 'idle', data: null, error: '' };
  if (result.url !== url) return { status: 'loading', data: null, error: '' };
  return result;
}
```

### 7.11. api/posts.js — gom địa chỉ API

Tập trung URL ở một file giúp đổi nguồn dữ liệu mà không phải tìm nhiều chuỗi trong component. Dữ liệu JSONPlaceholder dùng cho việc đọc bài viết trong ví dụ. [S31]

**File `src/api/posts.js`:**

```js
const API_BASE = 'https://jsonplaceholder.typicode.com';

export const POSTS_URL = `${API_BASE}/posts`;
export const postUrl = (id) => `${POSTS_URL}/${encodeURIComponent(id)}`;
```

### 7.12. Posts.jsx — danh sách, tìm kiếm và phân trang

Bài tập tải danh sách rồi lọc/phân trang **trên client** để tập trung vào routing. Đây không phải cách tối ưu cho dữ liệu lớn; ở ứng dụng thật, API có thể nhận các tham số tương ứng.

`keyword` và `page` được đọc từ URL, nên liên kết có thể chia sẻ. `input` chỉ là bản nháp trong ô tìm kiếm. Số trang vượt số trang hiện có được chặn ở trang cuối khi hiển thị; ví dụ không tự ghi lại URL đã chuẩn hóa.

**File `src/pages/Posts.jsx`:**

```jsx
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import useJson from '../hooks/useJson.js';
import { POSTS_URL } from '../api/posts.js';
import { parsePage } from '../utils/url.js';

const PAGE_SIZE = 10;

export default function Posts() {
  const { status, data, error } = useJson(POSTS_URL);
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('q') ?? '';
  const [input, setInput] = useState(keyword);

  // Back/Forward thay đổi URL: ô nhập cũng phải trở về từ khóa tương ứng.
  useEffect(() => { setInput(keyword); }, [keyword]);

  function handleSearch(event) {
    event.preventDefault();
    const next = new URLSearchParams(searchParams);
    const trimmed = input.trim();
    if (trimmed) next.set('q', trimmed);
    else next.delete('q');
    next.delete('page'); // Tìm từ khóa mới thì bắt đầu lại từ trang 1.
    setInput(trimmed);
    setSearchParams(next);
  }

  function goToPage(page) {
    const next = new URLSearchParams(searchParams);
    next.set('page', String(page));
    setSearchParams(next);
  }

  if (status === 'loading') return <p role="status">Đang tải bài viết...</p>;
  if (status === 'error') return <p role="alert">Không tải được bài viết: {error}</p>;
  if (status === 'not-found') return <p role="alert">Không tìm thấy API danh sách.</p>;
  if (!Array.isArray(data)) return <p role="alert">Dữ liệu danh sách không hợp lệ.</p>;

  const filtered = data.filter((post) =>
    post && typeof post.id === 'number' && typeof post.title === 'string'
    && post.title.toLowerCase().includes(keyword.trim().toLowerCase()),
  );
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const page = Math.min(parsePage(searchParams.get('page')), pageCount);
  const visiblePosts = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <section>
      <h1>Bài viết</h1>
      <form onSubmit={handleSearch}>
        <label htmlFor="search">Tìm trong tiêu đề</label>
        <input id="search" type="search" value={input}
          onChange={(event) => setInput(event.target.value)} />
        <button type="submit">Tìm kiếm</button>
      </form>
      <p>Từ khóa đang áp dụng: {keyword || '(tất cả)'}</p>
      <p>{filtered.length} kết quả — trang {page}/{pageCount}</p>
      {visiblePosts.length === 0 ? <p>Không có bài viết phù hợp.</p> : (
        <ul>
          {visiblePosts.map((post) => (
            <li key={post.id}>
              <Link to={`/posts/${post.id}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
      )}
      <div className="pagination" aria-label="Phân trang">
        <button type="button" disabled={page <= 1}
          onClick={() => goToPage(page - 1)}>Trang trước</button>
        <button type="button" disabled={page >= pageCount}
          onClick={() => goToPage(page + 1)}>Trang sau</button>
      </div>
    </section>
  );
}
```

### 7.13. PostDetail.jsx — đọc params và hiển thị đủ trạng thái

Đầu vào sai định dạng không gọi API. ID hợp lệ nhưng không tồn tại hiện thông báo khác với lỗi mạng. Các hook được gọi trước các nhánh `return`, không gọi hook có điều kiện.

**File `src/pages/PostDetail.jsx`:**

```jsx
import { Link, useNavigate, useParams } from 'react-router-dom';
import useJson from '../hooks/useJson.js';
import { postUrl } from '../api/posts.js';
import { isValidPostId } from '../utils/url.js';

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const validId = isValidPostId(id);
  // Hook vẫn được gọi ở mọi lần render; null chỉ có nghĩa là không gửi request.
  const { status, data: post, error } = useJson(validId ? postUrl(id) : null);

  if (!validId) {
    return <section><h1>ID bài viết không hợp lệ</h1><Link to="/posts">Về danh sách</Link></section>;
  }
  if (status === 'loading') return <p role="status">Đang tải chi tiết...</p>;
  if (status === 'error') return <p role="alert">Không tải được bài viết: {error}</p>;
  if (status === 'not-found') {
    return <section><h1>Không tìm thấy bài viết</h1><Link to="/posts">Về danh sách</Link></section>;
  }
  if (!post || typeof post.title !== 'string' || typeof post.body !== 'string') {
    return <p role="alert">Dữ liệu chi tiết không hợp lệ.</p>;
  }

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <p><Link to="/posts">Về danh sách bài viết</Link></p>
      <button type="button" onClick={() => navigate(-1)}>Quay lại theo lịch sử</button>
      <p><small>Nút lịch sử có thể quay về website khác hoặc không có bước trước.</small></p>
    </article>
  );
}
```

Có hai lựa chọn riêng: `Link` đi chắc chắn tới danh sách và nút lùi theo lịch sử. Nút lịch sử được đặt tên đúng hành vi, không gọi là “Về danh sách”.

### 7.14. StaticPages.jsx — những trang còn lại

Các export dưới đây khớp đầy đủ với import trong `App.jsx`; không có component trang bị để trống hoặc chưa định nghĩa.

**File `src/pages/StaticPages.jsx`:**

```jsx
import { Link, useLocation } from 'react-router-dom';

export function Home() {
  return (
    <section>
      <h1>Trang chủ</h1>
      <p>Học cách dùng URL để mở đúng trang trong React.</p>
      <Link to="/posts">Xem danh sách bài viết</Link>
    </section>
  );
}

export function About() {
  return (
    <section>
      <h1>Giới thiệu</h1>
      <p>Bài thực hành dùng React Router v7 ở Declarative Mode.</p>
    </section>
  );
}

export function Dashboard({ user }) {
  return (
    <section>
      <h1>Dashboard</h1>
      <p>Chào {user.name}. Bạn đã qua bước kiểm tra đăng nhập.</p>
      <h2 id="saved">Khu vực đã lưu</h2>
      <p>Thử URL /dashboard?tab=saved#saved để kiểm tra đích quay lại.</p>
    </section>
  );
}

export function Profile({ user }) {
  return (
    <section>
      <h1>Hồ sơ</h1>
      <p>Tên: {user.name}</p>
      <p>Vai trò giả lập: {user.role}</p>
    </section>
  );
}

export function Admin() {
  return (
    <section>
      <h1>Quản trị</h1>
      <p>Route này yêu cầu vai trò admin trong dữ liệu giả lập.</p>
      <p>Không có dữ liệu nhạy cảm hoặc API quản trị thật trong bài tập.</p>
    </section>
  );
}

export function Forbidden() {
  return (
    <section>
      <h1>403 — Không có quyền truy cập</h1>
      <p>Bạn đã đăng nhập nhưng vai trò hiện tại không được mở trang này.</p>
      <Link to="/dashboard">Về Dashboard</Link>
    </section>
  );
}

export function NotFound() {
  const location = useLocation();
  return (
    <section>
      <h1>404 — Không tìm thấy trang</h1>
      <p>Không có trang tương ứng với <code>{location.pathname}</code>.</p>
      <Link to="/">Về trang chủ</Link>
    </section>
  );
}
```

### 7.15. styles.css — giao diện tối thiểu để quan sát

CSS chỉ hỗ trợ đọc và thao tác: menu đang active, form có khoảng cách, trạng thái focus dễ thấy. Không cần học thêm một thư viện giao diện để hoàn thành bài routing.

**File `src/styles.css`:**

```css
* { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, sans-serif; line-height: 1.65; }
.layout { max-width: 960px; margin: 0 auto; padding: 24px; }
header, footer { padding: 16px 0; }
header { border-bottom: 1px solid; }
footer { border-top: 1px solid; margin-top: 32px; }
main { min-height: 50vh; padding: 24px 0; }
nav, .pagination { display: flex; flex-wrap: wrap; gap: 16px; }
nav a.active { font-weight: 700; text-decoration-thickness: 3px; }
.brand { font-size: 1.3rem; font-weight: 700; }
form { display: grid; gap: 10px; max-width: 440px; margin-bottom: 24px; }
input, select, button { font: inherit; padding: 8px 12px; }
button { cursor: pointer; }
button:disabled { cursor: not-allowed; }
li { margin-bottom: 8px; }
:focus-visible { outline: 3px solid; outline-offset: 4px; }
.skip-link { position: absolute; left: -10000px; }
.skip-link:focus { position: static; }
```

### 7.16. Nối lại kiến thức của buổi 4

| Kiến thức cũ | Chỗ áp dụng |
| --- | --- |
| State và props | `App` giữ user; `Layout`, `Login`, guard nhận props |
| Effect có dependency | `useJson` tải lại khi URL API đổi |
| Cleanup | Hủy request cũ trong `useJson` |
| Conditional rendering | Phân biệt loading/error/not-found/success |
| Custom hook | `useJson` dùng lại ở danh sách và chi tiết |
| Form có controlled input | Login và ô tìm kiếm |

### 7.17. Các ca kiểm tra thủ công

Đây là các bước **cần tự chạy**, không phải tuyên bố rằng kiểm thử trình duyệt đã được thực hiện trong môi trường biên soạn.

| Thao tác | Kết quả mong đợi |
| --- | --- |
| Mở `/` rồi `/about` | Đổi nội dung; vẫn có layout |
| Mở `/posts`, bấm một bài | URL có ID cụ thể, mở chi tiết |
| Mở trực tiếp `/posts/1` | Có thể tải dữ liệu mà không cần đi qua danh sách |
| Mở `/posts/abc` | Báo ID sai; không gửi request chi tiết |
| Mở `/posts/999999` | Nếu API trả 404, hiện “Không tìm thấy bài viết” |
| Giả lập HTTP 500 hoặc chặn API | Hiện lỗi, không loading vô hạn |
| Tìm `sunt`, tiếp tục tìm `qui`, bấm Back | URL, ô nhập và kết quả cùng trở về từ khóa trước |
| Có query `q`, bấm trang sau | Giữ `q`, đổi `page` |
| Mở `/posts?page=-1` | Không tính vị trí phân trang âm |
| Chưa đăng nhập, mở `/dashboard?tab=saved#saved` | Tới login; đăng nhập xong giữ đủ path/query/hash |
| Chưa đăng nhập, mở `/admin` và chọn `member` | Đăng nhập xong tới `/403`, không vào quản trị |
| Đăng xuất, mở `/admin`, chọn `admin` | Vào trang quản trị |
| Sửa giá trị storage thành JSON hỏng rồi F5 | Không sập app; trở về chưa đăng nhập |
| Mở `/old-posts` | Chuyển sang `/posts` |
| Mở `/duong-dan-khong-ton-tai` | Có trang 404 trong layout |
| Sau deploy, F5 ở một URL chi tiết | Hosting vẫn phục vụ app |

Sau khi đã hiểu, bạn có thể thử đổi vị trí catch-all lên đầu và kiểm tra route cụ thể vẫn được chọn. Đây là một cách trực tiếp để kiểm chứng kiến thức ở mục 2.1.

---


<a id="phan-8"></a>

## Phần 8: Lỗi thường gặp và cách tìm nguyên nhân

### 8.1. Hook báo không nằm trong Router

Kiểm tra `main.jsx`: `App` có nằm dưới `BrowserRouter` hoặc router phù hợp không? Nếu component đang render router nhưng gọi hook trước khi trở thành con của router đó, hook vẫn chưa nhận được ngữ cảnh từ chính router nó sắp trả về. [S08]

Cũng kiểm tra chiều ngược lại: đừng bọc `BrowserRouter` cả ở `main.jsx` lẫn `App.jsx`.

### 8.2. useParams không có giá trị mong đợi

Kiểm tra **tên** và **vị trí**. Route `:postId` thì đọc `postId`, không đọc `id`; component phải nằm trong ngữ cảnh nhánh route tương ứng. Không kết luận mọi object params rỗng đều do thiếu `BrowserRouter`. [S19]

```jsx
// Trích đoạn: tên khớp nhau.
<Route path="posts/:postId" element={<PostDetail />} />
```

```jsx
// Bên trong PostDetail.
const { postId } = useParams();
```

### 8.3. Layout hiện nhưng trang con không hiện

Kiểm tra `Outlet` ở layout cha, vị trí route con và URL đang mở. Nếu mở đúng URL cha mà không có index route, phần nội dung con có thể rỗng dù layout vẫn hiện. [S11][S13]

### 8.4. Route con dùng path tuyệt đối không đúng cha

Ví dụ cha `/admin` có con `/settings` không tương ứng `/admin/settings`. Sửa thành `settings`, hoặc dùng một absolute path hợp lệ phù hợp toàn bộ cha. Đừng dạy quy tắc sai rằng mọi route con có `/` đều không hợp lệ. [S12]

### 8.5. Nhầm về vị trí path="*"

`*` không cần nằm cuối để các route cụ thể hoạt động. Khi một trang bị vào 404, hãy kiểm tra path, URL, cấu trúc route và `basename`; đừng chỉ di chuyển catch-all rồi coi đó là lời giải thích. [S03][S12]

### 8.6. Menu “Bài viết” active ở cả trang chi tiết

Đó thường là hành vi mong đợi của `NavLink to="/posts"`. Thêm `end` khi chỉ muốn active ở đúng trang danh sách. Riêng `/` được xử lý đặc biệt như mục 3.2. [S15]

### 8.7. Đăng nhập rồi vẫn bị chuyển về login

Đối chiếu dữ liệu mà guard thật sự nhận. Các lỗi thường có thể phát hiện bằng đọc code: không truyền `user`; chỉ sửa storage mà chưa cập nhật state; cập nhật nhầm state cục bộ; hoặc một guard lồng bên trong còn dùng giá trị đăng nhập khác.

Ví dụ của bài chỉ dùng một nguồn `user` ở `App`, truyền tường minh cho từng guard để giảm sự lệch trạng thái.

### 8.8. Chuyển hướng lặp

Không khẳng định mọi effect có `[navigate]` đều tạo vòng lặp. Cần tìm một chuỗi cập nhật/điều hướng liên tục lặp lại, ví dụ trang A chuyển B và B lại chuyển A, hoặc đặt `/login` bên trong guard yêu cầu đăng nhập. [S16][S20]

Với guard, ưu tiên trả `<Navigate />` theo điều kiện rõ ràng; đặt trang login và 403 bên ngoài vùng bị guard. Với effect, xác định đúng điều kiện chạy và dependencies thay vì xóa dependencies để giấu lỗi.

### 8.9. Back đổi URL nhưng ô tìm kiếm vẫn giữ từ khóa mới

`useState(searchParams.get('q'))` chỉ khởi tạo một lần. Đọc từ khóa từ URL và đồng bộ bản nháp bằng effect `[keyword]` như mục 4.8; không để hai nguồn dữ liệu tự trôi lệch nhau. [S20][S32]

### 8.10. Đổi page làm mất từ khóa hoặc bộ lọc

`setSearchParams({ page: '2' })` thay query. Sao chép `URLSearchParams`, sửa một giá trị, rồi gọi setter. Không sửa object hiện tại mà bỏ qua setter. [S23]

### 8.11. Request thất bại nhưng màn hình cứ “Đang tải”

Tìm đủ nhánh xử lý kết thúc request: thành công, HTTP không hợp lệ, lỗi mạng, dữ liệu không hợp lệ. Thêm kiểm tra `response.ok`; đừng chỉ `.then(res => res.json())`. Đồng thời tránh để response cũ ghi đè kết quả của URL mới. [S20][S21]

### 8.12. State mất sau khi đổi trang

Xác định state nằm ở component nào. Nếu component bị unmount, state cục bộ bị loại bỏ. Muốn nhớ bộ lọc để chia sẻ, đưa nó vào URL; muốn chia sẻ dữ liệu giữa các trang, cân nhắc đưa state lên cha còn tồn tại. Buổi 6 sẽ học Context cho trường hợp truyền props trở nên dài. [S04]

### 8.13. F5 ở URL chi tiết bị 404

Đó có thể là lỗi hosting chưa có SPA fallback, không phải bằng chứng route React sai. Xem Network để phân biệt request **document** thất bại với request **API** thất bại; xử lý theo phần 6. [S22][S28]

<a id="phan-9"></a>

## Phần 9: Bài tập thực hành

Bài tập đi từ ứng dụng tối thiểu đến Blog đầy đủ. Mỗi bài có tiêu chí hoàn thành để bạn kiểm tra được hành vi, không chỉ nhìn code “có vẻ đúng”.

### Bài 1: Ứng dụng ba trang

Tạo các trang Trang chủ (`/`), Giới thiệu (`/about`) và Liên hệ (`/contact`). Dùng một layout có menu `NavLink`, nội dung qua `Outlet` và một trang 404.

**Hoàn thành khi:** mỗi URL hiện đúng tiêu đề; Back/Forward hoạt động; URL không tồn tại có thông báo; chỉ có một `BrowserRouter`. Thử chuyển vị trí catch-all để xác nhận thứ tự không làm nó nuốt route cụ thể.

### Bài 2: Danh sách, chi tiết và bình luận

Dùng dữ liệu JSONPlaceholder để làm `/posts`, `/posts/:id` và `/posts/:id/comments`. Nguồn bình luận cho một bài có thể lấy theo endpoint tương ứng của dịch vụ. [S31]

```text
https://jsonplaceholder.typicode.com/posts
https://jsonplaceholder.typicode.com/posts/1
https://jsonplaceholder.typicode.com/posts/1/comments
```

**Hoàn thành khi:** có đủ loading/error/not-found/data; kiểm tra ID trước request; đổi ID tải lại nội dung; request cũ không ghi đè nội dung mới; có liên kết chắc chắn về danh sách.

**Gợi ý tổ chức:** nếu chi tiết và bình luận cần cùng một phần tiêu đề bài, cân nhắc `PostLayout` có `Outlet`. Nếu không cần khung chung, dùng các route phẳng cũng được; phải giải thích được lựa chọn.

### Bài 3: Tìm kiếm và phân trang qua query

Thêm form tìm kiếm, query `q`, query `page` và nút đổi trang. Dùng query đã áp dụng để tính danh sách, không dùng trực tiếp bản nháp đang gõ.

**Hoàn thành khi:** copy URL sang tab mới vẫn cho cùng bộ lọc; Back/Forward đồng bộ cả ô nhập và kết quả; đổi page không làm mất `q`; query sai được xử lý; tìm từ khóa mới quay về trang đầu.

**Câu hỏi mở rộng:** trường hợp nào nên thêm history entry, trường hợp nào nên `replace`?

### Bài 4: Đăng nhập giả lập và quay lại đúng trang

Tạo `/login`, `/profile` và guard. Giữ `user` ở `App`, truyền props xuống các nơi cần dùng. Có thể lưu user giả lập vào localStorage như dự án mẫu.

**Hoàn thành khi:** chưa đăng nhập thì mở hồ sơ sẽ vào login; đăng nhập xong trở về hồ sơ; tải lại vẫn xử lý đúng dữ liệu lưu; dữ liệu lưu hỏng không làm app sập; đăng xuất cập nhật giao diện ngay.

**Bắt buộc ghi chú trong README:** đây là giả lập giao diện; localStorage không cung cấp cơ chế phân quyền an toàn cho API.

### Bài 5: Blog hoàn chỉnh và quyền admin

Ghép phần 7, thêm chức năng bình luận của bài 2 và hoàn thiện bộ kiểm tra quyền. `member` không được xem `/admin`; `admin` được xem; người chưa đăng nhập được đưa đi đăng nhập trước.

**Hoàn thành khi:** thực hiện được các ca ở mục 7.17; giữ đủ query/hash khi quay lại sau login; không có route nào tham chiếu component hoặc hook chưa định nghĩa; mở URL trực tiếp sau deploy không lỗi document 404.

**Mở rộng, không bắt buộc:** thêm route tạo bài `/posts/new` để so sánh với `:id`; xây một màn hình thông báo lỗi thân thiện hơn; tự động hóa các ca kiểm tra với công cụ kiểm thử giao diện.

## Câu hỏi ôn tập và đáp án ngắn

| Câu hỏi | Đáp án |
| --- | --- |
| Route có phải một file HTML không? | Không. Trong bài này, đó là khai báo ánh xạ đường dẫn/nhánh giao diện. |
| `/posts/:id` khác `/posts/12` thế nào? | Một bên là mẫu, một bên là đường dẫn cụ thể. |
| `Routes` có luôn render đúng một component không? | Không. Một nhánh khớp có thể gồm nhiều layout và trang con. |
| Index route hiện khi nào? | Tại đúng URL của route cha, trong Outlet của cha. |
| `Link` có đảm bảo giữ mọi state không? | Không; còn phụ thuộc vòng đời và vị trí component. |
| Vì sao `NavLink /posts` active ở chi tiết? | Mặc định có thể khớp nhánh con; dùng `end` nếu không muốn vậy. |
| Query `page=2` có tự trở thành số 2 không? | Không, cần đọc, chuyển kiểu và kiểm tra. |
| `replace` xóa hết lịch sử không? | Không, nó thay entry hiện tại. |
| Guard React có bảo vệ API không? | Không, server phải kiểm tra quyền. |
| Giao diện “404” có tự đổi HTTP status không? | Không. |

## Checklist tự đánh giá

### Nền tảng

- [ ] Tôi phân biệt URL, pathname, segment, path pattern và route.
- [ ] Tôi đặt một router phù hợp ở gốc phần ứng dụng cần routing.
- [ ] Tôi giải thích được vì sao `/posts/new` cụ thể hơn `/posts/:id` khi cả hai cùng khớp.
- [ ] Tôi biết `*` không bắt buộc nằm cuối.
- [ ] Tôi dùng đúng index route, nested route và Outlet.
- [ ] Tôi phân biệt path tương đối với tuyệt đối, không học quy tắc cấm `/` sai.

### Điều hướng và URL

- [ ] Tôi chọn đúng Link, NavLink, useNavigate và Navigate.
- [ ] Tôi giải thích đúng `end`, kể cả ngoại lệ `/`.
- [ ] Tôi hiểu push, replace và rủi ro của `navigate(-1)`.
- [ ] Tôi đọc params đúng tên và kiểm tra dữ liệu đầu vào.
- [ ] Tôi cập nhật query mà không vô tình xóa các query khác.
- [ ] Tôi kiểm tra được Back/Forward với ô tìm kiếm.
- [ ] Tôi có fallback khi location state không tồn tại.

### Kiểm soát và triển khai

- [ ] Guard của tôi nhận cùng một nguồn trạng thái đăng nhập.
- [ ] Tôi phân biệt điều hướng UI với bảo mật API.
- [ ] Tôi giữ đủ pathname/search/hash khi quay lại sau login.
- [ ] Tôi phân biệt route không tồn tại với dữ liệu không tồn tại.
- [ ] Tôi xử lý response.ok, lỗi mạng và cleanup của request.
- [ ] Tôi hiểu SPA fallback, không trả HTML nhầm cho API.
- [ ] Tôi kiểm tra URL chi tiết bằng cách dán vào tab mới và nhấn F5.

## Bước tiếp theo — Buổi 6: React Context và state dùng chung

Trong bài này, `App` giữ `user`, rồi truyền xuống `Layout`, `Login`, guard và các trang. Khi số tầng hoặc số nơi cần đọc tăng lên, việc truyền props có thể dài và lặp.

Buổi 6 sẽ dùng chính nhu cầu đó để giới thiệu Context, Provider, `useContext` và custom hook `useAuth`. **Không cần học trước Context để chạy dự án hiện tại.** Context thay đổi cách chia sẻ state, không biến trạng thái đăng nhập giả lập thành một hệ thống xác thực thật.

## Tài liệu đối chiếu

Các mã `[Sxx]` trong bài chỉ đến nguồn dưới đây. Tài liệu React Router được cố định ở một bản v7 để tránh đọc nhầm hướng dẫn major khác. Các sơ đồ, luồng Blog, bài tập và cách tổ chức file là phần biên soạn cho giáo trình; không phải mẫu được chép nguyên từ các nguồn.

| Mã | Nguồn |
| --- | --- |
| [S01] | React Router v7 — Picking a Mode |
| [S02] | MDN — Single-page application |
| [S03] | React Router v7 — Navigating |
| [S04] | React — Preserving and Resetting State |
| [S05] | React Router v7 — Upgrading from v6; package và yêu cầu nền tảng |
| [S06] | Vite — Getting Started |
| [S07] | React Router v7 — URL Values |
| [S08] | React Router v7 — BrowserRouter |
| [S09] | React Router v7 — Routes |
| [S10] | React Router v7 — Route |
| [S11] | React Router v7 — Routing; nesting, index và dynamic segments |
| [S12] | Mã nguồn React Router v7.9.6 — utils.ts; flattenRoutes, rankRouteBranches, computeScore |
| [S13] | React Router v7 — Outlet |
| [S14] | React Router v7 — Link |
| [S15] | React Router v7 — NavLink; end và ngoại lệ đường dẫn gốc |
| [S16] | React Router v7 — useNavigate |
| [S17] | MDN — History.pushState |
| [S18] | React Router v7 — useLocation |
| [S19] | React Router v7 — useParams |
| [S20] | React — useEffect; tải dữ liệu, cleanup và dependencies |
| [S21] | MDN — Using the Fetch API |
| [S22] | Netlify — Rewrites and proxies; History pushState and SPAs |
| [S23] | React Router v7 — useSearchParams |
| [S24] | MDN — URLSearchParams |
| [S25] | OWASP — Authorization Cheat Sheet |
| [S26] | React Router v7 — Navigate |
| [S27] | Vite — Deploying a Static Site |
| [S28] | Vercel — Vite; SPA deep linking |
| [S29] | Nginx — try_files |
| [S30] | React Router v7 — HashRouter |
| [S31] | JSONPlaceholder — API phục vụ thử nghiệm và học tập |
| [S32] | React — useState; giá trị khởi tạo và setter |
| [S33] | MDN — localStorage |
| [S34] | MDN — storage event |

[S01]: https://reactrouter.com/7.9.6/start/modes "React Router v7 — Picking a Mode"
[S02]: https://developer.mozilla.org/en-US/docs/Glossary/SPA "MDN — Single-page application"
[S03]: https://reactrouter.com/7.9.6/start/declarative/navigating "React Router v7 — Navigating"
[S04]: https://react.dev/learn/preserving-and-resetting-state "React — Preserving and Resetting State"
[S05]: https://reactrouter.com/7.9.6/upgrading/v6 "React Router v7 — Upgrading from v6; package và yêu cầu nền tảng"
[S06]: https://vite.dev/guide/ "Vite — Getting Started"
[S07]: https://reactrouter.com/7.9.6/start/declarative/url-values "React Router v7 — URL Values"
[S08]: https://reactrouter.com/7.9.6/api/declarative-routers/BrowserRouter "React Router v7 — BrowserRouter"
[S09]: https://reactrouter.com/7.9.6/api/components/Routes "React Router v7 — Routes"
[S10]: https://reactrouter.com/7.9.6/api/components/Route "React Router v7 — Route"
[S11]: https://reactrouter.com/7.9.6/start/declarative/routing "React Router v7 — Routing; nesting, index và dynamic segments"
[S12]: https://raw.githubusercontent.com/remix-run/react-router/refs/tags/react-router%407.9.6/packages/react-router/lib/router/utils.ts "Mã nguồn React Router v7.9.6 — utils.ts; flattenRoutes, rankRouteBranches, computeScore"
[S13]: https://reactrouter.com/7.9.6/api/components/Outlet "React Router v7 — Outlet"
[S14]: https://reactrouter.com/7.9.6/api/components/Link "React Router v7 — Link"
[S15]: https://reactrouter.com/7.9.6/api/components/NavLink "React Router v7 — NavLink; end và ngoại lệ đường dẫn gốc"
[S16]: https://reactrouter.com/7.9.6/api/hooks/useNavigate "React Router v7 — useNavigate"
[S17]: https://developer.mozilla.org/en-US/docs/Web/API/History/pushState "MDN — History.pushState"
[S18]: https://reactrouter.com/7.9.6/api/hooks/useLocation "React Router v7 — useLocation"
[S19]: https://reactrouter.com/7.9.6/api/hooks/useParams "React Router v7 — useParams"
[S20]: https://react.dev/reference/react/useEffect "React — useEffect; tải dữ liệu, cleanup và dependencies"
[S21]: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch "MDN — Using the Fetch API"
[S22]: https://docs.netlify.com/manage/routing/redirects/rewrites-proxies/ "Netlify — Rewrites and proxies; History pushState and SPAs"
[S23]: https://reactrouter.com/7.9.6/api/hooks/useSearchParams "React Router v7 — useSearchParams"
[S24]: https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams "MDN — URLSearchParams"
[S25]: https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html "OWASP — Authorization Cheat Sheet"
[S26]: https://reactrouter.com/7.9.6/api/components/Navigate "React Router v7 — Navigate"
[S27]: https://vite.dev/guide/static-deploy "Vite — Deploying a Static Site"
[S28]: https://vercel.com/docs/frameworks/frontend/vite "Vercel — Vite; SPA deep linking"
[S29]: https://nginx.org/en/docs/http/ngx_http_core_module.html#try_files "Nginx — try_files"
[S30]: https://reactrouter.com/7.9.6/api/declarative-routers/HashRouter "React Router v7 — HashRouter"
[S31]: https://jsonplaceholder.typicode.com/ "JSONPlaceholder — API phục vụ thử nghiệm và học tập"
[S32]: https://react.dev/reference/react/useState "React — useState; giá trị khởi tạo và setter"
[S33]: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage "MDN — localStorage"
[S34]: https://developer.mozilla.org/en-US/docs/Web/API/Window/storage_event "MDN — storage event"

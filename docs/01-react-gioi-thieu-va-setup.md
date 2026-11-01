# ⚛️ Buổi 1: Giới thiệu React & Setup dự án đầu tiên

> **Mục tiêu buổi học**: Hiểu React là gì, nắm các khái niệm cơ bản (Component, JSX, Props, State), tự tay setup một dự án React chạy được trên máy, đọc hiểu cấu trúc thư mục do Vite tạo ra.

---

## 🤔 React là gì? Tại sao phải học?

### React là gì?

**React** (hay React.js) là một **thư viện JavaScript** mã nguồn mở dùng để **xây dựng giao diện người dùng (UI)**, đặc biệt là cho **web application một trang (SPA — Single Page Application)**. React được tạo ra bởi **Jordan Walke** tại **Facebook** vào năm **2011**, lần đầu công khai năm **2013**.

Khác với một framework "đủ thứ" như Angular hay Vue, React chỉ tập trung vào **một việc**: **render giao diện**. Mọi thứ khác (router, state management, form, HTTP) bạn tự chọn thư viện — điều này khiến React rất **linh hoạt** nhưng cũng dễ "lạc" nếu mới bắt đầu.

### Tại sao nên học React?


| Lý do                | Giải thích                                                                                                    |
| -------------------- | ------------------------------------------------------------------------------------------------------------- |
| **Việc làm nhiều**   | React là framework/library được săn đón nhất trên thị trường frontend (Stack Overflow Survey 2024: ~40% dev). |
| **Hệ sinh thái lớn** | Next.js, React Native, Remix, Gatsby, React Router, Redux, Zustand, TanStack Query...                         |
| **Component-based**  | Tư duy chia UI thành các mảnh nhỏ tái sử dụng — giống xếp LEGO.                                               |
| **Cộng đồng đông**   | Hỏi gì cũng có người trả lời trên Stack Overflow, Discord, Reddit.                                            |
| **Đồng hành với AI** | Khi prompt AI (Cursor, Copilot) cho tác vụ React, AI hiểu cực tốt vì code React rất phổ biến.                 |




### Ai đang dùng React?

Facebook, Instagram, WhatsApp Web, Netflix, Airbnb, Notion, Discord, Shopify, Uber Eats, TikTok (một số phần)... → Bạn thấy React ở **khắp nơi**.

---



## 🧠 Các khái niệm cốt lõi (phải nắm vững)

Đây là **5 viên gạch nền tảng** của React. Nắm vững 5 cái này, mọi thứ khác chỉ là biến thể.

### 1. 🧱 Component — "Viên gạch LEGO của giao diện"

**Component** là một **đoạn code tái sử dụng** mô tả một phần UI. Một trang web = cây các component lồng nhau.

```jsx
// Một component đơn giản — render ra nút "Click me"
function Button() {
  return <button>Click me</button>;
}
```

```jsx
// Một trang web = nhiều component lồng nhau
function App() {
  return (
    <div>
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
}
```

**2 loại component**:

- **Function Component** (khuyến nghị từ 2019): viết bằng function, gọn, dễ test.
- **Class Component** (cũ, đang lỗi thời): viết bằng class, dài dòng, ít dùng.

> 💡 **Buổi này và từ giờ trở đi, bạn CHỈ dùng Function Component.**



### 2. 📝 JSX — "HTML viết trong JavaScript"

**JSX** (JavaScript XML) là cú pháp đặc biệt của React cho phép bạn **viết HTML ngay trong file JavaScript**.

```jsx
const name = 'Khánh';
const element = <h1>Xin chào, {name}!</h1>;
```

**Quy tắc JSX cần nhớ**:

- **Phải có 1 element cha** bao bọc (hoặc dùng Fragment `<>...</>`).
- **Mọi tag phải đóng** (kể cả `<br />`, `<img />`, `<input />`).
- **Dùng** `className` **thay cho** `class` (vì `class` là từ khóa của JS).
- **Dùng** `camelCase` cho các thuộc tính có dấu gạch ngang: `onClick`, `onChange`, `tabIndex`...
- **Chèn biến JS bằng** `{...}`: `<h1>{user.name}</h1>`.

```jsx
// ✅ ĐÚNG
return (
  <div className="card">
    <img src={user.avatar} alt={user.name} />
    <h1>{user.name}</h1>
  </div>
);

// ❌ SAI: 2 element cùng cấp, không có cha
return (
  <h1>Hello</h1>
  <p>World</p>
);

// ✅ SỬA: bọc trong Fragment hoặc div
return (
  <>
    <h1>Hello</h1>
    <p>World</p>
  </>
);
```



### 3. 📦 Props — "Đối số truyền vào Component"

**Props** (viết tắt của *properties*) là cách **cha truyền dữ liệu xuống con**. Giống như đối số của function, nhưng cho component.

```jsx
// Component cha truyền props xuống component con
function Welcome(props) {
  return <h1>Xin chào, {props.name}!</h1>;
}

function App() {
  return <Welcome name="Khánh" age={25} />;
}
```

**Quy tắc Props**:

- Props là **một chiều** (cha → con, không ngược lại).
- Props là **read-only** (không được sửa trong component con).
- Có thể truyền bất kỳ kiểu dữ liệu nào: string, number, array, object, function...

```jsx
// Truyền nhiều kiểu dữ liệu
<UserCard
  name="Khánh"                        // string
  age={25}                             // number
  hobbies={['code', 'đọc sách']}       // array
  address={{ city: 'Hà Nội' }}          // object
  onDelete={() => alert('Deleted!')}    // function
/>
```



### 4. 🔄 State — "Bộ nhớ của Component"

**State** là dữ liệu **component tự quản lý** và **có thể thay đổi** theo thời gian. Khi state đổi → component **tự re-render**.

```jsx
import { useState } from 'react';

function Counter() {
  // [giá trị hiện tại, hàm cập nhật] = useState(giá trị khởi đầu)
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Bạn đã click {count} lần</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

**Quy tắc State** (rất quan trọng!):

- **KHÔNG được sửa state trực tiếp** (`count = count + 1` ❌ → `setCount(count + 1)` ✅).
- State thay đổi → React tự động cập nhật UI.
- State là **bất đồng bộ** (asynchronous) — đừng đọc state ngay sau khi gọi setter.



### 5. 🌳 Virtual DOM — "Bản sao ảo của DOM"

DOM thật (real DOM) rất **chậm** khi thao tác. React tạo một **bản sao ảo trong bộ nhớ** gọi là **Virtual DOM**. Khi state đổi:

1. React tạo Virtual DOM mới.
2. **So sánh** Virtual DOM mới với cũ (gọi là "diffing").
3. Chỉ **cập nhật phần thật sự thay đổi** trong DOM thật (gọi là "reconciliation").

→ Kết quả: UI cập nhật **nhanh** mà không cần bạn quan tâm cơ chế bên trong.

> 💡 **Buổi đầu bạn KHÔNG cần hiểu sâu cơ chế này** — chỉ cần biết "React thông minh, nó chỉ sửa phần cần sửa thôi".

---



## 🛠️ Setup dự án React với Vite

Có nhiều cách setup React, nhưng từ 2023 trở đi, Vite là lựa chọn **số 1** vì **siêu nhanh** và được React team khuyến nghị.

### Yêu cầu môi trường

Trước khi bắt đầu, đảm bảo máy bạn đã có:

- **Node.js** ≥ 18 ([Tải tại nodejs.org](https://nodejs.org))
- **npm** (đi kèm khi cài Node.js) hoặc **pnpm** / **yarn**
- Một trình soạn thảo: **VS Code** (khuyến nghị) hoặc **Cursor**

Kiểm tra nhanh trong terminal:

```bash
node -v    # phải >= v18
npm -v     # phải >= 9
```



### Tạo dự án với Vite (3 bước)

```bash
# Bước 1: Tạo dự án (chọn "react", KHÔNG chọn "react-ts" nếu bạn mới)
npm create vite@latest my-react-app -- --template react

# Bước 2: Di chuyển vào thư mục dự án
cd my-react-app

# Bước 3: Cài package và chạy thử
npm install
npm run dev
```

Sau khi chạy `npm run dev`, terminal sẽ in ra URL kiểu:

```
  VITE v5.x.x  ready in 350 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.x.x:5173/
```

Mở trình duyệt vào `http://localhost:5173/` → Bạn sẽ thấy trang React mặc định với logo Vite + React quay. **Chúc mừng, dự án đã chạy! 🎉**

### Cài Extension cho VS Code (khuyến nghị)


| Extension                         | Tác dụng                                    |
| --------------------------------- | ------------------------------------------- |
| **ES7+ React/Redux/React-Native** | Gõ `rfce` → tạo function component tự động. |
| **Prettier**                      | Format code tự động khi save.               |
| **ESLint**                        | Báo lỗi cú pháp realtime.                   |
| **Tailwind CSS IntelliSense**     | Nếu dùng Tailwind (buổi sau sẽ học).        |


> 💡 Nếu dùng **Cursor**, bạn KHÔNG cần extension riêng — AI đã hỗ trợ sẵn.

---



## 📂 Cấu trúc dự án React (đọc để hiểu)

Sau khi `npm create vite@latest`, bạn sẽ có cấu trúc thế này:

```
my-react-app/
├── node_modules/          ⚠️ Thư mục chứa package đã cài (KHÔNG sửa, không commit)
├── public/                📁 Chứa file tĩnh (favicon, ảnh logo)
│   └── vite.svg
├── src/                   📁 CODE CHÍNH CỦA BẠN — 90% thời gian làm việc ở đây
│   ├── assets/            📁 Ảnh, font, icon dùng trong component
│   │   └── react.svg
│   ├── App.jsx            ⭐ Component gốc của ứng dụng
│   ├── App.css            🎨 CSS cho App
│   ├── index.css          🎨 CSS toàn cục (reset, font, biến CSS)
│   └── main.jsx           🚀 ĐIỂM KHỞI ĐẦU — nơi React bắt đầu render
├── .eslintrc.cjs          📝 Cấu hình ESLint (kiểm tra code)
├── .gitignore             📝 File Git bỏ qua (node_modules, dist...)
├── index.html             🌐 File HTML duy nhất — React sẽ inject vào đây
├── package.json           📦 Danh sách package + script
├── package-lock.json      📦 Khóa version package (commit cả file này)
├── README.md              📝 Tài liệu dự án
└── vite.config.js         ⚙️ Cấu hình Vite (build tool)
```



### Giải thích từng file quan trọng



#### 🌐 `index.html` — "Cửa sổ vào ứng dụng"

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React</title>
  </head>
  <body>
    <!-- ⭐ DIV NÀY là nơi toàn bộ React UI sẽ được render vào -->
    <div id="root"></div>

    <!-- ⭐ Dòng này nạt file JS chính — điểm khởi đầu của React -->
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

**Điểm chú ý**:

- Đây là file HTML **DUY NHẤT** trong SPA.
- Thẻ `<div id="root"></div>` là "lỗ đen" — React sẽ inject toàn bộ UI vào đây.
- **Không viết HTML trực tiếp trong** `<body>` — mọi thứ render qua React.



#### 🚀 `src/main.jsx` — "Điểm khởi đầu"

```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// 2️⃣ Render <App /> vào thẻ div#root
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

**Điểm chú ý**:

- File này chạy **đầu tiên** khi trang web load.
- `ReactDOM.createRoot(...).render(<App />)` — đây là cú pháp React 18+.
- `<React.StrictMode>` bọc ngoài giúp phát hiện lỗi tiềm ẩn (chỉ chạy ở dev mode).



#### ⭐ `src/App.jsx` — "Component gốc"

```jsx
import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR.
        </p>
      </div>
    </>
  );
}

export default App;
```

**Điểm chú ý**:

- `App` là **component gốc** — mọi component khác sẽ được import và lồng vào đây.
- File này có sẵn `useState` để bạn thử click thấy state thay đổi.
- `export default App` — cho phép file khác `import App from './App.jsx'`.



#### 📦 `package.json` — "Sổ danh bạ của dự án"

```json
{
  "name": "my-react-app",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",                  // Chạy dev server (http://localhost:5173)
    "build": "vite build",          // Build production ra thư mục dist/
    "preview": "vite preview",      // Xem thử bản build
    "lint": "eslint ."               // Kiểm tra code style
  },
  "dependencies": {
    "react": "^18.3.1",             // Thư viện React
    "react-dom": "^18.3.1"          // React để render ra DOM trình duyệt
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.x",  // Plugin Vite để hiểu JSX
    "vite": "^5.x"                  // Build tool siêu nhanh
  }
}
```

**Các lệnh npm quan trọng**:

- `npm run dev` — chạy server dev (auto-reload khi sửa code).
- `npm run build` — build code ra thư mục `dist/` để deploy.
- `npm run preview` — xem thử bản build ở local.



#### 📁 `src/index.css` — "CSS toàn cục"

```css
/* Reset CSS + style áp dụng cho toàn bộ app */
:root {
  font-family: Inter, system-ui, sans-serif;
  line-height: 1.5;
  font-weight: 400;
  color-scheme: light dark;
}

body {
  margin: 0;
  min-height: 100vh;
}
```

---



## 🚀 Chương trình "Hello React" đầu tiên

Sau khi setup xong, hãy **xoá hết code mẫu** trong `src/App.jsx` và viết lại từ đầu để hiểu rõ cấu trúc:

```jsx
// src/App.jsx
function App() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>🎉 Chào React!</h1>
      <p>Đây là component đầu tiên của tôi.</p>
    </div>
  );
}

export default App;
```

Save lại → trình duyệt **tự động reload** (Hot Module Replacement - HMR). Bạn sẽ thấy dòng "Chào React!" hiện ra. 

**Bước tiếp theo**, thử thêm một component con và props:

```jsx
// src/App.jsx
// 1️⃣ Định nghĩa component con
function Greeting(props) {
  return <h2>Xin chào, {props.name}! 👋</h2>;
}

// 2️⃣ Component cha dùng component con
function App() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>🎉 Chào React!</h1>
      <Greeting name="Khánh" />
      <Greeting name="Minh" />
      <Greeting name="Lan" />
    </div>
  );
}

export default App;
```

**Bước nâng cao hơn nữa**, thêm state:

```jsx
// src/App.jsx
import { useState } from 'react';

function Greeting(props) {
  return <h2>Xin chào, {props.name}! 👋</h2>;
}

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ marginTop: '1rem' }}>
      <p>Bạn đã click {count} lần</p>
      <button onClick={() => setCount(count + 1)}>
        Click để tăng
      </button>
      <button onClick={() => setCount(0)} style={{ marginLeft: '0.5rem' }}>
        Reset
      </button>
    </div>
  );
}

function App() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>🎉 Chào React!</h1>
      <Greeting name="Khánh" />
      <Counter />
    </div>
  );
}

export default App;
```

→ Trình duyệt sẽ hiển thị greeting + nút bấm. Mỗi lần bấm, con số tăng lên. **Bạn vừa học xong Component + Props + State!**

---



## 📝 Bài tập thực hành



### Bài 1: Tạo dự án React đầu tiên (15 phút)

1. Chạy `npm create vite@latest my-first-react -- --template react`.
2. `cd my-first-react && npm install && npm run dev`.
3. Mở `http://localhost:5173/` xem trang Vite mặc định.
4. Mở `src/App.jsx`, sửa tiêu đề `"Vite + React"` thành tên của bạn.
5. Quan sát trình duyệt **tự động cập nhật** (HMR).



### Bài 2: Tự viết lại từ đầu (20 phút)

Xoá hết code trong `src/App.jsx`, viết lại component hiển thị:

- Tiêu đề lớn: `"Học React cùng [tên bạn]"`.
- Component `<UserCard name="..." age={...} />` hiển thị 3 lần với data khác nhau.
- Component `<Toggle />` có 1 nút bấm để bật/tắt đèn (dùng state `useState`).

**Gợi ý code**:

```jsx
import { useState } from 'react';

function UserCard(props) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', margin: '0.5rem' }}>
      <h3>{props.name}</h3>
      <p>Tuổi: {props.age}</p>
    </div>
  );
}

function Toggle() {
  const [isOn, setIsOn] = useState(false);
  return (
    <button onClick={() => setIsOn(!isOn)}>
      {isOn ? '💡 Đèn đang BẬT' : '🌑 Đèn đang TẮT'}
    </button>
  );
}
```



### Bài 3: Thử thách "Hiển thị danh sách" (15 phút)

Tạo component `<FruitsList />` nhận vào mảng `['Táo', 'Cam', 'Chuối', 'Xoài']` qua props, render ra danh sách `<ul>`.

```jsx
function FruitsList(props) {
  return (
    <ul>
      {props.items.map((fruit, index) => (
        <li key={index}>{fruit}</li>
      ))}
    </ul>
  );
}

function App() {
  const fruits = ['Táo', 'Cam', 'Chuối', 'Xoài'];
  return <FruitsList items={fruits} />;
}
```

> ⚠️ Lưu ý quan trọng: `key` **prop** là bắt buộc khi render danh sách. Buổi sau sẽ học kỹ hơn.

---



## ✅ Checklist tự đánh giá

- [ ] Hiểu React là gì, khác gì framework (Angular, Vue).
- [ ] Biết 5 khái niệm cốt lõi: Component, JSX, Props, State, Virtual DOM.
- [ ] Đã cài Node.js ≥ 18 và npm ≥ 9.
- [ ] Đã tạo được dự án React bằng Vite.
- [ ] Đã chạy `npm run dev` thành công ở `http://localhost:5173`.
- [ ] Đã sửa được code trong `App.jsx` và thấy trình duyệt tự reload.
- [ ] Đã viết được component `<Greeting>` dùng props.
- [ ] Đã viết được component `<Counter>` dùng `useState`.
- [ ] Đã đọc hiểu cấu trúc thư mục dự án (biết `main.jsx` vs `App.jsx` khác nhau ở đâu).

---



## 🐛 Lỗi thường gặp & Cách sửa



### Lỗi 1: Quên import `useState`

```jsx
// ❌ Lỗi: ReferenceError: useState is not defined
function Counter() {
  const [count, setCount] = useState(0);  // ← quên import
  return ...;
}

// ✅ Sửa: Thêm dòng import
import { useState } from 'react';
```



### Lỗi 2: Sửa state trực tiếp

```jsx
// ❌ SAI — UI không cập nhật
count = count + 1;
items.push('Táo mới');

// ✅ ĐÚNG — dùng setter và tạo mảng mới
setCount(count + 1);
setItems([...items, 'Táo mới']);
```



### Lỗi 3: Quên `key` khi render danh sách

```jsx
// ❌ Cảnh báo: Warning: Each child in a list should have a unique "key" prop
{items.map((item) => <li>{item}</li>)}

// ✅ ĐÚNG
{items.map((item, index) => <li key={index}>{item}</li>)}
```



### Lỗi 4: Quên đóng tag JSX

```jsx
// ❌ Lỗi: Adjacent JSX elements must be wrapped in an enclosing tag
return <h1>Hello</h1><p>World</p>;

// ✅ ĐÚNG — bọc trong Fragment hoặc div
return (
  <>
    <h1>Hello</h1>
    <p>World</p>
  </>
);
```



### Lỗi 5: Port 5173 bị chiếm

```
Error: Port 5173 is already in use
```

**Sửa**: Đóng app khác đang chiếm port, hoặc chạy port khác:

```bash
npm run dev -- --port 3000
```



### Lỗi 6: Sửa `App.jsx` mà trình duyệt không reload

- Kiểm tra terminal xem có lỗi không.
- Thử refresh thủ công (Ctrl+R / Cmd+R).
- Kiểm tra console trình duyệt (F12 → tab Console).

---



## 📚 Tài liệu nên đọc thêm


| Nguồn                    | Link                                          | Ghi chú                                                       |
| ------------------------ | --------------------------------------------- | ------------------------------------------------------------- |
| **React.dev (official)** | [react.dev/learn](https://react.dev/learn)    | Tài liệu chính thức, mới nhất, rất hay.                       |
| **Vite Guide**           | [vitejs.dev/guide](https://vitejs.dev/guide/) | Hiểu sâu về build tool.                                       |
| **JavaScript.info**      | [javascript.info](https://javascript.info)    | Ôn lại JS cơ bản (array, object, function, destructuring...). |


---



## ➡️ Bước tiếp theo

Sau khi nắm vững buổi 1, sang **Buổi 2 — JSX nâng cao & Conditional Rendering** để học:

- Render có điều kiện (`if`, `ternary`, `&&`).
- Render danh sách đúng cách (tại sao cần `key`).
- Tách component nhỏ hơn.
- Style trong React (CSS Module, inline style).


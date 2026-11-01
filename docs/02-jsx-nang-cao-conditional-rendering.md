# ⚛️ Buổi 2: JSX nâng cao & Conditional Rendering

> **Mục tiêu buổi học**: Nắm vững kỹ thuật viết JSX nâng cao, render danh sách đúng cách (hiểu vì sao cần `key`), dùng conditional rendering với 3 cú pháp phổ biến, tách component nhỏ để code dễ bảo trì, biết 3 cách style trong React.

---

## 📋 Tóm tắt buổi 1 (nếu bạn quên)


| Khái niệm       | Hiểu đơn giản                                               |
| --------------- | ----------------------------------------------------------- |
| **Component**   | Khối UI tái sử dụng, viết bằng function                     |
| **JSX**         | Viết HTML trong JavaScript                                  |
| **Props**       | Đối số truyền từ component cha → con (một chiều, read-only) |
| **State**       | Bộ nhớ component, đổi → component tự re-render              |
| **Virtual DOM** | React chỉ sửa phần DOM thật sự thay đổi                     |


> Nếu bạn **chưa vững** 5 khái niệm trên, hãy đọc lại `01-react-gioi-thieu-va-setup.md` trước khi sang buổi 2.

---



## 🧠 Tư duy của buổi 2

Buổi 1 bạn đã học cách tạo component **tĩnh** (không thay đổi). Buổi 2, bạn sẽ học:

- **Render có điều kiện** — hiển thị UI khác nhau tuỳ trạng thái (đăng nhập/chưa, đang tải/xong...).
- **Render danh sách** — từ 1 component hiển thị 1 món → hiển thị 1000 món.
- **Tách component** — file `App.jsx` đừng để 500 dòng, hãy chia nhỏ ra.
- **Style trong React** — 3 cách phổ biến (inline, CSS file, CSS Module).

---



## 🧩 Phần 1: JSX nâng cao



### 1.1. JSX có thể chứa biểu thức JavaScript

Nhắc lại: bất cứ thứ gì bên trong `{}` trong JSX đều là **biểu thức JavaScript hợp lệ**.

```jsx
function App() {
  const a = 5;
  const b = 10;
  const user = { name: 'Khánh', age: 25 };
  const fruits = ['Táo', 'Cam', 'Chuối'];

  return (
    <div>
      {/* Tính toán */}
      <p>{a + b}</p>                          {/* 15 */}

      {/* Truy cập thuộc tính object */}
      <p>Xin chào, {user.name}!</p>            {/* Xin chào, Khánh! */}

      {/* Gọi hàm */}
      <p>{user.name.toUpperCase()}</p>         {/* KHÁNH */}

      {/* Toán tử 3 ngôi */}
      <p>{user.age >= 18 ? 'Trưởng thành' : 'Vị thành niên'}</p>

      {/* Nối mảng */}
      <p>{fruits.join(' - ')}</p>              {/* Táo - Cam - Chuối */}
    </div>
  );
}
```

> ⚠️ **KHÔNG thể** đặt **câu lệnh** (statement) bên trong `{}`, chỉ đặt được **biểu thức** (expression).

```jsx
// ❌ SAI — đây là câu lệnh, không phải biểu thức
{ if (count > 0) { return 'Có'; } }

// ✅ ĐÚNG — dùng toán tử 3 ngôi (là biểu thức)
{ count > 0 ? 'Có' : 'Không' }
```

**Cách phân biệt nhanh**: biểu thức luôn **trả về 1 giá trị**, còn câu lệnh thì không (if, for, while, switch...).

---



### 1.2. Fragment — bọc nhiều element mà không thêm thẻ HTML

Nếu 1 component return về nhiều element cùng cấp, bạn phải bọc chúng. Có 2 cách:

```jsx
// Cách 1: dùng <div> (thêm 1 thẻ div thừa vào DOM)
return (
  <div>
    <h1>Tiêu đề</h1>
    <p>Nội dung</p>
  </div>
);

// Cách 2: dùng Fragment <>...</> (KHÔNG thêm thẻ thừa)
return (
  <>
    <h1>Tiêu đề</h1>
    <p>Nội dung</p>
  </>
);
```

**Khi nào nên dùng Fragment?** Khi bạn không muốn "bẩn" DOM bằng 1 thẻ `<div>` không có ý nghĩa.

```jsx
// Ví dụ thực tế: bảng HTML không cho phép <div> lẫn vào
return (
  <table>
    <tbody>
      {rows.map(row => (
        // ❌ SAI: <div> không hợp lệ trong <tbody>
        // <tr>...</tr>

        // ✅ ĐÚNG: dùng Fragment để gom nhiều <td>
        <Fragment key={row.id}>
          <td>{row.name}</td>
          <td>{row.age}</td>
        </Fragment>
      ))}
    </tbody>
  </table>
);
```

> 💡 Khi dùng Fragment có `key`, phải import: `import { Fragment } from 'react'`. Còn dùng `<>...</>` thì không cần.

---



### 1.3. Children Prop — "Lỗ đen" truyền nội dung vào component

Khi bạn đặt nội dung giữa thẻ mở và thẻ đóng của 1 component, nội dung đó sẽ được truyền vào `props.children`.

```jsx
// Component Card nhận children
function Card(props) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem' }}>
      {props.children}   {/* "Lỗ đen" - chỗ children chui vào */}
    </div>
  );
}

// Sử dụng
function App() {
  return (
    <div>
      <Card>
        <h2>Tiêu đề thẻ</h2>
        <p>Nội dung bên trong thẻ</p>
      </Card>

      <Card>
        <button>Bấm tôi</button>
      </Card>
<Card>
<h2>Tiêu đề thẻ</h2>
        <p>Nội dung bên trong thẻ</p>
        <button>Bấm tôi</button>
      </Card>
    </div>
  );
}
```

> 💡 `children` là 1 prop đặc biệt, rất hay dùng để tạo component "vỏ bọc" (Wrapper, Modal, Sidebar, Layout...).

---



## 🔀 Phần 2: Conditional Rendering (Render có điều kiện)

Trong thực tế, UI thường **thay đổi theo trạng thái**. Hãy xem 3 tình huống thực tế trước khi học 4 cách code:

**Tình huống 1 — Trạng thái đăng nhập thay đổi** (UI khác hoàn toàn):

```jsx
function Header({ user, isLoggedIn }) {
  return (
    <header>
      <h1>My App</h1>
      {isLoggedIn ? (
        <div>
          <img src={user.avatar} alt={user.name} />
          <span>Xin chào, {user.name}</span>
          <button>Đăng xuất</button>
        </div>
      ) : (
        <button>Đăng nhập</button>
      )}
    </header>
  );
}
```

→ Khi `isLoggedIn = true` hiện avatar + nút "Đăng xuất"; khi `false` chỉ hiện nút "Đăng nhập".

**Tình huống 2 — Có thông báo hay không** (chỉ thêm/bớt 1 phần nhỏ):

```jsx
function Notification({ unreadCount }) {
  return (
    <div>
      <h1>Inbox</h1>
      {unreadCount > 0 && (
        <p>🔔 Bạn có {unreadCount} tin nhắn chưa đọc</p>
      )}
    </div>
  );
}
```

→ Có tin nhắn mới thì hiện badge, không có thì header "Inbox" vẫn bình thường.

**Tình huống 3 — Đang tải dữ liệu** (3 trạng thái: loading / error / success):

```jsx
function UserProfile({ user, isLoading, error }) {
  if (isLoading) return <p>⏳ Đang tải...</p>;
  if (error) return <p>❌ Có lỗi: {error}</p>;
  if (!user) return <p>Không tìm thấy user</p>;
  return <h1>Xin chào, {user.name}!</h1>;
}
```

→ Mỗi trạng thái trả về 1 UI khác nhau, code rõ ràng, dễ đọc.

Có **4 cách** phổ biến để viết những UI trên:

---



### 2.1. Toán tử 3 ngôi (ternary) — `condition ? A : B`

```jsx
function Greeting({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn ? (
        <h1>Chào mừng bạn quay lại! 👋</h1>
      ) : (
        <h1>Vui lòng đăng nhập 🔐</h1>
      )}
    </div>
  );
}
```

**Khi nào dùng**: cần render **một trong hai** khối UI (có `else`).

---



### 2.2. Toán tử `&&` — render hoặc không render gì cả

```jsx
function Notification({ hasMessage }) {
  return (
    <div>
      <h1>Inbox</h1>
      {hasMessage && <p>🔔 Bạn có tin nhắn mới!</p>}
    </div>
  );
}
```

**Cơ chế**:

- `hasMessage = true` → `{true && <p>...</p>}` → render `<p>`
- `hasMessage = false` → `{false && <p>...</p>}` → render `false` → React bỏ qua

**Khi nào dùng**: chỉ cần render **hoặc không** (không có `else`).

> ⚠️ **Bẫy phổ biến**: đừng để `&&` trả về số `0` hoặc chuỗi rỗng `""` — React sẽ render luôn cái đó.

```jsx
// ❌ SAI: khi count = 0, React sẽ in "0" ra màn hình
{count && <p>Có {count} tin nhắn</p>}

// ✅ ĐÚNG: đổi sang ternary
{count > 0 ? <p>Có {count} tin nhắn</p> : null}

// ✅ HOẶC ép kiểu
{!!count && <p>Có {count} tin nhắn</p>}
```

---



### 2.3. `if/else` bên ngoài JSX (early return)

Khi logic phức tạp, tách `if/else` ra ngoài cho dễ đọc:

```jsx
function UserProfile({ user }) {
  if (!user) {
    return <p>Đang tải...</p>;
  }

  if (user.isBlocked) {
    return <p>🚫 Tài khoản đã bị khoá</p>;
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <p>Email: {user.email}</p>
    </div>
  );
}
```

> 💡 Đây là cách được **khuyến nghị** khi có nhiều nhánh điều kiện.

---



### 2.4. Biến + `let`/`const` để code JSX gọn hơn

```jsx
function App({ user, isLoading, error }) {
  // Tính toán trước, JSX chỉ hiển thị
  let content;
  if (isLoading) {
    content = <p>⏳ Đang tải...</p>;
  } else if (error) {
    content = <p>❌ Lỗi: {error}</p>;
  } else if (!user) {
    content = <p>Không có dữ liệu</p>;
  } else {
    content = <h1>Xin chào, {user.name}!</h1>;
  }

  return <div className="container">{content}</div>;
}
```

---



### 📊 So sánh 4 cách


| Cách                   | Cú pháp               | Dùng khi                              |
| ---------------------- | --------------------- | ------------------------------------- |
| Ternary `? :`          | `cond ? A : B`        | 1 trong 2 UI (có else)                |
| Toán tử `&&`           | `cond && A`           | Có UI hoặc không                      |
| `if/else` early return | `if (...) return ...` | Nhiều nhánh, logic phức tạp           |
| Biến + JSX             | `let content = ...`   | JSX phức tạp, cần tách logic ra ngoài |


---



## 📋 Phần 3: Render danh sách (Lists) — Phần quan trọng nhất buổi này



### 3.1. Vấn đề: render 1000 món hàng

Nếu có 1 mảng 1000 sản phẩm, bạn **không thể** viết 1000 lần `<ProductCard />`. Thay vào đó, dùng `.map()`:

```jsx
function App() {
  const products = [
    { id: 1, name: 'iPhone 15', price: 21000000 },
    { id: 2, name: 'Samsung Galaxy', price: 18000000 },
    { id: 3, name: 'Xiaomi Redmi', price: 5000000 },
  ];

  return (
    <div>
      <h1>🛒 Sản phẩm</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - {product.price.toLocaleString()}đ
          </li>
        ))}
      </ul>
    </div>
  );
}
```

---



### 3.2. ⭐ `key` prop — Tại sao BẮT BUỘC phải có?

Khi render danh sách, React **bắt buộc** bạn truyền `key` cho mỗi item. Nếu không, console sẽ warning:

```
Warning: Each child in a list should have a unique "key" prop.
```



#### Tại sao React cần `key`?

Hãy tưởng tượng danh sách học sinh trong lớp:

- **Không có** `key`: cô giáo phải đọc tên từng đứa để biết ai là ai.
- **Có** `key` **(mã số)**: cô giáo nhìn mã số là biết ngay "đây là bạn An".

`key` giúp React **nhận diện item nào đã thay đổi, item nào đã bị xoá, item nào mới thêm vào** → tối ưu việc update DOM.

```jsx
// ❌ SAI: dùng index làm key (CHỈ dùng khi list tĩnh, không thêm/xoá/sắp xếp)
{items.map((item, index) => <li key={index}>{item}</li>)}

// ✅ ĐÚNG: dùng id duy nhất từ data
{items.map(item => <li key={item.id}>{item.name}</li>)}
```



#### Khi nào được dùng `index` làm key?

Chỉ khi danh sách **không bao giờ thay đổi** (không thêm, xoá, sắp xếp). Ví dụ: danh sách tỉnh thành, danh sách tháng trong năm.

---



### 3.3. Tách component cho từng item

Trong ví dụ trên, JSX trong `.map()` đang **lồng** trong `App`. Nếu danh sách phức tạp, JSX sẽ phình to. Hãy tách ra:

```jsx
// ✅ TÁCH COMPONENT — code sạch hơn nhiều
function ProductCard({ product }) {
  return (
    <li>
      <h3>{product.name}</h3>
      <p>{product.price.toLocaleString()}đ</p>
    </li>
  );
}

function ProductList({ products }) {
  return (
    <ul>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </ul>
  );
}

function App() {
  const products = [
    { id: 1, name: 'iPhone 15', price: 25000000 },
    { id: 2, name: 'Samsung Galaxy', price: 18000000 },
  ];
  return <ProductList products={products} />;
}
```

> 💡 Quy tắc vàng: **Nếu 1 đoạn JSX có logic riêng hoặc dài quá 5 dòng → tách thành component**.

---



## 🪓 Phần 4: Tách component — Kỹ năng quan trọng nhất



### 4.1. Tại sao phải tách?

Hãy tưởng tượng `App.jsx` là **1 căn phòng bừa bộn**:

- 1 cái giường
- 1 bàn ăn
- 1 bàn làm việc
- 1 tủ quần áo
- 1 kệ sách
- ... 500 đồ đạc khác

→ Tìm đồ rất khó, dọn phòng rất mệt.

**Tách component** = chia thành nhiều phòng: phòng ngủ, bếp, làm việc... → mỗi phòng chỉ chứa đồ của nó.

### 4.2. Khi nào nên tách?

Tách khi:

- ✅ Component **dài quá 50-100 dòng**
- ✅ Có **1 đoạn UI lặp lại** nhiều lần
- ✅ Có **logic riêng** (state, hàm xử lý) tách bạch với phần còn lại
- ✅ UI này có thể **tái sử dụng** ở chỗ khác



### 4.3. Cách tổ chức file

Có 2 phong cách phổ biến:

#### Cách 1: Mỗi component 1 file (khuyến nghị cho dự án lớn)

```
src/
├── App.jsx
├── components/
│   ├── Header.jsx
│   ├── ProductCard.jsx
│   ├── ProductList.jsx
│   └── Footer.jsx
```

```jsx
// src/components/ProductCard.jsx
function ProductCard({ product }) {
  return (
    <li>
      <h3>{product.name}</h3>
      <p>{product.price.toLocaleString()}đ</p>
    </li>
  );
}

export default ProductCard;
```

```jsx
// src/App.jsx
import ProductCard from './components/ProductCard';

function App() {
  const products = [{ id: 1, name: 'iPhone', price: 25000000 }];
  return (
    <ul>
      {products.map(p => <ProductCard key={p.id} product={p} />)}
    </ul>
  );
}
```



#### Cách 2: Nhiều component trong 1 file (dự án nhỏ)

```jsx
// src/components/Product.jsx
export function ProductCard({ product }) { /* ... */ }
export function ProductList({ products }) { /* ... */ }
```



### 4.4. Quy tắc đặt tên component

- **PascalCase**: `ProductCard`, `UserProfile`, `LoginForm` (chữ cái đầu VIẾT HOA).
- **Đặt tên theo chức năng**, không theo kiểu dáng: `LoginForm` (✅) thay vì `BlueForm` (❌).
- **Component = 1 danh từ**: Button, Card, Header, Modal, Dropdown...

> ⚠️ Nếu tên viết thường (`productCard`), React sẽ nghĩ đó là **thẻ HTML** và không tìm thấy → lỗi.

---



## 🎨 Phần 5: 3 cách Style trong React



### Cách 1: Inline Style (viết trực tiếp)

```jsx
function Button() {
  return (
    <button
      style={{
        backgroundColor: 'blue',
        color: 'white',
        padding: '0.5rem 1rem',
        borderRadius: '0.25rem',
      }}
    >
      Bấm tôi
    </button>
  );
}
```

**Lưu ý quan trọng**:

- Truyền vào là **object**, không phải string.
- Thuộc tính CSS dùng **camelCase**: `background-color` → `backgroundColor`, `font-size` → `fontSize`.
- Giá trị số mặc định là `px`. Muốn đơn vị khác thì ghi rõ: `padding: '1rem'`.

**Ưu điểm**: nhanh, không cần file riêng. **Nhược điểm**: không có pseudo-class (`:hover`), không có media query, khó tái sử dụng.

---



### Cách 2: CSS File (import thẳng)

```jsx
// src/components/Button.jsx
import './Button.css';

function Button({ children }) {
  return <button className="btn">{children}</button>;
}
```

```css
/* src/components/Button.css */
.btn {
  background-color: blue;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
}

.btn:hover {
  background-color: darkblue;
}
```

**Lưu ý**: dùng `className` (không phải `class`).

**Ưu điểm**: đầy đủ tính năng CSS, quen thuộc. **Nhược điểm**: style là **global** — class `btn` ở component A có thể "đè" lên class `btn` ở component B.

---



### Cách 3: CSS Module (khuyến nghị ⭐)

Tự động **đổi tên class** để không bị đụng độ:

```jsx
// src/components/Button.jsx
import styles from './Button.module.css';

function Button({ children }) {
  return <button className={styles.btn}>{children}</button>;
}
```

```css
/* src/components/Button.module.css */
.btn {
  background-color: blue;
  color: white;
  padding: 0.5rem 1rem;
}

.btn:hover {
  background-color: darkblue;
}
```

Sau khi build, class `.btn` sẽ tự động thành `.Button_btn__a1b2c` → không bao giờ đụng độ với component khác.

**Vite đã hỗ trợ CSS Module sẵn**, chỉ cần đặt tên file là `.module.css` là chạy.

---



### 📊 So sánh 3 cách style


| Cách       | Ưu điểm                      | Nhược điểm                         | Khi nào dùng              |
| ---------- | ---------------------------- | ---------------------------------- | ------------------------- |
| Inline     | Nhanh, không cần file        | Không có `:hover`, khó tái sử dụng | Style nhỏ, chỉ dùng 1 lần |
| CSS File   | Đầy đủ tính năng             | Class global, dễ đụng độ           | Dự án nhỏ, ít component   |
| CSS Module | Không đụng độ, scope tự động | Tên class dài hơn                  | Dự án lớn (khuyến nghị) ⭐ |


---



## 🚀 Buổi 2 — Thực hành cuối cùng: Todo List Mini

Kết hợp tất cả kiến thức buổi 2 để làm 1 ứng dụng nhỏ:

```jsx
// src/App.jsx
import { useState } from 'react';
import './App.css';

function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className={todo.done ? 'done' : ''}>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
      />
      <span>{todo.text}</span>
      <button onClick={() => onDelete(todo.id)}>🗑️</button>
    </li>
  );
}

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Học React buổi 2', done: false },
    { id: 2, text: 'Làm bài tập', done: false },
  ]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos([
      ...todos,
      { id: Date.now(), text: input, done: false },
    ]);
    setInput('');
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(t =>
      t.id === id ? { ...t, done: !t.done } : t
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  return (
    <div className="app">
      <h1>📝 Todo List</h1>

      <div className="input-row">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Thêm việc cần làm..."
        />
        <button onClick={addTodo}>Thêm</button>
      </div>

      {todos.length === 0 ? (
        <p>🎉 Không có việc gì cần làm!</p>
      ) : (
        <ul>
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          ))}
        </ul>
      )}

      <p>Còn {todos.filter(t => !t.done).length} việc chưa xong</p>
    </div>
  );
}

export default App;
```

**Bạn vừa dùng**:

- ✅ JSX với biểu thức
- ✅ Conditional rendering (`? :`, kiểm tra `length === 0`)
- ✅ Render danh sách với `key={todo.id}`
- ✅ Tách component `TodoItem`
- ✅ Truyền hàm qua props (`onToggle`, `onDelete`)

---



## 📝 Bài tập thực hành



### Bài 1: Conditional Rendering (15 phút)

Tạo component `<UserStatus user={...} />`:

- Nếu `user === null` → hiển thị "Đang tải..."
- Nếu `user.isOnline` → hiển thị "🟢 Online"
- Nếu `!user.isOnline` → hiển thị "⚪ Offline"

```jsx
function UserStatus({ user }) {
  if (user === null) return <p>Đang tải...</p>;
  return <p>{user.isOnline ? '🟢 Online' : '⚪ Offline'}</p>;
}
```

---



### Bài 2: Render danh sách (20 phút)

Tạo component `<StudentList students={...} />` hiển thị danh sách học sinh:

```jsx
const students = [
  { id: 1, name: 'An', score: 8 },
  { id: 2, name: 'Bình', score: 6 },
  { id: 3, name: 'Châu', score: 9 },
];
```

Yêu cầu:

- Tách component `<StudentCard />` riêng.
- Mỗi card hiển thị tên + điểm.
- Nếu điểm ≥ 8 → tô màu xanh; < 8 → tô màu đỏ (dùng inline style hoặc className).

---



### Bài 3: Tách component (20 phút)

Tách `App.jsx` của buổi 1 (component `Counter`) thành 3 file:

- `src/components/Counter.jsx` — chứa logic đếm
- `src/components/Greeting.jsx` — chứa component chào
- `src/App.jsx` — chỉ chứa logic ghép 2 component trên

---



### Bài 4: Thử thách Todo List (45 phút) ⭐

Sao chép code Todo List ở phần trên, sau đó **tự thêm** các tính năng:

- Sắp xếp: việc chưa xong lên đầu, việc xong xuống cuối.
- Đếm số việc đã xong.
- Nút "Xoá tất cả việc đã xong".
- Lưu vào `localStorage` để F5 không mất (gợi ý: dùng `useEffect` — buổi sau học).

---



## ✅ Checklist tự đánh giá

- [ ] Biết viết biểu thức JS trong `{}` của JSX.
- [ ] Phân biệt được **biểu thức** và **câu lệnh** trong JSX.
- [ ] Hiểu khi nào dùng Fragment thay cho div.
- [ ] Biết `props.children` là gì.
- [ ] Dùng được 4 cách conditional rendering.
- [ ] Biết tại sao `&&` bị lỗi với số `0`.
- [ ] Render được danh sách bằng `.map()`.
- [ ] Giải thích được tại sao `key` BẮT BUỘC và dùng `id` thay vì `index`.
- [ ] Biết khi nào nên tách component.
- [ ] Tách được component ra file riêng.
- [ ] Phân biệt được 3 cách style: inline, CSS file, CSS Module.
- [ ] Làm được Todo List mini ở cuối bài.

---



## 🐛 Lỗi thường gặp & Cách sửa



### Lỗi 1: Dùng `if/else` bên trong JSX

```jsx
// ❌ SAI
return (
  <div>
    {if (isLoggedIn) { return 'Chào'; }}
  </div>
);

// ✅ ĐÚNG — dùng ternary hoặc tách ra ngoài
return (
  <div>
    {isLoggedIn ? 'Chào' : 'Vui lòng đăng nhập'}
  </div>
);
```

---



### Lỗi 2: Quên `key` khi render danh sách

```jsx
// ❌ Warning: Each child in a list should have a unique "key" prop
{users.map(u => <UserCard user={u} />)}

// ✅ ĐÚNG
{users.map(u => <UserCard key={u.id} user={u} />)}
```

---



### Lỗi 3: Dùng `index` làm `key` khi danh sách có thay đổi

```jsx
// ❌ SAI: thêm/xoá item sẽ gây bug lạ về UI
{items.map((item, index) => <Item key={index} item={item} />)}

// ✅ ĐÚNG: dùng id ổn định từ data
{items.map(item => <Item key={item.id} item={item} />)}
```

---



### Lỗi 4: Component tên viết thường

```jsx
// ❌ SAI: React tưởng là thẻ HTML
function productCard() { return <div>...</div>; }

// ✅ ĐÚNG: PascalCase
function ProductCard() { return <div>...</div>; }
```

---



### Lỗi 5: `&&` trả về số `0` hoặc chuỗi rỗng

```jsx
// ❌ Hiển thị "0" trên màn hình
{count && <p>Có {count} tin nhắn</p>}

// ✅ ĐÚNG
{count > 0 && <p>Có {count} tin nhắn</p>}
```

---



### Lỗi 6: Sửa state mảng/object trực tiếp

```jsx
// ❌ SAI: React không nhận biết state đã đổi
todos.push(newTodo);
user.name = 'Tên mới';

// ✅ ĐÚNG: tạo mảng/object mới
setTodos([...todos, newTodo]);
setUser({ ...user, name: 'Tên mới' });
```

---



### Lỗi 7: Inline style sai cú pháp

```jsx
// ❌ SAI: dùng background-color (có dấu gạch ngang)
<button style={{ background-color: 'blue' }}>...</button>

// ❌ SAI: truyền string thay vì object
<button style="background-color: blue">...</button>

// ✅ ĐÚNG
<button style={{ backgroundColor: 'blue' }}>...</button>
```

---



## 📚 Tài liệu nên đọc thêm


| Nguồn                                 | Link                                                                                   | Ghi chú                                    |
| ------------------------------------- | -------------------------------------------------------------------------------------- | ------------------------------------------ |
| **React.dev — Conditional Rendering** | [react.dev/learn/conditional-rendering](https://react.dev/learn/conditional-rendering) | Giải thích chính thức, có ví dụ trực quan. |
| **React.dev — Rendering Lists**       | [react.dev/learn/rendering-lists](https://react.dev/learn/rendering-lists)             | Đọc kỹ phần "Why does React need keys?".   |
| **CSS Modules**                       | [github.com/css-modules/css-modules](https://github.com/css-modules/css-modules)       | Hiểu sâu cơ chế scope class.               |


---



## ➡️ Bước tiếp theo

Sau khi nắm vững buổi 2, sang **Buổi 3 — Sự kiện (Events) & Form** để học:

- Xử lý sự kiện click, change, submit trong React.
- Controlled component vs Uncontrolled component.
- Làm form đăng nhập / đăng ký.
- Truyền dữ liệu từ component con lên cha (lifting state up).


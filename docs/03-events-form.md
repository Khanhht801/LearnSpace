# ⚛️ Buổi 3: Sự kiện (Events) & Form trong React

> **Mục tiêu buổi học**: Nắm vững cách xử lý sự kiện (click, change, submit) trong React, hiểu Controlled Component là gì và tại sao quan trọng, làm được form đăng nhập/đăng ký hoàn chỉnh, biết cách truyền dữ liệu từ component con lên cha bằng kỹ thuật "Lifting State Up".

---

## 📋 Tóm tắt buổi 2


| Khái niệm                   | Hiểu đơn giản                                                       |
| --------------------------- | ------------------------------------------------------------------- |
| **Biểu thức JS trong** `{}` | JSX cho phép chèn biểu thức JS, KHÔNG chèn câu lệnh (if, for)       |
| **Fragment** `<>...</>`     | Bọc nhiều element mà không thêm thẻ HTML thừa                       |
| **Props.children**          | Nội dung giữa thẻ mở/đóng component → tự truyền vào `children`      |
| **Conditional Rendering**   | Render UI khác nhau theo trạng thái (ternary, `&&`, if/else)        |
| **Render danh sách**        | `.map()` + `key` (BẮT BUỘC) — dùng `id` ổn định, không dùng `index` |
| **Tách component**          | File > 50 dòng hoặc UI lặp lại → tách ra                            |
| **Style**                   | Inline (nhanh), CSS file (quen), CSS Module (khuyến nghị)           |


> Nếu chưa vững 7 khái niệm trên, hãy đọc lại `02-jsx-nang-cao-conditional-rendering.md` trước.

---



## 🧠 Tư duy của buổi 3

Buổi 1 tạo component **tĩnh** (không thay đổi). Buổi 2 thêm **điều kiện & danh sách**. Buổi 3, component sẽ **tương tác với người dùng**:

- **Sự kiện (Events)** — khi người dùng click, gõ phím, submit form thì React làm gì?
- **Controlled Component** — cách React "kiểm soát" giá trị của input/select/textarea.
- **Lifting State Up** — khi 2 component con cần chia sẻ dữ liệu, đặt state ở **cha chung** của chúng.
- **Form thực tế** — đăng nhập, đăng ký, tìm kiếm, bình luận...

> 💡 Đây là buổi **cực kỳ quan trọng** — 80% ứng dụng React là form và tương tác.

---



## 📚 Phần 0: Kiến thức nền tảng quan trọng

Trước khi đi vào sự kiện và form, cần nắm vững **4 khái niệm cốt lõi** sau. Đây là "xương sống" của mọi tương tác trong React.

### 0.1. Luồng dữ liệu một chiều (Unidirectional Data Flow)

Trong React, dữ liệu **chỉ đi 1 chiều**: từ **cha → con** qua **props**. Component con **không thể** sửa trực tiếp props của cha.

```jsx
function Parent() {
  const [name, setName] = useState('An');

  return <Child name={name} />;  // Cha truyền name xuống con
}

function Child({ name }) {
  return <p>Xin chào, {name}</p>;  // Con chỉ ĐỌC, không sửa được
}
```

**Vậy làm sao con "báo" lại cho cha?** → Con nhận thêm **1 hàm setter** từ cha, khi cần cập nhật thì gọi hàm đó.

```jsx
function Parent() {
  const [name, setName] = useState('An');

  return <Child name={name} onNameChange={setName} />;
}

function Child({ name, onNameChange }) {
  return (
    <input
      value={name}
      onChange={(e) => onNameChange(e.target.value)}  // Con gọi hàm cha đưa
    />
  );
}
```

> 💡 **Quy tắc vàng**: Mọi thay đổi state đều phải đi qua **hàm setter**. Không bao giờ gán `name = 'Bình'` trực tiếp.

---



### 0.2. Tính bất biến của State (Immutability)

State trong React được xem là **bất biến** (immutable) — nghĩa là **không được sửa trực tiếp**, mà phải **tạo ra bản sao mới**.

```jsx
// ❌ SAI: sửa trực tiếp — React không phát hiện thay đổi
const [user, setUser] = useState({ name: 'An', age: 20 });
user.name = 'Bình';   // ❌ Sửa trực tiếp — KHÔNG re-render
setUser(user);        // ❌ Truyền cùng 1 object — React thấy giống cũ

// ✅ ĐÚNG: tạo object mới
setUser({ ...user, name: 'Bình' });  // ✅ Object mới → React re-render
```

**Tương tự với mảng**:

```jsx
// ❌ SAI
items.push(newItem);                  // Sửa mảng cũ
setItems(items);                      // React thấy cùng tham chiếu

// ✅ ĐÚNG
setItems([...items, newItem]);        // Tạo mảng mới
setItems(items.filter(x => x.id !== id));  // Xoá bằng filter
setItems(items.map(x => x.id === id ? { ...x, done: true } : x));  // Cập nhật
```

**Tại sao phải vậy?**


| Lý do                         | Giải thích                                                                                      |
| ----------------------------- | ----------------------------------------------------------------------------------------------- |
| **React so sánh tham chiếu**  | React dùng `===` (Object.is) để xem state có đổi không. Sửa trực tiếp thì tham chiếu vẫn giống. |
| **Tránh bug ngầm**            | Nếu cho phép sửa trực tiếp, nhiều nơi cùng trỏ vào 1 object → khó debug.                        |
| **Hỗ trợ tính năng nâng cao** | `useState` so sánh được → dùng được với `useMemo`, `useEffect`, `Redux`...                      |


> ⚠️ **Bẫy cực phổ biến**: gọi `setState` mà truyền vào cùng 1 tham chiếu → component **không re-render**.

---



### 0.3. Vòng đời re-render khi state đổi

Khi gọi hàm setter, React thực hiện **3 bước** theo thứ tự:

```
Bước 1: GỌI SETTER
   setCount(count + 1)
        ↓
Bước 2: REACT CẬP NHẬT STATE
   count = 1  (giá trị mới)
        ↓
Bước 3: RE-RENDER COMPONENT
   Toàn bộ function Counter() chạy lại
   → return JSX mới
   → React so sánh với JSX cũ (diffing)
   → Chỉ sửa phần DOM thật sự thay đổi
        ↓
Bước 4: TRÌNH DUYỆT VẼ LẠI
   Người dùng thấy số mới
```

**Hệ quả quan trọng**:

- Mỗi lần `setState` → component chạy lại **toàn bộ function** từ đầu.
- Code **bên trong component** phải **idempotent** (hạy cnhiều lần cho cùng kết quả).
- Không gọi API, không thay đổi DOM trực tiếp trong body component.

```jsx
// ❌ SAI: gọi API ngay trong body component → gọi lại mỗi lần render
function Bad() {
  fetch('/api/users');  // Gọi lại 100 lần nếu re-render 100 lần
  return <p>...</p>;
}

// ✅ ĐÚNG: dùng useEffect (buổi 4) hoặc gọi trong event handler
function Good() {
  const handleClick = () => {
    fetch('/api/users');  // Chỉ gọi khi bấm nút
  };
  return <button onClick={handleClick}>Tải data</button>;
}
```

---



### 0.4. Batching (Gộp nhiều setState) — React 18+

Trong React 18, nhiều lệnh `setState` trong cùng 1 sự kiện được **gộp lại (batched)** → chỉ **re-render 1 lần** thay vì nhiều lần.

```jsx
function Counter() {
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);

  const handleClick = () => {
    setCount(count + 1);   // Cập nhật count
    setFlag(!flag);         // Cập nhật flag
    // → React 18 chỉ re-render 1 LẦN, không phải 2 lần
  };

  return (
    <div>
      <p>Count: {count}</p>
      <p>Flag: {String(flag)}</p>
      <button onClick={handleClick}>Bấm</button>
    </div>
  );
}
```

**Trước React 18**: 2 lần setState → 2 lần re-render (chậm).
**React 18+**: 2 lần setState → 1 lần re-render (nhanh hơn).

> 💡 Trong buổi 3, sẽ dùng cơ chế batching này rất nhiều — đặc biệt khi cập nhật nhiều field trong form.

---



### 0.5. Sơ đồ tổng thể: Component tương tác hoạt động ra sao?

```
    Người dùng                       React                              Trình duyệt
   ┌──────────┐                    ┌──────────┐                       ┌──────────┐
   │ Bấm nút  │ ──── onClick ───> │  Handler │                       │          │
   │ Gõ phím  │ ──── onChange ──> │  chạy    │                       │          │
   │ Submit   │ ──── onSubmit ──> │          │                       │          │
   └──────────┘                    │ setState │ ──> re-render ──────>│ Vẽ lại  │
                                   │          │                       │ DOM      │
                                   └──────────┘                       └──────────┘
```

**Quy trình đầy đủ**:

1. **Người dùng** tương tác (click, gõ, submit).
2. **React** bắt sự kiện (nhờ Synthetic Event System).
3. **Handler** được gọi → gọi hàm setter.
4. **State** được cập nhật (bất biến, batching).
5. **Component** re-render.
6. **Trình duyệt** vẽ lại phần DOM thay đổi.

> 🎯 Mọi phần trong buổi 3 (sự kiện, controlled component, lifting state up) đều xoay quanh quy trình này.

---



## 🖱️ Phần 1: Xử lý sự kiện trong React



### 📖 Lý thuyết: Sự kiện là gì và tại sao React cần xử lý khác HTML?

**Khái niệm**: Sự kiện (Event) là tín hiệu từ người dùng hoặc trình duyệt gửi đến code JavaScript. Khi người dùng click, gõ phím, di chuột, submit form... trình duyệt sẽ **phát ra sự kiện** → code JS nhận và xử lý.

**Tại sao cần học kỹ phần này?**

Trong HTML thuần, sự kiện được viết inline và thực thi ngay:

```html
<!-- HTML thuần: gọi hàm toàn cục -->
<button onclick="handleClick()">Bấm</button>
```

Nhược điểm:

- ❌ Hàm `handleClick` phải là biến toàn cục → khó quản lý, dễ đụng tên.
- ❌ Không tận dụng được module, import, scope của JS hiện đại.
- ❌ Cú pháp `onclick` (lowercase) khác với mọi thuộc tính khác trong JS (`addEventListener` dùng `'click'`).
- ❌ Không có cơ chế thống nhất giữa các trình duyệt.

**Cách React giải quyết**: Tách sự kiện khỏi HTML, gắn vào JSX với cú pháp **camelCase**, nhận **tham chiếu hàm** (không phải chuỗi). Cách này cho phép:

- ✅ Truyền hàm từ component cha xuống con, dùng closure.
- ✅ Dùng được arrow function, async/await, TypeScript.
- ✅ Tích hợp với state (gọi setter trong handler).
- ✅ Synthetic Event thống nhất giao diện mọi trình duyệt.

**Bảng so sánh**:


|                       | HTML thuần       | React                              |
| --------------------- | ---------------- | ---------------------------------- |
| Cú pháp               | `onclick="fn()"` | `onClick={fn}`                     |
| Kiểu giá trị          | Chuỗi            | Hàm (function reference)           |
| Tên sự kiện           | `lowercase`      | `camelCase`                        |
| Đối tượng event       | DOM event gốc    | Synthetic Event (bọc DOM event)    |
| Đăng ký nhiều handler | Khó (ghi đè)     | Dễ (gọi nhiều hàm trong 1 handler) |


---



### 1.1. Các loại sự kiện hay gặp

React hỗ trợ gần như toàn bộ sự kiện của DOM. Dưới đây là nhóm phổ biến nhất:


| Nhóm         | Sự kiện thường dùng                                        |
| ------------ | ---------------------------------------------------------- |
| **Chuột**    | `onClick`, `onDoubleClick`, `onMouseEnter`, `onMouseLeave` |
| **Bàn phím** | `onKeyDown`, `onKeyUp`                                     |
| **Form**     | `onChange`, `onSubmit`, `onFocus`, `onBlur`                |
| **Khác**     | `onScroll`, `onCopy`/`onCut`/`onPaste`                     |


> 💡 Trong buổi 3 sẽ tập trung vào 3 sự kiện **quan trọng nhất**: `onClick`, `onChange`, `onSubmit`.

**Cú pháp cơ bản**:

```jsx
<button onClick={handleClick}>Bấm tôi</button>
<input onChange={handleChange} />
<form onSubmit={handleSubmit}>...</form>
```

Quy tắc: **camelCase + truyền hàm (không phải chuỗi)**.

```jsx
// ❌ HTML thuần
<button onclick="handleClick()">Bấm tôi</button>

// ✅ React
<button onClick={handleClick}>Bấm tôi</button>
```

---



### 1.2. Ví dụ đầu tiên: xử lý click

**Lý thuyết**: Handler là 1 hàm được gọi khi sự kiện xảy ra. Có 3 cách viết handler phổ biến:

1. **Hàm riêng** (khuyến nghị khi handler dài):

```jsx
function App() {
  const handleClick = () => {
    alert('Vừa bấm nút!');
  };

  return <button onClick={handleClick}>Bấm tôi</button>;
}
```

1. **Arrow function inline** (hàm ngắn 1 dòng):

```jsx
<button onClick={() => alert('Hello!')}>Bấm để chào</button>
```

1. **Hàm có nhận event**:

```jsx
<button onClick={(event) => console.log(event)}>Xem event</button>
```

**Code mẫu đầy đủ**:

```jsx
function App() {
  const handleClick = () => {
    alert('Vừa bấm nút!');
  };

  return (
    <div>
      <button onClick={handleClick}>Bấm tôi</button>
      <button onClick={() => alert('Hello!')}>Bấm để chào</button>
    </div>
  );
}
```

**Kết quả**:

- Click nút 1 → alert "Vừa bấm nút!"
- Click nút 2 → alert "Hello!"

---



### 1.3. Truyền tham số vào handler

**Lý thuyết**: Đây là chỗ **rất hay sai** của người mới. Khi muốn truyền tham số (id, tên, index...) vào handler, **phải bọc arrow function** để trì hoãn việc gọi hàm.

**Cơ chế**:

- `onClick={handleDelete}` → React lưu hàm, gọi khi click.
- `onClick={handleDelete(id)}` → gọi `handleDelete(id)` **NGAY LẬP TỨC** khi render, lấy kết quả truyền cho `onClick` (sai).
- `onClick={() => handleDelete(id)}` → lưu arrow function, khi click mới gọi `handleDelete(id)` (đúng).

**Tại sao lại có sự khác biệt này?**

Vì `onClick` cần **1 hàm** (để gọi sau), không phải **kết quả của hàm**. Khi viết `handleDelete(id)`, JS thực thi hàm đó ngay, lấy giá trị trả về (thường là `undefined`) truyền cho `onClick`.

**Code mẫu (đơn giản)**:

```jsx
function App() {
  const handleDelete = (id) => {
    alert(`Đã xoá sản phẩm có id: ${id}`);
  };

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          {product.name}
          {/* ✅ ĐÚNG: bọc arrow function */}
          <button onClick={() => handleDelete(product.id)}>🗑️ Xoá</button>
        </li>
      ))}
    </ul>
  );
}
```

**So sánh SAI vs ĐÚNG**:

```jsx
// ❌ SAI: gọi hàm ngay khi render — XOÁ HẾT ngay khi load
<button onClick={handleDelete(product.id)}>Xoá</button>

// ✅ ĐÚNG: chỉ gọi khi click
<button onClick={() => handleDelete(product.id)}>Xoá</button>
```

> ⚠️ **Bẫy cực phổ biến**: nếu viết `onClick={handleDelete(product.id)}` (không có `() =>`), hàm sẽ chạy **ngay khi render**, không đợi click. Khi render lần đầu, **3 sản phẩm đều bị xoá** luôn!

---



### 1.4. Đối tượng sự kiện (`event`)

**Lý thuyết**: Mỗi khi sự kiện xảy ra, React tạo ra 1 **đối tượng event** chứa thông tin về sự kiện: loại sự kiện, element bị tác động, vị trí chuột, phím nào được nhấn, giá trị input...

Đối tượng này được tự động truyền vào handler làm tham số đầu tiên.

**Các thuộc tính thường dùng**:


| Thuộc tính                       | Ý nghĩa                                       | Dùng cho sự kiện           |
| -------------------------------- | --------------------------------------------- | -------------------------- |
| `event.target`                   | Element phát ra sự kiện                       | Tất cả                     |
| `event.target.value`             | Giá trị hiện tại của input                    | `onChange`                 |
| `event.target.checked`           | Trạng thái tick của checkbox                  | `onChange`                 |
| `event.target.name`              | Thuộc tính `name` của input                   | `onChange` (form)          |
| `event.type`                     | Tên loại sự kiện (`"click"`, `"change"`...)   | Debug                      |
| `event.key`                      | Phím vừa nhấn (`"Enter"`, `"a"`, `"ArrowUp"`) | `onKeyDown`                |
| `event.clientX`, `event.clientY` | Toạ độ chuột                                  | `onClick`, `onMouseMove`   |
| `event.preventDefault()`         | Chặn hành vi mặc định                         | `onSubmit`, `onClick` link |
| `event.stopPropagation()`        | Chặn bubble lên cha                           | Mọi sự kiện                |


**Code mẫu (đơn giản)**:

```jsx
function App() {
  const handleClick = (e) => {
    console.log('Loại:', e.type);       // "click"
    console.log('Phần tử:', e.target);  // <button>...</button>
    console.log('Vị trí:', e.clientX, e.clientY);
  };

  return <button onClick={handleClick}>Bấm và xem console</button>;
}
```

> 💡 Mở **DevTools → Console** (F12) để xem giá trị in ra.

---



### 1.5. Các sự kiện hay dùng

```jsx
function Demo() {
  return (
    <input
      type="text"
      onChange={(e) => console.log('Gõ:', e.target.value)}  // Mỗi lần gõ
      onFocus={() => console.log('Focus')}                  // Click vào
      onBlur={() => console.log('Blur')}                    // Click ra ngoài
      onKeyDown={(e) => e.key === 'Enter' && console.log('Enter!')}
    />
  );
}
```

---



### 1.6. Synthetic Event — Sự kiện "ảo" của React

**Vấn đề**: Trình duyệt khác nhau có cách xử lý sự kiện khác nhau (đặc biệt là IE cũ). Nếu viết code thuần, phải if/else theo trình duyệt → rất cực.

**Giải pháp của React**: Tạo ra **Synthetic Event** — 1 lớp "bọc" đè lên sự kiện gốc của trình duyệt, thống nhất giao diện cho mọi trình duyệt.

```jsx
function Demo() {
  const handleClick = (e) => {
    // e là Synthetic Event, KHÔNG phải DOM event gốc
    console.log(e.nativeEvent);  // ← Đây mới là DOM event gốc
    console.log(e.target);       // ← LUÔN dùng e.target (Synthetic)
  };
  return <button onClick={handleClick}>Bấm</button>;
}
```

**So sánh nhanh**:


|                           | HTML thuần            | React                           |
| ------------------------- | --------------------- | ------------------------------- |
| Tên sự kiện               | `onclick` (lowercase) | `onClick` (camelCase)           |
| Truyền giá trị            | Chuỗi: `"handle()"`   | Hàm: `{handle}`                 |
| Đối tượng event           | DOM event gốc         | Synthetic Event (gần giống DOM) |
| `event.target`            | Element bị click      | Element bị click (giống)        |
| `event.preventDefault()`  | Có                    | Có (giống)                      |
| `event.stopPropagation()` | Có                    | Có (giống)                      |


> 💡 **Trong 99% trường hợp**, dùng Synthetic Event giống hệt DOM event. Khi nào cần truy cập thuộc tính "đặc biệt" của trình duyệt (như `offsetX`, `clipboardData`), dùng `e.nativeEvent`.

---



### 1.7. Event Bubbling và `stopPropagation`

**Sự kiện trong DOM "nổi bọt" (bubble)** từ element con lên element cha:

```jsx
function App() {
  return (
    <div onClick={() => console.log('Bấm vào DIV cha')}>
      <button onClick={() => console.log('Bấm vào NÚT con')}>
        Bấm tôi
      </button>
    </div>
  );
}
```

Khi bấm nút, console sẽ in ra:

```
Bấm vào NÚT con
Bấm vào DIV cha   ← Sự kiện "nổi" lên cha
```

Đây là **event bubbling** — mặc định của DOM.

**Khi nào cần chặn?** Khi không muốn cha nhận sự kiện:

```jsx
function App() {
  return (
    <div onClick={() => console.log('Cha nhận sự kiện')}>
      <button
        onClick={(e) => {
          e.stopPropagation();   // Chặn bubble lên cha
          console.log('Chỉ con nhận sự kiện');
        }}
      >
        Bấm tôi
      </button>
    </div>
  );
}
```

Bây giờ console chỉ in: `Chỉ con nhận sự kiện`.

> ⚠️ **Đừng lạm dụng** `stopPropagation`. Hầu hết trường hợp nên để bubble tự nhiên — React thường handle tốt rồi. Chỉ dùng khi thật sự cần.

**Ví dụ thực tế (đơn giản)**: Modal — bấm vào overlay (vùng đen) thì đóng, bấm vào nội dung thì **không đóng**.

```jsx
function Modal({ onClose }) {
  return (
    <div onClick={onClose} style={{ background: 'rgba(0,0,0,0.5)', padding: '5rem' }}>
      <div
        onClick={(e) => e.stopPropagation()}  // Chặn bubble
        style={{ background: 'white', padding: '1rem' }}
      >
        <h2>Nội dung Modal</h2>
        <button onClick={onClose}>Đóng</button>
      </div>
    </div>
  );
}
```

---



## 🎮 Phần 2: State với sự kiện (Component tương tác)



### 📖 Lý thuyết: Tại sao State + Event = Component "sống"?

**Khái niệm**: Phần 1 đã học xử lý sự kiện (chỉ làm tác vụ phụ như `alert`, `console.log`). Nhưng ứng dụng React thật sự cần **UI thay đổi theo tương tác** — đó là lúc State phát huy tác dụng.

**Mối quan hệ Event ↔ State**:

```
Người dùng tương tác (event)
        ↓
Handler được gọi
        ↓
Gọi hàm setter để cập nhật state
        ↓
React re-render component
        ↓
UI mới hiển thị cho người dùng
```

**Hệ quả quan trọng**:

- State là **"bộ nhớ"** của component — mỗi lần đổi → component chạy lại.
- Sự kiện **không tự đổi UI** — phải thông qua state.
- State **phải được khởi tạo** bằng `useState` với giá trị ban đầu.

**Cú pháp** `useState`:

```jsx
const [value, setValue] = useState(initialValue);
//    ↑        ↑                     ↑
//  giá trị  hàm setter          giá trị khởi tạo
//  hiện tại
```

- `value` — biến chứa giá trị hiện tại (chỉ đọc, không gán trực tiếp được).
- `setValue` — hàm để cập nhật giá trị. Khi gọi → React re-render.

**Quy tắc vàng**:

1. ❌ Không bao giờ sửa `value` trực tiếp: `value = 5`.
2. ✅ Luôn dùng setter: `setValue(5)`.
3. ✅ Khi state mới phụ thuộc state cũ: `setValue(prev => prev + 1)`.

**Các kiểu state thường dùng**:


| Kiểu        | Khai báo          | Cập nhật                       |
| ----------- | ----------------- | ------------------------------ |
| **Số**      | `useState(0)`     | `setCount(count + 1)`          |
| **Chuỗi**   | `useState('')`    | `setName('An')`                |
| **Boolean** | `useState(false)` | `setIsn)On(!isO`               |
| **Mảng**    | `useState([])`    | `setArr([...arr, newItem])`    |
| **Object**  | `useState({})`    | `setObj({...obj, key: value})` |


---



### 2.1. Đếm số lần click — ví dụ kinh điển

**Lý thuyết**: Đây là ví dụ kinh điển để hiểu rõ mối quan hệ Event → State → UI. Khi click, ta:

1. Đọc giá trị state hiện tại (`count`).
2. Tính giá trị mới (`count + 1`).
3. Gọi setter (`setCount(...)`).
4. React tự động cập nhật giao diện.

**Code mẫu**:

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>Đã bấm {count} lần</h2>
      <button onClick={() => setCount(count + 1)}>Bấm tôi</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}
```

**Kết quả**:

- Click "Bấm tôi" → số tăng 1
- Click "Reset" → về 0
- Mỗi lần state đổi → component tự re-render với số mới

**Cơ chế bên trong**:

1. Lần đầu render: `count = 0` → hiển thị "Đã bấm 0 lần"
2. Click → `setCount(0 + 1)` → React nhận giá trị mới = 1
3. React re-render: `count = 1` → hiển thị "Đã bấm 1 lần"
4. Click tiếp → lặp lại bước 2-3

---



### 2.2. Toggle (Bật/Tắt) — UI đổi theo trạng thái

**Lý thuyết**: Toggle là pattern **cực kỳ phổ biến** trong React: hiển thị/ẩn modal, bật/tắt đèn, mở/đóng menu, chuyển dark/light mode... Tất cả đều dùng 1 `useState` kiểu boolean và toán tử `!` để đảo trạng thái.

**Code mẫu**:

```jsx
function Toggle() {
  const [isOn, setIsOn] = useState(false);

  return (
    <div>
      <h2>Đèn: {isOn ? '💡 Đang BẬT' : '🌑 Đang TẮT'}</h2>
      <button onClick={() => setIsOn(!isOn)}>
        {isOn ? 'TẮT' : 'BẬT'}
      </button>
    </div>
  );
}
```

**Kết quả**:

- Ban đầu: `isOn = false` → hiển thị "Đèn: 🌑 Đang TẮT", nút "BẬT"
- Click → `setIsOn(!false)` = `setIsOn(true)` → re-render
- Sau click: "Đèn: 💡 Đang BẬT", nút "TẮT"

**Tại sao dùng** `!isOn` **thay vì** `setIsOn(true)`**?**

- `setIsOn(true)` → luôn bật, không tắt được.
- `setIsOn(!isOn)` → **đảo ngược** trạng thái hiện tại, hoạt động cả 2 chiều.

---



### 2.3. Form đổi màu nền — input ảnh hưởng UI

**Lý thuyết**: Đây là ví dụ đầu tiên về **Controlled Component** (sẽ học kỹ ở Phần 3). Khi input thay đổi → state cập nhật → UI re-render theo giá trị mới. Quan sát cách 1 thay đổi nhỏ (chọn màu) ảnh hưởng đến nhiều phần UI (text hiển thị + ô màu).

**Code mẫu (đơn giản)**:

```jsx
function ColorPicker() {
  const [color, setColor] = useState('#3b82f6');

  return (
    <div>
      <h2>Màu: {color}</h2>
      <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
      <div style={{ height: '100px', background: color }} />
    </div>
  );
}
```

**Kết quả**:

- Có 1 color picker + ô vuông bên dưới
- Chọn màu trong picker → state `color` đổi → 2 chỗ (text + ô vuông) cùng update
- Đây là sức mạnh của React: **1 state thay đổi, nhiều nơi tự cập nhật theo**.

---



## 📝 Phần 3: Controlled Component — "Linh hồn" của Form React



### 📖 Lý thuyết: Tại sao Form trong React cần "Controlled"?

**Khái niệm**: Form trong HTML có 1 đặc điểm: trình duyệt **tự quản lý giá trị** của input. Khi gõ phím, trình duyệt cập nhật giá trị trong DOM, JavaScript chỉ "hỏi" khi cần (`input.value`).

**g song**Điều này tạo ra **2 hệ thống quản lý dữ liệu son**:

- **DOM** (trình duyệt): chứa giá trị input.
- **React state**: chứa state của component.

Khi không đồng bộ 2 hệ thống này → sinh ra bug.

**Controlled Component** là giải pháp của React: **buộc React là nguồn dữ liệu duy nhất** (single source of truth) cho input. Input lấy giá trị từ state, mỗi lần gõ phím → cập nhật state → re-render → input hiển thị giá trị mới từ state.

**Quy trình đầy đủ** (đã nói ở Phần 0.5):

```
1. User gõ phím
2. Trình duyệt ghi giá trị vào input (DOM)
3. React bắt sự kiện onChange
4. Handler gọi setState(value mới)
5. React cập nhật state
6. Component re-render
7. <input value={state} /> hiển thị giá trị mới
```

**Lợi ích**:

- ✅ React biết mọi thay đổi của input → có thể validate, format, transform.
- ✅ Reset form dễ dàng: chỉ cần `setValue('')`.
- ✅ Đồng bộ với state khác (ví dụ: disable nút submit khi form rỗng).
- ✅ Test dễ: chỉ cần set state → kiểm tra UI render đúng.

**Hệ quả**: Phải code dài hơn 1 chút, nhưng **toàn bộ logic nằm trong React** → dễ debug, dễ mở rộng.

---



### 3.1. Vấn đề: Input trong React có 2 kiểu

**Lý thuyết**: Có 2 cách để làm việc với input trong React:

1. **Uncontrolled**: Để trình duyệt quản lý giá trị (giống HTML thuần). Dùng `ref` để đọc khi cần.
2. **Controlled**: React "kiểm soát" giá trị qua state. Mỗi thay đổi đều đi qua state.

**Vì sao Uncontrolled có vấn đề?**

```jsx
// ❌ Uncontrolled: React KHÔNG kiểm soát giá trị input
function BadInput() {
  return <input type="text" />;
}
```

Vấn đề cụ thể:

- **Không thể biết người dùng gõ gì** — phải dùng `ref` + DOM API để đọc, tách rời khỏi luồng React.
- **Không thể validate realtime** — phải đợi user submit form mới biết email sai.
- **Không thể reset bằng code** — muốn xoá input sau khi submit? Phải `ref.current.value = ''`, không qua state.
- **Khó đồng bộ với state** — nếu state khác phụ thuộc giá trị input (ví dụ: disable nút khi rỗng) → phải vòng vo qua DOM.

**Cách giải quyết: Controlled Component**

```jsx
// ✅ Controlled: React "kiểm soát" giá trị input qua state
function GoodInput() {
  const [value, setValue] = useState('');

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
```

**Phân tích cú pháp**:

- `value={value}` — input nhận giá trị từ state. Nếu state đổi → input đổi theo.
- `onChange={(e) => setValue(e.target.value)}` — mỗi lần gõ → cập nhật state. Nếu không có dòng này → input bị "đóng băng" (gõ không hiện).

> 💡 **Công thức vàng**: `<input value={state} onChange={e => setState(e.target.value)} />`. Hết! Đây chính là Controlled Component.

---



### 3.2. Quy trình Controlled Component

```
Người dùng gõ phím
      ↓
Trình duyệt cập nhật input
      ↓
React bắt sự kiện onChange
      ↓
Gọi setState (cập nhật state)
      ↓
React re-render component
      ↓
Input hiển thị giá trị mới từ state
```

**Giải thích chi tiết từng bước**:

1. **User gõ phím** vào input. Trình duyệt nhận sự kiện `keydown`, sau đó `keypress`, cuối cùng cập nhật giá trị input.
2. **Trình duyệt phát sự kiện** `input` (mỗi lần giá trị đổi), React bắt và đổi thành `onChange` (alias).
3. **Handler** `onChange` **được gọi**. Đây là lúc ta đọc `e.target.value` (giá trị mới nhất).
4. **Gọi** `setValue(newValue)` — React lưu giá trị mới vào state.
5. **React so sánh** state cũ vs mới. Nếu khác → đánh dấu component cần re-render.
6. **Component chạy lại từ đầu**, return JSX mới.
7. **React diffing** so sánh JSX cũ vs mới, chỉ cập nhật phần DOM thay đổi (chỉ thuộc tính `value` của input).
8. **Trình duyệt vẽ lại** → user thấy ký tự mới.

Mọi thứ đi qua **state** → React là "người kiểm soát duy nhất".

**Bảng so sánh chi tiết Controlled vs Uncontrolled**:


| Tiêu chí              | Uncontrolled                           | Controlled                               |
| --------------------- | -------------------------------------- | ---------------------------------------- |
| **Giá trị lưu ở đâu** | Trong DOM (input)                      | Trong React state                        |
| **Đọc giá trị**       | `useRef` hoặc `document.querySelector` | Đọc trực tiếp từ state                   |
| **Cú pháp**           | `<input defaultValue="abc" />`         | `<input value={state} onChange={...} />` |
| **Reset được không**  | Khó (phải dùng ref + DOM API)          | Dễ (`setValue('')`)                      |
| **Validate realtime** | Khó                                    | Dễ (validate state trước khi set)        |
| **Performance**       | Tốt hơn với form CỰC lớn (1000+ input) | Bình thường                              |
| **Đồng bộ với React** | Khó (state tách rời DOM)               | Tự nhiên                                 |
| **Khuyến nghị**       | Khi tích hợp thư viện DOM bên thứ 3    | **99% trường hợp**                       |


**Khi nào dùng Uncontrolled?** Khi cần tích hợp thư viện bên thứ 3 (như editor WYSIWYG, calendar) mà thư viện đó quản lý DOM nội bộ. Còn lại, **luôn dùng Controlled** cho an toàn.

```jsx
// Ví dụ Uncontrolled — dùng ref để đọc giá trị
import { useRef } from 'react';

function UncontrolledForm() {
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Giá trị:', inputRef.current.value);  // Đọc từ DOM
    inputRef.current.value = '';  // Reset bằng DOM API
  };

  return (
    <form onSubmit={handleSubmit}>
      <input ref={inputRef} type="text" defaultValue="" />
      <button type="submit">Submit</button>
    </form>
  );
}
```

---



### 3.4. Controlled Component với nhiều input

Khi form có nhiều input, dùng **1 state object** cho gọn:

**Code mẫu (form đăng nhập đơn giản)**:

```jsx
function LoginForm() {
  const [form, setForm] = useState({
    email: '',
    password: '',
    remember: false,
  });

  // Hàm chung: cập nhật bất kỳ field nào
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();   // Chặn reload trang
    alert(`Đăng nhập với: ${form.email}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>🔐 Đăng nhập</h2>

      <input
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />

      <input
        name="password"
        type="password"
        placeholder="Mật khẩu"
        value={form.password}
        onChange={handleChange}
      />

      <label>
        <input
          type="checkbox"
          name="remember"
          checked={form.remember}
          onChange={handleChange}
        />
        Ghi nhớ đăng nhập
      </label>

      <button type="submit">Đăng nhập</button>
    </form>
  );
}
```

**Kết quả**:

- Gõ email → `form.email` cập nhật realtime.
- Gõ password → `form.password` cập nhật.
- Tick checkbox → `form.remember` = `true`.
- Bấm "Đăng nhập" → alert (KHÔNG reload trang nhờ `e.preventDefault()`).

> 💡 **Mẹo quan trọng**: `e.preventDefault()` trong `onSubmit` để chặn hành vi mặc định làm reload trang.

---



### 3.5. Select và Textarea cũng là Controlled

**Lý thuyết**: Không chỉ `<input>` mà `<select>`, `<textarea>` cũng có thể trở thành Controlled Component với cùng nguyên tắc: `value` + `onChange`.

**Code mẫu (đơn giản)**:

```jsx
function PostForm() {
  const [category, setCategory] = useState('tech');
  const [content, setContent] = useState('');

  return (
    <form>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="tech">Công nghệ</option>
        <option value="life">Đời sống</option>
        <option value="travel">Du lịch</option>
      </select>

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={5}
        placeholder="Nội dung..."
      />

      <p>Đã chọn: <strong>{category}</strong>, số ký tự: {content.length}</p>
    </form>
  );
}
```

---



## ⬆️ Phần 4: Lifting State Up — Truyền dữ liệu con → cha



### 4.0. Tại sao React "một chiều" mà vẫn cần con nói chuyện với cha?

Buổi 1 đã học: **props đi từ cha → con** (một chiều). Vậy thực tế rất nhiều tình huống **con cần "phản hồi" lại cha**:

- Ô input con → cha cần biết giá trị để validate.
- Nút "Thêm" trong component con → cập nhật danh sách ở cha.
- Checkbox con → bật/tắt trạng thái ở cha.

**Cơ chế**: Cha truyền xuống **2 thứ**:

1. **Giá trị hiện tại** (qua props)
2. **Hàm setter** (qua props)

Con cập nhật → gọi hàm setter → cha re-render → truyền giá trị mới xuống con.

**Ví dụ đời thường** để dễ hình dung:

> Giống như **hộp thư góp ý** ở sảnh chung cư:
>
> - Bạn (con) viết góp ý ra giấy (gọi setter).
> - Bạn bỏ vào hộp thư (cha nhận qua hàm).
> - Ban quản lý (cha) mở hộp → xử lý → phản hồi qua bảng tin (render lại).

---



### 4.1. Vấn đề: 2 component con cần "nói chuyện" với nhau

**Lý thuyết**: Trong React, component con **chỉ nhận dữ liệu** qua props, **không tự sửa được** state của cha. Nhưng thực tế có rất nhiều tình huống cần **nhiều component dùng chung 1 dữ liệu**:

- 2 input hiển thị cùng giá trị (VND ↔ USD).
- Danh sách sản phẩm ↔ Giỏ hàng.
- Form ở component A ↔ Preview ở component B.

**Câu hỏi then chốt**: State nên đặt ở component nào?

Giả sử có 2 component:

- `TemperatureInput` (ô nhập nhiệt độ)
- `BoilingVerdict` (hiển thị "Sôi" hoặc "Chưa sôi")

Cả 2 cần biết nhiệt độ hiện tại. Nhưng **state nằm ở đâu**?

❌ **Sai**: đặt state trong `TemperatureInput` → `BoilingVerdict` không biết.
❌ **Sai**: đặt state trong `BoilingVerdict` → `TemperatureInput` không truy cập được.

✅ **Đúng**: **đặt state ở cha chung** của cả 2, rồi truyền xuống.

**Tại sao vậy?**

Cha chung có thể:

- Truyền giá trị state xuống **cả 2 con** (cùng 1 nguồn dữ liệu).
- Nhận sự kiện từ con, cập nhật state.
- Quyết định khi nào re-render.

Component con **chỉ cần**:

- Nhận giá trị qua props (hiển thị).
- Gọi hàm setter (khi cần thay đổi).

> 💡 Đây là pattern **rất quan trọng** trong React, gặp trong 90% ứng dụng có nhiều component tương tác.

---



### 4.2. Quy tắc vàng: "State phải sống ở cha chung"

**Lý thuyết**: Để xác định state nên đặt ở đâu, đi ngược từ component cần dùng lên trên cây component. Component cha **gần nhất** mà tất cả component cần dùng đều là con của nó → đặt state ở đó.

**Sơ đồ minh hoạ**:

```
        App (state = temperature, setTemperature)
        /                                      \
TemperatureInput                        BoilingVerdict
(nhận temperature,                    (nhận temperature,
 onTemperatureChange)                  tính toán hiển thị)
```

Component con **không sửa trực tiếp** state của cha. Cha truyền xuống **2 thứ**:

1. **Giá trị hiện tại** (`temperature`) — con đọc để hiển thị.
2. **Hàm setter** (`onTemperatureChange`) — con gọi khi muốn thay đổi.

**Quy trình**:

1. Con gọi `onTemperatureChange(newValue)`.
2. Cha nhận lời gọi → cập nhật state.
3. React re-render cha.
4. Cha truyền state mới xuống cả 2 con.
5. Cả 2 con re-render với dữ liệu mới nhất quán.

**Lưu ý về đặt tên hàm setter**:

- React không quy định tên. `setTemperature`, `onTemperatureChange`, `updateTemp` đều được.
- **Quy ước phổ biến**:
  - Trong component cha: `setTemperature`.
  - Khi truyền xuống con: `onTemperatureChange` (gợi ý là hàm xử lý sự kiện).
  - Trong prop của con: `onChange` (ngắn gọn).

---



### 4.3. Code minh hoạ đầy đủ

```jsx
import { useState } from 'react';

function BoilingVerdict({ celsius }) {
  if (celsius >= 100) {
    return <p>💧 Nước đã SÔI ({celsius}°C)</p>;
  }
  return <p>❄️ Nước CHƯA sôi ({celsius}°C)</p>;
}

function TemperatureInput({ value, onChange }) {
  return (
    <label>
      Nhiệt độ (°C):
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </label>
  );
}

function App() {
  const [temperature, setTemperature] = useState(20);

  return (
    <div>
      <h1>🌡️ Xem nước sôi</h1>
      <TemperatureInput
        value={temperature}
        onChange={setTemperature}
      />
      <BoilingVerdict celsius={temperature} />
    </div>
  );
}
```

**Kết quả**:

- Nhập `20` → hiện "Nước CHƯA sôi"
- Nhập `100` → hiện "Nước đã SÔI"
- Thay đổi input → cả 2 component cùng re-render

> 💡 Đây chính là ví dụ kinh điển từ [tài liệu chính thức React](https://react.dev/learn/sharing-state-between-components).

---



### 4.4. Ví dụ nâng cao hơn: Giỏ hàng (đơn giản)

```jsx
import { useState } from 'react';

function ProductList({ products, onAdd }) {
  return (
    <ul>
      {products.map((p) => (
        <li key={p.id}>
          {p.name} - {p.price.toLocaleString()}đ
          <button onClick={() => onAdd(p)}>Thêm vào giỏ</button>
        </li>
      ))}
    </ul>
  );
}

function Cart({ items }) {
  const total = items.reduce((sum, item) => sum + item.price, 0);

  if (items.length === 0) return <p>Giỏ hàng trống</p>;

  return (
    <div>
      <h3>🛒 Giỏ hàng ({items.length} món)</h3>
      <ul>
        {items.map((item) => <li key={item.id}>{item.name}</li>)}
      </ul>
      <p><strong>Tổng: {total.toLocaleString()}đ</strong></p>
    </div>
  );
}

function App() {
  const products = [
    { id: 1, name: 'iPhone', price: 25000000 },
    { id: 2, name: 'AirPods', price: 5000000 },
  ];
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
      <ProductList products={products} onAdd={addToCart} />
      <Cart items={cart} />
    </div>
  );
}
```

**Kết quả**:

- Click "Thêm vào giỏ" ở `ProductList` → `Cart` bên phải cập nhật ngay.
- Tổng tiền tự tính lại.

> 💡 **Lưu ý**: dùng `index` làm `key` ở `Cart.items` vì danh sách này **chỉ thêm, không sắp xếp/xoá** (nếu có xoá thì nên dùng `product.id`).

---



## 📝 Phần 5: Validation Form (Kiểm tra dữ liệu)



### 📖 Lý thuyết: Tại sao phải validate form?

**Khái niệm**: Validation là quá trình **kiểm tra dữ liệu** người dùng nhập vào có hợp lệ không, trước khi gửi lên server hoặc xử lý tiếp.

**Tại sao cần validate?**

- ❌ **Không validate** → user nhập email `abc` → gửi lên server → server báo lỗi → trải nghiệm tệ.
- ✅ **Validate client-side** → user nhập `abc` → hiện lỗi ngay "Email không hợp lệ" → user sửa lại.

**Lợi ích**:

- Giảm request không hợp lệ lên server (tiết kiệm băng thông).
- UX tốt hơn (user biết lỗi ngay, không phải đợi).
- Tránh bug ở backend (server không phải xử lý dữ liệu bậy).

**Lưu ý quan trọng**: Validate phía client **chỉ để cải thiện UX**, **không thể thay thế** validate phía server. User có thể tắt JavaScript, gửi request bằng Postman... → server **BẮT BUỘC** phải validate lại.

**2 kiểu validate phổ biến**:


| Kiểu                    | Khi nào kiểm tra                                | Ưu điểm            | Nhược điểm                                                 |
| ----------------------- | ----------------------------------------------- | ------------------ | ---------------------------------------------------------- |
| **Validate khi submit** | Sau khi user bấm nút Submit                     | Ít phải xử lý, gọn | Phải đợi đến lúc submit mới biết lỗi                       |
| **Validate realtime**   | Ngay khi user gõ (sau khi blur hoặc mỗi lần gõ) | Phản hồi tức thì   | Phải xử lý nhiều trường hợp, dễ "nhảy" lỗi khi user mới gõ |


**Chiến lược kết hợp phổ biến**:

1. **Realtime**: chỉ hiển thị lỗi khi field đã được "chạm" (touched) → tránh hiện lỗi đỏ ngay khi mở form.
2. **Submit**: kiểm tra toàn bộ form một lần cuối trước khi gửi.
3. **Disable nút Submit** khi form chưa hợp lệ → user không thể submit lỗi.

---



### 5.1. Validate cơ bản

**Lý thuyết**: Validate khi submit là cách **đơn giản nhất**. Trong handler `handleSubmit`, kiểm tra từng điều kiện. Nếu lỗi → lưu vào state `error` → render thông báo. Nếu OK → xử lý tiếp.

**Quy trình**:

1. User bấm Submit.
2. `handleSubmit` được gọi.
3. Lần lượt kiểm tra từng điều kiện.
4. Nếu lỗi → set `error` → return (không xử lý tiếp).
5. Nếu OK → xử lý (alert, gọi API...).

**Code mẫu**:

```jsx
function SignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validate
    if (!email.includes('@')) {
      setError('Email không hợp lệ');
      return;
    }
    if (password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }

    alert('Đăng ký thành công! 🎉');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>📝 Đăng ký</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Mật khẩu (≥ 6 ký tự)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && <p style={{ color: 'red' }}>⚠️ {error}</p>}

      <button type="submit">Đăng ký</button>
    </form>
  );
}
```

**Kết quả**:

- Email không có `@` → báo lỗi "Email không hợp lệ"
- Password < 6 ký tự → báo lỗi "Mật khẩu phải có ít nhất 6 ký tự"
- Cả 2 OK → "Đăng ký thành công! 🎉"

---



### 5.2. Validate realtime (kiểm tra ngay khi gõ)

**Lý thuyết**: Validate realtime cho phản hồi tức thì. Cách làm:

1. Tính giá trị `isValid` (hoặc `error`) **mỗi lần render** dựa trên state hiện tại.
2. Hiển thị thông báo tương ứng.
3. Không cần lưu lỗi vào state riêng → tính toán lại trong JSX.

**Ưu điểm**: Code ngắn gọn, không cần handler phức tạp.

**Code mẫu**:

```jsx
function LiveEmailCheck() {
  const [email, setEmail] = useState('');
  const isValid = email.includes('@') && email.length > 3;

  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Nhập email..."
      />
      <p>
        {email === '' ? (
          <span style={{ color: 'gray' }}>Chưa nhập gì</span>
        ) : isValid ? (
          <span style={{ color: 'green' }}>✅ Email hợp lệ</span>
        ) : (
          <span style={{ color: 'red' }}>❌ Email chưa hợp lệ</span>
        )}
      </p>
    </div>
  );
}
```

**Kết quả**:

- Chưa gõ → "Chưa nhập gì" (màu xám)
- Gõ `abc` → "Email chưa hợp lệ" (đỏ)
- Gõ `abc@test.com` → "Email hợp lệ" (xanh)

---



## 🚀 Phần 6: Dự án cuối buổi — Todo List có form thêm công việc



### 📖 Lý thuyết: Cách tiếp cận dự án tổng hợp

**Mục đích**: Dự án cuối buổi giúp kết hợp **TẤT CẢ** kiến thức buổi 3 (và buổi 1, 2) vào 1 ứng dụng thực tế.

**Phân tích dự án Todo List**:

- **Quản lý danh sách** (buổi 2): `.map()` để render, `key` để React nhận diện từng item.
- **Tương tác người dùng** (buổi 3): form thêm, nút xoá, checkbox toggle trạng thái.
- **Lifting State Up**: danh sách `todos` ở `App`, truyền xuống `TodoInput`, `TodoList`, `TodoItem`.
- **Controlled Component**: input trong `TodoInput` được kiểm soát bởi state `text`.
- **Validation**: kiểm tra input rỗng trước khi thêm.
- **Conditional Rendering**: hiển thị thông báo "Hết việc" khi danh sách rỗng.

**Cấu trúc component**:

```
            App (state: todos, các hàm thêm/xoá/toggle)
            /          |              \
      TodoInput    TodoList        Counter
        |            |
      form         TodoItem (map)
                      |
                  checkbox + nút xoá
```

**Các hàm xử lý chính ở** `App`:

- `addTodo(text)` — thêm công việc mới, dùng `Date.now()` làm id tạm.
- `toggleTodo(id)` — đánh dấu hoàn thành/chưa hoàn thành, dùng `.map()`.
- `deleteTodo(id)` — xoá công việc, dùng `.filter()`.

**Kết hợp tất cả kiến thức buổi 3 (và buổi 1, 2)**:

```jsx
import { useState } from 'react';
import './App.css';

function TodoInput({ onAdd }) {
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) {
      setError('Vui lòng nhập công việc!');
      return;
    }
    onAdd(text);
    setText('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="todo-input">
      <input
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          if (error) setError('');  // Xoá lỗi khi gõ lại
        }}
        placeholder="Công việc cần làm..."
      />
      <button type="submit">+ Thêm</button>
      {error && <p className="error">⚠️ {error}</p>}
    </form>
  );
}

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

function TodoList({ todos, onToggle, onDelete }) {
  if (todos.length === 0) {
    return <p className="empty">🎉 Hết việc! Đi uống cà phê thôi.</p>;
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Học React buổi 3', done: false },
    { id: 2, text: 'Làm bài tập form', done: true },
  ]);

  const addTodo = (text) => {
    setTodos([...todos, { id: Date.now(), text, done: false }]);
  };

  const toggleTodo = (id) => {
    setTodos(todos.map((t) =>
      t.id === id ? { ...t, done: !t.done } : t
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const remaining = todos.filter((t) => !t.done).length;

  return (
    <div className="app">
      <h1>📝 Todo List</h1>
      <TodoInput onAdd={addTodo} />
      <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
      <p className="counter">
        Còn <strong>{remaining}</strong> việc chưa xong / Tổng {todos.length}
      </p>
    </div>
  );
}

export default App;
```

Trong Todo List cuối buổi, các thành phần đã sử dụng:

- ✅ **Controlled Component** (input, checkbox)
- ✅ **Sự kiện** (`onChange`, `onSubmit`, `onClick`)
- ✅ **Lifting State Up** (state `todos` ở `App`, truyền xuống con)
- ✅ **Validation** cơ bản
- ✅ **Tách component** (`TodoInput`, `TodoItem`, `TodoList`)

---



## 📝 Bài tập thực hành



### Bài 1: Counter có min/max (15 phút)

Tạo `<Counter />` có 3 nút: Tăng, Giảm, Reset. Giới hạn **0 ≤ count ≤ 10**.

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>{count}</h2>
      <button onClick={() => setCount(Math.max(0, count - 1))} disabled={count === 0}>
        −
      </button>
      <button onClick={() => setCount(0)}>Reset</button>
      <button onClick={() => setCount(Math.min(10, count + 1))} disabled={count === 10}>
        +
      </button>
    </div>
  );
}
```

**Thử thách thêm**: đổi màu nền dựa trên `count` (xanh nếu count = 5, đỏ nếu count = 0 hoặc 10).

---



### Bài 2: Form đăng ký đầy đủ (30 phút) ⭐

Tạo `<SignupForm />` gồm:

- Input **Họ tên** (bắt buộc, ≥ 2 ký tự)
- Input **Email** (bắt buộc, có `@`)
- Input **Mật khẩu** (bắt buộc, ≥ 8 ký tự, có cả chữ và số)
- Input **Xác nhận mật khẩu** (phải trùng mật khẩu)
- Checkbox **Đồng ý điều khoản**
- Nút **Đăng ký** (disabled nếu chưa tick điều khoản)

Khi submit, nếu có lỗi → hiển thị danh sách lỗi. Nếu OK → alert "Đăng ký thành công!".

**Gợi ý cấu trúc state**:

```jsx
const [form, setForm] = useState({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  agree: false,
});
const [errors, setErrors] = useState({});
```

---



### Bài 3: Tìm kiếm realtime (20 phút)

Tạo component hiển thị danh sách 10 học sinh (data cứng). Có 1 ô input tìm kiếm — khi gõ, danh sách tự lọc theo **tên** hoặc **email**.

```jsx
function SearchableList() {
  const students = [
    { id: 1, name: 'An Nguyễn', email: 'an@gmail.com' },
    { id: 2, name: 'Bình Trần', email: 'binh@gmail.com' },
    { id: 3, name: 'Châu Lê', email: 'chau@gmail.com' },
    { id: 4, name: 'Duy Phạm', email: 'duy@gmail.com' },
    { id: 5, name: 'An Trương', email: 'antruong@gmail.com' },
  ];
  const [keyword, setKeyword] = useState('');

  const filtered = students.filter((s) =>
    s.name.toLowerCase().includes(keyword.toLowerCase()) ||
    s.email.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <div>
      <input
        placeholder="🔍 Tìm theo tên hoặc email..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <p>Tìm thấy: {filtered.length} kết quả</p>
      <ul>
        {filtered.map((s) => (
          <li key={s.id}>{s.name} - {s.email}</li>
        ))}
      </ul>
    </div>
  );
}
```

**Thử thách**: highlight từ khoá tìm kiếm trong kết quả.

---



### Bài 4: Lifting State Up — Máy tính đổi tiền (30 phút) ⭐

Tạo ứng dụng **chuyển đổi VND ↔ USD**:

- Component `VndInput` (ô nhập VND)
- Component `UsdInput` (ô nhập USD)
- Component `ExchangeRate` (hiển thị tỷ giá hiện tại, có thể đổi)

Yêu cầu:

- Gõ vào ô nào, ô kia **tự động cập nhật** theo tỷ giá.
- Đổi tỷ giá, cả 2 ô cùng đổi.
- Tỷ giá mặc định: 1 USD = 25,000 VND.

**Cấu trúc**:

```
                    App (state: vnd, usd, rate)
                    /        |          \
              VndInput  UsdInput   ExchangeRate
```

---



### Bài 5: Nâng cấp Todo List (60 phút) ⭐⭐

Lấy Todo List ở phần trên, thêm:

- **Lọc** theo 3 tab: Tất cả / Chưa xong / Đã xong.
- **Sắp xếp** A-Z hoặc Z-A theo tên.
- **Sửa** công việc (click vào text → cho phép sửa, Enter để lưu, Esc để huỷ).
- **Lưu vào localStorage** để F5 không mất (gợi ý: dùng `useEffect` — buổi sau học).

---



## ✅ Checklist tự đánh giá



### 📚 Lý thuyết nền tảng

- [ ] Giải thích được **Unidirectional Data Flow** là gì và tại sao React thiết kế vậy.
- [ ] Hiểu **Immutability** của State — tại sao phải tạo object/mảng mới thay vì sửa trực tiếp.
- [ ] Mô tả được **3 bước re-render** khi setState (gọi setter → cập nhật state → re-render).
- [ ] Biết **Batching** trong React 18: nhiều setState trong 1 sự kiện chỉ re-render 1 lần.
- [ ] Phân biệt được **Synthetic Event** (React) với **DOM Event** (trình duyệt).
- [ ] Hiểu **Event Bubbling** và biết dùng `e.stopPropagation()` khi cần.



### 🖱️ Sự kiện (Events)

- [ ] Hiểu sự kiện trong React dùng **camelCase** và nhận **hàm** (không phải chuỗi).
- [ ] Biết cách truyền tham số vào handler bằng arrow function.
- [ ] Phân biệt được `event.target.value` (input/select/textarea) và `event.target.checked` (checkbox).
- [ ] Gọi được `e.preventDefault()` để chặn reload trang khi submit form.



### 📝 Controlled Component & Form

- [ ] Giải thích được Controlled Component là gì và tại sao quan trọng.
- [ ] So sánh được **Controlled vs Uncontrolled** (ưu/nhược điểm, khi nào dùng).
- [ ] Viết được form có nhiều input dùng chung 1 state object.
- [ ] Tạo được form với `select` và `textarea`.
- [ ] Validate được form cơ bản (rỗng, độ dài, format email).
- [ ] Validate realtime khi người dùng gõ.



### ⬆️ Lifting State Up

- [ ] Giải thích được tại sao phải "lift state up" khi 2 component con cần chia sẻ dữ liệu.
- [ ] Làm được ví dụ TemperatureInput + BoilingVerdict.
- [ ] Làm được ví dụ Giỏ hàng với ProductList + Cart.
- [ ] Làm được dự án Todo List cuối buổi.



### 🐛 Bẫy & Lỗi thường gặp

- [ ] Tránh được lỗi gọi hàm ngay khi render (`onClick={fn()}`).
- [ ] Dùng `setState(prev => ...)` khi state mới phụ thuộc state cũ.
- [ ] Reset được form bằng cách set state về giá trị rỗng.

---



## 🐛 Lỗi thường gặp & Cách sửa



### Lỗi 1: Gọi hàm ngay khi render (không đợi click)

```jsx
// ❌ SAI: hàm chạy NGAY khi render, không đợi click
<button onClick={handleDelete(id)}>Xoá</button>

// ✅ ĐÚNG: bọc arrow function
<button onClick={() => handleDelete(id)}>Xoá</button>
```

---



### Lỗi 2: Quên `preventDefault` → reload trang

```jsx
// ❌ SAI: form submit sẽ reload cả trang
function handleSubmit() {
  console.log('Submit');
}
<form onSubmit={handleSubmit}>

// ✅ ĐÚNG: nhận event và gọi preventDefault
function handleSubmit(e) {
  e.preventDefault();
  console.log('Submit');
}
```

---



### Lỗi 3: Input không cập nhật (quên `value` hoặc `onChange`)

```jsx
// ❌ SAI: gõ không hiện lên input
<input type="text" />

// ✅ ĐÚNG: Controlled Component
const [value, setValue] = useState('');
<input
  type="text"
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>
```

---



### Lỗi 4: Checkbox dùng `value` thay vì `checked`

```jsx
// ❌ SAI: checkbox không hoạt động đúng
<input
  type="checkbox"
  value={form.agree}
  onChange={handleChange}
/>

// ✅ ĐÚNG: dùng `checked` cho checkbox/radio
<input
  type="checkbox"
  name="agree"
  checked={form.agree}
  onChange={handleChange}
/>
```

---



### Lỗi 5: Sửa state mảng/object trực tiếp

```jsx
// ❌ SAI: React không nhận biết state đổi
todos.push(newTodo);
user.name = 'Tên mới';

// ✅ ĐÚNG: tạo mảng/object mới
setTodos([...todos, newTodo]);
setUser({ ...user, name: 'Tên mới' });
```

---



### Lỗi 6: Đặt state ở con thay vì cha chung

```jsx
// ❌ SAI: 2 component con không chia sẻ state được
function A() {
  const [count, setCount] = useState(0);
  return <B />;
}
function B() {
  return <p>{count}</p>;  // Không truy cập được
}

// ✅ ĐÚNG: lift state up
function App() {
  const [count, setCount] = useState(0);
  return (
    <>
      <A count={count} setCount={setCount} />
      <B count={count} />
    </>
  );
}
```

---



### Lỗi 7: Quên import `useState`

```jsx
// ❌ Lỗi: useState is not defined
function App() {
  const [count, setCount] = useState(0);
  ...
}

// ✅ Sửa
import { useState } from 'react';
```

---



### Lỗi 8: Dùng `onClick={fn}` với hàm trả về JSX

```jsx
// ❌ SAI: gọi hàm ngay lập tức
{items.map((item) => (
  <li onClick={handleClick(item)}>{item}</li>
))}

// ✅ ĐÚNG
{items.map((item) => (
  <li onClick={() => handleClick(item)}>{item}</li>
))}
```

---



### Lỗi 9: setState ngay sau khi đọc — giá trị cũ

```jsx
// ❌ SAI: count ở đây vẫn là giá trị CŨ
const handleClick = () => {
  setCount(count + 1);  // count = 0 → setCount(1)
  setCount(count + 1);  // count VẪN = 0 → setCount(1) lần nữa
  // Kết quả: count = 1, KHÔNG phải 2
};

// ✅ ĐÚNG: dùng callback form
const handleClick = () => {
  setCount((prev) => prev + 1);  // prev = 0 → setCount(1)
  setCount((prev) => prev + 1);  // prev = 1 → setCount(2)
  // Kết quả: count = 2
};
```

> 💡 Trong React 18 có batching, nhưng khi setState **dựa vào giá trị cũ**, luôn dùng callback form `setState(prev => ...)` cho an toàn.

---



### Lỗi 10: Quên `e.preventDefault()` trong form — mất state

```jsx
// ❌ SAI: form submit sẽ reload trang, MẤT hết state
const handleSubmit = () => {
  console.log(formData);
};
<form onSubmit={handleSubmit}>

// ✅ ĐÚNG
const handleSubmit = (e) => {
  e.preventDefault();   // ← Dòng này BẮT BUỘC
  console.log(formData);
};
```

---



### Lỗi 11: Truy cập giá trị cũ trong setState callback

```jsx
// ❌ SAI: dùng state bên ngoài callback
const [count, setCount] = useState(0);
const handleClick = () => {
  setTimeout(() => {
    setCount(count + 1);  // count có thể đã bị thay đổi trước đó
  }, 1000);
};

// ✅ ĐÚNG: dùng prev
const handleClick = () => {
  setTimeout(() => {
    setCount((prev) => prev + 1);  // Luôn lấy giá trị MỚI NHẤT
  }, 1000);
};
```

> 🎯 Quy tắc: bất cứ khi nào state mới phụ thuộc vào state cũ, dùng `setX(prev => ...)`.

---



## 📚 Tài liệu nên đọc thêm


| Nguồn                                            | Link                                                                                                         | Ghi chú                                    |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------ |
| **React.dev — Adding Interactivity**             | [react.dev/learn/adding-interactivity](https://react.dev/learn/adding-interactivity)                         | Phần này tổng hợp rất hay về sự kiện.      |
| **React.dev — Sharing State Between Components** | [react.dev/learn/sharing-state-between-components](https://react.dev/learn/sharing-state-between-components) | Đọc kỹ ví dụ nhiệt độ sôi.                 |
| **React.dev — Forms**                            | [react.dev/learn/forms](https://react.dev/learn/forms)                                                       | Controlled vs Uncontrolled, form nâng cao. |
| **HTML form events (MDN)**                       | [developer.mozilla.org/en-US/docs/Web/Events](https://developer.mozilla.org/en-US/docs/Web/Events)           | Tham khảo nhanh các sự kiện.               |


---



## ➡️ Bước tiếp theo

Sau khi nắm vững buổi 3, **Buổi 4 — useEffect & Side Effects** sẽ trình bày:

- `useEffect` là gì và tại sao cần (gọi API, đồng bộ với localStorage, setInterval...).
- **Dependencies array** — khi nào effect chạy lại.
- **Cleanup function** — dọn dẹp khi component unmount.
- Gọi API thật từ server với `fetch` + `useEffect`.
- Tự làm ứng dụng "Xem thời tiết" gọi API Open-Meteo.


# Buổi 4: Học `useEffect` trong React — dành cho người mới

> **Mục tiêu:** Biết khi nào dùng `useEffect`, dùng được với dữ liệu thay đổi và gọi API. Sau bài học, tự chạy được một ứng dụng thời tiết nhỏ.
>
> **Cách học:** đọc giải thích → chép code vào đúng file → chạy thử → kiểm tra kết quả. Bạn **không cần** hiểu hết những dòng code nâng cao ngay từ lần đầu.

## 1. Trước khi học

Bạn cần biết React component, `useState`, nút bấm `onClick` và cách chạy một dự án React cơ bản. Nếu chưa có dự án, làm phần 2 trước.

| Bạn cần làm được | Ví dụ |
|---|---|
| Đổi nội dung khi bấm nút | `useState` |
| Chạy việc sau khi giao diện xuất hiện | `useEffect` |
| Chạy lại khi dữ liệu thay đổi | `[city]` |
| Dừng tác vụ khi không cần nữa | `cleanup` |
| Lấy dữ liệu từ Internet | `fetch` |

**Thứ tự học:** 2. Cài đặt → 3. Hiểu `useEffect` → 4. Chạy lại và dọn dẹp → 5. Gọi API → 6. Dự án thời tiết → 7. Lỗi thường gặp → 8. Bài tập. Các kiến thức khó được để riêng ở phần 9.

## 2. Tạo dự án React

### Bước 1 — Kiểm tra Node.js

Mở VS Code → **Terminal → New Terminal**, chạy:

```bash
node -v
npm -v
```

Nếu báo không nhận lệnh, cài Node.js từ https://nodejs.org và mở lại VS Code.

### Bước 2 — Tạo dự án

```bash
npm create vite@latest useeffect-practice -- --template react
cd useeffect-practice
npm install
npm run dev
```

Mở địa chỉ terminal hiển thị (thường `http://localhost:5173`). Nếu thấy trang React/Vite là đã thành công. Giữ terminal chạy trong lúc học.

### Bước 3 — Mở file cần sửa

Trong VS Code, mở thư mục `useeffect-practice`, vào `src/App.jsx`. Đây là file bạn sẽ sửa trong các ví dụ đầu bài. Mỗi ví dụ ghi **Thay nội dung `App.jsx`** nghĩa là xóa code ví dụ trước, không chép chồng lên nhau.

## 3. `useEffect` là gì?

React dùng `useState` để lưu thông tin và vẽ giao diện. Nhưng đôi khi bạn cần thực hiện việc khác như **đổi tiêu đề tab**, **bật đồng hồ** hoặc **lấy dữ liệu từ API**. Khi cần đồng bộ component với những thứ bên ngoài React, bạn có thể dùng `useEffect`.

### Ví dụ 1 — Đổi tiêu đề tab

**Thay toàn bộ `src/App.jsx`:**

```jsx
import { useEffect, useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Đã bấm ${count} lần`;
  }, [count]);

  return (
    <main>
      <h1>Đã bấm: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Bấm vào đây</button>
    </main>
  );
}
```

**Giải thích:**

- `useState(0)` lưu số lần bấm, bắt đầu từ 0.
- `setCount(...)` làm số lần bấm thay đổi.
- `useEffect(...)` cập nhật tiêu đề tab sau khi React cập nhật giao diện.
- `[count]` nghĩa là khi `count` thay đổi, React sẽ thực hiện effect lại.

**Tự kiểm tra:** bấm nút 3 lần. Trên trang thấy `Đã bấm: 3`; tiêu đề tab trình duyệt đổi thành `Đã bấm 3 lần`.

### Khi nào không cần `useEffect`?

Khi chỉ **tính một giá trị để hiển thị**, hãy tính trực tiếp:

```jsx
const total = price * quantity;
```

Không cần tạo state `total` rồi dùng `useEffect` chỉ để tính phép nhân. Tương tự, việc xử lý ngay khi người dùng bấm nút thường đặt trong `onClick`, không phải trong effect.

## 4. Khi nào effect chạy lại?

| Cách viết | Kết quả thường thấy |
|---|---|
| `useEffect(() => { ... }, [count])` | Chạy sau lần hiển thị đầu và khi `count` đổi |
| `useEffect(() => { ... }, [])` | Không chạy lại vì thay đổi state/props thông thường; dùng khi không đọc giá trị thay đổi |
| `useEffect(() => { ... })` | Chạy sau mỗi lần render; người mới nên tránh khi không cần |

**Lưu ý:** ở môi trường phát triển có `StrictMode`, React có thể chạy thêm một lượt kiểm tra effect. Vì vậy `[]` **không có nghĩa chắc chắn chỉ chạy đúng một lần**.

### Ví dụ 2 — Đồng hồ và cleanup

**Thay toàn bộ `src/App.jsx`:**

```jsx
import { useEffect, useState } from 'react';

export default function App() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(previous => previous + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return <h1>Đã chạy {seconds} giây</h1>;
}
```

**Giải thích:** `setInterval` tăng số giây mỗi 1.000 mili giây; `clearInterval(timer)` tắt bộ hẹn giờ khi component không còn được dùng hoặc React cần chạy lại effect. Hàm nằm sau `return` chính là **cleanup (dọn dẹp)**.

**Tự kiểm tra:** số giây tăng lần lượt 0, 1, 2, 3... Không tăng nhiều lần trong một giây.

**Điều cần nhớ:** tạo timer bằng `setInterval` thì thường cần dọn dẹp bằng `clearInterval`. Khi nghe sự kiện bằng `addEventListener` thì dọn dẹp bằng `removeEventListener`.

## 5. Dùng `useEffect` để lấy dữ liệu API

**API** là nơi ứng dụng yêu cầu dữ liệu từ một dịch vụ. Ví dụ sau lấy danh sách người dùng mẫu từ JSONPlaceholder, không cần tài khoản.

**Thay toàn bộ `src/App.jsx`:**

```jsx
import { useEffect, useState } from 'react';

export default function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function loadUsers() {
      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/users',
          { signal: controller.signal }
        );
        if (!response.ok) throw new Error('Máy chủ trả lỗi');
        const data = await response.json();
        if (!controller.signal.aborted) setUsers(data);
      } catch (err) {
        if (!controller.signal.aborted) setError('Không tải được người dùng');
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    loadUsers();
    return () => controller.abort();
  }, []);

  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (error) return <p>{error}</p>;

  return (
    <ul>
      {users.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
  );
}
```

**Đọc code theo thứ tự:**

1. `loading` ban đầu là `true` nên trang hiện **Đang tải dữ liệu...**.
2. `fetch(...)` gửi yêu cầu lấy người dùng.
3. `response.json()` đọc dữ liệu mà API trả về.
4. `setUsers(data)` lưu danh sách vào React để hiển thị.
5. Nếu lỗi mạng hoặc máy chủ báo lỗi, trang hiện thông báo.
6. `controller.abort()` hủy yêu cầu cũ khi component không cần nữa. **Bạn chỉ cần biết mục đích của dòng này ở lần học đầu.**

**Tự kiểm tra:** khi có Internet, trang hiển thị tên nhiều người dùng. Mở DevTools → Network để thấy request tới `jsonplaceholder.typicode.com/users`.

### Một số từ mới cần nhớ

| Từ | Hiểu đơn giản |
|---|---|
| `async` / `await` | Viết các bước xử lý dữ liệu bất đồng bộ theo thứ tự dễ đọc |
| `try` / `catch` | Thử chạy, nếu lỗi thì xử lý ở `catch` |
| `loading` | Đang đợi dữ liệu |
| `response.ok` | Kiểm tra HTTP có báo thành công không |
| `AbortController` | Công cụ hủy request không còn cần thiết |

## 6. Thực hành cuối buổi — ứng dụng xem thời tiết

Ứng dụng có chọn **Hà Nội, Đà Nẵng, TP. Hồ Chí Minh**, xem nhiệt độ và tốc độ gió, có nút làm mới và thông báo lỗi. API Open-Meteo miễn phí, không cần API key. Phần này dùng lại đúng bộ mã nguồn của dự án mẫu đi kèm.

### Bước 1 — Tạo các thư mục và file

Trong thư mục `src`, tạo theo cấu trúc dưới đây. Với dự án Vite mới, bạn có thể **giữ `index.html` và `vite.config.js` sẵn có**.

```text
src/
├── main.jsx
├── App.jsx
├── styles.css
├── api/
│   └── weather.js
├── components/
│   └── WeatherCard.jsx
├── data/
│   └── cities.js
└── hooks/
    └── useWeather.js
```

**Tạo lần lượt:** nhấp phải thư mục `src` → New Folder / New File. Tên phải trùng chữ hoa, chữ thường và đuôi `.js` / `.jsx` như trong hình cây.

### Bước 2 — Danh sách thành phố

Mục đích: lưu tên và tọa độ để khi chọn thành phố, API lấy đúng nơi.

**File `src/data/cities.js`**

```js
// Dùng danh sách cố định để mỗi lựa chọn có tọa độ thực sự khác nhau.
export const CITIES = [
  { id: 'hanoi', name: 'Hà Nội', latitude: 21.0285, longitude: 105.8542 },
  { id: 'danang', name: 'Đà Nẵng', latitude: 16.0544, longitude: 108.2022 },
  { id: 'hcm', name: 'TP. Hồ Chí Minh', latitude: 10.8231, longitude: 106.6297 },
];
```

`latitude` và `longitude` là hai tọa độ xác định vị trí. **Chưa cần nhớ các con số**, chỉ hiểu mỗi thành phố phải có tọa độ riêng.

### Bước 3 — Tạo địa chỉ gọi API

Mục đích: tạo đường dẫn lấy nhiệt độ và gió của thành phố đã chọn.

**File `src/api/weather.js`**

```js
export function getWeatherUrl(city) {
  const params = new URLSearchParams({
    latitude: String(city.latitude),
    longitude: String(city.longitude),
    current: 'temperature_2m,wind_speed_10m',
    timezone: 'auto',
  });

  return `https://api.open-meteo.com/v1/forecast?${params.toString()}`;
}
```

`getWeatherUrl(city)` nhận một thành phố và trả về URL gửi tới Open-Meteo. Tách riêng file để sau này đổi API dễ hơn. `URLSearchParams` giúp ghép các tham số vào đường dẫn.

### Bước 4 — Viết hook tải thời tiết

Mục đích: gọi API khi thành phố thay đổi và báo lại trạng thái tải dữ liệu cho giao diện. **Đây là file khó nhất trong bài. Lần đầu chỉ cần hiểu 4 ý phía dưới, không cần học thuộc từng dòng.**

**File `src/hooks/useWeather.js`**

```js
import { useEffect, useState } from 'react';
import { getWeatherUrl } from '../api/weather.js';

// Hook nhận thành phố và số lần làm mới do App quản lý.
export default function useWeather(city, refreshKey) {
  const url = getWeatherUrl(city);
  const requestKey = `${url}|${refreshKey}`;
  const [result, setResult] = useState({
    requestKey: null,
    status: 'loading',
    weather: null,
    timezone: '',
    error: '',
  });

  useEffect(() => {
    const controller = new AbortController();
    setResult({ requestKey, status: 'loading', weather: null, timezone: '', error: '' });

    async function loadWeather() {
      try {
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Máy chủ trả về HTTP ${response.status}`);
        }

        const data = await response.json();
        const weather = data?.current;
        if (!weather || !Number.isFinite(weather.temperature_2m)
          || !Number.isFinite(weather.wind_speed_10m)) {
          throw new Error('Dữ liệu thời tiết không đúng định dạng');
        }

        if (!controller.signal.aborted) {
          setResult({
            requestKey, status: 'success', weather,
            timezone: data.timezone_abbreviation ?? '', error: '',
          });
        }
      } catch (error) {
        if (controller.signal.aborted) return;
        setResult({
          requestKey, status: 'error', weather: null, timezone: '',
          error: error instanceof Error ? error.message : 'Lỗi không xác định',
        });
      }
    }

    loadWeather();
    return () => controller.abort();
  }, [url, requestKey]);

  // Không hiện dữ liệu thành phố cũ ngay sau khi người dùng đổi lựa chọn.
  if (result.requestKey !== requestKey) {
    return { status: 'loading', weather: null, timezone: '', error: '' };
  }
  return result;
}
```

Đọc file này theo 4 ý:

1. `getWeatherUrl(city)` xác định API cần gọi.
2. `useEffect` gửi request khi địa chỉ API hoặc số lần làm mới đổi.
3. `setResult` lưu trạng thái **đang tải / thành công / lỗi**.
4. `return () => controller.abort()` hủy request trước đó để hạn chế hiển thị nhầm dữ liệu khi chuyển thành phố nhanh.

`useWeather` được gọi là **custom hook**: hàm chúng ta tự viết để gom logic React sử dụng ở component khác.

### Bước 5 — Tạo phần hiển thị thời tiết

Mục đích: chỉ nhận dữ liệu và hiện nội dung ra màn hình; file này **không tự gọi API**.

**File `src/components/WeatherCard.jsx`**

```jsx
export default function WeatherCard({ city, weather, timezone }) {
  return (
    <section className="weather-card" aria-label={`Thời tiết ${city.name}`}>
      <h2>{city.name}</h2>
      <p>Nhiệt độ: <strong>{weather.temperature_2m} °C</strong></p>
      <p>Tốc độ gió: <strong>{weather.wind_speed_10m} km/h</strong></p>
      <p>
        Cập nhật: {weather.time?.replace('T', ' ') ?? 'Không rõ thời điểm'}
        {timezone ? ` (${timezone})` : ''}
      </p>
    </section>
  );
}
```

`city`, `weather` và `timezone` được truyền từ `App.jsx` vào dưới dạng **props**. Giao diện hiện nhiệt độ, gió và thời điểm cập nhật.

### Bước 6 — Kết nối các phần trong `App.jsx`

Đây là file chính cho phép chọn thành phố và bấm **Làm mới dữ liệu**.

**File `src/App.jsx`**

```jsx
import { useState } from 'react';
import { CITIES } from './data/cities.js';
import useWeather from './hooks/useWeather.js';
import WeatherCard from './components/WeatherCard.jsx';

export default function App() {
  const [cityId, setCityId] = useState('hanoi');
  const [refreshKey, setRefreshKey] = useState(0);
  const city = CITIES.find((item) => item.id === cityId) ?? CITIES[0];
  const { status, weather, timezone, error } = useWeather(city, refreshKey);

  function refresh() {
    setRefreshKey((previous) => previous + 1);
  }

  return (
    <main className="container">
      <h1>Thực hành useEffect: Xem thời tiết</h1>
      <p>Chọn thành phố để tải dữ liệu thực tế từ Open-Meteo.</p>

      <div className="controls">
        <label htmlFor="city">Thành phố</label>
        <select id="city" value={cityId}
          onChange={(event) => setCityId(event.target.value)}>
          {CITIES.map((item) => (
            <option key={item.id} value={item.id}>{item.name}</option>
          ))}
        </select>
        <button type="button" onClick={refresh} disabled={status === 'loading'}>
          Làm mới dữ liệu
        </button>
      </div>

      {status === 'loading' && <p role="status">Đang tải thời tiết...</p>}
      {status === 'error' && (
        <div role="alert">
          <p>Không tải được thời tiết: {error}</p>
          <button type="button" onClick={refresh}>Thử lại</button>
        </div>
      )}
      {status === 'success' && weather && (
        <WeatherCard city={city} weather={weather} timezone={timezone} />
      )}
      <p className="note">API công khai phục vụ thực hành, yêu cầu kết nối Internet.</p>
    </main>
  );
}
```

**Cách `App.jsx` hoạt động:**

- `cityId` lưu lựa chọn trên ô chọn.
- `CITIES.find(...)` tìm thông tin của thành phố đó.
- `useWeather(city, refreshKey)` gọi logic lấy dữ liệu đã viết ở bước 4.
- Khi `status` là `loading`, hiện thông báo đang tải; `error` thì hiện lỗi; `success` thì hiển thị `WeatherCard`.
- Nút **Làm mới** tăng `refreshKey` để lấy dữ liệu lại.

### Bước 7 — Khởi động React và thêm CSS

`main.jsx` hiển thị component `App` vào trang HTML.

**File `src/main.jsx`**

```jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

Tạo file `src/styles.css` và chép CSS trong bộ source mẫu. CSS **chỉ làm giao diện dễ nhìn**, không ảnh hưởng kiến thức `useEffect`. Để tập trung học, bạn có thể bắt đầu bằng đoạn CSS ngắn sau:

```css
body { font-family: Arial, sans-serif; margin: 24px; line-height: 1.6; }
.container { max-width: 700px; margin: auto; }
.controls { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; }
select, button { padding: 8px; }
.weather-card { margin-top: 20px; padding: 16px; border: 1px solid #ddd; border-radius: 8px; }
```

### Bước 8 — Chạy và kiểm tra

Trong terminal tại thư mục dự án:

```bash
npm run dev
```

Mở địa chỉ local mà Vite hiển thị. Kiểm tra từng thao tác:

| Bạn làm gì? | Kết quả đúng |
|---|---|
| Vừa mở trang | Mặc định chọn Hà Nội, hiện thời tiết sau khi tải xong |
| Chọn Đà Nẵng | Hiển thị tên Đà Nẵng và dữ liệu mới |
| Chọn TP. Hồ Chí Minh | Hiển thị tên và dữ liệu tương ứng |
| Bấm Làm mới dữ liệu | Gọi API lại |
| Mất mạng hoặc API lỗi | Có thông báo lỗi, không đứng mãi ở trạng thái tải |

**Chú ý:** nếu API chưa phản hồi, cần kết nối Internet. Không nên kỳ vọng số nhiệt độ cố định vì dữ liệu thời tiết thay đổi theo thời gian.

## 7. Lỗi thường gặp

| Biểu hiện | Kiểm tra và sửa |
|---|---|
| Trang trắng | Mở DevTools → Console, tìm tên file và dòng báo lỗi |
| `useEffect is not defined` | Đã thêm `import { useEffect } from 'react'` chưa? |
| `Failed to resolve import` | Kiểm tra tên file, thư mục và đường dẫn import |
| Loading mãi | Kiểm tra Internet và request trong Network |
| API báo lỗi | Kiểm tra `response.ok` và nội dung ở Console |
| Timer tăng nhanh bất thường | Kiểm tra đã có `clearInterval` trong cleanup chưa |
| Effect chạy thêm khi mới mở trang | Có thể là lượt kiểm tra của `StrictMode` trong development |

## 8. Bài tập theo mức độ

**Bài 1 — Cơ bản:** sửa ví dụ nút bấm ở phần 3 để tiêu đề tab có dạng `Số lần click: 5`. Hoàn thành khi tiêu đề thay đổi đúng sau mỗi lần bấm.

**Bài 2 — Cơ bản:** sửa ví dụ đồng hồ phần 4, thêm nút ẩn/hiện đồng hồ bằng `useState`. Hoàn thành khi ẩn đồng hồ rồi hiện lại mà không bị nhiều timer chạy trùng.

**Bài 3 — Thực hành API:** sửa phần 5 để hiển thị cả tên và email. Hoàn thành khi danh sách tải được, đồng thời có thông báo khi không có Internet.

**Bài 4 — Dự án:** thêm một thành phố mới vào `cities.js`, kiểm tra lựa chọn mới hiện trên giao diện và API sử dụng tọa độ tương ứng.

## 9. Kiến thức mở rộng — học sau khi đã chạy được dự án

Phần này **không bắt buộc trong lần học đầu**.

- **Stale closure:** hàm chạy muộn có thể đọc giá trị cũ của state. Khi effect sử dụng state hoặc props, cần xem lại danh sách phụ thuộc. Với tăng số đếm từ giá trị cũ, cách viết `setCount(previous => previous + 1)` thường phù hợp.
- **Debounce:** đợi người dùng ngừng gõ một chút rồi mới thực hiện tìm kiếm, tránh gọi API cho từng ký tự.
- **`useRef`:** lưu tham chiếu đến phần tử trên trang hoặc một giá trị không cần làm giao diện render lại.
- **Race condition:** request cũ có thể trả về sau request mới. `AbortController` và kiểm tra trạng thái hủy giúp tránh kết quả cũ ghi đè.
- **StrictMode:** trong môi trường phát triển, React có thể chạy thêm chu kỳ thiết lập/dọn dẹp để phát hiện effect thiếu cleanup. Không nên tắt chỉ vì thấy effect chạy thêm.

## 10. Tự đánh giá

- [ ] Tự tạo và chạy được React bằng Vite.
- [ ] Giải thích được `useEffect` dùng để làm gì.
- [ ] Biết `[count]` khác `[]` như thế nào.
- [ ] Biết vì sao timer cần `clearInterval`.
- [ ] Biết hiển thị ba trạng thái: đang tải, thành công, lỗi.
- [ ] Chạy được Weather App và đổi thành phố thật sự đổi dữ liệu.
- [ ] Biết kiểm tra Console và Network khi chương trình lỗi.

**Bước tiếp theo:** Buổi 5 — React Router: tạo nhiều trang, chuyển trang và đọc thông tin từ URL.

## Tài liệu tham khảo

- [React: useEffect](https://react.dev/reference/react/useEffect)
- [React: You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)
- [MDN: Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
- [Open-Meteo](https://open-meteo.com/)


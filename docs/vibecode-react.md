# Gợi ý công nghệ và prompt chung khi làm dự án ReactJS

Tài liệu này dùng như một bộ khung tham khảo nhanh. Không cần cài tất cả công nghệ bên dưới; chỉ chọn công nghệ giải quyết đúng nhu cầu của dự án.

## 1. Gợi ý công nghệ

### Công nghệ nền tảng

| Nhu cầu | Gợi ý | Ghi chú |
| --- | --- | --- |
| Xây dựng giao diện | React | Chia giao diện thành các component nhỏ, dễ tái sử dụng |
| Khởi tạo và build dự án | Vite | Phù hợp với phần lớn dự án React phía client |
| Ngôn ngữ | JavaScript hoặc TypeScript | Dùng TypeScript khi dự án có nhiều dữ liệu, API hoặc nhiều người cùng làm |
| CSS | Tailwind CSS | Dựng giao diện nhanh bằng utility class |
| Điều hướng | React Router | Dùng khi ứng dụng có nhiều trang hoặc URL |
| Kiểm tra code | ESLint + Prettier | Giúp phát hiện lỗi và thống nhất cách trình bày code |

### Giao diện

| Nhu cầu | Gợi ý |
| --- | --- |
| Component có sẵn, dễ tùy chỉnh | shadcn/ui |
| Component hỗ trợ accessibility | Radix UI hoặc Headless UI |
| Icon | Lucide React hoặc React Icons |
| Hiệu ứng chuyển động | Motion |
| Biểu đồ | Recharts hoặc Chart.js |
| Thông báo toast | Sonner hoặc React Hot Toast |

### State và dữ liệu

| Nhu cầu | Gợi ý |
| --- | --- |
| State đơn giản trong component | `useState` |
| State có nhiều hành động liên quan | `useReducer` |
| Chia sẻ state cho một nhóm component | Context API |
| Global state phức tạp hơn | Zustand hoặc Redux Toolkit |
| Gọi API đơn giản | `fetch` hoặc Axios |
| Cache và đồng bộ dữ liệu server | TanStack Query |

Ưu tiên giải pháp đơn giản trước. Không dùng global state nếu state chỉ cần trong một hoặc hai component gần nhau.

### Form và validation

| Nhu cầu | Gợi ý |
| --- | --- |
| Form ngắn | Controlled form với `useState` |
| Form dài hoặc nhiều field | React Hook Form |
| Validation theo schema | Zod hoặc Yup |

### Backend và cơ sở dữ liệu

| Nhu cầu | Gợi ý |
| --- | --- |
| Backend JavaScript đơn giản | Node.js + Express |
| Backend có cấu trúc rõ ràng | NestJS |
| Backend-as-a-Service | Supabase hoặc Firebase |
| Cơ sở dữ liệu quan hệ | PostgreSQL hoặc MySQL |
| Cơ sở dữ liệu tài liệu | MongoDB |
| ORM | Prisma hoặc Drizzle |
| Authentication | Supabase Auth, Firebase Auth, Clerk hoặc Auth.js |

### Testing và triển khai

| Nhu cầu | Gợi ý |
| --- | --- |
| Unit test | Vitest |
| Test component | React Testing Library |
| End-to-end test | Playwright hoặc Cypress |
| Deploy frontend | Vercel, Netlify hoặc Cloudflare Pages |
| Deploy full-stack/backend | Vercel, Render, Railway hoặc Fly.io |

### Stack tham khảo

Stack nhỏ để học và làm bài tập:

```text
React + Vite + Tailwind CSS + React Router
```

Stack cho ứng dụng CRUD gọi API:

```text
React + Vite + Tailwind CSS + React Router
TanStack Query + React Hook Form + Zod
```

Stack full-stack đơn giản:

```text
React + Vite + Tailwind CSS
Node.js + Express + PostgreSQL + Prisma
```

Stack làm nhanh sản phẩm thử nghiệm:

```text
React + Vite + Tailwind CSS + Supabase
```

## 2. Công thức prompt chung

Một prompt rõ ràng nên có các phần sau:

```text
Bối cảnh dự án
Nhiệm vụ cần làm
Yêu cầu chức năng
Yêu cầu giao diện
Ràng buộc kỹ thuật
Tiêu chí hoàn thành
Cách AI báo cáo kết quả
```

Mẫu chung:

```text
Bạn đang hỗ trợ tôi phát triển một dự án React.

Bối cảnh:
- Công nghệ đang dùng: [React, Vite, Tailwind CSS, ...]
- Chức năng hiện tại: [mô tả ngắn]
- Các file liên quan: [liệt kê file nếu biết]

Nhiệm vụ:
- [mô tả một việc cụ thể cần làm]

Yêu cầu:
- [yêu cầu chức năng]
- [yêu cầu giao diện]
- [yêu cầu responsive]
- [các trường hợp loading, empty, error nếu có]

Ràng buộc:
- Giữ nguyên các chức năng không liên quan.
- Không cài package mới nếu chưa cần thiết.
- Tái sử dụng component và style hiện có.
- Không sửa nhiều file ngoài phạm vi yêu cầu.

Tiêu chí hoàn thành:
- [hành vi có thể kiểm tra được]
- Không có lỗi trong Console.
- Lint và build thành công.

Trước khi sửa, hãy đọc các file liên quan và nêu kế hoạch ngắn.
Sau khi sửa, liệt kê file đã thay đổi, giải thích ngắn và báo kết quả kiểm tra.
```

## 3. Prompt mẫu dùng cho nhiều dự án

### Khảo sát dự án

```text
Hãy đọc cấu trúc và các file quan trọng của dự án React này nhưng chưa sửa code.

Cho tôi biết:
1. Dự án đang dùng những công nghệ và package chính nào.
2. Entry point, router, layout và nơi quản lý state nằm ở đâu.
3. Cấu trúc component hiện tại có điểm nào cần lưu ý.
4. Các lệnh dùng để chạy, lint, test và build.
5. Đề xuất thứ tự thực hiện yêu cầu sau: [mô tả yêu cầu].

Không phỏng đoán nội dung của file chưa đọc.
```

### Tạo một trang mới

```text
Tạo trang [tên trang] cho dự án React hiện tại.

Trang gồm:
- [khu vực 1]
- [khu vực 2]
- [khu vực 3]

Yêu cầu:
- Dùng React và Tailwind CSS.
- Responsive tốt trên mobile, tablet và desktop.
- Tái sử dụng layout và component đang có.
- Có trạng thái loading, dữ liệu rỗng và lỗi nếu trang dùng API.
- Dùng semantic HTML và hỗ trợ thao tác bằng bàn phím.
- Thêm route phù hợp nhưng không làm hỏng các route cũ.
```

### Tạo component tái sử dụng

```text
Tạo component [tên component] có thể tái sử dụng.

Component cần hỗ trợ:
- Props: [danh sách props].
- Các trạng thái: [default, hover, disabled, loading, error, ...].
- Có thể truyền thêm className.
- Responsive và hỗ trợ accessibility.

Không hard-code dữ liệu nghiệp vụ trong component.
Viết ví dụ sử dụng component sau khi hoàn thành.
```

### Chuyển giao diện sang Tailwind CSS

```text
Chuyển phần giao diện trong [file/component] sang Tailwind CSS.

Yêu cầu:
- Giữ nguyên hành vi và logic hiện tại.
- Giữ giao diện gần giống thiết kế cũ.
- Xóa CSS cũ chỉ khi chắc chắn không còn nơi nào sử dụng.
- Hạn chế class lặp lại; tách component khi thực sự có lợi.
- Kiểm tra responsive sau khi sửa.
```

### Thêm một tính năng

```text
Thêm tính năng [tên tính năng] vào dự án React hiện tại.

Luồng mong muốn:
1. Người dùng [hành động].
2. Hệ thống [phản hồi].
3. Khi thành công [kết quả].
4. Khi thất bại [cách hiển thị lỗi].

Yêu cầu:
- Chỉ thay đổi các file liên quan trực tiếp.
- Không làm thay đổi hành vi cũ ngoài phạm vi tính năng.
- Giữ state ở vị trí gần nơi sử dụng nhất.
- Không lưu state có thể tính được từ state khác.
- Đề xuất test case cho luồng chính và trường hợp biên.
```

### Kết nối API

```text
Kết nối màn hình [tên màn hình] với API [endpoint].

Thông tin API:
- Method: [GET/POST/PUT/PATCH/DELETE]
- Request: [mô tả body hoặc params]
- Response: [mô tả dữ liệu trả về]

Yêu cầu:
- Tách logic gọi API khỏi component giao diện.
- Xử lý loading, error và empty state.
- Không hiển thị dữ liệu cũ sai ngữ cảnh.
- Không hard-code token, API key hoặc secret trong source code.
- Hủy hoặc bỏ qua request cũ nếu người dùng đổi dữ liệu quá nhanh.
```

### Tạo form

```text
Tạo form [tên form] gồm các trường: [danh sách field].

Yêu cầu:
- Có label rõ ràng cho từng field.
- Validate dữ liệu và hiển thị lỗi gần field tương ứng.
- Không cho submit nhiều lần khi đang xử lý.
- Có thông báo thành công và thất bại.
- Không xóa dữ liệu người dùng đã nhập khi request thất bại.
- Hỗ trợ dùng bàn phím và trình đọc màn hình.
```

### Sửa lỗi

```text
Hãy chẩn đoán lỗi sau trong dự án React:

Hiện tượng:
[mô tả lỗi]

Cách tái hiện:
1. [bước 1]
2. [bước 2]
3. [bước 3]

Kết quả mong đợi:
[mô tả]

Kết quả thực tế:
[mô tả]

Thông báo lỗi:
[dán nguyên văn lỗi]

Trước tiên hãy tìm nguyên nhân và chỉ ra bằng chứng trong code.
Sau đó sửa tối thiểu, không refactor phần không liên quan.
Cuối cùng hãy chạy kiểm tra và giải thích vì sao bản sửa giải quyết được lỗi.
```

### Tối ưu hoặc refactor

```text
Review và refactor [file/component] với mục tiêu [dễ đọc, giảm render, tách logic, ...].

Yêu cầu:
- Không thay đổi hành vi bên ngoài.
- Chỉ tối ưu khi chỉ ra được vấn đề cụ thể.
- Không dùng useMemo, useCallback hoặc memo một cách máy móc.
- Giữ API và props hiện tại nếu không có lý do bắt buộc phải đổi.
- Mô tả ngắn lợi ích và đánh đổi của từng thay đổi.
```

### Viết test

```text
Viết test cho [component/tính năng].

Các hành vi cần kiểm tra:
- [hành vi 1]
- [hành vi 2]
- [trường hợp lỗi]
- [trường hợp biên]

Ưu tiên test theo cách người dùng nhìn thấy và tương tác.
Không kiểm tra chi tiết triển khai nội bộ nếu không cần thiết.
Chạy test và báo rõ test nào đã vượt qua hoặc thất bại.
```

### Review code AI vừa tạo

```text
Hãy review các thay đổi vừa thực hiện như một reviewer độc lập.

Kiểm tra:
1. Có đáp ứng đúng yêu cầu không.
2. Có làm hỏng chức năng cũ không.
3. State và useEffect có hợp lý không.
4. Có lỗi responsive hoặc accessibility không.
5. Có lộ secret, thiếu validation hoặc rủi ro bảo mật không.
6. Có dependency hoặc đoạn code thừa không.
7. Còn thiếu test case nào.

Liệt kê vấn đề theo mức độ nghiêm trọng, kèm file và vị trí cụ thể.
Không sửa code cho đến khi review xong.
```

## 4. Prompt ngắn để tiếp tục phiên làm việc

```text
Đọc lại yêu cầu ban đầu và kiểm tra tiến độ hiện tại. Tiếp tục từ phần còn thiếu, không làm lại phần đã hoàn thành. Trước khi sửa, cho biết bước tiếp theo là gì.
```

```text
Thay đổi vừa rồi chưa đúng ở điểm sau: [mô tả]. Hãy giữ nguyên các phần đã đúng và chỉ sửa phần này. Không viết lại toàn bộ component.
```

```text
Hãy chia yêu cầu này thành các bước nhỏ có thể kiểm tra độc lập. Chỉ thực hiện bước đầu tiên và chờ tôi kiểm tra trước khi tiếp tục.
```

```text
Không sửa code. Hãy giải thích luồng dữ liệu, vị trí giữ state và vai trò của từng file liên quan đến tính năng này.
```

```text
Hãy liệt kê chính xác những file đã thay đổi, lý do thay đổi và các lệnh kiểm tra đã chạy. Nếu chưa chạy được kiểm tra nào, hãy nói rõ.
```

## 5. Lưu ý khi dùng AI để code React

- Cho AI biết stack, cấu trúc dự án và phiên bản package trước khi yêu cầu sửa.
- Mỗi prompt chỉ nên tập trung vào một tính năng hoặc một lỗi cụ thể.
- Mô tả hành vi mong muốn thay vì chỉ nói “làm đẹp hơn” hoặc “tối ưu đi”.
- Yêu cầu AI đọc file hiện có trước khi tạo file hoặc component mới.
- Không cho phép tự ý cài package nếu tính năng có thể làm bằng công nghệ đang có.
- Không đưa API key, mật khẩu, token hoặc dữ liệu cá nhân vào prompt.
- Luôn đọc phần thay đổi và chạy ứng dụng sau mỗi bước.
- Kiểm tra cả loading, empty, error, disabled và responsive state.
- Không tin câu “đã hoàn thành” nếu chưa có kết quả lint, test hoặc build.
- Giữ commit nhỏ để dễ kiểm tra và hoàn tác.

## 6. Checklist trước khi chấp nhận code

- [ ] Chức năng đúng với yêu cầu ban đầu.
- [ ] Không có lỗi trong Console và terminal.
- [ ] Không làm hỏng route hoặc chức năng cũ.
- [ ] Giao diện hoạt động trên mobile và desktop.
- [ ] Form có label, validation và thông báo lỗi.
- [ ] Có loading, empty và error state khi gọi API.
- [ ] Không lưu state trùng lặp hoặc sửa state trực tiếp.
- [ ] `useEffect` có dependency hợp lý và cleanup khi cần.
- [ ] Không hard-code secret hoặc dữ liệu nhạy cảm.
- [ ] Không thêm dependency không cần thiết.
- [ ] Đã chạy lint, test và build nếu dự án có các script này.
- [ ] Bạn có thể tự giải thích đoạn code AI vừa tạo.

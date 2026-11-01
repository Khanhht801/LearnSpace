# Langmaster — Màu sắc và font chữ

Nguồn: [Trang chủ Langmaster](https://langmaster.edu.vn/). Ngày truy vấn: 01/11/2026.

Tài liệu trích xuất các khai báo từ HTML và CSS đang được trang chủ tải, bao gồm CSS riêng và style nội tuyến. Đây là thông số trong mã nguồn, chưa đo computed style bằng trình duyệt; một số giá trị có thể bị ghi đè theo thành phần, thứ tự CSS hoặc kích thước màn hình. Không bao gồm màu/chữ nằm bên trong ảnh banner.

## 1. Bảng màu

| Vai trò | Giá trị | Bằng chứng trong CSS |
| --- | --- | --- |
| Đỏ chủ đạo | `#DB1F1F` | `--primary-color`; nút, viền active, liên kết hover |
| Đỏ đậm | `#9D0B0F` | Điểm cuối gradient thương hiệu |
| Đỏ hover | `#B71C1C` | Khai báo `.btn-register:hover` |
| Chữ chính | `#252525` | `--secondary-color`; menu, tên khóa học, mô tả lợi ích |
| Chữ đen | `#000000` | Tiêu đề biểu mẫu, tên học viên |
| Trắng | `#FFFFFF` | Nền menu, card, form; chữ trên CTA và footer |
| Hồng nhạt | `#F7DEDE` | Biến `--light-red` |
| Hồng nền card | `#FFF2F2` | `.benefits-card` |
| Nền input | `#F2F4F5` | `.form-control`, `.hero-form .form-control` |
| Placeholder | `#B7C6CD` | `.form-control::placeholder` |
| Nền footer | `#231F20` | `.footer-section` |
| Vàng CTA | `#FDDA35` → `#FE9C2B` | Gradient `.btn-register-test` |

Gradient nhận diện: hướng từ trên xuống, `#DB1F1F` tại 0% đến `#9D0B0F` tại 100%. Dùng cho hero, CTA và chữ tiêu đề có `background-clip: text`.

Gradient nút test: hướng từ trên xuống, `#FDDA35` tại 36% đến `#FE9C2B` tại 100%; chữ đỏ và viền trắng.

Các màu phụ trong thẻ học viên ở style nội tuyến trang chủ:

| Nhãn | Màu chữ/viền | Nền |
| --- | --- | --- |
| Học sinh | `#DB1F1F` | `#FFE5E5` |
| Sinh viên | `#E6691B` | `#FFEFE5` |
| Người đi làm | `#BB9625` | `#FFFAE5` |

## 2. Font chữ

Font chính được khai báo là **SVN-Gilroy**, dự phòng `sans-serif`. Áp dụng toàn cục, cho body, đoạn văn, liên kết và các cấp heading. Font được tự lưu trữ qua [fonts/all.css](https://langmaster.edu.vn/fonts/all.css), được import từ CSS chính; không phải suy đoán từ hình ảnh.

File font khai báo family `SVN-Gilroy` với các weight **200, 300, 400, 500, 600, 700, 800, 900**, có cả normal và italic. Riêng weight 800 được ánh xạ tới file **Heavy**. Một số form/popup dùng các tên family riêng: `SVN-Gilroy-Bold`, `SVN-Gilroy-Medium`, `SVN-Gilroy-Regular`.

### Thang chữ trong CSS chính

| Thành phần / selector | Cỡ chữ | Weight | Line-height |
| --- | --- | --- | --- |
| `h1` cơ sở | 40px | 800 | 1.4 |
| `h2` cơ sở | 32px | 700 | 100% |
| `h3` cơ sở | 24px | 500 | 100% |
| `h4` cơ sở | 20px | 500 | 100% |
| `h5` cơ sở | 18px | 500 | 100% |
| Body | Theo kế thừa/framework | Theo kế thừa | 1.6 |
| Menu desktop `.nav-link-custom` | 18px | 700 | Theo kế thừa |
| Tiêu đề nhóm dropdown | 16px | 700 | 1.3 |
| Item dropdown | 14px | 500 | Theo kế thừa |
| Tên khóa học `.course-title` | 20px | 500; active 700 | 1.3 |
| Nội dung lợi ích `.benefit-text` | 18px | Theo kế thừa | 1.3 |
| Tiêu đề form `.form-title` | 24px | 700 | 1.3 |
| Input hero | 16px | 500 | Theo kế thừa |
| Nút đăng ký `.btn-register` | 22px | 800 | 1.3 |
| Chữ nút chi tiết `.btn-details span` | 20px | 700 | 1.15 |
| Tiêu đề footer | 24px | 700 | 1.3 |
| Liên kết footer | 18px | 500 | 1.3 |

Các heading cơ sở khai báo `letter-spacing: 0`. Tiêu đề hệ sinh thái `.ecosystem-title` viết hoa, căn giữa và tô chữ bằng gradient đỏ.

### Ví dụ responsive xác định từ mã nguồn

- Mốc chuyển bố cục quan trọng: desktop từ **992px**, mobile/tablet đến **991.98px**.
- Menu mobile: 16px, weight 700; màu đỏ khi hover, focus hoặc mở menu.
- Tiêu đề bảng vàng `.bv-title`: mobile **24px/28px**, desktop **40px/46px**, weight 700.
- CTA bảng vàng `.bv-cta`: mobile **18px**, desktop **24px**, weight 700, line-height 1.2.
- CSS chính còn giảm cỡ tiêu đề form và footer tại các media query; không nên coi bảng desktop là giá trị cố định trên mọi màn hình.

## 3. Hình dáng và hiệu ứng đi kèm

| Thuộc tính | Giá trị quan sát trong CSS |
| --- | --- |
| Bo góc mặc định | 12px |
| Card/form lớn | 20px |
| Nút dạng viên thuốc | 50px |
| Khoảng cách token | 8, 10, 12, 24, 48, 64px |
| Bóng đỏ mặc định | `0 4px 16px rgba(219, 31, 31, 0.15)` |
| Bóng card khóa học | `3px 4px 24px rgba(58, 22, 22, 0.1)` |
| Chuyển trạng thái mặc định | `all 0.3s ease` |
| Menu desktop | Nền trắng, chiều cao 72px, cố định phía trên |

Input hero có khai báo riêng cao 60px, nền xám nhạt, chữ `#252525`; khi focus chuyển nền trắng, viền đỏ và bóng đỏ mờ. Khai báo này cụ thể hơn `.form-control` cơ sở cao 48px. `.btn-register` cũng được khai báo lại phía sau với gradient và chiều cao 60px.

## 4. Token CSS tham khảo để tái sử dụng

Đoạn dưới tổng hợp và đổi tên token cho dễ áp dụng; không phải bản sao nguyên stylesheet. Cần nạp font SVN-Gilroy tương ứng để hiển thị đúng family.

```css
:root {
  --lm-font: "SVN-Gilroy", sans-serif;
  --lm-primary: #db1f1f;
  --lm-primary-dark: #9d0b0f;
  --lm-gradient: linear-gradient(180deg, #db1f1f 0%, #9d0b0f 100%);
  --lm-text: #252525;
  --lm-white: #ffffff;
  --lm-light-red: #f7dede;
  --lm-card-pink: #fff2f2;
  --lm-input-bg: #f2f4f5;
  --lm-placeholder: #b7c6cd;
  --lm-footer-bg: #231f20;
  --lm-radius: 12px;
  --lm-shadow: 0 4px 16px rgba(219, 31, 31, 0.15);
  --lm-transition: all 0.3s ease;
}
```

## 5. Nguồn đối chiếu

- [HTML trang chủ](https://langmaster.edu.vn/): danh sách stylesheet, style nội tuyến của bảng vàng và popup.
- [CSS chính — revival/style.css?v=4.5](https://langmaster.edu.vn/templates/revival/css/style.css?v=4.5): biến màu, typography, hero, card, form, footer, responsive.
- [Khai báo font — fonts/all.css](https://langmaster.edu.vn/fonts/all.css): tên font, weight, style và đường dẫn font tự lưu trữ.
- [CSS header — ocean/header.css?v=4.5](https://langmaster.edu.vn/templates/ocean/css/header.css?v=4.5): menu desktop và dropdown.
- [CSS form — ocean/new-register-form.css?v=4.5](https://langmaster.edu.vn/templates/ocean/css/new-register-form.css?v=4.5): style bổ sung cho form đăng ký.

Phạm vi là trang chủ tại thời điểm truy vấn; các landing page hoặc trang con có thể dùng bộ style khác. Tham số tracking trong URL người dùng gửi đã được bỏ khi truy vấn trang gốc.

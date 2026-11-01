# DNS cơ bản và cấu hình Domain cho GitHub Pages

## 1. DNS là gì?

DNS (Domain Name System) có thể hiểu đơn giản là **hệ thống chỉ đường
cho tên miền**.

Con người dễ nhớ:

`khanhht.tech`

Nhưng máy chủ trên Internet làm việc với địa chỉ IP. DNS giúp chuyển tên
miền thành thông tin cần thiết để trình duyệt biết phải kết nối tới đâu.

Ví dụ:

`khanhht.tech` → DNS → Server GitHub Pages → Website

------------------------------------------------------------------------

## 2. Domain gốc và ký hiệu `@`

Trong trang quản lý DNS, `@` thường đại diện cho **domain gốc (apex/root
domain)**.

Nếu domain là:

`khanhht.tech`

thì:

-   `@` → `khanhht.tech`
-   `www` → `www.khanhht.tech`
-   `blog` → `blog.khanhht.tech`
-   `api` → `api.khanhht.tech`

Ví dụ:

`A   @   185.199.108.153`

có thể đọc là:

> Domain gốc `khanhht.tech` được trỏ tới địa chỉ IPv4 `185.199.108.153`.

------------------------------------------------------------------------

## 3. A Record là gì?

**A Record** dùng để trỏ một tên miền tới một địa chỉ **IPv4**.

IPv4 thường có dạng:

`185.199.108.153`

Công thức dễ nhớ:

**A = Tên miền → IPv4**

Ví dụ GitHub Pages:

``` text
A   @   185.199.108.153
```

Luồng hoạt động:

`khanhht.tech` → `185.199.108.153` → GitHub Pages

GitHub Pages cung cấp nhiều địa chỉ IPv4, vì vậy có thể cấu hình:

``` text
A   @   185.199.108.153
A   @   185.199.109.153
A   @   185.199.110.153
A   @   185.199.111.153
```

------------------------------------------------------------------------

## 4. AAAA Record là gì?

**AAAA Record** có chức năng tương tự A Record, nhưng dùng cho địa chỉ
**IPv6**.

Công thức:

-   `A` → IPv4
-   `AAAA` → IPv6

Ví dụ IPv4:

`185.199.108.153`

Ví dụ IPv6:

`2606:50c0:8000::153`

Một AAAA Record:

``` text
AAAA   @   2606:50c0:8000::153
```

có thể hiểu là:

> Khi kết nối bằng IPv6, domain `khanhht.tech` có thể được phân giải tới
> địa chỉ IPv6 này của GitHub Pages.

Ví dụ cấu hình GitHub Pages:

``` text
AAAA   @   2606:50c0:8000::153
AAAA   @   2606:50c0:8001::153
AAAA   @   2606:50c0:8002::153
AAAA   @   2606:50c0:8003::153
```

------------------------------------------------------------------------

## 5. CNAME là gì?

**CNAME** dùng để cho một tên miền/subdomain đi theo **một tên miền
khác**, thay vì nhập trực tiếp địa chỉ IP.

Công thức dễ nhớ:

**CNAME = Tên miền → Tên miền khác**

Ví dụ:

``` text
CNAME   www   khanhht801.github.io
```

Nghĩa là:

`www.khanhht.tech` → `khanhht801.github.io` → GitHub Pages

Điểm khác biệt quan trọng:

``` text
A      : domain → IP
AAAA   : domain → IPv6
CNAME  : domain → domain khác
```

------------------------------------------------------------------------

## 6. Tại sao cần thêm `www`?

`khanhht.tech` và `www.khanhht.tech` là hai hostname khác nhau.

Nếu chỉ cấu hình domain gốc:

`khanhht.tech` ✅

thì không có nghĩa DNS của:

`www.khanhht.tech`

đã tự động tồn tại.

Với GitHub Pages, có thể thêm:

``` text
CNAME   www   khanhht801.github.io
```

để `www.khanhht.tech` cũng được đưa tới GitHub Pages.

------------------------------------------------------------------------

## 7. TTL là gì?

**TTL (Time To Live)** cho biết thông tin DNS có thể được các hệ thống
trung gian lưu cache trong bao lâu trước khi kiểm tra lại.

Khi mới học hoặc không có yêu cầu đặc biệt, thường có thể để:

`TTL: Auto`

Đây cũng là lý do sau khi sửa DNS, thay đổi đôi khi **không xuất hiện
ngay lập tức** ở mọi nơi.

------------------------------------------------------------------------

## 8. Ví dụ cấu hình hoàn chỉnh cho GitHub Pages

Giả sử:

-   Domain: `khanhht.tech`
-   GitHub username: `khanhht801`
-   GitHub Pages mặc định: `khanhht801.github.io`

### IPv4

``` text
A   @   185.199.108.153
A   @   185.199.109.153
A   @   185.199.110.153
A   @   185.199.111.153
```

### IPv6

``` text
AAAA   @   2606:50c0:8000::153
AAAA   @   2606:50c0:8001::153
AAAA   @   2606:50c0:8002::153
AAAA   @   2606:50c0:8003::153
```

### `www`

``` text
CNAME   www   khanhht801.github.io
```

Luồng tổng quát:

``` text
khanhht.tech
   ├── A ─────→ IPv4 GitHub Pages
   └── AAAA ──→ IPv6 GitHub Pages

www.khanhht.tech
   └── CNAME ─→ khanhht801.github.io
```

------------------------------------------------------------------------

## 9. Bảng ghi nhớ nhanh

  Thành phần   Hiểu đơn giản                   Ví dụ
  ------------ ------------------------------- ------------------------------
  DNS          Hệ thống chỉ đường cho domain   Domain → nơi cần đến
  `@`          Domain gốc                      `khanhht.tech`
  A            Domain → IPv4                   `@ → 185.199.108.153`
  AAAA         Domain → IPv6                   `@ → 2606:50c0:8000::153`
  CNAME        Domain → domain khác            `www → khanhht801.github.io`
  `www`        Một subdomain                   `www.khanhht.tech`
  TTL          Thời gian cache DNS             `Auto`

## 10. Cách nhớ ngắn nhất

``` text
@      = domain gốc
A      = trỏ tới IPv4
AAAA   = trỏ tới IPv6
CNAME  = trỏ tới một tên miền khác
www    = một subdomain
TTL    = thời gian cache
```

Khi nhìn thấy:

``` text
A   @   185.199.108.153
```

hãy đọc:

> Domain gốc → IPv4 của server.

Khi nhìn thấy:

``` text
CNAME   www   khanhht801.github.io
```

hãy đọc:

> `www.khanhht.tech` → đi theo `khanhht801.github.io`.

------------------------------------------------------------------------

> **Lưu ý khi dạy học:** Các IP ở ví dụ trên là cấu hình GitHub Pages
> tại thời điểm tài liệu được chuẩn bị. Khi triển khai thực tế, nên kiểm
> tra lại tài liệu chính thức của GitHub và nhà cung cấp DNS.

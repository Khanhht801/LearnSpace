# Định hướng trang giới thiệu LearnSpace

> Ngày rà soát: 04/11/2026. Phạm vi: đọc mã nguồn, CSS, nội dung và tài nguyên hiện có; chưa đánh giá giao diện bằng trình duyệt. Tài liệu này định hướng trang `/about`, chưa triển khai giao diện.

## 1. Kết quả rà soát dự án

### Phong cách đang có

LearnSpace mang cảm giác gần gũi, sáng và thân thiện: đỏ thương hiệu làm điểm nhấn, nền trắng xen hồng nhạt, chữ đậm bo tròn, thẻ mềm và linh vật gà vàng đeo khăn đỏ. Trang chủ dùng hình sách, tài liệu, bookmark và những chi tiết tia sáng để gợi việc học và chia sẻ.

| Thành phần | Giá trị trong mã nguồn | Cách áp dụng cho trang giới thiệu |
| --- | --- | --- |
| Đỏ chính | `--primary: #db1f1f` | Từ khóa trong tiêu đề, icon, nút chính |
| Đỏ đậm | `--primary-dark: #9d0b0f` | Trạng thái hover, chữ trên nền hồng |
| Gradient thương hiệu | `linear-gradient(180deg, #db1f1f 0%, #9d0b0f 100%)` | Nút và điểm nhấn; hero trang chủ còn dùng gradient 155 độ từ `#cf2020` đến `#9d0b0f` |
| Nền sáng | `#ffffff`, `#fff8f8` | Vùng đọc nội dung, section giá trị và đội ngũ |
| Nền hồng | `#fff6f8`, `#fff1f4` | Câu chuyện, hero hoặc lời mời cuối trang |
| Chữ chính / phụ | `#252525` / `--muted: #686060` | Tiêu đề và mô tả |
| Viền | `--border: #f0dada` | Thẻ, đường phân chia và nút phụ |
| Font | SVN-Gilroy, dự phòng Segoe UI và sans-serif | Nội dung 400–500, nhãn 600–700, tiêu đề 800 |

Các section trang chủ có khung nội dung khoảng 1120–1320px. Nhịp khoảng cách cuối CSS hiện là 44px trên desktop, 32px ở màn hình tối đa 800px và 28px ở màn hình tối đa 480px. Nên kế thừa nhịp này để trang giới thiệu đồng bộ, dùng thẻ bo 16–24px và bóng nhẹ.

Tài nguyên có thể tái sử dụng: `public/logo.png`, `public/mascot.png`, `public/mascot-reading.png`, `public/mascot-message.png`, `public/mascot-feedback.png`. Chọn tối đa 2–3 hình linh vật có mục đích rõ ràng trên toàn trang.

### Nội dung và khả năng thực tế

- Trang chủ giới thiệu LearnSpace là không gian chia sẻ kiến thức và tài liệu cộng đồng; trang `/about` hiện mô tả hẹp hơn là nơi học lập trình. Cần thống nhất cách gọi theo trang chủ.
- Thư viện dữ liệu hiện có ba mục giới thiệu: React cơ bản, React Router và Làm việc với API. Trang chi tiết hiển thị mô tả, cấp độ, thời lượng và nút yêu thích; chưa phải trình đọc bài học hoặc hệ thống học hoàn chỉnh.
- Đã có tìm kiếm tiêu đề không phân biệt dấu, lọc theo chủ đề, xem chi tiết, lưu/bỏ lưu và trang `/saved`.
- Danh sách yêu thích dùng localStorage trên trình duyệt hiện tại, chưa đồng bộ tài khoản hay thiết bị.
- Có giao diện chia sẻ tài liệu, danh sách tài liệu cộng đồng và góp ý, gọi `/api/documents` và `/api/feedback`. Khả năng gửi/tải thực tế cần backend hoạt động; việc đọc mã không xác nhận dịch vụ đang chạy.
- Chưa thấy tính năng theo dõi tiến độ, lộ trình cá nhân hóa hoặc chứng chỉ. Vì vậy không đưa các nội dung này vào lời giới thiệu như tính năng đã có.
- Chưa có thông tin người sáng lập, ngày ra đời, ảnh đội ngũ hoặc số liệu sử dụng đủ căn cứ để đưa lên trang.

**Thông điệp thống nhất đề xuất:** “LearnSpace là không gian tìm kiếm, lưu lại và chia sẻ tài liệu học tập, bắt đầu từ những nội dung lập trình đang có.” Định hướng cộng đồng và nhiều lĩnh vực là hướng phát triển; nội dung hiện tại cần được mô tả đúng quy mô.

## 2. Bố cục tổng thể

Giữ đủ sáu phần người dùng yêu cầu, sắp theo luồng:

**Giới thiệu ngắn → Giá trị mang lại → Câu chuyện ra đời → Cách hoạt động → Đội ngũ phát triển → Lời mời bắt đầu.**

Luồng này giúp người xem hiểu LearnSpace trước, thấy giá trị cụ thể, rồi tìm hiểu câu chuyện và người xây dựng. Trang `/about` đào sâu lý do và con người; nội dung không cần lặp nguyên các section của trang chủ.

## 3. Định hướng từng section

### Section 01 — Giới thiệu ngắn

**Mục tiêu:** Trong vài giây, trả lời LearnSpace là gì, dành cho ai và giúp ích thế nào.

**Nội dung đề xuất:**

- Nhãn: “VỀ LEARNSPACE”.
- H1: “Một nơi giữ lại điều hay. Một điểm bắt đầu để học tiếp.”
- Mô tả: “Dành cho những ai đang tự học và muốn tìm lại kiến thức dễ dàng hơn, LearnSpace giúp bạn khám phá nội dung học tập, lưu lại mục hữu ích và chia sẻ tài liệu với cộng đồng.”
- Nút chính: “Khám phá thư viện” → `/courses`.
- Liên kết phụ: “Câu chuyện của LearnSpace” → `#cau-chuyen` trên trang giới thiệu.

**Bố cục và hình ảnh:** Hai cột, chữ bên trái và `mascot-reading.png` cùng hình tài liệu trang trí bên phải. Dùng nền hồng nhạt, tiêu đề xám đậm với một cụm từ đỏ; cách này vẫn cùng nhận diện với hero đỏ của trang chủ nhưng tạo nhịp riêng cho trang giới thiệu. Mobile xếp chữ trước, hình sau.

### Section 02 — Giá trị mang lại

**Mục tiêu:** Cho thấy những lợi ích người dùng có thể kiểm chứng ngay.

**Tiêu đề:** “Bớt thời gian tìm kiếm. Thêm không gian học hỏi.”

| Thẻ | Nội dung gợi ý | Căn cứ hiện có |
| --- | --- | --- |
| Tìm điều cần khám phá | “Tìm theo tên hoặc chọn chủ đề để thu hẹp nội dung bạn quan tâm.” | Tìm kiếm và lọc trong `Courses.jsx` |
| Biết trước nội dung | “Xem mô tả, cấp độ và thời lượng trước khi chọn mục phù hợp.” | `CourseDetail.jsx` và dữ liệu khóa học |
| Giữ lại điều hữu ích | “Lưu mục yêu thích để tìm lại trên trình duyệt bạn đang dùng.” | `App.jsx`, `/saved` |
| Có nơi để sẻ chia | “Đóng góp tài liệu và gửi góp ý để cùng xây dựng LearnSpace.” | Form đóng góp và góp ý; cần backend hoạt động |

**Bố cục:** Nền trắng, bốn thẻ icon nét mảnh màu đỏ, nền icon hồng nhạt. Desktop bốn cột nếu đủ rộng, tablet hai cột, mobile một cột. Mỗi thẻ chỉ có một ý và 1–2 câu.

**Lưu ý:** Không đổi tên thẻ thành “Học theo lộ trình” hoặc “Theo dõi tiến bộ”. Không khẳng định tài liệu đều đã được kiểm duyệt, có nguồn đầy đủ hoặc có chất lượng bảo đảm khi chưa có quy trình xác thực.

### Section 03 — Câu chuyện ra đời

**Mục tiêu:** Giúp người xem hiểu động lực xây dựng sản phẩm bằng câu chuyện cụ thể, chân thật.

**Tiêu đề:** “Từ những tài liệu rời rạc, đến một không gian chung.”

**Bản nháp cần người xây dựng xác nhận trước khi xuất bản:**

> Khi tự học, đôi lúc điều khó không chỉ là hiểu một kiến thức mới, mà còn là tìm lại tài liệu hữu ích đã từng gặp. LearnSpace bắt đầu từ mong muốn gom những nội dung ấy về một nơi dễ tìm, dễ lưu và dễ chia sẻ hơn.
>
> Từ những nội dung lập trình đầu tiên, chúng mình mong muốn từng bước xây dựng một không gian để việc học và chia sẻ kiến thức trở nên gần gũi hơn.

Đây là gợi ý biên tập, chưa phải lịch sử dự án đã được xác minh. Điều chỉnh đại từ “mình” hoặc “chúng mình” theo người thực sự xây dựng.

**Bố cục:** Nền `#fff6f8`, hai cột hình tài liệu/linh vật và đoạn kể chuyện. Có thể thêm ba nhãn “Nhu cầu ban đầu → Ý tưởng tập hợp → Mong muốn sẻ chia”, không dùng mốc năm giả.

**Cần bổ sung:** Vấn đề có thật từng gặp, thời điểm bắt đầu nếu muốn công bố và một ví dụ cá nhân. Không dùng số lượng người học hoặc lời chứng thực chưa có nguồn.

### Section 04 — Cách LearnSpace hoạt động

**Mục tiêu:** Người mới biết thao tác tiếp theo ngay sau khi đọc.

**Tiêu đề:** “Ba bước nhỏ để bắt đầu.”

1. **Chọn nội dung:** Tìm theo tên hoặc chọn chủ đề trong thư viện. Liên kết “Mở thư viện” → `/courses`.
2. **Xem thông tin:** Mở mục bạn quan tâm để xem mô tả, cấp độ và thời lượng. Ví dụ thật: “React cơ bản” → `/courses/1`.
3. **Lưu để quay lại:** Nhấn yêu thích, sau đó xem tại “Đã lưu” → `/saved`.

**Điều chỉnh so với ý tưởng ban đầu:** Dùng “Chọn nội dung → Xem thông tin → Lưu để quay lại”. Chưa dùng “Bắt đầu học → Theo dõi tiến bộ” vì trang chi tiết hiện chưa có bài học và hệ thống tiến độ.

**Bố cục:** Nền trắng, ba thẻ đánh số 01–03, nối bằng mũi tên trên desktop. Mobile xếp dọc, bỏ mũi tên ngang. Có thể tham khảo `Journey.jsx`, nhưng lời mô tả phải bám đúng thao tác hiện có.

### Section 05 — Đội ngũ phát triển

**Mục tiêu:** Cho người xem biết ai chịu trách nhiệm xây dựng LearnSpace.

**Tiêu đề:** “Người đứng sau LearnSpace.”

**Nếu là dự án cá nhân:** Một thẻ chân dung, tên, vai trò “Người xây dựng LearnSpace”, giới thiệu 2–3 câu về công việc thực hiện và động lực học tập/chia sẻ. Chỉ thêm GitHub hoặc portfolio khi có đường dẫn thật được chủ dự án cung cấp.

**Nếu là dự án nhóm:** Mỗi thành viên có tên, ảnh, vai trò và một câu mô tả phần đóng góp cụ thể. Desktop tối đa ba thẻ mỗi hàng; mobile một thẻ mỗi hàng.

**Mẫu điền nội dung, chưa xuất bản:**

> [Tên hiển thị] — [Vai trò thực tế]. [Một câu về phần việc phụ trách]. [Một câu về mong muốn dành cho người học].

**Bố cục:** Nền trắng hoặc hồng rất nhạt, ảnh bo tròn và thẻ có viền mảnh. Nếu chưa có ảnh có thể dùng chữ cái tên; không dùng linh vật như chân dung một thành viên có thật. Chưa có thông tin thì giữ placeholder trong tài liệu, không dựng tên, chức danh hoặc tiểu sử giả lên giao diện.

### Section 06 — Lời mời bắt đầu

**Mục tiêu:** Kết thúc bằng một hành động rõ ràng và kênh kết nối đúng với dự án.

**Nội dung đề xuất:**

- Tiêu đề: “Điều bạn muốn khám phá tiếp theo là gì?”
- Mô tả: “Bắt đầu từ một nội dung bạn quan tâm, lưu lại điều hữu ích và quay lại khi bạn muốn tìm hiểu thêm.”
- Nút chính: “Khám phá thư viện” → `/courses`.
- Nút phụ: “Chia sẻ tài liệu” → `/contact` (trang hiện hiển thị form đóng góp).
- Liên kết góp ý: “Góp ý cho LearnSpace” → `/#gop-y`.
- Email: chỉ hiển thị nếu đã cấu hình `VITE_CONTRIBUTION_EMAIL`; khi chưa có, dùng “Kênh liên hệ sẽ được cập nhật.” như footer hiện tại.

**Bố cục:** Khối đỏ gradient với tiêu đề trắng và nút trắng chữ đỏ đậm, thêm linh vật nhỏ nếu cần. Phương án nhẹ hơn là nền hồng `#fff1f4` với nút đỏ. Chọn một phương án để giữ một điểm nhấn cuối trang.

## 4. Quy tắc khi triển khai

- Ưu tiên cách gọi “thư viện”, “nội dung”, “tài liệu” cho thông điệp thương hiệu. Khi mô tả trang chi tiết hiện tại, nói rõ đó là thông tin giới thiệu nội dung.
- Giọng văn gần gũi, ngắn và cụ thể; thống nhất đại từ. Không hứa hẹn kết quả học tập hoặc độ phủ nhiều lĩnh vực vượt dữ liệu hiện có.
- Một H1, mỗi section có H2; phân biệt rõ tiêu đề với nhãn nhỏ. Desktop có thể dùng tiêu đề section 32–48px, mobile 28–32px; nội dung khoảng 17–19px, line-height 1.6–1.7.
- Chỉ dùng đỏ cho điểm nhấn và hành động. Phần đọc dài dùng chữ tối trên nền sáng; kiểm tra tương phản trước khi chốt màu chữ nhỏ.
- Giữ focus bàn phím rõ, link có nhãn dễ hiểu, ảnh có alt phù hợp; hình trang trí dùng alt rỗng. Nếu thêm chuyển động cần tôn trọng `prefers-reduced-motion`.
- Dùng liên kết có đường dẫn trang gốc khi đi đến section ở trang chủ. Header/footer hiện có anchor cục bộ; cần rà lại khi tái sử dụng tại `/about`. Footer hiện được render trong `Home.jsx`, chưa phải footer chung của ứng dụng.
- Các selector `.main-content > section` đang tạo khung thẻ mặc định; nếu trang giới thiệu cần nhiều dải nền toàn chiều rộng thì phải thiết kế wrapper và class riêng. Không sửa quy tắc toàn cục làm ảnh hưởng trang thư viện.
- Nhịp section 44/32/28px hiện gắn với wrapper chứa `.welcome-page`; trang `/about` cần khai báo nhịp tương ứng riêng để không vô tình phụ thuộc hero trang chủ.
- Chỉnh source trong `src/` khi triển khai sau này; `dist/index.html` là đầu ra build, không phải nơi định nghĩa trang giới thiệu.

## 5. Điều kiện hoàn tất nội dung trước khi dựng trang

- [ ] Xác nhận câu chuyện thật và cách xưng hô.
- [ ] Cung cấp tên, vai trò, ảnh hoặc chữ cái đại diện của người/nhóm phát triển.
- [ ] Chọn email/kênh liên hệ thật nếu muốn công bố.
- [ ] Chốt đủ sáu section theo thứ tự đề xuất; giữ phần cách hoạt động ngắn để tránh lặp giá trị.
- [ ] Kiểm tra tất cả lời giới thiệu dựa trên tính năng hiện có, đặc biệt lưu trên trình duyệt và điều kiện backend của việc chia sẻ.
- [ ] Khi triển khai, kiểm tra desktop/mobile, liên kết giữa các trang, focus bàn phím và CTA.

## 6. Nguồn đối chiếu trong dự án

- Màu, font, nút và focus: `src/index.css`, `src/fonts.css`.
- Bố cục, nền, kích thước chữ và responsive: `src/App.css` (cần xét cả các khai báo ghi đè cuối file).
- Định vị thương hiệu: `src/pages/Home.jsx`, `src/components/Introduction.jsx`, `src/components/MessageSection.jsx`.
- Trang giới thiệu hiện tại: `src/pages/About.jsx`.
- Hành trình ba bước: `src/components/Journey.jsx`.
- Tìm kiếm, dữ liệu và xem thông tin: `src/pages/Courses.jsx`, `src/pages/CourseDetail.jsx`, `src/data/courses.js`, `src/data/topics.js`.
- Lưu yêu thích và route: `src/App.jsx`.
- Chia sẻ, tài liệu cộng đồng và góp ý: `src/components/ContributionSection.jsx`, `src/components/SharedSection.jsx`, `src/components/FeedbackSection.jsx`.
- Kênh liên hệ và điều hướng footer: `src/components/Footer.jsx`, `src/pages/Contact.jsx`.

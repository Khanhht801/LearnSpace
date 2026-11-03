# Quy tắc làm việc trong LearnSpace

## Tự động commit sau khi thay đổi

- Sau mỗi tác vụ có thay đổi file, tự động tạo Git commit khi đã hoàn tất thay đổi và các bước kiểm tra phù hợp. Không cần hỏi lại người dùng, trừ khi người dùng yêu cầu không commit.
- Commit theo từng nhóm thay đổi có cùng mục đích; không commit sau mỗi lần lưu file hoặc khi công việc còn dang dở.
- Trước khi sửa và trước khi kết thúc mỗi lượt làm việc, kiểm tra `git status`. Người dùng đã yêu cầu tự commit cả các thay đổi họ trực tiếp sửa trong dự án; không bỏ sót các thay đổi có sẵn chỉ vì chúng không do agent tạo ra. Stage các file bằng đường dẫn cụ thể sau khi kiểm tra nội dung.
- Khi người dùng yêu cầu commit hoặc chốt các thay đổi, commit toàn bộ thay đổi hiện có trong dự án, gồm cả file mới và thay đổi do người dùng sửa, trừ file bị loại trừ bên dưới hoặc file người dùng yêu cầu giữ lại. Không ghi đè hay loại bỏ nội dung người dùng.
- Rule này được thực hiện khi agent đang xử lý tác vụ; bản thân file AGENTS.md không theo dõi sự kiện lưu file và không tự chạy Git khi agent không hoạt động. Nếu người dùng muốn commit ngay sau mỗi lần lưu trong IDE, cần thiết lập thêm cơ chế theo dõi file.
- Chạy kiểm tra phù hợp trước khi commit. Nếu kiểm tra thất bại, sửa lỗi thuộc phạm vi tác vụ; nếu vẫn không thể hoàn tất, báo rõ lý do và không commit phần việc chưa đạt yêu cầu.
- Dùng commit message theo mẫu `<type>(<scope>): <mô tả cụ thể>`, với `scope` là tùy chọn. Các type thường dùng: `feat`, `fix`, `refactor`, `style`, `docs`, `test`, `chore`.
- Mô tả ngắn gọn, rõ hành động và đối tượng thay đổi; ưu tiên tiếng Việt. Không dùng message chung chung như `update`, `fix bug`, `changes` hoặc `done`. Với thay đổi phức tạp, thêm phần thân giải thích lý do và ảnh hưởng.
- Ví dụ: `feat(home): thêm mục câu hỏi thường gặp`, `fix(courses): sửa bộ lọc khóa học`, `docs: bổ sung quy tắc tự động commit`.
- Không commit khi không có thay đổi. Không đưa secret, file `.env` chứa thông tin nhạy cảm, dependency đã cài hoặc sản phẩm build vào commit.
- Không tự động push, amend commit hoặc viết lại lịch sử Git nếu người dùng chưa yêu cầu.
- Sau khi commit, báo ngắn gọn commit hash, message và kết quả kiểm tra. Nếu commit bị chặn bởi cấu hình Git hoặc hook, báo rõ nguyên nhân; không bỏ qua hook hay tự sửa danh tính Git.

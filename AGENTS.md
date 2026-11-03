# Quy tắc làm việc trong LearnSpace

## Tự động commit sau khi thay đổi

- Sau mỗi tác vụ có thay đổi file, tự động tạo Git commit khi đã hoàn tất thay đổi và các bước kiểm tra phù hợp. Không cần hỏi lại người dùng, trừ khi người dùng yêu cầu không commit.
- Commit theo từng nhóm thay đổi có cùng mục đích; không commit sau mỗi lần lưu file hoặc khi công việc còn dang dở.
- Trước khi sửa, kiểm tra `git status` để nhận diện các thay đổi có sẵn của người dùng. Chỉ stage các thay đổi thuộc tác vụ hiện tại bằng đường dẫn cụ thể; không dùng `git add .` hoặc `git add -A` để gom mọi thay đổi.
- Nếu cùng một file có thay đổi có sẵn của người dùng, chỉ stage các phần thuộc tác vụ hiện tại. Không ghi đè, loại bỏ hoặc đưa thay đổi không liên quan vào commit.
- Chạy kiểm tra phù hợp trước khi commit. Nếu kiểm tra thất bại, sửa lỗi thuộc phạm vi tác vụ; nếu vẫn không thể hoàn tất, báo rõ lý do và không commit phần việc chưa đạt yêu cầu.
- Dùng commit message theo mẫu `<type>(<scope>): <mô tả cụ thể>`, với `scope` là tùy chọn. Các type thường dùng: `feat`, `fix`, `refactor`, `style`, `docs`, `test`, `chore`.
- Mô tả ngắn gọn, rõ hành động và đối tượng thay đổi; ưu tiên tiếng Việt. Không dùng message chung chung như `update`, `fix bug`, `changes` hoặc `done`. Với thay đổi phức tạp, thêm phần thân giải thích lý do và ảnh hưởng.
- Ví dụ: `feat(home): thêm mục câu hỏi thường gặp`, `fix(courses): sửa bộ lọc khóa học`, `docs: bổ sung quy tắc tự động commit`.
- Không commit khi không có thay đổi. Không đưa secret, file `.env` chứa thông tin nhạy cảm, dependency đã cài hoặc sản phẩm build vào commit.
- Không tự động push, amend commit hoặc viết lại lịch sử Git nếu người dùng chưa yêu cầu.
- Sau khi commit, báo ngắn gọn commit hash, message và kết quả kiểm tra. Nếu commit bị chặn bởi cấu hình Git hoặc hook, báo rõ nguyên nhân; không bỏ qua hook hay tự sửa danh tính Git.

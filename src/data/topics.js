const topics = [
  {
    id: 'react',
    title: 'React',
    description: 'Bắt đầu với component, JSX, props và state. Tiếp tục khám phá cách điều hướng với React Router.',
    courseIds: [1, 2],
    coverImage: '/images/topics/react.webp',
    tags: ['Component', 'State', 'Router'],
    level: 'Cơ bản → Trung bình',
    audience: 'Bạn mới học React, muốn hiểu rõ component, props và state, hoặc muốn tổ chức ứng dụng có nhiều trang.',
    prerequisites: 'HTML, CSS và JavaScript cơ bản. Bạn nên làm quen với hàm, mảng, object và cách import/export module.',
    knowledge: [
      { title: 'Xây dựng giao diện', description: 'Dùng component và JSX để chia giao diện thành những phần nhỏ, có thể tái sử dụng.' },
      { title: 'Quản lý dữ liệu', description: 'Truyền dữ liệu bằng props và cập nhật giao diện theo tương tác bằng state.' },
      { title: 'Điều hướng ứng dụng', description: 'Tổ chức nhiều màn hình và chuyển trang trong ứng dụng bằng React Router.' },
    ],
    practice: {
      title: 'Tạo ứng dụng ghi chú nhỏ',
      tasks: ['Chia giao diện thành các component: biểu mẫu, danh sách và từng ghi chú.', 'Dùng state để thêm và xóa ghi chú.', 'Tạo trang danh sách và trang giới thiệu bằng React Router.'],
    },
    nextTopicId: 'api',
    nextDescription: 'Khi đã quen với giao diện React, hãy tìm hiểu cách kết nối ứng dụng với dữ liệu bên ngoài.',
  },
  {
    id: 'api',
    title: 'Làm việc với API',
    description: 'Kết nối ứng dụng với dữ liệu. Tìm hiểu cách lấy và quản lý dữ liệu bằng useEffect.',
    courseIds: [3],
    coverImage: '/images/topics/api.webp',
    tags: ['useEffect', 'Dữ liệu', 'Kết nối'],
    level: 'Trung bình',
    audience: 'Bạn đã biết React cơ bản và muốn hiển thị dữ liệu từ bên ngoài thay cho dữ liệu viết sẵn trong ứng dụng.',
    prerequisites: 'Component, props, state và JavaScript bất đồng bộ: Promise, async/await. Nếu chưa quen React, hãy bắt đầu từ chủ đề React.',
    knowledge: [
      { title: 'Lấy dữ liệu', description: 'Làm quen với yêu cầu HTTP, fetch và dữ liệu JSON trả về từ API.' },
      { title: 'Kết nối với React', description: 'Tìm hiểu cách dùng useEffect và state để đưa dữ liệu vào giao diện.' },
      { title: 'Phản hồi rõ ràng', description: 'Tìm hiểu trạng thái đang tải, lỗi và trường hợp chưa có dữ liệu.' },
    ],
    practice: {
      title: 'Hiển thị danh sách từ API',
      tasks: ['Lấy một danh sách dữ liệu từ API bằng fetch.', 'Lưu dữ liệu vào state và hiển thị bằng component.', 'Bổ sung thông báo đang tải, lỗi kết nối và danh sách trống.'],
    },
    nextTopicId: 'react',
    nextDescription: 'Muốn ôn lại nền tảng? Quay lại component, props, state và cách tổ chức ứng dụng React.',
  },
];

export default topics;

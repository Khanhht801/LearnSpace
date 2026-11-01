import { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError('Vui lòng nhập đầy đủ thông tin.');
      setIsSubmitted(false);
      return;
    }

    setError('');
    setIsSubmitted(true);
    setForm({ name: '', email: '', message: '' });
  }

  return (
    <section className="contact-page">
      <p className="eyebrow">KẾT NỐI VỚI CHÚNG MÌNH</p><h1>Liên hệ</h1><p className="page-intro">Để lại lời nhắn, chúng mình luôn sẵn sàng lắng nghe bạn.</p>

      {error && <p className="notice notice-error" role="alert">{error}</p>}
      {isSubmitted && <p className="notice notice-success" role="status">Đã gửi thông tin thành công.</p>}

      <form onSubmit={handleSubmit}>
        <p>
          <label htmlFor="name">Họ tên</label>
          <input
            autoComplete="name"
            placeholder="Nhập họ và tên của bạn"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </p>

        <p>
          <label htmlFor="email">Email</label>
          <input
            autoComplete="email"
            placeholder="ban@example.com"
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
          />
        </p>

        <p>
          <label htmlFor="message">Nội dung</label>
          <textarea
            rows={5}
            placeholder="Bạn muốn chia sẻ điều gì?"
            id="message"
            name="message"
            value={form.message}
            onChange={handleChange}
          />
        </p>

        <button type="submit">Gửi</button>
      </form>
    </section>
  );
}


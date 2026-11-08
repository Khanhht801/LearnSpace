import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BookOpen, Eye, EyeOff } from 'lucide-react';
import '../auth.css';

export default function Auth({ register = false }) {
  const [showPassword, setShowPassword] = useState(false);
  const [notice, setNotice] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    setNotice('Giao diện đang được hoàn thiện. Tính năng xác thực tài khoản sẽ sớm được kết nối; thông tin của bạn chưa được gửi hoặc lưu.');
  }

  return (
    <section className="auth-page" aria-labelledby="auth-title">
      <aside className="auth-story" aria-label="Cùng học với LearnSpace">
        <div className="auth-story-label"><BookOpen size={20} /> KHÔNG GIAN HỌC TẬP CỦA BẠN</div>
        <h2>Mỗi ngày một chút,<br /><span>tiến xa hơn.</span></h2>
        <p>Khám phá kiến thức, tìm tài liệu yêu thích và nuôi dưỡng cảm hứng học tập cùng LearnSpace.</p>
        <img src="/mascot-reading.png" alt="" width="360" height="360" />
        <div className="auth-story-note"><BookOpen size={22} /><span>Mở trang sách mới.<br /><strong>Bắt đầu hành trình của bạn.</strong></span></div>
      </aside>
      <div className="auth-panel">
        <Link className="auth-back" to="/"><ArrowLeft size={16} /> Về trang chủ</Link>
        <div className="auth-tabs" aria-label="Tài khoản">
          <Link to="/login" aria-current={!register ? 'page' : undefined}>Đăng nhập</Link>
          <Link to="/register" aria-current={register ? 'page' : undefined}>Đăng ký</Link>
        </div>
        <p className="eyebrow">CÙNG LEARNSPACE HỌC MỖI NGÀY</p>
        <h1 id="auth-title">{register ? 'Bắt đầu cùng nhau!' : 'Chào mừng trở lại!'}</h1>
        <p className="auth-description">{register ? 'Tạo tài khoản để bắt đầu hành trình học tập của bạn.' : 'Đăng nhập để tiếp tục hành trình khám phá kiến thức.'}</p>
        <form onSubmit={handleSubmit} onChange={(event) => {
          setNotice('');
          if (register) {
            const { password, confirmPassword } = event.currentTarget.elements;
            confirmPassword.setCustomValidity(confirmPassword.value && confirmPassword.value !== password.value ? 'Mật khẩu xác nhận chưa khớp.' : '');
          }
        }}>
          {register && <div className="auth-field"><label htmlFor="auth-name">Họ và tên</label><input id="auth-name" name="name" autoComplete="name" placeholder="Nhập họ và tên của bạn" required maxLength={100} pattern=".*\S.*" /></div>}
          <div className="auth-field"><label htmlFor="auth-email">Email</label><input id="auth-email" name="email" type="email" autoComplete="email" placeholder="ban@example.com" required /></div>
          <div className="auth-field">
            <label htmlFor="auth-password">Mật khẩu</label>
            <div className="auth-password">
              <input id="auth-password" name="password" type={showPassword ? 'text' : 'password'} autoComplete={register ? 'new-password' : 'current-password'} placeholder={register ? 'Tạo mật khẩu của bạn' : 'Nhập mật khẩu của bạn'} minLength={register ? 8 : undefined} aria-describedby={register ? 'password-hint' : undefined} required />
              <button type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'} aria-pressed={showPassword}>{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}</button>
            </div>
            {register && <small id="password-hint">Sử dụng ít nhất 8 ký tự.</small>}
          </div>
          {register && <div className="auth-field"><label htmlFor="auth-confirm">Xác nhận mật khẩu</label><input id="auth-confirm" name="confirmPassword" type={showPassword ? 'text' : 'password'} autoComplete="new-password" placeholder="Nhập lại mật khẩu" required /></div>}
          <p className="auth-demo-note">Bản xem trước giao diện · Chưa hỗ trợ xác thực tài khoản.</p>
          {notice && <p className="auth-notice" role="status">{notice}</p>}
          <button className="auth-submit" type="submit">{register ? 'Tạo tài khoản' : 'Đăng nhập'}<ArrowRight size={19} /></button>
        </form>
        <p className="auth-switch">{register ? 'Bạn đã có tài khoản?' : 'Bạn chưa có tài khoản?'} <Link to={register ? '/login' : '/register'}>{register ? 'Đăng nhập' : 'Đăng ký ngay'}</Link></p>
      </div>
    </section>
  );
}

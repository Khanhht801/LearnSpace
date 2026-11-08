import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { supabase } from '../../utils/supabase.js';
import { useAuth } from '../hooks/useAuth.js';
import { authenticate } from '../lib/auth.js';
import { ArrowLeft, ArrowRight, BookOpen, Eye, EyeOff } from 'lucide-react';
import '../auth.css';

export default function Auth({ register = false }) {
  const [showPassword, setShowPassword] = useState(false);
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { session, loading, error: sessionError } = useAuth();
  const [callbackError] = useState(() => {
    const query = new URLSearchParams(window.location.search);
    const hash = new URLSearchParams(window.location.hash.slice(1));
    return query.has('error') || hash.has('error') || hash.has('error_code')
      ? 'Liên kết xác nhận không hợp lệ hoặc đã hết hạn. Vui lòng đăng nhập hoặc yêu cầu email xác nhận mới.' : '';
  });

  async function handleSubmit(event) {
    event.preventDefault();
    if (submitting || loading) return;
    const form = event.currentTarget;
    const email = form.elements.email.value.trim();
    const password = form.elements.password.value;
    setSubmitting(true);
    setError('');
    setNotice('');
    try {
      const result = await authenticate(supabase, {
        register, email, password, name: register ? form.elements.name.value : '', origin: window.location.origin,
      });
      if (result.error) throw result.error;
      if (register && !result.data.session) {
        setNotice('Vui lòng kiểm tra hộp thư (và thư rác) để xác nhận email trước khi đăng nhập. Nếu email đã được đăng ký, hãy đăng nhập bằng tài khoản hiện có.');
        form.reset();
      }
    } catch (authError) {
      const messages = {
        invalid_credentials: 'Email hoặc mật khẩu chưa đúng.',
        email_not_confirmed: 'Bạn cần xác nhận email trước khi đăng nhập. Vui lòng kiểm tra hộp thư.',
        user_already_exists: 'Không thể đăng ký email này. Hãy thử đăng nhập.',
        weak_password: 'Mật khẩu chưa đáp ứng yêu cầu bảo mật. Hãy dùng mật khẩu mạnh hơn.',
        over_email_send_rate_limit: 'Đã gửi quá nhiều email. Vui lòng chờ ít phút rồi thử lại.',
        over_request_rate_limit: 'Bạn thao tác quá nhanh. Vui lòng thử lại sau ít phút.',
        signup_disabled: 'Đăng ký tài khoản hiện đang tạm đóng.',
      };
      const serverMessage = authError.message || '';
      const serverError = /error sending confirmation email/i.test(serverMessage)
        ? 'Chưa gửi được email xác nhận. Hệ thống gửi email đang gặp lỗi. Vui lòng thử lại sau.'
        : /database error/i.test(serverMessage)
          ? 'Hệ thống gặp lỗi khi lưu tài khoản. Vui lòng thử lại sau.'
          : '';
      setError(messages[authError.code] || serverError || 'Không thể kết nối hoặc hoàn tất xác thực. Vui lòng thử lại.');
    } finally {
      setSubmitting(false);
    }
  }

  if (session) return <Navigate to="/" replace />;

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
          <Link to="/auth/login" aria-current={!register ? 'page' : undefined}>Đăng nhập</Link>
          <Link to="/auth/register" aria-current={register ? 'page' : undefined}>Đăng ký</Link>
        </div>
        <p className="eyebrow">CÙNG LEARNSPACE HỌC MỖI NGÀY</p>
        <h1 id="auth-title">{register ? 'Bắt đầu cùng nhau!' : 'Chào mừng trở lại!'}</h1>
        <p className="auth-description">{register ? 'Tạo tài khoản để bắt đầu hành trình học tập của bạn.' : 'Đăng nhập để tiếp tục hành trình khám phá kiến thức.'}</p>
        <form onSubmit={handleSubmit} onChange={(event) => {
          setNotice('');
          setError('');
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
          {loading && <p className="auth-demo-note" role="status">Đang kiểm tra phiên đăng nhập…</p>}
          {(error || callbackError || sessionError) && <p className="auth-notice" role="alert">{error || callbackError || 'Không thể khôi phục phiên đăng nhập. Vui lòng đăng nhập lại.'}</p>}
          {notice && <p className="auth-notice" role="status">{notice}</p>}
          <button className="auth-submit" type="submit" disabled={loading || submitting} aria-busy={submitting}>{submitting ? 'Đang xử lý…' : register ? 'Tạo tài khoản' : 'Đăng nhập'}<ArrowRight size={19} /></button>
        </form>
        <p className="auth-switch">{register ? 'Bạn đã có tài khoản?' : 'Bạn chưa có tài khoản?'} <Link to={register ? '/auth/login' : '/auth/register'}>{register ? 'Đăng nhập' : 'Đăng ký ngay'}</Link></p>
      </div>
    </section>
  );
}

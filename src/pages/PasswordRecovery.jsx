import { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../utils/supabase.js';
import { useAuth } from '../hooks/useAuth.js';
import { requestPasswordReset } from '../lib/auth.js';
import '../auth.css';

export default function PasswordRecovery({ reset = false }) {
  const { session, loading } = useAuth();
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  async function submit(event) {
    event.preventDefault();
    if (busy) return;
    const form = event.currentTarget;
    setBusy(true); setError(''); setMessage('');
    try {
      if (reset) {
        const password = form.elements.password.value;
        if (password !== form.elements.confirm.value) throw new Error('Mật khẩu xác nhận chưa khớp.');
        const { error: updateError } = await supabase.auth.updateUser({ password });
        if (updateError) throw updateError;
        form.reset();
        setMessage('Mật khẩu đã được cập nhật.');
      } else {
        const { error: resetError } = await requestPasswordReset(supabase, form.elements.email.value, window.location.origin);
        if (resetError) throw resetError;
        setMessage('Nếu email có tài khoản, hãy kiểm tra hộp thư và thư rác để đặt lại mật khẩu.');
      }
    } catch (reason) {
      setError(reason.message === 'Mật khẩu xác nhận chưa khớp.' ? reason.message : 'Không thể hoàn tất yêu cầu. Vui lòng kiểm tra liên kết hoặc thử lại sau.');
    } finally { setBusy(false); }
  }

  return <section className="auth-page auth-confirm-page" aria-labelledby="recovery-title"><div className="auth-panel">
    <p className="eyebrow">LEARNSPACE</p>
    <h1 id="recovery-title">{reset ? 'Đặt lại mật khẩu' : 'Quên mật khẩu?'}</h1>
    {loading && <p role="status">Đang kiểm tra phiên đăng nhập…</p>}
    {reset && !loading && !session && <p className="auth-notice" role="alert">Liên kết không hợp lệ hoặc đã hết hạn. Hãy yêu cầu liên kết mới.</p>}
    {!loading && (!reset || session) && <form onSubmit={submit}>
      {reset ? <>
        <div className="auth-field"><label htmlFor="new-password">Mật khẩu mới</label><input id="new-password" name="password" type="password" autoComplete="new-password" minLength={8} required /></div>
        <div className="auth-field"><label htmlFor="confirm-password">Xác nhận mật khẩu</label><input id="confirm-password" name="confirm" type="password" autoComplete="new-password" minLength={8} required /></div>
      </> : <div className="auth-field"><label htmlFor="recovery-email">Email</label><input id="recovery-email" name="email" type="email" autoComplete="email" required /></div>}
      <button className="auth-submit" type="submit" disabled={busy}>{busy ? 'Đang xử lý…' : reset ? 'Cập nhật mật khẩu' : 'Gửi liên kết đặt lại'}</button>
    </form>}
    {error && <p className="auth-notice" role="alert">{error}</p>}
    {message && <p className="auth-notice" role="status">{message}</p>}
    <p className="auth-switch"><Link to={reset && !session ? '/auth/forgot-password' : '/auth/login'}>{reset && !session ? 'Yêu cầu liên kết mới' : 'Về trang đăng nhập'}</Link></p>
  </div></section>;
}

import { useState } from 'react';
import { supabase } from '../../utils/supabase.js';
import { resendConfirmation } from '../lib/auth.js';

export default function ResendConfirmation({ initialEmail = '' }) {
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');

  async function handleResend(event) {
    event.preventDefault();
    if (busy) return;
    const email = event.currentTarget.elements.confirmationEmail.value;
    setBusy(true);
    setNotice('');
    setError('');
    try {
      const { error: resendError } = await resendConfirmation(supabase, email, window.location.origin);
      if (resendError) throw resendError;
      setNotice('Nếu tài khoản đang chờ xác nhận và đủ điều kiện nhận email, hãy kiểm tra hộp thư và thư rác để tìm liên kết mới nhất.');
    } catch (resendError) {
      setError(resendError.status === 429 || resendError.code === 'over_email_send_rate_limit'
        ? 'Bạn cần chờ ít phút trước khi gửi lại email.'
        : 'Chưa gửi được email xác nhận. Vui lòng thử lại sau.');
    } finally { setBusy(false); }
  }

  return <form className="auth-resend" onSubmit={handleResend}>
    <h2>Nhận liên kết xác nhận mới</h2>
    <label htmlFor="confirmation-email">Email đã đăng ký</label>
    <input id="confirmation-email" name="confirmationEmail" type="email" autoComplete="email" defaultValue={initialEmail} required placeholder="ban@example.com" />
    {notice && <p className="auth-notice" role="status">{notice}</p>}
    {error && <p className="auth-notice" role="alert">{error}</p>}
    <button type="submit" disabled={busy} aria-busy={busy}>{busy ? 'Đang gửi…' : 'Gửi lại email xác nhận'}</button>
  </form>;
}

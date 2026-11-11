import { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../utils/supabase.js';
import { confirmationErrorKind, confirmSignup } from '../lib/auth.js';
import ResendConfirmation from '../components/ResendConfirmation.jsx';
import '../auth.css';

export default function ConfirmEmail() {
  const [token] = useState(() => new URLSearchParams(window.location.search).get('token_hash'));
  const [status, setStatus] = useState(token ? 'ready' : 'invalid');

  async function handleConfirm() {
    if (status !== 'ready') return;
    setStatus('busy');
    try {
      const { error } = await confirmSignup(supabase, token);
      if (error) {
        if (confirmationErrorKind(error) === 'invalid') {
          window.history.replaceState(window.history.state, '', window.location.pathname);
          setStatus('invalid');
        } else {
          setStatus('error');
        }
        return;
      }
      window.history.replaceState(window.history.state, '', window.location.pathname);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  return <section className="auth-page auth-confirm-page" aria-labelledby="confirm-title">
    <div className="auth-panel">
      <p className="eyebrow">LEARNSPACE</p>
      <h1 id="confirm-title">{status === 'success' ? 'Email đã được xác nhận' : 'Xác nhận email'}</h1>
      {(status === 'ready' || status === 'busy') && <>
        <p className="auth-description">Nhấn nút bên dưới để hoàn tất xác nhận tài khoản của bạn.</p>
        <button className="auth-submit" type="button" onClick={handleConfirm} disabled={status === 'busy'} aria-busy={status === 'busy'}>{status === 'busy' ? 'Đang xác nhận…' : 'Xác nhận email'}</button>
      </>}
      {status === 'success' && <div role="status">
        <p className="auth-description">Tài khoản của bạn đã sẵn sàng. Hãy tiếp tục hành trình học tập cùng LearnSpace.</p>
        <Link className="button-link auth-submit" to="/">Về trang chủ</Link>
      </div>}
      {status === 'invalid' && <>
        <p className="auth-notice" role="alert">Liên kết không còn hiệu lực hoặc đã được sử dụng. Nếu bạn đã xác nhận, hãy đăng nhập; nếu chưa, hãy yêu cầu email mới.</p>
        <Link className="button-link auth-submit" to="/auth/login">Đăng nhập</Link>
        <ResendConfirmation />
      </>}
      {status === 'error' && <>
        <p className="auth-notice" role="alert">Chưa thể xác nhận email. Vui lòng kiểm tra kết nối và thử lại. Nếu vẫn không được, hãy yêu cầu email mới.</p>
        <button className="auth-submit" type="button" onClick={() => { setStatus('ready'); }}>Quay lại xác nhận</button>
        <ResendConfirmation />
      </>}
    </div>
  </section>;
}

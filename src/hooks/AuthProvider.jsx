import { useEffect, useState } from 'react';
import { supabase } from '../../utils/supabase.js';
import { AuthContext } from './useAuth.js';

export function AuthProvider({ children }) {
  const [state, setState] = useState({ session: null, loading: true, error: null });
  useEffect(() => {
    let active = true;
    let receivedEvent = false;
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      receivedEvent = true;
      if (active) setState({ session, loading: false, error: null });
    });
    supabase.auth.getSession().then(({ data, error }) => {
      if (active && (!receivedEvent || error)) setState({ session: data.session, loading: false, error });
    }).catch(() => {
      if (active) setState({ session: null, loading: false, error: new Error('Không thể khôi phục phiên đăng nhập. Vui lòng thử lại.') });
    });
    return () => { active = false; subscription.unsubscribe(); };
  }, []);
  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
}


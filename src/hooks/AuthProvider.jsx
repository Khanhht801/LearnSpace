import { useEffect, useState } from 'react';
import { supabase } from '../../utils/supabase.js';
import { AuthContext } from './useAuth.js';

export function AuthProvider({ children }) {
  const [state, setState] = useState({ session: null, loading: true, error: null });
  const [profileState, setProfileState] = useState({ profile: null, profileError: null });
  const userId = state.session?.user.id;
  useEffect(() => {
    let active = true;
    if (!userId) return;
    supabase.from('profile').select('id, display_name, avatar_url, created_at').eq('id', userId).maybeSingle()
      .then(({ data, error }) => {
        if (active) setProfileState({ profile: data, profileError: error || (!data ? new Error('Không tìm thấy hồ sơ cho phiên đăng nhập hiện tại.') : null) });
      }).catch(() => {
        if (active) setProfileState({ profile: null, profileError: new Error('Không thể tải hồ sơ.') });
      });
    return () => { active = false; };
  }, [userId]);
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
  const profile = profileState.profile?.id === userId ? profileState.profile : null;
  return <AuthContext.Provider value={{ ...state, profile, profileError: userId ? profileState.profileError : null }}>{children}</AuthContext.Provider>;
}


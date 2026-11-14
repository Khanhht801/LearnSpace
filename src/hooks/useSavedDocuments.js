import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../../utils/supabase.js';
import { importLegacySaved, readSavedIds } from '../lib/savedDocuments.js';
import { useAuth } from './useAuth.js';

export function useSavedDocuments() {
  const { session, loading: authLoading } = useAuth();
  const userId = session?.user.id;
  const navigate = useNavigate();
  const location = useLocation();
  const [state, setState] = useState({ userId: null, ids: [], loading: false, ready: false, error: '' });
  const [attempt, setAttempt] = useState(0);
  const currentUser = useRef(userId);
  const pending = useRef(new Set());
  useLayoutEffect(() => { currentUser.current = userId; }, [userId]);

  useEffect(() => {
    if (!userId) return;
    let active = true;
    async function load() {
      setState({ userId, ids: [], loading: true, ready: false, error: '' });
      let importError = false;
      try { await importLegacySaved(supabase, window.localStorage, userId); }
      catch { importError = true; }
      try {
        const ids = await readSavedIds(supabase, userId);
        if (active) setState({ userId, ids, loading: false, ready: true, error: importError ? 'Chưa thể chuyển danh sách đã lưu trên trình duyệt. Dữ liệu cũ vẫn được giữ lại.' : '' });
      } catch {
        if (active) setState({ userId, ids: [], loading: false, ready: false, error: 'Không thể tải tài liệu đã lưu. Vui lòng thử lại.' });
      }
    }
    load();
    return () => { active = false; };
  }, [userId, attempt]);

  async function toggle(id) {
    if (authLoading) return;
    if (!userId) {
      navigate('/auth/login', { state: { from: location.pathname + location.search + location.hash } });
      return;
    }
    if (state.userId !== userId || !state.ready || state.loading || pending.current.has(id)) return;
    pending.current.add(id);
    const saved = state.ids.includes(id);
    try {
      const query = saved
        ? supabase.from('saved_documents').delete().eq('user_id', userId).eq('document_id', id)
        : supabase.from('saved_documents').upsert({ user_id: userId, document_id: id }, { onConflict: 'user_id,document_id', ignoreDuplicates: true });
      const { error } = await query;
      if (error) throw error;
      if (currentUser.current === userId) setState((previous) => previous.userId === userId ? { ...previous, ids: saved ? previous.ids.filter((item) => item !== id) : [...previous.ids, id] } : previous);
    } catch {
      if (currentUser.current === userId) setState((previous) => previous.userId === userId ? { ...previous, error: 'Không thể cập nhật danh sách đã lưu. Vui lòng thử lại.' } : previous);
    } finally { pending.current.delete(id); }
  }

  return {
    ids: state.userId === userId ? state.ids : [],
    loading: authLoading || (Boolean(userId) && (state.userId !== userId || state.loading)),
    error: state.userId === userId ? state.error : '',
    ready: !userId || (state.userId === userId && state.ready),
    retry: () => setAttempt((value) => value + 1),
    toggle,
  };
}

import { useEffect, useState } from 'react';
import { supabase } from '../../utils/supabase.js';

export const PAGE_SIZE = 9;

export function useCatalog({ keyword, categoryId, sort, page, enabled }) {
  const [result, setResult] = useState({ items: [], count: 0, loading: true, error: false });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (!enabled) return;
    const controller = new AbortController();
    let active = true;
    const timeout = setTimeout(() => controller.abort(), 20000);
    async function load() {
      setResult((previous) => ({ ...previous, loading: true, error: false }));
      try {
        const { data, count, error } = await supabase.rpc('search_documents', {
          p_keyword: keyword.trim(), p_category: categoryId ?? null, p_sort: sort,
        }, { count: 'exact' }).range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1).abortSignal(controller.signal);
        if (error) throw error;
        if (active) setResult({ items: data.map((item) => ({ ...item, description: item.description || '', coverImage: item.thumbnail_url || '/mascot-reading.png' })), count: count ?? 0, loading: false, error: false });
      } catch {
        if (active) setResult({ items: [], count: 0, loading: false, error: true });
      } finally { clearTimeout(timeout); }
    }
    load();
    return () => { active = false; clearTimeout(timeout); controller.abort(); };
  }, [keyword, categoryId, sort, page, enabled, attempt]);

  return { ...result, retry: () => setAttempt((value) => value + 1) };
}

import { useEffect, useState } from 'react';
import { LibraryContext, useLibrary } from './useLibrary.js';
import { Outlet } from 'react-router-dom';
import { supabase } from '../../utils/supabase.js';


// Read pages explicitly so the Data API row limit does not truncate the library.
async function readTable(table, columns, signal) {
  const rows = [];
  const pageSize = 500;
  for (let offset = 0; ; offset += pageSize) {
    const { data, error } = await supabase.from(table).select(columns)
      .order('id').range(offset, offset + pageSize - 1).abortSignal(signal);
    if (error) throw error;
    rows.push(...data);
    if (data.length < pageSize) return rows;
  }
}

export function LibraryProvider({ children }) {
  const [state, setState] = useState({ courses: [], topics: [], loading: true, error: false });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    let active = true;

    async function load() {
      try {
        const [categories, documents] = await Promise.all([
          readTable('categories', 'id,name,slug,description', controller.signal),
          readTable('document', 'id,category_id,title,slug,description,thumbnail_url,file_type,created_at', controller.signal),
        ]);
        const courses = documents.map((document) => ({
          ...document,
          description: document.description || '',
          coverImage: document.thumbnail_url || '/mascot-reading.png',
        }));
        const topics = categories.map((category) => ({
          id: category.slug,
          categoryId: category.id,
          title: category.name,
          description: category.description || '',
          courseIds: courses.filter((document) => document.category_id === category.id).map((document) => document.id),
          coverImage: courses.find((document) => document.category_id === category.id)?.coverImage || '/mascot-topics.png',
          tags: [],
        }));
        if (active) setState({ courses, topics, loading: false, error: false });
      } catch {
        if (active) setState({ courses: [], topics: [], loading: false, error: true });
      } finally {
        clearTimeout(timeout);
      }
    }
    load();
    return () => { active = false; clearTimeout(timeout); controller.abort(); };
  }, [attempt]);

  function retry() {
    setState({ courses: [], topics: [], loading: true, error: false });
    setAttempt((value) => value + 1);
  }

  return <LibraryContext.Provider value={{ ...state, retry }}>{children}</LibraryContext.Provider>;
}

export function LibraryBoundary() {
  const { loading, error, retry } = useLibrary();
  if (loading) return <section className="library-inner" role="status"><p>Đang tải tài liệu…</p></section>;
  if (error) return <section className="library-inner"><p role="alert">Không thể tải thư viện. Vui lòng kiểm tra kết nối và thử lại.</p><button type="button" onClick={retry}>Thử lại</button></section>;
  return <Outlet />;
}

import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToLocation() {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    if (hash) {
      let id = hash.slice(1);
      try { id = decodeURIComponent(id); } catch { /* Keep malformed fragments harmless. */ }
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView();
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, hash]);

  return null;
}

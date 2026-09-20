import { useState, useEffect } from 'react';
import API from '../services/api';
import { useAdmin } from '../context/useAdmin';

// Fetch editable content for a section. Falls back to `fallback` when the
// backend has no saved content (or is unreachable), so the site always renders.
// Refetches automatically after an admin save (contentVersion bump).
export function useSectionContent(section, fallback) {
  const [content, setContent] = useState(fallback);
  const { contentVersion } = useAdmin();

  useEffect(() => {
    let active = true;

    const fetchContent = async () => {
      try {
        const response = await API.get(`/content/${section}`);
        if (active && response.data?.success && response.data.data) {
          setContent({ ...fallback, ...response.data.data });
        }
      } catch {
        // keep current/fallback content — site must never break because of the CMS
      }
    };

    fetchContent();
    return () => {
      active = false;
    };
  }, [section, contentVersion]); // eslint-disable-line react-hooks/exhaustive-deps

  return { content, setContent };
}

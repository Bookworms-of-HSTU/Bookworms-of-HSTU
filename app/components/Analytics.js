'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { pageview, event } from '../lib/gtag';

export default function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname) {
      pageview(pathname);
    }
  }, [pathname]);

  useEffect(() => {
    const handleClick = (e) => {
      let element = e.target;
      while (element) {
        const analyticsId = element.getAttribute('data-analytics-id');
        if (analyticsId) {
          const section = element.closest('[data-analytics-section]')?.getAttribute('data-analytics-section') || 'unknown';

          event({
            action: 'click',
            category: section,
            label: analyticsId,
          });
          return; // Stop after the first found ID
        }
        element = element.parentElement;
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return null;
}

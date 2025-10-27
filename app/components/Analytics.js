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
      // New logic for ga-trackable elements
      const trackableElement = e.target.closest('.ga-trackable');
      if (trackableElement) {
        const action = trackableElement.getAttribute('data-ga-action');
        const category = trackableElement.getAttribute('data-ga-category');
        const label = trackableElement.getAttribute('data-ga-label');
        
        if (action && category && label) {
          event({ action, category, label });
          return; // Event handled, no need to proceed
        }
      }

      // Original logic for data-analytics-id
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

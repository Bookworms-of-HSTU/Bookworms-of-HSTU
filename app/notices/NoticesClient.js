'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './Notices.module.css';

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const d = new Date(dateString);
  if (isNaN(d.getTime())) return 'N/A';
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

export default function NoticesClient({ initialNotices, initialLastVisible }) {
  const [notices, setNotices] = useState(initialNotices);
  const [lastVisible, setLastVisible] = useState(initialLastVisible);
  const [loading, setLoading] = useState(false);
  const [allNoticesLoaded, setAllNoticesLoaded] = useState(initialNotices.length < 10);
  const router = useRouter();
  const searchParams = useSearchParams();

  const fetchMoreNotices = async () => {
    if (!lastVisible) return;
    setLoading(true);
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('lastVisible', lastVisible);
    router.push(`/notices?${newSearchParams.toString()}`, { scroll: false });
    // The page will re-render with new notices passed as props.
  };

  return (
    <div className={styles.noticesPage}>
      <div className={styles.container}>
        <h1 className={styles.title}>Notices and News</h1>
        <div className={styles.noticesGrid}>
          {notices.filter(notice => notice.id).map(notice => (
            <div key={notice.id} className={styles.noticeCard}>
              <div className={styles.noticeContent}>
                <h2 className={styles.noticeTitle}>{notice.title}</h2>
                <p className={styles.noticeDate}>{formatDate(notice.date)}</p>
                <p className={styles.noticeText}>{notice.content}</p>
              </div>
            </div>
          ))}
        </div>
        {!allNoticesLoaded && (
          <div className={styles.loadMoreContainer}>
            <button 
              onClick={fetchMoreNotices} 
              disabled={loading} 
              className={`${styles.loadMoreButton} ga-trackable`}
              data-ga-action="load_more_notices"
              data-ga-category="Notices"
              data-ga-label="Load More"
            >
              {loading ? 'Loading...' : 'Load More'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

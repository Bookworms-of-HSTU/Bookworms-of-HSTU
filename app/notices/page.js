'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, limit, startAfter } from "firebase/firestore";
import { db } from "@/lib/firebase";
import styles from './Notices.module.css';

const NOTICES_PER_PAGE = 10;

export default function NoticesPage() {
  const [notices, setNotices] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const [loading, setLoading] = useState(false);
  const [allNoticesLoaded, setAllNoticesLoaded] = useState(false);

  const fetchNotices = async (after = null) => {
    setLoading(true);
    try {
      let noticesQuery = query(
        collection(db, "notices"),
        orderBy("date", "desc"),
        limit(NOTICES_PER_PAGE)
      );

      if (after) {
        noticesQuery = query(
          collection(db, "notices"),
          orderBy("date", "desc"),
          startAfter(after),
          limit(NOTICES_PER_PAGE)
        );
      }

      const noticeSnapshot = await getDocs(noticesQuery);
      const newNotices = noticeSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      if (newNotices.length < NOTICES_PER_PAGE) {
        setAllNoticesLoaded(true);
      }

      setNotices(prevNotices => [...prevNotices, ...newNotices]);
      setLastVisible(noticeSnapshot.docs[noticeSnapshot.docs.length - 1]);
    } catch (error) {
      console.error("Error fetching notices: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  return (
    <div className={styles.noticesPage}>
      <div className={styles.container}>
        <h1 className={styles.title}>Notices and News</h1>
        <div className={styles.noticesGrid}>
          {notices.filter(notice => notice.id).map(notice => (
            <div key={notice.id} className={styles.noticeCard}>
              <div className={styles.noticeContent}>
                <h2 className={styles.noticeTitle}>{notice.title}</h2>
                <p className={styles.noticeDate}>{new Date(notice.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <p className={styles.noticeText}>{notice.content}</p>
              </div>
            </div>
          ))}
        </div>
        {!allNoticesLoaded && (
          <div className={styles.loadMoreContainer}>
            <button onClick={() => fetchNotices(lastVisible)} disabled={loading} className={styles.loadMoreButton}>
              {loading ? 'Loading...' : 'Load More'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

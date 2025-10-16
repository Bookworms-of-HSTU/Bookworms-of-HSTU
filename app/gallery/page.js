'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';
import Carousel from '../components/Carousel';
import { collection, getDocs, query, orderBy, limit, startAfter } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const EVENTS_PER_PAGE = 10;

export default function Gallery() {
  const [events, setEvents] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const [loading, setLoading] = useState(false);
  const [allEventsLoaded, setAllEventsLoaded] = useState(false);

  const fetchEvents = async (after = null) => {
    setLoading(true);
    try {
      let eventsQuery = query(
        collection(db, "gallery"),
        orderBy("date", "desc"),
        limit(EVENTS_PER_PAGE)
      );

      if (after) {
        eventsQuery = query(
          collection(db, "gallery"),
          orderBy("date", "desc"),
          startAfter(after),
          limit(EVENTS_PER_PAGE)
        );
      }

      const eventsSnapshot = await getDocs(eventsQuery);
      const newEvents = eventsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      if (newEvents.length < EVENTS_PER_PAGE) {
        setAllEventsLoaded(true);
      }

      setEvents(prevEvents => [...prevEvents, ...newEvents]);
      setLastVisible(eventsSnapshot.docs[eventsSnapshot.docs.length - 1]);
    } catch (error) {
      console.error("Error fetching events: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Gallery</h1>
      {events.filter(event => event.id).map(event => (
        <div key={event.id} className={styles.eventSection}>
          <h2 className={styles.eventTitle}>{event.title}</h2>
          <p className={styles.eventDate}>{event.date}</p>
          <Carousel images={event.images} />
        </div>
      ))}
      {!allEventsLoaded && (
        <div className={styles.loadMoreContainer}>
          <button onClick={() => fetchEvents(lastVisible)} disabled={loading} className={styles.loadMoreButton}>
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  );
}

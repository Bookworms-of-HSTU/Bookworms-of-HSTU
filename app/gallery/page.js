'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';
import Carousel from '../components/Carousel';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function Gallery() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const eventsCollection = collection(db, 'gallery');
      const eventsSnapshot = await getDocs(eventsCollection);
      const eventsList = eventsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setEvents(eventsList);
    };

    fetchEvents();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Gallery</h1>
      {events.map(event => (
        <div key={event.id} className={styles.eventSection}>
          <h2 className={styles.eventTitle}>{event.title}</h2>
          <p className={styles.eventDate}>{event.date}</p>
          <Carousel images={event.images} />
        </div>
      ))}
    </div>
  );
}

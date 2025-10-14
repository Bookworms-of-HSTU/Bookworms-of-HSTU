'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';
import Image from 'next/image';

// Placeholder data until connected to a backend
const initialEvents = [
  {
    id: 1,
    title: 'Event 1',
    date: '2023-01-01',
    images: ['https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
  },
  {
    id: 2,
    title: 'Event 2',
    date: '2023-02-01',
    images: ['https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
  },
];

export default function Gallery() {
  const [events, setEvents] = useState(initialEvents);

  // In a real application, you would fetch the events from a backend
  // useEffect(() => {
  //   // Fetch events and setEvents
  // }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Gallery</h1>
      {events.map(event => (
        <div key={event.id} className={styles.eventSection}>
          <h2 className={styles.eventTitle}>{event.title}</h2>
          <p className={styles.eventDate}>{event.date}</p>
          <div className={styles.galleryGrid}>
            {event.images.map((image, index) => (
              <div key={index} className={styles.photo}>
                <Image src={image} alt={`${event.title} image ${index + 1}`} width={400} height={300} objectFit="cover" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

'use client';

import { useState, useEffect, useCallback } from 'react';
import { collection, getDocs, query, orderBy, limit, startAfter } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import styles from './Messages.module.css';

const MESSAGES_PER_PAGE = 15;

export default function MessagesPage() {
  const [messages, setMessages] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const [loading, setLoading] = useState(false);
  const [allMessagesLoaded, setAllMessagesLoaded] = useState(false);

  const fetchMessages = useCallback(async (after = null) => {
    if (allMessagesLoaded) return;
    setLoading(true);
    try {
      let messagesQuery = query(
        collection(db, "messages"),
        orderBy("date", "desc"),
        limit(MESSAGES_PER_PAGE)
      );

      if (after) {
        messagesQuery = query(
          collection(db, "messages"),
          orderBy("date", "desc"),
          startAfter(after),
          limit(MESSAGES_PER_PAGE)
        );
      }

      const messagesSnapshot = await getDocs(messagesQuery);
      const newMessages = messagesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      if (newMessages.length < MESSAGES_PER_PAGE) {
        setAllMessagesLoaded(true);
      }

      setMessages(prevMessages => [...prevMessages, ...newMessages]);
      if (messagesSnapshot.docs.length > 0) {
        setLastVisible(messagesSnapshot.docs[messagesSnapshot.docs.length - 1]);
      }
    } catch (error) {
      console.error("Error fetching messages: ", error);
    } finally {
      setLoading(false);
    }
  }, [allMessagesLoaded]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Contact Messages</h1>
      {messages.length > 0 ? (
        <div className={styles.messageList}>
          {messages.map(message => (
            <div key={message.id} className={styles.messageCard}>
              <p><strong>Name:</strong> {message.name}</p>
              <p><strong>Email:</strong> {message.email}</p>
              <p><strong>Message:</strong> {message.message}</p>
              <p><strong>Date:</strong> {message.date ? new Date(message.date).toLocaleString() : 'No date'}</p>
            </div>
          ))}
        </div>
      ) : (
         !loading && <p>No messages yet.</p>
      )}

      {loading && <p>Loading messages...</p>}

      {!allMessagesLoaded && !loading && messages.length > 0 && (
        <div className={styles.loadMoreContainer}>
          <button onClick={() => fetchMessages(lastVisible)} disabled={loading} className={styles.loadMoreButton}>
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  );
}

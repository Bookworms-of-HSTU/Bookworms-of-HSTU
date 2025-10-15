'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import styles from './Messages.module.css';

export default function MessagesPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const messagesCollection = collection(db, 'messages');
        const messagesSnapshot = await getDocs(messagesCollection);
        const messagesList = messagesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setMessages(messagesList);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
      setLoading(false);
    };

    fetchMessages();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Contact Messages</h1>
      {loading ? (
        <p>Loading messages...</p>
      ) : messages.length > 0 ? (
        <ul className={styles.messageList}>
          {messages.map((message) => (
            <li key={message.id} className={styles.messageItem}>
              <h2>{message.name}</h2>
              <p><strong>Email:</strong> {message.email}</p>
              <p><strong>Message:</strong> {message.message}</p>
              <p><strong>Date:</strong> {new Date(message.date).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No messages yet.</p>
      )}
    </div>
  );
}

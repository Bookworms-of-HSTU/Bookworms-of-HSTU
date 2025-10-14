'use client';

import { useState } from 'react';
import styles from './Newsletter.module.css';
import { addSubscriber } from '../lib/actions';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addSubscriber(email);
      setMessage('Thank you for subscribing!');
      setEmail('');
    } catch (error) {
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <section className={styles.newsletter}>
      <div className={styles.container}>
        <h2>Subscribe to Our Newsletter</h2>
        <p>Stay up to date with our latest news and events.</p>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Subscribe</button>
        </form>
        {message && <p className={styles.message}>{message}</p>}
      </div>
    </section>
  );
}

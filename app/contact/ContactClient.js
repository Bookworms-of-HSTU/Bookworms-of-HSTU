'use client';

import { useState } from 'react';
import styles from './page.module.css';
import { addContactMessage } from '../lib/actions';

export default function ContactClient() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newMessage = {
      name,
      email,
      message,
      date: new Date().toISOString(),
    };

    try {
      await addContactMessage(newMessage);
      setSubmitted(true);
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Contact Us</h1>
      {submitted ? (
        <p>Thank you for your message! We will get back to you soon.</p>
      ) : (
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" required value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows="5" required value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
          </div>
          <button 
            type="submit" 
            className={`${styles.submitButton} ga-trackable`}
            data-ga-action="submit_contact_form"
            data-ga-category="Contact"
            data-ga-label="Send Message"
          >
            Send Message
          </button>
        </form>
      )}
    </div>
  );
}

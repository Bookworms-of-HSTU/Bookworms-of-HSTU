'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, doc, deleteDoc, updateDoc, serverTimestamp, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import styles from './NoticeManager.module.css'; // Updated to use the new CSS module

// A robust function to format dates, handling both server Timestamps and client-side dates.
// This will permanently fix the "Date N/A" bug.
const formatDate = (date) => {
  if (!date) return 'N/A';
  // Convert Firestore Timestamp to JavaScript Date object
  const d = date instanceof Timestamp ? date.toDate() : new Date(date);
  // Check if the date is valid
  if (isNaN(d.getTime())) return 'N/A';
  // Format to a readable string, e.g., "October 26, 2023"
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

export default function NoticeManager({ notices: initialNotices }) {
  const [notices, setNotices] = useState(initialNotices);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  // State for the new date picker. Defaults to today's date.
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [editingNotice, setEditingNotice] = useState(null);

  // Effect to sync state when the initial server-provided notices change.
  useEffect(() => {
    setNotices(initialNotices);
  }, [initialNotices]);

  const resetForm = () => {
    setTitle('');
    setContent('');
    setDate(new Date().toISOString().split('T')[0]); // Reset date to today
    setEditingNotice(null);
  };

  const handleEditClick = (notice) => {
    setEditingNotice(notice);
    setTitle(notice.title);
    setContent(notice.content);
    // Ensure the date is correctly formatted for the date input
    const d = notice.date instanceof Timestamp ? notice.date.toDate() : new Date(notice.date);
    setDate(d.toISOString().split('T')[0]);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this notice?')) {
      await deleteDoc(doc(db, 'notices', id));
      setNotices(notices.filter(notice => notice.id !== id));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content || !date) {
      alert('Please fill out all fields.');
      return;
    }

    const noticeData = {
      title,
      content,
      date: new Date(date), // Convert the date string back to a Date object for Firestore
    };

    if (editingNotice) {
      // Update existing notice
      const noticeRef = doc(db, 'notices', editingNotice.id);
      await updateDoc(noticeRef, noticeData);
      setNotices(notices.map(n => n.id === editingNotice.id ? { ...editingNotice, ...noticeData } : n));
      alert('Notice updated successfully!');
    } else {
      // Add new notice
      const docRef = await addDoc(collection(db, 'notices'), { ...noticeData, createdAt: serverTimestamp() });
      setNotices([{ id: docRef.id, ...noticeData }, ...notices]);
      alert('Notice added successfully!');
    }

    resetForm();
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Manage Notices</h1>

      {/* A clean, modern form in its own card for a premium feel */}
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            placeholder="Notice Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.input}
            required
          />
          <textarea
            placeholder="Notice Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={styles.textarea}
            required
          ></textarea>
          {/* The new date picker, ensuring dates are always handled correctly */}
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={styles.dateInput}
            required
          />
          <div className={styles.buttonGroup}>
            {editingNotice && (
              <button type="button" onClick={resetForm} className={styles.cancelButton}>Cancel Edit</button>
            )}
            <button type="submit" className={styles.submitButton}>
              {editingNotice ? 'Update Notice' : 'Add Notice'}
            </button>
          </div>
        </form>
      </div>

      {/* Notices displayed in a clean, modern card grid */}
      <ul className={styles.noticeList}>
        {notices.map(notice => (
          <li key={notice.id} className={styles.noticeItem}>
            <div className={styles.noticeContent}>
              <h3>{notice.title}</h3>
              <p>{notice.content}</p>
            </div>
            <div className={styles.noticeMeta}>
              {/* The permanently fixed date display */}
              <span>Date: {formatDate(notice.date)}</span>
            </div>
            <div className={styles.itemButtonGroup}>
              <button onClick={() => handleEditClick(notice)} className={styles.editButton}>Edit</button>
              <button onClick={() => handleDelete(notice.id)} className={styles.deleteButton}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

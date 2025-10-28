'use client';

import { useState, useEffect } from 'react';
import { collection, addDoc, doc, deleteDoc, updateDoc, serverTimestamp, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import styles from './NoticeManager.module.css';

// Simplified and corrected date formatting function.
// It now correctly handles the ISO date string passed from the server.
const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const d = new Date(dateString);
  if (isNaN(d.getTime())) return 'N/A';
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

export default function NoticeManager({ notices: initialNotices }) {
  const [notices, setNotices] = useState(initialNotices);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [editingNotice, setEditingNotice] = useState(null);

  useEffect(() => {
    setNotices(initialNotices);
  }, [initialNotices]);

  const resetForm = () => {
    setTitle('');
    setContent('');
    setDate(new Date().toISOString().split('T')[0]);
    setEditingNotice(null);
  };

  const handleEditClick = (notice) => {
    setEditingNotice(notice);
    setTitle(notice.title);
    setContent(notice.content);
    // Correctly handle the ISO string for the date input.
    const d = new Date(notice.date);
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

    // The date from the input is already in 'YYYY-MM-DD' string format.
    // We convert it to a Date object for Firestore.
    const noticeData = {
      title,
      content,
      date: new Date(date),
    };

    if (editingNotice) {
      const noticeRef = doc(db, 'notices', editingNotice.id);
      await updateDoc(noticeRef, noticeData);
      // We must refetch or manually update the client-side data with the server-confirmed format.
      // For simplicity here, we'll optimisticly update with an ISO string.
      const updatedNotice = { ...editingNotice, ...noticeData, date: noticeData.date.toISOString() };
      setNotices(notices.map(n => n.id === editingNotice.id ? updatedNotice : n));
      alert('Notice updated successfully!');
    } else {
      const docRef = await addDoc(collection(db, 'notices'), { ...noticeData, createdAt: serverTimestamp() });
      // Optimistically update UI. The date object needs to be an ISO string for consistency.
      const newNotice = { id: docRef.id, ...noticeData, date: noticeData.date.toISOString() };
      setNotices([newNotice, ...notices]);
      alert('Notice added successfully!');
    }

    resetForm();
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Manage Notices</h1>

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

      <ul className={styles.noticeList}>
        {notices.map(notice => (
          <li key={notice.id} className={styles.noticeItem}>
            <div className={styles.noticeContent}>
              <h3>{notice.title}</h3>
              <p>{notice.content}</p>
            </div>
            <div className={styles.noticeMeta}>
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

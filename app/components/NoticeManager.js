'use client';

import { useState, useEffect } from 'react';
import { collection, addDoc, doc, deleteDoc, updateDoc, Timestamp, orderBy, query, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import styles from './NoticeManager.module.css';

// This component is now refactored to correctly handle props from its parent server component.
export default function NoticeManager({ notices: initialNotices }) {
  // The component's state is initialized with the notices passed from the server.
  const [notices, setNotices] = useState(initialNotices);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingId, setEditingId] = useState(null);

  // This useEffect hook ensures that if the server sends updated props (e.g., on page refresh),
  // the component's internal state is updated to match. This is the key to fixing the stale data issue.
  useEffect(() => {
    setNotices(initialNotices);
  }, [initialNotices]);

  // This function is called after any change (add, edit, delete) to get the latest data.
  const refreshNotices = async () => {
    const noticesCollection = collection(db, "notices");
    const q = query(noticesCollection, orderBy('date', 'desc'));
    const noticeSnapshot = await getDocs(q);
    const updatedNotices = noticeSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setNotices(updatedNotices);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const noticeData = {
      title,
      content,
      date: Timestamp.now(),
    };

    if (editingId) {
      // Update existing notice
      const noticeDoc = doc(db, "notices", editingId);
      await updateDoc(noticeDoc, noticeData);
    } else {
      // Add new notice
      await addDoc(collection(db, "notices"), noticeData);
    }

    // Reset form and editing state
    setTitle('');
    setContent('');
    setEditingId(null);

    // Refresh the list from the database to show the change immediately
    await refreshNotices();
  };

  const handleEdit = (notice) => {
    setEditingId(notice.id);
    setTitle(notice.title);
    setContent(notice.content);
  };

  const handleDelete = async (id) => {
    const noticeDoc = doc(db, "notices", id);
    await deleteDoc(noticeDoc);
    // Refresh the list from the database after deleting
    await refreshNotices();
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setTitle('');
    setContent('');
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{editingId ? 'Edit Notice' : 'Add New Notice'}</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
          className={styles.input}
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          required
          className={styles.textarea}
        />
        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.submitButton}>{editingId ? 'Update' : 'Add'}</button>
          {editingId && <button type="button" onClick={handleCancelEdit} className={styles.cancelButton}>Cancel</button>}
        </div>
      </form>

      <h2 className={styles.title}>Existing Notices</h2>
      <ul className={styles.noticeList}>
        {notices.map((notice) => (
          <li key={notice.id} className={styles.noticeItem}>
            <h3>{notice.title}</h3>
            <p>{notice.content}</p>
            <small>Date: {notice.date?.toDate?.().toLocaleDateString() || 'N/A'}</small>
            <div className={styles.itemButtonGroup}>
              <button onClick={() => handleEdit(notice)} className={styles.editButton}>Edit</button>
              <button onClick={() => handleDelete(notice.id)} className={styles.deleteButton}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

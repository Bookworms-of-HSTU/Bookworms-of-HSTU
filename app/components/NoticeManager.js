'use client';

import { useState } from 'react';
import { addNotice, updateNotice, deleteNotice } from '@/app/lib/actions';
import styles from './NoticeManager.module.css';

export default function NoticeManager({ notices: initialNotices }) {
  const [notices, setNotices] = useState(initialNotices);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(null);
  const [newNotice, setNewNotice] = useState({ title: '', content: '', date: '' });

  const handleAddClick = () => {
    setIsEditing(null);
    setNewNotice({ title: '', content: '', date: '' });
    setIsModalOpen(true);
  };

  const handleEditClick = (notice) => {
    setIsEditing(notice.id);
    setNewNotice({ title: notice.title, content: notice.content, date: notice.date });
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsEditing(null);
    setNewNotice({ title: '', content: '', date: '' });
  };

  const handleSave = async () => {
    if (isEditing) {
      const updatedNoticeData = { ...newNotice, id: isEditing };
      const updated = await updateNotice(updatedNoticeData);
      setNotices(notices.map(notice => notice.id === isEditing ? updated : notice));
    } else {
      const addedNotice = await addNotice(newNotice);
      setNotices([...notices, addedNotice]);
    }
    handleCancel();
  };

  const handleDelete = async (noticeId) => {
    await deleteNotice(noticeId);
    setNotices(notices.filter(notice => notice.id !== noticeId));
  };

  return (
    <div className={styles.managerContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>Manage Notices</h1>
        <button onClick={handleAddClick} className={styles.addButton}>
          Add Notice
        </button>
      </div>

      <div className={styles.noticeGrid}>
        {notices.map(notice => (
          <div key={notice.id} className={styles.noticeCard}>
            <div className={styles.noticeContent}>
              <h2 className={styles.noticeTitle}>{notice.title}</h2>
              <p className={styles.noticeText}>{notice.content}</p>
            </div>
            <div className={styles.cardFooter}>
              <p className={styles.noticeDate}>{notice.date}</p>
              <div className={styles.actions}>
                <button onClick={() => handleEditClick(notice)} className={styles.editButton}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                    <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                  </svg>
                </button>
                <button onClick={() => handleDelete(notice.id)} className={styles.deleteButton}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2 className={styles.modalTitle}>{isEditing ? 'Edit Notice' : 'Add New Notice'}</h2>
            <div className={styles.inputGroup}>
              <input
                type="text"
                placeholder="Title"
                value={newNotice.title}
                onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
                className={styles.input}
              />
              <textarea
                placeholder="Content"
                value={newNotice.content}
                onChange={(e) => setNewNotice({ ...newNotice, content: e.target.value })}
                className={styles.textarea}
                rows="4"
              />
              <input
                type="date"
                placeholder="Date"
                value={newNotice.date}
                onChange={(e) => setNewNotice({ ...newNotice, date: e.target.value })}
                className={styles.input}
              />
            </div>
            <div className={styles.modalActions}>
              <button onClick={handleCancel} className={styles.cancelButton}>Cancel</button>
              <button onClick={handleSave} className={styles.saveButton}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

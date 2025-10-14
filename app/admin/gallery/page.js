'use client';

import { useState } from 'react';
import styles from './page.module.css';

const initialEvents = [
  {
    id: 1,
    title: 'Event 1',
    date: '2023-01-01',
    images: ['/images/placeholder.jpg'],
  },
  {
    id: 2,
    title: 'Event 2',
    date: '2023-02-01',
    images: ['/images/placeholder.jpg'],
  },
];

export default function Gallery() {
  const [events, setEvents] = useState(initialEvents);
  const [newEvent, setNewEvent] = useState({ title: '', date: '', images: [] });
  const [editingEvent, setEditingEvent] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleImageChange = (e) => {
    const { files } = e.target;
    setNewEvent({ ...newEvent, images: [...files] });
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    setEvents([...events, { ...newEvent, id: Date.now() }]);
    setNewEvent({ title: '', date: '', images: [] });
  };

  const handleDeleteEvent = (id) => {
    setEvents(events.filter(event => event.id !== id));
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
  };

  const handleUpdateEvent = (e) => {
    e.preventDefault();
    setEvents(events.map(event => event.id === editingEvent.id ? editingEvent : event));
    setEditingEvent(null);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Manage Gallery Events</h1>

      <div className={styles.addEventForm}>
        <h2>Add New Event</h2>
        <form onSubmit={handleAddEvent}>
          <div className={styles.formGroup}>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" value={newEvent.title} onChange={handleInputChange} />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="date">Date</label>
            <input type="date" id="date" name="date" value={newEvent.date} onChange={handleInputChange} />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="images">Images</label>
            <input type="file" id="images" name="images" multiple onChange={handleImageChange} />
          </div>
          <button type="submit" className={styles.submitButton}>Add Event</button>
        </form>
      </div>

      <div className={styles.eventList}>
        <h2>Existing Events</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map(event => (
              <tr key={event.id}>
                <td>{event.title}</td>
                <td>{event.date}</td>
                <td>
                  <button className={styles.editButton} onClick={() => handleEditEvent(event)}>Edit</button>
                  <button className={styles.deleteButton} onClick={() => handleDeleteEvent(event.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingEvent && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Edit Event</h2>
            <form onSubmit={handleUpdateEvent}>
              <div className={styles.formGroup}>
                <label htmlFor="edit-title">Title</label>
                <input type="text" id="edit-title" name="title" value={editingEvent.title} onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })} />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="edit-date">Date</label>
                <input type="date" id="edit-date" name="date" value={editingEvent.date} onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })} />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="edit-images">Images</label>
                <input type="file" id="edit-images" name="images" multiple onChange={(e) => setEditingEvent({ ...editingEvent, images: [...e.target.files] })} />
              </div>
              <button type="submit" className={styles.submitButton}>Update Event</button>
              <button type="button" className={styles.cancelButton} onClick={() => setEditingEvent(null)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

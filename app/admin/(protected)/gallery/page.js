'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, doc, deleteDoc, updateDoc, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import styles from './page.module.css';

export default function Gallery() {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: '', date: '', media: [{ type: 'image', src: '' }] });
  const [editingEvent, setEditingEvent] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      const eventsCollection = collection(db, 'gallery');
      const q = query(eventsCollection, orderBy('date', 'desc')); // Sort events by date
      const eventsSnapshot = await getDocs(q);
      const eventsList = eventsSnapshot.docs.map(doc => {
        const data = doc.data();
        // Convert legacy `images` array to the new `media` structure
        const media = (data.media || data.images || []).map(item => {
          if (typeof item === 'string') {
            return { type: 'image', src: item };
          }
          return item;
        });
        return { id: doc.id, ...data, media };
      });
      setEvents(eventsList);
    };

    fetchEvents();
  }, []);

  // --- Handlers for the 'Add New Event' form ---

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleMediaSrcChange = (index, value) => {
    const media = [...newEvent.media];
    media[index].src = value;
    setNewEvent({ ...newEvent, media });
  };

  const handleMediaTypeChange = (index, value) => {
    const media = [...newEvent.media];
    media[index].type = value;
    setNewEvent({ ...newEvent, media });
  };

  const addMediaInput = () => {
    setNewEvent({ ...newEvent, media: [...newEvent.media, { type: 'image', src: '' }] });
  };

  const removeMediaInput = (index) => {
    const media = [...newEvent.media];
    media.splice(index, 1);
    setNewEvent({ ...newEvent, media });
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    const filteredMedia = newEvent.media.filter(item => item.src.trim() !== '');
    const docRef = await addDoc(collection(db, 'gallery'), { ...newEvent, media: filteredMedia });
    setEvents([...events, { ...newEvent, id: docRef.id, media: filteredMedia }]);
    setNewEvent({ title: '', date: '', media: [{ type: 'image', src: '' }] });
  };

  // --- Handlers for Deleting an Event ---

  const handleDeleteEvent = async (id) => {
    await deleteDoc(doc(db, 'gallery', id));
    setEvents(events.filter(event => event.id !== id));
  };

  // --- Handlers for the 'Edit Event' modal ---

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingEvent({ ...editingEvent, [name]: value });
  };

  const handleEditMediaSrcChange = (index, value) => {
    const media = [...editingEvent.media];
    media[index].src = value;
    setEditingEvent({ ...editingEvent, media });
  };
  
  const handleEditMediaTypeChange = (index, value) => {
    const media = [...editingEvent.media];
    media[index].type = value;
    setEditingEvent({ ...editingEvent, media });
  };

  const addEditMediaInput = () => {
    setEditingEvent({ ...editingEvent, media: [...editingEvent.media, { type: 'image', src: '' }] });
  };

  const removeEditMediaInput = (index) => {
    const media = [...editingEvent.media];
    media.splice(index, 1);
    setEditingEvent({ ...editingEvent, media });
  };

  const handleUpdateEvent = async (e) => {
    e.preventDefault();
    const filteredMedia = editingEvent.media.filter(item => item.src.trim() !== '');
    const eventDoc = doc(db, 'gallery', editingEvent.id);
    await updateDoc(eventDoc, { ...editingEvent, media: filteredMedia });
    const updatedEvents = events.map(event =>
      event.id === editingEvent.id ? { ...editingEvent, media: filteredMedia } : event
    );
    setEvents(updatedEvents);
    setEditingEvent(null);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Manage Gallery</h1>
      
      {/* Add Event Form */}
      <div className={styles.addEventForm}>
        <h2>Add New Event</h2>
        <form onSubmit={handleAddEvent}>
          <div className={styles.formGroup}>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" value={newEvent.title} onChange={handleInputChange} required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="date">Date</label>
            <input type="date" id="date" name="date" value={newEvent.date} onChange={handleInputChange} required />
          </div>
          <div className={styles.formGroup}>
            <label>Media</label>
            {newEvent.media.map((item, index) => (
              <div key={index} className={styles.mediaInputContainer}>
                <select value={item.type} onChange={(e) => handleMediaTypeChange(index, e.target.value)}>
                  <option value="image">Image</option>
                  <option value="video">Video</option>
                </select>
                <input
                  type="text"
                  value={item.src}
                  onChange={(e) => handleMediaSrcChange(index, e.target.value)}
                  placeholder={item.type === 'image' ? "https://example.com/image.jpg" : "https://example.com/video.mp4"}
                />
                <button type="button" className={styles.deleteButton} onClick={() => removeMediaInput(index)}>Delete</button>
              </div>
            ))}
            <button type="button" className={styles.addButton} onClick={addMediaInput}>Add Media</button>
          </div>
          <button type="submit" className={styles.submitButton}>Add Event</button>
        </form>
      </div>

      {/* Event List */}
      <div className={styles.eventList}>
        {events.map(event => (
          <div key={event.id} className={styles.eventItem}>
            <div>
              <h3>{event.title}</h3>
              <p>{new Date(event.date).toLocaleDateString()}</p>
            </div>
            <div className={styles.actions}>
              <button className={styles.editButton} onClick={() => setEditingEvent(JSON.parse(JSON.stringify(event)))}>Edit</button>
              <button className={styles.deleteButton} onClick={() => handleDeleteEvent(event.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Event Modal */}
      {editingEvent && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Edit Event</h2>
            <form onSubmit={handleUpdateEvent}>
              <div className={styles.formGroup}>
                <label htmlFor="edit-title">Title</label>
                <input type="text" id="edit-title" name="title" value={editingEvent.title} onChange={handleEditChange} required />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="edit-date">Date</label>
                <input type="date" id="edit-date" name="date" value={editingEvent.date} onChange={handleEditChange} required />
              </div>
              <div className={styles.formGroup}>
                <label>Media</label>
                {editingEvent.media.map((item, index) => (
                  <div key={index} className={styles.mediaInputContainer}>
                    <select value={item.type} onChange={(e) => handleEditMediaTypeChange(index, e.target.value)}>
                      <option value="image">Image</option>
                      <option value="video">Video</option>
                    </select>
                    <input
                      type="text"
                      value={item.src}
                      onChange={(e) => handleEditMediaSrcChange(index, e.target.value)}
                      placeholder={item.type === 'image' ? "https://example.com/image.jpg" : "https://example.com/video.mp4"}
                    />
                    <button type="button" className={styles.deleteButton} onClick={() => removeEditMediaInput(index)}>Delete</button>
                  </div>
                ))}
                 <button type="button" className={styles.addButton} onClick={addEditMediaInput}>Add Media</button>
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

'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase'; // Adjust the import path as needed
import styles from './page.module.css';

export default function Gallery() {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: '', date: '', images: [''] });
  const [editingEvent, setEditingEvent] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      const eventsCollection = collection(db, 'gallery');
      const eventsSnapshot = await getDocs(eventsCollection);
      const eventsList = eventsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setEvents(eventsList);
    };

    fetchEvents();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleImageChange = (index, value) => {
    const images = [...newEvent.images];
    images[index] = value;
    setNewEvent({ ...newEvent, images });
  };

  const addImageInput = () => {
    setNewEvent({ ...newEvent, images: [...newEvent.images, ''] });
  };

  const removeImageInput = (index) => {
    const images = [...newEvent.images];
    images.splice(index, 1);
    setNewEvent({ ...newEvent, images });
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    const filteredImages = newEvent.images.filter(url => url.trim() !== '');
    const docRef = await addDoc(collection(db, 'gallery'), { ...newEvent, images: filteredImages });
    setEvents([...events, { ...newEvent, id: docRef.id, images: filteredImages }]);
    setNewEvent({ title: '', date: '', images: [''] });
  };

  const handleDeleteEvent = async (id) => {
    await deleteDoc(doc(db, 'gallery', id));
    setEvents(events.filter(event => event.id !== id));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingEvent({ ...editingEvent, [name]: value });
  };

  const handleEditImageChange = (index, value) => {
    const images = [...editingEvent.images];
    images[index] = value;
    setEditingEvent({ ...editingEvent, images });
  };

  const addEditImageInput = () => {
    setEditingEvent({ ...editingEvent, images: [...editingEvent.images, ''] });
  };

  const removeEditImageInput = (index) => {
    const images = [...editingEvent.images];
    images.splice(index, 1);
    setEditingEvent({ ...editingEvent, images });
  };

  const handleUpdateEvent = async (e) => {
    e.preventDefault();
    const filteredImages = editingEvent.images.filter(url => url.trim() !== '');
    const eventDoc = doc(db, 'gallery', editingEvent.id);
    await updateDoc(eventDoc, { ...editingEvent, images: filteredImages });
    const updatedEvents = events.map(event =>
      event.id === editingEvent.id ? { ...editingEvent, images: filteredImages } : event
    );
    setEvents(updatedEvents);
    setEditingEvent(null);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Manage Gallery</h1>
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
            <label>Image Links</label>
            {newEvent.images.map((image, index) => (
              <div key={index} className={styles.imageInputContainer}>
                <input
                  type="text"
                  value={image}
                  onChange={(e) => handleImageChange(index, e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
                <button type="button" className={styles.deleteButton} onClick={() => removeImageInput(index)}>Delete</button>
              </div>
            ))}
            <button type="button" className={styles.addButton} onClick={addImageInput}>Add Image</button>
          </div>
          <button type="submit" className={styles.submitButton}>Add Event</button>
        </form>
      </div>

      <div className={styles.eventList}>
        {events.map(event => (
          <div key={event.id} className={styles.eventItem}>
            <h3>{event.title}</h3>
            <p>{event.date}</p>
            <div className={styles.actions}>
              <button className={styles.editButton} onClick={() => setEditingEvent(event)}>Edit</button>
              <button className={styles.deleteButton} onClick={() => handleDeleteEvent(event.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {editingEvent && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Edit Event</h2>
            <form onSubmit={handleUpdateEvent}>
              <div className={styles.formGroup}>
                <label htmlFor="edit-title">Title</label>
                <input type="text" id="edit-title" name="title" value={editingEvent.title} onChange={handleEditChange} />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="edit-date">Date</label>
                <input type="date" id="edit-date" name="date" value={editingEvent.date} onChange={handleEditChange} />
              </div>
              <div className={styles.formGroup}>
                <label>Image Links</label>
                {editingEvent.images.map((image, index) => (
                  <div key={index} className={styles.imageInputContainer}>
                    <input
                      type="text"
                      value={image}
                      onChange={(e) => handleEditImageChange(index, e.target.value)}
                      placeholder="https://example.com/image.jpg"
                    />
                    <button type="button" className={styles.deleteButton} onClick={() => removeEditImageInput(index)}>Delete</button>
                  </div>
                ))}
                 <button type="button" className={styles.addButton} onClick={addEditImageInput}>Add Image</button>
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

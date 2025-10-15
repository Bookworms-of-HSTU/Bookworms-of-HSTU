'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase'; // Adjust the import path as needed
import styles from './page.module.css';

export default function Magazines() {
  const [magazines, setMagazines] = useState([]);
  const [newMagazine, setNewMagazine] = useState({ title: '', issue: '', pdf: '', image: '' });
  const [editingMagazine, setEditingMagazine] = useState(null);

  useEffect(() => {
    const fetchMagazines = async () => {
      const magazinesCollection = collection(db, 'magazines');
      const magazinesSnapshot = await getDocs(magazinesCollection);
      const magazinesList = magazinesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMagazines(magazinesList);
    };

    fetchMagazines();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMagazine({ ...newMagazine, [name]: value });
  };

  const handleAddMagazine = async (e) => {
    e.preventDefault();
    const docRef = await addDoc(collection(db, 'magazines'), newMagazine);
    setMagazines([...magazines, { ...newMagazine, id: docRef.id }]);
    setNewMagazine({ title: '', issue: '', pdf: '', image: '' });
  };

  const handleDeleteMagazine = async (id) => {
    await deleteDoc(doc(db, 'magazines', id));
    setMagazines(magazines.filter(magazine => magazine.id !== id));
  };

  const handleEditMagazine = (magazine) => {
    setEditingMagazine(magazine);
  };

  const handleUpdateMagazine = async (e) => {
    e.preventDefault();
    const magazineDoc = doc(db, 'magazines', editingMagazine.id);
    await updateDoc(magazineDoc, editingMagazine);
    setMagazines(magazines.map(magazine => magazine.id === editingMagazine.id ? editingMagazine : magazine));
    setEditingMagazine(null);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Manage Magazines</h1>

      <div className={styles.addMagazineForm}>
        <h2>Add New Magazine</h2>
        <form onSubmit={handleAddMagazine}>
          <div className={styles.formGroup}>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" value={newMagazine.title} onChange={handleInputChange} />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="issue">Issue</label>
            <input type="number" id="issue" name="issue" value={newMagazine.issue} onChange={handleInputChange} />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="pdf">PDF URL</label>
            <input type="text" id="pdf" name="pdf" value={newMagazine.pdf} onChange={handleInputChange} />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="image">Cover Image URL</label>
            <input type="text" id="image" name="image" value={newMagazine.image} onChange={handleInputChange} />
          </div>
          <button type="submit" className={styles.submitButton}>Add Magazine</button>
        </form>
      </div>

      <div className={styles.magazineList}>
        <h2>Existing Magazines</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Issue</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {magazines.map(magazine => (
              <tr key={magazine.id}>
                <td>{magazine.title}</td>
                <td>{magazine.issue}</td>
                <td>
                  <button className={styles.editButton} onClick={() => handleEditMagazine(magazine)}>Edit</button>
                  <button className={styles.deleteButton} onClick={() => handleDeleteMagazine(magazine.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingMagazine && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Edit Magazine</h2>
            <form onSubmit={handleUpdateMagazine}>
              <div className={styles.formGroup}>
                <label htmlFor="edit-title">Title</label>
                <input type="text" id="edit-title" name="title" value={editingMagazine.title} onChange={(e) => setEditingMagazine({ ...editingMagazine, title: e.target.value })} />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="edit-issue">Issue</label>
                <input type="number" id="edit-issue" name="issue" value={editingMagazine.issue} onChange={(e) => setEditingMagazine({ ...editingMagazine, issue: e.target.value })} />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="edit-pdf">PDF URL</label>
                <input type="text" id="edit-pdf" name="pdf" value={editingMagazine.pdf} onChange={(e) => setEditingMagazine({ ...editingMagazine, pdf: e.target.value })} />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="edit-image">Cover Image URL</label>
                <input type="text" id="edit-image" name="image" value={editingMagazine.image} onChange={(e) => setEditingMagazine({ ...editingMagazine, image: e.target.value })} />
              </div>
              <button type="submit" className={styles.submitButton}>Update Magazine</button>
              <button type="button" className={styles.cancelButton} onClick={() => setEditingMagazine(null)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

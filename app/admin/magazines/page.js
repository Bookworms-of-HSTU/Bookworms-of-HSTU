'use client';

import { useState } from 'react';
import styles from './page.module.css';

const initialMagazines = [
  {
    id: 1,
    title: 'Magazine 1',
    issue: 1,
    pdf: '/magazines/magazine1.pdf',
    image: '/images/placeholder.jpg',
  },
  {
    id: 2,
    title: 'Magazine 2',
    issue: 2,
    pdf: '/magazines/magazine2.pdf',
    image: '/images/placeholder.jpg',
  },
];

export default function Magazines() {
  const [magazines, setMagazines] = useState(initialMagazines);
  const [newMagazine, setNewMagazine] = useState({ title: '', issue: '', pdf: '', image: '' });
  const [editingMagazine, setEditingMagazine] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMagazine({ ...newMagazine, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setNewMagazine({ ...newMagazine, [name]: files[0] });
  };

  const handleAddMagazine = (e) => {
    e.preventDefault();
    setMagazines([...magazines, { ...newMagazine, id: Date.now() }]);
    setNewMagazine({ title: '', issue: '', pdf: '', image: '' });
  };

  const handleDeleteMagazine = (id) => {
    setMagazines(magazines.filter(magazine => magazine.id !== id));
  };

  const handleEditMagazine = (magazine) => {
    setEditingMagazine(magazine);
  };

  const handleUpdateMagazine = (e) => {
    e.preventDefault();
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
            <label htmlFor="pdf">PDF</label>
            <input type="file" id="pdf" name="pdf" onChange={handleFileChange} />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="image">Cover Image</label>
            <input type="file" id="image" name="image" onChange={handleFileChange} />
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
                <label htmlFor="edit-pdf">PDF</label>
                <input type="file" id="edit-pdf" name="pdf" onChange={(e) => setEditingMagazine({ ...editingMagazine, pdf: e.target.files[0] })} />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="edit-image">Cover Image</label>
                <input type="file" id="edit-image" name="image" onChange={(e) => setEditingMagazine({ ...editingMagazine, image: e.target.files[0] })} />
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

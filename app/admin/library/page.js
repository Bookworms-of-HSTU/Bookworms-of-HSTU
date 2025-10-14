'use client';

import { useState } from 'react';
import styles from './page.module.css';

const initialBooks = [
  {
    id: 1,
    title: 'Book 1',
    author: 'Author 1',
  },
  {
    id: 2,
    title: 'Book 2',
    author: 'Author 2',
  },
];

export default function Library() {
  const [books, setBooks] = useState(initialBooks);
  const [newBook, setNewBook] = useState({ title: '', author: '' });
  const [editingBook, setEditingBook] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook({ ...newBook, [name]: value });
  };

  const handleAddBook = (e) => {
    e.preventDefault();
    setBooks([...books, { ...newBook, id: Date.now() }]);
    setNewBook({ title: '', author: '' });
  };

  const handleDeleteBook = (id) => {
    setBooks(books.filter(book => book.id !== id));
  };

  const handleEditBook = (book) => {
    setEditingBook(book);
  };

  const handleUpdateBook = (e) => {
    e.preventDefault();
    setBooks(books.map(book => book.id === editingBook.id ? editingBook : book));
    setEditingBook(null);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Manage Library Books</h1>

      <div className={styles.addBookForm}>
        <h2>Add New Book</h2>
        <form onSubmit={handleAddBook}>
          <div className={styles.formGroup}>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" value={newBook.title} onChange={handleInputChange} />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="author">Author</label>
            <input type="text" id="author" name="author" value={newBook.author} onChange={handleInputChange} />
          </div>
          <button type="submit" className={styles.submitButton}>Add Book</button>
        </form>
      </div>

      <div className={styles.bookList}>
        <h2>Existing Books</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map(book => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>
                  <button className={styles.editButton} onClick={() => handleEditBook(book)}>Edit</button>
                  <button className={styles.deleteButton} onClick={() => handleDeleteBook(book.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingBook && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Edit Book</h2>
            <form onSubmit={handleUpdateBook}>
              <div className={styles.formGroup}>
                <label htmlFor="edit-title">Title</label>
                <input type="text" id="edit-title" name="title" value={editingBook.title} onChange={(e) => setEditingBook({ ...editingBook, title: e.target.value })} />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="edit-author">Author</label>
                <input type="text" id="edit-author" name="author" value={editingBook.author} onChange={(e) => setEditingBook({ ...editingBook, author: e.target.value })} />
              </div>
              <button type="submit" className={styles.submitButton}>Update Book</button>
              <button type="button" className={styles.cancelButton} onClick={() => setEditingBook(null)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

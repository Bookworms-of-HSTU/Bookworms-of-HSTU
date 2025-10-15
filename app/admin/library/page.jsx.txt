'use client';

import { useState } from 'react';
import styles from './page.module.css';

const initialBooks = [
  {
    id: 1,
    title: 'Book 1',
    author: 'Author 1',
    availability: 'Hardcopy',
    pdfLink: ''
  },
  {
    id: 2,
    title: 'Book 2',
    author: 'Author 2',
    availability: 'Softcopy',
    pdfLink: '/books/book2.pdf'
  },
  {
    id: 3,
    title: 'Book 3',
    author: 'Author 3',
    availability: 'Unavailable',
    pdfLink: ''
  },
];

export default function Library() {
  const [books, setBooks] = useState(initialBooks);
  const [newBook, setNewBook] = useState({ title: '', author: '', availability: 'Hardcopy', pdfLink: '' });
  const [editingBook, setEditingBook] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedBook = { ...newBook, [name]: value };
    if (name === 'availability' && value !== 'Softcopy') {
      updatedBook.pdfLink = '';
    }
    setNewBook(updatedBook);
  };

  const handleAddBook = (e) => {
    e.preventDefault();
    setBooks([...books, { ...newBook, id: Date.now() }]);
    setNewBook({ title: '', author: '', availability: 'Hardcopy', pdfLink: '' });
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

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    const updatedBook = { ...editingBook, [name]: value };
    if (name === 'availability' && value !== 'Softcopy') {
      updatedBook.pdfLink = '';
    }
    setEditingBook(updatedBook);
  }

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
          <div className={styles.formGroup}>
            <label htmlFor="availability">Availability</label>
            <select id="availability" name="availability" value={newBook.availability} onChange={handleInputChange}>
              <option value="Hardcopy">Hardcopy</option>
              <option value="Softcopy">Softcopy</option>
              <option value="Unavailable">Unavailable</option>
            </select>
          </div>
          {newBook.availability === 'Softcopy' && (
            <div className={styles.formGroup}>
              <label htmlFor="pdfLink">PDF Link</label>
              <input type="text" id="pdfLink" name="pdfLink" value={newBook.pdfLink} onChange={handleInputChange} />
            </div>
          )}
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
              <th>Availability</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map(book => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>
                  {book.availability}
                  {book.availability === 'Softcopy' && book.pdfLink && 
                    <a href={book.pdfLink} target="_blank" rel="noopener noreferrer"> (View PDF)</a>
                  }
                </td>
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
                <input type="text" id="edit-title" name="title" value={editingBook.title} onChange={handleEditInputChange} />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="edit-author">Author</label>
                <input type="text" id="edit-author" name="author" value={editingBook.author} onChange={handleEditInputChange} />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="edit-availability">Availability</label>
                <select id="edit-availability" name="availability" value={editingBook.availability} onChange={handleEditInputChange}>
                  <option value="Hardcopy">Hardcopy</option>
                  <option value="Softcopy">Softcopy</option>
                  <option value="Unavailable">Unavailable</option>
                </select>
              </div>
              {editingBook.availability === 'Softcopy' && (
                <div className={styles.formGroup}>
                  <label htmlFor="edit-pdfLink">PDF Link</label>
                  <input type="text" id="edit-pdfLink" name="pdfLink" value={editingBook.pdfLink} onChange={handleEditInputChange} />
                </div>
              )}
              <button type="submit" className={styles.submitButton}>Update Book</button>
              <button type="button" className={styles.cancelButton} onClick={() => setEditingBook(null)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

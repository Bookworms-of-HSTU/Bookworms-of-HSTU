'use client';

import { useState, useEffect } from 'react';
import { getBooks, addBook, updateBook, deleteBook } from '../../../lib/actions';
import styles from './page.module.css';

export default function LibraryAdmin() {
  const [books, setBooks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBook, setCurrentBook] = useState({
    id: null,
    title: '',
    author: '',
    hasHardcopy: false,
    hasSoftcopy: false,
    pdfLink: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    async function fetchBooks() {
      const allBooks = await getBooks();
      setBooks(allBooks);
    }
    fetchBooks();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === 'checkbox' ? checked : value;
    setCurrentBook({ ...currentBook, [name]: inputValue });
  };

  const handleSaveBook = async () => {
    if (isEditing) {
      await updateBook(currentBook);
    } else {
      await addBook(currentBook);
    }
    const allBooks = await getBooks();
    setBooks(allBooks);
    closeModal();
  };

  const handleEdit = (book) => {
    setCurrentBook(book);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDelete = async (bookId) => {
    await deleteBook(bookId);
    const allBooks = await getBooks();
    setBooks(allBooks);
  };

  const openModal = () => {
    setCurrentBook({ id: null, title: '', author: '', hasHardcopy: false, hasSoftcopy: false, pdfLink: '' });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Manage Library Books</h1>
      <button className={styles.addButton} onClick={openModal}>
        Add New Book
      </button>

      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>{isEditing ? 'Edit Book' : 'Add New Book'}</h2>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={currentBook.title}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="author"
              placeholder="Author"
              value={currentBook.author}
              onChange={handleInputChange}
            />
            <div className={styles.checkboxGroup}>
              <label>
                <input
                  type="checkbox"
                  name="hasHardcopy"
                  checked={currentBook.hasHardcopy}
                  onChange={handleInputChange}
                />
                Hardcopy Available
              </label>
              <label>
                <input
                  type="checkbox"
                  name="hasSoftcopy"
                  checked={currentBook.hasSoftcopy}
                  onChange={handleInputChange}
                />
                Softcopy Available
              </label>
            </div>
            {currentBook.hasSoftcopy && (
              <input
                type="text"
                name="pdfLink"
                placeholder="PDF Link"
                value={currentBook.pdfLink}
                onChange={handleInputChange}
              />
            )}
            <div className={styles.modalActions}>
              <button onClick={handleSaveBook}>{isEditing ? 'Update Book' : 'Add Book'}</button>
              <button onClick={closeModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}

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
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>
                {book.hasHardcopy && 'Hardcopy'}
                {book.hasHardcopy && book.hasSoftcopy && ', '}
                {book.hasSoftcopy && 'Softcopy'}
                {!book.hasHardcopy && !book.hasSoftcopy && 'Unavailable'}
              </td>
              <td>
                <button className={styles.editButton} onClick={() => handleEdit(book)}>Edit</button>
                <button className={styles.deleteButton} onClick={() => handleDelete(book.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

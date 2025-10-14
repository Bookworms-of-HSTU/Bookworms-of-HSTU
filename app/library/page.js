'use client';

import { useState, useEffect } from 'react';
import { getBooks } from '../lib/actions';
import styles from './page.module.css';

const BookCard = ({ book }) => {
  return (
    <div className={styles.bookCard}>
      <h2 className={styles.bookTitle}>{book.title}</h2>
      <p className={styles.bookAuthor}>by {book.author}</p>
      <div className={styles.availabilityContainer}>
        {book.hasHardcopy && <p className={styles.availability}>Hardcopy Available</p>}
        {!book.hasHardcopy && !book.hasSoftcopy && <p className={styles.availability}>Unavailable</p>}
      </div>
      {book.hasSoftcopy && book.pdfLink && (
        <a href={book.pdfLink} target="_blank" rel="noopener noreferrer" className={styles.pdfLink}>
          View PDF
        </a>
      )}
    </div>
  );
};

export default function Library() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function fetchBooks() {
      const allBooks = await getBooks();
      setBooks(allBooks);
    }
    fetchBooks();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Library</h1>
      <div className={styles.bookGrid}>
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}

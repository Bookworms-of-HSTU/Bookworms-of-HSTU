'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';
import { collection, getDocs, query, orderBy, limit, startAfter } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const BOOKS_PER_PAGE = 10;

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
  const [lastVisible, setLastVisible] = useState(null);
  const [loading, setLoading] = useState(false);
  const [allBooksLoaded, setAllBooksLoaded] = useState(false);

  const fetchBooks = async (after = null) => {
    setLoading(true);
    try {
      let booksQuery = query(
        collection(db, "library"),
        orderBy("title"),
        limit(BOOKS_PER_PAGE)
      );

      if (after) {
        booksQuery = query(
          collection(db, "library"),
          orderBy("title"),
          startAfter(after),
          limit(BOOKS_PER_PAGE)
        );
      }

      const booksSnapshot = await getDocs(booksQuery);
      const newBooks = booksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      if (newBooks.length < BOOKS_PER_PAGE) {
        setAllBooksLoaded(true);
      }

      setBooks(prevBooks => [...prevBooks, ...newBooks]);
      setLastVisible(booksSnapshot.docs[booksSnapshot.docs.length - 1]);
    } catch (error) {
      console.error("Error fetching books: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Library</h1>
      <div className={styles.bookGrid}>
        {books.filter(book => book.id).map((book) => (
          <BookCard key={book.id || Math.random()} book={book} />
        ))}
      </div>
      {!allBooksLoaded && (
        <div className={styles.loadMoreContainer}>
          <button onClick={() => fetchBooks(lastVisible)} disabled={loading} className={styles.loadMoreButton}>
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  );
}

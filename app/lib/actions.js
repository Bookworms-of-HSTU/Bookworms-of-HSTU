'use server';

import { promises as fs } from 'fs';
import path from 'path';

const booksFilePath = path.join(process.cwd(), 'lib', 'data', 'books.json');

export async function getBooks() {
  try {
    const fileContent = await fs.readFile(booksFilePath, 'utf8');
    return JSON.parse(fileContent);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return []; // Return an empty array if the file doesn't exist
    }
    throw error;
  }
}

export async function addBook(book) {
  const books = await getBooks();
  const newBook = { ...book, id: Date.now().toString() };
  books.push(newBook);
  await fs.writeFile(booksFilePath, JSON.stringify(books, null, 2));
  return newBook;
}

export async function updateBook(updatedBook) {
  let books = await getBooks();
  books = books.map(book => book.id === updatedBook.id ? updatedBook : book);
  await fs.writeFile(booksFilePath, JSON.stringify(books, null, 2));
  return updatedBook;
}

export async function deleteBook(bookId) {
  let books = await getBooks();
  books = books.filter(book => book.id !== bookId);
  await fs.writeFile(booksFilePath, JSON.stringify(books, null, 2));
  return { success: true };
}

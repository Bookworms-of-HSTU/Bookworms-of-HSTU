'use server';

import { promises as fs } from 'fs';
import path from 'path';

const booksFilePath = path.join(process.cwd(), 'lib', 'data', 'books.json');
const subscribersFilePath = path.join(process.cwd(), 'lib', 'data', 'subscribers.json');
const noticesFilePath = path.join(process.cwd(), 'lib', 'data', 'notices.json');
const contactFilePath = path.join(process.cwd(), 'contact.json');

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

async function getSubscribers() {
    try {
        const data = await fs.readFile(subscribersFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            return [];
        }
        throw error;
    }
}

export async function addSubscriber(email) {
    const subscribers = await getSubscribers();
    if (!subscribers.includes(email)) {
        subscribers.push(email);
        await fs.writeFile(subscribersFilePath, JSON.stringify(subscribers, null, 2));
    }
    return { success: true };
}

export async function getNotices() {
    try {
      const fileContent = await fs.readFile(noticesFilePath, 'utf8');
      return JSON.parse(fileContent);
    } catch (error) {
      if (error.code === 'ENOENT') {
        return [];
      }
      throw error;
    }
  }

  export async function addNotice(notice) {
    const notices = await getNotices();
    const newNotice = { ...notice, id: Date.now().toString() };
    notices.push(newNotice);
    await fs.writeFile(noticesFilePath, JSON.stringify(notices, null, 2));
    return newNotice;
  }

  export async function updateNotice(updatedNotice) {
    let notices = await getNotices();
    notices = notices.map(notice => notice.id === updatedNotice.id ? updatedNotice : notice);
    await fs.writeFile(noticesFilePath, JSON.stringify(notices, null, 2));
    return updatedNotice;
  }

  export async function deleteNotice(noticeId) {
    let notices = await getNotices();
    notices = notices.filter(notice => notice.id !== noticeId);
    await fs.writeFile(noticesFilePath, JSON.stringify(notices, null, 2));
    return { success: true };
  }

export async function addContactMessage(message) {
    const messages = await getContactMessages();
    const newMessage = { ...message, id: Date.now().toString() };
    messages.push(newMessage);
    await fs.writeFile(contactFilePath, JSON.stringify(messages, null, 2));
    return newMessage;
}

export async function getContactMessages() {
    try {
        const fileContent = await fs.readFile(contactFilePath, 'utf8');
        return JSON.parse(fileContent);
    } catch (error) {
        if (error.code === 'ENOENT') {
            return [];
        }
        throw error;
    }
}
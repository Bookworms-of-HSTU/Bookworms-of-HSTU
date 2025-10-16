'use server';

import { promises as fs } from 'fs';
import path from 'path';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";

const noticesFilePath = path.join(process.cwd(), 'lib', 'data', 'notices.json');

export async function getBooks() {
  const booksCollection = collection(db, "library");
  const booksSnapshot = await getDocs(booksCollection);
  const books = booksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return books;
}

export async function addBook(book) {
  const docRef = await addDoc(collection(db, "library"), book);
  return { ...book, id: docRef.id };
}

export async function updateBook(updatedBook) {
  const bookRef = doc(db, "library", updatedBook.id);
  await updateDoc(bookRef, updatedBook);
  return updatedBook;
}

export async function deleteBook(bookId) {
  await deleteDoc(doc(db, "library", bookId));
  return { success: true };
}

export async function addSubscriber(email) {
    const subscribersCollection = collection(db, "subscribers");
    const q = query(subscribersCollection, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
        await addDoc(subscribersCollection, {
            email: email,
            createdAt: new Date()
        });
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
    const docRef = await addDoc(collection(db, "messages"), message);
    return { ...message, id: docRef.id };
}

export async function getContactMessages() {
    const messagesCollection = collection(db, "messages");
    const messagesSnapshot = await getDocs(messagesCollection);
    const messages = messagesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return messages;
}
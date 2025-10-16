import algoliasearch from 'algoliasearch';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './lib/firebase.js';

async function getRecords(collectionName) {
  const querySnapshot = await getDocs(collection(db, collectionName));
  return querySnapshot.docs.map(doc => ({ ...doc.data(), objectID: doc.id }));
}

async function main() {
  try {
    if (!process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || !process.env.ALGOLIA_ADMIN_KEY) {
      throw new Error('Algolia credentials are not set in the environment variables.');
    }
    const client = algoliasearch(process.env.NEXT_PUBLIC_ALGOLIA_APP_ID, process.env.ALGOLIA_ADMIN_KEY);
    const index = client.initIndex('content_index');

    const blogRecords = await getRecords('blogs');
    const galleryRecords = await getRecords('gallery');
    const libraryRecords = await getRecords('library');
    const magazineRecords = await getRecords('magazine');
    const noticeRecords = await getRecords('notices');

    const allRecords = [...blogRecords, ...galleryRecords, ...libraryRecords, ...magazineRecords, ...noticeRecords];

    const recordsWithUrl = allRecords.map(record => {
      let url;
      if (record.title && record.hasOwnProperty('excerpt')) {
        url = `/blog/${record.objectID}`;
      } else if (record.title && record.hasOwnProperty('images')) {
        url = '/gallery';
      } else if (record.title && record.hasOwnProperty('author')) {
        url = '/library';
      } else if (record.title && record.hasOwnProperty('file')) {
        url = '/magazine';
      } else if (record.title && record.hasOwnProperty('content')) {
        url = '/notices';
      } else {
        url = '/';
      }
      return { ...record, url };
    });

    await index.saveObjects(recordsWithUrl);
    console.log('Records indexed successfully');
  } catch (error) {
    console.error('Error indexing records:', error);
  }
}

main();

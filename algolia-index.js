
require('dotenv').config({ path: '.env.local' });

const algoliasearch = require('algoliasearch');
const admin = require('firebase-admin');

// --- Firebase Admin SDK Initialization ---
// IMPORTANT: You must download your service account key from the
// Firebase console and save it as 'serviceAccountKey.json' in the root directory.
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// --- Algolia Client Initialization ---
const algoliaClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.ALGOLIA_ADMIN_KEY
);
const index = algoliaClient.initIndex('content_index');

// --- Main Indexing Function ---
async function getRecords(collectionName) {
  const querySnapshot = await db.collection(collectionName).get();
  return querySnapshot.docs.map(doc => ({ ...doc.data(), objectID: doc.id }));
}

async function runIndexing() {
  try {
    console.log('Starting indexing process...');

    if (!process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || !process.env.ALGOLIA_ADMIN_KEY) {
      throw new Error('Algolia credentials are not set in the environment variables.');
    }

    const collections = ['blogs', 'gallery', 'library', 'magazine', 'notices'];
    let allRecords = [];

    for (const collectionName of collections) {
      console.log(`Fetching records from '${collectionName}'...`);
      const records = await getRecords(collectionName);
      allRecords = [...allRecords, ...records];
      console.log(`Fetched ${records.length} records.`);
    }

    const recordsWithUrl = allRecords.map(record => {
      let url = '/'; // Default URL
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
      }
      return { ...record, url };
    });
    
    console.log(`
Total records to index: ${recordsWithUrl.length}`);
    
    await index.saveObjects(recordsWithUrl);
    console.log('✅ Records successfully indexed to Algolia.');

  } catch (error) {
    console.error('❌ Error during indexing:', error);
    process.exit(1);
  }
}

runIndexing();

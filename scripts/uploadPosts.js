
const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// Initialize Firebase Admin SDK
const serviceAccount = require('../google-services.json'); // I will need to get this file first
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Path to the data file
const dataPath = path.join(__dirname, '..', 'data', 'posts.js');

// Read the data file
fs.readFile(dataPath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading data file:', err);
    return;
  }

  // Parse the posts array from the file content
  const posts = eval(data);

  // Upload each post to Firestore
  posts.forEach(post => {
    db.collection('posts').add(post)
      .then(docRef => {
        console.log('Document written with ID: ', docRef.id);
      })
      .catch(error => {
        console.error('Error adding document: ', error);
      });
  });
});

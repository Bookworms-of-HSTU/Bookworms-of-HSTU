import algoliasearch from 'algoliasearch';

// Your Admin API Key is a secret and should not be in frontend code.
// We use it here in a one-time script to populate the index.
const client = algoliasearch('K2KJQ73XKL', '4465141876813adddbdd6507473b6267');

// Fetch and index objects in Algolia
const processRecords = async () => {
  console.log('Fetching movie dataset...');
  const datasetRequest = await fetch('https://dashboard.algolia.com/api/1/sample_datasets?type=movie');
  const movies = await datasetRequest.json();
  
  console.log(`Fetched ${movies.length} movies. Indexing now...`);
  
  const index = client.initIndex('movies_index');
  
  // Send the objects for indexing. We will not wait for the task to complete in this script.
  await index.saveObjects(movies, {
    autoGenerateObjectIDIfNotExist: true
  });

  console.log('Successfully sent objects to Algolia for indexing!');
};

processRecords().catch((err) => console.error('Error during indexing:', err));

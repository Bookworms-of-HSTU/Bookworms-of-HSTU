'use client';

import React from 'react';
import algoliasearch from 'algoliasearch/lite';
// Corrected import from the newly installed package
import { InstantSearch, SearchBox, Hits, Highlight, Snippet, useInstantSearch } from 'react-instantsearch';
import styles from './Search.module.css';

// Initialize the Algolia search client
const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY
);

// This is the component that will be rendered for each search result (a "hit")
const Hit = ({ hit }) => {
  return (
    <a href={hit.url} className={styles.hit} data-analytics-id={`search-result-click-${hit.objectID}`}>
      <div className={styles.hitTitle}>
        <Highlight attribute="title" hit={hit} />
      </div>
      <div className={styles.hitSnippet}>
        <Snippet attribute="content" hit={hit} />
      </div>
    </a>
  );
};

// A new component to conditionally display hits
const ConditionalHits = () => {
  const { results } = useInstantSearch();
  // Only show the hits container if there is a query and there are results
  return results && results.query && results.query.length > 0 && results.nbHits > 0 ? (
    <div className={styles.hitsContainer} data-analytics-section="search-results">
      <Hits hitComponent={Hit} />
    </div>
  ) : null;
};

const Search = () => {
  return (
    <div className={styles.searchContainer} data-analytics-section="search">
      <InstantSearch searchClient={searchClient} indexName="content_index">
        <SearchBox 
          placeholder="Search articles..." 
          className={styles.searchBox} 
          data-analytics-id="search-input-interaction" 
        />
        <ConditionalHits />
      </InstantSearch>
    </div>
  );
};

export default Search;

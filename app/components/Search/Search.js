'use client';

import React from 'react';
import algoliasearch from 'algoliasearch/lite';
// Corrected import from the newly installed package
import { InstantSearch, SearchBox, Hits, Highlight, Snippet, useInstantSearch } from 'react-instantsearch';
import styles from './Search.module.css';

// Initialize the Algolia search client
const searchClient = algoliasearch('K2KJQ73XKL', 'b471d3dd2782296ed09a8449546d22e7');

// This is the component that will be rendered for each search result (a "hit")
const Hit = ({ hit }) => {
  return (
    <a href={hit.url} className={styles.hit}>
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
    <div className={styles.hitsContainer}>
      <Hits hitComponent={Hit} />
    </div>
  ) : null;
};

const Search = () => {
  return (
    <div className={styles.searchContainer}>
      <InstantSearch searchClient={searchClient} indexName="content_index">
        <SearchBox placeholder="Search articles..." className={styles.searchBox} />
        <ConditionalHits />
      </InstantSearch>
    </div>
  );
};

export default Search;

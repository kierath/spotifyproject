// src/Components/SearchBar/SearchBar.js
import React, { useState } from 'react';
import './searchbar.css';
import SearchResults from '../SearchResults/searchresults';

function SearchBar({ token }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

const search = () => {
  if (!query) {
    alert('Please enter an artist to search.');
    setResults([]); // Clear previous results
    return;
  }

  fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=artist`, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then(res => res.json())
    .then(data => {
      setResults(data.artists?.items || []); // optional chaining avoids errors
      if (!data.artists?.items?.length) {
        alert('No artists found for your search.');
      }
    })
    .catch(err => {
      console.error('Search error:', err);
      alert('Something went wrong. Please try again.');
      setResults([]);
    });
};


  return (
    <div className="SearchBarContainer">
      <div className="SearchControls">
        <input
          type="text"
          placeholder="Search an artist..."
          value={query}
          onChange={e => setQuery(e.target.value)}
       />
      <button onClick={search}>Search</button>
    </div>
    <div className= "SearchResultsContainer">
      <SearchResults results={results} />
      </div>
    </div>
  );
}

export default SearchBar;

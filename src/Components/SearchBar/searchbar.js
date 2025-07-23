// src/Components/SearchBar/SearchBar.js
import React, { useState } from 'react';
import './searchbar.css';
import SearchResults from '../SearchResults/searchresults';

function SearchBar({ token }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const search = () => {
    fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=artist`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setResults(data.artists.items || []));
  };

  return (
    <div className="SearchBarContainer">
      <input
        type="text"
        placeholder="Search artist..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <button onClick={search}>Search</button>

      <SearchResults results={results} />
    </div>
  );
}

export default SearchBar;

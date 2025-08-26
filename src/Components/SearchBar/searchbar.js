import React, { useState } from 'react';
import SearchResults from '../SearchResults/searchresults';
import './searchbar.css';

function SearchBar({ token, onAdd }) {
  // State for the search query and results
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const search = async () => {
    if (!query.trim()) {
      alert('Please enter a song to search.');
      setResults([]);
      return;
    }

    try {
      const res = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=50`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await res.json();
      setResults(data.tracks?.items || []);
    } catch (err) {
      console.error(err);
      setResults([]);
    }
  };

  return (
  <div className="SearchBarContainer">
    <div className="SearchControls">
      <input
        type="text"
        placeholder="Search a song..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={search}>Search</button>
    </div>
    <div className="ResultsSection">
      <SearchResults results={results} onAdd={onAdd} />
    </div>
  </div>
);
}

export default SearchBar;

// src/Components/SearchResults/SearchResults.js
import React from 'react';
import './searchresults.css';

function SearchResults({ results = [], onAdd }) {
  return (
      <div className="SearchResultsWrapper">
        {/* Scrollable results */}
        <div className="SearchResultsList">
          <ul>
            {results.map((track) => (
              <li key={track.id} className="songItem">
                {track.album?.images?.[0]?.url && (
                  <img src={track.album.images[0].url} alt={track.name} />
                )}
                <div className="SongInfo">
                  <strong>{track.name}</strong> by{' '}
                  {track.artists.map((a) => a.name).join(', ')}
                  {track.preview_url && (
                    <audio controls src={track.preview_url}></audio>
                  )}
                  <button
                    onClick={() => onAdd(track)}
                    className="AddTrackBtn"
                  >
                    Add
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

  );
}

export default SearchResults;

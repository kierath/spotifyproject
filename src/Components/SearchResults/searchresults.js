import React from 'react';
import './searchresults.css';

function SearchResults({ results = [], onAdd }) {
  return (
    <div className="SearchResultsWrapper">
      <div className="SearchResultsList">
        <ul>
          {results.map((track) => (
            <li key={track.id} className="songItem">
              {track.album?.images?.[0]?.url && (
                <img src={track.album.images[0].url} alt={track.name} />
              )}
              <div className="songInfo">
                <strong>{track.name}</strong>
                <span>{track.artists.map((a) => a.name).join(', ')}</span>
                {track.preview_url && <audio controls src={track.preview_url}></audio>}
              </div>
              <button onClick={() => onAdd(track)} className="AddTrackBtn">+</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SearchResults;

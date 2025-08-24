import React from 'react';
import './track.css';

function Track({ track, onRemove }) {
  return (
    <li className="TrackItem">
      {track.album?.images?.[0]?.url && (
        <img src={track.album.images[0].url} alt={track.name} width="50" height="50" />
      )}
      <div className="TrackInfo">
        <strong>{track.name}</strong>
        <span>{track.artists.map(a => a.name).join(', ')}</span>
      </div>
       <button onClick={() => onRemove(track.uri)} className="RemoveTrackBtn">
        Remove
      </button>
    </li>
  );
}

export default Track;

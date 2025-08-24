import React from 'react';
import Track from '../Track/track';
import './tracklist.css';

function TrackList({ tracks, onRemove }) {
  if (!tracks.length) return <p className="NoTracks">No tracks available.</p>;

  return (
    <ul className="TrackList">
      {tracks.map((item, index) => (
        <Track key={item.track?.id || index} 
        track={item.track}
        onRemove={onRemove} />
      ))}
    </ul>
  );
}

export default TrackList;

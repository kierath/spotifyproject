import React from 'react';
import Track from '../Track/track';
import './tracklist.css';

function TrackList({ tracks, onRemove }) {
  if (!tracks.length) return <p className="NoTracks">No tracks available.</p>;

  return (
    <ul className="TrackList">
      {tracks.map((track) => (
        <Track key={track.id} track={track} onRemove={onRemove} />
      ))}
    </ul>
  );
}

export default TrackList;

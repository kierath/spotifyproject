import React, { useEffect, useState } from 'react';
import './playlist.css';
import TrackList from '../Tracklist/tracklist';

function Playlist({ token, userId, selectedPlaylist, setSelectedPlaylist, playlistTracks, setPlaylistTracks }) {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newPlaylistName, setNewPlaylistName] = useState('');

  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      try {
        const res = await fetch('https://api.spotify.com/v1/me/playlists', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setPlaylists(data.items);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const handleCreatePlaylist = async () => {
    if (!newPlaylistName.trim()) return;

    const res = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: newPlaylistName, description: 'Created via React App', public: true }),
    });
    const newPlaylist = await res.json();
    setPlaylists((prev) => [newPlaylist, ...prev]);
    setNewPlaylistName('');
  };

  const handleSelectPlaylist = async (playlist) => {
    setSelectedPlaylist(playlist);
    try {
      const res = await fetch(`https://api.spotify.com/v1/playlists/${playlist.id}/tracks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      // store only track objects
      setPlaylistTracks(data.items.map(item => item.track));
    } catch {
      setPlaylistTracks([]);
    }
  };

  const handleRemoveTrack = async (trackUri) => {
    if (!selectedPlaylist) return;

    await fetch(`https://api.spotify.com/v1/playlists/${selectedPlaylist.id}/tracks`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ tracks: [{ uri: trackUri }] }),
    });

    setPlaylistTracks((prev) => prev.filter((track) => track.uri !== trackUri));
  };

  if (loading) return <p>Loading playlists...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="PlaylistContainer">
      <div className="Sidebar">
        <h2>Your Playlists</h2>
        <div className="create-playlist">
          <input type="text" placeholder="New Playlist Name" value={newPlaylistName} onChange={(e) => setNewPlaylistName(e.target.value)} />
          <button className="create-playlist-button" onClick={handleCreatePlaylist} disabled={!newPlaylistName.trim()}>Add</button>
        </div>
        <div className="PlaylistList">
          {playlists.map((playlist) => (
            <div key={playlist.id} className="PlaylistItem" onClick={() => handleSelectPlaylist(playlist)}>
              {playlist.images?.[0]?.url && <img src={playlist.images[0].url} alt={playlist.name} />}
              <div>
                <strong>{playlist.name}</strong> ({playlist.tracks.total} tracks)
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="TracksContainer">
        {selectedPlaylist ? (
          <>
            <h3>{selectedPlaylist.name} - Tracks</h3>
            <TrackList tracks={playlistTracks} onRemove={handleRemoveTrack} />
          </>
        ) : (
          <p>Select a playlist to view its tracks</p>
        )}
      </div>
    </div>
  );
}

export default Playlist;

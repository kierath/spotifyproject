import React, { useEffect, useState } from 'react';
import Playlist from './Components/Playlist/playlist';
import SearchBar from './Components/SearchBar/searchbar';
import './App.css';
import backgroundImage from './Images/background.jpeg';

const client_id = 'a6410a836d3b4d479eace712db9bea04';
const redirect_url = 'http://localhost:3000/';
const auth_endpoint = 'https://accounts.spotify.com/authorize';
const response_type = 'token';
const scope =
  'user-read-private playlist-modify-private playlist-modify-public playlist-read-collaborative playlist-read-private';

function App() {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [playlistTracks, setPlaylistTracks] = useState([]);

  useEffect(() => {
    const hash = window.location.hash;
    const tokenFromHash = hash.match(/access_token=([^&]*)/)?.[1];

    if (tokenFromHash) {
      setToken(tokenFromHash);
      window.location.hash = '';

      fetch('https://api.spotify.com/v1/me', {
        headers: { Authorization: `Bearer ${tokenFromHash}` },
      })
        .then((res) => res.json())
        .then((data) => setUserId(data.id))
        .catch(console.error);
    }
  }, []);

  if (!token) {
    const loginUrl = `${auth_endpoint}?client_id=${client_id}&redirect_uri=${redirect_url}&response_type=${response_type}&scope=${encodeURIComponent(
      scope
    )}&show_dialog=true`;
    return (
      <div className="spotify-app" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <h1>Jamming</h1>
        <h2>Jam to your favourites - log in with Spotify, search any artist, and remix your playlists.</h2>
        <a href={loginUrl}>
          <button>Login to Spotify</button>
        </a>
      </div>
    );
  }

  return (
    <div className="spotify-app" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <h1>Jamming</h1>
      <h2>Search songs and manage your playlists</h2>

      {/* SearchBar on top */}
      <div className="search-section">
        <SearchBar token={token} onAdd={(track) => {
          if (!selectedPlaylist) return alert('Please select a playlist first.');
          fetch(`https://api.spotify.com/v1/playlists/${selectedPlaylist.id}/tracks`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ uris: [track.uri] }),
          })
            .then((res) => res.json())
            .then(() => setPlaylistTracks((prev) => [...prev, { track }]))
            .catch(console.error);
        }} />
      </div>

      {/* Playlist container below */}
      <Playlist
        token={token}
        userId={userId}
        selectedPlaylist={selectedPlaylist}
        setSelectedPlaylist={setSelectedPlaylist}
        playlistTracks={playlistTracks}
        setPlaylistTracks={setPlaylistTracks}
      />
    </div>
  );
}

export default App;

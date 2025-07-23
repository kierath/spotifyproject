// src/App.js
import React, { useEffect, useState } from 'react';
import Playlist from './Components/Playlist/playlist';
import './App.css';
import SearchBar from './Components/SearchBar/searchbar';

const client_id = 'a6410a836d3b4d479eace712db9bea04';
const redirect_url = 'http://localhost:3000/';
const auth_endpoint = 'https://accounts.spotify.com/authorize';
const response_type = 'token';

function App() {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const hash = window.location.hash;
    const token = hash.match(/access_token=([^&]*)/)?.[1]; //if hash doesn't contain access_token or is "" then will be undefined
    if (token) {
      setToken(token);
      window.location.hash = '';
      //get the user profile to get user ID
      fetch('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res) => res.json())
        .then((data) => setUserId(data.id))
        .catch((err) => console.error('Failed to fetch user profile:', err));
    }
  }, []);

  const loginUrl = `${auth_endpoint}?client_id=${client_id}&redirect_uri=${redirect_url}&response_type=${response_type}&show_dialog=true`;

  return (
    <div className="spotify-app">
      <h1>Spotify Login</h1>
      {!token ? (
        <a href={loginUrl}>
          <button>Login to Spotify</button>
        </a>
      ) : (
        <>
          <SearchBar token={token} />
          <Playlist token={token} />
        </>
      )}
    </div>
  );
}

export default App;
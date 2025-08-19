import React, { useEffect, useState } from 'react';
import './playlist.css'; 

function Playlist({ token }) {
    const [playlists, setPlaylists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!token) return;

        fetch('https://api.spotify.com/v1/me/playlists', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                if (!res.ok) throw new Error('Failed to fetch playlists');
                return res.json();
            })
            .then((data) => {
                setPlaylists(data.items);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [token]);

    if (loading) {
        return <p>Loading playlists...</p>;
    }
    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className = "PlaylistContainer">
            <h2>Your Playlists</h2>
            <div className="PlaylistList">
            <ul>
                {playlists.map((playlist) => (
                    <li className = "PlaylistItem" key={playlist.id}>
                        {playlist.images[0] && (
                            <img
                                src={playlist.images[0].url}
                                alt={playlist.name}
                            />
                        )}
                        <div>
                            <strong>{playlist.name}</strong> ({playlist.tracks.total} tracks)
                        </div>
                    </li>
                ))}
            </ul>
            </div>
        </div>
    );
}

export default Playlist;

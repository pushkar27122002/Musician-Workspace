import React, { useState } from 'react'; // Import useState from react
import { makeAuthenticatedPostRequest } from '../utils/serverHelpers';

const CreatePlaylistModal = ({onClose}) => {
  const [playlistName, setPlaylistName] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { playlistName, thumbnailUrl };
    // JSON.stringify(data); // This line is not needed
    const response = await makeAuthenticatedPostRequest('/playlist/create', { data });
    if (response) {
      alert('Playlist created successfully');
      onClose();
    }
    onClose();
  };

  return (
    isOpen && (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={onClose}>&times;</span>
          <h2>Create Playlist</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="playlistName">Playlist Name:</label>
              <input
                type="text"
                id="playlistName"
                value={playlistName}
                onChange={(e) => setPlaylistName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="thumbnailUrl">Thumbnail URL:</label>
              <input
                type="text"
                id="thumbnailUrl"
                value={thumbnailUrl}
                onChange={(e) => setThumbnailUrl(e.target.value)}
                required
              />
            </div>
            <button type="submit">Create Playlist</button>
          </form>
        </div>
      </div>
    )
  );
};

export default CreatePlaylistModal;

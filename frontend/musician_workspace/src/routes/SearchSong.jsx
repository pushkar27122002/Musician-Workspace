import { useState } from 'react';
import { makeAuthenticatedGetRequest } from '../utils/serverHelpers';

const SearchSongComponent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [songData, setSongData] = useState([]);

  const handleSearch = async () => {
    // Handle search functionality here
    try {
      const response = await makeAuthenticatedGetRequest("/song/get/songName/" + searchQuery);
      setSongData(response.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setSongData([]);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
      <div className="w-full max-w-screen-lg mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Search Songs/Artists</h1>
        <div className="flex justify-center mb-8">
          <div className="bg-gray-800 rounded-lg p-6 flex items-center justify-between">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter song or artist name"
              className="bg-gray-900 text-white px-4 py-2 rounded-md w-full"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-600 text-white px-4 py-2 rounded-md ml-4"
            >
              Search
            </button>
          </div>
        </div>
        <div>
          {songData.map((song, index) => (
            <div key={index} className="bg-gray-800 rounded-lg p-6 mb-4">
              <div className="flex items-center justify-between">
                <img src={song.thumbnail} alt={`Thumbnail ${index + 1}`} className="w-52 h-auto object-cover rounded-lg mr-4" />
                <div className="flex flex-col justify-between">
                  <h2 className="text-2xl font-bold mb-2">{song.name}</h2>
                  <p className="text-sm">{song.artist.firstName}</p>
                  <div className="flex gap-4">
                    <button className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm">Play</button>
                    <button className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm">Like</button>
                    <button className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm">Comment</button>
                    <button className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm">Add to Playlist</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchSongComponent;

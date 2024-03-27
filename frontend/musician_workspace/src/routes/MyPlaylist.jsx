import { useState, useEffect } from "react";
import { makeAuthenticatedGetRequest } from "../utils/serverHelpers";
import { useNavigate } from "react-router-dom";

const MyPlaylistComponent = () => {
  const [playlists, setPlaylists] = useState([]);
  const Navigate = useNavigate();

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await makeAuthenticatedGetRequest("/playlist/get/me");
        console.log("Response from server:", response); // Log the response to inspect its structure 
        if (response.error) {
          alert("Could not fetch playlists: " + response.error.message);
          return;
        }
        console.log("Fetched playlists:", response);
        setPlaylists(response); // Update to set playlists directly from response
      } catch (error) {
        console.error("An error occurred while fetching playlists:", error);
        alert("An error occurred while fetching playlists. Please try again.");
      }
    };
    fetchPlaylists();
  }, []); 

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <div className="w-full max-w-screen-lg mx-auto p-8">
        <div className="flex justify-between mb-8">
          <div>
            <button className="bg-transparent border border-white rounded px-4 py-2 mr-4"><a href="/login" className="hover:underline">PK</a></button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md mr-4">My Playlist</button>
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-8 text-center">MY PLAYLISTS</h1>

        <div className="grid grid-cols-3 gap-4">
          {playlists.map((playlist, index) => (
            <div key={index} className="bg-gray-800 p-4 rounded-md">
              <img src={playlist.thumbnail} alt={playlist.name} className="w-full h-40 object-cover mb-2 rounded-md" />
              <h2 className="text-lg font-semibold">{playlist.name}</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md mt-2" onClick={() => Navigate(`/myPlaylist/${playlist._id}`)}>
                View Playlist
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyPlaylistComponent;

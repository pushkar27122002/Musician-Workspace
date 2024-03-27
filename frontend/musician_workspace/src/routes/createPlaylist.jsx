import { useState } from "react";
import { makeAuthenticatedPostRequest } from "../utils/serverHelpers";
import { useNavigate } from "react-router-dom";

const CreatePlaylistComponent = () => {
  const [playlistName, setPlaylistName] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const Navigate = useNavigate();

  const submitPlaylist = async () => {
    const data = { name: playlistName, thumbnail ,songs:[]};
    try {
      const response = await makeAuthenticatedPostRequest("/playlist/create", JSON.stringify(data));
      if (response.error) {
        alert("Could not create playlist: " + response.error.message);
        return;
      }
      alert("Playlist created successfully");
      console.log(response.data);
      Navigate("/home");
    } catch (error) {
      console.error("An error occurred while creating playlist:", error);
      alert("An error occurred while creating playlist. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <div className="w-full max-w-screen-lg mx-auto p-8">
        <div className="flex justify-between mb-8">
          <div>
            <button className="bg-transparent border border-white rounded px-4 py-2 mr-4"><a href="/login" className="hover:underline">PK</a></button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md mr-4">My Playlist</button>
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-8 text-center">CREATE PLAYLIST</h1>

        <div className="flex flex-col items-center justify-center mb-8 text-gray-700 ">
          <input
            type="text"
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
            placeholder="Enter Playlist Name"
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
          />

          <input
            type="text"
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.value)}
            placeholder="Thumbnail URL"
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
          />

          <button className="bg-blue-600 text-white px-4 py-2 rounded-md mr-4" onClick={submitPlaylist}>
            Create Playlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePlaylistComponent;

import CloudinaryUpload from "../components/CloudinaryUpload";
import { useState } from "react";
import { makeAuthenticatedPostRequest } from "../utils/serverHelpers";
import { useNavigate } from "react-router-dom";
const UploadSongComponent = () => {

    const[name,setName] = useState("");
    const[thumbnail,setThumbnail] = useState("");
    const [playlistUrl,setPlaylistUrl] = useState("");
    const [uploadedSongName,setUploadedSongName] = useState();
    const Navigate = useNavigate();
    const submitSong = async () => {
      const data = { name, thumbnail, track: playlistUrl };
      const newData = JSON.stringify(data);
      console.log(newData);
      try {
          const response = await makeAuthenticatedPostRequest("/song/create", newData);
          console.log(response); // Log the response to inspect its structure
          if (response.error) {
              alert("Could not upload song: " + response.error.message);
              return;
          }
          alert("Song uploaded successfully");
          console.log(response.data);
          Navigate("/home");
      } catch (error) {
          console.error("An error occurred while uploading song:", error);
          alert("An error occurred while uploading song. Please try again.");
      }
  };
    // const submitSong = async ()=>{
    //     const data = {name,thumbnail,track : playlistUrl};
    //     const newData = JSON.stringify(data);
    //     console.log(newData);
    //     const response =await makeAuthenticatedPostRequest("/song/create",newData);
    //     if(response.error){
    //         alert("Could not upload song");
    //         return;
    //     }
    //     alert("Song uploaded successfully");
    //     console.log(response.data);
    //     Navigate("/home");
    // }
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <div className="w-full max-w-screen-lg mx-auto p-8">
        <div className="flex justify-between mb-8">
          <div>
            <button className="bg-transparent border border-white rounded px-4 py-2 mr-4"><a href="/login" className="hover:underline">PK</a></button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md mr-4">My Playlist</button>
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-8 text-center">SANGEET KAKSHA</h1>

        <div className="flex flex-col items-center justify-center mb-8 text-gray-700 ">
          <input
            type="text"
            id = "name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            placeholder="Enter Song Name"
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
          />

          <input
            type="text"
            id="thumbnail"
            value={thumbnail}
            onChange={(e)=>setThumbnail(e.target.value)}
            placeholder="Thumbnail"
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
          />

           <div>
            {uploadedSongName ? (
                <div className="bg-white rounded-full p-3 w-1/3">
                     {uploadedSongName}
                </div>
            ):(
            <div>
             <CloudinaryUpload setUrl={setPlaylistUrl} setSongName={setUploadedSongName}/>
           </div>
            )}
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md mr-4 " onClick={submitSong}>
                Submit Song 
            </button>
            
        </div>
      </div>
    </div>
    </div>
  );
};

export default UploadSongComponent;

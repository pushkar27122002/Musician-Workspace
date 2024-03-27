import { makeAuthenticatedGetRequest } from "../utils/serverHelpers";
import { useEffect, useState } from "react";
import { Howl, Howler } from "howler";

const MySongsComponent = () => {
  const [songs, setSongs] = useState([]);
  const [songPlayed, setSongPlayed] = useState(null);

  const playSong = (songSrc) => {
    if (songPlayed) {
      songPlayed.stop();
    }
    let sound = new Howl({
      src: [songSrc],
      html5: true,
    });
    setSongPlayed(sound);
    sound.play();
  };

  useEffect(() => {
    const getData = async () => {
      const response = await makeAuthenticatedGetRequest("/song/get/mySongs");
      setSongs(response.data);
    };
    getData();
  }, []);

  return (
    <div className="h-screen bg-gray-900 text-white">
      <div className="w-full max-w-screen-lg mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8">MY SONGS</h1>
        <div>
          {songs.map((song, index) => (
            <div key={index} className="bg-gray-800 rounded-lg p-6 mb-4">
              <div className="flex items-center justify-between">
                <img src={song.thumbnail} alt={`Thumbnail ${index + 1}`} className="w-52 h-auto object-cover rounded-lg mr-4" />
                <div className="flex flex-col justify-between">
                  <h2 className="text-2xl font-bold mb-2">{song.name}</h2>
                  <p className="text-sm">{song.artist.firstName}</p>
                  <div className="flex gap-4">
                    <button onClick={() => playSong(song.track)} className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm">Play</button>
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

export default MySongsComponent;

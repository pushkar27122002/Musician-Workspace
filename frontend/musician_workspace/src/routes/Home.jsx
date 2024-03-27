const HomeComponent = () => {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
        <div className="w-full max-w-screen-lg mx-auto p-8">
          <div className="flex justify-between mb-8">
            <div>
              <button className="bg-transparent border border-white rounded px-4 py-2 mr-4"><a href="/login" className= "hover:underline">Login</a></button>
              <button className="bg-transparent border border-white rounded px-4 py-2"><a href="/signup" className= "hover:underline">Signup</a></button>
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-8 text-center">SANGEET KAKSHA</h1> {/* Added heading for project name */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-800 rounded-lg p-6 flex items-center justify-between">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md">Search Songs/Artist</button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div className="bg-gray-800 rounded-lg p-6 flex flex-col items-center justify-center">
              <div>
                <img src="https://i.scdn.co/image/ab67616d00001e0243ca24b29b53b0f248a0102f" alt="Random Image 1" className="w-32 h-32 object-cover rounded-lg mb-4" />
                <h2 className="text-xl font-bold mb-4">Choo Lo</h2>
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                <button className="bg-blue-600 text-white px-3 py-1 rounded-md">Play</button>
                <button className="bg-blue-600 text-white px-3 py-1 rounded-md">Like</button>
                <button className="bg-blue-600 text-white px-3 py-1 rounded-md">Comment</button>
                <button className="bg-blue-600 text-white px-3 py-1 rounded-md">Add to Playlist</button>
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg p-6 flex flex-col items-center justify-center">
              <div>
                <img src="https://i.scdn.co/image/ab67616d00001e025c38492c6d4430c69f7aca44" alt="Random Image 2" className="w-32 h-32 object-cover rounded-lg mb-4" />
                <h2 className="text-xl font-bold mb-4">Mere Bina</h2>
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                <button className="bg-blue-600 text-white px-3 py-1 rounded-md">Play</button>
                <button className="bg-blue-600 text-white px-3 py-1 rounded-md">Like</button>
                <button className="bg-blue-600 text-white px-3 py-1 rounded-md">Comment</button>
                <button className="bg-blue-600 text-white px-3 py-1 rounded-md">Add to Playlist</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default HomeComponent;
  
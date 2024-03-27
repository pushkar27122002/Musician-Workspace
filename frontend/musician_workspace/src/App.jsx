import { BrowserRouter, Routes, Route , Navigate } from "react-router-dom"
import LoginComponent from "./routes/Login.jsx";
import SignupComponent from "./routes/Signup.jsx";
import HomeComponent from "./routes/Home.jsx";
import LoggedinHomeComponent from "./routes/LoggedinHome.jsx";
import UploadSong from "./routes/UploadSong.jsx"
import { useCookies } from "react-cookie";
import CloudinaryScript from "./routes/CloudinaryScript.jsx";
import MySongsComponent from "./routes/MySongs.jsx"
import SearchSongComponent from "./routes/SearchSong.jsx"
import CreatePlaylistComponent from "./routes/createPlaylist.jsx";
import MyPlaylistComponent from "./routes/MyPlaylist.jsx";

function App() {
  const [cookie,setCookie] = useCookies(["token"]);
  console.log(cookie.token);
  return (
    
    <div className="w-screen h-screen">
      
       <BrowserRouter>
       <CloudinaryScript />
        {cookie.token ?( 
          
        <Routes>
          <Route path="/home" element={<LoggedinHomeComponent/>} />
          <Route path="/uploadSong" element={<UploadSong/>} />
          <Route path="/mySongs" element={<MySongsComponent/>} />
          <Route path="/searchSong" element={<SearchSongComponent/>} />
          <Route path="/playlist/create" element={<CreatePlaylistComponent/>} />
          <Route path="/myPlaylist" element={<MyPlaylistComponent/>} />
          <Route path="*" element={<Navigate to="/home"/>} />
           </Routes> ):( 
           <Routes>
               <Route path="/login" element={<LoginComponent/>} />
                <Route path="/signup" element={<SignupComponent />} />
                <Route path="/home" element={<HomeComponent/>} />
                <Route path="*" element={<Navigate to="/login"/>} />
           </Routes>)}
       </BrowserRouter>
    </div>
  )
}
export default App

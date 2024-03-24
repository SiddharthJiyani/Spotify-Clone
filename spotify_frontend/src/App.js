import { BrowserRouter, Navigate, Route, Router, Routes } from "react-router-dom";
import "./App.css";
import LoginComponent from "./pages/LoginComponent";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import { useCookies } from "react-cookie";
import LoggedInHomeCompenent from "./pages/LoggedInHome";
import UploadSong from "./pages/UploadSong";
import MyMusic from "./pages/MyMusic";
import songContext from "./context/songContext";
import { useState } from "react";
import SearchPage from "./pages/SearchPage";
import Library from "./components/Library";
import SinglePlaylistView from "./pages/SinglePlaylistView";
import Profile from "./components/Profile";
import LikedSongs from "./pages/LikedSongs";

function App() {
  const [currentSong, setCurrentSong] = useState(null);
  const [soundPlayed, setSoundPlayed] = useState(null);
  const [isPaused, setIsPaused] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [cookie, setCookie] = useCookies(["token"]);
  // console.log(cookie.token);

  return (
      <div className="w-screen h-screen font-poppins">
        <BrowserRouter>
          {
            cookie.token ? (
                // logged in routes

                <songContext.Provider
                  value={{
                    currentSong,
                    setCurrentSong,
                    soundPlayed,
                    setSoundPlayed,
                    isPaused,
                    setIsPaused,
                    isLiked,
                    setIsLiked,
                  }}
                >
                  <Routes>
                    {/* <Route path="/" element={<Home />} /> */}
                    <Route path="/home" element={<LoggedInHomeCompenent/>} />
                    <Route path="/uploadSong" element={<UploadSong/>} />
                    <Route path="*" element={<Navigate to="/home" />}/>
                    <Route path="/mymusic" element={<MyMusic/>}/>
                    <Route path="/search" element={<SearchPage/>} />
                    <Route path="/library" element={<Library/>} />
                    <Route path="/playlist/:playlistId" element={<SinglePlaylistView/>} />
                    <Route path="/likedSongs" element={<LikedSongs/>}/>
                    <Route path="/profile" element={<Profile/>} />
                    <Route path="*" element={<Navigate to="/home" />}/>
                  </Routes>
                </songContext.Provider>
            ) : (
              // logged out routes
              <Routes> {/* When user is not logged in */}
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<LoginComponent />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="*" element={<Navigate to="/" />}/> {/*First user must login*/}
                </Routes>
            )
          }
        </BrowserRouter>
      </div>
  );
}

export default App;

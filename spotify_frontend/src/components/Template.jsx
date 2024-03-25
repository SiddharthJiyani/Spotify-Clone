import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import IconText from "../components/IconText";
import { Icon } from "@iconify/react";
import TextWithHover from "../components/TextWithHover";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
// import { Toaster, toast } from 'sonner';
import toast, { Toaster } from "react-hot-toast";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useContext } from "react";
import songContext from "../context/songContext";
import { Howl } from "howler";
import CreatePlaylistModal from "../modals/CreatePlaylistModal";
import AddToPlaylistModal from "../modals/AddToPlaylistModal";
import { makeAuthenticatedGETRequest, makeAuthenticatedPOSTRequest } from "../utils/serverHelpers";

// const currentSong =
//   {
//       thumbnail : "https://res.cloudinary.com/djodcayme/image/upload/v1707413069/dzxbbftp55fhwixoddjt.jpg",
//       name : "Song 1",
//       songUrl : "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
//       artist : {
//           firstName : "Artist",
//           lastName : "1"
//       }
//   }
//

const Template = ({ children, curActiveScreen }) => {

  const {
    currentSong,
    setCurrentSong,
    soundPlayed,
    setSoundPlayed,
    isPaused,
    setIsPaused,
    isLiked,
    setIsLiked,
  } = useContext(songContext);

  const [createPlaylistModalOpen, setCreatePlaylistModalOpen] = useState(false);
  const [addToPlaylistModalOpen, setAddToPlaylistModalOpen] = useState(false);
  const [likedSongData, setlikedSongData] = useState([]);
    useEffect( () => {
        const getData = async () => {
            const response = await makeAuthenticatedGETRequest("/song/get/likedSongs");
            setlikedSongData(response.data);
        }
        getData() ;
    },[])
  
     // search for the song in the liked songs
  // const isSongLiked = () => {
  //   for (let i = 0; i < likedSongData.length; i++) {
  //     if (likedSongData[i]._id === currentSong._id) {
  //       return true;
  //     }
  //   }
  //   return false;
  // };

  const isLikedSong = () => {
    for(let i = 0; i < likedSongData.length; i++){
      if(likedSongData[i]._id === currentSong._id){

        setIsLiked(true);
        return;
      }

      else{
        setIsLiked(false);
      } 

    }
  }

  const likeSong = () => {
    // console.log("liking song")
    const likeTheSong = async () => {

      const response = await makeAuthenticatedPOSTRequest("/song/like/" + currentSong._id);
    };
    likeTheSong();

    // if (!isSongLiked()) {
    //   setlikedSongData([...likedSongData, currentSong]);
    // }
    setIsLiked(true);
  };
  

  const unlikeSong = () => {
    // console.log("unliking song")
    const unlikeTheSong = async () => {
      const response = await makeAuthenticatedPOSTRequest("/song/unlike/" + currentSong._id);
      // console.log(response);
    };
    unlikeTheSong();
    // setlikedSongData(likedSongData.filter((song) => song._id !== currentSong._id));
    setIsLiked(false);
  };


  const firstUpdate = useRef(true);
  // console.log(firstUpdate);

  useLayoutEffect(() => {

    isLikedSong();
    // the following if statement will prevent the useEffect from running on the first render.
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    if (!currentSong) {
      return;
    }
    changeSong(currentSong.track);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSong && currentSong.track]);

  const addSongToPlaylist = async (playlistId) => {
    const songId = currentSong._id;

    const payload = { playlistId, songId };
    const response = await makeAuthenticatedPOSTRequest(
      "/playlist/add/song",
      payload
    );
    if (response._id) {
      setAddToPlaylistModalOpen(false);
    }
  };

  const playSound = () => {
    if (!soundPlayed) {
      return;
    }
    soundPlayed.play();
  };

  const changeSong = (songSrc) => {
    if (soundPlayed) {
      soundPlayed.stop();
    }
    let sound = new Howl({
      src: [songSrc],
      html5: true,
    });
    
    setSoundPlayed(sound);
    sound.play();
    setIsPaused(false);
  };

  const pauseSound = () => {
    soundPlayed.pause();
  };

  const togglePlayPause = () => {
    if (isPaused) {
      playSound();
      setIsPaused(false);
    } else {
      pauseSound();
      setIsPaused(true);
    }
  };

  return (
    <div className="w-full h-full bg-black flex flex-col">
      {createPlaylistModalOpen && (
        <CreatePlaylistModal
          closeModal={() => {
            setCreatePlaylistModalOpen(false);
          }}
        />
      )}
      {addToPlaylistModalOpen && (
        <AddToPlaylistModal
          closeModal={() => {
            setAddToPlaylistModalOpen(false);
          }}
          addSongToPlaylist={addSongToPlaylist}
        />
      )}
      <div
        className={` ${
          currentSong ? "h-[90%] " : "h-full"
        }  w-full flex gap-3`}>
        <Toaster position="top-center" />
        <Sidebar activeScreen={curActiveScreen} setCreatePlaylistModalOpen={setCreatePlaylistModalOpen} />

        {/* This second div will be the right part(main content) */}
        <div className="h-full w-4/5 bg-app-black overflow-auto  rounded-l-lg">
          <Navbar />

          <div className="content p-8 pt-0 overflow-auto bg-gradient-to-b from-[#1f1f1f] to-[#121212] rounded-lg">
            {children} {/*🌟🌟🌟🌟🌟*/}
            {/* This is how we create a tempelate 
                      All the content will be inside this children
                  */}
          </div>
        </div>
      </div>

      {/* music player */}
      {currentSong && (
        <div className="w-full h-[10%] bg-black bg-opacity-30 text-white flex items-center px-4">
          <div className="w-1/4 flex items-center pl-3">
            {/* {console.log(currentSong)} */}
            <img
              src={currentSong.thumbnail}
              alt="currentSongThumbail"
              className="h-11 w-11 rounded bg-cover bg-center"
            />
            <div className="pl-4">
              <div className="text-sm hover:underline cursor-pointer">
                {currentSong.name}
              </div>
              <div className="text-xs text-[#b3b3b3] hover:underline cursor-pointer">
                {currentSong.artist.firstName +
                  " " +
                  currentSong.artist.lastName}
              </div>
            </div>
          </div>
          <div className="w-1/2 flex justify-center h-full flex-col items-center">
            <div className="flex w-1/3 justify-between items-center gap-6">
              {/* controls for the playing song go here */}
              <Icon
                icon="ph:shuffle-fill"
                fontSize={30}
                className="cursor-pointer text-[#b3b3b3] hover:text-white"
              />
              <Icon
                icon="streamline:button-previous-solid"
                fontSize={20}
                className="cursor-pointer text-[#b3b3b3] hover:text-white"
              />
              <Icon
                icon={
                  isPaused
                    ? "ic:baseline-play-circle"
                    : "ic:baseline-pause-circle"
                }
                fontSize={50}
                className="cursor-pointer text-[#b3b3b3] hover:text-white"
                onClick={togglePlayPause}
              />
              <Icon
                icon="streamline:button-next-solid"
                fontSize={20}
                className="cursor-pointer text-[#b3b3b3] hover:text-white"
              />
              <Icon
                icon="simple-line-icons:loop"
                fontSize={20}
                className="cursor-pointer text-[#b3b3b3] hover:text-white"
              />
            </div>
            {/* <div>Progress Bar Here</div> */}
          </div>
          <div className="w-1/4 flex justify-end pr-4 space-x-4 items-center">
            <Icon
              icon="ic:round-playlist-add"
              fontSize={30}
              className="cursor-pointer text-[#b3b3b3] hover:text-white"
              onClick={() => {
                setAddToPlaylistModalOpen(true);
              }}
            />
            {
              isLiked ? 
              <Icon
              icon="tabler:heart-filled"
              fontSize={30}
              className="cursor-pointer text-[#b3b3b3] hover:text-white"
              onClick={unlikeSong}
            />
            :
            <Icon
              icon="tabler:heart"
              fontSize={30}
              className="cursor-pointer text-[#b3b3b3] hover:text-white"
              onClick={likeSong}

            />
            }
          </div>
        </div>
      )}
    </div>
  );
};

export default Template;

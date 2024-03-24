import React, { useContext, useState } from 'react'
import IconText from '../components/IconText'
import { Icon } from '@iconify/react'
import TextWithHover from '../components/TextWithHover'
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
// import { Toaster, toast } from 'sonner';
import toast, { Toaster } from 'react-hot-toast';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import songContext from '../context/songContext';
import {Howl, Howler} from 'howler'; 
import Template from '../components/Template';

const currentSong = [
        {
            thumbnail : "https://res.cloudinary.com/djodcayme/image/upload/v1707413069/dzxbbftp55fhwixoddjt.jpg",
            name : "Song 1",
            songUrl : "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
            artist : {
                firstName : "Artist",
                lastName : "1"
            }
        }
    ]

const focusCardsData = [
    {
        title: "Peaceful Piano",
        description: "Relax and indulge with beautiful piano pieces",
        imgUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1546&q=80",
    },
    {
        title: "Deep Focus",
        description: "Keep calm and focus with this music",
        imgUrl: "https://images.unsplash.com/photo-1558021212-51b6ecfa0db9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1766&q=80",
    },
    {
        title: "Instrumental Study",
        description: "Focus with soft study music in the background.",
        imgUrl: "https://images.unsplash.com/photo-1612225330812-01a9c6b355ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
    },
    {
        title: "Focus Flow",
        description: "Up tempo instrumental hip hop beats",
        imgUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    },
    {
        title: "Beats to think to",
        description: "Focus with deep techno and tech house",
        imgUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    },
];

const spotifyPlaylistsCardData = [
    {
        title: "This is one",
        description: "Relax and indulge with beautiful piano pieces",
        imgUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1546&q=80",
    },
    {
        title: "Deep Focus",
        description: "Keep calm and focus with this music",
        imgUrl: "https://images.unsplash.com/photo-1558021212-51b6ecfa0db9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1766&q=80",
    },
    {
        title: "Instrumental Study",
        description: "Focus with soft study music in the background.",
        imgUrl: "https://images.unsplash.com/photo-1612225330812-01a9c6b355ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
    },
    {
        title: "Focus Flow",
        description: "Up tempo instrumental hip hop beats",
        imgUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    },
    {
        title: "Beats to think to",
        description: "Focus with deep techno and tech house",
        imgUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    },
];

const LoggedInHomeCompenent = ()  => {

    const navigate = useNavigate();

    const {
        // currentSong,
        setCurrentSong,
        soundPlayed,
        setSoundPlayed,
        isPaused,
        setIsPaused,
    } = useContext(songContext);

    const [cookies, setCookie] = useCookies(['token']); 
    // console.log(cookies.token);

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

//   return (
//     <div className='w-full h-full bg-black flex flex-col'>
//         <div className='h-[90%] w-full flex gap-3'> 
//             <Toaster position='top-center' />
//             <Sidebar/>

//             {/* This second div will be the right part(main content) */}
//             <div className='h-full w-4/5 bg-app-black overflow-auto  rounded-l-lg'>
//                 <Navbar/>

//                 <div className="content p-8 pt-0 overflow-auto bg-gradient-to-b from-[#1f1f1f] to-[#121212] rounded-t-lg">
//                     <PlaylistView
//                         titleText="Focus"
//                         cardsData={focusCardsData}
//                     />
//                     <PlaylistView
//                         titleText="Spotify Playlists"
//                         cardsData={spotifyPlaylistsCardData}
//                     />
//                     <PlaylistView
//                         titleText="Sound of India"
//                         cardsData={focusCardsData}
//                     />
//                 </div>
//             </div>
//         </div>
        
//         {/* music player at the bottom */}
//         <div className="w-full h-[10%] bg-black bg-opacity-30 text-white flex items-center px-4">
//                     <div className="w-1/4 flex items-center pl-3">
//                         {/* {console.log(currentSong)} */}
//                         <img
//                             src={currentSong[0].thumbnail}
//                             alt="currentSongThumbail"
//                             className="h-11 w-11 rounded bg-cover bg-center"
//                         />
//                         <div className="pl-4">
//                             <div className="text-sm hover:underline cursor-pointer">
//                                 {currentSong[0].name}
//                             </div>
//                             <div className="text-xs text-[#b3b3b3] hover:underline cursor-pointer">
//                                 {currentSong[0].artist.firstName +
//                                     " " +
//                                     currentSong[0].artist.lastName}
//                             </div>
//                         </div>
//                     </div>
//                     <div className="w-1/2 flex justify-center h-full flex-col items-center">
//                         <div className="flex w-1/3 justify-between items-center gap-6">
//                             {/* controls for the playing song go here */}
//                             <Icon
//                                 icon="ph:shuffle-fill"
//                                 fontSize={30}
//                                 className="cursor-pointer text-[#b3b3b3] hover:text-white"
//                             />
//                             <Icon
//                                 icon="streamline:button-previous-solid"
//                                 fontSize={20}
//                                 className="cursor-pointer text-[#b3b3b3] hover:text-white"
//                             />
//                             <Icon
//                                 icon={
//                                     isPaused
//                                         ? "ic:baseline-play-circle"
//                                         : "ic:baseline-pause-circle"
//                                 }
//                                 fontSize={50}
//                                 className="cursor-pointer text-[#b3b3b3] hover:text-white"
//                                 onClick={togglePlayPause}
//                             />
//                             <Icon
//                                 icon="streamline:button-next-solid"
//                                 fontSize={20}
//                                 className="cursor-pointer text-[#b3b3b3] hover:text-white"
//                             />
//                             <Icon
//                                 icon="simple-line-icons:loop"
//                                 fontSize={20}
//                                 className="cursor-pointer text-[#b3b3b3] hover:text-white"
//                             />
//                         </div>
//                         {/* <div>Progress Bar Here</div> */}
//                     </div>
//                     <div className="w-1/4 flex justify-end pr-4 space-x-4 items-center">
//                         <Icon
//                             icon="ic:round-playlist-add"
//                             fontSize={30}
//                             className="cursor-pointer text-[#b3b3b3] hover:text-white"
//                             onClick={() => {
//                                 // setAddToPlaylistModalOpen(true);
//                             }}
//                         />
//                         <Icon
//                             icon="formkit:heart"
//                             fontSize={25}
//                             className="cursor-pointer text-[#b3b3b3] hover:text-white"
//                         />
//                     </div>
//         </div>
//     </div>


//   )

return(
    <Template curActiveScreen={"home"}>
        <PlaylistView
            titleText="Focus"
            cardsData={focusCardsData}
        />
        <PlaylistView
            titleText="Spotify Playlists"
            cardsData={spotifyPlaylistsCardData}
        />
        <PlaylistView
            titleText="Sound of India"
            cardsData={focusCardsData}
        />
    </Template>
)
}

const PlaylistView = ({titleText, cardsData}) => {
    return (
        <div className="text-white mt-8">
            <div className="text-2xl font-semibold mb-5">{titleText}</div>
            <div className="w-full flex justify-between space-x-4">
                {
                    // cardsData will be an array
                    cardsData.map((item , index) => {
                        return (
                            <Card
                                key={index}
                                title={item.title}
                                description={item.description}
                                imgUrl={item.imgUrl}
                            />
                        );
                    })
                }
            </div>
        </div>
    );
};

const Card = ({title, description, imgUrl}) => {
    return (
        <div className=" cursor-pointer group bg-black bg-opacity-40 w-1/5 p-4 rounded-lg transition-all duration-200 hover:bg-[#272727]">
            <div className="pb-4 pt-2 relative ">
                <img className=" w-full  rounded-md shadow-lg shadow-black" src={imgUrl} alt="label" />
                <div className=' absolute rounded-full bg-[#1fdf64] w-11 h-11 bottom-4 right-1 translate-y-[1px] opacity-0 group-hover:opacity-100 group-hover:-translate-y-[5px] transition-all duration-300'>
                    <img src="https://cdn-icons-png.flaticon.com/512/8669/8669570.png" alt="play" className=' w-5 h-5 ml-[14px] mt-3'/>
                </div>
            </div>
            <div className="text-white font-semibold py-3">{title}</div>
            <div className="text-[#b3b3b3] text-sm ">{description}</div>
        </div>
    );
};

export default LoggedInHomeCompenent
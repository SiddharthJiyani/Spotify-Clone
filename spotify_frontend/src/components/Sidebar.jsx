import React from 'react'
import IconText from '../components/IconText'
import { Icon } from '@iconify/react'
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import toast from 'react-hot-toast';
import { makeAuthenticatedGETRequest } from '../utils/serverHelpers';

const Sidebar = ({activeScreen, setCreatePlaylistModalOpen}) => {
    const [cookie, setCookie] = useCookies(["token"]);
    const navigate = useNavigate();

    const restrictAccess = () =>  {
        toast.error('Please login to access this feature', {
            duration : 2000,
            style: {
            fontWeight: 'bold',
            font : 'white',
            },
        });
    }




  return (
    <div className="h-full w-1/5 bg-[#121212] flex flex-col justify-between pb-10 rounded-r-lg ">
                <div>
                    {/* This div is for logo */}
                    <div className="logoDiv p-6 cursor-pointer">
                        <Link to="/">
                            <img
                                src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_White.png"
                                alt="spotify logo"
                                width={125}
                            />
                        </Link>
                    </div>
                    <div className="py-5">
                        <IconText
                            iconName={"material-symbols:home-rounded"}
                            displayText={"Home"}
                            active = {activeScreen === "home"}
                            targetLink={"/home"}
                        />
                        <IconText
                            iconName={"material-symbols:search-rounded"}
                            displayText={"Search"}
                            active = {activeScreen === "search"}
                            targetLink={"/search"}
                        />

                        
                        {   cookie.token ?
                            <IconText
                            iconName={"icomoon-free:books"}
                            displayText={"Library"}
                            active = {activeScreen === "library"}
                            targetLink={"/library"}
                            />

                            :

                            <IconText
                            iconName={"icomoon-free:books"}
                            displayText={"Library"}
                            onClick={restrictAccess}
                        />

                        }
                        
                        { cookie.token ? 
                            <IconText
                                iconName={"material-symbols:library-music-rounded"}
                                displayText={"My Music"}
                                targetLink={"/mymusic"}
                                active={activeScreen === "mymusic"}
                            />
                                :
                            <IconText
                                iconName={"material-symbols:library-music-rounded"}
                                displayText={"My Music"}
                                onClick= {restrictAccess}
                            />
                        }

                    </div>
                    <div className="pt-5">
                        <IconText
                            iconName={"material-symbols:add-box"}
                            displayText={"Create Playlist"}
                            onClick={() => {
                                setCreatePlaylistModalOpen(true);
                            }}
                        />
                        <IconText
                            iconName={"mdi:cards-heart"}
                            displayText={"Liked Songs"}
                            targetLink={"/likedSongs"}
                        />
                    </div>
                </div>
                <div className="px-5">
                    <div className="border-[0.5px] border-gray-100 text-white w-2/5 flex px-2 py-1 rounded-full items-center justify-center hover:border-white cursor-pointer hover:scale-[1.05] hover:border-[1px] transition-all duration-100">
                        <Icon icon="carbon:earth-europe-africa" />
                        <div className="ml-2 text-sm font-semibold">
                            English
                        </div>
                    </div>
                </div>
        </div>
  )
}

export default Sidebar
import React from 'react'
import IconText from '../components/IconText'
import { Icon } from '@iconify/react'
import TextWithHover from '../components/TextWithHover'
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
// import { Toaster, toast } from 'sonner';
import toast, { Toaster } from 'react-hot-toast';
import Sidebar from '../components/Sidebar';


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

const Home = ()  => {

    const navigate = useNavigate();

    // const logout = () => {
    //     toast.success('Logged out successfully',{
    //         duration: 1000,
    //     });
    //     setTimeout( () => {
    //         setCookie('token','', { path: '/' }); // remove the token and go to login page
    //         // window.location.reload(); // refresh the page
    //         navigate("/login")
    //     } , 1000)
    // }

    const logout = async () => {
        toast.success('Logged out successfully', {
            duration: 1000,
        });
    
        // Wrap setTimeout in a promise to use with async/await
        const delay = ms => new Promise(res => setTimeout(res, ms));
    
        // await delay(1000);
    
        // Clear the token
        setCookie('token', '', { path: '/' });
    
        // Clear session storage and local storage
        sessionStorage.clear();
        localStorage.clear();
    
        // Navigate to login page
        navigate("/login");
    }

    function yeloToast  () {
        toast.success('Signed in successfully', {
            style: {
              border: '1px solid #713200',
              padding: '16px',
              fontWeight: 'bold',
              color: '#713200',
            },
          });
    }

    const [cookies, setCookie] = useCookies(['token']); 
    // console.log(cookies.token);

  return (
    <div className='w-full h-full bg-black flex gap-3'>
        <Toaster position='top-center' />
        <Sidebar/>

        {/* This second div will be the right part(main content) */}
        <div className='h-full w-4/5 bg-app-black overflow-auto  rounded-l-lg'>
                <div className="navbar w-full h-[10%] bg-[#101010] flex items-center justify-end mb-4 rounded-b-lg">
                    <div className="w-1/2 flex h-full">
                        <div className="w-3/5 flex justify-around items-center ">
                            
                            <TextWithHover displayText={"Premium"} />
                            <TextWithHover displayText={"Support"} />
                            <TextWithHover displayText={"Download"} />
                            <div className="h-1/2 border-r border-white"></div>
                        </div>
                        <div className="w-2/5 flex justify-around h-full items-center">
                            <Link to="/signup">
                                <TextWithHover displayText={"Sign up"} properties={"hover:scale-[1.08]"} />
                            </Link>
                            <Link to="/login" className="bg-white h-2/3 px-8 flex items-center justify-center rounded-full font-semibold cursor-pointer hover:scale-[1.05] transition-all duration-150">
                                {/* Log in */}
                                {
                                    cookies.token ? 
                                    <span onClick={(e)=>{
                                        e.preventDefault();
                                        logout();
                                    }}>
                                        Log Out
                                    </span>
                                    : "Log In"
                                }
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="content p-8 pt-0 overflow-auto bg-gradient-to-b from-[#1f1f1f] to-[#121212] rounded-t-lg">
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
                </div>
        </div>

    </div>

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
            <div className="text-gray-500 text-sm ">{description}</div>
        </div>
    );
};

export default Home
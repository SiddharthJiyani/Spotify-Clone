import {useContext, useState} from "react";
import songContext from "../context/songContext";

const SingleSongCard = ({info, playSound}) => {
    const {currentSong, setCurrentSong} = useContext(songContext);
    // console.log(info);
    const [playSong, setPlaySong] = useState(false);
    // console.log(info); 
    
    return (
        <div
            className="flex hover:bg-[#2a2a2a] p-2 rounded-[5px] group justify-start items-center"
            onClick={() => {
                setCurrentSong(info);
                // setPlaySong(!playSong);
                playSound(info?.track);
                // if(playSong){
                //     pauseSound();
                //     setPlaySong(!playSong); 
                // }
                
            }}
        >
            <div
                className="w-12 h-12 bg-cover bg-center group-hover:opacity-[60%]" // ^bg-cover bg-center is used to make the image fit the div
                style={{
                    borderRadius: "3px",
                    backgroundImage: `url("${info?.thumbnail}")`,
                    
                }}
            >
                <div className=" text-white m-3 group-hover:opacity-[100%] opacity-0 ">
                    <img   src="https://cdn-icons-png.freepik.com/512/9974/9974136.png?ga=GA1.1.627870064.1704298417&"/>
                </div>
            </div>
            <div className="flex w-full">
                <div className="text-white flex justify-center  flex-col pl-4 w-5/6">
                    <div className="cursor-pointer hover:underline">
                        {info.name}
                    </div>
                    <div className="text-xs text-[#a7a7a7] cursor-pointer hover:underline group-hover:text-white">
                        {   
                            info?.artist?.firstName + " " + info?.artist?.lastName 
                        }
                    </div>
                </div>
                <div className="w-1/6 flex items-center justify-center text-gray-400 text-sm">
                    <div>3:44</div>
                </div>
            </div>
        </div>
    );
};

export default SingleSongCard;

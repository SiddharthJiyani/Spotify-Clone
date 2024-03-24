import {useState, useEffect} from "react";
import {makeAuthenticatedGETRequest} from "../utils/serverHelpers";

const AddToPlaylistModal = ({closeModal, addSongToPlaylist}) => {
    const [myPlaylists, setMyPlaylists] = useState([]);
    useEffect(() => {
        const getData = async () => {
            const response = await makeAuthenticatedGETRequest(
                "/playlist/get/MyPlaylist"
            );
            setMyPlaylists(response.data);
        };
        getData();
    }, []);

    return (
        <div
            className="absolute bg-black w-screen h-screen bg-opacity-50 flex justify-center items-center"
            onClick={closeModal}
        >
            <div
                className="bg-gradient-to-b from-[#1f1f1f] to-[#121212] w-1/3 rounded-md p-8"
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <div className="text-white mb-5 font-semibold text-lg">
                    Select Playlist
                </div>
                <div className="space-y-4 flex flex-col justify-center items-center">
                    {console.log(myPlaylists.length)}
                    {myPlaylists.length != 0?  
                    myPlaylists.map((item,index) => {
                        return (
                            <PlaylistListComponent
                                key={index}
                                info={item}
                                addSongToPlaylist={addSongToPlaylist}
                            />
                        );
                    })
                    :
                    <div className="text-white">No Playlists Found</div>
                    }
                </div>
            </div>
        </div>
    );
};

const PlaylistListComponent = ({info, addSongToPlaylist}) => {
    return (
        <div className="bg-black w-full flex items-center space-x-4 hover:bg-[#505050] hover:bg-opacity-20 cursor-pointer p-3" onClick={()=>{
            addSongToPlaylist(info._id)
        }}>
            <div>
                <img
                    src={info?.thumbnail}
                    className="w-10 h-10 rounded"
                    alt="thumbnail"
                />
            </div>
            <div className="text-white font-semibold text-sm">{info?.name}</div>
        </div>
    );
};

export default AddToPlaylistModal;

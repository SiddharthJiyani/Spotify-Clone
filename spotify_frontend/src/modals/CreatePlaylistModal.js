import {useState} from "react";
import {makeAuthenticatedPOSTRequest} from "../utils/serverHelpers";
import TextInput from "../components/TextInput";
import toast from "react-hot-toast";

const CreatePlaylistModal = ({closeModal}) => {
    const [playlistName, setPlaylistName] = useState("");
    const [playlistThumbnail, setPlaylistThumbnail] = useState("");

    const createPlaylist = async () => {
        const response = await makeAuthenticatedPOSTRequest(
            "/playlist/create",
            {name: playlistName, thumbnail: playlistThumbnail, songs: []}
        );
        if (response._id) {
            closeModal();
        }
    };

    return (
        <div
            className="absolute bg-black w-screen h-screen bg-opacity-50 flex justify-center items-center z-50"
            onClick={closeModal}
        >
            <div
                className="w-1/3 rounded-md p-8 bg-[#121212]"
                onClick={(e) => {
                    e.stopPropagation(); // ! This will stop the event from bubbling up to the parent
                }}
            >
                <div className="text-white mb-5 font-semibold text-lg">
                    Create Playlist
                </div>
                <div className="space-y-4 flex flex-col justify-center items-center">
                    <TextInput
                        label="Name"
                        labelCSS={"text-white"}
                        inputCSS={"text-white"}
                        placeholder="Playlist Name"
                        value={playlistName}
                        setValue={setPlaylistName}
                    />
                    <TextInput
                        label="Thumbnail"
                        labelCSS={"text-white"}
                        inputCSS={"text-white"}
                        placeholder="Thumbnail"
                        value={playlistThumbnail}
                        setValue={setPlaylistThumbnail}
                    />
                    <div
                        className="bg-white w-1/3 rounded flex font-semibold justify-center items-center py-3 mt-4 cursor-pointer"
                        onClick={ () => {
                            createPlaylist();
                            toast.success('Playlist created Successfully', {
                                duration: 1000,
                                style: {
                                fontWeight: 'bold',
                                font : 'white',
                                },
                            });
                            closeModal();
                        }}
                    >
                        Create
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatePlaylistModal;

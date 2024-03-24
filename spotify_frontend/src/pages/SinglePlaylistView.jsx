import React, { useEffect, useState } from 'react'
import Template from '../components/Template'
import { useParams } from 'react-router-dom'
import { makeAuthenticatedGETRequest } from '../utils/serverHelpers';
import SingleSongCard from '../components/SingleSongCard';

const SinglePlaylistView = () => {
    const {playlistId} = useParams();  // useParams is a hook to get the parameters from the url
    const [playlistData, setPlaylistData] = useState({});
    const [songDetails , setSongDetails] = useState([]);
    // console.log(playlistId);

    useEffect( () =>{
        const getData = async () => {
            const response = await makeAuthenticatedGETRequest(
                "/playlist/get/playlist/" + playlistId
            )
            console.log(response);
            setSongDetails(response.data.songs);
        }
        getData();
    },[])

  return (

    <Template curActiveScreen={"library"}>
        {   playlistId && 
            (
                <div>
                    <h1 className='text-3xl font-semibold text-white mt-3'>
                        {playlistData.name}
                    </h1>

                    <div className="pt-10 space-y-3">
                    {songDetails.map((item) => {
                        return (
                            <SingleSongCard
                                info={item}
                                key={JSON.stringify(item)}
                                playSouns={() => {}}
                            />
                        );
                    })}
        </div>

                </div>
                
                
            )

        }
        
        
    </Template>
  )
}

export default SinglePlaylistView
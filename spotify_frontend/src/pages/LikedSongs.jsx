import React, { useEffect, useState } from 'react'
import Template from '../components/Template'
import { makeAuthenticatedGETRequest } from '../utils/serverHelpers';
import SingleSongCard from '../components/SingleSongCard';

const LikedSongs = () => {
    const [songData, setSongData] = useState([]);
    useEffect( () => {
        const getData = async () => {
            const response = await makeAuthenticatedGETRequest("/song/get/likedSongs");
            console.log(response.data);
            setSongData(response.data);
        }
        getData() ;
    },[])
  return (
    <Template>
        
        <div className="text-white text-xl font-semibold pb-4 pl-2 pt-8">
            Liked Songs
        </div>
        <div className="space-y-3 overflow-auto">
            {songData.map((item,index) => {
                return <SingleSongCard info={item} key={index} playSound={() => {}}  />;
            })}
        </div>

    </Template>
  )
}

export default LikedSongs
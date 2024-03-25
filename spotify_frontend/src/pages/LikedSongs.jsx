import React, { useEffect, useState } from 'react'
import Template from '../components/Template'
import { makeAuthenticatedGETRequest } from '../utils/serverHelpers';
import SingleSongCard from '../components/SingleSongCard';
import toast from 'react-hot-toast';

const LikedSongs = () => {
    const [songData, setSongData] = useState([]);
    useEffect( () => {
        toast.loading('Please wait...')
        const getData = async () => {
            const response = await makeAuthenticatedGETRequest("/song/get/likedSongs");
            // console.log(response.data);
            setSongData(response.data);
            toast.dismiss();
            if(response.data.length === 0){
                // toast.dismiss();
                toast.error('No Liked Songs',{
                    duration: 1000
                });
            }
        }
        getData() ;
    },[])
  return (
    <Template>
        
        <div className="text-white text-xl font-semibold pb-4 pl-2 pt-8">
            Liked Songs
        </div>
        
        {
            songData.length > 0 ? (
                <div className="space-y-3 overflow-auto">
                    {songData.map((item,index) => {
                        return <SingleSongCard info={item} key={index} playSound={() => {}}  />;
                    })}
                </div>
            ) : (
                <div className="text-gray-500 text-xl font-semibold pb-4 pl-2 pt-8">
                    No Liked Songs
                </div>
            )

        }

    </Template>
  )
}

export default LikedSongs
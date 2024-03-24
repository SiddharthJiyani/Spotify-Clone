import React, { useEffect, useState } from 'react'
import Template from './Template'
import { makeAuthenticatedGETRequest } from '../utils/serverHelpers'
import { Navigate, useNavigate } from 'react-router-dom';

const Library = () => {

    const [playlists, setPlaylists] = useState([]);
    useEffect ( () => {
        const getData = async () => {
            const response = await makeAuthenticatedGETRequest('/playlist/get/MyPlaylist');
            console.log(response);
            setPlaylists(response.data);
        }
        getData();
    },[])

  return (
    <Template curActiveScreen={"library"}>
        <h1 className='text-3xl font-semibold text-white mt-3'>
            My Playlists
        </h1>

        <div className='py-5 flex gap-4 cursor-pointer'>
            {  
                playlists.map((item,index) =>{
                    return(
                        <Card
                            key={index}
                            title={item.name}
                            playlistId={item._id}
                            description={item.songs.length + " songs"}
                            imgUrl={item.thumbnail}
                        />
                    )
                } )
            }
        </div>

    </Template>
  )
}

const Card = ({title, description, imgUrl,playlistId}) => {
    const navigate = useNavigate();
    return (
        <div className=" cursor-pointer group bg-black bg-opacity-40 w-1/5 p-4 rounded-lg transition-all duration-200 hover:bg-[#272727]"
            onClick={ () => {navigate("/playlist/" + playlistId)}}
        >
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

export default Library
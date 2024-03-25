import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import toast, { Toaster } from 'react-hot-toast';
import { makeAuthenticatedGETRequest, makeAuthenticatedPOSTRequest } from '../utils/serverHelpers';
import Template from '../components/Template';
import SingleSongCard from '../components/SingleSongCard';
import {Howl, Howler} from 'howler'; 


const MyMusic = ()  => {

    // const songData = [
    //     {
    //         thumbnail : "https://res.cloudinary.com/djodcayme/image/upload/v1707413069/dzxbbftp55fhwixoddjt.jpg",
    //         name : "Song 1",
    //         songUrl : "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    //         artist : "Artist 1"
    //     }
    // ]

    const navigate = useNavigate();
    const [songData, setSongData] = useState([]);
    const [cookies, setCookie] = useCookies(['token']); 
    const [playSong, setPlaySong] = useState(false);
    const [sound, setSound] = useState(null);
    const [currentSong, setCurrentSong] = useState(null);



    useEffect( () => {

        const getData = async () => {
            toast.loading('Please wait...')
            const response = await makeAuthenticatedGETRequest("/song/get/mysongs");
            // console.log(response.data);
            setSongData(response.data);
            toast.dismiss();
            if(response.data.length === 0){
                // toast.dismiss();
                toast.error('No Songs Uploaded',{
                    duration: 1500
                });
            }
        }
        getData() ;

    } , [])



  return (
 

    <Template curActiveScreen={"mymusic"}>
        <div className="text-white text-xl font-semibold pb-4 pl-2 pt-8">
            My Songs
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
                    No Songs Uploaded
                </div>
            )
        }
    </Template>

  )
}


export default MyMusic
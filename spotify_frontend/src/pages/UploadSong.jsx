import React, { useState } from 'react'
import IconText from '../components/IconText'
import { Icon } from '@iconify/react'
import TextWithHover from '../components/TextWithHover'
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
// import { Toaster, toast } from 'sonner';
import toast, { Toaster } from 'react-hot-toast';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import TextInput from '../components/TextInput';
import CloudinaryUpload from '../components/CloudinaryUpload';
import { makeAuthenticatedPOSTRequest } from '../utils/serverHelpers';
import Template from '../components/Template';


const UploadSong = ()  => {

    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [SongUrl , setSongUrl] = useState("");  
    const [uploadedSongFileName , setUploadedSongFileName] = useState("");

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
    // console.log(window) ;
    // console.log(window.location.href) ;
    // console.log(window.cloudinary);

    const SubmitSong = async ()  => {
        console.log("SubmitSong function called");
        // console.log(name);
        // console.log(thumbnail);
        // console.log(SongUrl);
        try{
            const data = { name , thumbnail ,track : SongUrl  }
            // console.log(data)

            const response = await makeAuthenticatedPOSTRequest("/song/createSong" , data);
            console.log(response);

            response.success ? toast.success('Song uploaded successfully', {
                duration: 2200,
            style: {
                fontWeight: 'bold',
            },
            }) : toast.error(`${response.message}`,{
                duration: 2200, 
            style: {
                fontWeight: 'bold',
            }})
            
            if(response.success){
                setTimeout( () => {
                    navigate("/home");
                }, 2200)
            }
        }

        catch(e){
            console.log(e);
            toast.error(`${response.message}`,{
                duration: 2200,
            style: {
                fontWeight: 'bold',
            },
            })
        }

    }

  return (
    <Template>

        <div className='text-2xl font-semibold mb-5 text-white mt-8'>
                    Upload your music
        </div>

        <div className="w-2/3 flex space-x-3">
                        <div className="w-1/2">
                            <TextInput
                                label="Name"
                                labelCSS={"text-white"}
                                inputCSS={"bg-[#e8f0fe]"}
                                placeholder="Name"
                                value={name}
                                setValue={setName}
                            />
                        </div>
                        <div className="w-1/2">
                            <TextInput
                                label="Thumbnail"
                                labelCSS={"text-white"}
                                inputCSS={"bg-[#e8f0fe]"}
                                placeholder="Thumbnail"
                                value={thumbnail}
                                setValue={setThumbnail}
                            />
                        </div>
        </div>

        <div className='py-5 pl-3'>

                    { uploadedSongFileName ?

                    <div className='text-black text-md w-[44%] bg-white rounded-lg px-3 py-2'>
                        Uploaded Song : {uploadedSongFileName.substring(0, 30) + '....'}
                    </div>   : 
                    <CloudinaryUpload 
                        setUrl = {setSongUrl} 
                        setName={setUploadedSongFileName}
                    />
                    }
        </div>
        
        <div 
                    className='text-black mx-3 my-2 w-36 text-center font-semibold text-md bg-[#1ed760] rounded-full px-3 py-3 cursor-pointer '
                    onClick={ SubmitSong }
                >
                    Submit Song
        </div>

    </Template>

  )
}


export default UploadSong
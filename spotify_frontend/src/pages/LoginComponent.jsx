import React, { useEffect, useState } from 'react'
import { Icon } from '@iconify/react';
import  spotifyWhite from "../assets/logos/spotifyWhite.svg"
import TextInput from '../components/TextInput';
import PasswordInput from '../components/PasswordInput';
import { Link, useNavigate } from 'react-router-dom';
import { makeUnauthenticatedPOSTRequest } from '../utils/serverHelpers';
import { useCookies } from 'react-cookie';
import toast, { Toaster } from 'react-hot-toast';

const LoginComponent = () => {

    const [email,setEmail] = useState("") ;
    const [password,setPassword] = useState("") ;
    const [cookie,setCookie] = useCookies(["token"]) ;
    const [items,setItems] = useState({});
    const navigate = useNavigate();

    // storing data in local storage
    useEffect(() => {
        localStorage.setItem('items', JSON.stringify(items));
    },[items]);

    const login = async () => {
        toast.loading('Please wait...')
        const data =  { email , password } ;
        const response = await makeUnauthenticatedPOSTRequest("/auth/login" , data) ; 
        console.log(response.user);
        const firstName = response.user.firstName;
        const lastName = response.user.lastName;
        const aemail = response.user.email;
        const username = response.user.username;
        const data_to_store = {
            firstName,
            lastName,
            aemail,
            username
        }
        setItems(data_to_store);

        if( response && response.success != false){
            console.log("User Created");
            // console.log(response);
            const token = response.token;
            const date = new Date();
            date.setDate(date.getDate() + 1); 
            // to log out delete token -> console -> application -> token -> delete
            toast.dismiss();
            toast.success('Logged in successfully', {
                duration: 1000,
                style: {
                //   border: '1px solid #713200',
                //   padding: '16px',
                fontWeight: 'bold',
                //   color: '#713200',
                font : 'white',
                },
            });
            setTimeout(() =>{
                setCookie("token", token, { path: '/', expires: date});
                navigate("/home");
                window.location.reload();
            } , 1000);
        }
        else{
            toast.dismiss();
            toast.error(`${response.message}`, {
                style: {
                //   border: '1px solid #713200',
                //   padding: '16px',
                fontWeight: 'bold',
                //   color: '#713200',
                font : 'white',
                },
              });
        }
    }

  return (
    <div className='w-full h-full  flex flex-col items-center '> 
        <Toaster/>
        <div className=' h-[88px] w-full bg-black'>
            <a href='/'>
                <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_White.png"
                    width={190}  className=' pl-16 py-5 hover:cursor-pointer' alt="" 
                />
            </a>
        </div>
        <div className='bg-gradient-to-b from-neutral-800 to-zinc-900 h-full w-full flex justify-center items-center'>
            <div className=' w-[95%] md:w-[54%] h-[70%] md:h-[95%] bg-black  rounded-[8px] text-white'>
                <h1 className=' text-white text-center font-semibold text-[45px] my-12'
                >
                    Log in to Spotify 
                </h1>
                {/* <div> */}
                    <form className='flex flex-col items-center w-full gap-5'>
                        <TextInput 
                            placeholder="Email or username" 
                            label="Email or username" 
                            type="email"
                            value={email}
                            setValue={setEmail}
                        />
                        <PasswordInput 
                            placeholder="Password" 
                            label="Password" 
                            type="password"
                            value={password}
                            setValue={setPassword}
                        />
                        <button className='bg-[#1ed760] text-black font-bold w-[320px] h-[50px] rounded-full transition duration-75 hover:scale-105'
                            onClick={ (e) => {
                                // console.log("clicked")
                                e.preventDefault();
                                login();
                            }}
                        >
                            Log In
                        </button>
                    </form>
                {/* </div> */}
                <div className="w-2/3 h-[1.25px] bg-[#292929] m-8 ml-32"></div>
                <div className='flex justify-center items-center gap-2 mt-5 mb-12'>
                    <p className='text-[16px] text-[#a7a7a7] font-semibold'>Don't have an account? </p>
                    <Link to='/signup' className='text-[16px] hover:text-[#1ed760] font-medium underline'>Sign up for Spotify</Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default LoginComponent
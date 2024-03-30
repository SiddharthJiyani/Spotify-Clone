import React, { useEffect, useState } from 'react'
import { Icon } from '@iconify/react';
import  spotifyWhite from "../assets/logos/spotifyWhite.svg"
import TextInput from '../components/TextInput';
import PasswordInput from '../components/PasswordInput';
import { Link, useNavigate } from 'react-router-dom';
import { makeUnauthenticatedPOSTRequest } from '../utils/serverHelpers';
import { useCookies } from 'react-cookie';
import toast, { Toaster } from 'react-hot-toast';

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username , setUsername] = useState("");
    const [firstName , setFirstname] = useState("");
    const [lastName , setLastname] = useState("");
    const [cookie,setCookie] = useCookies(["token"]);
    const navigate = useNavigate();

    
    function yeloToast  () {
        toast.success('Logged in successfully', {
            style: {
            //   border: '1px solid #713200',
            //   padding: '16px',
              fontWeight: 'bold',
            //   color: '#713200',
            font : 'white',
            },
          });
    }


    const signup = async () =>{
        toast.loading('Please wait...')
        const data = {email , password , username , firstName , lastName};
        const response = await makeUnauthenticatedPOSTRequest("/auth/register", data);

        // console.log(response);
        if( response && response.success !== false){
            console.log("User Created");
            // console.log(response);
            const token = response.newUser.token;
            const date = new Date();
            date.setDate(date.getDate() + 1); // 30 seconds -> 1/48
            // to log out delete token -> console -> application -> token -> delete
            toast.dismiss();
            toast.success('Signed up successfully', {
                duration: 1000,
                style: {
                //   border: '1px solid #713200',
                //   padding: '16px',
                fontWeight: 'bold',
                //   color: '#713200',
                font : 'white',
                },
            });
            navigate("/login");
            setTimeout( () => {
                // setCookie("token", token, { path: '/', expires: date});
            },1000)
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
            // alert("Error");
        }
    }

  return (
    <div className='w-full h-full  flex flex-col items-center overflow-x-hidden'>
        <Toaster/>
        <div className=' h-[100px] w-full bg-black'>
            <a href='/'>
                <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_White.png"
                    width={190}  className=' pl-16 py-5 hover:cursor-pointer' alt="" 
                />
            </a>
        </div>

        <div className='bg-gradient-to-b from-neutral-800 to-zinc-900  w-full flex justify-center items-center pt-3'>
            <div className=' w-[95%] md:w-[54%] h-[98%] bg-black  rounded-[8px] text-white'>
                <h1 className=' text-white text-center font-semibold text-[45px] my-12'>
                    Sign Up for start listening
                </h1>
                {/* <div> */}
                    <form className='flex flex-col items-center w-full gap-5'>
                        <TextInput 
                            label="Email" 
                            placeholder="Enter your Email address" 
                            type="email"
                            value={email}
                            setValue={setEmail}
                        />
                        <PasswordInput 
                            placeholder="Enter a strong password" 
                            label="Create Password" 
                            type="password"
                            value={password}
                            setValue={setPassword}
                        />
                        <TextInput 
                            placeholder="What should we call you?" 
                            label="Username" 
                            type="text"
                            value={username}
                            setValue={setUsername}
                        />
                        <TextInput 
                            placeholder="Firstname" 
                            label="Firstname" 
                            type="text"
                            value={firstName}
                            setValue={setFirstname}
                        />
                        <TextInput 
                            placeholder="Lastname" 
                            label="Lastname" 
                            type="text"
                            value={lastName}
                            setValue={setLastname}
                        />

                        <button 
                            className='bg-[#1ed760] text-black font-bold w-[320px] h-[50px] rounded-full transition duration-75 hover:scale-105'
                            onClick={(e) => {
                                e.preventDefault();
                                signup();
                            }}
                        >
                            Sign Up
                        </button>
                    </form>
                {/* </div> */}
                <div className="w-2/3 h-[1.25px] bg-[#292929] m-8 ml-32"></div>
                <div className='flex justify-center items-center gap-2 mt-5 mb-12'>
                    <p className='text-[16px] text-[#a7a7a7] font-semibold'>Already have an account? </p>
                    <Link to='/login' className='text-[16px] hover:text-[#1ed760] font-medium underline'>Log In to Spotify</Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SignUp
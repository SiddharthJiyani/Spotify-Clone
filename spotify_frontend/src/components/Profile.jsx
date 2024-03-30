import React, { useEffect, useState } from 'react'
import Template from './Template'
import { makeAuthenticatedGETRequest } from '../utils/serverHelpers'

const Profile = () => {
    const [profileData, setProfileData] = useState([]);

    // get data from local storage
    useEffect(() => {
        // const getData = async () => {
        //     const response = await makeAuthenticatedGETRequest('/auth/get/profile');
        //     console.log(response);
        //     setProfileData(response.data);
        // }
        // getData();
        const items = JSON.parse(localStorage.getItem('items'));
        // console.log("items : ",items);
        if (items) {
            setProfileData(items);
        }
    }, [])

    // console.log(profileData)
  return (
    <Template>
        <h1 className='text-3xl font-semibold text-white mt-3'>
            Your Profile
        </h1>
        <div className='text-white mt-5 text-xl'>
            <p>
                Name: <span className='text-[#1fdf64]'>
                    {profileData?.firstName + " " + profileData?.lastName}
                </span>
            </p>
            <p>
                Email: <span className='text-[#1fdf64]'>
                    {profileData?.aemail}
                </span>
            </p>
            <p>
                Username: <span className='text-[#1fdf64]'>{profileData?.username}</span>
            </p>
        </div>

    </Template>
  )
}

export default Profile
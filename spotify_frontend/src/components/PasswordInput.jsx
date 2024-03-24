import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";


const PasswordInput = ({placeholder , label, value , setValue}) => {

    const[showPassword, setShowPassword] = useState(false);

  return (
    <div className='flex flex-col relative'>
        {/* <div className=' text-base font-semibold mb-2'>{label}</div> */}
        <label className='flex flex-col text-base font-semibold mb-2 w-full' for={label}>{label}
            <input 
                id={label} 
                required={true} 
                type= {showPassword ? ("text") : ("password")}
                placeholder={placeholder} 
                className='bg-[#121212] p-3 mt-2 w-[320px] border-[#a7a7a7] border-[1.5px] rounded-[4px] placeholder-[#a7a7a7] hover:border-white transition-all duration-150'
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <span 
                className='absolute  ml-72 mt-[45px] cursor-pointer'
                onClick={() => setShowPassword((prev) => !prev)}>
                    {showPassword ? 

                    (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>) : 

                    (<AiOutlineEye fontSize={24} fill='#AFB2BF'/>)}
            </span>
        </label>
    </div>
  )
}

export default PasswordInput
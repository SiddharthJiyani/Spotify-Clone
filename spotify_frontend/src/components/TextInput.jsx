import React from 'react'

const TextInput = ({placeholder,type , label , value , setValue , labelCSS , inputCSS}) => {
  return (
    <div className='flex flex-col'>
        {/* <div className=' text-base font-semibold mb-2'>{label}</div> */}
        <label className={`text-base font-semibold mb-2  ${labelCSS}`} for={label}>{label}</label>
        <input 
            type={type} 
            id={label} required={true}
            placeholder={placeholder} 
            className={`bg-[#121212] p-3 w-[320px] border-[#a7a7a7] border-[1.5px] rounded-[4px] placeholder-[#a7a7a7] hover:border-white transition-all duration-150 ${inputCSS}` }
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
    </div>
  )
}

export default TextInput
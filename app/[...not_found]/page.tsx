import React from 'react'

const NotFoundPage = () => {
  return (
    <div className='w-full h-full max-h-[100vh] flex flex-col justify-start items-center overflow-hidden bg-green-200'>
        <div className='relative w-full h-full bg-black flex flex-col justify-center items-center'>
          <img src="https://i.pinimg.com/originals/50/2e/66/502e661291d89ca27d242295b71ea2ab.gif" alt="offline" className='w-full h-full object-cover'/>
          <p className='absolute text-2xl text-white text-center font-light'>404 PAGE NOT FOUND</p>
        </div>
    </div>
  )
}

export default NotFoundPage
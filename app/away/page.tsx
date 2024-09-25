import React from 'react'

const page = () => {
  return (
    <div className='w-full h-full max-h-[100vh] flex flex-col justify-start items-center overflow-hidden bg-green-200'>
        <div className='w-full h-full bg-black flex flex-col justify-center items-center'>
          <img src="https://cdn.dribbble.com/users/124259/screenshots/5274507/timer_transition.gif" alt="offline" className='w-[50vw] h-[50vh] object-cover'/>
          <p className='text-base text-white text-center font-light'>TAKING A BREAK  . ☕️ . , WE WILL BE BACK!</p>
        </div>
    </div>
  )
}

export default page
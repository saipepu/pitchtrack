import React from 'react'
import ProfileDropDownButton from './ProfileDropDownButton'

const Header = ({ user }: any) => {

  return (
    <div className='z-10 w-full md:max-w-[1000px] max-h-24 flex justify-between items-center px-4 md:px-2 p-2'>
      {/* LOGO */}
      <div className='flex justify-center items-center'>
        <p className='text-2xl font-semibold'>Pitchtrack</p>
      </div>

      {/* ACTION */}
      <div className='flex justify-center items-center'>
        <ProfileDropDownButton organizer={user} />
      </div>
    </div>
  )
}

export default Header
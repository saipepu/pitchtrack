import React from 'react'
import { Button } from '../ui/button'
import { LogOut } from 'lucide-react'

const Header = ({ user, setShowForm } : any) => {

  return (
    <div className='z-10 w-full md:max-w-[1000px] h-24 flex justify-between items-center px-4 md:px-2 p-2'>
      {/* LOGO */}
      <div className='flex justify-center items-center'>
        <p className='text-2xl font-semibold'>Pitchtrack</p>
      </div>

      {/* NAVIGATION */}
      <div className='hidden justify-center items-center gap-5 lg:flex'>
        <p className='text-lg'>About</p>
        <p className='text-lg'>Features</p>
      </div>

      {/* ACTION */}
      <div className='flex justify-center items-center'>
        {user ? (
          <div className='flex justify-center items-center'>
            <p className='text-lg'>{user?.name}</p>
            <Button
              className='px-4 py-2 hover:bg-red-500 text-white rounded-md ml-4 cursor-pointer whitespace-nowrap'
              onClick={() => {
                localStorage.removeItem('pitchtrack-token')
                localStorage.removeItem('pitchtrack-organizer')
                window.location.reload()
              }}
            >
              <LogOut size={18} className='stroke-red-400 hover:stroke-white' strokeWidth={4} />
            </Button>
          </div>
        ) : (
          <button className='px-4 py-2 bg-black text-white rounded-md cursor-pointer whitespace-nowrap'
            onClick={() => setShowForm("SignIn")}
          >Sign In</button>
        )}
      </div>
    </div>
  )
}

export default Header
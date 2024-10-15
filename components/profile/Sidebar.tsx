import React from 'react'
import { Button } from '../ui/button'

const Sidebar = ({ selectedTab, setSelectedTab } : any ) => {

  return (
    <div className='hidden md:flex min-w-[250px] p-3 max-h-full flex-col justify-start items-start gap-1'>
      <Button
        className={`${selectedTab == 'profile' && 'bg-slate-100'} w-full justify-start duration-300 hover:bg-slate-50`}
        onClick={() => setSelectedTab('profile')}
      >
        Profile Info
      </Button>
      <Button
        className={`${selectedTab == 'rooms' && 'bg-slate-100'} w-full justify-start duration-300 hover:bg-slate-50`}
        onClick={() => setSelectedTab('rooms')}
      >
        Rooms
      </Button>
      <Button
        className={`${selectedTab == 'connected-devices' && 'bg-slate-100'} w-full justify-start duration-300 hover:bg-slate-50`}
        onClick={() => setSelectedTab('connected-devices')}
      >
        Connected Devices
      </Button>
    </div>
  )
}

export default Sidebar
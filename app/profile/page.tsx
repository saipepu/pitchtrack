"use client";
import Header from '@/components/profile/Header';
import ProfileInfo from '@/components/profile/ProfileInfo';
import RoomList from '@/components/profile/RoomList';
import Sidebar from '@/components/profile/Sidebar';
import React, { useEffect } from 'react'

const Profile = () => {

  const [user, setUser] = React.useState<any>()
  const [selectedTab, setSelectedTab] = React.useState('rooms')

  useEffect(() => {
    const user = localStorage.getItem('pitchtrack-organizer')
    if(user) {
      setUser(JSON.parse(user))
    }
  }, [])

  return (
    <div className='w-full h-full max-h-[100vh] flex flex-col justify-start items-center overflow-hidden bg-green-200'>
    {/* {isOnline ?  */}
    {user && 
      <div className='relative w-full min-h-full flex flex-col justify-start items-center overflow-y-scroll bg-white'>
        <Header user={user} />

        <div className="h-full w-full md:max-w-[1000px] flex justify-start items-start gap-2 overflow-hidden">
          <Sidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
          {selectedTab == 'rooms' && <RoomList organizer={user} />}
          {selectedTab == 'connected-devices' && <div>Connected Devices</div>}
          {selectedTab == 'profile' && <ProfileInfo organizer={user} />}
        </div>
      </div>
    }

    </div>
  )
}

export default Profile
import React from 'react'

const Header = ({ countDown, slot, isFlashing, event }: any) => {
  return (
      <div className="w-full flex justify-between items-center py-2 px-2 md:px-8 transition-all"
        style={{
          backgroundColor: countDown > slot?.warningTime - 1 ? 'white' : countDown > slot?.dangerTime - 1 ? 'yellow' :  countDown == 0 ? '#0e0e0e' : '#FF8888',
          animation: isFlashing && countDown < slot?.dangerTime ? 'flash 0.5s infinite' : 'none',
          transitionDuration: countDown == 0 ? '2s' : '1s'
        }}
      >
        <div className="w-full flex justify-start items-center">
          <p className="text-2xl md:text-4xl font-bold">PitchTrack</p>
        </div>
        <div className="w-full flex justify-center ite ms-center">
          <p className="text-2xl md:text-4xl font-bold">{slot?.speaker}</p>
        </div>
        <div className="hidden md:flex w-full justify-end items-center">
          <p className="text-2xl md:text-4xl font-bold">{event.title}</p>
        </div>
      </div>
  )
}

export default Header
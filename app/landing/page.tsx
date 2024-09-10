"use client";

import React, { useState } from 'react'
import Header from './_components/Header';
import SignUpForm from './_components/SignUpForm';
import SignInForm from './_components/SignInForm';

const Landing = () => {

  const [user, setUser] = React.useState<any>()
  const [showForm, setShowForm] = useState<string | null>("")

  return (
    <div className='w-full h-full max-h-[100vh] flex flex-col justify-start items-center overflow-y-hidden bg-green-200'>

      <div className='relative w-full min-h-full flex flex-col justify-start items-center overflow-y-scroll bg-white'>

        {/* HEADER */}
        <Header user={user} setShowForm={setShowForm} />

        {/* BODY */}
        <div className='z-10 w-full flex flex-col justify-center items-center gap-5 py-28'>

          <div className='w-full h-fit flex flex-col justify-start items-center px-5'>
            <h1 className='text-4xl md:text-6xl font-semibold text-center'>Stay On Track,<br />Every Stage of the Way</h1>
            <p className='text-base md:text-lg mt-4 font-light text-center'>Join our community of presenters and event organizers using real-time stage timing tools. </p>
            <button className='px-4 py-2 bg-black text-white rounded-md mt-4' onClick={() => setShowForm("SignUp")}>Get Started For Free</button>
          </div>

          <div className='flex justify-center items-center p-2 md:p-4 rounded-2xl overflow-hidden backdrop-blur-lg bg-[#ffffff50] border-2 border-[#ffffff40] shadow-[#00000010] shadow-2xl'>
            <div className='hidden md:h-[490px] md:flex justify-center items-center rounded-lg overflow-hidden'>
              <img src='/Desktop-Mockup.png' alt='landing' className='w-full h-full object-contain'/>
            </div>
            <div className='md:h-[490px] md:hidden flex justify-center items-center rounded-lg overflow-hidden'>
              <img src='/Mobile-Mockup.png' alt='landing' className='w-full h-full object-contain'/>
            </div>
          </div>

        </div>

        <div className='w-full flex justify-center items-center border-slate-300 border-t-2 py-5'>
          <div className='w-full md:max-w-[1000px] flex flex-col md:flex-row justify-between items-start md:items-center px-4 md:px-0'>
            <p className='text-lg whitespace-nowrap'>Pitchtrack &copy; 2021</p>
            <p className='text-lg'>Passionately Crafted by PePy & JazBird.</p>
          </div>
        </div>

        {/* BACKGROUND */}
        <div className='z-0 w-[800px] h-[500px] rounded-full overflow-hidden absolute blur-3xl top-60 moving-gradient'>
        </div>
        <img src='/Background-Lines.png' alt='background' className='w-[1000px] h-[800px] object-cover absolute opacity-30 md:opacity-80'/>

      </div>

      {showForm && (
        <div className='z-20 w-full h-full max-h-full bg-[#00000080] flex justify-center items-center absolute top-0'>
          {showForm == "SignIn" ? 
            <SignInForm setShowForm={setShowForm} />
            :
            <SignUpForm setShowForm={setShowForm} />
          }
        </div>
      )}

    </div>
  )
}

export default Landing
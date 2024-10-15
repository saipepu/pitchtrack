import { Check, ClipboardCopy, Link, X } from 'lucide-react'
import React from 'react'
import QRGenerator from './qrGenerator'

const ShareableViewOptions = ({ setShowShareableOptions, handleClipBoardCopy, isCopied, setIsCopied, eventId } : any) => {

  return (
    <div className='z-40 absolute flex justify-center items-start w-full min-h-[100vh] top-0 left-0 cursor-auto pt-5 overflow-hidden bg-black/50'>
      <div className="z-50 w-[85vw] md:w-[70vw] max-w-[750px] h-[90vh] flex flex-col justify-start items-start gap-5 bg-slate-100 rounded-lg p-4 overflow-y-scroll">
        
        <div className="w-full flex justify-between items-center gap-2">
          <div className='w-full flex justify-start items-center gap-2'>
            <Link size={24} />
            <p className='text-lg font-semibold'>Shareable Views</p>
          </div>
          <X size={24} onClick={() => {
            setShowShareableOptions(false)
          }} className='cursor-pointer'/>
        </div>

        <p className='text-sm text-slate-500 font-light italic'>Click the Clipboard <span><ClipboardCopy size={14} className='inline text-black'/></span> icon to copy the link to the view you would like to share.</p>

        <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-2'>

          <div className='w-full min-h-[100px] flex-1 flex flex-col justify-center items-center p-2 cursor-pointer border-[1px] xl:hover:border-slate-800 border-slate-200 duration-300 transition-all rounded-lg gap-2'>
            <div className='w-full h-full max-h-[200px] flex justify-center items-end'>
              {/* EXAMPLE UI */}
              <img src='/presentor_view.png' alt="placeholder" className='contain rounded-md'/>
            </div>
            <div className='w-full flex flex-col justify-start items-start gap-2 cursor-pointer' onClick={() => {
              setIsCopied('presentor')
              handleClipBoardCopy(`${window?.location.origin}/${eventId}`)
            }}>
              <div className={`w-full flex justify-start items-center gap-1 p-2 rounded-lg text-slate-500 ${isCopied == 'presentor' ? 'bg-green-400 text-white' : 'bg-slate-200'}`}>
                <Link size={12} />
                <p className='text-sm font-light'>Presentor View</p>
                {isCopied == 'presentor' ? <Check size={20} className="ml-auto"/> : <ClipboardCopy size={20} className="ml-auto text-black"/>}
              </div>
            </div>
            <QRGenerator data={`${window?.location.origin}/${eventId}`} />
          </div>

          <div className='w-full min-h-[100px] flex-1 flex flex-col justify-center items-center p-2 cursor-pointer border-[1px] xl:hover:border-slate-800 border-slate-200 duration-300 transition-all rounded-lg gap-2'>
            <div className='w-full h-full max-h-[200px] flex justify-center items-center'>
              {/* EXAMPLE UI */}
              <img src='/audience_view.png' alt="placeholder" className='contain rounded-md'/>
            </div>
            <div className='w-full flex flex-col justify-start items-start gap-2 cursor-pointer' onClick={() => {
              setIsCopied('audience')
              handleClipBoardCopy(`${window?.location.origin}/${eventId}/audience`)
            }}>
              <div className={`w-full flex justify-start items-center gap-1 p-2 rounded-lg text-slate-500 ${isCopied == 'audience' ? 'bg-green-400 text-white' : 'bg-slate-200'}`}>
                <Link size={12} />
                <p className='text-sm font-light'>Audience View</p>
                {isCopied == 'audience' ? <Check size={20} className="ml-auto"/> : <ClipboardCopy size={20} className="ml-auto text-black"/>}
              </div>
            </div>
            <QRGenerator data={`${window?.location.origin}/${eventId}/audience`} />
          </div>

        </div>

      </div>
    </div>
  )
}

export default ShareableViewOptions
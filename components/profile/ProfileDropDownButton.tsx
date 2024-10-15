import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '../ui/button'
import { ChevronDown, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const ProfileDropDownButton = ({ organizer }: any) => {

  const router = useRouter();
  
  const SignOutDialog = () => {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className='hover:bg-slate-100 flex justify-start items-center gap-2'>
            <p className='text-red-400'>Sign Out</p>
            <LogOut size={12} className='stroke-red-400' />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className='bg-white text-black max-w-[90vw]'>
          <AlertDialogHeader>
            <AlertDialogTitle>Alert! Signing Out</AlertDialogTitle>
            <AlertDialogDescription>
              You can always sign back in. Your timers schedule will not be disturbed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className='border-none'>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                localStorage.removeItem('pitchtrack-token')
                localStorage.removeItem('pitchtrack-organizer')
                router.push('/')
                }
              }
              className='bg-red-500 hover:bg-red-700 text-white'
            >Sign Out</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
          <Button className='gap-1 hover:bg-slate-100 duration-300'>
            <p>{organizer?.name}</p>
            <ChevronDown size={12} className='stroke-current' />
          </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[200px] bg-white p-2 rounded-lg shadow-md text-black -translate-x-10 flex flex-col justify-start items-start">
        <Button
          className='w-full hover:bg-slate-100 duration-300 justify-start'
          onClick={() => router.push('/profile')}
        >
            Profile
        </Button>
        <p
          className='w-full text-slate-400 justify-start px-4'
        >
          {organizer?.events?.length} Rooms
        </p>
        <DropdownMenuSeparator />
        <SignOutDialog />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ProfileDropDownButton
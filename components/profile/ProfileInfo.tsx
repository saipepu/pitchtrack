"use client";

import React from 'react'
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { updateOrg } from '@/app/_api/org';
import { useToast } from '@/components/ui/use-toast';

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
})

const ProfileInfo = ({ organizer } : any ) => {

  const [isEditing, setIsEditing] = React.useState(false)
  const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: organizer.name || "",
      email: organizer.email || "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values)
    setIsEditing(!isEditing)
    let dto = values
    const response = await updateOrg({ id: organizer._id, dto: dto })
    console.log(response)
    if(response.success) {
      toast({
        title: "Profile updated successfully",
      })
      localStorage.setItem('pitchtrack-organizer', JSON.stringify(response.message))
      window.location.reload()
    } else {
      toast({
        title: "Profile update failed",
      })
    }
  }

  return (
    <div className="w-full h-full p-3 flex flex-col justify-start items-start gap-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
          <div className='w-full flex justify-between items-center'>
            <p className='text-2xl font-semibold'>Your Profile Info</p>
            <div className='flex justify-center items-center gap-2'>
              {isEditing && <Button type="submit" className='px-3 py-2 h-fit font-normal bg-emerald-100 text-emerald-600 rounded-md hover:bg-emerald-50 border-[1px] hover:border-emerald-400 cursor-pointer transition-all duration-300'>Save</Button>}
              {!isEditing && <Button className='bg-slate-100' onClick={() => setIsEditing(!isEditing)}>Edit</Button>}
            </div>
          </div>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="shadcn" {...field} 
                    className={`${!isEditing ? 'bg-slate-200 font-medium border-0 cursor-pointer' : ''}`}
                    readOnly={!isEditing}
                  />
                </FormControl>
                {isEditing && 
                  <FormDescription className="text-xs font-light">
                    This is your name that will be displayed to others.
                  </FormDescription>
                }
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="shadcn" {...field} 
                    className={`${!isEditing ? 'bg-slate-200 font-medium border-0 cursor-pointer' : ''}`}
                    readOnly={!isEditing}
                  />
                </FormControl>
                {isEditing && 
                  <FormDescription className="text-xs font-light">
                    This is your email that you use to login.
                  </FormDescription>
                }
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  )
}

export default ProfileInfo
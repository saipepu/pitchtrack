"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { signUp } from "@/app/_api/auth/"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { X } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useState } from "react"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(4, {
    message: "Password must be at least 8 characters.",
  }),
})

const SignUpForm = ({ setShowForm } : any) => {

  const { toast } = useToast()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })
 
  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {

    console.log(values)
    const res = await signUp({ dto: { ...values, role: "organizer" } })

    if(res.success) {
      toast({
        title: "Successfully registered"
      })
      setShowForm("SignIn")
      setErrorMessage(null)
    } else {
      toast({
        title: "Failed to register"
      })
      setErrorMessage(res.message)
    }

  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="min-w-[300px] flex flex-col justify-start items-start space-y-4 bg-white p-5 rounded-lg">
        <div className="w-full flex justify-between items-center mb-5">
          <p className="text-2xl font-semibold">Sign Up</p>
          <X size={20} className="cursor-pointer" onClick={() => setShowForm(null)}/>
        </div>
        <FormField
          control={form.control}
          name="name"
          render={({ field }: any) => (
            <FormItem className="w-full">
              <label>Username</label>
              <FormControl>
                <Input type="text" placeholder="name" {...field} className="placeholder:text-slate-300 border-slate-300" />
              </FormControl>
              <FormMessage className="text-red-200" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }: any) => (
            <FormItem className="w-full">
              <label>Email</label>
              <FormControl>
                <Input placeholder="email" {...field} className="placeholder:text-slate-300 border-slate-300" />
              </FormControl>
              <FormMessage className="text-red-200" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }: any) => (
            <FormItem className="w-full">
              <label>Password</label>
              <FormControl>
                <Input placeholder="password" type="password" {...field} className="placeholder:text-slate-300 border-slate-300" />
              </FormControl>
              <FormMessage className="text-red-200" />
            </FormItem>
          )}
        />
        <Button type="submit" variant={"outline"} className="w-full ml-auto lg:hover:bg-black lg:hover:text-white duration-500">Sign Up</Button>
        <p className="text-sm">Already have an account? <span className="text-blue-500 cursor-pointer" onClick={() => setShowForm("SignIn")}>Sign In</span></p>

        <p className="text-red-200 h-4">{errorMessage || ""}</p>
      </form>
    </Form>
  )
}
export default SignUpForm
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { signIn } from "@/app/_api/auth/"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Loader, X } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useState } from "react"

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(4, {
    message: "Password must be at least 8 characters.",
  }),
})

const SignInForm = ({ setShowForm, defaultEmail } : any) => {

  const { toast } = useToast()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: defaultEmail ? defaultEmail : "organizer1@gmail.com",
      password: defaultEmail ? "" : "password",
    },
  })
 
  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {

    setIsLoading(true)
    const newTab = window.open('', '_blank');
    const res = await signIn({ dto: { ...values } })

    if(res.success) {
      toast({
        title: "Welcome to Pitchtrack"
      })
      localStorage.setItem("pitchtrack-token", res.message.accessToken)
      setShowForm(null)
      setErrorMessage(null)
      if (newTab) {
        newTab.location.href = '/loading/dashboard';
      }
    } else {
      toast({
        title: "Failed to register"
      })
      setErrorMessage(res.message)

      if (newTab) {
        newTab.close();
      }
    }
    setIsLoading(false)

  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="min-w-[300px] flex flex-col justify-start items-start space-y-4 bg-white p-5 rounded-lg">
        <div className="w-full flex justify-between items-center mb-5">
          <p className="text-2xl font-semibold">Sign In</p>
          <X size={20} className="cursor-pointer" onClick={() => setShowForm(null)}/>
        </div>

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
        <Button type="submit" variant={"outline"} className="w-full ml-auto lg:hover:bg-black lg:hover:text-white duration-500" disabled={isLoading}>
          {isLoading ? (
            <Loader size={20} className="animate-spin" />
          ) : (
            "Sign In"
          )}
        </Button>
        <p className="text-sm">Do not have an account yet? <span className="text-blue-500 cursor-pointer" onClick={() => setShowForm("SignUp")}>Sign Up</span></p>

        <p className="text-red-200 h-4">{errorMessage || ""}</p>
      </form>
    </Form>
  )
}
export default SignInForm
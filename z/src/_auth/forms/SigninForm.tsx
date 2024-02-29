import { zodResolver } from "@hookform/resolvers/zod"

import { Link } from 'react-router-dom'

import { useToast } from "@/components/ui/use-toast"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { SigninValidation } from "@/lib/validation"
import { z } from "zod"
import { Loader } from "lucide-react"


const SigninForm = () => {
  const { toast } = useToast();
  const isLoading = false;

  // 1. definiton your form.
  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  // 2. define a submit handler.
  async function onSubmit(values: z.infer<typeof SigninValidation>) {
    //log into user account.
   const User = await FIndUserAccount(values);
   // need working
   
    if(!User) {
      return toast({
        title: 'Sign in failed. Please try again.'
      });
    }

    // const session = await signInAccount()
   }

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
      <img src="/assets/images/logo.png" alt="logo" />

        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Sign in into your account</h2>
          <p className="text-black small-medium md:base-regular mt-2">
            Too use Shapes, please enter your account</p>

        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
            
          <FormField // #2 username
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
            
          />
            <FormField // #4 password
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
            
          />
          <Button type="submit" className="shad-button_primary">
            {isLoading ? (
              <div className="flex-center gap-2">
                <Loader /> Loading...
              </div>
            ):"Sign in"}
          </Button>

          <p className="text-small-regular text-black text-center mt-2">
            Dont have a account? 
            <Link to="/sign-up" className="text-primary-500" text-small-semibold ml-1> Sign up</Link>
          </p>
          
        </form>
      </div>
    </Form>
  )
}

export default SigninForm;
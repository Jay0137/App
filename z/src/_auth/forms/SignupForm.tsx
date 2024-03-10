import { zodResolver } from "@hookform/resolvers/zod"

import { Link } from 'react-router-dom'

import { useToast } from "@/components/ui/use-toast"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { SignupValidation } from "@/lib/validation"
import { z } from "zod"
import { Loader } from "lucide-react"
import { useSignInAccount, userCreateUserAccount } from "@/lib/React-query/queriesAndMutations"

const SignupForm = () => {
  const { toast } = useToast();

  const { mutateAsync: createUserAccount, isLoading: isCreatingAccount } = userCreateUserAccount();

  const {mutateAsync: signInAccount, isLoading: isSigningin } = useSignInAccount();

  // 1. definiton your form.
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: '',
    },
  })


  // 2. define a submit handler.
  async function onSubmit(values: z.infer<typeof SignupValidation>) {
    //create a user account.
   const newUser = await createUserAccount(values);
   
    if(!newUser) {
      return toast({
        title: 'Sign up failed. Please try again.'
      });
    }

     const session = await signInAccount({
      email: values.email,
      password: values.password,
     })

     if(!session) {
      return toast({ title: 'Sign up failed. Please try again.'})
     }


   }

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img src="/assets/images/logo-bg-0.png" alt="logo" />

        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Create a new account</h2>
          <p className="text-black small-medium md:base-regular mt-2">
            Too use Shapes, please create your account</p>

        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
          <FormField // #1 name
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
            
          />
          <FormField // #2 username
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
            
          />
          <FormField // #3 email
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>email</FormLabel>
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
            {isCreatingUser ? (
              <div className="flex-center gap-2">
                <Loader /> Loading...
              </div>
            ):"Sign up"}
          </Button>
          <p className="text-small-regular text-black text-center mt-2">
            Already have a account? 
            <Link to="/sign-in" className="text-primary-500" text-small-semibold ml-1> Sign in</Link>
          </p>
        </form>
      </div>
    </Form>
  )
}

export default SignupForm
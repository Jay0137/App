import { zodResolver } from "@hookform/resolvers/zod"
import { Link } from 'react-router-dom'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { SignupValidation } from "@/lib/validation"
import { z } from "zod"
import { Loader } from "lucide-react"

const SignupForm = () => {
  const isLoading = false;

  // 1. definiton your form.
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      pasword: '',
    },
  })

  // 2. define a submit handler.
  async function onSubmit(values: z.infer<typeof SignupValidation>) {
    //create a user account.
   // const newUser = await createUserAccount(values);
   // yet to do
  }

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img src="/assets/images/logo.svg" alt="logo" />

        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Create a new account</h2>
          <p className="text-light-3 small-medium md:base-regular mt-2">
            Too use //NameApp//, please enter your account</p>

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
                <FormDescription>
                  This is your name.
                </FormDescription>
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
                <FormDescription>
                  This is your public display username.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
            
          />
          <FormField // #3 email
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>email</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormDescription>
                  This is your email.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
            
            />
            <FormField // #4 password
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>password</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormDescription>
                  This is your pasword.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
            
          />
          <Button type="submit" className="shad-button_primary">
            {isLoading ? (
              <div className="flex-center gap-2">
                <Loader /> Loading...
              </div>
            ):"Sign up"}
          </Button>
          <p className="text-small-regular text-light-2 text-center mt-2">
            Already have a account? 
            <Link to="/sign-in" className="text-primary-500" text-small-semibold ml-1> Log in</Link>
          </p>
        </form>
      </div>
    </Form>
  )
}

export default SignupForm
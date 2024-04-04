import * as z from "zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage} 
from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/shared";
import { useToast } from "@/components/ui/use-toast";

import { useCreateUserAccount, useSignInAccount } 
from "@/lib/React-query/queries";
import { SignupValidation } from "@/lib/validation";
import { useUserContext } from "@/context/AuthContext";

const SignupForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

  // Form
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  })

  // Queries
  const { mutateAsync: createUserAccount, isPending: isCreatingAccount } = useCreateUserAccount();
  const {mutateAsync: signInAccount, isPending: isSigningInUser } = useSignInAccount();

  // Handler.
  const handeleSignup = async (user: z.infer<typeof SignupValidation>) => {
    try {
      //create a user account.
      const newUser = await createUserAccount(user);
     
      if(!newUser) {
        toast({ title: "Sign up failed. Please try again.", });

        return;
      }
      
      const session = await signInAccount({
      email: user.email,
       password: user.password,
      });
 
      if(!session) {
       toast({ title: "Sign up failed. Please try again.", });

       navigate("/");

       return;
      }
 
      const isLoggedIn = await checkAuthUser();
 
      if(isLoggedIn) {
       form.reset();
 
       navigate('/')
     } else {
       toast({ title: "Sign up failed. Please try again.", });

       return;
       }
      } catch (error) {
        console.log({ error });
      }
    };

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img src="/assets/images/logo.png" alt="logo" />

        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Create a new account
        </h2>
        <p className="text-white small-medium md:base-regular mt-2">
           Too use Shapes, please enter your details
        </p>

        <form onSubmit={form.handleSubmit(handeleSignup)} className="flex flex-col gap-5 w-full mt-4">
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
            {isCreatingAccount || isSigningInUser || isUserLoading ? (
              <div className="flex-center gap-2">
                <Loader /> Loading...
              </div>
            ) : (
              "Sign Up"
            )}
          </Button>

          <p className="text-small-regular text-white text-center mt-2">
            Already have a account? 
            <Link to="/sign-in" 
            className="text-primary-500" text-small-semibold="true" ml-1="true"> 
            Sign in
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SignupForm
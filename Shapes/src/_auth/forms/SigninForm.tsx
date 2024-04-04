import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from 'react-router-dom';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/shared";
import { useToast } from "@/components/ui/use-toast";

import { SigninValidation } from "@/lib/validation";
import { useUserContext } from "@/context/AuthContext";
import { useSignInAccount } from "@/lib/React-query/queries";

const SigninForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

   // Query
   const { mutateAsync: signInAccount, isPending } = useSignInAccount();

   const form = useForm<z.infer<typeof SigninValidation>>({
     resolver: zodResolver(SigninValidation),
     defaultValues: {
       email: "",
       password: "",
     },
   });
 
   const handleSignin = async (user: z.infer<typeof SigninValidation>) => {
     const session = await signInAccount(user);
 
     if (!session) {
       toast({ title: "Login failed. Please try again." });
       
       return;
     }
 
     const isLoggedIn = await checkAuthUser();
 
     if (isLoggedIn) {
       form.reset();
 
       navigate("/");
     } else {
       toast({ title: "Login failed. Please try again.", });
       
       return;
     }
   };

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
      <img src="/assets/images/logo.png" alt="logo" />

        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Sign in into your account
        </h2>

        <p className="text-white small-medium md:base-regular mt-2">
          Too use Shapes, please enter your account
        </p>

        <form onSubmit={form.handleSubmit(handleSignin)} 
          className="flex flex-col gap-5 w-full mt-4">
            
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
            {isPending || isUserLoading ? (
              <div className="flex-center gap-2">
                <Loader /> Loading...
              </div>
            ): (
              "Sign in"
            )}
          </Button>

          <p className="text-small-regular text-white text-center mt-2">
            Don't have a account?
            <Link to="/sign-up" 
            className="text-primary-500" text-small-semibold="true" ml-1="true"> 
              Sign up
            </Link>
          </p> 
        </form>
      </div>
    </Form>
  );
};

export default SigninForm;
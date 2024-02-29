import * as z from "zod";


export const SignupValidation = z.object({
    name: z.string().min(2, {message: 'Too short'}).max(50),
    username: z.string().min(2, {message: 'Too short'}).max(50),
    email: z.string().email(),
    password: z.string().min(8, {message: 'Password must be atleast 8 characters'}),
  });

  export const SigninValidation =z.object({
    email: z.string().email({message: ' '}),
    password: z.string().min(8, {message: ' '}),
  }).refine(data => {
    if (data.email?.includes('error') || data.password?.includes('error')) {
        throw { message: 'There are errors in the form' };
    }
    return data;
});

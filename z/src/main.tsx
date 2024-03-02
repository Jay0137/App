import ReactDOM  from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';

import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <App />
    </BrowserRouter>

    // make to route sign in or sign up pages

)  


/////////////////////////////////////////////////////////////

<Form>
    <form>
        <p className="text-small-regular text-black text-center mt-2">
        Dont have a account? 
        <Link to="/sign-up" className="text-primary-500" text-small-semibold ml-1> Sign up</Link>
        </p>
    </form>
    
    <form>
        <p className="text-small-regular text-black text-center mt-2">
        Already have a account? 
        <Link to="/sign-in" className="text-primary-500" text-small-semibold ml-1> Sign in</Link>
        </p>
    </form>

</Form>
 // fuse link and button 
 // make 2 bottom 1 for sign in and 1 for sign up
 // color 1button - white, 2botton - blue
 //
<Button type="submit" className="shad-button_primary">
{isLoading ? (
  <div className="flex-center gap-2">
    <Loader /> Loading...
  </div>
):"Sign up"}
</Button>

//////////////////////////////////////////////////////////////////////
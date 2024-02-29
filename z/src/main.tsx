import ReactDOM  from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';

import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <App />
    </BrowserRouter>

    // make to route sign in or sign up pages
)  
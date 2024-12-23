import ReactDOM from "react-dom/client";
import { createBrowserRouter,RouterProvider, Outlet } from "react-router-dom";
import { Error } from "./components/Error";
import Login from "./components/login";
import AppLayout from "./components/AppLayout";



const appRouter = createBrowserRouter([
  {
    path:"/",
    element:<AppLayout/>,
    children:[
      {
        path:"/",
        element:<Login/>,
      },
    ],
    errorElement : <Error/>
  },
  
])
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider  router={appRouter}/>);








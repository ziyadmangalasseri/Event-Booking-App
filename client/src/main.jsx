import ReactDOM from "react-dom/client";
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import { Error } from "./components/Error";
import Login from "./components/Login";
import Body from "./components/body";
import Dashboard from "./components/admin/Dashboard";
import { Outlet } from "react-router-dom";
import EmployeeList from "./components/admin/EmployeeList";
import Events from "./components/admin/Events";

// const AppLayout = () => {
//   return (
//     <div id="app">
//       <Body />
//       <Outlet />
//     </div>
//   );
// };


const appRouter = createBrowserRouter([
  {
    path:"/",
    element:<Body/>,
    children:[
      {
        path:"/",
        element:<Login/>,
      },
      {
        path:"/dashboard",
        element:<Dashboard/>,
      },
      {
        path:"/employees",
        element:<EmployeeList/>,
      },
      {
        path:"/events",
        element:<Events/>,
      },
    ],
    errorElement : <Error/>
  },
  
])
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider  router={appRouter}/>);








import ReactDOM from "react-dom/client";
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import { Error } from "./components/Error";
import Login from "./components/Login";
import Body from "./components/body";
import Dashboard from "./components/admin/Dashboard";
import { Outlet } from "react-router-dom";
import EmployeeList from "./components/admin/EmployeeList";
import Events from "./components/admin/Events";
import AddEmployee from "./components/admin/AddEmployee";
import Home from "./components/employee/Home";
import ProfilePage from "./components/employee/ProfilePage";
import AvailableEvents from "./components/employee/AvailableEvents";
import BookedEvents from "./components/employee/BookedEvents";
import AddEvent from "./components/admin/AddEvent";
import EmployeeDetails from "./components/admin/EmployeeDetails";


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
      {
        path:"/addEmployee",
        element:<AddEmployee/>,
      },
      {
        path:"/home",
        element:<Home/>,
      },
      {
        path:"/profilePage",
        element:<ProfilePage/>,
      },
      {
        path:"/availableEvents",
        element:<AvailableEvents/>,
      },
      {
        path:"/bookedEvents",
        element:<BookedEvents/>,
      },
      {
        path:"/addEvent",
        element:<AddEvent/>,
      },
      {
        path:"/showEmployeeDetails/:id",
        element:<EmployeeDetails/>,
      },
    ],
    errorElement : <Error/>
  },
  
])
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider  router={appRouter}/>);








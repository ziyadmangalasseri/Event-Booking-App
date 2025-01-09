import Body from "./Body";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
    return (
      <div id="app">
        <Body />
        <Outlet />
      </div>
    );
  };

  export default AppLayout
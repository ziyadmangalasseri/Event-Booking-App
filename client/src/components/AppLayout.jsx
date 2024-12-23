import Body from "./body";
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
import PageBackground from "./PageBackground";
import { Outlet } from "react-router-dom";

const Body = () => {
  return (
    <div className="relative">
      <PageBackground />
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="h-[610px] w-[350px] bg-black bg-opacity-30 rounded-2xl text-white font-mono shadow-custom">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Body;

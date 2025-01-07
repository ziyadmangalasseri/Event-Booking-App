import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import AlfaLogo from "../AlfaLogo";
import useAuth from "../utils/jwtChecking";
import axios from "axios";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate()
  const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;

  useAuth();
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("jwtToken");

      if (!token) throw new Error("No token found.");

      await axios.get(`${backendUrl}/logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      // Remove token from localStorage
      localStorage.removeItem("jwtToken");

      // Redirect to login page
      navigate("/");
    } catch (error) {
      console.error("Error during logout:", error.message || error);
    }
  };

  return (
    <div className="p-2 justify-around">
      <AlfaLogo />
      {/* Details Section */}
      <div className="details-div py-6 flex flex-col items-center space-y-4">
        <Link to="/employees" className="w-11/12 rounded-xl py-1 h-[50px]">
          <button className="w-full h-full rounded-xl bg-black text-white font-bold py-2 hover:bg-gray-200 hover:text-black active:bg-green-400">
            All Employee
          </button>
        </Link>
        <Link to="/events" className="w-11/12 rounded-xl py-1 h-[50px]">
          <button className="w-full h-full rounded-xl bg-black text-white font-bold py-2 hover:bg-gray-200 hover:text-black active:bg-green-400">
            Events
          </button>
        </Link>
        <Link to="/addEmployee" className="w-11/12 rounded-xl py-1 h-[50px]">
          <button className="w-full h-full rounded-xl bg-black text-white font-bold py-2 hover:bg-gray-200 hover:text-black active:bg-green-400">
            Add Employee
          </button>
        </Link>
        <Link to="/contact" className="w-11/12 rounded-xl py-1 h-[50px]">
          <button className="w-full h-full rounded-xl bg-black text-white font-bold py-2 hover:bg-gray-200 hover:text-black active:bg-green-400">
            Contact Us
          </button>
        </Link>
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-11/12 rounded-xl h-[45px] bg-black text-white font-bold py-2 hover:bg-gray-200 hover:text-black active:bg-red-400"
        >
          Log Out
        </button>
      </div>

      {/* Custom Modal for Logout Confirmation */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg text-center w-11/12 max-w-md shadow-lg">
            <p className="text-lg font-bold mb-6 text-black">
              Are you sure you want to log out?
            </p>
            <div className="flex flex-col space-y-4">
              <button
                onClick={handleLogout}
                className="w-full py-3 bg-red-500 text-white font-bold rounded hover:bg-red-600"
              >
                Log Out
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-full py-3 bg-gray-400 text-white font-bold rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import AlfaLogo from "../AlfaLogo";


const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    window.location.href = "/logout";
  };

  return (
    <div className="p-2 justify-around">
      <AlfaLogo/>
      {/* Details Section */}
      <div className="details-div py-6 flex flex-col items-center space-y-4">
        <Link
          to="/profilePage"
          className="w-11/12 rounded-xl py-1 h-[50px]"
        >
          <button className="w-full h-full rounded-xl bg-black text-white font-bold py-2 hover:bg-gray-200 hover:text-black active:bg-green-400">
            User Profile
          </button>
        </Link>
        <Link
          to="/availableEvents"
          className="w-11/12 rounded-xl py-1 h-[50px]"
        >
          <button className="w-full h-full rounded-xl bg-black text-white font-bold py-2 hover:bg-gray-200 hover:text-black active:bg-green-400">
           Available Events
          </button>
        </Link>
        <Link
          to="/bookedEvents"
          className="w-11/12 rounded-xl py-1 h-[50px]"
        >
          <button className="w-full h-full rounded-xl bg-black text-white font-bold py-2 hover:bg-gray-200 hover:text-black active:bg-green-400">
            Booked Events
          </button>
        </Link>
        <Link
          to="/contact"
          className="w-11/12 rounded-xl py-1 h-[50px]"
        >
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
          <p className="text-lg font-bold mb-6 text-black">Are you sure you want to log out?</p>
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

export default Home;

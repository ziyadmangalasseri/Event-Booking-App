import React, { useState } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    window.location.href = "/logout";
  };

  return (
    <div className="p-2 justify-around">
      {/* Details Section */}
      <div className="details-div py-6 flex flex-col items-center space-y-4">
        <Link
          to="/showemployeespage"
          className="w-11/12 rounded-xl py-1 h-[50px]"
        >
          <button className="w-full h-full rounded-xl bg-black text-white font-bold py-2 hover:bg-gray-200 hover:text-black active:bg-green-400">
            All Employee
          </button>
        </Link>
        <Link
          to="/showEventPage"
          className="w-11/12 rounded-xl py-1 h-[50px]"
        >
          <button className="w-full h-full rounded-xl bg-black text-white font-bold py-2 hover:bg-gray-200 hover:text-black active:bg-green-400">
            Events
          </button>
        </Link>
        <Link
          to="/addEmployee"
          className="w-11/12 rounded-xl py-1 h-[50px]"
        >
          <button className="w-full h-full rounded-xl bg-black text-white font-bold py-2 hover:bg-gray-200 hover:text-black active:bg-green-400">
            Add Employee
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
        <div className="modal-overlay fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="modal-content bg-white p-5 rounded-lg text-center w-11/12 max-w-md shadow-lg">
            <p className="text-lg mb-4">Are you sure you want to log out?</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleLogout}
                className="modal-btn bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Log Out
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="modal-btn bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
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

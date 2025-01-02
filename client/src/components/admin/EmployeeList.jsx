import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;


  // Fetch employees from backend
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch(`${backendUrl}/showemployeespage`, { credentials: "include" }); // Ensure cookies are sent for authentication
        if (response.ok) {
          const data = await response.json(); // Assuming backend sends JSON
          setEmployees(data.employees || []); // Ensure data format matches
        } else {
          console.error("Failed to fetch employees.");
        }
      } catch (error) {
        console.error("Error fetching employees:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const backbutton = () => {
    window.history.back();
  };

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  return (
    <div>
      <div className="text-center py-4">
        <h3 className="text-2xl font-bold mb-2">Employee List</h3>
      </div>

      <div className="bg-black/60 p-5 h-[470px] flex flex-col overflow-y-auto scrollbar-none">
        {employees?.length > 0 ? (
          employees?.map((employee, index) => (
            <Link
              key={employee._id}
              to={`/showEmployeeDetails/${employee._id}`}
              className="block mb-3"
            >
              <div className="flex justify-between items-center bg-white/10 rounded-lg p-4 h-[50px]">
                <div>
                  <h6 className="uppercase font-medium">
                    {index + 1}. {employee.name}
                  </h6>
                  <h6 className="text-sm">Id: {employee.userId}</h6>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center">No Employees are available.</p>
        )}
      </div>

      <div className="flex justify-center p-4">
        <button
          className="w-1/2 h-10 bg-green-700 hover:bg-green-800 rounded-xl text-white"
          onClick={backbutton}
        >
          Home
        </button>
      </div>
    </div>
  );
};

export default EmployeeList;

import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams, useNavigate } from "react-router-dom";  // Updated import

const EmployeeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();  // Updated hook
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const response = await axios.get(`/showEmployeeDetails/${id}`);
        setEmployee(response.data);
      } catch (error) {
        console.error("Failed to fetch employee data", error);
      }
    };

    fetchEmployeeDetails();
  }, [id]);

  const deleteEmployee = async () => {
    const confirmation = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmation.isConfirmed) {
      try {
        const response = await axios.delete(`/deleteEmployee/${id}`);
        if (response.status === 200) {
          await Swal.fire({
            title: "Deleted!",
            text: "Employee has been deleted.",
            icon: "success",
          });
          navigate("/showemployeespage");  // Updated navigation
        }
      } catch (error) {
        console.error("Error deleting employee:", error);
        await Swal.fire({
          title: "Error!",
          text: "An error occurred while deleting the employee.",
          icon: "error",
        });
      }
    }
  };

  if (!employee) return <div>Loading...</div>;

  return (
    <div>
      <div className="text-center py-4">
        <h3 className="text-center mb-4 text-2xl">Employee Details</h3>
        <div className="bg-black/60 p-5 h-[470px] flex flex-col overflow-y-auto scrollbar-none">

        <ul className="space-y-4">
          <li className="flex justify-between">
            <span className="font-semibold">Name:</span>
            <span>{employee.name}</span>
          </li>
          <li className="flex justify-between">
            <span className="font-semibold">User Id:</span>
            <span>{employee.userId}</span>
          </li>
          <li className="flex justify-between">
            <span className="font-semibold">Phone Number:</span>
            <span>{employee.number}</span>
          </li>
          <li className="flex justify-between">
            <span className="font-semibold">Place:</span>
            <span>{employee.place}</span>
          </li>
          <li className="flex justify-between">
            <span className="font-semibold">Completed Events:</span>
            <span>{employee.CompletedEvents ? employee.CompletedEvents.length : 0}</span>
          </li>
          <li className="flex justify-between">
            <span className="font-semibold">Joining Date:</span>
            <span>{employee.JoiningDate}</span>
          </li>
          <li className="flex justify-between">
            <span className="font-semibold">Date of Birth:</span>
            <span>{employee.DateOfBirth}</span>
          </li>
          <li className="flex justify-between">
            <span className="font-semibold">Blood Group:</span>
            <span>{employee.BloodGroup}</span>
          </li>
        </ul>
        </div>
        <div className="m-auto flex justify-around py-4 w-[90%]">
        <button
            className="bg-green-800 w-[40%] text-white px-4 py-2 rounded-lg hover:bg-green-600"
            onClick={() => navigate(`/editEmployee/${employee._id}`)}  // Updated navigation
          >
            Edit
          </button>
          <button
            className="bg-red-700 w-[40%] text-white px-4 py-2 rounded-lg hover:bg-red-600"
            onClick={deleteEmployee}
          >
            Delete
          </button>
          <button
            className="bg-yellow-500 w-[40%] text-white px-4 py-2 rounded-lg hover:bg-yellow-400"
            onClick={() => navigate("/showemployeespage")}  // Updated navigation
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;

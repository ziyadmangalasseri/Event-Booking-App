import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams, useNavigate } from "react-router-dom"; // Updated import
import { Link } from "react-router-dom";

const EmployeeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Updated hook
  const [employee, setEmployee] = useState(null);
  const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        if (!token) {
          Swal.fire({
            icon: "error",
            title: "Unauthorized",
            text: "Please log in to access this page.",
          }).then(() => {
            navigate("/"); // Redirect to login page
          });
        }
        const response = await axios.get(
          `${backendUrl}/showEmployeeDetails/${id}`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setEmployee(response.data);
      } catch (error) {
        console.error("Failed to fetch employee data", error);
      }
    };

    fetchEmployeeDetails();
  }, [backendUrl, id, navigate]);

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
        const token = localStorage.getItem("jwtToken");
        if (!token) throw new Error("No token found. Please log in.");

        const response = await axios.delete(
          `${backendUrl}/deleteEmployee/${id}`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          await Swal.fire({
            title: "Deleted!",
            text: "Employee has been deleted.",
            icon: "success",
          });
          history.back();
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

  if (!employee) return <div className="text-center py-4"> Loading...</div>;

  return (
    <div>
      <div className="text-center py-4">
        <h3 className="text-center mb-4 text-2xl">Employee Details</h3>
        <div className="bg-black/60 p-5 h-[470px] flex flex-col overflow-y-auto scrollbar-none">
          <ul className="w-full flex flex-col justify-center items-center gap-6 my-4">
            <li className="info-item flex justify-between w-full text-sm">
              <span className="label font-bold flex-[0.8] text-left text-base">
                Name
              </span>
              <span className="value flex-1 text-left text-white pl-2">
                : {employee.name}
              </span>
            </li>
            <li className="info-item flex justify-between w-full text-sm">
              <span className="label font-bold flex-[0.8] text-left text-base">
                User Id
              </span>
              <span className="value flex-1 text-left text-white pl-2">
                : {employee.userId}
              </span>
            </li>
            <li className="info-item flex justify-between w-full text-sm">
              <span className="label font-bold flex-[0.8] text-left text-base">
                Phone Number
              </span>
              <span className="value flex-1 text-left text-white pl-2">
                : {employee.number}
              </span>
            </li>
            <li className="info-item flex justify-between w-full text-sm">
              <span className="label font-bold flex-[0.8] text-left text-base">
                Place
              </span>
              <span className="value flex-1 text-left text-white pl-2">
                : {employee.place}
              </span>
            </li>
            <li className="info-item flex justify-between w-full text-sm">
              <span className="label font-bold flex-[0.8] text-left text-base">
                Completed Events
              </span>
              <span className="value flex-1 text-left text-white pl-2">
                :{" "}
                {employee.CompletedEvents ? employee.CompletedEvents.length : 0}
              </span>
            </li>
            <li className="info-item flex justify-between w-full text-sm">
              <span className="label font-bold flex-[0.8] text-left text-base">
                Joining Date
              </span>
              <span className="value flex-1 text-left text-white pl-2">
                : {new Date(employee.JoiningDate).toDateString()}
              </span>
            </li>
            <li className="info-item flex justify-between w-full text-sm">
              <span className="label font-bold flex-[0.8] text-left text-base">
                Date Of Birth
              </span>
              <span className="value flex-1 text-left text-white pl-2">
                : {new Date(employee.DateOfBirth).toDateString()}
              </span>
            </li>
            <li className="info-item flex justify-between w-full text-sm">
              <span className="label font-bold flex-[0.8] text-left text-base">
                Blood Group
              </span>
              <span className="value flex-1 text-left text-white pl-2">
                : {employee.BloodGroup}
              </span>
            </li>
          </ul>
        </div>
        <div className="m-auto flex justify-around py-4 px-1 w-[100%]">
          <button
            className="bg-green-800 w-[30%] text-white px-4 py-2 rounded-lg hover:bg-green-600"
            onClick={() => history.back()} // Updated navigation
          >
            Back
          </button>
          <Link
            to={`/editEmployee/${id}`}
            className="bg-yellow-700 w-[30%] text-white px-4 py-2 rounded-lg hover:bg-yellow-400"
          >
            Edit
          </Link>
          <button
            className="bg-red-700 w-[30%] text-white px-4 py-2 rounded-lg hover:bg-red-600"
            onClick={deleteEmployee}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;

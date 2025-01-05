import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const EditEmployee = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    userId: "",
    number: "",
    place: "",
    JoiningDate: "",
    DateOfBirth: "",
    BloodGroup: "",
    isAdmin:""
  });

  const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(`${backendUrl}/editEmployee/${id}`, {
          withCredentials: true,
        });
        if (response.status === 200) {
          const data = await response.data;
          setFormData({
            name: data.name,
            userId: data.userId,
            number: data.number,
            place: data.place,
            JoiningDate: data.JoiningDate
              ? new Date(data.JoiningDate).toISOString().split("T")[0]
              : "",
            DateOfBirth: data.DateOfBirth
              ? new Date(data.DateOfBirth).toISOString().split("T")[0]
              : "",
            BloodGroup: data.BloodGroup,
            isAdmin:data.isAdmin
          });
        } else {
          Swal.fire(
            "Error",
            data.message || "Failed to fetch employee data",
            "error"
          );
        }
      } catch (error) {
        console.error(error);
        Swal.fire("Error", "An unexpected error occurred", "error");
      }
    };

    fetchEmployeeData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic input validation
    if (
      !formData.name ||
      !formData.userId ||
      !formData.number ||
      !formData.place ||
      !formData.JoiningDate ||
      !formData.DateOfBirth ||
      !formData.BloodGroup
    ) {
      Swal.fire("Error", "Please fill out all required fields", "error");
      return;
    }

    try {
      const response = await fetch(`${backendUrl}/editEmployee/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        Swal.fire(
          "Success",
          "Employee details updated successfully!",
          "success"
        ).then(() => {
          history.back();
        });
      } else {
        Swal.fire(
          "Error",
          result.error || "Failed to update employee details",
          "error"
        );
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "An unexpected error occurred", "error");
    }
  };

  const updateAdminStatus = async (status) => {
    try {
      const endpoint = status
        ? `${backendUrl}/makeadmin/${id}`
        : `${backendUrl}/removeadmin/${id}`;
      const response = await fetch(endpoint, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials : "include"
      });

      const result = await response.json();

      if (response.ok) {
        Swal.fire(
          "Success",
          status
            ? "Employee promoted to admin successfully!"
            : "Admin privileges removed successfully!",
          "success"
        ).then(() => {
          window.location.reload();
        });
      } else {
        Swal.fire(
          "Error",
          result.error || "Failed to update admin status",
          "error"
        );
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "An unexpected error occurred", "error");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="text-center py-2">
          <h3 className="text-white text-2xl font-bold m-auto p-3">
            Edit Employee
          </h3>
        </div>
        <div className="bg-black/60 p-10 h-[470px] flex flex-col overflow-y-auto scrollbar-none">
          <div>
            <label className="block  text-white mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter Employee Name"
              className="mt-1 block w-full px-3 py-2 bg-black/30 text-white rounded-md focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-white mb-1">UserId</label>
            <input
              type="text"
              name="userId"
              value={formData.userId}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 bg-black/30 text-white rounded-md focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-white mb-1">Phone Number</label>
            <input
              type="tel"
              name="number"
              pattern="[0-9]{10}"
              value={formData.number}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 bg-black/30 text-white rounded-md focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-white mb-1">Place</label>
            <input
              type="text"
              name="place"
              value={formData.place}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 bg-black/30 text-white rounded-md focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-white mb-1">Joining Date</label>
            <input
              type="date"
              name="JoiningDate"
              value={formData.JoiningDate}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 bg-black/30 text-white rounded-md focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-white mb-1">Date of Birth</label>
            <input
              type="date"
              name="DateOfBirth"
              value={formData.DateOfBirth}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 bg-black/30 text-white rounded-md focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-white mb-1">Blood Group</label>
            <input
              type="text"
              name="BloodGroup"
              value={formData.BloodGroup}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 bg-black/30 text-white rounded-md focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div className="mt-4">
            <Link to={`/changePassword/${id}`}>
              <button className="w-full px-4 py-2 bg-lime-400 text-black rounded-lg">
                Change Password
              </button>
            </Link>
          </div>
          <div className="mt-4">
            {formData.isAdmin ? (
              <button
                type="button"
                onClick={() => updateAdminStatus(false)}
                className="w-full px-4 py-2 bg-teal-500 text-white rounded-lg"
              >
                Remove Admin
              </button>
            ) : (
              <button
                type="button"
                onClick={() => updateAdminStatus(true)}
                className="w-full px-4 py-2 bg-teal-500 text-white rounded-lg"
              >
                Make Admin
              </button>
            )}
          </div>
        </div>
        <div className="m-auto flex justify-around py-3 px-1 w-[90%]">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="w-2/5 bg-red-700 text-white p-2 rounded-xl hover:bg-red-600"
          >
            Cancel
          </button>
          <button
            type="Submit"
            className="w-2/5 bg-green-800 text-white p-2 rounded-xl hover:bg-green-600"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditEmployee;

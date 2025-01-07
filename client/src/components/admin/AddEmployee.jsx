import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // for navigation after success
import useAuth from "../utils/jwtChecking";

const AddEmployee = () => {
  const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;
  const navigate = useNavigate(); // To navigate to other pages


  useAuth()

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    userId: "",
    password: "",
    number: "",
    place: "",
    JoiningDate: "",
    DateOfBirth: "",
    BloodGroup: "",
  });

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password.length <= 4) {
      Swal.fire("Error", "Password must be at least 4 characters", "error");
      return;
    }

    try {
      const token = localStorage.getItem("jwtToken"); // Assuming the JWT is stored in localStorage

      const response = await axios.post(`${backendUrl}/addEmployee`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Adding JWT to the headers
        },
      });
      if(response.status === 409){
        Swal.fire({
          icon:"error",
          title:"Error",
          text:response.data.message,
        })
      }

      if (response.status === 200) {
        // Success case
        Swal.fire({
          icon: "success",
          title: "Employee Created",
          text: response.data.message || "Employee created successfully!",
        }).then(() => {
          navigate("/dashboard"); // Navigate to dashboard or any other page
        });
      } else {
        // Error case when the backend sends a failure response
        Swal.fire("Error", response.data.message || "Failed to create employee", "error");
      }
    } catch (error) {
      // Network or server error
      Swal.fire("Error", error.response?.data?.message || "An unexpected error occurred", "error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="text-center py-4">
        <h3 className="text-white text-2xl font-bold">Create New Employee</h3>
      </div>
      <div className="bg-black/60 p-8 h-[470px] flex flex-col overflow-y-auto scrollbar-none">
        <div>
          <label className="block text-white mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter Employee Name"
            className="w-full p-2 bg-black/30 text-white rounded focus:outline-none focus:ring"
            required
          />
        </div>
        <div>
          <label className="block text-white mb-1">User ID</label>
          <input
            type="text"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            className="w-full p-2 bg-black/30 text-white rounded focus:outline-none focus:ring"
            required
          />
        </div>
        <div className="relative">
          <label className="block text-white mb-1">Password</label>
          <input
            type={passwordVisible ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 bg-black/30 text-white rounded focus:outline-none focus:ring"
            required
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute top-2/3 right-3 transform -translate-y-1/2 text-white"
          >
            {passwordVisible ? "🙈" : "👁️"}
          </button>
        </div>
        <div>
          <label className="block text-white mb-1">Phone Number</label>
          <input
            type="tel"
            name="number"
            value={formData.number}
            onChange={handleChange}
            pattern="[0-9]{10}"
            placeholder="Enter 10-digit phone number"
            className="w-full p-2 bg-black/30 text-white rounded focus:outline-none focus:ring"
            required
          />
        </div>
        <div>
          <label className="block text-white mb-1">Place</label>
          <input
            type="text"
            name="place"
            value={formData.place}
            onChange={handleChange}
            className="w-full p-2 bg-black/30 text-white rounded focus:outline-none focus:ring"
            required
          />
        </div>
        <div>
          <label className="block text-white mb-1">Joining Date</label>
          <input
            type="date"
            name="JoiningDate"
            value={formData.JoiningDate}
            onChange={handleChange}
            className="w-full p-2 bg-black/30 text-white rounded focus:outline-none focus:ring"
            required
          />
        </div>
        <div>
          <label className="block text-white mb-1">Date of Birth</label>
          <input
            type="date"
            name="DateOfBirth"
            value={formData.DateOfBirth}
            onChange={handleChange}
            className="w-full p-2 bg-black/30 text-white rounded focus:outline-none focus:ring"
            required
          />
        </div>
        <div>
          <label className="block text-white mb-1">Blood Group</label>
          <input
            type="text"
            name="BloodGroup"
            value={formData.BloodGroup}
            onChange={handleChange}
            className="w-full p-2 bg-black/30 text-white rounded focus:outline-none focus:ring"
            required
          />
        </div>
      </div>
      <div className="flex justify-between px-3">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="w-2/5 bg-yellow-500 text-white p-2 m-auto rounded-xl hover:bg-yellow-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="w-2/5 bg-green-800 text-white p-2 m-auto rounded-xl hover:bg-green-400"
        >
          Create
        </button>
      </div>
    </form>
  );
};

export default AddEmployee;

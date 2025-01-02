import React, { useState } from "react";
import Swal from "sweetalert2";

const AddEmployee = () => {
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

    if (formData.password.length < 4) {
      Swal.fire("Error", "Password must be at least 4 characters", "error");
      return;
    }

    try {
      const response = await fetch("/addEmployee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        Swal.fire("Success", "Employee created successfully", "success");
        setTimeout(() => {
          window.location.href = result.redirectURL;
        }, 1500);
      } else {
        const errorMessage = await response.text();
        Swal.fire("Error", errorMessage, "error");
      }
    } catch (error) {
      Swal.fire("Error", "An unexpected error occurred", "error");
    }
  };

  return (
    // <div className="flex items-center justify-center min-h-screen bg-white relative">
    <div className="">
      <div className="text-center py-4">
        <h3 className="text-white text-2xl font-bold">Create New Employee</h3>
      </div>
      <div className="bg-black/60 p-10 h-[470px] flex flex-col overflow-y-auto scrollbar-none">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="">
            <label className="block text-white mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter Employee Name"
              className="w-full p-2 bg-black/30 text-white rounded focus:outline-none focus:ring"
              required
            /></div>
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
        </form>
      </div>
      <div className="flex justify-between p-5">
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
    </div>
  );
};

export default AddEmployee;

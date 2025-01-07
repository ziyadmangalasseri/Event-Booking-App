import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const AddEvent = () => {
  const [formData, setFormData] = useState({
    place: "",
    date: "",
    reportingTime: "",
    exitTime: "",
    jobTitle: "",
    jobDescription: "",
    employerLimit: "",
  });

  const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("jwtToken"); // Assuming the JWT is stored in localStorage

      const response = await axios.post(
        `${backendUrl}/addEvent`,
        formData,
        { withCredentials : true,
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // JWT token for authorization
          },
        }
      );

      Swal.fire({
        icon: response.data.success ? "success" : "error",
        title: response.data.success ? "Success" : "Error",
        text: response.data.message || "Something went wrong.",
      }).then(() => {
        if (response.data.success === true) history.back();
      });
    } catch (error) {
      Swal.fire("Error", "An error occurred while creating the event.", "error");
      console.error(error);
    }
  };

  return (
    <div className="">
      <div className="text-center py-4">
        <h3 className="text-white text-2xl font-bold">Create New Event</h3>
      </div>
      <div className="bg-black/60 p-10 h-[470px] flex flex-col overflow-y-auto scrollbar-none">
        <form className="space-y-4">
          {[
            { label: "Place", type: "text", name: "place", placeholder: "Enter event place" },
            { label: "Date", type: "date", name: "date" },
            { label: "Reporting Time", type: "time", name: "reportingTime" },
            { label: "Exit Time", type: "time", name: "exitTime" },
            { label: "Job Title", type: "text", name: "jobTitle", placeholder: "Enter job title" },
            { label: "Employer Limit", type: "number", name: "employerLimit", placeholder: "Enter employer limit" },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-white mb-1">{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                className="w-full p-2 bg-black/30 text-white rounded focus:outline-none focus:ring"
                value={formData[field.name]}
                onChange={handleChange}
                required
              />
            </div>
          ))}
          <div>
            <label className="block text-white mb-1">Job Description</label>
            <textarea
              name="jobDescription"
              rows="3"
              placeholder="Enter job description"
              className="w-full p-2 bg-black/30 text-white rounded focus:outline-none focus:ring"
              value={formData.jobDescription}
              onChange={handleChange}
              required
            ></textarea>
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
          type="button"
          onClick={handleSubmit}
          className="w-2/5 bg-green-800 text-white p-2 m-auto rounded-xl hover:bg-green-400"
        >
          Create Event
        </button>
      </div>
    </div>
  );
};

export default AddEvent;

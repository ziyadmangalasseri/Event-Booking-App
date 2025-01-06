import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const EditEvent = () => {
  const { id } = useParams();
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

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await axios.get(`${backendUrl}/eventDetail/${id}`, {
          withCredentials: true,
        });
        if (response.status === 200) {
          const data = response.data.event;
          setFormData({
            place: data.place,
            date: data.date ? new Date(data.date).toISOString().split("T")[0] : "",
            reportingTime: data.reportingTime,
            exitTime: data.exitTime,
            jobTitle: data.jobTitle,
            jobDescription: data.jobDescription,
            employerLimit: data.employerLimit,
          });
        } else {
          Swal.fire("Error", "Failed to fetch event data", "error");
        }
      } catch (error) {
        console.error(error);
        Swal.fire("Error", "An unexpected error occurred", "error");
      }
    };

    fetchEventData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.place ||
      !formData.date ||
      !formData.reportingTime ||
      !formData.exitTime ||
      !formData.jobTitle ||
      !formData.jobDescription ||
      !formData.employerLimit
    ) {
      Swal.fire("Error", "Please fill out all required fields", "error");
      return;
    }

    try {
      const response = await fetch(`${backendUrl}/editEvent/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        Swal.fire("Success", "Event details updated successfully!", "success").then(() => {
          window.history.back();
        });
      } else {
        Swal.fire("Error", result.error || "Failed to update event details", "error");
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
          <h3 className="text-white text-2xl font-bold m-auto p-3">Edit Event</h3>
        </div>
        <div className="bg-black/60 p-10 h-[470px] flex flex-col overflow-y-auto scrollbar-none">
          <div>
            <label className="block text-white mb-1">Place</label>
            <input
              type="text"
              name="place"
              value={formData.place}
              onChange={handleInputChange}
              placeholder="Enter Event Place"
              className="mt-1 block w-full px-3 py-2 bg-black/30 text-white rounded-md focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-white mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 bg-black/30 text-white rounded-md focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-white mb-1">Reporting Time</label>
            <input
              type="time"
              name="reportingTime"
              value={formData.reportingTime}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 bg-black/30 text-white rounded-md focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-white mb-1">Exit Time</label>
            <input
              type="time"
              name="exitTime"
              value={formData.exitTime}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 bg-black/30 text-white rounded-md focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-white mb-1">Job Title</label>
            <input
              type="text"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleInputChange}
              placeholder="Enter Job Title"
              className="mt-1 block w-full px-3 py-2 bg-black/30 text-white rounded-md focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-white mb-1">Job Description</label>
            <textarea
              name="jobDescription"
              value={formData.jobDescription}
              onChange={handleInputChange}
              placeholder="Enter Job Description"
              rows="3"
              className="mt-1 block w-full px-3 py-2 bg-black/30 text-white rounded-md focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-white mb-1">Employer Limit</label>
            <input
              type="number"
              name="employerLimit"
              value={formData.employerLimit}
              onChange={handleInputChange}
              placeholder="Enter Employer Limit"
              className="mt-1 block w-full px-3 py-2 bg-black/30 text-white rounded-md focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
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

export default EditEvent;
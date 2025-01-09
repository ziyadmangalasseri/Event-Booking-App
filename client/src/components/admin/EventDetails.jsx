import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams, useNavigate, Link } from "react-router-dom";

const EventDetails = () => {
  const { id } = useParams(); // Get event ID from URL
  const navigate = useNavigate();
  const [event, setEvent] = useState(null); // State for event details
  const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;
  let count = 1;
  let currentDate = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const token = localStorage.getItem("jwtToken"); // Get JWT token from localStorage
        if (!token) {
          Swal.fire({
            icon: "error",
            title: "Unauthorized",
            text: "Please log in to access this page.",
          }).then(() => {
            navigate("/"); // Redirect to login page
          });
        }
        // Fetch event details from backend
        const response = await axios.get(`${backendUrl}/eventDetail/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Add JWT token to the request header
          },
          withCredentials: true, // Include cookies
        });

        // Update state with fetched data
        setEvent(response.data.event);
      } catch (error) {
        console.error("Failed to fetch event data", error);
      }
    };

    fetchEventDetails();
  }, [backendUrl, id, navigate]);

  const deleteEvent = async () => {
    const confirmation = await Swal.fire({
      title: "Are you sure?",
      text: "This event will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmation.isConfirmed) {
      try {
        const token = localStorage.getItem("jwtToken"); // Get JWT token from localStorage
        if (!token) throw new Error("No token found. Please log in.");

        const response = await axios.delete(
          `${backendUrl}/event/delete/${id}`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`, // Add JWT token to the request header
            },
          }
        );
        if (response.status === 200) {
          await Swal.fire("Deleted!", "Event has been deleted.", "success");
          navigate("/events"); // Navigate to event list page
        }
      } catch (error) {
        console.error("Error deleting event:", error);
        await Swal.fire("Error!", "Unable to delete the event.", "error");
      }
    }
  };

  const removeEmployee = async (eventId, userId) => {
    const confirmation = await Swal.fire({
      title: "Are you sure?",
      text: "You are about to remove this employee from the event.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove them!",
    });

    if (confirmation.isConfirmed) {
      try {
        const token = localStorage.getItem("jwtToken"); // Get JWT token from localStorage
        if (!token) throw new Error("No token found. Please log in.");

        const response = await axios.delete(
          `${backendUrl}/event/${eventId}/employee/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Add JWT token to the request header
            },
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          await Swal.fire(
            "Removed!",
            "The employee has been removed from the event.",
            "success"
          );
          setEvent((prevEvent) => ({
            ...prevEvent,
            currentEmployers: prevEvent.currentEmployers.filter(
              (employer) => employer._id !== userId
            ),
          }));
        } else {
          await Swal.fire("Error!", "Failed to remove employee.", "error");
        }
      } catch (error) {
        console.error("Error removing employee:", error);
        await Swal.fire(
          "Error!",
          "An error occurred while removing the employee.",
          "error"
        );
      }
    }
  };

  const addCompletedEvents = async (userId, eventId) => {
    try {
      const token = localStorage.getItem("jwtToken"); // Get JWT token from localStorage
      if (!token) throw new Error("No token found. Please log in.");

      const response = await axios.put(
        `${backendUrl}/employeeReported/${userId}?eventId=${eventId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add JWT token to the request header
          },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setEvent((prevEvent) => ({
          ...prevEvent,
          currentEmployers: prevEvent.currentEmployers.map((employer) =>
            employer._id === userId
              ? {
                  ...employer,
                  CompletedEvents: [...employer.CompletedEvents, eventId],
                }
              : employer
          ),
        }));
      } else {
        Swal.fire(
          "Error!",
          response.data.error || "Failed to update completed events.",
          "error"
        );
      }
    } catch (error) {
      console.error("Error updating completed events:", error);
      Swal.fire("Error!", "Something went wrong.", "error");
    }
  };

  const unReportEvent = async (userId, eventId) => {
    const confirmation = await Swal.fire({
      title: "Are you sure?",
      text: "You are about to unreport this employee from the event.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, unreport!",
    });

    if (confirmation.isConfirmed) {
      try {
        const token = localStorage.getItem("jwtToken"); // Get JWT token from localStorage
        if (!token) throw new Error("No token found. Please log in.");

        const response = await axios.delete(
          `${backendUrl}/employeeUnreported/${userId}?eventId=${eventId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Add JWT token to the request header
            },
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          await Swal.fire(
            "Success!",
            "Employee unreported from the event.",
            "success"
          );
          setEvent((prevEvent) => ({
            ...prevEvent,
            currentEmployers: prevEvent.currentEmployers.map((employer) =>
              employer._id === userId
                ? {
                    ...employer,
                    CompletedEvents: employer.CompletedEvents.filter(
                      (event) => event !== eventId.toString()
                    ),
                  }
                : employer
            ),
          }));
        } else {
          Swal.fire("Error!", "Failed to unreport employee.", "error");
        }
      } catch (error) {
        console.error("Error unreporting employee:", error);
        Swal.fire("Error!", "Something went wrong.", "error");
      }
    }
  };

  if (!event) {
    return (
      <div className="text-center py-4">
        <h3 className="">Loding........... </h3>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center py-4">
        <h3 className="text-center mb-4 text-2xl">Event Details</h3>
        <div className="bg-black/60 h-[470px] flex flex-col overflow-y-auto scrollbar-none">
          <div className="p-5">
            <ul className="w-full flex flex-col justify-center items-center gap-6 my-4">
              <li className="info-item flex justify-between w-full text-sm">
                <span className="label font-bold flex-[0.8] text-left text-base">
                  Place
                </span>
                <span className="value flex-1 text-left text-white pl-2">
                  : {event.place}
                </span>
              </li>
              <li className="info-item flex justify-between w-full text-sm">
                <span className="label font-bold flex-[0.8] text-left text-base">
                  Date
                </span>
                <span className="value flex-1 text-left text-white pl-2">
                  : {new Date(event.date).toDateString()}
                </span>
              </li>
              <li className="info-item flex justify-between w-full text-sm">
                <span className="label font-bold flex-[0.8] text-left text-base">
                  Reporting Time
                </span>
                <span className="value flex-1 text-left text-white pl-2">
                  : {event.reportingTime}
                </span>
              </li>
              <li className="info-item flex justify-between w-full text-sm">
                <span className="label font-bold flex-[0.8] text-left text-base">
                  Job Title
                </span>
                <span className="value flex-1 text-left text-white pl-2">
                  : {event.jobTitle}
                </span>
              </li>
              <li className="info-item flex justify-between w-full text-sm">
                <span className="label font-bold flex-[0.8] text-left text-base">
                  Job Description
                </span>
                <span className="value flex-1 text-left text-white pl-2">
                  : {event.jobDescription}
                </span>
              </li>
              <li className="info-item flex justify-between w-full text-sm">
                <span className="label font-bold flex-[0.8] text-left text-base">
                  Employer Limit
                </span>
                <span className="value flex-1 text-left text-white pl-2">
                  : {event.employerLimit}
                </span>
              </li>
            </ul>
          </div>
          <div className="p-1">
            <table className="table-auto w-full border-collapse border border-white">
              <thead>
                <tr>
                  <th className="p-1 border border-white">No</th>
                  <th className="p-1 border border-white">Employee Name</th>
                  <th className="p-0 border border-white w-[15%]">Id</th>
                  <th className="p-3 border border-white w-[30%]">Action</th>
                </tr>
              </thead>
              <tbody>
                {event.currentEmployers.map((employer) => (
                  <tr
                    key={employer._id}
                    className="bg-black bg-opacity-50 text-sm"
                  >
                    <td className="p-1 border border-white">{count++}</td>
                    <td className="p-1 border border-white">{employer.name}</td>
                    <td className="p-1 border border-white">
                      {employer.userId}
                    </td>
                    <td className="border border-white text-xs p-1">
                      <button
                        className="remove-btn w-[90%] bg-red-700 text-white py-2 rounded hover:bg-red-600"
                        onClick={() => removeEmployee(event._id, employer._id)}
                      >
                        Remove
                      </button>
                      <div>
                        {new Date(event.date).toISOString().split("T")[0] ===
                          currentDate && (
                          <div>
                            {employer.CompletedEvents.includes(
                              event._id.toString()
                            ) ? (
                              <button
                                className="unreport-btn w-[90%] bg-yellow-500 text-black py-2 rounded"
                                onClick={() =>
                                  unReportEvent(employer._id, event._id)
                                }
                              >
                                Unreport
                              </button>
                            ) : (
                              <button
                                className="report-btn w-[90%] bg-green-600 text-white py-2 rounded hover:bg-green-500"
                                onClick={() =>
                                  addCompletedEvents(employer._id, event._id)
                                }
                              >
                                Report
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="footer flex justify-center py-4 px-2 gap-4">
          <button
            className="back-button w-[60%] bg-green-600 text-white py-2 px-4 rounded-lg"
            onClick={() => history.back()}
          >
            Back
          </button>
          <Link
            to={`/editEvent/${id}`}
            className="edit-button w-[60%] bg-yellow-600 text-white py-2 px-4 rounded-lg"
          >
            Edit
          </Link>
          <button
            className="delete-button w-[60%] bg-red-600 text-white py-2 px-4 rounded-lg"
            onClick={deleteEvent}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;

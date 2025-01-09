import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams, useNavigate } from "react-router-dom";

const UserEventDetails = () => {
  const { id } = useParams(); // Get event ID from URL
  const navigate = useNavigate();
  const [event, setEvent] = useState(null); // State for event details
  const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;
  const [bookButton,setBookButton] = useState(false);

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
        const response = await axios.get(
          `${backendUrl}/usereventDetails/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Add JWT token to the request header
            },
            withCredentials: true, // Include cookies
          }
        );

        // Update state with fetched data
        setEvent(response.data.event);
        setBookButton(response.data.bookedEvent)
      } catch (error) {
        console.error("Failed to fetch event data", error);
      }
    };

    fetchEventDetails();
  }, [backendUrl, id, navigate]);

  const bookEvent = async () => {
    const confirmation = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to book this event?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, book it!",
      cancelButtonText: "Cancel",
    });

    if (confirmation.isConfirmed) {
      try {
        const token = localStorage.getItem("jwtToken"); // Retrieve token
        if (!token) {
          Swal.fire("Error", "Please log in first.", "error");
          return;
        }

        const response = await axios.post(
          `${backendUrl}/bookEvent/${event._id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include JWT token
            },
          }
        );

        if (response.data.success) {
          Swal.fire("Success", "Event booked successfully!", "success").then(
            () => {
              navigate("/home");
            }
          );
        } else {
          Swal.fire("Error", response.data.error || "Booking failed", "error");
        }
      } catch (error) {
        console.error("Booking error:", error);
        Swal.fire(
          "Error",
          error.response?.data?.error || "Error booking the event.",
          "error"
        );
      }
    }
  };

  if (!event) {
    return (
      <div className="text-center py-4">
        <h3 className="">Loading........ </h3>
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
        </div>

        <div className="footer flex justify-center py-4 px-8 gap-4">
          <button
            className="back-button w-[50%] bg-green-600 text-white py-2 px-4 rounded-lg"
            onClick={() => history.back()}
          >
            Back
          </button>
          {!bookButton && (

            <button
            className="back-button w-[50%] bg-blue-600 text-white py-2 px-4 rounded-lg"
            onClick={bookEvent}
            >
            Book
          </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserEventDetails;

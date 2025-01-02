import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AvailableEvents = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;


  // Fetch events from backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${backendUrl}/upcomingEvents`); // Update with your API endpoint
        setEvents(response.data.event || []);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  const handleEventClick = (id) => {
    navigate(`/usereventDetails/${id}`);
  };

  return (
    <div>
      <div className="text-center py-4">
        <h3 className="text-2xl font-bold mb-2">Event List</h3>
      </div>
      <div className="bg-black/60 p-5 h-[470px] flex flex-col overflow-y-auto scrollbar-hide">
        {events.length > 0 ? (
          events.map((event) => (
            <div
              key={event._id}
              className="flex justify-between items-center bg-gray-800 text-white p-3 rounded-lg mb-3 cursor-pointer hover:bg-gray-700"
              onClick={() => handleEventClick(event._id)}
            >
              <div>
                <h6 className="uppercase text-lg">{event.place}</h6>
                <p className="text-sm">{event.formattedDate}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-white text-center">No events available.</p>
        )}
      </div>
      <div className="flex justify-center p-4">
        <button
          className="w-1/2 h-10 bg-green-700 hover:bg-green-800 rounded-xl text-white"
          onClick={() => {
            window.history.back();
          }}
        >
          Home
        </button>
      </div>
    </div>
  );
};

export default AvailableEvents;

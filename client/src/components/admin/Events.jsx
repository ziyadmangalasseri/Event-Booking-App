import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;
  // console.log(backendUrl);

  // Fetch events from backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${backendUrl}/showEventPage`, {
          credentials: "include",
        });

        if (!response.ok) {
          const errorText = await response.text(); // Capture response for debugging
          throw new Error(`API error: ${errorText}`);
        }

        const data = await response.json(); // Parse JSON response
        // console.log("Fetched Events:", data); // Debugging
        setEvents(data.event); // Update state with event data
      } catch (error) {
        console.error("Error fetching events:", error.message || error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      <div className="text-center py-4">
        <h3 className="text-center text-2xl font-bold mb-6">Event List</h3>
      </div>
      <div className="bg-black/60 p-5 h-[450px] flex flex-col overflow-y-auto scrollbar-none">
        {events.length > 0 ? (
          events.map((event) => (
            <a
              href={`/eventDetail/${event._id}`}
              key={event._id}
              className="block text-gray-800 hover:text-gray-900 py-2"
            >
              <div className="flex justify-between items-center bg-white/10 rounded-lg p-4 h-[60px]">
                <div>
                  <h4 className="text-lg text-white font-semibold">{event.place}</h4>
                  <p className="text-sm text-gray-300">{event.formattedDate}</p>
                </div>
              </div>
            </a>
          ))
        ) : (
          <p className="text-center text-gray-500">No events available.</p>
        )}
      </div>
      <div className="m-auto flex justify-between p-4 w-[90%]">
        <div className="w-2/5 bg-green-700 text-white text-center p-2 m-auto rounded-xl hover:bg-green-500">
          <button
            type="button"
            onClick={() => window.history.back()}
            className=""
          >
            Home
          </button>
        </div>
        <div className="w-2/5 bg-blue-700 text-center text-white p-2 m-auto rounded-xl hover:bg-blue-800">
          <Link to="/addEvent">Add Event</Link>
        </div>
      </div>
    </div>
  );
};

export default EventList;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem("jwtToken"); // Assuming the JWT token is stored in localStorage
        if (!token) throw new Error("No token found. Please log in.");

        const response = await axios.get(`${backendUrl}/showEventPage`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include JWT token in the request header
          },
          withCredentials: true,
        });

        if (response.status === 200) {
          setEvents(
            Array.isArray(response.data.event) ? response.data.event : []
          );
        } else {
          throw new Error("Failed to fetch events");
        }
      } catch (error) {
        console.error("Error fetching events:", error.message || error);
        setEvents([]);
      }
    };

    fetchEvents();
  }, [backendUrl]);

  const currentDate = new Date();

  return (
    <div>
      <div className="text-center py-4">
        <h3 className="text-center text-2xl font-bold mb-2">Event List</h3>
      </div>
      <div className="bg-black/60 p-5 h-[470px] flex flex-col overflow-y-auto scrollbar-none">
        {Array.isArray(events) && events.length > 0 ? (
          events
            .slice()
            .reverse()
            .map((event) => {
              const eventDate = new Date(event.date); // Parse the event date
              return (
                <Link
                  to={`/eventDetails/${event._id}`}
                  key={event._id}
                  className="block text-gray-800 hover:text-gray-900 py-2"
                >
                  <div className="flex justify-between items-center bg-white/10 rounded-lg p-4 h-[60px] overflow-hidden">
                    <div>
                      <h4 className="text-lg text-white font-semibold">
                        {event.place.length > 20
                          ? `${event.place.slice(0, 20)}...`
                          : event.place}
                      </h4>

                      <p className="text-sm text-gray-300">
                        {event.formattedDate}
                      </p>
                    </div>
                    {currentDate >= eventDate && (
                      <div className="text-2xl">✅</div>
                    )}
                  </div>
                </Link>
              );
            })
        ) : (
          <p className="text-center text-gray-500">No events available.</p>
        )}
      </div>
      <div className="m-auto flex justify-between p-3 w-[90%]">
        <div className="w-2/5 bg-green-700 text-white text-center p-2 m-auto rounded-xl hover:bg-green-500">
          <button type="button" onClick={() => window.history.back()}>
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

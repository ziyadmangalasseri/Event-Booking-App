import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const BookedEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;

  useEffect(() => {
    // Fetch events from the backend
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${backendUrl}/bookedEvents`);
        const eventsData = response.data.events;
        setEvents(Array.isArray(eventsData) ? eventsData : []);
      } catch (error) {
        console.error("Error fetching events:", error);
        setEvents([]); // Ensure events is always an array
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      <div className="text-center py-4">
        <h3 className="text-2xl font-bold mb-2">Event List</h3>
      </div>
      <div className="bg-black/60 p-5 h-[470px] flex flex-col overflow-y-auto scrollbar-hide">
        {loading ? (
          <p className="text-center">Loading events...</p>
        ) : Array.isArray(events) && events.length > 0 ? (
          <div className="space-y-4 overflow-y-auto h-80">
            {events.map(
              (event) =>
                event && // Ensure event is defined
                (!event.expirationTime ||
                  new Date() < new Date(event.expirationTime)) && (
                  <Link
                    key={event._id}
                    to={`/userbookedeventDetails/${event._id}`}
                    className="block p-4 bg-gray-700 hover:bg-gray-600 rounded transition"
                  >
                    <h6 className="uppercase font-bold">{event.place}</h6>
                    <p className="text-sm">{event.formattedDate}</p>
                  </Link>
                )
            )}
          </div>
        ) : (
          <p className="text-center">No events booked yet.</p>
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

export default BookedEvents;

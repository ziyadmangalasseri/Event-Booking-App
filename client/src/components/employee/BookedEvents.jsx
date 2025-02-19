import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import useAuth from "../utils/jwtChecking";

const BookedEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;
  const currentDate = new Date(); // Declare current date

  useAuth();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        if (!token) {
          throw new Error("No token found. Please log in.");
        }

        const response = await axios.get(`${backendUrl}/bookedEvents`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });

        if (response.data.success) {
          setEvents(response.data.events);
        } else {
          console.error("Failed to fetch events:", response.data.message);
        }
      } catch (error) {
        console.error(
          "Error fetching events:",
          error.response?.data || error.message || error
        );
      } finally {
        setLoading(false); // Stop loading when data is fetched
      }
    };

    fetchEvents();
  }, [backendUrl]);

  return (
    <div>
      <div className="text-center py-4">
        <h3 className="text-2xl font-bold mb-2">Booked Event List</h3>
      </div>
      <div className="bg-black/60 p-5 h-[470px] flex flex-col overflow-y-auto scrollbar-none">
        {Array.isArray(events) && events.length > 0 ? (
          [...events]
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((event) => {
              const eventDate = new Date(event.date);
              return (
                <Link
                  to={`/usereventDetails/${event._id}`}
                  key={event._id}
                  className="block text-gray-800 hover:text-gray-900 py-2"
                >
                  <div className="flex justify-between items-center bg-white/10 rounded-lg p-4 h-[60px]">
                    <div>
                      <h4 className="text-lg text-white font-semibold">
                        {event.place}
                      </h4>
                      <p className="text-sm text-gray-300">
                        {event.normalDate}
                      </p>
                    </div>
                    {console.log(currentDate, eventDate)}
                    {currentDate >= eventDate && (
                      <div className="text-2xl">✅</div>
                    )}
                  </div>
                </Link>
              );
            })
        ) : loading ? (
          <p className="text-center text-gray-500">Loading.....</p>
        ) : (
          <p className="text-center text-gray-500">No events available.</p>
        )}
      </div>
      <div className="flex justify-center p-4">
        <button
          className="w-1/2 h-10 bg-green-700 hover:bg-green-800 rounded-xl text-white"
          onClick={() => window.history.back()}
        >
          Home
        </button>
      </div>
    </div>
  );
};

export default BookedEvents;

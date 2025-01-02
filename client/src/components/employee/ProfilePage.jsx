import React, { useEffect, useState } from "react";
// import AlfaLogo from "../AlfaLogo";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;

  useEffect(() => {
    fetch(`${backendUrl}/userProfile`, { credentials: "include" })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="h-[70%]">
     <div className="text-center py-7">
        <h3 className="text-2xl font-bold mb-2">Profile</h3>
      </div>


      {/* User Details */}
      {user ? (
        <div className="p-6 h-[100%] bg-black bg-opacity-60 my-2">
          <ul className="w-full flex flex-col justify-center items-center gap-4 my-4">
            <li className="info-item flex justify-between w-full text-sm">
              <span className="label font-bold flex-[0.8] text-left text-base">
                Name
              </span>
              <span className="value flex-1 text-left text-white pl-2">
                : {user.name}
              </span>
            </li>
            <li className="info-item flex justify-between w-full text-sm">
              <span className="label font-bold flex-[0.8] text-left text-base">
                User Id
              </span>
              <span className="value flex-1 text-left text-white pl-2">
                : {user.userId}
              </span>
            </li>
            <li className="info-item flex justify-between w-full text-sm">
              <span className="label font-bold flex-[0.8] text-left text-base">
                Phone Number
              </span>
              <span className="value flex-1 text-left text-white pl-2">
                : {user.number}
              </span>
            </li>
            <li className="info-item flex justify-between w-full text-sm">
              <span className="label font-bold flex-[0.8] text-left text-base">
                Place
              </span>
              <span className="value flex-1 text-left text-white pl-2">
                : {user.place}
              </span>
            </li>
            <li className="info-item flex justify-between w-full text-sm">
              <span className="label font-bold flex-[0.8] text-left text-base">
                Completed Events
              </span>
              <span className="value flex-1 text-left text-white pl-2">
                : {user.CompletedEvents ? user.CompletedEvents.length : 0}
              </span>
            </li>
            <li className="info-item flex justify-between w-full text-sm">
              <span className="label font-bold flex-[0.8] text-left text-base">
                Joining Date
              </span>
              <span className="value flex-1 text-left text-white pl-2">
                : {new Date(user.JoiningDate).toDateString()}
              </span>
            </li>
            <li className="info-item flex justify-between w-full text-sm">
              <span className="label font-bold flex-[0.8] text-left text-base">
                Date Of Birth
              </span>
              <span className="value flex-1 text-left text-white pl-2">
                : {new Date(user.DateOfBirth).toDateString()}
              </span>
            </li>
            <li className="info-item flex justify-between w-full text-sm">
              <span className="label font-bold flex-[0.8] text-left text-base">
                Blood Group
              </span>
              <span className="value flex-1 text-left text-white pl-2">
                : {user.BloodGroup}
              </span>
            </li>
          </ul>

          {/* Footer */}
        </div>
      ) : (
        <div className="min-h-screen flex items-center justify-center">
          User not found
        </div>
      )}
      <div className="flex justify-center p-2">
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

export default ProfilePage;

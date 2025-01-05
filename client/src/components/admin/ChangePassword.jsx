import React, { useState } from "react";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";

const ChangePassword = () => {
  const { id } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      Swal.fire("Error", "Passwords do not match", "error");
      return;
    }

    try {
      const response = await fetch(
        `${backendUrl}/updatePassword/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ newPassword }),
          credentials: "include",
        }
      );

      const result = await response.json();

      if (response.ok) {
        Swal.fire("Success", result.message, "success").then(() => {
          history.back();
        });
      } else {
        Swal.fire("Error", result.error || "An error occurred", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Unable to process the request", "error");
    }
  };

  return (
    <div>
      <div className="py-5">
        <h3 className="text-center text-2xl font-semibold mb-4">
          Change Password
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="bg-black/60 p-10 h-[470px] flex flex-col overflow-y-auto scrollbar-none justify-center">
            {/* New Password */}
            <div className="relative h-[100px]">
              <label className="block text-white mb-1">New Password</label>
              <input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter New Password"
                className="w-full px-4 py-2 bg-black/30 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-lg"
              >
                {showNewPassword ? "🙈" : "👁️"}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative h-[100px]">
              <label className="block font-medium">Confirm Password</label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter New Password"
                className="w-full px-4 py-2 bg-black/30 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute top-11 right-3 transform -translate-y-1/2 text-lg"
              >
                {showConfirmPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-center space-x-4 mt-4">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="px-6 py-2 bg-red-700 hover:bg-red-600 rounded-lg text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-green-700 hover:bg-green-600 rounded-lg text-white"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;

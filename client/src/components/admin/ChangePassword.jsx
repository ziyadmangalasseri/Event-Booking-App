import React, { useState } from "react";
import Swal from "sweetalert2";

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      Swal.fire("Error", "Passwords do not match", "error");
      return;
    }

    try {
      const response = await fetch("/updatePassword/<%= employee._id %>", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newPassword, confirmPassword }),
      });

      const result = await response.json();

      if (response.ok) {
        Swal.fire("Success", result.message, "success").then(() => {
          window.location.href = "/showemployeespage";
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
      <div className="text-center py-2">
        <h3 className="text-center text-2xl font-semibold mb-6">
          Change Password
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="bg-black/60 p-10 h-[470px] flex flex-col overflow-y-auto scrollbar-none justify-center">
            {/* New Password */}
            <div className="relative">
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
            <div className="relative">
              <label className="block text-sm font-medium">
                Confirm Password
              </label>
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
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-lg"
              >
                {showConfirmPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-center space-x-4 mt-6">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="px-6 py-2 bg-red-500 hover:bg-red-600 rounded text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-green-500 hover:bg-green-600 rounded text-white"
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

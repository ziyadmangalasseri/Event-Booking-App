import { useState } from "react";
import AlfaLogo from "./AlfaLogo";
import axios from "axios";

const Login = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId || !password) {
      setErrorMessage("User ID and password are required.");
      return;
    }

    try {
      const response = await axios.post(
        `${backendUrl}/userlogin`,
        {
          userId,
          password,
        },
        { withCredentials: true }
      );

      const { token, response: serverResponse } = response.data;
      if (serverResponse.success) {
        // Save the JWT token in localStorage
        localStorage.setItem("jwtToken", token);

        // Fetch protected data after login
        fetchProtectedData();

        // Redirect to the appropriate page
        window.location.href = serverResponse.redirectUrl;
      } else {
        setErrorMessage(serverResponse.message);
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "An error occurred while logging in."
      );
    }
  };

  const fetchProtectedData = async () => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await axios.get(`${backendUrl}/protected-route`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Protected Data:", response.data);
    } catch (error) {
      console.error(
        error.response?.data?.message || "Error fetching protected data"
      );
    }
  };

  return (
    <div>
      <AlfaLogo />
      <div className="p-6 h-[60%] bg-black bg-opacity-30 my-2">
        <form onSubmit={handleSubmit}>
          <div className="w-[100%] h-[100%] flex-col">
            <div>
              <label htmlFor="userId" className="text-center block text-lg">
                User ID
              </label>
              <input
                type="text"
                id="userId"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="w-full p-2 mt-1 bg-black bg-opacity-50 text-white text-center rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="my-8">
              <label htmlFor="password" className="text-center block text-lg">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 mt-1 bg-black bg-opacity-50 text-white text-center rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 text-white focus:outline-none"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>
            <div className="h-[30px]">
              {errorMessage && (
                <p className="text-red-600 text-center">{errorMessage}</p>
              )}
            </div>
            <div className="my-5">
              <button
                type="submit"
                className="w-full py-2 bg-green-700 text-white rounded-md hover:bg-green-500 transition active:bg-green-400"
              >
                Log In
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

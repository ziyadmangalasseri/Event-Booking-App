import { useState } from "react";
import AlfaLogo from "./AlfaLogo";

const Login = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userId || !password) {
      setErrorMessage("User ID and password are required.");
      return;
    }

    fetch(`${process.env.REACT_APP_API_URL}/userlogin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, password }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            throw new Error(data.message || "An error occurred.");
          });
        }
        return response.json();
      })
      .then((data) => {
        if (!data.success) {
          setErrorMessage(data.message);
        } else {
          window.location.href = data.redirectUrl;
        }
      })
      .catch((err) => setErrorMessage(err.message));
  };

  return (
    <div>
     <AlfaLogo/>
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

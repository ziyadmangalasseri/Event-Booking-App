import { useState } from 'react';

const LoginForm = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userId || !password) {
      setErrorMessage('User ID and password are required.');
      return;
    }

    fetch(`${process.env.REACT_APP_API_URL}/userlogin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, password }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            throw new Error(data.message || 'An error occurred.');
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="userId" className="block text-sm font-medium">
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
      <div>
        <label htmlFor="password" className="block text-sm font-medium">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
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
            {showPassword ? '🙈' : '👁️'}
          </button>
        </div>
      </div>
      {errorMessage && (
        <p className="text-red-500 text-center">{errorMessage}</p>
      )}
      <button
        type="submit"
        className="w-full py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
      >
        Log In
      </button>
    </form>
  );
};

export default LoginForm;

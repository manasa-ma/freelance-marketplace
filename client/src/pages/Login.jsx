import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send login request to backend
      const res = await axios.post("https://freelance-backend-a4ar.onrender.com/api/auth/login", { username, password });
      
      // Store user data in Local Storage so the browser remembers us
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      
      // Go back to home page
      navigate("/");
      window.location.reload(); // Refresh to update Navbar
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-5">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-10 rounded-lg shadow-lg flex flex-col gap-6">
        <h1 className="text-3xl font-bold text-gray-700">Sign in</h1>
        
        <input
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          className="p-4 border border-gray-300 rounded outline-green-500"
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="p-4 border border-gray-300 rounded outline-green-500"
        />

        <button type="submit" className="bg-green-600 text-white py-4 rounded font-bold hover:bg-green-700 transition">
          Login
        </button>
        
        {error && <span className="text-red-500 text-sm">{error}</span>}
      </form>
    </div>
  );
};

export default Login;
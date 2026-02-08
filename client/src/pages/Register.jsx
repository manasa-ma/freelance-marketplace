import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    country: "India",
    isSeller: false,
    desc: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSeller = (e) => {
    setUser((prev) => {
      return { ...prev, isSeller: e.target.checked };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://freelance-backend-a4ar.onrender.com/api/auth/register", user);
      alert("Registration successful! Now please login.");
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 py-28 px-5">
      <form onSubmit={handleSubmit} className="w-full max-w-4xl bg-white p-10 rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col gap-5">
          <h1 className="text-3xl font-bold text-gray-700">Create account</h1>
          <input name="username" placeholder="Username" onChange={handleChange} className="p-3 border rounded" required />
          <input name="email" type="email" placeholder="Email" onChange={handleChange} className="p-3 border rounded" required />
          <input name="password" type="password" placeholder="Password" onChange={handleChange} className="p-3 border rounded" required />
          <input name="country" placeholder="Country" onChange={handleChange} className="p-3 border rounded" required />
          <button type="submit" className="bg-green-600 text-white py-3 rounded font-bold hover:bg-green-700">Register</button>
        </div>
        <div className="flex flex-col gap-5">
          <h1 className="text-3xl font-bold text-gray-700">Become a seller</h1>
          <div className="flex items-center gap-3">
            <span>Activate seller account</span>
            <input type="checkbox" onChange={handleSeller} className="w-6 h-6" />
          </div>
          <textarea name="desc" placeholder="A short description" onChange={handleChange} className="p-3 border rounded h-32"></textarea>
        </div>
      </form>
    </div>
  );
};

export default Register;
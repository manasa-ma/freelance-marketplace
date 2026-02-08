import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false); // For user dropdown

  const navigate = useNavigate();

  // Get current user from localStorage
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const handleLogout = async () => {
    try {
      await axios.post("https://freelance-backend-a4ar.onrender.com/api/auth/logout");
      localStorage.setItem("currentUser", null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const handleScroll = () => (window.scrollY > 0 ? setActive(true) : setActive(false));
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${active || open ? "bg-white text-gray-800 shadow-md py-3" : "bg-green-900 text-white py-5"}`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center px-5">
        <Link to="/" className="text-2xl font-bold tracking-tighter">
          free<span className="text-green-500">lancer.</span>
        </Link>

        <div className="flex items-center gap-6 font-semibold">
          <span className="hidden md:inline cursor-pointer hover:text-green-500">Explore</span>
          
          {!currentUser?.isSeller && <span className="hidden md:inline cursor-pointer hover:text-green-500">Become a Seller</span>}

          {currentUser ? (
            <div className="relative flex items-center gap-3 cursor-pointer" onClick={() => setOpen(!open)}>
              <img src={currentUser.img || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} alt="" className="w-8 h-8 rounded-full object-cover" />
              <span>{currentUser.username}</span>
              
              {open && (
                <div className="absolute top-10 right-0 p-5 bg-white border border-gray-200 rounded-md shadow-lg flex flex-col gap-3 text-gray-500 w-48 z-50">
                  {currentUser.isSeller && (
                    <>
                      <Link className="hover:text-green-500" to="/mygigs">Gigs</Link>
                      <Link className="hover:text-green-500" to="/add">Add New Gig</Link>
                    </>
                  )}
                  <Link className="hover:text-green-500" to="/orders">Orders</Link>
                  <Link className="hover:text-green-500" to="/messages">Messages</Link>
                  <span className="hover:text-red-500 cursor-pointer pt-2 border-t" onClick={handleLogout}>Logout</span>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="hover:text-green-500 transition">Sign in</Link>
              <Link to="/register">
                <button className={`px-5 py-2 rounded border font-bold transition ${active ? "border-green-500 text-green-500 hover:bg-green-500 hover:text-white" : "border-white text-white hover:bg-white hover:text-green-900"}`}>Join</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
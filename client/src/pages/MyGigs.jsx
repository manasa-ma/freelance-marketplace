import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Trash2 } from "lucide-react";

const MyGigs = () => {
  const [gigs, setGigs] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  // 1. Fetch only MY gigs
  const fetchMyGigs = async () => {
    try {
      // We filter by userId (passed as a query or handled by backend)
      const res = await axios.get(`http://localhost:5000/api/gigs?userId=${currentUser._id}`);
      setGigs(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMyGigs();
  }, []);

  // 2. Handle Delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this gig?")) {
      try {
        await axios.delete(`https://freelance-backend-a4ar.onrender.com/api/gigs/${id}`, { withCredentials: true });
        fetchMyGigs(); 
      } catch (err) {
        // Change alert to show the actual server message
        alert(err.response?.data || "Error deleting gig");
      }
    }
  };

  return (
    <div className="pt-32 pb-20 px-10 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold">My Gigs</h1>
        <Link to="/add">
          <button className="bg-green-600 text-white px-5 py-2 rounded font-bold hover:bg-green-700">Add New Gig</button>
        </Link>
      </div>

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b text-gray-500 uppercase text-sm">
            <th className="py-3 px-2">Image</th>
            <th className="py-3 px-2">Title</th>
            <th className="py-3 px-2">Price</th>
            <th className="py-3 px-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {gigs.map((gig) => (
            <tr key={gig._id} className="border-b hover:bg-gray-50 transition">
              <td className="py-4 px-2">
                <img className="w-16 h-10 object-cover rounded" src={gig.cover} alt="" />
              </td>
              <td className="py-4 px-2 font-medium">{gig.title}</td>
              <td className="py-4 px-2">${gig.price}</td>
              <td className="py-4 px-2">
                <Trash2 
                  className="text-red-500 cursor-pointer hover:scale-110 transition" 
                  onClick={() => handleDelete(gig._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {gigs.length === 0 && <p className="text-center py-10 text-gray-500">You haven't created any gigs yet.</p>}
    </div>
  );
};

export default MyGigs;
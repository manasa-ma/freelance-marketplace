import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Add this
import GigCard from '../components/GigCard';

const Home = () => {
  const [gigs, setGigs] = useState([]);
  const [input, setInput] = useState(""); // Track search input
  const navigate = useNavigate();

  const fetchGigs = async (searchQuery = "") => {
    try {
      //const res = await axios.get(`"https://your-backend-name.onrender.com/api/gigs"`);
      //const res = await axios.get("https://freelance-backend-a4ar.onrender.com/api/gigs");
      const res = await axios.get(`https://freelance-backend-a4ar.onrender.com/api/gigs?search=${searchQuery}`);
      setGigs(res.data);
    } catch (err) { console.log(err); }
  };

  useEffect(() => { fetchGigs(); }, []);

  const handleSearch = () => {
    fetchGigs(input); // Fetch filtered results
  };

  return (
    <div className="w-full">
      <div className="bg-green-900 text-white pt-40 pb-24 px-5 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-8 max-w-4xl">
          Find the perfect freelance services
        </h1>
        <div className="flex w-full max-w-2xl bg-white rounded shadow-lg overflow-hidden">
          <input 
            type="text" 
            placeholder='Try "logo design"' 
            className="flex-1 py-4 px-4 text-gray-800 outline-none" 
            onChange={(e) => setInput(e.target.value)}
          />
          <button 
            onClick={handleSearch}
            className="bg-green-500 px-8 py-4 font-bold hover:bg-green-600 transition"
          >
            Search
          </button>
        </div>
        
        {/* Categories Filtering */}
        <div className="flex flex-wrap justify-center gap-3 mt-8 text-sm font-semibold">
          <span>Popular:</span>
          {["design", "web", "animation", "ai"].map(cat => (
            <span 
              key={cat} 
              onClick={async () => {
                const res = await axios.get(`https://freelance-backend-a4ar.onrender.com/api/gigs?cat=${cat}`);
                setGigs(res.data);
              }}
              className="border border-white rounded-full px-4 py-1 hover:bg-white hover:text-green-900 transition cursor-pointer uppercase"
            >
              {cat}
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-16 px-5">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          {gigs.length > 0 ? "Results for you" : "No services found matching your search"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
           {gigs.map(gig => <GigCard key={gig._id} item={gig} />)}
        </div>
      </div>
    </div>
  );
};

export default Home;
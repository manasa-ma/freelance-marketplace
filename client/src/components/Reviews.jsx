import React, { useEffect, useState } from "react";
import axios from "axios";
import { Star } from "lucide-react";

const Reviews = ({ gigId }) => {
  const [reviews, setReviews] = useState([]);
  const [desc, setDesc] = useState("");
  const [star, setStar] = useState(5);

  const fetchReviews = async () => {
    const res = await axios.get(`http://localhost:5000/api/reviews/${gigId}`);
    setReviews(res.data);
  };

  useEffect(() => {
    fetchReviews();
  }, [gigId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://freelance-backend-a4ar.onrender.com/api/reviews", { gigId, desc, star }, { withCredentials: true });
      alert("Review added!");
      setDesc("");
      fetchReviews();
    } catch (err) {
      alert(err.response.data);
    }
  };

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-5">Reviews</h2>
      {reviews.map((r) => (
        <div key={r._id} className="flex flex-col gap-2 py-5 border-b">
          <div className="flex gap-1 text-yellow-500">
            {[...Array(r.star)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
            <span className="text-gray-700 font-bold ml-2">{r.star}</span>
          </div>
          <p className="text-gray-600">{r.desc}</p>
        </div>
      ))}

      <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-4 bg-gray-50 p-6 rounded-md">
        <h3 className="font-bold">Add a Review</h3>
        <select onChange={(e) => setStar(e.target.value)} className="p-2 border rounded w-max">
          <option value={5}>5 Stars</option>
          <option value={4}>4 Stars</option>
          <option value={3}>3 Stars</option>
          <option value={2}>2 Stars</option>
          <option value={1}>1 Star</option>
        </select>
        <textarea 
          placeholder="Write your opinion..." 
          className="p-3 border rounded h-24"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button className="bg-green-600 text-white py-2 rounded font-bold w-max px-10 hover:bg-green-700">Send</button>
      </form>
    </div>
  );
};

export default Reviews;
import React, { useEffect, useState } from "react";
import { Star, Clock, RefreshCcw, Check, MessageCircle, Loader2 } from "lucide-react"; // Added Loader2 for spinner
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Reviews from "../components/Reviews";

const Gig = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [gig, setGig] = useState({});
  const [loading, setLoading] = useState(true);
  const [isPaying, setIsPaying] = useState(false); // New state for payment simulation

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    const fetchGig = async () => {
      try {
        const res = await axios.get(`https://freelance-backend-a4ar.onrender.com/api/gigs/single/${id}`);
        setGig(res.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchGig();
  }, [id]);

  const handleContact = async () => {
    const sellerId = gig.userId;
    const buyerId = currentUser._id;
    const conversationId = sellerId + buyerId;

    try {
      await axios.post(
        `https://freelance-backend-a4ar.onrender.com/api/conversations`, 
        { to: sellerId }, 
        { withCredentials: true }
      );
      navigate(`/message/${conversationId}`);
    } catch (err) {
      navigate(`/message/${conversationId}`);
    }
  };

  // SAFE MOCK PAYMENT LOGIC (Perfect for Internship/Portfolio)
const handlePaymentSimulation = async () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (!user || !user.token) return navigate("/login"); // Check if token exists

  setIsPaying(true);

  setTimeout(async () => {
    try {
      await axios.post(
        `https://freelance-backend-a4ar.onrender.com/api/orders/${id}`, 
        {}, 
        { 
          headers: { token: user.token } // <--- MUST SEND THIS
        }
      );
      
      setIsPaying(false);
      alert("🎉 Payment Successful!");
      navigate("/orders");
    } catch (err) {
      setIsPaying(false);
      alert("Error: " + (err.response?.data || "Auth Failed"));
    }
  }, 2000); 
};


  if (loading) return <div className="pt-40 text-center text-gray-500 animate-pulse">Loading gig details...</div>;

  return (
    <div className="max-w-7xl mx-auto py-32 px-5 flex flex-col md:flex-row gap-12">
      {/* Left Side: Service Details */}
      <div className="flex-[2] flex flex-col gap-5">
        <span className="text-gray-400 font-light uppercase text-sm">
          Marketplace {">"} {gig.cat}
        </span>
        <h1 className="text-3xl font-bold text-gray-800">{gig.title}</h1>
        
        <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center gap-3">
            <img 
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png" 
              alt="" 
              className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm" 
            />
            <div className="flex flex-col">
              <span className="font-bold text-gray-700 uppercase text-xs tracking-wider">Verified Seller</span>
              <div className="flex items-center gap-1 text-yellow-500">
                <Star size={14} fill="currentColor" />
                <span className="font-bold text-sm">
                  {gig.starNumber > 0 ? Math.round(gig.totalStars / gig.starNumber) : "New Seller"}
                </span>
              </div>
            </div>
          </div>
          
          {currentUser?._id !== gig.userId && (
            <button 
              onClick={handleContact}
              className="flex items-center gap-2 border border-gray-400 px-4 py-2 rounded-md font-semibold text-gray-600 hover:bg-gray-100 transition"
            >
              <MessageCircle size={18} /> Contact Me
            </button>
          )}
        </div>

        <img 
          src={gig.cover} 
          alt="" 
          className="w-full max-h-[500px] object-cover rounded-lg border shadow-sm" 
        />

        <h2 className="text-xl font-bold mt-5">About This Gig</h2>
        <p className="text-gray-600 leading-7 whitespace-pre-wrap">
          {gig.desc}
        </p>

        <hr className="border-gray-200 my-5" />

        <Reviews gigId={id} />
      </div>

      {/* Right Side: Pricing & Checkout Box */}
      <div className="flex-1 border border-gray-300 p-6 rounded-md flex flex-col gap-5 sticky top-32 h-max bg-white shadow-md">
        <div className="flex justify-between items-center border-b pb-4">
          <h3 className="font-bold text-lg text-gray-700">Standard Plan</h3>
          <h2 className="text-3xl font-bold text-gray-900">$ {gig.price}</h2>
        </div>
        
        <div className="flex justify-between font-bold text-sm text-gray-600 mt-2">
          <div className="flex items-center gap-2"><Clock size={18} className="text-gray-400"/> {gig.deliveryTime} Days Delivery</div>
          <div className="flex items-center gap-2"><RefreshCcw size={18} className="text-gray-400"/> {gig.revisionNumber} Revisions</div>
        </div>

        <div className="flex flex-col gap-3 my-4">
          {["Source Files Included", "Commercial Use License", "High Resolution Output"].map((item) => (
            <div key={item} className="flex items-center gap-2 text-gray-600 text-sm">
              <Check size={18} className="text-green-500 font-bold" /> <span>{item}</span>
            </div>
          ))}
        </div>

        {/* MOCK PAYMENT BUTTON */}
        <button 
          onClick={handlePaymentSimulation}
          disabled={isPaying}
          className={`w-full py-4 rounded-md font-bold transition shadow-md flex items-center justify-center gap-2 ${
            isPaying ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 text-white hover:bg-green-700"
          }`}
        >
          {isPaying ? (
            <>
              <Loader2 className="animate-spin" size={20} /> Processing...
            </>
          ) : (
            "Confirm & Pay"
          )}
        </button>
        
        <p className="text-center text-xs text-gray-400 mt-2">
          Secure encrypted 256-bit transaction simulation
        </p>
      </div>
    </div>
  );
};

export default Gig;
import React from 'react';
import { Star } from 'lucide-react';
import { Link } from "react-router-dom";

const GigCard = ({ item }) => {
  return (
    // Note: Database uses _id instead of id
    <Link to={`/gig/${item._id}`} className="block no-underline">
      <div className="w-full border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer bg-white">
        {/* Changed item.img to item.cover to match our DB Model */}
        <img 
          src={item.cover} 
          alt="" 
          className="w-full h-40 object-cover"
        />
        
        <div className="p-4 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            {/* For now we use a default avatar because we didn't join tables yet */}
            <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="" className="w-6 h-6 rounded-full" />
            <span className="text-sm font-bold text-gray-700">Seller</span>
          </div>

          <p className="text-gray-600 line-clamp-2 min-h-[40px] hover:text-green-600 transition">
            {item.title}
          </p>

          <div className="flex items-center gap-1 text-yellow-500 font-bold">
            <Star size={14} fill="currentColor" />
            <span>{Math.round(item.totalStars / item.starNumber) || 0}</span>
          </div>
        </div>

        <hr className="border-gray-100" />

        <div className="p-4 flex justify-between items-center uppercase text-xs font-bold text-gray-500">
          <span>Starting at</span>
          <span className="text-lg text-gray-900 font-bold">${item.price}</span>
        </div>
      </div>
    </Link>
  );
};

export default GigCard;
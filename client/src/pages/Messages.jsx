import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Messages = () => {
  const [conversations, setConversations] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  // 1. UPDATED URL: Fetch all conversations from Render
  const getConversations = async () => {
    try {
      const res = await axios.get(`https://freelance-backend-a4ar.onrender.com/api/conversations`, {
        withCredentials: true,
      });
      setConversations(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getConversations();
  }, []);

  // 2. UPDATED URL: Mark message as read on Render
  const handleRead = async (id) => {
    try {
      await axios.put(`https://freelance-backend-a4ar.onrender.com/api/conversations/${id}`, {}, {
        withCredentials: true,
      });
      getConversations(); // Refresh list
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="pt-32 pb-20 px-10 max-w-7xl mx-auto min-h-[80vh]">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold">Messages (Inbox)</h1>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-y-2">
          <thead>
            <tr className="text-gray-500 text-sm uppercase">
              <th className="py-3 px-4">{currentUser.isSeller ? "Buyer" : "Seller"}</th>
              <th className="py-3 px-4">Last Message</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {conversations.map((c) => (
              <tr 
                key={c.id} 
                className={`group transition-all ${
                  ((currentUser.isSeller && !c.readBySeller) || (!currentUser.isSeller && !c.readByBuyer)) 
                  ? "bg-green-50 shadow-sm ring-1 ring-green-100" 
                  : "bg-white border hover:bg-gray-50"
                }`}
              >
                <td className="py-5 px-4 font-bold text-gray-800">
                  User_{c.id.substring(0, 8)}...
                </td>

                <td className="py-5 px-4">
                  <p className={`max-w-xs truncate ${
                    ((currentUser.isSeller && !c.readBySeller) || (!currentUser.isSeller && !c.readByBuyer)) 
                    ? "font-bold text-gray-900" 
                    : "text-gray-500"
                  }`}>
                    {c.lastMessage || "No messages yet. Start the conversation!"}
                  </p>
                </td>

                <td className="py-5 px-4 text-sm text-gray-400">
                  {new Date(c.updatedAt).toLocaleDateString()}
                </td>

                <td className="py-5 px-4 text-center">
                  <Link 
                    to={`/message/${c.id}`}
                    className="inline-block"
                  >
                    <button 
                      onClick={() => handleRead(c.id)}
                      className="bg-green-600 text-white px-6 py-2 rounded-md font-bold text-sm hover:bg-green-700 transition shadow-sm"
                    >
                      Open Chat
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {conversations.length === 0 && (
          <div className="text-center py-20 flex flex-col items-center gap-4">
            <img src="https://cdn-icons-png.flaticon.com/512/4076/4076432.png" alt="" className="w-20 opacity-20" />
            <p className="text-gray-400 text-lg">Your inbox is empty.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
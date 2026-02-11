import React, { useEffect, useState } from "react";
import axios from "axios";
import { Mail, Trash2 } from "lucide-react"; // Added Trash2 icon

const Orders = () => {
  const [orders, setOrders] = useState([]);

 const fetchOrders = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("currentUser"));
      
      // THE FIX: We must send the token in the headers
      const res = await axios.get("https://freelance-backend-a4ar.onrender.com/api/orders", {
        headers: { token: user.token } 
      });
      
      setOrders(res.data);
    } catch (err) {
      console.log("Error fetching orders:", err);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  // NEW FUNCTION: Cancel/Delete Order
  const handleCancel = async (id) => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      try {
        const user = JSON.parse(localStorage.getItem("currentUser"));
        
        await axios.delete(`https://freelance-backend-a4ar.onrender.com/api/orders/${id}`, {
          headers: { token: user.token } // <--- Send the token here too
        });
        
        alert("Order cancelled!");
        fetchOrders(); 
      } catch (err) {
        alert("Error: " + (err.response?.data || "Could not cancel"));
      }
    }
  };

  return (
    <div className="pt-32 pb-20 px-10 max-w-7xl mx-auto min-h-[80vh]">
      <h1 className="text-3xl font-bold mb-10">My Orders</h1>
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b text-gray-500 uppercase text-xs font-bold tracking-wider">
              <th className="py-4 px-6">Service</th>
              <th className="py-4 px-6">Price</th>
              <th className="py-4 px-6">Status</th>
              <th className="py-4 px-6">Contact</th>
              <th className="py-4 px-6 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-b hover:bg-gray-50 transition">
                <td className="py-4 px-6 flex items-center gap-4">
                  <img src={order.img} className="w-16 h-10 object-cover rounded shadow-sm" alt="" />
                  <span className="font-semibold text-gray-700">{order.title}</span>
                </td>
                <td className="py-4 px-6 text-gray-600 font-medium">${order.price}</td>
                <td className="py-4 px-6">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">Active</span>
                </td>
                <td className="py-4 px-6">
                  <Mail className="text-blue-500 cursor-pointer hover:scale-110 transition" size={20} />
                </td>
                <td className="py-4 px-6 text-center">
                  {/* CANCEL BUTTON */}
                  <button 
                    onClick={() => handleCancel(order._id)}
                    className="flex items-center gap-1 text-red-500 hover:text-red-700 font-bold text-sm transition mx-auto"
                  >
                    <Trash2 size={16} /> Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {orders.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <p>You have no active orders.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
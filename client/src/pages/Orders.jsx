import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, CheckCircle, Play, Send } from "lucide-react";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem("currentUser"));

  const fetchOrders = async () => {
    try {
      const res = await axios.get("https://freelance-backend-a4ar.onrender.com/api/orders", {
        headers: { token: user.token }
      });
      setOrders(res.data);
    } catch (err) { console.log(err); }
  };

  useEffect(() => { fetchOrders(); }, []);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await axios.put(`https://freelance-backend-a4ar.onrender.com/api/orders/${id}/status`, 
        { status: newStatus },
        { headers: { token: user.token } }
      );
      fetchOrders(); // Refresh table
    } catch (err) { alert("Status update failed"); }
  };

  return (
    <div className="pt-32 pb-20 px-10 max-w-7xl mx-auto min-h-[80vh]">
      <h1 className="text-3xl font-bold mb-10">Manage Orders</h1>
      <div className="bg-white border rounded-lg overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b text-gray-500 uppercase text-xs font-bold">
            <tr>
              <th className="p-4">Service</th>
              <th className="p-4">Price</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-center">Manage</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-b hover:bg-gray-50 transition">
                <td className="p-4 flex items-center gap-3">
                  <img src={order.img} className="w-12 h-8 object-cover rounded" alt=""/>
                  <span className="font-medium text-gray-700">{order.title}</span>
                </td>
                <td className="p-4 text-gray-600 font-bold">${order.price}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    order.status === "Completed" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                  }`}>
                    {order.status || "Pending"}
                  </span>
                </td>
                <td className="p-4 text-center flex justify-center gap-4">
                   {/* SELLER LOGIC */}
                   {user.isSeller && order.status === "Pending" && (
                     <button onClick={() => handleStatusUpdate(order._id, "In Progress")} className="flex items-center gap-1 text-blue-600 font-bold text-sm"><Play size={16}/> Start</button>
                   )}
                   {user.isSeller && order.status === "In Progress" && (
                     <button onClick={() => handleStatusUpdate(order._id, "Delivered")} className="flex items-center gap-1 text-purple-600 font-bold text-sm"><Send size={16}/> Deliver</button>
                   )}

                   {/* BUYER LOGIC */}
                   {!user.isSeller && order.status === "Delivered" && (
                     <button onClick={() => handleStatusUpdate(order._id, "Completed")} className="bg-green-600 text-white px-3 py-1 rounded text-xs">Accept & Complete</button>
                   )}

                   {order.status === "Completed" && <CheckCircle className="text-green-500" />}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
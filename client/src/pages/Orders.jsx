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
      fetchOrders();
    } catch (err) { alert("Status update failed"); }
  };

  // NEW DELETE FUNCTION
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await axios.delete(`https://freelance-backend-a4ar.onrender.com/api/orders/${id}`, {
          headers: { token: user.token }
        });
        alert("Order deleted!");
        fetchOrders(); // Refresh table
      } catch (err) {
        alert("Error: " + (err.response?.data || "Could not delete"));
      }
    }
  };

  return (
    <div className="pt-32 pb-20 px-10 max-w-7xl mx-auto min-h-[80vh]">
      <h1 className="text-3xl font-bold mb-10 text-gray-800">Manage Orders</h1>
      <div className="bg-white border rounded-xl overflow-hidden shadow-md">
        <table className="w-full text-left">
          <thead className="bg-gray-100 border-b text-gray-600 uppercase text-xs font-bold tracking-wider">
            <tr>
              <th className="p-5">Service</th>
              <th className="p-5">Price</th>
              <th className="p-5">Status</th>
              <th className="p-5 text-center">Manage</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders.map((order) => (
              <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                <td className="p-5 flex items-center gap-4">
                  <img src={order.img} className="w-14 h-10 object-cover rounded-md shadow-sm" alt=""/>
                  <span className="font-semibold text-gray-700">{order.title}</span>
                </td>
                <td className="p-5 text-gray-800 font-bold">${order.price}</td>
                <td className="p-5">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                    order.status === "Completed" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                  }`}>
                    {order.status || "Pending"}
                  </span>
                </td>
                <td className="p-5">
                  <div className="flex items-center justify-center gap-6">
                    {/* SELLER PROGRESS BUTTONS */}
                    {user.isSeller && order.status === "Pending" && (
                      <button onClick={() => handleStatusUpdate(order._id, "In Progress")} className="text-blue-600 hover:text-blue-800 transition"><Play size={20}/></button>
                    )}
                    {user.isSeller && order.status === "In Progress" && (
                      <button onClick={() => handleStatusUpdate(order._id, "Delivered")} className="text-purple-600 hover:text-purple-800 transition"><Send size={20}/></button>
                    )}

                    {/* BUYER COMPLETION */}
                    {!user.isSeller && order.status === "Delivered" && (
                      <button onClick={() => handleStatusUpdate(order._id, "Completed")} className="bg-green-600 text-white px-3 py-1 rounded text-xs">Finish</button>
                    )}

                    {order.status === "Completed" && <CheckCircle className="text-green-500" size={20} />}

                    {/* TRASH / DELETE BUTTON */}
                    <button 
                        onClick={() => handleDelete(order._id)}
                        className="text-red-400 hover:text-red-600 transition"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {orders.length === 0 && <p className="text-center py-20 text-gray-400">No active orders found.</p>}
      </div>
    </div>
  );
};

export default Orders;
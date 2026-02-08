import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [formData, setFormData] = useState({
    title: "", cat: "design", cover: "", desc: "", 
    deliveryTime: 0, revisionNumber: 0, price: 0
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    // LOOK HERE: You MUST have { withCredentials: true } as the 3rd argument
    await axios.post("http://localhost:5000/api/gigs", formData, { 
      withCredentials: true 
    });
    alert("Gig Created Successfully!");
    navigate("/");
  } catch (err) {
    alert("Error: " + (err.response?.data || err.message));
  }
};;

  return (
    <div className="pt-32 pb-20 px-5 flex justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="w-full max-w-4xl bg-white p-10 rounded-lg shadow flex flex-col gap-6">
        <h1 className="text-3xl font-bold text-gray-700 underline decoration-green-500">Add New Gig</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="flex flex-col gap-4">
            <label className="font-semibold">Title</label>
            <input name="title" placeholder="e.g. I will do something I'm really good at" className="p-3 border rounded" onChange={handleChange} />
            
            <label className="font-semibold">Category</label>
            <select name="cat" className="p-3 border rounded" onChange={handleChange}>
              <option value="design">Graphics & Design</option>
              <option value="web">Web Development</option>
              <option value="animation">Video & Animation</option>
              <option value="ai">AI Services</option>
            </select>

            <label className="font-semibold">Cover Image URL</label>
            <input name="cover" placeholder="Paste an image URL" className="p-3 border rounded" onChange={handleChange} />

            <label className="font-semibold">Description</label>
            <textarea name="desc" placeholder="Brief description to introduce your service" className="p-3 border rounded h-40" onChange={handleChange}></textarea>
          </div>

          <div className="flex flex-col gap-4">
            <label className="font-semibold">Delivery Time (days)</label>
            <input name="deliveryTime" type="number" className="p-3 border rounded" onChange={handleChange} />
            
            <label className="font-semibold">Revision Number</label>
            <input name="revisionNumber" type="number" className="p-3 border rounded" onChange={handleChange} />

            <label className="font-semibold">Price ($)</label>
            <input name="price" type="number" className="p-3 border rounded" onChange={handleChange} />
          </div>
        </div>
        <button className="bg-green-600 text-white py-4 rounded font-bold hover:bg-green-700 transition">Create Gig</button>
      </form>
    </div>
  );
};

export default Add;